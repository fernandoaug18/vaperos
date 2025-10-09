import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { ArrowLeft } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";

export interface CustomerData {
  email: string;
  rut: string;
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  region: string;
  postalCode: string;
}

interface CheckoutFormProps {
  onBack: () => void;
  onSubmit: (data: CustomerData) => void;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

const customerSchema = z.object({
  email: z.string().email({ message: "Email inválido" }),
  rut: z.string().min(8, { message: "RUT inválido" }),
  firstName: z.string().min(2, { message: "Nombre requerido" }),
  lastName: z.string().min(2, { message: "Apellido requerido" }),
  address: z.string().min(5, { message: "Dirección requerida" }),
  city: z.string().min(2, { message: "Ciudad requerida" }),
  region: z.string().min(2, { message: "Región requerida" }),
  postalCode: z.string().min(4, { message: "Código postal inválido" }),
});

export const CheckoutForm = ({ onBack, onSubmit, isOpen, onOpenChange }: CheckoutFormProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState<CustomerData>({
    email: "",
    rut: "",
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    region: "",
    postalCode: "",
  });

  const [errors, setErrors] = useState<Partial<Record<keyof CustomerData, string>>>({});

  const handleChange = (field: keyof CustomerData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Limpiar error del campo cuando el usuario empieza a escribir
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      customerSchema.parse(formData);
      onSubmit(formData);
    } catch (err) {
      if (err instanceof z.ZodError) {
        const newErrors: Partial<Record<keyof CustomerData, string>> = {};
        err.issues.forEach((issue) => {
          if (issue.path[0]) {
            newErrors[issue.path[0] as keyof CustomerData] = issue.message;
          }
        });
        setErrors(newErrors);
        toast({
          title: "Error en el formulario",
          description: "Por favor completa todos los campos correctamente",
          variant: "destructive"
        });
      }
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-md overflow-y-auto">
        <SheetHeader>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={onBack}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <SheetTitle>Datos de Envío</SheetTitle>
          </div>
        </SheetHeader>

        <form onSubmit={handleSubmit} className="py-6 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">
              Email <span className="text-red-500">*</span>
            </Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => handleChange("email", e.target.value)}
              placeholder="tu@email.com"
              required
            />
            {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">
                Nombre <span className="text-red-500">*</span>
              </Label>
              <Input
                id="firstName"
                value={formData.firstName}
                onChange={(e) => handleChange("firstName", e.target.value)}
                placeholder="Juan"
                required
              />
              {errors.firstName && <p className="text-sm text-red-500">{errors.firstName}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="lastName">
                Apellido <span className="text-red-500">*</span>
              </Label>
              <Input
                id="lastName"
                value={formData.lastName}
                onChange={(e) => handleChange("lastName", e.target.value)}
                placeholder="Pérez"
                required
              />
              {errors.lastName && <p className="text-sm text-red-500">{errors.lastName}</p>}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="rut">
              RUT <span className="text-red-500">*</span>
            </Label>
            <Input
              id="rut"
              value={formData.rut}
              onChange={(e) => handleChange("rut", e.target.value)}
              placeholder="12.345.678-9"
              required
            />
            {errors.rut && <p className="text-sm text-red-500">{errors.rut}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="address">
              Dirección <span className="text-red-500">*</span>
            </Label>
            <Input
              id="address"
              value={formData.address}
              onChange={(e) => handleChange("address", e.target.value)}
              placeholder="Calle Ejemplo #123, Depto 45"
              required
            />
            {errors.address && <p className="text-sm text-red-500">{errors.address}</p>}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="city">
                Ciudad <span className="text-red-500">*</span>
              </Label>
              <Input
                id="city"
                value={formData.city}
                onChange={(e) => handleChange("city", e.target.value)}
                placeholder="Santiago"
                required
              />
              {errors.city && <p className="text-sm text-red-500">{errors.city}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="postalCode">
                Código Postal <span className="text-red-500">*</span>
              </Label>
              <Input
                id="postalCode"
                value={formData.postalCode}
                onChange={(e) => handleChange("postalCode", e.target.value)}
                placeholder="8320000"
                required
              />
              {errors.postalCode && <p className="text-sm text-red-500">{errors.postalCode}</p>}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="region">
              Región <span className="text-red-500">*</span>
            </Label>
            <Input
              id="region"
              value={formData.region}
              onChange={(e) => handleChange("region", e.target.value)}
              placeholder="Región Metropolitana"
              required
            />
            {errors.region && <p className="text-sm text-red-500">{errors.region}</p>}
          </div>

          <Button type="submit" className="w-full" size="lg">
            Continuar al Pago
          </Button>
        </form>
      </SheetContent>
    </Sheet>
  );
};