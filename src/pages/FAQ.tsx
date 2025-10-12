import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Shield } from "lucide-react";
import { Link } from "react-router-dom";
import ageLogo from "@/assets/18-plus-logo.png";

const FAQ = () => {
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
      answer: "Aquí ofrecemos HQD Vaper con una concentración de nicotina del 4,5% (45mg/ml)."
    },
    {
      question: "¿Cómo usar vape HQD?",
      answer: "Basta con retirar el envase, introducir la boquilla en la boca e inhalar para activarlo."
    },
    {
      question: "¿Cuánto es 4,5% de nicotina?",
      answer: "Perfecto para los fumadores habituales, el 4,5% de nicotina le ofrece una experiencia diaria de fumar con nicotina."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Header */}
      <header className="bg-card/50 backdrop-blur-sm border-b border-border/50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Link to="/">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Volver
              </Button>
            </Link>
            <h1 className="text-2xl font-bold text-gradient">Preguntas Frecuentes</h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Todo sobre <span className="text-gradient">HQD</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Encuentra respuestas a las preguntas más comunes sobre nuestros productos HQD
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
              <img 
                src={ageLogo} 
                alt="Solo para mayores de 18 años"
                className="h-12"
              />
            </div>
            <h3 className="text-2xl font-bold mb-3">Productos para Mayores de 18 Años</h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Todos nuestros productos de vapeo están destinados exclusivamente para adultos mayores de 18 años. 
              El vapeo puede contener nicotina, una sustancia adictiva. Manténgase fuera del alcance de niños y mascotas.
            </p>
          </div>

          {/* CTA */}
          <div className="text-center mt-12">
            <Link to="/">
              <Button size="lg" className="bg-gradient-primary hover:opacity-90">
                Ver Productos HQD
              </Button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default FAQ;