import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';

// Generate or retrieve session ID
const getSessionId = (): string => {
  let sessionId = sessionStorage.getItem('analytics_session_id');
  if (!sessionId) {
    sessionId = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    sessionStorage.setItem('analytics_session_id', sessionId);
  }
  return sessionId;
};

export const useAnalyticsTracking = () => {
  const location = useLocation();
  const lastPathRef = useRef<string>('');

  useEffect(() => {
    // Avoid duplicate tracking for same path
    if (lastPathRef.current === location.pathname) return;
    lastPathRef.current = location.pathname;

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
        uniqueSessions: 0,
        topPages: [],
        viewsByDay: [],
      };
    }

    // Total page views
    const totalPageViews = data.length;

    // Unique sessions
    const uniqueSessions = new Set(data.map(d => d.session_id)).size;

    // Top pages
    const pageCount: Record<string, number> = {};
    data.forEach(d => {
      pageCount[d.page_path] = (pageCount[d.page_path] || 0) + 1;
    });
    const topPages = Object.entries(pageCount)
      .map(([path, count]) => ({ path, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);

    // Views by day
    const dayCount: Record<string, number> = {};
    data.forEach(d => {
      const day = new Date(d.created_at).toLocaleDateString();
      dayCount[day] = (dayCount[day] || 0) + 1;
    });
    const viewsByDay = Object.entries(dayCount)
      .map(([date, count]) => ({ date, count }))
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    return {
      totalPageViews,
      uniqueSessions,
      topPages,
      viewsByDay,
    };
  };

  return { fetchAnalytics, getStats };
};
