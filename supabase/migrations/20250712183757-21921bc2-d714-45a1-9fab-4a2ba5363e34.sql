
-- Create orders table to track one-off payments
CREATE TABLE public.orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  stripe_session_id TEXT UNIQUE,
  service_name TEXT NOT NULL,
  amount INTEGER NOT NULL,             -- Amount in öre (SEK cents)
  currency TEXT DEFAULT 'sek',
  status TEXT DEFAULT 'pending',       -- 'pending', 'paid', 'failed'
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create subscribers table to track subscription information
CREATE TABLE public.subscribers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL UNIQUE,
  stripe_customer_id TEXT,
  subscribed BOOLEAN NOT NULL DEFAULT false,
  subscription_tier TEXT,             -- 'monthly', 'yearly'
  subscription_end TIMESTAMPTZ,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subscribers ENABLE ROW LEVEL SECURITY;

-- Create policies for orders
CREATE POLICY "select_own_orders" ON public.orders
  FOR SELECT
  USING (user_id = auth.uid());

CREATE POLICY "insert_order" ON public.orders
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "update_order" ON public.orders
  FOR UPDATE
  USING (true);

-- Create policies for subscribers
CREATE POLICY "select_own_subscription" ON public.subscribers
  FOR SELECT
  USING (user_id = auth.uid() OR email = auth.email());

CREATE POLICY "update_own_subscription" ON public.subscribers
  FOR UPDATE
  USING (true);

CREATE POLICY "insert_subscription" ON public.subscribers
  FOR INSERT
  WITH CHECK (true);
