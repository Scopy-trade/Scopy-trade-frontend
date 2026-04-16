import LoginBrandingPanel from "@/components/auth/login/LoginBrandingPanel";
import LoginForm from "@/components/auth/login/LoginForm";
import SecurityFooter from "@/components/auth/login/SecurityFooter";

export const metadata = {
  title: "Login | SCopyTrade",
  description: "Sign in to your SCopyTrade account.",
};

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-[var(--color-surface-container-lowest)] text-[var(--color-on-surface)]">
      {/* Background ambient glow blobs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] bg-[var(--color-primary)]/10 rounded-full blur-[120px]" />
        <div className="absolute -bottom-[20%] -right-[10%] w-[50%] h-[50%] bg-[var(--color-secondary)]/10 rounded-full blur-[120px]" />
      </div>

      {/* Card */}
      <main className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 bg-[var(--color-surface-container-low)] rounded-xl overflow-hidden relative z-10 shadow-2xl shadow-[var(--color-surface-container-lowest)]/50">
        {/* Left – branding */}
        <LoginBrandingPanel />

        {/* Right – login form */}
        <LoginForm />
      </main>

      {/* Fixed security badge strip */}
      <SecurityFooter />
    </div>
  );
}
