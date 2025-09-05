import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "@/hooks/useCart";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const ClickPlus = () => {
  const { addToCart } = useCart();

  const flavors = [
    {
      name: "Blue Raspberry / Grape",
      description: "¡Fusión de uva eléctrica! Frambuesa azul vibrante abraza la uva profunda—oleada de sabor salvaje.",
      color: "from-blue-500 to-purple-600"
    },
    {
      name: "Peach / Mixed Berries",
      description: "¡Festival de bayas de huerto! Melocotones boleados acogen fiesta de frambuesas y arándano—sinfonía jugosa.",
      color: "from-orange-400 to-red-500"
    },
    {
      name: "Blueberry / Raspberry",
      description: "¡Poder púrpura y rosa! Arándanos dulces chocando con frambuesas ácidas—euforia de doble baya.",
      color: "from-blue-600 to-red-400"
    },
    {
      name: "Blueberry / Cherry",
      description: "¡Fuegos artificiales de bayas! Arándanos explosivos encuentran cerezas ácidas—celebración jugosa en erupción.",
      color: "from-blue-600 to-red-600"
    },
    {
      name: "Watermelon / Bubblegum",
      description: "¡Salpicadura de infancia juguetona! Sandía jugosa estalla con diversión de chicle azucarado—nostalgia recargada.",
      color: "from-red-400 to-pink-500"
    },
    {
      name: "Strawberry / Watermelon",
      description: "¡Explosión de alegría roja! Gemelos jugosos estallando hidratación—secreto veraniego para saciar la sed.",
      color: "from-red-500 to-pink-400"
    },
    {
      name: "Mango / Peach",
      description: "¡Remolino de atardecer tropical! Mango rápida abraza durazno melocotones afelpados—hora dorada aerotizada.",
      color: "from-yellow-500 to-orange-400"
    },
    {
      name: "Strawberry / Banana",
      description: "¡Dúo cremoso de ensueño! Plátano maduro emplazado sobre fresas ruborizadas—dúo nube de postre líquido.",
      color: "from-yellow-400 to-pink-400"
    },
    {
      name: "Blackberry / Dragonfruit",
      description: "¡Trópicos de medianoche! Moras audaces tejen exótica fruta del dragón—viaje misterioso de terciopelo.",
      color: "from-gray-700 to-pink-500"
    },
    {
      name: "Raspberry / Watermelon",
      description: "¡Dúo rubi refrescante! Frambuesa ácida enciende la hidratación de sandía—junto a la piscina.",
      color: "from-red-600 to-green-400"
    }
  ];

  const product = {
    id: 3,
    name: "HQD CLICK PLUS",
    image: "/lovable-uploads/f11c52e2-d26b-4296-89d9-37c690fa1e94.png",
    price: "25.000",
    puffs: "30000",
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
            <div className="text-6xl font-bold text-orange-400 mb-6">{product.puffs} PUFFS</div>
            
            <div className="space-y-4 mb-8">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full border-2 border-white flex items-center justify-center">
                  <span className="text-xs font-bold">FLOW</span>
                </div>
                <span>Flujo De Aire Ajustable</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full border-2 border-white flex items-center justify-center">
                  <span className="text-xs font-bold">DUAL</span>
                </div>
                <span>Sabores Duales</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full border-2 border-white flex items-center justify-center">
                  <span className="text-xs font-bold">LCD</span>
                </div>
                <span>Pantalla LCD</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full border-2 border-white flex items-center justify-center">
                  <span className="text-xs font-bold">4M</span>
                </div>
                <span>4 Modos Boost & Modo AI</span>
              </div>
            </div>

            <div className="text-3xl font-bold text-white mb-6">${product.price}</div>
            <Button 
              className="w-full bg-sky-400 hover:bg-sky-300 text-white hover:text-gray-900 transition-all duration-300"
              size="lg"
              onClick={() => addToCart({...product, flavor: "Mango Peach", color: "from-orange-500 to-yellow-400"})}
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

export default ClickPlus;