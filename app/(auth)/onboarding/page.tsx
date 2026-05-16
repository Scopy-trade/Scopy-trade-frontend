// app/register/page.tsx
import BrandingPanel from "@/components/auth/register/BrandingPanel";
import { ExchangeSettings } from "@/components/onboarding/ExchangeSettings";
import { Footer } from "@/components/onboarding/Footer";

export const metadata = {
  title: "Onboarding | SCopyTrade",
  description: "Complete your SCopyTrade onboarding.",
};

export default function OnboardingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-surface-container-lowest text-(--color-on-surface)">
      <main className="grow flex flex-col lg:flex-row items-stretch overflow-hidden">
        {/* Left – branding (visible on lg screens) */}
        <BrandingPanel />

        {/* Right – registration form */}
        <div className="min-h-screen w-full lg:w-2/3 flex flex-col bg-background text-on-background">
          <main className="mt-20 grow px-8 py-12 max-w-7xl mx-auto w-full">
            <header className="mb-12">
              <h1 className="text-4xl font-bold font-headline tracking-tight mb-2">
                Exchange Settings
              </h1>
              <p className="text-on-surface-variant max-w-2xl font-body">
                Connect your exchange API keys to enable automated copy trading.
                Your keys are encrypted and stored with sovereign security
                protocols.
              </p>
            </header>
            <ExchangeSettings />
          </main>
        </div>
      </main>
    </div>
  );
}
