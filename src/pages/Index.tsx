import { useState, useEffect } from "react";
import HeroSection from "@/components/HeroSection";
import ArtisticShowcase from "@/components/ArtisticShowcase";
import HQDProductsSection from "@/components/HQDProductsSection";
import FAQSection from "@/components/FAQSection";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import Header from "@/components/Header";
import AgeVerification from "@/components/AgeVerification";
const Index = () => {
  const [isAgeVerified, setIsAgeVerified] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const handleAgeVerified = () => {
    setIsAgeVerified(true);
  };

  if (isLoading) {
    return null;
  }

  if (!isAgeVerified) {
    return <AgeVerification onVerified={handleAgeVerified} />;
  }

  return (
    <div className="min-h-screen">
      <Header />
      <HeroSection />
      <ArtisticShowcase />
      <HQDProductsSection />
      <FAQSection />
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Index;
