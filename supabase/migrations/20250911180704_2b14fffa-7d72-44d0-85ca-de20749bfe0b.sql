-- Add flavor and color fields to order_items table
ALTER TABLE public.order_items 
ADD COLUMN flavor TEXT,
ADD COLUMN product_color TEXT;

-- Fix the payment_intent_id column issue in orders table
ALTER TABLE public.orders 
ADD COLUMN payment_intent_id TEXT;