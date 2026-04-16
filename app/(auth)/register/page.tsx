import BrandingPanel from "@/components/auth/BrandingPanel";
import RegisterForm from "@/components/auth/RegisterForm";

export const metadata = {
  title: "Register | SCopyTrade",
  description: "Create your SCopyTrade account.",
};

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[var(--color-surface-container-lowest)] text-[var(--color-on-surface)]">
      <main className="flex-grow flex flex-col md:flex-row items-stretch overflow-hidden">
        {/* Left – branding */}
        <BrandingPanel />

        {/* Right – registration form */}
        <RegisterForm />
      </main>

      {/* Bottom progress bar */}
      <div className="h-1 bg-[var(--color-surface-container-lowest)] w-full relative">
        <div className="absolute left-0 top-0 h-full w-1/3 progress-gradient" />
      </div>
    </div>
  );
}
