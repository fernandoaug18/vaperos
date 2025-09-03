import { Button } from "@/components/ui/button";
import { ArrowRight, Zap, Star } from "lucide-react";
import heroImage from "@/assets/hero-vape.jpg";
import vaperosLogo from "@/assets/vaperos-new-logo.png";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-hero">
      {/* Video Background with Overlay */}
      <div className="absolute inset-0 z-0">
        <video 
          className="w-full h-full object-cover opacity-50"
          autoPlay 
          muted 
          loop 
          playsInline
          poster={heroImage}
        >
          <source src="/videos/hero-video.mp4" type="video/mp4" />
          {/* Fallback image if video doesn't load */}
        </video>
        <img 
          src={heroImage} 
          alt="Premium vaping experience"
          className="w-full h-full object-cover opacity-30"
          style={{ display: 'none' }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-background/85 via-background/70 to-primary/30" />
      </div>

      {/* Animated background elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Main Heading */}
          <h1 className="text-7xl md:text-9xl font-orbitron font-black mb-6 leading-none tracking-wider">
            <span className="text-white drop-shadow-2xl">VAPEROS</span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed">
            La vibra más dura del vapeo. Tecnología de otro nivel, 
            sabores que explotan y el flow que necesitas.
          </p>

          {/* CTA Buttons */}
          <div className="flex justify-center mb-16">
            <Button 
              size="lg" 
              className="bg-sky-400 hover:bg-sky-300 text-white hover:text-gray-900 transition-all duration-300 text-xl font-bold px-12 py-6 rounded-2xl"
            >
              COMPRA YA
              <ArrowRight className="ml-3 w-6 h-6" />
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
        <div className="w-6 h-10 border-2 border-border/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-primary rounded-full mt-2 animate-bounce" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;