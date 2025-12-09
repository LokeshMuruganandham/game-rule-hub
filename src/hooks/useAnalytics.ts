import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';

// Generate or retrieve session ID (persists across page refreshes in same tab)
const getSessionId = (): string => {
  let sessionId = sessionStorage.getItem('analytics_session_id');
  if (!sessionId) {
    sessionId = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    sessionStorage.setItem('analytics_session_id', sessionId);
  }
  return sessionId;
};

// Track which paths have been tracked in this session to prevent duplicates
const getTrackedPaths = (): Set<string> => {
  const stored = sessionStorage.getItem('analytics_tracked_paths');
  return stored ? new Set(JSON.parse(stored)) : new Set();
};

const addTrackedPath = (path: string) => {
  const tracked = getTrackedPaths();
  tracked.add(path);
  sessionStorage.setItem('analytics_tracked_paths', JSON.stringify([...tracked]));
};

const hasTrackedPath = (path: string): boolean => {
  return getTrackedPaths().has(path);
};

// Debounce tracking to prevent rapid-fire duplicates
let lastTrackTime = 0;
const DEBOUNCE_MS = 2000; // 2 second debounce

export const useAnalyticsTracking = () => {
  const location = useLocation();

  useEffect(() => {
    const now = Date.now();
    
    // Debounce: don't track if last track was less than 2 seconds ago
    if (now - lastTrackTime < DEBOUNCE_MS) {
      return;
    }

    // Skip if this exact path was already tracked in this session
    if (hasTrackedPath(location.pathname)) {
      return;
    }

    lastTrackTime = now;
    addTrackedPath(location.pathname);

    const trackPageView = async () => {
      try {
        await supabase.from('analytics').insert({
          session_id: getSessionId(),
          page_path: location.pathname,
          referrer: document.referrer || null,
          user_agent: navigator.userAgent,
          screen_width: window.screen.width,
          screen_height: window.screen.height,
        });
      } catch (error) {
        // Silently fail - analytics should not break the app
        console.error('Analytics tracking error:', error);
      }
    };

    trackPageView();
  }, [location.pathname]);
};

// Hook for fetching analytics data (admin only)
export const useAnalyticsData = () => {
  const fetchAnalytics = async (days: number = 7) => {
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    const { data, error } = await supabase
      .from('analytics')
      .select('*')
      .gte('created_at', startDate.toISOString())
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  };

  const getStats = async (days: number = 7) => {
    const data = await fetchAnalytics(days);
    
    if (!data || data.length === 0) {
      return {
        totalPageViews: 0,
        uniqueVisitors: 0,
        topPages: [],
        viewsByDay: [],
      };
    }

    // Deduplicate: count unique session + page combinations
    const uniquePageViews = new Map<string, typeof data[0]>();
    data.forEach(d => {
      const key = `${d.session_id}-${d.page_path}`;
      if (!uniquePageViews.has(key)) {
        uniquePageViews.set(key, d);
      }
    });

    const deduplicatedData = Array.from(uniquePageViews.values());

    // Total unique page views (deduplicated)
    const totalPageViews = deduplicatedData.length;

    // Unique visitors (sessions)
    const uniqueVisitors = new Set(deduplicatedData.map(d => d.session_id)).size;

    // Top pages (deduplicated counts)
    const pageCount: Record<string, number> = {};
    deduplicatedData.forEach(d => {
      pageCount[d.page_path] = (pageCount[d.page_path] || 0) + 1;
    });
    const topPages = Object.entries(pageCount)
      .map(([path, count]) => ({ path, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);

    // Views by day (deduplicated)
    const dayCount: Record<string, number> = {};
    deduplicatedData.forEach(d => {
      const day = new Date(d.created_at).toLocaleDateString();
      dayCount[day] = (dayCount[day] || 0) + 1;
    });
    const viewsByDay = Object.entries(dayCount)
      .map(([date, count]) => ({ date, count }))
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    return {
      totalPageViews,
      uniqueVisitors,
      topPages,
      viewsByDay,
    };
  };

  return { fetchAnalytics, getStats };
};
