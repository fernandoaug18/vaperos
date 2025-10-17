import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { ArrowLeft } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";
import { useCart } from "@/hooks/useCart";

// Validación de RUT chileno
const validateRUT = (rut: string): boolean => {
  // Eliminar puntos y guión
  const cleanRut = rut.replace(/\./g, '').replace(/-/g, '');
  
  if (cleanRut.length < 2) return false;
  
  const body = cleanRut.slice(0, -1);
  const dv = cleanRut.slice(-1).toUpperCase();
  
  // Validar que el cuerpo sea numérico
  if (!/^\d+$/.test(body)) return false;
  
  // Calcular dígito verificador
  let sum = 0;
  let multiplier = 2;
  
  for (let i = body.length - 1; i >= 0; i--) {
    sum += parseInt(body[i]) * multiplier;
    multiplier = multiplier === 7 ? 2 : multiplier + 1;
  }
  
  const expectedDV = 11 - (sum % 11);
  const finalDV = expectedDV === 11 ? '0' : expectedDV === 10 ? 'K' : expectedDV.toString();
  
  return dv === finalDV;
};

// Regiones de Chile
const REGIONES_CHILE = [
  "Región de Arica y Parinacota",
  "Región de Tarapacá",
  "Región de Antofagasta",
  "Región de Atacama",
  "Región de Coquimbo",
  "Región de Valparaíso",
  "Región Metropolitana de Santiago",
  "Región del Libertador General Bernardo O'Higgins",
  "Región del Maule",
  "Región de Ñuble",
  "Región del Biobío",
  "Región de La Araucanía",
  "Región de Los Ríos",
  "Región de Los Lagos",
  "Región de Aysén del General Carlos Ibáñez del Campo",
  "Región de Magallanes y de la Antártica Chilena"
];

export interface CustomerData {
  email: string;
  rut: string;
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  region: string;
  phone?: string;
}

interface CheckoutFormProps {
  onBack: () => void;
  onSubmit: (data: CustomerData) => void;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

const customerSchema = z.object({
  email: z.string().email({ message: "Email inválido" }),
  rut: z.string().refine(validateRUT, { message: "RUT chileno inválido" }),
  firstName: z.string().min(2, { message: "Nombre requerido" }),
  lastName: z.string().min(2, { message: "Apellido requerido" }),
  address: z.string().min(5, { message: "Dirección completa requerida (calle, número, depto/casa)" }),
  city: z.string().min(2, { message: "Ciudad/Comuna requerida" }),
  region: z.string().min(2, { message: "Región requerida" }),
  phone: z.string().optional(),
});

export const CheckoutForm = ({ onBack, onSubmit, isOpen, onOpenChange }: CheckoutFormProps) => {
  const { toast } = useToast();
  const { setSelectedRegion } = useCart();
  const [formData, setFormData] = useState<CustomerData>({
    email: "",
    rut: "",
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    region: "",
    phone: "",
  });

  const [errors, setErrors] = useState<Partial<Record<keyof CustomerData, string>>>({});

  const handleChange = (field: keyof CustomerData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Update selected region in cart context
    if (field === 'region') {
      setSelectedRegion(value);
    }
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
            <Label htmlFor="phone">
              Teléfono
            </Label>
            <Input
              id="phone"
              value={formData.phone}
              onChange={(e) => handleChange("phone", e.target.value)}
              placeholder="+56912345678"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="address">
              Dirección Completa <span className="text-red-500">*</span>
            </Label>
            <Input
              id="address"
              value={formData.address}
              onChange={(e) => handleChange("address", e.target.value)}
              placeholder="Calle Principal #123, Depto 45"
              required
            />
            {errors.address && <p className="text-sm text-red-500">{errors.address}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="city">
              Ciudad/Comuna <span className="text-red-500">*</span>
            </Label>
            <Input
              id="city"
              value={formData.city}
              onChange={(e) => handleChange("city", e.target.value)}
              placeholder="Santiago, Providencia, Maipú, etc."
              required
            />
            {errors.city && <p className="text-sm text-red-500">{errors.city}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="region">
              Región <span className="text-red-500">*</span>
            </Label>
            <Select value={formData.region} onValueChange={(value) => handleChange("region", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Selecciona una región" />
              </SelectTrigger>
              <SelectContent>
                {REGIONES_CHILE.map((region) => (
                  <SelectItem key={region} value={region}>
                    {region}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
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