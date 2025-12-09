import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';

// Session tracking keys
const SESSION_ID_KEY = 'analytics_session_id';
const SESSION_START_KEY = 'analytics_session_start';
const TRACKED_PATHS_KEY = 'analytics_tracked_paths';

// Generate or retrieve session ID
const getSessionId = (): string => {
  let sessionId = sessionStorage.getItem(SESSION_ID_KEY);
  if (!sessionId) {
    sessionId = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    sessionStorage.setItem(SESSION_ID_KEY, sessionId);
    sessionStorage.setItem(SESSION_START_KEY, Date.now().toString());
  }
  return sessionId;
};

// Get session start time
const getSessionStart = (): number => {
  const start = sessionStorage.getItem(SESSION_START_KEY);
  return start ? parseInt(start) : Date.now();
};

// Get current session duration in seconds
const getSessionDuration = (): number => {
  return Math.floor((Date.now() - getSessionStart()) / 1000);
};

// Track which paths have been tracked in this session
const getTrackedPaths = (): Set<string> => {
  const stored = sessionStorage.getItem(TRACKED_PATHS_KEY);
  return stored ? new Set(JSON.parse(stored)) : new Set();
};

const addTrackedPath = (path: string) => {
  const tracked = getTrackedPaths();
  tracked.add(path);
  sessionStorage.setItem(TRACKED_PATHS_KEY, JSON.stringify([...tracked]));
};

const hasTrackedPath = (path: string): boolean => {
  return getTrackedPaths().has(path);
};

const getPageCount = (): number => {
  return getTrackedPaths().size;
};

// Debounce tracking
let lastTrackTime = 0;
const DEBOUNCE_MS = 2000;

export const useAnalyticsTracking = () => {
  const location = useLocation();

  useEffect(() => {
    const now = Date.now();
    
    if (now - lastTrackTime < DEBOUNCE_MS) {
      return;
    }

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
        console.error('Analytics tracking error:', error);
      }
    };

    trackPageView();
  }, [location.pathname]);

  // Track session duration on page unload
  useEffect(() => {
    const handleUnload = () => {
      const duration = getSessionDuration();
      const pageCount = getPageCount();
      
      // Use sendBeacon for reliable unload tracking
      const data = JSON.stringify({
        session_id: getSessionId(),
        duration,
        page_count: pageCount,
      });
      
      navigator.sendBeacon?.(
        `https://qgsacjbeaxuxwzgaanwr.supabase.co/rest/v1/rpc/update_session_duration`,
        data
      );
    };

    window.addEventListener('beforeunload', handleUnload);
    return () => window.removeEventListener('beforeunload', handleUnload);
  }, []);
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
        bounceRate: 0,
        avgSessionDuration: 0,
        topPages: [],
        viewsByDay: [],
      };
    }

    // Group by session
    const sessionData = new Map<string, { pages: Set<string>; firstTime: Date; lastTime: Date }>();
    
    data.forEach(d => {
      if (!sessionData.has(d.session_id)) {
        sessionData.set(d.session_id, {
          pages: new Set(),
          firstTime: new Date(d.created_at),
          lastTime: new Date(d.created_at),
        });
      }
      const session = sessionData.get(d.session_id)!;
      session.pages.add(d.page_path);
      const time = new Date(d.created_at);
      if (time < session.firstTime) session.firstTime = time;
      if (time > session.lastTime) session.lastTime = time;
    });

    // Deduplicate page views
    const uniquePageViews = new Map<string, typeof data[0]>();
    data.forEach(d => {
      const key = `${d.session_id}-${d.page_path}`;
      if (!uniquePageViews.has(key)) {
        uniquePageViews.set(key, d);
      }
    });

    const deduplicatedData = Array.from(uniquePageViews.values());
    const totalPageViews = deduplicatedData.length;
    const uniqueVisitors = sessionData.size;

    // Bounce rate: sessions with only 1 page
    const bounceSessions = Array.from(sessionData.values()).filter(s => s.pages.size === 1).length;
    const bounceRate = uniqueVisitors > 0 ? (bounceSessions / uniqueVisitors) * 100 : 0;

    // Average session duration (in seconds)
    const durations = Array.from(sessionData.values()).map(s => 
      (s.lastTime.getTime() - s.firstTime.getTime()) / 1000
    );
    const avgSessionDuration = durations.length > 0 
      ? durations.reduce((a, b) => a + b, 0) / durations.length 
      : 0;

    // Top pages
    const pageCount: Record<string, number> = {};
    deduplicatedData.forEach(d => {
      pageCount[d.page_path] = (pageCount[d.page_path] || 0) + 1;
    });
    const topPages = Object.entries(pageCount)
      .map(([path, count]) => ({ path, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);

    // Views by day
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
      bounceRate,
      avgSessionDuration,
      topPages,
      viewsByDay,
    };
  };

  return { fetchAnalytics, getStats };
};
