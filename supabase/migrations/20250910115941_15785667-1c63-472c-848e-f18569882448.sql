-- Create table for storing AI-generated news summaries
CREATE TABLE public.news_summaries (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  summary_content TEXT NOT NULL,
  insights TEXT,
  trending_topics TEXT[],
  period_start TIMESTAMP WITH TIME ZONE NOT NULL,
  period_end TIMESTAMP WITH TIME ZONE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_by UUID REFERENCES auth.users(id),
  story_count INTEGER DEFAULT 0,
  newsletter_sent BOOLEAN DEFAULT FALSE
);

-- Enable RLS
ALTER TABLE public.news_summaries ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Admins can manage news summaries" 
ON public.news_summaries 
FOR ALL 
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Anyone can view published summaries" 
ON public.news_summaries 
FOR SELECT 
USING (newsletter_sent = true);

-- Create index for better performance
CREATE INDEX idx_news_summaries_period ON public.news_summaries(period_start, period_end);
CREATE INDEX idx_news_summaries_created_at ON public.news_summaries(created_at DESC);