-- Fix security vulnerabilities in orders table RLS policies

-- Drop existing problematic policies
DROP POLICY IF EXISTS "insert_order" ON public.orders;
DROP POLICY IF EXISTS "update_order" ON public.orders;

-- Create secure insert policy - users can only create orders for themselves
CREATE POLICY "Users can create orders for themselves" 
ON public.orders 
FOR INSERT 
TO authenticated
WITH CHECK (auth.uid() = user_id);

-- Create secure update policy - only order owners or admins can update orders
CREATE POLICY "Order owners and admins can update orders" 
ON public.orders 
FOR UPDATE 
TO authenticated
USING (
  auth.uid() = user_id OR 
  has_role(auth.uid(), 'admin'::app_role)
)
WITH CHECK (
  auth.uid() = user_id OR 
  has_role(auth.uid(), 'admin'::app_role)
);