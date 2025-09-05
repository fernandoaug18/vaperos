import { CartDrawer } from "@/components/CartDrawer";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";
import vaperosLogo from "@/assets/vaperos-new-logo.png";

const Header = () => {
  const navigate = useNavigate();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-8">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/')}
            className="flex items-center space-x-2"
          >
            <span>Home</span>
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center space-x-2">
                <span>Productos</span>
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 bg-background border border-border shadow-lg">
              <DropdownMenuItem 
                className="cursor-pointer hover:bg-accent"
                onClick={() => navigate('/cuvie-plus')}
              >
                HQD CUVIE PLUS 2.0
              </DropdownMenuItem>
              <DropdownMenuItem 
                className="cursor-pointer hover:bg-accent"
                onClick={() => navigate('/glaze-pro')}
              >
                HQD GLAZE PRO
              </DropdownMenuItem>
              <DropdownMenuItem 
                className="cursor-pointer hover:bg-accent"
                onClick={() => navigate('/click-plus')}
              >
                HQD CLICK PLUS
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        
        <CartDrawer />
      </div>
    </header>
  );
};

export default Header;