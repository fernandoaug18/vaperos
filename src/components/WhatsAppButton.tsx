import { Button } from "@/components/ui/button";
import { useState } from "react";
import { BackgroundRemovalProcessor } from "@/components/BackgroundRemovalProcessor";
import whatsappLogo from "@/assets/whatsapp-official-logo.png";

const WhatsAppButton = () => {
  const phoneNumber = "56945856240"; // WhatsApp number
  const message = "Hola! Me interesa conocer más sobre los productos HQD";
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
  const [processedLogoUrl, setProcessedLogoUrl] = useState<string>(whatsappLogo);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <BackgroundRemovalProcessor onProcessed={setProcessedLogoUrl} />
      <Button
        asChild
        size="lg"
        className="bg-green-500 hover:bg-green-600 text-white rounded-full w-16 h-16 shadow-lg hover:shadow-xl transition-all duration-300 p-0"
      >
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Contactar por WhatsApp"
        >
          <img 
            src={processedLogoUrl}
            alt="WhatsApp" 
            className="w-10 h-10"
          />
        </a>
      </Button>
    </div>
  );
};

export default WhatsAppButton;