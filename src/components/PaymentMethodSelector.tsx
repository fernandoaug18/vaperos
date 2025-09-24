import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { ArrowLeft, Smartphone } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { CartItem } from "@/hooks/useCart";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";


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

  const handleMercadoPagoPayment = async () => {
    setLoading(true);
    try {
      // Para una solución frontend-only, necesitamos configurar Mercado Pago correctamente
      // Opción 1: Usando el SDK de Mercado Pago (recomendado)
      
      // Por ahora, como solución temporal, crearemos un enlace de pago directo
      // IMPORTANTE: Para producción necesitas configurar un backend o usar Mercado Pago Link
      
      const itemsDescription = items.map(item => 
        `${item.name} - ${item.flavor} (x${item.quantity})`
      ).join(', ');
      
      const discountText = appliedCoupon ? ` con descuento ${appliedCoupon.toUpperCase()} (-${discountPercentage}%)` : '';
      const description = `Pedido Vaperos: ${itemsDescription}${discountText}`;
      
      // Crear un enlace de pago usando Mercado Pago Link (solución simple)
      // Reemplaza 'TU_USUARIO_MP' con tu usuario de Mercado Pago
      const mercadoPagoLink = `https://www.mercadopago.cl/checkout/v1/redirect?pref_id=DEMO`;
      
      // Como alternativa temporal, mostrar información del pedido y sugerir contacto
      toast({
        title: "Información de Pago",
        description: "Para completar tu compra, contáctanos por WhatsApp con los detalles de tu pedido.",
      });
      
      // Crear mensaje para WhatsApp con los detalles del pedido
      const whatsappMessage = encodeURIComponent(
        `🛒 *Nuevo Pedido Vaperos*\n\n` +
        `📦 *Productos:*\n` +
        items.map(item => 
          `• ${item.name} - ${item.flavor} x${item.quantity} = $${(parseFloat(item.price.replace(/\./g, '')) * item.quantity).toLocaleString('es-CL')}`
        ).join('\n') +
        `\n\n💰 *Resumen:*\n` +
        `Subtotal: $${subtotal.toLocaleString('es-CL')}\n` +
        (appliedCoupon ? `Descuento (${appliedCoupon.toUpperCase()} -${discountPercentage}%): -$${discount.toLocaleString('es-CL')}\n` : '') +
        `*Total: $${total.toLocaleString('es-CL')}*\n\n` +
        `✅ Confirma tu pedido y coordinaremos el pago y entrega.`
      );
      
      // Reemplaza este número con tu número de WhatsApp Business
      const whatsappNumber = '56912345678'; // Formato: código país + número sin +
      const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;
      
      window.open(whatsappUrl, '_blank');
      
    } catch (error) {
      console.error('Error al procesar el pedido:', error);
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
                    <div className="p-2 bg-green-500 rounded-lg">
                      <Smartphone className="h-5 w-5 text-white" />
                    </div>
                    <div className="text-left">
                      <div className="font-medium">Pagar por WhatsApp</div>
                      <div className="text-sm text-muted-foreground">
                        Envía tu pedido y coordina el pago
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