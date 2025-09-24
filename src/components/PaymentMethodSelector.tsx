import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { ArrowLeft, CreditCard } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { CartItem } from "@/hooks/useCart";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";

// Declarar el objeto global de MercadoPago
declare global {
  interface Window {
    MercadoPago: any;
  }
}


interface PaymentMethodSelectorProps {
  total: number;
  subtotal: number;
  discount: number;
  appliedCoupon: string | null;
  discountPercentage: number;
  items: CartItem[];
  onBack: () => void;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export const PaymentMethodSelector = ({ 
  total,
  subtotal,
  discount,
  appliedCoupon,
  discountPercentage,
  items, 
  onBack, 
  isOpen, 
  onOpenChange 
}: PaymentMethodSelectorProps) => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP',
      minimumFractionDigits: 0
    }).format(price);
  };

  useEffect(() => {
    // Cargar el SDK de Mercado Pago
    const script = document.createElement('script');
    script.src = 'https://sdk.mercadopago.com/js/v2';
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      // Configuración con tu Public Key de Mercado Pago
      const mp = new window.MercadoPago('APP_USR-60214f51-20bd-4ef6-903e-c54b111f8df6', {
        locale: 'es-CL'
      });
    };

    return () => {
      // Limpiar el script al desmontar el componente
      const existingScript = document.querySelector('script[src="https://sdk.mercadopago.com/js/v2"]');
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, []);

  const handleMercadoPagoPayment = async () => {
    setLoading(true);
    try {
      // Preparar los items para Mercado Pago
      const mpItems = items.map(item => ({
        title: `${item.name} - ${item.flavor}`,
        quantity: item.quantity,
        unit_price: parseFloat(item.price.replace(/\./g, '')),
        currency_id: 'CLP'
      }));

      // Crear la preferencia de pago con el precio con descuento aplicado
      const preference = {
        items: [
          {
            title: 'Pedido Vaperos',
            quantity: 1,
            unit_price: total, // Este ya viene con el descuento aplicado
            currency_id: 'CLP',
            description: `Pedido de ${items.length} producto(s)${appliedCoupon ? ` con descuento ${appliedCoupon.toUpperCase()} (-${discountPercentage}%)` : ''}`
          }
        ],
        back_urls: {
          success: `${window.location.origin}/payment-success`,
          failure: `${window.location.origin}/payment-cancelled`,
          pending: `${window.location.origin}/payment-pending`
        },
        auto_return: 'approved',
        external_reference: `pedido-${Date.now()}`,
        metadata: {
          applied_coupon: appliedCoupon,
          discount_percentage: discountPercentage,
          original_subtotal: subtotal,
          discount_amount: discount,
          final_total: total
        }
      };

      // Crear preferencia usando el Access Token
      const response = await fetch('https://api.mercadopago.com/checkout/preferences', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer APP_USR-4714345607038986-091113-e77f3d9fc9c788e194677adc073ad4ba-2686457998'
        },
        body: JSON.stringify(preference)
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Error de Mercado Pago:', errorData);
        throw new Error('Error al crear la preferencia de pago');
      }

      const data = await response.json();
      
      toast({
        title: "Redirigiendo a Mercado Pago",
        description: "Te estamos llevando a completar tu pago de forma segura.",
      });
      
      // Redirigir al checkout de Mercado Pago con un pequeño delay
      setTimeout(() => {
        window.location.href = data.init_point;
      }, 1500);
      
    } catch (error) {
      console.error('Error al procesar el pago:', error);
      toast({
        title: "Error",
        description: "Ocurrió un error al procesar tu pedido. Por favor intenta nuevamente.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-md">
        <SheetHeader>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={onBack}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <SheetTitle>Método de Pago</SheetTitle>
          </div>
        </SheetHeader>

        <div className="py-6 space-y-6">
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-medium mb-2">Resumen del Pedido</h3>
            <div className="space-y-1 text-sm">
              {items.map((item) => (
                <div key={item.id} className="flex justify-between">
                  <span>
                    {item.name} - {item.flavor} x{item.quantity}
                  </span>
                  <span>${parseFloat(item.price.replace(/\./g, '')) * item.quantity}</span>
                </div>
              ))}
            </div>
            
            <div className="border-t mt-3 pt-2 space-y-1">
              <div className="flex justify-between text-sm">
                <span>Subtotal:</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              
              {appliedCoupon && (
                <div className="flex justify-between text-sm text-green-600">
                  <span>Descuento ({discountPercentage}%):</span>
                  <span>-{formatPrice(discount)}</span>
                </div>
              )}
              
              <div className="flex justify-between font-semibold border-t pt-1">
                <span>Total:</span>
                <span>{formatPrice(total)}</span>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="font-medium">Selecciona tu método de pago:</h3>
            
            <Card className="cursor-pointer hover:bg-accent transition-colors">
              <CardContent className="p-4">
                <Button 
                  variant="ghost" 
                  className="w-full justify-start h-auto p-0"
                  onClick={handleMercadoPagoPayment}
                  disabled={loading}
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-500 rounded-lg">
                      <CreditCard className="h-5 w-5 text-white" />
                    </div>
                    <div className="text-left">
                      <div className="font-medium">Pagar con Mercado Pago</div>
                      <div className="text-sm text-muted-foreground">
                        Tarjetas, transferencias y más
                      </div>
                    </div>
                  </div>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};