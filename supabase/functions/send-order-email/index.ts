import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface OrderItem {
  name: string;
  quantity: number;
  price: number;
}

interface OrderEmailRequest {
  customerData: {
    firstName: string;
    lastName: string;
    rut: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    region: string;
    postalCode: string;
  };
  items: OrderItem[];
  total: number;
  subtotal: number;
  discount?: number;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { customerData, items, total, subtotal, discount }: OrderEmailRequest = await req.json();

    console.log("Processing order email for:", customerData.email);

    // Format items list
    const itemsList = items.map(item => 
      `- ${item.name} x${item.quantity} - $${item.price.toLocaleString('es-CL')}`
    ).join('\n');

    // Build email message
    const emailMessage = `🛒 NUEVO PEDIDO VAPEROS.CL

📦 Datos del cliente:
Nombre: ${customerData.firstName} ${customerData.lastName}
RUT: ${customerData.rut}
Email: ${customerData.email}
Teléfono: ${customerData.phone || 'No proporcionado'}

🏠 Dirección de envío:
${customerData.address}
${customerData.city}, ${customerData.region}
Código Postal: ${customerData.postalCode}

🛍 Productos:
${itemsList}

💰 Subtotal: $${subtotal.toLocaleString('es-CL')}
${discount ? `🎫 Descuento: -$${discount.toLocaleString('es-CL')}` : ''}
💰 Total: $${total.toLocaleString('es-CL')}`;

    // Send email via Web3Forms
    const formData = new FormData();
    formData.append('access_key', 'cf71c127-c06e-435a-a775-7a5441a0e616');
    formData.append('subject', '🛒 Nuevo Pedido - Vaperos.cl');
    formData.append('from_name', 'Vaperos.cl');
    formData.append('message', emailMessage);

    const response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      body: formData
    });

    const result = await response.json();

    if (result.success) {
      console.log("Order email sent successfully");
      return new Response(
        JSON.stringify({ success: true, message: "Email sent successfully" }),
        {
          status: 200,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    } else {
      throw new Error(result.message || "Failed to send email");
    }
  } catch (error: any) {
    console.error("Error sending order email:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
