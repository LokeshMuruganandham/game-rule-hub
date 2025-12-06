-- Create analytics table for tracking page views and sessions
CREATE TABLE public.analytics (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id text NOT NULL,
  page_path text NOT NULL,
  referrer text,
  user_agent text,
  screen_width integer,
  screen_height integer,
  country text,
  city text,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Create index for efficient querying
CREATE INDEX idx_analytics_created_at ON public.analytics(created_at DESC);
CREATE INDEX idx_analytics_session_id ON public.analytics(session_id);
CREATE INDEX idx_analytics_page_path ON public.analytics(page_path);

-- Enable RLS
ALTER TABLE public.analytics ENABLE ROW LEVEL SECURITY;

-- Allow public inserts (for tracking)
CREATE POLICY "Allow public insert to analytics"
ON public.analytics
FOR INSERT
WITH CHECK (true);

-- Only admins can view analytics
CREATE POLICY "Admins can view analytics"
ON public.analytics
FOR SELECT
USING (public.has_role(auth.uid(), 'admin'));

-- Deny public update/delete
CREATE POLICY "Deny public update on analytics"
ON public.analytics
FOR UPDATE
USING (false);

CREATE POLICY "Deny public delete on analytics"
ON public.analytics
FOR DELETE
USING (false);