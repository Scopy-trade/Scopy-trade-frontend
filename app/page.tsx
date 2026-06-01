import TopNavBar from "@/components/landing/TopNavBar";
import HeroSection from "@/components/landing/HeroSection";
import FeaturesSection from "@/components/landing/FeaturesSection";
import ExchangesSection from "@/components/landing/ExchangesSection";
import CtaSection from "@/components/landing/CtaSection";
import Footer from "@/components/landing/Footer";
import DualEntrySection from "@/components/landing/DualEntrySection";
import CapabilitiesSection from "@/components/landing/CapabilitiesSection";

export const metadata = {
  title: "SCopyTrade | The Sovereign Terminal for Both Sides of the Trade",
  description:
    "Execute trades from top signals directly on your exchange without giving up control of your funds.",
};

export default function LandingPage() {
  return (
    <div className="bg-[#0b1326] text-white antialiased selection:bg-emerald-400/30 selection:text-emerald-200">
      <TopNavBar />
      <main>
        <HeroSection />
        <DualEntrySection />
        <CapabilitiesSection />
        <FeaturesSection />
        <ExchangesSection />
        <CtaSection />
      </main>
      <Footer />
    </div>
  );
}
