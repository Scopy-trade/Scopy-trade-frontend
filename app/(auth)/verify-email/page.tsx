import { Suspense } from "react";
import VerifyEmailForm from "@/components/auth/VerifyEmailForm";

export const metadata = { title: "Verify Email | SCopyTrade" };

export default function VerifyEmailPage() {
  return <main className="flex min-h-screen items-center justify-center bg-[var(--color-surface-container-low)] p-5"><Suspense fallback={<div className="text-[var(--color-on-surface)]">Loading...</div>}><VerifyEmailForm /></Suspense></main>;
}
