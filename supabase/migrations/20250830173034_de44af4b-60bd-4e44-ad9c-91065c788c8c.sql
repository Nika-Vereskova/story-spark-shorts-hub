-- Fix security issue in subscribers table RLS policies
-- Issue: Email-based access could allow unauthorized data access

-- First, ensure all existing records have proper user_id values
-- Update any records that might be missing user_id (though this should be rare)
UPDATE public.subscribers 
SET user_id = (
  SELECT id FROM auth.users WHERE email = subscribers.email LIMIT 1
)
WHERE user_id IS NULL AND email IS NOT NULL;

-- Make user_id NOT NULL to ensure all records are properly linked
ALTER TABLE public.subscribers 
ALTER COLUMN user_id SET NOT NULL;

-- Drop the existing insecure policies
DROP POLICY IF EXISTS "select_own_subscription" ON public.subscribers;
DROP POLICY IF EXISTS "insert_subscription" ON public.subscribers;
DROP POLICY IF EXISTS "update_own_subscription" ON public.subscribers;

-- Create new secure policies that only use user_id matching
CREATE POLICY "Users can view their own subscription" 
ON public.subscribers 
FOR SELECT 
USING (user_id = auth.uid());

CREATE POLICY "Authenticated users can insert their own subscription" 
ON public.subscribers 
FOR INSERT 
WITH CHECK (auth.uid() IS NOT NULL AND user_id = auth.uid());

CREATE POLICY "Users can update their own subscription" 
ON public.subscribers 
FOR UPDATE 
USING (user_id = auth.uid())
WITH CHECK (user_id = auth.uid());

-- Allow service role to manage subscriptions (for stripe webhooks/functions)
CREATE POLICY "Service role can manage all subscriptions" 
ON public.subscribers 
FOR ALL 
USING (auth.role() = 'service_role')
WITH CHECK (auth.role() = 'service_role');