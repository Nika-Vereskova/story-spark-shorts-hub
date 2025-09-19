-- Create site_settings table for editable website metadata
CREATE TABLE public.site_settings (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  site_title text NOT NULL DEFAULT 'STEaM LOGIC Studio AB',
  site_description text NOT NULL DEFAULT 'Expert AI consulting services by STEaM LOGIC Studio AB. CEO Renata Khakimova specializes in custom GPT development, AI strategy, and automation solutions.',
  seo_image_url text,
  logo_url text,
  meta_keywords text[] DEFAULT ARRAY['STEaM LOGIC Studio AB', 'Renata Khakimova CEO', 'AI consulting', 'custom GPT development'],
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Anyone can view site settings" 
ON public.site_settings 
FOR SELECT 
USING (true);

CREATE POLICY "Only admins can manage site settings" 
ON public.site_settings 
FOR ALL 
USING (has_role(auth.uid(), 'admin'::app_role));

-- Insert default settings
INSERT INTO public.site_settings (
  site_title, 
  site_description, 
  meta_keywords
) VALUES (
  'STEaM LOGIC Studio AB | AI Consulting & Creative Technology by CEO Renata Khakimova',
  'Expert AI consulting services by STEaM LOGIC Studio AB. CEO Renata Khakimova specializes in custom GPT development, AI strategy, and automation solutions. Award-winning books by Nika Vereskova.',
  ARRAY['STEaM LOGIC Studio AB', 'Renata Khakimova CEO', 'AI consulting', 'custom GPT development', 'AI strategy consultant', 'Nika Vereskova books', 'steampunk children''s books', 'Europe capitals trainer', 'Learn AI beginners', 'artificial intelligence consultant Sweden', 'process automation', 'ChatGPT development', 'AI workshops']
);

-- Create storage buckets for site images
INSERT INTO storage.buckets (id, name, public) 
VALUES ('site-images', 'site-images', true);

-- Create storage policies
CREATE POLICY "Site images are publicly accessible" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'site-images');

CREATE POLICY "Admins can upload site images" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'site-images' AND has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can update site images" 
ON storage.objects 
FOR UPDATE 
USING (bucket_id = 'site-images' AND has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete site images" 
ON storage.objects 
FOR DELETE 
USING (bucket_id = 'site-images' AND has_role(auth.uid(), 'admin'::app_role));

-- Add trigger for updated_at
CREATE TRIGGER update_site_settings_updated_at
BEFORE UPDATE ON public.site_settings
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();