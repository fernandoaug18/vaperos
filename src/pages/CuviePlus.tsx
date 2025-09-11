import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "@/hooks/useCart";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

const CuviePlus = () => {
  const { addToCart } = useCart();

  const flavors = [
    {
      name: "Grape",
      description: "¡Tormenta de terciopelo purpura! Dulzura de viñedo estallando—sin hielo necesario, el frescor perfecto de la naturaleza.",
      color: "from-purple-600 to-purple-400",
      image: "/lovable-uploads/1d2d128e-34c3-49f1-ace5-95d6164f9064.png"
    },
    {
      name: "Blue Razz Ice",
      description: "¡Congelación de baya eléctrica! Frambuesas azules vibrantes electrizadas con hielo—relámpago de sabor audaz.",
      color: "from-blue-500 to-cyan-400",
      image: "/lovable-uploads/caeeae1a-a25d-4222-86e0-53235e4d44e1.png"
    },
    {
      name: "Miami Mint",
      description: "¡Menta oceánica crujiente! Imagina brisas marinas refrescantes que combinan fresco instantáneo en cada nube.",
      color: "from-green-400 to-teal-300",
      image: "/lovable-uploads/5f3c03be-52c0-453a-8ac4-65b7a63eae9c.png"
    },
    {
      name: "Green Apple Ice",
      description: "¡Dulzor de manzana crujiente! Rebanadas verdes ácidas bañadas en hielo—como morder un huerto congelado.",
      color: "from-green-500 to-emerald-400",
      image: "/lovable-uploads/2e53ee7a-3016-4184-82ea-95a2581c8576.png"
    },
    {
      name: "Lush Ice",
      description: "¡Oleada de sandía helada! Frescor jugoso que balla en tu lengua—como zambullirse en una piscina de verano gelida.",
      color: "from-red-400 to-pink-300",
      image: "/lovable-uploads/6bb46509-9f62-440a-990e-fd359b54e5af.png"
    },
    {
      name: "Strawberry Ice",
      description: "¡Fresas besadas por la escarcha! Destellos de baya dulce con un hormigueo helado—tu dosis diaria de alegría frutal.",
      color: "from-red-500 to-pink-400",
      image: "/lovable-uploads/d232937d-ec74-40db-9696-764188d8bef0.png"
    },
    {
      name: "Mexico Mango",
      description: "¡Tormenta de mango cremoso! Nieve tropical jugo desbordándose en dulzura jugosa—verano puro.",
      color: "from-yellow-500 to-orange-400",
      image: "/lovable-uploads/8d255ab8-47e0-4214-b2fc-e82e136e69f5.png"
    },
    {
      name: "Juicy Peach Ice",
      description: "¡Explosión de durazno escarchado! Néctar de huerto maduro envuelto en aire ártico—atizado, helado, frío y jugoso!",
      color: "from-orange-400 to-pink-300",
      image: "/lovable-uploads/1b994e41-a0f5-47e8-a4d4-66ea458986d9.png"
    },
    {
      name: "Pineapple Ice",
      description: "¡Explosión tropical helada! Piña ácida envuelta en escarcha—dulzura solar que permanece.",
      color: "from-yellow-400 to-orange-300",
      image: "/lovable-uploads/08e69cf1-7615-4434-9e21-1cdd8413d110.png"
    },
    {
      name: "Black Ice",
      description: "¡Escarcha de mora nocturnal! Frutos oscuros bajo luna helada—frescor misterioso que perdura.",
      color: "from-gray-700 to-blue-900",
      image: "/lovable-uploads/16fdd993-a94c-4e82-bf5f-9773279e89b4.png"
    }
  ];

  const product = {
    id: 1,
    name: "HQD CUVIE PLUS 2.0",
    image: "/lovable-uploads/1d4d657b-9e0c-487a-8a43-9507d3ccecb6.png",
    price: "15.000",
    puffs: "9000",
    nicotine: "4.5%"
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <Link to="/" className="inline-flex items-center mb-6 text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Volver a productos
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
          <div className="flex justify-center">
            <img 
              src={product.image} 
              alt={product.name}
              className="max-w-md w-full object-contain drop-shadow-2xl"
            />
          </div>

          <div>
            <h1 className="text-4xl font-bold mb-4">{product.name}</h1>
            <div className="text-6xl font-bold text-green-400 mb-6">{product.puffs} PUFFS</div>
            
            <div className="space-y-4 mb-8">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full border-2 border-white flex items-center justify-center">
                  <span className="text-xs font-bold">COIL</span>
                </div>
                <span>Dual Mesh Coil</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full border-2 border-white flex items-center justify-center">
                  <span className="text-xs font-bold">LED</span>
                </div>
                <span>Pantalla LED</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full border-2 border-white flex items-center justify-center">
                  <span className="text-xs font-bold">PRE</span>
                </div>
                <span>Aleación Premium</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full border-2 border-white flex items-center justify-center">
                  <span className="text-xs font-bold">USB</span>
                </div>
                <span>Tipo-C Recargable</span>
              </div>
            </div>

            <div className="text-3xl font-bold text-white mb-6">${product.price}</div>
          </div>
        </div>

        <div>
          <h2 className="text-3xl font-bold text-center mb-8">
            Tu Elección Premium para <span className="text-sky-400">Vape & Sabor</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {flavors.map((flavor, index) => (
              <Card key={index} className="bg-card/50 backdrop-blur-sm border-border/50 hover:shadow-glow transition-all duration-300 group">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="w-24 h-24 flex-shrink-0 flex items-center justify-center">
                      <img 
                        src={flavor.image} 
                        alt={flavor.name}
                        className="w-full h-full object-contain drop-shadow-lg group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold mb-2">{flavor.name}</h3>
                      <p className="text-sm text-muted-foreground mb-4">{flavor.description}</p>
                      <Button 
                        className="w-auto px-4 bg-sky-400 hover:bg-sky-300 text-white hover:text-gray-900 transition-all duration-300"
                        size="sm"
                        onClick={() => addToCart({...product, flavor: flavor.name, color: flavor.color})}
                      >
                        <ShoppingCart className="w-4 h-4 mr-2" />
                        Agregar
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="mt-12 text-center">
          <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
            <strong>WARNING:</strong> Los sistemas electrónicos de administración de NICOTINA son potencialmente ADICTIVOS. 
            Venta exclusiva para mayores de 18 años.
          </p>
        </div>
      </div>

      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default CuviePlus;