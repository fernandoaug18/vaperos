import { CartDrawer } from "@/components/CartDrawer";
import vaperosLogo from "@/assets/vaperos-new-logo.png";

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div></div>
        
        <CartDrawer />
      </div>
    </header>
  );
};

export default Header;