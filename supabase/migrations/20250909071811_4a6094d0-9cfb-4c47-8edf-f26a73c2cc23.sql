-- Add new columns to news_posts table for enhanced content management
ALTER TABLE public.news_posts 
ADD COLUMN IF NOT EXISTS content TEXT,
ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
ADD COLUMN IF NOT EXISTS source TEXT DEFAULT 'manual' CHECK (source IN ('manual', 'perplexity', 'rss', 'api')),
ADD COLUMN IF NOT EXISTS extraction_prompt TEXT,
ADD COLUMN IF NOT EXISTS author_id UUID REFERENCES auth.users(id),
ADD COLUMN IF NOT EXISTS meta_description TEXT,
ADD COLUMN IF NOT EXISTS meta_keywords TEXT[];

-- Create index for better performance on status queries
CREATE INDEX IF NOT EXISTS idx_news_posts_status ON public.news_posts(status);
CREATE INDEX IF NOT EXISTS idx_news_posts_source ON public.news_posts(source);
CREATE INDEX IF NOT EXISTS idx_news_posts_author ON public.news_posts(author_id);

-- Update RLS policies to handle new status field
DROP POLICY IF EXISTS "Anyone can view published news posts" ON public.news_posts;
CREATE POLICY "Anyone can view published news posts" 
ON public.news_posts 
FOR SELECT 
USING (status = 'published');

-- Policy for admins to see all posts regardless of status
CREATE POLICY "Admins can view all news posts" 
ON public.news_posts 
FOR SELECT 
USING (has_role(auth.uid(), 'admin'::app_role));

-- Create a function to automatically set author_id on insert
CREATE OR REPLACE FUNCTION public.set_news_author()
RETURNS TRIGGER AS $$
BEGIN
  -- Only set author_id if it's not already set and user is authenticated
  IF NEW.author_id IS NULL AND auth.uid() IS NOT NULL THEN
    NEW.author_id = auth.uid();
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger to automatically set author
DROP TRIGGER IF EXISTS set_news_author_trigger ON public.news_posts;
CREATE TRIGGER set_news_author_trigger
  BEFORE INSERT ON public.news_posts
  FOR EACH ROW
  EXECUTE FUNCTION public.set_news_author();