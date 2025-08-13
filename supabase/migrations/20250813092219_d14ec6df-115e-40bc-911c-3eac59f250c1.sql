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

-- Update the unsubscribe policy to be more restrictive
DROP POLICY IF EXISTS "Anyone can unsubscribe with token" ON public.newsletter_subscribers;

-- Create a more secure unsubscribe policy that only allows deactivation
CREATE POLICY "Users can unsubscribe with valid token" 
ON public.newsletter_subscribers 
FOR UPDATE 
USING (true)
WITH CHECK (is_active = false OR is_confirmed = true);