import { useState } from "react";
import { Button } from "@/components/ui/button";

interface AgeVerificationProps {
  onVerified: () => void;
}

const AgeVerification = ({ onVerified }: AgeVerificationProps) => {
  const [showUnderageMessage, setShowUnderageMessage] = useState(false);

  const handleOver18 = () => {
    sessionStorage.setItem('ageVerified', 'true');
    onVerified();
  };

  const handleUnder18 = () => {
    setShowUnderageMessage(true);
  };

  if (showUnderageMessage) {
    return (
      <div className="fixed inset-0 bg-background z-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="space-y-4">
            <h1 className="text-2xl font-bold text-foreground">
              ACCESO RESTRINGIDO
            </h1>
            <p className="text-muted-foreground">
              Este sitio web está destinado únicamente para mayores de 18 años.
            </p>
            <p className="text-sm text-muted-foreground">
              Los productos de vapeo contienen nicotina y no están destinados para menores de edad.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-background z-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center space-y-8">        
        <div className="space-y-4">
          <h1 className="text-2xl font-bold text-foreground">
            PARA UTILIZAR EL SITIO WEB DE VAPEROS DEBES SER MAYOR DE 18 AÑOS
          </h1>
          <p className="text-muted-foreground">
            Por favor, verifica tu edad antes de entrar al sitio*
          </p>
        </div>

        <div className="space-y-3">
          <Button 
            onClick={handleOver18}
            size="lg"
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-8 rounded-full"
          >
            TENGO 18 AÑOS O MÁS
          </Button>
          
          <Button 
            onClick={handleUnder18}
            variant="outline"
            size="lg"
            className="w-full border-2 border-muted-foreground text-muted-foreground hover:bg-muted font-semibold py-3 px-8 rounded-full"
          >
            TENGO MENOS DE 18 AÑOS
          </Button>
        </div>

        <div className="text-xs text-muted-foreground max-w-sm mx-auto">
          * LOS SISTEMAS ELECTRÓNICOS DE ADMINISTRACIÓN DE NICOTINA SON POTENCIALMENTE ADICTIVOS. VENTA EXCLUSIVA PARA MAYORES DE 18 AÑOS. ANTES DE CONSUMIR, CONSULTE LAS INDICACIONES Y CONTRAINDICACIONES DE USO
        </div>
      </div>
    </div>
  );
};

export default AgeVerification;