import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { ArrowLeft, Smartphone } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { CartItem } from "@/hooks/useCart";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

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
      
      const processedItems = items.map(item => ({
        id: item.id,
        name: item.name,
        flavor: item.flavor,
        color: item.color,
        price: parseFloat(item.price.replace(/\./g, '')), // Handle Chilean format correctly
        quantity: item.quantity
      }));
      
      console.log('Processed items for Mercado Pago:', processedItems);
      
      const { data, error } = await supabase.functions.invoke('create-mercado-pago-payment', {
        body: { 
          items: processedItems,
          total: total
        }
      });

      console.log('Mercado Pago response:', data, error);

      if (error) {
        console.error('Mercado Pago error:', error);
        throw error;
      }

      if (data?.init_point) {
        console.log('Redirecting to Mercado Pago:', data.init_point);
        window.open(data.init_point, '_blank');
      } else {
        throw new Error('No payment URL received from Mercado Pago');
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