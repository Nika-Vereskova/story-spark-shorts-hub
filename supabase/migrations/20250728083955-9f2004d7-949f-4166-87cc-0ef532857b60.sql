-- Create the update timestamp trigger function
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create NewsPost table for AI news articles
CREATE TABLE public.news_posts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  cover_url TEXT,
  summary TEXT,
  published_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  article_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.news_posts ENABLE ROW LEVEL SECURITY;

-- Create policies for news posts (public read access)
CREATE POLICY "Anyone can view published news posts" 
ON public.news_posts 
FOR SELECT 
USING (true);

CREATE POLICY "Admins can manage news posts" 
ON public.news_posts 
FOR ALL 
USING (has_role(auth.uid(), 'admin'::app_role));

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_news_posts_updated_at
BEFORE UPDATE ON public.news_posts
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Seed sample news posts
INSERT INTO public.news_posts (title, slug, cover_url, summary, article_url) VALUES 
(
  'Custom GPTs: Revolutionizing Children''s Storytelling',
  'custom-gpts-children-storytelling',
  '/lovable-uploads/64f9c8ed-7532-43d6-a694-85153b7cae57.png',
  'Discover how AI-powered storytelling assistants are creating personalized fairy tales while maintaining child safety and educational value.',
  '#'
),
(
  'AI Policy Workshop: Building Ethical Guidelines for Schools',
  'ai-policy-workshop-schools',
  '/lovable-uploads/8b2801e0-86c4-4ebc-9c8d-e51acaef11d8.png',
  'Learn how educational institutions can implement responsible AI policies that protect students while embracing innovation.',
  '#'
),
(
  'From Steampunk to Serverless: My Journey into AI Consulting',
  'steampunk-to-serverless-ai-journey',
  '/lovable-uploads/64f9c8ed-7532-43d6-a694-85153b7cae57.png',
  'The surprising parallels between crafting magical worlds and building intelligent systems that solve real business problems.',
  '#'
);