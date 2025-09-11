import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { items, total } = await req.json();
    
    console.log('Received payment request:', { items, total });

    // Validate input
    if (!items || !Array.isArray(items) || items.length === 0) {
      throw new Error('Items array is required and cannot be empty');
    }

    if (!total || typeof total !== 'number' || total <= 0) {
      throw new Error('Valid total amount is required');
    }

    // Get Mercado Pago credentials
    const accessToken = Deno.env.get('MERCADO_PAGO_ACCESS_TOKEN');
    if (!accessToken) {
      throw new Error('Mercado Pago access token not configured');
    }

    // Create payment preference for Mercado Pago
    const preferenceData = {
      items: items.map(item => ({
        title: item.flavor ? `${item.name} - ${item.flavor}` : item.name,
        quantity: item.quantity,
        unit_price: item.price,
        currency_id: 'CLP'
      })),
      back_urls: {
        success: `${req.headers.get('origin')}/payment-success`,
        failure: `${req.headers.get('origin')}/payment-cancelled`,
        pending: `${req.headers.get('origin')}/payment-cancelled`
      },
      auto_return: 'approved',
      payment_methods: {
        excluded_payment_methods: [],
        excluded_payment_types: [],
        installments: 12
      },
      notification_url: `${req.headers.get('origin')}/api/mercado-pago-webhook`,
      metadata: {
        source: 'vaperos-store'
      }
    };

    console.log('Creating Mercado Pago preference:', preferenceData);

    // Create preference in Mercado Pago
    const response = await fetch('https://api.mercadopago.com/checkout/preferences', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(preferenceData),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Mercado Pago API error:', errorText);
      throw new Error(`Mercado Pago API error: ${response.status}`);
    }

    const preference = await response.json();
    console.log('Mercado Pago preference created:', preference.id);

    // Get user from auth header if available
    const authHeader = req.headers.get('Authorization');
    let userId = null;
    
    if (authHeader) {
      const supabaseClient = createClient(
        Deno.env.get('SUPABASE_URL') ?? '',
        Deno.env.get('SUPABASE_ANON_KEY') ?? '',
        {
          global: {
            headers: { Authorization: authHeader },
          },
        }
      );

      const { data: { user } } = await supabaseClient.auth.getUser();
      userId = user?.id || null;
    }

    // Save order to database (optional)
    const supabaseServiceClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    try {
      // Insert order
      const { data: order, error: orderError } = await supabaseServiceClient
        .from('orders')
        .insert({
          user_id: userId,
          total: total,
          status: 'pending',
          payment_method: 'mercado_pago',
          payment_intent_id: preference.id
        })
        .select()
        .single();

      if (orderError) {
        console.error('Error creating order:', orderError);
      } else if (order) {
        // Insert order items with flavor and color information
        const orderItems = items.map(item => ({
          order_id: order.id,
          product_id: item.id.toString(),
          name: item.name,
          quantity: item.quantity,
          price: item.price,
          flavor: item.flavor || null,
          product_color: item.color || null
        }));

        const { error: itemsError } = await supabaseServiceClient
          .from('order_items')
          .insert(orderItems);

        if (itemsError) {
          console.error('Error creating order items:', itemsError);
        }
      }
    } catch (dbError) {
      console.error('Database error (non-critical):', dbError);
      // Don't fail the payment if database insert fails
    }

    return new Response(
      JSON.stringify({ 
        init_point: preference.init_point,
        preference_id: preference.id 
      }),
      { 
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        } 
      }
    );

  } catch (error) {
    console.error('Error creating Mercado Pago payment:', error);
    return new Response(
      JSON.stringify({ 
        error: error.message || 'Error creating payment' 
      }),
      { 
        status: 400, 
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        } 
      }
    );
  }
});