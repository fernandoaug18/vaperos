import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Clock, ArrowLeft, RefreshCw } from "lucide-react";
import { Link } from "react-router-dom";

const PaymentPending = () => {
  return (
    <div className="min-h-screen bg-gradient-subtle flex items-center justify-center p-4">
      <Card className="max-w-md w-full">
        <CardContent className="p-8 text-center">
          <div className="mb-6">
            <Clock className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
            <h1 className="text-2xl font-bold mb-2">Pago Pendiente</h1>
            <p className="text-muted-foreground">
              Tu pago está siendo procesado
            </p>
          </div>

          <div className="space-y-3">
            <p className="text-sm text-muted-foreground">
              Recibirás una notificación una vez que se confirme el pago.
            </p>
            
            <div className="flex flex-col gap-3">
              <Link to="/">
                <Button className="w-full">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Volver al Inicio
                </Button>
              </Link>
              
              <Button variant="outline" onClick={() => window.location.reload()}>
                <RefreshCw className="w-4 h-4 mr-2" />
                Verificar Estado
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PaymentPending;