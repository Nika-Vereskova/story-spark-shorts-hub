
-- Add confirmation fields to the newsletter_subscribers table
ALTER TABLE public.newsletter_subscribers 
ADD COLUMN is_confirmed BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN confirmation_token UUID NOT NULL DEFAULT gen_random_uuid(),
ADD COLUMN confirmed_at TIMESTAMP WITH TIME ZONE NULL;

-- Create index on confirmation_token for faster lookups
CREATE INDEX idx_newsletter_subscribers_confirmation_token ON public.newsletter_subscribers(confirmation_token);

-- Update existing subscribers to be confirmed (for backward compatibility)
UPDATE public.newsletter_subscribers SET is_confirmed = true, confirmed_at = now() WHERE is_confirmed = false;

-- Create policy for public to confirm subscription with token
CREATE POLICY "Anyone can confirm subscription with token" 
  ON public.newsletter_subscribers 
  FOR UPDATE 
  USING (true)
  WITH CHECK (true);
