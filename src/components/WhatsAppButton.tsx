import { Button } from "@/components/ui/button";

const WhatsAppButton = () => {
  const phoneNumber = "56945856240"; // WhatsApp number
  const message = "Hola! Me interesa conocer más sobre los productos HQD";
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <div className="fixed bottom-6 right-6 z-50">
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
            src="/lovable-uploads/919ee04e-fa67-4bfd-9f55-71bfe31ed4e9.png"
            alt="WhatsApp" 
            className="w-10 h-10"
          />
        </a>
      </Button>
    </div>
  );
};

export default WhatsAppButton;