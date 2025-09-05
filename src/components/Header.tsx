import { CartDrawer } from "@/components/CartDrawer";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import vaperosLogo from "@/assets/vaperos-new-logo.png";

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-8">
          <img src={vaperosLogo} alt="Vaperos" className="h-10" />
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center space-x-2">
                <span>Productos</span>
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 bg-background border border-border shadow-lg">
              <DropdownMenuItem className="cursor-pointer hover:bg-accent">
                HQD CUVIE PLUS 2.0
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer hover:bg-accent">
                HQD GLAZE PRO
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer hover:bg-accent">
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