import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Star } from "lucide-react";
import { useCart } from "@/hooks/useCart";

const HQDProductsSection = () => {
  const { addToCart } = useCart();
  
  const hqdProducts = [
    {
      id: 1,
      name: "HQD CUVIE PLUS 2.0",
      flavor: "Black Ice",
      image: "/lovable-uploads/111b99d2-1cba-4a4f-9746-6b818a2779f4.png",
      price: "15.000",
      puffs: "9000",
      nicotine: "4.5%",
      color: "from-purple-600 to-indigo-500"
    },
    {
      id: 2,
      name: "HQD GLAZE PRO",
      flavor: "Ice Mint",
      image: "/lovable-uploads/a51e8369-0710-4463-a114-08e49aef3d18.png",
      price: "15.000",
      puffs: "18000",
      nicotine: "4.5%",
      color: "from-green-500 to-emerald-400"
    },
    {
      id: 3,
      name: "HQD CLICK PLUS",
      flavor: "Blueberry Cherry",
      image: "/lovable-uploads/ee45f844-16a5-431f-b94c-9335a1b2ffda.png",
      price: "15.000",
      puffs: "30000",
      nicotine: "4.5%",
      color: "from-pink-500 to-purple-400"
    }
  ];

  return (
    <section className="py-20 px-4 bg-gradient-subtle">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Productos <span className="text-white">HQD</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
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
                      
                      <div className="text-2xl font-bold text-white mb-4">
                        ${product.price}
                      </div>
                      
                       <Button 
                         className="w-full bg-sky-400 hover:bg-sky-300 text-white hover:text-gray-900 transition-all duration-300"
                         size="sm"
                         onClick={() => {
                           console.log('Botón Agregar al Carrito clickeado para producto:', product);
                           addToCart(product);
                         }}
                       >
                         <ShoppingCart className="w-4 h-4 mr-2" />
                         Agregar al Carrito
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
              Disponibles en Nuestros <span className="text-sky-400">Puntos de Venta</span>
            </h3>
            <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
              Encuentra todos estos sabores HQD en nuestros dispensadores automáticos ubicados estratégicamente en la ciudad.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HQDProductsSection;