// app/login/page.tsx
import LoginBrandingPanel from "@/components/auth/login/LoginBrandingPanel";
import LoginForm from "@/components/auth/login/LoginForm";

export const metadata = {
  title: "Login | SCopyTrade",
  description: "Sign in to your SCopyTrade account.",
};

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[var(--color-surface-container-lowest)] text-[var(--color-on-surface)]">
      <main className="flex-grow flex flex-col md:flex-row items-stretch overflow-hidden">
        {/* Left – branding panel (hidden on mobile, shows on md+) */}
        <LoginBrandingPanel />

        {/* Right – login form */}
        <LoginForm />
      </main>

      {/* Bottom progress bar */}
      <div className="h-1 bg-[var(--color-surface-container-lowest)] w-full relative">
        <div className="absolute left-0 top-0 h-full w-1/3 progress-gradient" />
      </div>
    </div>
  );
}
