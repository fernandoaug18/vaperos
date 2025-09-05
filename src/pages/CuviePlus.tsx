import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "@/hooks/useCart";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const CuviePlus = () => {
  const { addToCart } = useCart();

  const flavors = [
    {
      name: "Grape",
      description: "¡Tormenta de terciopelo purpura! Dulzura de viñedo estallando—sin hielo necesario, el frescor perfecto de la naturaleza.",
      color: "from-purple-600 to-purple-400"
    },
    {
      name: "Blue Razz Ice",
      description: "¡Congelación de baya eléctrica! Frambuesas azules vibrantes electrizadas con hielo—relámpago de sabor audaz.",
      color: "from-blue-500 to-cyan-400"
    },
    {
      name: "Miami Mint",
      description: "¡Menta oceánica crujiente! Imagina brisas marinas refrescantes que combinan fresco instantáneo en cada nube.",
      color: "from-green-400 to-teal-300"
    },
    {
      name: "Green Apple Ice",
      description: "¡Dulzor de manzana crujiente! Rebanadas verdes ácidas bañadas en hielo—como morder un huerto congelado.",
      color: "from-green-500 to-emerald-400"
    },
    {
      name: "Lush Ice",
      description: "¡Oleada de sandía helada! Frescor jugoso que balla en tu lengua—como zambullirse en una piscina de verano gelida.",
      color: "from-red-400 to-pink-300"
    },
    {
      name: "Strawberry Ice",
      description: "¡Fresas besadas por la escarcha! Destellos de baya dulce con un hormigueo helado—tu dosis diaria de alegría frutal.",
      color: "from-red-500 to-pink-400"
    },
    {
      name: "Mexico Mango",
      description: "¡Tormenta de mango cremoso! Nieve tropical jugo desbordándose en dulzura jugosa—verano puro.",
      color: "from-yellow-500 to-orange-400"
    },
    {
      name: "Juicy Peach Ice",
      description: "¡Explosión de durazno escarchado! Néctar de huerto maduro envuelto en aire ártico—atizado, helado, frío y jugoso!",
      color: "from-orange-400 to-pink-300"
    },
    {
      name: "Pineapple Ice",
      description: "¡Explosión tropical helada! Piña ácida envuelta en escarcha—dulzura solar que permanece.",
      color: "from-yellow-400 to-orange-300"
    },
    {
      name: "Black Ice",
      description: "¡Escarcha de mora nocturnal! Frutos oscuros bajo luna helada—frescor misterioso que perdura.",
      color: "from-gray-700 to-blue-900"
    }
  ];

  const product = {
    id: 1,
    name: "HQD CUVIE PLUS 2.0",
    image: "/lovable-uploads/fa4fa0e0-41f7-491f-9ceb-ba9d838693ea.png",
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
            <Button 
              className="w-full bg-sky-400 hover:bg-sky-300 text-white hover:text-gray-900 transition-all duration-300"
              size="lg"
              onClick={() => addToCart({...product, flavor: "Green Apple Ice", color: "from-green-500 to-emerald-400"})}
            >
              <ShoppingCart className="w-5 h-5 mr-2" />
              Agregar al Carrito
            </Button>
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
                    <div className={`w-16 h-16 rounded-lg bg-gradient-to-br ${flavor.color} flex-shrink-0`}></div>
                    <div>
                      <h3 className="text-lg font-bold mb-2">{flavor.name}</h3>
                      <p className="text-sm text-muted-foreground">{flavor.description}</p>
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
    </div>
  );
};

export default CuviePlus;