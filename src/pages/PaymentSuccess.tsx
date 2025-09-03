import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, ArrowLeft, Download } from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";
import { useCart } from "@/hooks/useCart";
import { useEffect } from "react";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const { clearCart } = useCart();

  useEffect(() => {
    // Clear cart when payment is successful
    clearCart();
  }, [clearCart]);

  return (
    <div className="min-h-screen bg-gradient-subtle flex items-center justify-center p-4">
      <Card className="max-w-md w-full">
        <CardContent className="p-8 text-center">
          <div className="mb-6">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h1 className="text-2xl font-bold mb-2">¡Pago Exitoso!</h1>
            <p className="text-muted-foreground">
              Tu pedido ha sido procesado correctamente
            </p>
          </div>

          {sessionId && (
            <div className="bg-muted p-4 rounded-lg mb-6">
              <p className="text-sm text-muted-foreground mb-1">ID de Sesión:</p>
              <p className="text-xs font-mono">{sessionId}</p>
            </div>
          )}

          <div className="space-y-3">
            <p className="text-sm text-muted-foreground">
              Recibirás un correo de confirmación con los detalles de tu pedido.
            </p>
            
            <div className="flex flex-col gap-3">
              <Link to="/">
                <Button className="w-full">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Volver al Inicio
                </Button>
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PaymentSuccess;