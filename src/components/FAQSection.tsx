import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Shield } from "lucide-react";
import ageLogo from "@/assets/18-plus-logo-transparent.png";

const FAQSection = () => {
  const faqs = [
    {
      question: "¿Qué es el HQD?",
      answer: "HQD es una marca del vaper desechable que ha sido popular en el mercado desde 2017. La marca significa «High Quality Disposable» y es conocida por sus baterías de larga duración, materiales de alta calidad y precios asequibles."
    },
    {
      question: "¿Cuánto tiempo se carga el HQD?",
      answer: "La gran mayoría de los cigarrillos electrónicos desechables HQD no necesitan ser recargados, ya que tienen suficiente energía para durar durante su uso, mientras que el Cuvie Air es recargable y por lo general tarda 1 hora."
    },
    {
      question: "¿Cuánto de nicotina tiene un HQD?",
      answer: "Aquí ofrecemos HQD Vaper con una concentración de nicotina del 5% (50mg/ml)."
    },
    {
      question: "¿Cómo usar vape HQD?",
      answer: "Basta con retirar el envase, introducir la boquilla en la boca e inhalar para activarlo."
    },
    {
      question: "¿Cuánto es 5% de nicotina?",
      answer: "Perfecto para los fumadores habituales, el 5% de nicotina le ofrece una experiencia diaria de fumar con nicotina."
    }
  ];

  return (
    <section className="py-20 px-4 bg-card/20">
      <div className="container mx-auto">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="text-sky-400">Preguntas Frecuentes</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Todo lo que necesitas saber sobre nuestros productos HQD
            </p>
          </div>

          {/* FAQ Accordion */}
          <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl p-8 mb-12">
            <Accordion type="single" collapsible className="w-full space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem 
                  key={index} 
                  value={`item-${index}`}
                  className="border border-border/30 rounded-lg px-6 bg-card/30"
                >
                  <AccordionTrigger className="text-left text-lg font-semibold hover:text-primary transition-colors">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed pt-2">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

          {/* Age Verification Notice */}
          <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl p-8 text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Shield className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-2xl font-bold mb-3">Productos para Mayores de 18 Años</h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Todos nuestros productos de vapeo están destinados exclusivamente para adultos mayores de 18 años. 
              El vapeo puede contener nicotina, una sustancia adictiva. Manténgase fuera del alcance de niños y mascotas.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;