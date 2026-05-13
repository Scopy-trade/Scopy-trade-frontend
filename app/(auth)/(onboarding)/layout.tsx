// app/register/layout.tsx
import { ReactNode } from "react";
import BrandingPanel from "@/components/auth/register/BrandingPanel";

export const metadata = {
  title: "Onboarding | SCopyTrade",
  description: "Create your SCopyTrade account.",
};

export default function OnboardingLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col bg-[var(--color-surface-container-lowest)] text-[var(--color-on-surface)]">
      <main className="flex-grow flex flex-col lg:flex-row items-stretch overflow-hidden">
        {/* Left – branding (hidden on mobile, visible on lg screens) */}
        <div className="hidden lg:block lg:w-1/2 h-full">
          <BrandingPanel />
        </div>

        {/* Right – registration form (full width on mobile, half on desktop) */}
        <div className="w-full lg:w-1/2 h-full">{children}</div>
      </main>
    </div>
  );
}
