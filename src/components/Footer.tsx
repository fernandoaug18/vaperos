import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Facebook, Instagram, Twitter, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-card/30 backdrop-blur-sm border-t border-border/50 py-16 px-4">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-bold text-white mb-4">Vaperos</h3>
            <p className="text-muted-foreground mb-6">
              Tu destino premium para la mejor experiencia vaper. 
              Calidad, innovación y pasión en cada producto.
            </p>
            <div className="flex space-x-4">
              <Button variant="outline" size="icon" className="rounded-full">
                <Facebook className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="icon" className="rounded-full">
                <Instagram className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="icon" className="rounded-full">
                <Twitter className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Products */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Productos</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li><a href="#" className="hover:text-primary transition-colors">Mods</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Pods</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">E-Liquids</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Accesorios</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Soporte</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li><a href="#" className="hover:text-primary transition-colors">Centro de Ayuda</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Garantías</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Envíos</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Contacto</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Newsletter</h4>
            <p className="text-muted-foreground mb-4">
              Recibe las últimas novedades y ofertas exclusivas
            </p>
            <div className="flex gap-2">
              <Input 
                placeholder="tu@email.com" 
                className="bg-background/50 border-border/50"
              />
              <Button className="bg-gradient-primary hover:shadow-glow">
                <Mail className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-border/50 pt-8 text-center text-muted-foreground">
          <p>&copy; 2024 <span className="text-white">Vaperos</span>. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;