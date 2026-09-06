"use client";

import { FormEvent, useEffect, useState } from "react";
import { MdClose, MdOutlineMarkEmailRead } from "react-icons/md";
import { proTraderWithdrawalService } from "@/lib/api/pro-trader";

interface WithdrawalModalProps { isOpen: boolean; onClose: () => void; }

export default function WithdrawalModal({ isOpen, onClose }: WithdrawalModalProps) {
  const [amount, setAmount] = useState("");
  const [otp, setOtp] = useState("");
  const [wallet, setWallet] = useState<string | null>(null);
  const [step, setStep] = useState<"amount" | "otp" | "success">("amount");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [transactionId, setTransactionId] = useState("");

  useEffect(() => {
    if (!isOpen) { document.body.style.overflow = "unset"; return; }
    document.body.style.overflow = "hidden";
    setStep("amount"); setOtp(""); setError(""); setTransactionId("");
    void proTraderWithdrawalService.getWallet().then((response) => setWallet(response.withdrawalAddress)).catch((err) => setError(err instanceof Error ? err.message : "Could not load your wallet"));
    return () => { document.body.style.overflow = "unset"; };
  }, [isOpen]);

  async function submit(event: FormEvent) {
    event.preventDefault(); setError(""); setLoading(true);
    const numericAmount = Number(amount);
    try {
      if (step === "amount") {
        await proTraderWithdrawalService.requestOtp(numericAmount);
        setStep("otp");
      } else if (step === "otp") {
        const result = await proTraderWithdrawalService.withdraw(numericAmount, otp);
        setTransactionId(result.transactionId);
        setStep("success");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Withdrawal request failed");
    } finally { setLoading(false); }
  }

  if (!isOpen) return null;
  return <>
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm" onClick={onClose} />
    <div className="fixed inset-0 z-50 overflow-y-auto"><div className="flex min-h-full items-center justify-center p-4"><div className="relative w-full max-w-md rounded-xl border border-white/5 bg-surface-container-low shadow-2xl" onClick={(e) => e.stopPropagation()}>
      <div className="flex items-center justify-between border-b border-white/5 p-6"><h3 className="text-xl font-bold text-on-surface">Withdraw earnings</h3><button type="button" onClick={onClose} aria-label="Close" className="text-on-surface-variant hover:text-on-surface"><MdClose className="text-2xl" /></button></div>
      {step === "success" ? <div className="p-8 text-center"><MdOutlineMarkEmailRead className="mx-auto mb-4 text-5xl text-secondary" /><h4 className="text-xl font-bold text-on-surface">Withdrawal submitted</h4><p className="mt-2 text-sm text-on-surface-variant">A confirmation email is on its way.</p><p className="mt-4 break-all rounded-lg bg-surface-container-highest p-3 text-xs text-on-surface-variant">Transaction ID: {transactionId}</p><button onClick={onClose} className="mt-6 w-full rounded-lg bg-secondary py-3 font-bold text-on-secondary">Done</button></div> :
      <form onSubmit={submit} className="space-y-6 p-6">
        {error && <p className="rounded-lg bg-error/10 p-3 text-sm text-error">{error}</p>}
        <div><label className="mb-2 block text-xs font-bold uppercase tracking-widest text-on-surface-variant">Payout method</label><div className="rounded-lg bg-surface-container-highest px-4 py-3 text-sm text-on-surface">USDT (TRC-20)</div></div>
        <div><label className="mb-2 block text-xs font-bold uppercase tracking-widest text-on-surface-variant">Destination wallet</label><div className="break-all rounded-lg bg-surface-container-highest px-4 py-3 text-sm text-on-surface">{wallet || "No wallet address saved"}</div></div>
        <div><label htmlFor="withdrawalAmount" className="mb-2 block text-xs font-bold uppercase tracking-widest text-on-surface-variant">Withdrawal amount (USDT)</label><input id="withdrawalAmount" type="number" min="0.000001" step="0.000001" required disabled={step === "otp"} value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="0.00" className="w-full rounded-lg bg-surface-container-highest px-4 py-4 text-2xl font-bold text-on-surface outline-none focus:ring-1 focus:ring-secondary/30 disabled:opacity-60" /></div>
        {step === "otp" && <div><label htmlFor="withdrawalOtp" className="mb-2 block text-xs font-bold uppercase tracking-widest text-on-surface-variant">Email verification code</label><input id="withdrawalOtp" inputMode="numeric" autoComplete="one-time-code" pattern="[0-9]{6}" maxLength={6} required value={otp} onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))} placeholder="000000" className="w-full rounded-lg bg-surface-container-highest px-4 py-4 text-center text-2xl font-bold tracking-[0.4em] text-on-surface outline-none focus:ring-1 focus:ring-secondary/30" /><p className="mt-2 text-xs text-on-surface-variant">The code is tied to this amount. Go back and request a new code if the amount changes.</p></div>}
        <div className="flex gap-3">{step === "otp" && <button type="button" onClick={() => { setStep("amount"); setOtp(""); }} className="w-1/3 rounded-lg bg-surface-container-highest py-4 text-xs font-bold uppercase text-on-surface">Back</button>}<button type="submit" disabled={loading || !wallet || Number(amount) <= 0 || (step === "otp" && otp.length !== 6)} className="flex-1 rounded-lg bg-gradient-to-r from-secondary to-secondary-container py-4 text-xs font-extrabold uppercase tracking-widest text-on-secondary disabled:opacity-50">{loading ? "Please wait..." : step === "amount" ? "Email verification code" : "Confirm withdrawal"}</button></div>
        <p className="text-center text-[10px] leading-relaxed text-on-surface-variant/60">Blockchain transactions are irreversible. Confirm your saved wallet before continuing.</p>
      </form>}
    </div></div></div>
  </>;
}
