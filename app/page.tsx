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
    <div className="bg-[var(--color-background)] text-[var(--color-on-background)] antialiased selection:bg-[var(--color-secondary)] selection:text-[var(--color-on-secondary)]">
      <TopNavBar />

      <main className="pt-24">
        <HeroSection />
        <FeaturesSection />
        <ExchangesSection />
        <CtaSection />
      </main>

      <Footer />
    </div>
  );
}
