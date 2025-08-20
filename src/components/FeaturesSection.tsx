import { Smartphone, Truck, Users, Award } from "lucide-react";

const FeaturesSection = () => {
  const features = [
    {
      icon: Smartphone,
      title: "App Móvil",
      description: "Controla tu dispositivo desde tu smartphone con nuestra app exclusiva"
    },
    {
      icon: Truck,
      title: "Envío Gratis",
      description: "Entrega gratuita en pedidos superiores a $50 en toda la región"
    },
    {
      icon: Users,
      title: "Comunidad",
      description: "Únete a miles de vaperos y comparte tu experiencia"
    },
    {
      icon: Award,
      title: "Garantía Premium",
      description: "2 años de garantía en todos nuestros productos principales"
    }
  ];

  return (
    <section className="py-20 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            ¿Por qué elegir <span className="text-gradient">Vaperos</span>?
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Más que una tienda, somos tu compañero en el mundo del vapeo
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="text-center group">
              <div className="relative mb-6">
                <div className="w-20 h-20 bg-gradient-secondary rounded-full flex items-center justify-center mx-auto group-hover:shadow-glow transition-all duration-300">
                  <feature.icon className="w-8 h-8 text-primary" />
                </div>
                <div className="absolute inset-0 w-20 h-20 bg-gradient-primary rounded-full mx-auto opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
              </div>
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;