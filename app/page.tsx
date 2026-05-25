import TopNavBar from "@/components/landing/TopNavBar";
import HeroSection from "@/components/landing/HeroSection";
import FeaturesSection from "@/components/landing/FeaturesSection";
import ExchangesSection from "@/components/landing/ExchangesSection";
import CtaSection from "@/components/landing/CtaSection";
import Footer from "@/components/landing/Footer";

export const metadata = {
  title: "SCopyTrade | Sovereign Copy Trading Terminal",
  description:
    "Execute trades from top signals directly on your exchange without giving up control of your funds.",
};

export default function LandingPage() {
  return (
    <div className="bg-[#080C10] text-white antialiased selection:bg-emerald-500/30 selection:text-emerald-200">
      <TopNavBar />
      <main>
        <HeroSection />
        <FeaturesSection />
        <ExchangesSection />
        <CtaSection />
      </main>
      <Footer />
    </div>
  );
}
