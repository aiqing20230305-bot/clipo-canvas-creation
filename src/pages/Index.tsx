import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import PainPointsSection from "@/components/PainPointsSection";
import SolutionsSection from "@/components/SolutionsSection";
import CasesSection from "@/components/CasesSection";
import PricingCalculator from "@/components/PricingCalculator";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import AuroraBackground from "@/components/AuroraBackground";
import CursorGlow from "@/components/CursorGlow";

const Index = () => {
  return (
    <div className="min-h-screen bg-background relative">
      <AuroraBackground />
      <CursorGlow />
      <div className="relative z-10">
        <Navbar />
        <HeroSection />
        <PainPointsSection />
        <SolutionsSection />
        <CasesSection />
        <PricingCalculator />
        <CTASection />
        <Footer />
      </div>
    </div>
  );
};

export default Index;
