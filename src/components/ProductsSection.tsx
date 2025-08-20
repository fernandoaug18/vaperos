import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Battery, Droplets, Thermometer, Shield } from "lucide-react";

const ProductsSection = () => {
  const products = [
    {
      icon: Battery,
      title: "Mods Avanzados",
      description: "Dispositivos de alta potencia con control total sobre tu experiencia",
      features: ["Hasta 200W", "Pantalla OLED", "Control de temperatura"]
    },
    {
      icon: Droplets,
      title: "E-Liquids Premium",
      description: "Sabores únicos creados por expertos con ingredientes de primera calidad",
      features: ["Base 70/30", "Nicotina variable", "Sabores naturales"]
    },
    {
      icon: Thermometer,
      title: "Pods Inteligentes",
      description: "Tecnología de vanguardia en formato compacto y elegante",
      features: ["Auto-draw", "LED inteligente", "Carga rápida"]
    },
    {
      icon: Shield,
      title: "Accesorios Pro",
      description: "Todo lo que necesitas para mantener y personalizar tu equipo",
      features: ["Resistencias", "Drip tips", "Baterías premium"]
    }
  ];

  return (
    <section className="py-20 px-4 bg-card/20">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Productos <span className="text-gradient">Premium</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Cada producto está diseñado para ofrecerte la mejor experiencia vaper posible
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product, index) => (
            <Card 
              key={index} 
              className="bg-card/50 backdrop-blur-sm border-border/50 hover:shadow-glow transition-all duration-300 group"
            >
              <CardContent className="p-6">
                <div className="mb-4">
                  <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center mb-4 group-hover:shadow-accent transition-all duration-300">
                    <product.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{product.title}</h3>
                  <p className="text-muted-foreground mb-4">{product.description}</p>
                </div>
                
                <ul className="space-y-2 mb-6">
                  {product.features.map((feature, fIndex) => (
                    <li key={fIndex} className="text-sm text-muted-foreground flex items-center">
                      <div className="w-1.5 h-1.5 bg-accent rounded-full mr-2" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <Button 
                  variant="outline" 
                  className="w-full border-border/50 hover:bg-primary/10 hover:border-primary/50"
                >
                  Ver Más
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;