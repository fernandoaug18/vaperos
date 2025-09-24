import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { ArrowLeft, Smartphone } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { CartItem } from "@/hooks/useCart";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";


interface PaymentMethodSelectorProps {
  total: number;
  items: CartItem[];
  onBack: () => void;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export const PaymentMethodSelector = ({ 
  total, 
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

  const handleMercadoPagoPayment = async () => {
    setLoading(true);
    try {
      console.log('Starting Mercado Pago payment with items:', items);
      console.log('Total price:', total);
      
      // Crear preferencia de pago directamente con Mercado Pago
      const preference = {
        items: items.map(item => ({
          id: item.id,
          title: `${item.name} - ${item.flavor || ''}`,
          unit_price: parseFloat(item.price.replace(/\./g, '')),
          quantity: item.quantity,
          currency_id: 'CLP'
        })),
        payer: {
          email: 'test_user@test.com' // Email por defecto
        },
        back_urls: {
          success: `${window.location.origin}/payment-success`,
          failure: `${window.location.origin}/payment-cancelled`,
          pending: `${window.location.origin}/payment-cancelled`
        },
        auto_return: 'approved',
        payment_methods: {
          excluded_payment_types: [],
          excluded_payment_methods: [],
          installments: 12
        },
        notification_url: `${window.location.origin}/webhooks/mercadopago`,
        statement_descriptor: 'VAPEROS'
      };

      // IMPORTANTE: Reemplaza este token de prueba con tu Access Token real de Mercado Pago
      // Puedes obtener tu token en: https://www.mercadopago.cl/developers/panel/app
      // Para producción, mantén este token seguro como variable de entorno
      const accessToken = 'TEST-2441634409951788-092414-c47bf38509948b7e86bb9c5da1c6a7a8-191897312'; // Token de prueba
      
      const response = await fetch('https://api.mercadopago.com/checkout/preferences', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        },
        body: JSON.stringify(preference)
      });

      const data = await response.json();
      
      if (data.init_point) {
        window.open(data.init_point, '_blank');
        toast({
          title: "Éxito",
          description: "Redirigiendo a Mercado Pago...",
        });
      } else {
        throw new Error('No se pudo crear la preferencia de pago');
      }
    } catch (error) {
      console.error('Mercado Pago payment failed:', error);
      toast({
        title: "Error",
        description: `No se pudo procesar el pago: ${error.message || 'Error desconocido'}`,
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
            <div className="border-t mt-2 pt-2 flex justify-between font-semibold">
              <span>Total:</span>
              <span>{formatPrice(total)}</span>
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
                      <Smartphone className="h-5 w-5 text-white" />
                    </div>
                    <div className="text-left">
                      <div className="font-medium">Mercado Pago</div>
                      <div className="text-sm text-muted-foreground">
                        Paga con Mercado Pago
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