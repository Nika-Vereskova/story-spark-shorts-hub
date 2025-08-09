
-- The issue is that we have conflicting policies for the newsletter_subscribers table
-- Let's clean this up and create the correct policies

-- Drop all existing policies first
DROP POLICY IF EXISTS "Anyone can subscribe to newsletter" ON public.newsletter_subscribers;
DROP POLICY IF EXISTS "Anyone can unsubscribe with token" ON public.newsletter_subscribers;
DROP POLICY IF EXISTS "Anyone can confirm subscription with token" ON public.newsletter_subscribers;
DROP POLICY IF EXISTS "Service role can confirm subscriptions" ON public.newsletter_subscribers;
DROP POLICY IF EXISTS "Service role can read subscribers" ON public.newsletter_subscribers;
DROP POLICY IF EXISTS "Admins can manage all subscribers" ON public.newsletter_subscribers;

-- Create the correct policies
-- Allow anyone to subscribe (INSERT)
CREATE POLICY "Anyone can subscribe to newsletter" 
  ON public.newsletter_subscribers 
  FOR INSERT 
  WITH CHECK (true);

-- Allow service role to read for confirmation lookup
CREATE POLICY "Service role can read subscribers"
  ON public.newsletter_subscribers
  FOR SELECT
  USING (auth.role() = 'service_role');

-- Allow service role to update for confirmation
CREATE POLICY "Service role can confirm subscriptions"
  ON public.newsletter_subscribers
  FOR UPDATE
  USING (auth.role() = 'service_role')
  WITH CHECK (auth.role() = 'service_role');

-- Allow anyone to update with unsubscribe token (for unsubscribe functionality)
CREATE POLICY "Anyone can unsubscribe with token"
  ON public.newsletter_subscribers
  FOR UPDATE
  USING (
    unsubscribe_token = (
      current_setting('request.jwt.claims', true)::json->>'unsubscribe_token'
    )::uuid
  )
  WITH CHECK (
    unsubscribe_token = (
      current_setting('request.jwt.claims', true)::json->>'unsubscribe_token'
    )::uuid
  );

-- Allow admins to manage all subscribers
CREATE POLICY "Admins can manage all subscribers" 
  ON public.newsletter_subscribers 
  FOR ALL 
  USING (has_role(auth.uid(), 'admin'::app_role));
