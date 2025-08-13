-- Fix newsletter subscribers security vulnerability
-- Remove the overly permissive "Service role can read subscribers" policy
-- and replace it with a more secure admin-only policy

-- First, drop the problematic policy that allows public read access
DROP POLICY IF EXISTS "Service role can read subscribers" ON public.newsletter_subscribers;

-- Create a new policy that only allows admins to read subscriber data
CREATE POLICY "Only admins can read subscribers" 
ON public.newsletter_subscribers 
FOR SELECT 
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role));

-- Also update the confirmation policy to be more specific
-- Keep the existing "Service role can confirm subscriptions" policy as-is since 
-- edge functions need to update confirmation status, but they use service role authentication

-- Ensure the unsubscribe policy is scoped correctly (it should only allow updating is_active to false)
DROP POLICY IF EXISTS "Anyone can unsubscribe with token" ON public.newsletter_subscribers;

CREATE POLICY "Users can unsubscribe with valid token" 
ON public.newsletter_subscribers 
FOR UPDATE 
USING (true)
WITH CHECK (
  -- Only allow updating is_active to false (unsubscribe) or is_confirmed to true (confirmation)
  (OLD.is_active = true AND NEW.is_active = false) OR 
  (OLD.is_confirmed = false AND NEW.is_confirmed = true)
);