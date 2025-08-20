// Update this page (the content is just a fallback if you fail to update the page)

import HeroSection from "@/components/HeroSection";
import ProductsSection from "@/components/ProductsSection";
import HQDProductsSection from "@/components/HQDProductsSection";
import FeaturesSection from "@/components/FeaturesSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <ProductsSection />
      <HQDProductsSection />
      <FeaturesSection />
      <Footer />
    </div>
  );
};

export default Index;
