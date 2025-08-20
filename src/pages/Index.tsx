// Update this page (the content is just a fallback if you fail to update the page)

import HeroSection from "@/components/HeroSection";
import HQDProductsSection from "@/components/HQDProductsSection";
import FAQSection from "@/components/FAQSection";
import FeaturesSection from "@/components/FeaturesSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <HQDProductsSection />
      <FAQSection />
      <FeaturesSection />
      <Footer />
    </div>
  );
};

export default Index;
