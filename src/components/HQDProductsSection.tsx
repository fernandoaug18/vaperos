import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Star } from "lucide-react";

const HQDProductsSection = () => {
  const hqdProducts = [
    {
      id: 1,
      name: "HQD Blue Razz Ice",
      flavor: "Blue Razz Ice",
      image: "/lovable-uploads/720aa5bf-25a6-47ef-b10c-3772dc729b56.png",
      price: "15.000",
      puffs: "9000",
      nicotine: "4.5%",
      color: "from-blue-500 to-cyan-400"
    },
    {
      id: 2,
      name: "HQD Black Ice",
      flavor: "Black Ice",
      image: "/lovable-uploads/4a3ba8d0-3223-4856-a1c6-80855f81707a.png",
      price: "15.000",
      puffs: "9000",
      nicotine: "4.5%",
      color: "from-purple-600 to-indigo-500"
    },
    {
      id: 3,
      name: "HQD Green Apple Ice",
      flavor: "Green Apple Ice",
      image: "/lovable-uploads/98970c14-3d57-4bf9-8e80-3dae14859537.png",
      price: "15.000",
      puffs: "9000",
      nicotine: "4.5%",
      color: "from-green-500 to-emerald-400"
    },
    {
      id: 4,
      name: "HQD Grape",
      flavor: "Grape",
      image: "/lovable-uploads/44f41699-c128-4b93-abe3-002033865bd1.png",
      price: "15.000",
      puffs: "9000",
      nicotine: "4.5%",
      color: "from-purple-500 to-violet-400"
    }
  ];

  return (
    <section className="py-20 px-4 bg-gradient-subtle">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full mb-6">
            <Star className="w-5 h-5 text-primary fill-primary" />
            <span className="text-primary font-semibold">Productos HQD Premium</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Solo <span className="text-gradient">$15.000</span> cada uno
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Los mejores sabores HQD disponibles. 9000 puffs de pura calidad y sabor intenso.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {hqdProducts.map((product) => (
            <Card 
              key={product.id} 
              className="bg-card/50 backdrop-blur-sm border-border/50 hover:shadow-glow transition-all duration-300 group overflow-hidden"
            >
              <CardContent className="p-0">
                <div className="relative">
                  <div className={`absolute inset-0 bg-gradient-to-br ${product.color} opacity-10 group-hover:opacity-20 transition-opacity duration-300`} />
                  <div className="p-6 relative">
                    <div className="aspect-square mb-4 flex items-center justify-center">
                      <img 
                        src={product.image} 
                        alt={product.name}
                        className="w-full h-full object-contain max-w-[200px] drop-shadow-lg group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    
                    <div className="text-center">
                      <h3 className="text-lg font-bold mb-1">{product.name}</h3>
                      <p className="text-muted-foreground text-sm mb-3">{product.flavor}</p>
                      
                      <div className="flex justify-center gap-4 text-xs text-muted-foreground mb-4">
                        <span>{product.puffs} puffs</span>
                        <span>•</span>
                        <span>{product.nicotine} nicotina</span>
                      </div>
                      
                      <div className="text-2xl font-bold text-primary mb-4">
                        ${product.price}
                      </div>
                      
                      <Button 
                        className="w-full bg-gradient-primary hover:opacity-90 transition-opacity duration-300"
                        size="sm"
                      >
                        <ShoppingCart className="w-4 h-4 mr-2" />
                        Comprar Ahora
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <div className="relative inline-block">
            <img 
              src="/lovable-uploads/0c3b6ae8-e7a3-4107-8b83-f2e36199b781.png" 
              alt="HQD Display"
              className="max-w-sm mx-auto rounded-xl shadow-elegant"
            />
            <div className="absolute inset-0 bg-gradient-primary opacity-20 rounded-xl" />
          </div>
          <div className="mt-8">
            <h3 className="text-2xl font-bold mb-4">
              Disponibles en Nuestros <span className="text-gradient">Puntos de Venta</span>
            </h3>
            <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
              Encuentra todos estos sabores HQD en nuestros dispensadores automáticos ubicados estratégicamente en la ciudad.
            </p>
            <Button size="lg" className="bg-gradient-primary hover:opacity-90">
              Ver Ubicaciones
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HQDProductsSection;