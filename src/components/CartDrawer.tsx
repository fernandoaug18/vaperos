import { useCart } from "@/hooks/useCart";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { ShoppingCart, Plus, Minus, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import { PaymentMethodSelector } from "./PaymentMethodSelector";
import { CouponInput } from "./CouponInput";

export const CartDrawer = () => {
  const { 
    items, 
    updateQuantity, 
    removeFromCart, 
    getTotalItems, 
    getTotalPrice, 
    getSubtotal,
    getDiscountAmount,
    applyCoupon,
    removeCoupon,
    appliedCoupon,
    discountPercentage,
    isOpen, 
    setIsOpen 
  } = useCart();
  const [showPayment, setShowPayment] = useState(false);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP',
      minimumFractionDigits: 0
    }).format(price);
  };

  if (showPayment) {
    return (
        <PaymentMethodSelector 
          total={getTotalPrice()}
          subtotal={getSubtotal()}
          discount={getDiscountAmount()}
          appliedCoupon={appliedCoupon}
          discountPercentage={discountPercentage}
          items={items}
          onBack={() => setShowPayment(false)}
          isOpen={isOpen}
          onOpenChange={setIsOpen}
        />
    );
  }

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="relative">
          <ShoppingCart className="h-4 w-4" />
          {getTotalItems() > 0 && (
            <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs">
              {getTotalItems()}
            </Badge>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-md">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <ShoppingCart className="h-5 w-5" />
            Carrito de Compras ({getTotalItems()})
          </SheetTitle>
        </SheetHeader>

        <div className="flex flex-col h-full">
          {items.length === 0 ? (
            <div className="flex-1 flex items-center justify-center text-center">
              <div>
                <ShoppingCart className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <p className="text-muted-foreground">Tu carrito está vacío</p>
              </div>
            </div>
          ) : (
            <>
              <div className="flex-1 overflow-y-auto py-4 space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-3 p-3 border rounded-lg">
                    <img 
                      src={item.image} 
                      alt={item.name}
                      className="w-16 h-16 object-contain rounded"
                    />
                    <div className="flex-1">
                      <h4 className="font-medium text-sm">{item.name}</h4>
                      <p className="text-xs text-muted-foreground">{item.flavor}</p>
                      <p className="text-sm font-semibold">${item.price}</p>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-6 w-6"
                        onClick={() => removeFromCart(item.id)}
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                      <div className="flex items-center gap-1">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-6 w-6"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="w-8 text-center text-sm">{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-6 w-6"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t pt-4 space-y-4">
                <CouponInput
                  onApplyCoupon={applyCoupon}
                  onRemoveCoupon={removeCoupon}
                  appliedCoupon={appliedCoupon}
                  discount={discountPercentage}
                />
                
                <Separator />
                
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Subtotal:</span>
                    <span className="text-sm">{formatPrice(getSubtotal())}</span>
                  </div>
                  
                  {appliedCoupon && (
                    <div className="flex justify-between items-center text-green-600">
                      <span className="text-sm">Descuento ({discountPercentage}%):</span>
                      <span className="text-sm">-{formatPrice(getDiscountAmount())}</span>
                    </div>
                  )}
                  
                  <div className="flex justify-between items-center border-t pt-2">
                    <span className="text-lg font-semibold">Total:</span>
                    <span className="text-xl font-bold">{formatPrice(getTotalPrice())}</span>
                  </div>
                </div>
                
                <Button 
                  className="w-full" 
                  size="lg"
                  onClick={() => setShowPayment(true)}
                >
                  Proceder al Pago
                </Button>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};