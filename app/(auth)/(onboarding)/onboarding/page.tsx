// app/onboarding/page.tsx

import { ExchangeSettings } from "@/components/onboarding/ExchangeSettings";
import { Footer } from "@/components/onboarding/Footer";

export default function OnboardingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-on-background">
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
      <Footer />
    </div>
  );
}
