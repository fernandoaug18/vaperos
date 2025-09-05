import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Star } from "lucide-react";
import { useCart } from "@/hooks/useCart";
import { useNavigate } from "react-router-dom";

const HQDProductsSection = () => {
  const { addToCart } = useCart();
  const navigate = useNavigate();
  
  const hqdProducts = [
    {
      id: 1,
      name: "HQD CUVIE PLUS 2.0",
      flavor: "Green Apple Ice",
      image: "/lovable-uploads/fa4fa0e0-41f7-491f-9ceb-ba9d838693ea.png",
      price: "15.000",
      puffs: "9000",
      nicotine: "4.5%",
      color: "from-green-500 to-emerald-400",
      route: "/cuvie-plus"
    },
    {
      id: 2,
      name: "HQD GLAZE PRO",
      flavor: "Black Dragon",
      image: "/lovable-uploads/82e4db00-2ef0-4f41-841d-6fa84271a7ab.png",
      price: "20.000",
      puffs: "18000",
      nicotine: "4.5%",
      color: "from-pink-500 to-purple-400",
      route: "/glaze-pro"
    },
    {
      id: 3,
      name: "HQD CLICK PLUS",
      flavor: "Mango Peach",
      image: "/lovable-uploads/f11c52e2-d26b-4296-89d9-37c690fa1e94.png",
      price: "25.000",
      puffs: "30000",
      nicotine: "4.5%",
      color: "from-orange-500 to-yellow-400",
      route: "/click-plus"
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
              className="bg-card/50 backdrop-blur-sm border-border/50 hover:shadow-glow transition-all duration-300 group overflow-hidden cursor-pointer"
              onClick={() => navigate(product.route)}
            >
              <CardContent className="p-0">
                <div className="relative">
                  <div className={`absolute inset-0 bg-gradient-to-br ${product.color} opacity-10 group-hover:opacity-20 transition-opacity duration-300`} />
                  <div className="p-6 relative">
                    <div className="aspect-square mb-4 flex items-center justify-center">
                      <img 
                        src={product.image} 
                        alt={product.name}
                        className="w-full h-full object-contain max-w-[280px] drop-shadow-lg group-hover:scale-105 transition-transform duration-300"
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