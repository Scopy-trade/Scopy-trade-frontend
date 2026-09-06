"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { RiMailCheckLine } from "react-icons/ri";
import BrandLogo from "@/components/brand/BrandLogo";
import { authAPI } from "@/lib/api/client";

export default function VerifyEmailForm() {
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function verify(event: FormEvent) {
    event.preventDefault();
    if (!email) return setError("Return to registration and enter your email address.");
    setLoading(true); setError(""); setMessage("");
    try {
      const status = await authAPI.verifySignup(email, otp);
      window.location.href = status === "waitlist" ? "/waitlist?registered=true" : "/login?registered=true";
    } catch (err) {
      setError(err instanceof Error ? err.message : "Verification failed");
      setLoading(false);
    }
  }

  async function resend() {
    if (!email) return;
    setLoading(true); setError("");
    try {
      await authAPI.resendSignupOtp(email);
      setMessage("A new code has been sent. Check your inbox and spam folder.");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not resend the code");
    } finally { setLoading(false); }
  }

  return (
    <div className="w-full max-w-md rounded-2xl border border-[var(--color-outline-variant)] bg-[var(--color-surface-container-lowest)] p-7 sm:p-10 shadow-2xl">
      <BrandLogo className="mb-8 h-12 w-40" priority />
      <RiMailCheckLine className="mb-4 text-4xl text-[var(--color-secondary)]" />
      <h1 className="text-3xl font-black text-[var(--color-on-surface)]">Verify your email</h1>
      <p className="mt-2 text-sm leading-6 text-[var(--color-on-surface-variant)]">Enter the six-digit code sent to <strong>{email || "your email"}</strong>.</p>
      {error && <p className="mt-5 rounded-xl bg-[var(--color-error-container)]/30 p-3 text-sm text-[var(--color-error)]">{error}</p>}
      {message && <p className="mt-5 rounded-xl bg-[var(--color-secondary)]/10 p-3 text-sm text-[var(--color-secondary)]">{message}</p>}
      <form onSubmit={verify} className="mt-6 space-y-4">
        <input aria-label="Verification code" inputMode="numeric" autoComplete="one-time-code" pattern="[0-9]{6}" maxLength={6} required value={otp} onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))} placeholder="000000" className="w-full rounded-xl bg-[var(--color-surface-container-highest)] px-4 py-4 text-center text-2xl font-bold tracking-[0.45em] text-[var(--color-on-surface)] outline-none focus:ring-2 focus:ring-[var(--color-secondary)]/30" />
        <button disabled={loading || otp.length !== 6} className="button-gradient w-full rounded-xl py-3.5 font-bold text-[var(--color-on-secondary)] disabled:opacity-50">{loading ? "Verifying..." : "Verify email"}</button>
      </form>
      <div className="mt-5 flex justify-between text-sm"><button type="button" onClick={resend} disabled={loading || !email} className="font-bold text-[var(--color-secondary)] disabled:opacity-50">Resend code</button><Link href="/register" className="text-[var(--color-on-surface-variant)] hover:underline">Start again</Link></div>
    </div>
  );
}
