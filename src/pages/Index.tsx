import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import PainPointsSection from "@/components/PainPointsSection";
import SolutionsSection from "@/components/SolutionsSection";
import CasesSection from "@/components/CasesSection";
import VideoShowcase from "@/components/VideoShowcase";
import PricingCalculator from "@/components/PricingCalculator";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import AuroraBackground from "@/components/AuroraBackground";


const Index = () => {
  return (
    <div className="min-h-screen bg-background relative">
      <AuroraBackground />
      
      <div className="relative z-10">
        <Navbar />
        <HeroSection />
        <PainPointsSection />
        <SolutionsSection />
        <CasesSection />
        <VideoShowcase />
        <PricingCalculator />
        <CTASection />
        <Footer />
      </div>
    </div>
  );
};

export default Index;
