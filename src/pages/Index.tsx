// Update this page (the content is just a fallback if you fail to update the page)

import HeroSection from "@/components/HeroSection";
import HQDProductsSection from "@/components/HQDProductsSection";
import FAQSection from "@/components/FAQSection";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import Header from "@/components/Header";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <HeroSection />
      <HQDProductsSection />
      <FAQSection />
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Index;
