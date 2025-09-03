// Update this page (the content is just a fallback if you fail to update the page)

import HeroSection from "@/components/HeroSection";
import HQDProductsSection from "@/components/HQDProductsSection";
import FAQSection from "@/components/FAQSection";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import AgeVerification from "@/components/AgeVerification";
import { useState, useEffect } from "react";

const Index = () => {
  const [isAgeVerified, setIsAgeVerified] = useState(false);

  useEffect(() => {
    const ageVerified = localStorage.getItem('ageVerified');
    if (ageVerified === 'true') {
      setIsAgeVerified(true);
    }
  }, []);

  const handleAgeVerified = () => {
    setIsAgeVerified(true);
  };

  if (!isAgeVerified) {
    return <AgeVerification onVerified={handleAgeVerified} />;
  }

  return (
    <div className="min-h-screen">
      <HeroSection />
      <HQDProductsSection />
      <FAQSection />
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Index;
