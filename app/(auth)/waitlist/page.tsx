import { Suspense } from "react";
import WaitlistContent from "@/components/auth/waitlist/WaitlistContent";
import WaitlistBrandingPanel from "@/components/auth/waitlist/WaitlistBrandingPanel";

export const metadata = {
  title: "Waitlist | SCopyTrade",
  description: "You're on the SCopyTrade waitlist.",
};

function WaitlistFallback() {
  return (
    <div className="w-full md:w-1/2 flex items-center justify-center p-8 lg:p-14 bg-[var(--color-surface-container-lowest)]">
      <div className="w-full max-w-sm space-y-5 animate-pulse">
        <div className="h-9 w-48 bg-[var(--color-surface-container-high)] rounded-xl" />
        <div className="h-4 w-64 bg-[var(--color-surface-container-high)] rounded-lg" />
        <div className="space-y-3 pt-4">
          <div className="h-12 bg-[var(--color-surface-container-high)] rounded-xl" />
          <div className="h-12 bg-[var(--color-surface-container-high)] rounded-xl" />
        </div>
      </div>
    </div>
  );
}

export default function WaitlistPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[var(--color-surface-container-lowest)] text-[var(--color-on-surface)]">
      <main className="flex-grow flex flex-col md:flex-row items-stretch overflow-hidden">
        <WaitlistBrandingPanel />
        <Suspense fallback={<WaitlistFallback />}>
          <WaitlistContent />
        </Suspense>
      </main>

      <div className="h-1 bg-[var(--color-surface-container-lowest)] w-full relative">
        <div className="absolute left-0 top-0 h-full w-1/3 progress-gradient" />
      </div>
    </div>
  );
}
