
-- Create a table for site metrics
CREATE TABLE public.site_metrics (
  id TEXT PRIMARY KEY DEFAULT 'global',
  total_visits BIGINT DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Insert the initial global record
INSERT INTO public.site_metrics (id, total_visits) VALUES ('global', 0);

-- Enable Row Level Security (RLS) - but allow public read access for the counter
ALTER TABLE public.site_metrics ENABLE ROW LEVEL SECURITY;

-- Create policy that allows anyone to read the global counter
CREATE POLICY "Anyone can view global metrics" 
  ON public.site_metrics 
  FOR SELECT 
  USING (id = 'global');

-- Create policy that allows the service role to update the counter (for edge function)
CREATE POLICY "Service role can update global metrics" 
  ON public.site_metrics 
  FOR UPDATE 
  USING (id = 'global');
