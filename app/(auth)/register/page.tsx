import BrandingPanel from "@/components/auth/BrandingPanel";
import RegisterForm from "@/components/auth/RegisterForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Register | SCopyTrade",
  description: "Create your SCopyTrade account",
};

export default function RegisterPage() {
  return (
    <>
      <main className="flex-grow flex flex-col md:flex-row items-stretch overflow-hidden min-h-screen">
        <BrandingPanel />
        <RegisterForm />
      </main>

      {/* Bottom haptic progress bar */}
      <div className="h-1 bg-[var(--color-surface-container-lowest)] w-full relative">
        <div className="absolute left-0 top-0 h-full w-1/3 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)]" />
      </div>
    </>
  );
}
