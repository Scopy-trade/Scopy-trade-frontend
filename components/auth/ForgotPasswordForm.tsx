"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import BrandLogo from "@/components/brand/BrandLogo";
import { authAPI } from "@/lib/api/client";

export default function ForgotPasswordForm() {
  const [step, setStep] = useState<"email" | "reset" | "done">("email");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(event: FormEvent) {
    event.preventDefault(); setLoading(true); setError("");
    try {
      if (step === "email") {
        await authAPI.requestPasswordReset(email);
        setStep("reset");
      } else if (step === "reset") {
        await authAPI.resetPassword(email, otp, password, confirmPassword);
        setStep("done");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Request failed");
    } finally { setLoading(false); }
  }

  return (
    <div className="w-full max-w-md rounded-2xl border border-[var(--color-outline-variant)] bg-[var(--color-surface-container-lowest)] p-7 sm:p-10 shadow-2xl">
      <BrandLogo className="mb-8 h-12 w-40" priority />
      <h1 className="text-3xl font-black text-[var(--color-on-surface)]">{step === "done" ? "Password updated" : "Reset your password"}</h1>
      <p className="mt-2 text-sm leading-6 text-[var(--color-on-surface-variant)]">{step === "email" ? "We'll email you a secure six-digit reset code." : step === "reset" ? `Enter the code sent to ${email} and choose a new password.` : "Your new password is ready to use."}</p>
      {error && <p className="mt-5 rounded-xl bg-[var(--color-error-container)]/30 p-3 text-sm text-[var(--color-error)]">{error}</p>}
      {step === "done" ? <Link href="/login" className="button-gradient mt-7 block w-full rounded-xl py-3.5 text-center font-bold text-[var(--color-on-secondary)]">Return to sign in</Link> : (
        <form onSubmit={submit} className="mt-6 space-y-4">
          {step === "email" ? <input type="email" required autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="name@example.com" className="w-full rounded-xl bg-[var(--color-surface-container-highest)] px-4 py-3.5 text-[var(--color-on-surface)] outline-none focus:ring-2 focus:ring-[var(--color-secondary)]/30" /> : <>
            <input aria-label="Reset code" inputMode="numeric" autoComplete="one-time-code" pattern="[0-9]{6}" maxLength={6} required value={otp} onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))} placeholder="Six-digit code" className="w-full rounded-xl bg-[var(--color-surface-container-highest)] px-4 py-3.5 text-[var(--color-on-surface)] outline-none focus:ring-2 focus:ring-[var(--color-secondary)]/30" />
            <input type="password" required minLength={8} autoComplete="new-password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="New password" className="w-full rounded-xl bg-[var(--color-surface-container-highest)] px-4 py-3.5 text-[var(--color-on-surface)] outline-none focus:ring-2 focus:ring-[var(--color-secondary)]/30" />
            <input type="password" required minLength={8} autoComplete="new-password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Confirm new password" className="w-full rounded-xl bg-[var(--color-surface-container-highest)] px-4 py-3.5 text-[var(--color-on-surface)] outline-none focus:ring-2 focus:ring-[var(--color-secondary)]/30" />
          </>}
          <button disabled={loading} className="button-gradient w-full rounded-xl py-3.5 font-bold text-[var(--color-on-secondary)] disabled:opacity-50">{loading ? "Please wait..." : step === "email" ? "Send reset code" : "Reset password"}</button>
        </form>
      )}
      {step !== "done" && <Link href="/login" className="mt-5 block text-center text-sm text-[var(--color-on-surface-variant)] hover:underline">Back to sign in</Link>}
    </div>
  );
}
