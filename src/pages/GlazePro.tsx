import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "@/hooks/useCart";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const GlazePro = () => {
  const { addToCart } = useCart();

  const flavors = [
    {
      name: "Grape",
      description: "¡Zambullirse en uvas maduradas al sol! Esencia jugosa de viñedo chileno—remolinos profundos y exuberantes bajando por tu garganta.",
      color: "from-purple-600 to-purple-400"
    },
    {
      name: "Blue Razz Ice",
      description: "¡Congelación de baya eléctrica! Frambuesas azules vibrantes electrizadas con hielo—relámpago de sabor audaz.",
      color: "from-blue-500 to-cyan-400"
    },
    {
      name: "Ice Mint",
      description: "¡Aliento antártico! Congelación de cristal de menta pura bailando como como el viento andino.",
      color: "from-green-400 to-teal-300"
    },
    {
      name: "Strawberry Kiwi",
      description: "¡Dúo tropical de tangol de kiwi! Vibrante pareja a las fresas dulces—euforia llena de vida.",
      color: "from-red-400 to-green-300"
    },
    {
      name: "Lush Ice",
      description: "¡Oleada de sandía helada! Frescor jugoso que balla en tu lengua—como zambullirse en una piscina de verano gelida.",
      color: "from-red-400 to-pink-300"
    },
    {
      name: "Strawberry Watermelon",
      description: "¡Explosión de alegría roja! Gemelos jugosos estallando hidratación—secreto veraniego para saciar la sed.",
      color: "from-red-500 to-pink-400"
    },
    {
      name: "Mango",
      description: "¡Trópicos dorados en vapor! Néctar de mango cremoso tan espeso—saborear el sol.",
      color: "from-yellow-500 to-orange-400"
    },
    {
      name: "Strawberry Banana",
      description: "¡Dúo cremoso de ensueño! Plátano maduro emplazado sobre fresas ruborizadas—dúo nube de postre líquido.",
      color: "from-yellow-400 to-pink-300"
    },
    {
      name: "Black Dragon",
      description: "¡Bestia mítica de bayas! Profundidad de mora con magia de fruta del dragón—vapor exótica en cada calada.",
      color: "from-gray-700 to-purple-900"
    },
    {
      name: "Black Ice",
      description: "¡Escarcha de mora nocturnal! Frutos oscuros bajo luna helada—frescor misterioso que perdura.",
      color: "from-gray-700 to-blue-900"
    }
  ];

  const product = {
    id: 2,
    name: "HQD GLAZE PRO",
    image: "/lovable-uploads/f756ebad-4f78-499b-967b-e8b49e9dd3c1.png",
    price: "20.000",
    puffs: "18000",
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
            <div className="text-6xl font-bold text-pink-400 mb-6">{product.puffs} PUFFS</div>
            
            <div className="space-y-4 mb-8">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full border-2 border-white flex items-center justify-center">
                  <span className="text-xs font-bold">MODE</span>
                </div>
                <span>Modo Boost & Eco</span>
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
              onClick={() => addToCart({...product, flavor: "Black Dragon", color: "from-pink-500 to-purple-400"})}
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

export default GlazePro;