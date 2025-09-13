-- Add individual_summaries field to store detailed article summaries with citations
ALTER TABLE public.news_summaries 
ADD COLUMN individual_summaries TEXT;