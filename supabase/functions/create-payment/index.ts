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
    // Parse request body
    let requestBody;
    try {
      requestBody = await req.json();
      console.log("CREATE-PAYMENT: Request body parsed successfully", requestBody);
    } catch (parseError) {
      console.error("CREATE-PAYMENT: Failed to parse request body", parseError);
      return new Response(JSON.stringify({ error: "Invalid JSON in request body" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 400,
      });
    }

    const { items, total } = requestBody;
    console.log("CREATE-PAYMENT: Received data", { items, total });

    // Validate input data
    if (!items || !Array.isArray(items) || items.length === 0) {
      console.error("CREATE-PAYMENT: Invalid items data");
      return new Response(JSON.stringify({ error: "Items array is required and cannot be empty" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 400,
      });
    }

    if (!total || typeof total !== 'number' || total <= 0) {
      console.error("CREATE-PAYMENT: Invalid total", total);
      return new Response(JSON.stringify({ error: "Total must be a positive number" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 400,
      });
    }

    // Check if Stripe secret key exists
    const stripeKey = Deno.env.get("STRIPE_SECRET_KEY");
    if (!stripeKey) {
      console.error("CREATE-PAYMENT: STRIPE_SECRET_KEY not found");
      return new Response(JSON.stringify({ error: "Payment processing not configured" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      });
    }
    console.log("CREATE-PAYMENT: Stripe key found");

    // Initialize Stripe
    let stripe;
    try {
      stripe = new Stripe(stripeKey, {
        apiVersion: "2023-10-16",
      });
      console.log("CREATE-PAYMENT: Stripe initialized");
    } catch (stripeError) {
      console.error("CREATE-PAYMENT: Failed to initialize Stripe", stripeError);
      return new Response(JSON.stringify({ error: "Failed to initialize payment processor" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      });
    }

    // Create Supabase client
    let supabaseClient;
    try {
      supabaseClient = createClient(
        Deno.env.get("SUPABASE_URL") ?? "",
        Deno.env.get("SUPABASE_ANON_KEY") ?? ""
      );
      console.log("CREATE-PAYMENT: Supabase client created");
    } catch (supabaseError) {
      console.error("CREATE-PAYMENT: Failed to create Supabase client", supabaseError);
      return new Response(JSON.stringify({ error: "Database connection failed" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      });
    }

    // Get user from auth header if available
    let user = null;
    const authHeader = req.headers.get("Authorization");
    if (authHeader) {
      try {
        const token = authHeader.replace("Bearer ", "");
        const { data } = await supabaseClient.auth.getUser(token);
        user = data.user;
        console.log("CREATE-PAYMENT: User authenticated", { userId: user?.id, email: user?.email });
      } catch (authError) {
        console.error("CREATE-PAYMENT: Auth error", authError);
        // Continue as guest if auth fails
      }
    } else {
      console.log("CREATE-PAYMENT: No auth header, proceeding as guest");
    }

    // Create line items for Stripe
    let lineItems;
    try {
      lineItems = items.map((item: any) => {
        const unitAmount = Math.round(item.price);
        console.log(`CREATE-PAYMENT: Processing item ${item.name}, price: ${item.price} -> ${unitAmount}`);
        
        if (unitAmount <= 0) {
          throw new Error(`Invalid price for item ${item.name}: ${item.price}`);
        }
        
        return {
          price_data: {
            currency: "clp",
            product_data: {
              name: item.name,
            },
            unit_amount: unitAmount,
          },
          quantity: item.quantity,
        };
      });
      console.log("CREATE-PAYMENT: Line items created", lineItems);
    } catch (itemError) {
      console.error("CREATE-PAYMENT: Failed to create line items", itemError);
      return new Response(JSON.stringify({ error: `Invalid item data: ${itemError.message}` }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 400,
      });
    }

    // Create Stripe checkout session
    let session;
    try {
      const origin = req.headers.get("origin") || "https://www.vaperos.cl";
      console.log("CREATE-PAYMENT: Creating Stripe session with origin:", origin);
      
      session = await stripe.checkout.sessions.create({
        customer_email: user?.email || "guest@vaperos.cl",
        line_items: lineItems,
        mode: "payment",
        success_url: `${origin}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${origin}/payment-cancelled`,
        metadata: {
          user_id: user?.id || "guest",
          total_amount: total.toString(),
        },
      });
      console.log("CREATE-PAYMENT: Stripe session created", { sessionId: session.id, url: session.url });
    } catch (stripeSessionError) {
      console.error("CREATE-PAYMENT: Failed to create Stripe session", stripeSessionError);
      return new Response(JSON.stringify({ 
        error: "Failed to create payment session", 
        details: stripeSessionError.message 
      }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      });
    }

    // Create order in database using correct schema
    let supabaseService;
    try {
      supabaseService = createClient(
        Deno.env.get("SUPABASE_URL") ?? "",
        Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
        { auth: { persistSession: false } }
      );
      console.log("CREATE-PAYMENT: Service client created");
    } catch (serviceError) {
      console.error("CREATE-PAYMENT: Failed to create service client", serviceError);
      // Continue without database logging if service client fails
      return new Response(JSON.stringify({ url: session.url }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      });
    }

    // Try to create order in database (optional, don't fail if this fails)
    try {
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
        console.error("CREATE-PAYMENT: Order creation error (non-critical)", orderError);
      } else {
        console.log("CREATE-PAYMENT: Order created", { orderId: order.id });
        
        // Create order items
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
          console.error("CREATE-PAYMENT: Order items creation error (non-critical)", itemsError);
        } else {
          console.log("CREATE-PAYMENT: Order items created successfully");
        }
      }
    } catch (dbError) {
      console.error("CREATE-PAYMENT: Database error (non-critical)", dbError);
      // Continue anyway, the payment session is what matters
    }

    console.log("CREATE-PAYMENT: Returning success response");
    return new Response(JSON.stringify({ url: session.url }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    console.error("CREATE-PAYMENT: Unexpected error", error);
    return new Response(JSON.stringify({ 
      error: error.message || "An unexpected error occurred",
      stack: error.stack
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});