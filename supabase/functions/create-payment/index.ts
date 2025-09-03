import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@14.21.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  console.log("CREATE-PAYMENT: Function started");
  
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { items, total } = await req.json();
    console.log("CREATE-PAYMENT: Received data", { items, total });

    // Check if Stripe secret key exists
    const stripeKey = Deno.env.get("STRIPE_SECRET_KEY");
    if (!stripeKey) {
      console.error("CREATE-PAYMENT: STRIPE_SECRET_KEY not found");
      throw new Error("STRIPE_SECRET_KEY not configured");
    }

    // Initialize Stripe
    const stripe = new Stripe(stripeKey, {
      apiVersion: "2023-10-16",
    });
    console.log("CREATE-PAYMENT: Stripe initialized");

    // Create Supabase client
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_ANON_KEY") ?? ""
    );

    // Get user from auth header if available
    let user = null;
    const authHeader = req.headers.get("Authorization");
    if (authHeader) {
      const token = authHeader.replace("Bearer ", "");
      const { data } = await supabaseClient.auth.getUser(token);
      user = data.user;
    }
    console.log("CREATE-PAYMENT: User", { userId: user?.id, email: user?.email });

    // Create line items for Stripe
    const lineItems = items.map((item: any) => ({
      price_data: {
        currency: "clp",
        product_data: {
          name: item.name,
        },
        unit_amount: Math.round(item.price),
      },
      quantity: item.quantity,
    }));
    console.log("CREATE-PAYMENT: Line items created", lineItems);

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      customer_email: user?.email || "guest@vaperos.cl",
      line_items: lineItems,
      mode: "payment",
      success_url: `${req.headers.get("origin")}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.get("origin")}/payment-cancelled`,
      metadata: {
        user_id: user?.id || "guest",
        total_amount: total.toString(),
      },
    });
    console.log("CREATE-PAYMENT: Stripe session created", { sessionId: session.id });

    // Create order in database using correct schema
    const supabaseService = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
      { auth: { persistSession: false } }
    );

    const { data: order, error: orderError } = await supabaseService
      .from("orders")
      .insert({
        user_id: user?.id || null,
        total: Math.round(total),
        status: "pending",
        payment_method: "stripe",
        stripe_session_id: session.id,
      })
      .select()
      .single();

    if (orderError) {
      console.error("CREATE-PAYMENT: Order creation error", orderError);
      throw orderError;
    }
    console.log("CREATE-PAYMENT: Order created", { orderId: order.id });

    // Create order items using correct schema
    const orderItems = items.map((item: any) => ({
      order_id: order.id,
      product_id: item.id.toString(),
      name: item.name,
      price: Math.round(item.price),
      quantity: item.quantity,
    }));

    const { error: itemsError } = await supabaseService
      .from("order_items")
      .insert(orderItems);

    if (itemsError) {
      console.error("CREATE-PAYMENT: Order items creation error", itemsError);
      throw itemsError;
    }
    console.log("CREATE-PAYMENT: Order items created successfully");

    return new Response(JSON.stringify({ url: session.url }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    console.error("CREATE-PAYMENT: Error", error);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});