import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Check, Tag, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";

const couponSchema = z.string()
  .trim()
  .min(1, "El código no puede estar vacío")
  .max(20, "El código debe tener máximo 20 caracteres")
  .regex(/^[a-zA-Z0-9]+$/, "El código solo puede contener letras y números");

interface CouponInputProps {
  onApplyCoupon: (coupon: string) => boolean;
  onRemoveCoupon: () => void;
  appliedCoupon: string | null;
  discountPercentage: number;
  couponType: 'percentage' | 'free_shipping_rm' | 'free_shipping_all' | null;
}

export const CouponInput = ({ 
  onApplyCoupon, 
  onRemoveCoupon, 
  appliedCoupon, 
  discountPercentage,
  couponType 
}: CouponInputProps) => {
  const [couponCode, setCouponCode] = useState("");
  const [isApplying, setIsApplying] = useState(false);
  const { toast } = useToast();

  const getCouponMessage = () => {
    if (couponType === 'percentage') return "Descuento de 20%";
    if (couponType === 'free_shipping_rm') return "Entrega gratis RM";
    if (couponType === 'free_shipping_all') return "Entrega gratis a Regiones";
    return "";
  };

  const handleApplyCoupon = () => {
    try {
      const validatedCoupon = couponSchema.parse(couponCode);
      
      setIsApplying(true);
      const success = onApplyCoupon(validatedCoupon.toLowerCase());
      
      if (success) {
        toast({
          title: "¡Cupón aplicado!",
          description: getCouponMessage(),
        });
        setCouponCode("");
      } else {
        toast({
          title: "Cupón inválido",
          description: "El código de cupón no es válido",
          variant: "destructive"
        });
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        toast({
          title: "Código inválido",
          description: error.issues[0].message,
          variant: "destructive"
        });
      } else {
        toast({
          title: "Error",
          description: "Error al validar el cupón",
          variant: "destructive"
        });
      }
    } finally {
      setIsApplying(false);
    }
  };

  const handleRemoveCoupon = () => {
    onRemoveCoupon();
    toast({
      title: "Cupón removido",
      description: "El descuento ha sido removido",
    });
  };

  if (appliedCoupon) {
    return (
      <div className="flex items-center gap-2 p-3 bg-green-50 border border-green-200 rounded-lg">
        <Tag className="h-4 w-4 text-green-600" />
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="bg-green-100 text-green-800">
              {appliedCoupon.toUpperCase()}
            </Badge>
            <span className="text-sm text-green-700">
              {getCouponMessage()}
            </span>
          </div>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleRemoveCoupon}
          className="h-8 w-8 p-0"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <div className="flex gap-2">
        <Input
          placeholder="Código de cupón"
          value={couponCode}
          onChange={(e) => setCouponCode(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              handleApplyCoupon();
            }
          }}
          disabled={isApplying}
        />
        <Button
          variant="outline"
          onClick={handleApplyCoupon}
          disabled={isApplying || !couponCode.trim()}
        >
          {isApplying ? "..." : "Aplicar"}
        </Button>
      </div>
      <p className="text-xs text-muted-foreground">
        Ingresa tu código de cupón para obtener descuentos
      </p>
    </div>
  );
};