import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Eye, Star } from "lucide-react";
import { useCart } from "@/hooks/useCart";
import { useNavigate } from "react-router-dom";

const HQDProductsSection = () => {
  const { addToCart } = useCart();
  const navigate = useNavigate();
  
  const hqdProducts = [
    // HQD CUVIE PLUS 2.0 variants
    {
      id: 1,
      name: "HQD CUVIE PLUS 2.0",
      flavor: "Black Ice",
      image: "/lovable-uploads/0a75ffdf-3335-4167-a3cd-f740819a7c9f.png",
      price: "15.000",
      puffs: "9000",
      nicotine: "4.5%",
      color: "from-gray-700 to-blue-900",
      route: "/cuvie-plus"
    },
    {
      id: 2,
      name: "HQD CUVIE PLUS 2.0",
      flavor: "Blue Razz Ice",
      image: "/lovable-uploads/2c147a77-ba17-4fc4-8700-1e93e8e568ec.png",
      price: "15.000",
      puffs: "9000",
      nicotine: "4.5%",
      color: "from-blue-500 to-cyan-400",
      route: "/cuvie-plus"
    },
    {
      id: 3,
      name: "HQD CUVIE PLUS 2.0",
      flavor: "Grape",
      image: "/lovable-uploads/de0d0156-6f06-4359-858b-06698143aaa3.png",
      price: "15.000",
      puffs: "9000",
      nicotine: "4.5%",
      color: "from-purple-600 to-purple-400",
      route: "/cuvie-plus"
    },
    // HQD GLAZE PRO variants
    {
      id: 4,
      name: "HQD GLAZE PRO",
      flavor: "Black Dragon",
      image: "/lovable-uploads/7713023c-b2be-4d25-89d9-f00d21a3c511.png",
      price: "20.000",
      puffs: "18000",
      nicotine: "4.5%",
      color: "from-pink-500 to-purple-400",
      route: "/glaze-pro"
    },
    {
      id: 5,
      name: "HQD GLAZE PRO",
      flavor: "Mango",
      image: "/lovable-uploads/607f46c9-4fd6-4b20-a99c-90f9bdba4126.png",
      price: "20.000",
      puffs: "18000",
      nicotine: "4.5%",
      color: "from-yellow-500 to-orange-400",
      route: "/glaze-pro"
    },
    {
      id: 6,
      name: "HQD GLAZE PRO",
      flavor: "Strawberry Kiwi",
      image: "/lovable-uploads/45fd4e37-6575-47ef-a083-c2a136a8fb98.png",
      price: "20.000",
      puffs: "18000",
      nicotine: "4.5%",
      color: "from-green-400 to-teal-300",
      route: "/glaze-pro"
    },
    // HQD CLICK PLUS variants
    {
      id: 7,
      name: "HQD CLICK PLUS",
      flavor: "Blueberry Dragonfruit",
      image: "/lovable-uploads/79b9069c-48c6-4591-989a-26f119163b35.png",
      price: "25.000",
      puffs: "30000",
      nicotine: "4.5%",
      color: "from-purple-500 to-blue-400",
      route: "/click-plus"
    },
    {
      id: 8,
      name: "HQD CLICK PLUS",
      flavor: "Strawberry Banana",
      image: "/lovable-uploads/fc9f048c-afca-4c26-be94-62b2026fa12f.png",
      price: "25.000",
      puffs: "30000",
      nicotine: "4.5%",
      color: "from-yellow-400 to-red-400",
      route: "/click-plus"
    },
    {
      id: 9,
      name: "HQD CLICK PLUS",
      flavor: "Strawberry Watermelon",
      image: "/lovable-uploads/ae9cad73-225a-4e0c-94ab-bca561ca650c.png",
      price: "25.000",
      puffs: "30000",
      nicotine: "4.5%",
      color: "from-red-400 to-pink-400",
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
                        className="w-full h-full object-contain max-w-[350px] drop-shadow-lg group-hover:scale-105 transition-transform duration-300"
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
                         onClick={() => navigate(product.route)}
                       >
                         <Eye className="w-4 h-4 mr-2" />
                         Conocer más
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