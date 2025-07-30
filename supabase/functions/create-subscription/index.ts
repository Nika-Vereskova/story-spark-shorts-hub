
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@14.21.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  const supabaseClient = createClient(
    Deno.env.get("SUPABASE_URL") ?? "",
    Deno.env.get("SUPABASE_ANON_KEY") ?? ""
  );

  try {
    if (Deno.env.get('NODE_ENV') === 'development') {
      console.log("Starting subscription creation");
    }
    
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      throw new Error("No authorization header");
    }

    const token = authHeader.replace("Bearer ", "");
    const { data } = await supabaseClient.auth.getUser(token);
    const user = data.user;
    if (!user?.email) {
      throw new Error("User not authenticated");
    }

    if (Deno.env.get('NODE_ENV') === 'development') {
      console.log("User authenticated:", user.email);
    }

    const { subscriptionTier } = await req.json();
    if (Deno.env.get('NODE_ENV') === 'development') {
      console.log("Subscription tier:", subscriptionTier);
    }
    
    const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") || "", {
      apiVersion: "2023-10-16",
    });

    // Check for existing customer
    const customers = await stripe.customers.list({ email: user.email, limit: 1 });
    let customerId;
    if (customers.data.length > 0) {
      customerId = customers.data[0].id;
      if (Deno.env.get('NODE_ENV') === 'development') {
        console.log("Found existing customer:", customerId);
      }
    } else {
      if (Deno.env.get('NODE_ENV') === 'development') {
        console.log("No existing customer found");
      }
    }

    const priceData = subscriptionTier === 'yearly' ? {
      currency: "sek",
      product_data: { name: "AI Courses - Yearly" },
      unit_amount: 100000, // 1000 SEK in öre
      recurring: { interval: "year" as const },
    } : {
      currency: "sek", 
      product_data: { name: "AI Courses - Monthly" },
      unit_amount: 10000, // 100 SEK in öre
      recurring: { interval: "month" as const },
    };

    if (Deno.env.get('NODE_ENV') === 'development') {
      console.log("Creating checkout session with price data:", priceData);
    }

    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      customer_email: customerId ? undefined : user.email,
      line_items: [
        {
          price_data: priceData,
          quantity: 1,
        },
      ],
      mode: "subscription",
      success_url: `${req.headers.get("origin")}/services?subscription=success`,
      cancel_url: `${req.headers.get("origin")}/services?subscription=cancelled`,
    });

    if (Deno.env.get('NODE_ENV') === 'development') {
      console.log("Checkout session created:", session.id);
    }

    return new Response(JSON.stringify({ url: session.url }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    console.error("Error in create-subscription:", error);
    return new Response(JSON.stringify({ 
      error: error.message,
      details: error.stack 
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
