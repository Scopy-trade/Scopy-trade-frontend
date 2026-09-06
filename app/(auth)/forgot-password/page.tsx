import ForgotPasswordForm from "@/components/auth/ForgotPasswordForm";

export const metadata = { title: "Forgot Password | SCopyTrade" };

export default function ForgotPasswordPage() {
  return <main className="flex min-h-screen items-center justify-center bg-[var(--color-surface-container-low)] p-5"><ForgotPasswordForm /></main>;
}
