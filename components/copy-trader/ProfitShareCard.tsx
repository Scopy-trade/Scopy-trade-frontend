"use client";

import { useCallback, useEffect, useState } from "react";
import { ProfitShareSummary, tradeService } from "@/lib/api/trades";

export default function ProfitShareCard({ onStatusChange }: { onStatusChange: (summary: ProfitShareSummary) => void }) {
  const [summary, setSummary] = useState<ProfitShareSummary | null>(null);
  const [hash, setHash] = useState("");
  const [signature, setSignature] = useState("");
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  const load = useCallback(async () => {
    const result = await tradeService.getProfitShare();
    setSummary(result.profitShare);
    onStatusChange(result.profitShare);
  }, [onStatusChange]);
  useEffect(() => {
    async function refresh() {
      try { await load(); }
      catch { setMessage("Settlement details are unavailable. Please refresh to try again."); }
    }
    void refresh();
    const timer = window.setInterval(() => { if (!document.hidden) void refresh(); }, 30_000);
    return () => window.clearInterval(timer);
  }, [load]);
  async function verify() {
    if (!summary?.settlement) return;
    setBusy(true);
    try {
      const result = await tradeService.verifySettlement(summary.settlement._id, hash.trim(), signature.trim());
      setSummary(result.profitShare);
      onStatusChange(result.profitShare);
      setHash(""); setSignature(""); setMessage(result.message);
      window.dispatchEvent(new Event("notifications-updated"));
    } catch (error) { setMessage(error instanceof Error ? error.message : "Payment could not be verified yet."); }
    finally { setBusy(false); }
  }
  const invoice = summary?.settlement;
  const required = summary?.settlementRequired || !!invoice;
  const input = "w-full rounded-lg border border-white/15 bg-surface-container-highest px-3 py-2 text-sm text-slate-100";
  return <section className={`space-y-4 rounded-xl border p-5 ${required ? "border-amber-400/30 bg-amber-400/10" : "border-white/10"}`}>
    <div><h2 className="text-sm font-bold text-slate-300">Profit-share settlement</h2>
      <p className="mt-1 text-2xl font-bold">{Number(summary?.pendingAmount || 0).toFixed(2)} USDT accrued</p>
      <p className="mt-2 text-sm text-slate-400">20% of profitable copied trades: 10% for the pro trader and 10% for the platform. Settlement is due at {summary?.threshold || "10.00"} USDT.</p>
      {required && <p className="mt-2 text-amber-300">New copied trades are paused until your payment is confirmed.</p>}
    </div>
    {invoice && <div className="space-y-4 rounded-lg border border-white/10 p-4">
      <p className="text-sm">Send exactly <strong>{invoice.amount} USDT</strong> using <strong>TRON (TRC-20)</strong>. Keep TRX available in your sending wallet for network fees.</p>
      <label className="block space-y-1 text-xs text-slate-400"><span>Receiving wallet</span><input readOnly value={invoice.destinationAddress} onFocus={event => event.target.select()} className={input} /></label>
      <label className="block space-y-1 text-xs text-slate-400"><span>Payment memo - include this exact text</span><input readOnly value={invoice.memo} onFocus={event => event.target.select()} className={input} /></label>
      <p className="text-xs text-slate-400">We check for payment automatically. If your payment is not detected, paste its transaction hash below. This invoice amount stays fixed; fees from trades closing later may require another settlement.</p>
      <form className="space-y-3" onSubmit={event => { event.preventDefault(); void verify(); }}>
        <label className="block space-y-1 text-xs text-slate-400"><span>Transaction hash</span><input required pattern="[a-fA-F0-9]{64}" maxLength={64} value={hash} onChange={event => setHash(event.target.value)} className={input} placeholder="64-character TRON transaction hash" /></label>
        <details className="text-xs text-slate-400"><summary className="cursor-pointer">My wallet did not include a memo</summary>
          <p className="my-2">Sign this message with the wallet that sent the payment: <code className="break-all text-slate-200">ScopyTrade settlement {invoice._id}</code>. Paste the message signature below. Contact support if your wallet or exchange cannot sign messages. A transaction hash alone cannot prove ownership of a payment without a memo.</p>
          <label className="block space-y-1"><span>Sending wallet message signature</span><input value={signature} maxLength={200} onChange={event => setSignature(event.target.value)} className={input} /></label>
        </details>
        <button disabled={busy || !hash.trim()} className="rounded-lg bg-secondary px-4 py-2 text-sm font-bold text-on-secondary disabled:opacity-50">{busy ? "Verifying..." : "Verify payment"}</button>
      </form>
    </div>}
    {required && !invoice && <p className="text-sm text-amber-300">Your settlement needs review. Please contact support before sending payment.</p>}
    {message && <p role="status" className="text-sm text-slate-300">{message}</p>}
  </section>;
}
