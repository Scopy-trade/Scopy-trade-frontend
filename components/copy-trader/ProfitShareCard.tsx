"use client";

import { useCallback, useEffect, useState } from "react";
import { MdAccountBalanceWallet, MdLock } from "react-icons/md";
import { ProfitShareSummary, tradeService } from "@/lib/api/trades";

export default function ProfitShareCard({
  onStatusChange,
}: {
  onStatusChange: (summary: ProfitShareSummary) => void;
}) {
  const [summary, setSummary] = useState<ProfitShareSummary | null>(null);
  const [connectionId, setConnectionId] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const load = useCallback(async () => {
    const response = await tradeService.getProfitShare();
    setSummary(response.profitShare);
    onStatusChange(response.profitShare);
    setConnectionId((current) =>
      response.profitShare.connections.some((item) => item.connectionId === current)
        ? current
        : response.profitShare.connections[0]?.connectionId ?? "",
    );
  }, [onStatusChange]);

  useEffect(() => {
    void load()
      .catch((error) => setMessage(error instanceof Error ? error.message : "Unable to load profit share."))
      .finally(() => setLoading(false));
    const interval = window.setInterval(() => {
      void load().catch(() => undefined);
    }, 15_000);
    return () => window.clearInterval(interval);
  }, [load]);

  async function approve() {
    if (!connectionId) return;
    setSubmitting(true);
    setMessage(null);
    try {
      const response = await tradeService.approveProfitShareWithdrawal(connectionId);
      setSummary(response.profitShare);
      onStatusChange(response.profitShare);
      setMessage(response.message);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Withdrawal approval failed.");
      await load().catch(() => undefined);
    } finally {
      setSubmitting(false);
    }
  }

  const amount = Number(summary?.pendingAmount ?? 0);
  const required = summary?.withdrawalRequired ?? false;

  return (
    <section className={`rounded-xl border p-5 ${required ? "border-amber-400/30 bg-amber-400/10" : "border-white/5 bg-surface-container-low"}`}>
      <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-center">
        <div className="flex items-start gap-3">
          <div className={`rounded-lg p-2.5 ${required ? "bg-amber-400/15 text-amber-300" : "bg-secondary/10 text-secondary"}`}>
            {required ? <MdLock size={22} /> : <MdAccountBalanceWallet size={22} />}
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Accrued platform profit share</p>
            <p className="mt-1 text-2xl font-bold text-slate-100">{amount.toFixed(2)} USDT</p>
            <p className="mt-1 max-w-2xl text-xs leading-relaxed text-slate-400">
              This is the cumulative 20% platform share from your profitable copied trades. It remains in your exchange wallet until it reaches {summary?.threshold ?? "10.00"} USDT.
            </p>
            {required && <p className="mt-2 text-sm font-semibold text-amber-300">Approve collection to unlock copying new trades.</p>}
            {message && <p role="status" className="mt-2 text-xs text-slate-300">{message}</p>}
          </div>
        </div>

        {required && (
          <div className="flex w-full flex-col gap-2 sm:flex-row lg:w-auto">
            <select
              aria-label="Exchange used for profit-share withdrawal"
              value={connectionId}
              onChange={(event) => setConnectionId(event.target.value)}
              disabled={loading || submitting}
              className="min-w-52 rounded-lg border border-white/10 bg-surface-container-highest px-3 py-2.5 text-sm text-slate-100"
            >
              {!summary?.connections.length && <option value="">No active exchange</option>}
              {summary?.connections.map((connection) => (
                <option key={connection.connectionId} value={connection.connectionId}>
                  {connection.label || connection.exchange}
                </option>
              ))}
            </select>
            <button
              type="button"
              disabled={!connectionId || submitting || summary?.processing}
              onClick={() => void approve()}
              className="rounded-lg bg-secondary px-4 py-2.5 text-sm font-bold text-on-secondary disabled:cursor-not-allowed disabled:opacity-50"
            >
              {submitting || summary?.processing ? "Processing…" : "Approve withdrawal"}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
