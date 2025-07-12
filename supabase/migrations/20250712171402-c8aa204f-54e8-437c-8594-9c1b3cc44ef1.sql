
-- Create a table to store newsletter subscribers
CREATE TABLE public.newsletter_subscribers (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  subscribed_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  is_active BOOLEAN NOT NULL DEFAULT true,
  unsubscribe_token UUID NOT NULL DEFAULT gen_random_uuid()
);

-- Add Row Level Security
ALTER TABLE public.newsletter_subscribers ENABLE ROW LEVEL SECURITY;

-- Create policy for admins to manage subscribers
CREATE POLICY "Admins can manage all subscribers" 
  ON public.newsletter_subscribers 
  FOR ALL 
  USING (has_role(auth.uid(), 'admin'::app_role));

-- Create policy for public to insert (newsletter signup)
CREATE POLICY "Anyone can subscribe to newsletter" 
  ON public.newsletter_subscribers 
  FOR INSERT 
  WITH CHECK (true);

-- Create policy for public to update their own subscription (unsubscribe)
CREATE POLICY "Anyone can unsubscribe with token" 
  ON public.newsletter_subscribers 
  FOR UPDATE 
  USING (true);

-- Create a table to store sent newsletters for tracking
CREATE TABLE public.newsletters (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  subject TEXT NOT NULL,
  content TEXT NOT NULL,
  sent_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  recipient_count INTEGER NOT NULL DEFAULT 0,
  created_by UUID REFERENCES auth.users(id) NOT NULL
);

-- Add Row Level Security for newsletters
ALTER TABLE public.newsletters ENABLE ROW LEVEL SECURITY;

-- Create policy for admins to manage newsletters
CREATE POLICY "Admins can manage newsletters" 
  ON public.newsletters 
  FOR ALL 
  USING (has_role(auth.uid(), 'admin'::app_role));
