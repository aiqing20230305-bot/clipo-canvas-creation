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
import NoiseOverlay from "@/components/NoiseOverlay";
import GlowDivider from "@/components/GlowDivider";

const Index = () => {
  return (
    <div className="min-h-screen bg-background relative scanlines">
      <AuroraBackground />
      <NoiseOverlay />

      {/* Starship hull side rails */}
      <div className="fixed top-0 bottom-0 left-0 w-px bg-gradient-to-b from-transparent via-primary/8 to-transparent z-40 pointer-events-none" />
      <div className="fixed top-0 bottom-0 right-0 w-px bg-gradient-to-b from-transparent via-primary/8 to-transparent z-40 pointer-events-none" />

      <div className="relative z-10">
        <Navbar />
        <HeroSection />
        <GlowDivider />
        <PainPointsSection />
        <GlowDivider />
        <SolutionsSection />
        <GlowDivider />
        <CasesSection />
        <VideoShowcase />
        <GlowDivider />
        <PricingCalculator />
        <GlowDivider />
        <CTASection />
        <Footer />
      </div>
    </div>
  );
};

export default Index;
