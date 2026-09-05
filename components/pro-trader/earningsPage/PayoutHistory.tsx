// components/dashboard/earnings/PayoutHistory.tsx
"use client";

import { useEffect, useState } from "react";
import { MdArrowForward, MdErrorOutline } from "react-icons/md";
import Link from "next/link";
import { withdrawalService } from "@/lib/api/withdrawal";
import { WithdrawalHistoryItem } from "@/lib";

function formatDate(iso: string): { date: string; time: string } {
  const d = new Date(iso);
  return {
    date: d.toLocaleDateString(undefined, {
      month: "short",
      day: "numeric",
      year: "numeric",
    }),
    time: d.toLocaleTimeString(undefined, {
      hour: "2-digit",
      minute: "2-digit",
      timeZoneName: "short",
    }),
  };
}

function formatAmount(amount: number | null): string {
  if (amount === null) return "—";
  return amount.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 6,
  });
}

export default function PayoutHistory() {
  const [items, setItems] = useState<WithdrawalHistoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    withdrawalService
      .getWithdrawalHistory(1)
      .then((res) => {
        if (!cancelled) setItems(res.withdrawals.slice(0, 3));
      })
      .catch((err) => {
        if (!cancelled) {
          setError(
            err instanceof Error ? err.message : "Failed to load payout history",
          );
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="w-full">
      <div className="bg-surface-container-low rounded-xl overflow-hidden border border-white/5">
        <div className="px-4 sm:px-8 py-4 sm:py-6 border-b border-white/5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <h3 className="text-lg font-bold text-on-surface">Payout History</h3>
          <Link
            href="/dashboard/pro-trader/withdrawals"
            className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest bg-secondary/20 text-secondary rounded-md flex items-center justify-center gap-1"
          >
            View All
            <MdArrowForward className="text-xs" />
          </Link>
        </div>

        {loading && (
          <div className="p-10 flex flex-col items-center gap-3 text-on-surface-variant">
            <div className="h-6 w-6 rounded-full border-2 border-secondary border-t-transparent animate-spin" />
            <p className="text-sm">Loading…</p>
          </div>
        )}

        {!loading && error && (
          <div className="p-10 flex flex-col items-center gap-3 text-center">
            <MdErrorOutline className="text-2xl text-rose-400" />
            <p className="text-sm text-on-surface-variant">{error}</p>
          </div>
        )}

        {!loading && !error && (
          <>
            {/* Desktop Table View */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-surface-container-low text-on-surface-variant text-[10px] font-black uppercase tracking-[0.2em]">
                  <tr>
                    <th className="px-8 py-5">Transaction ID</th>
                    <th className="px-8 py-5">Date &amp; Time</th>
                    <th className="px-8 py-5">Amount</th>
                    <th className="px-8 py-5 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {items.map((tx, index) => {
                    const { date, time } = formatDate(tx.date);
                    return (
                      <tr
                        key={tx.id}
                        className={`${
                          index % 2 === 0 ? "" : "bg-surface-container-lowest/50"
                        } hover:bg-white/[0.02] transition-colors`}
                      >
                        <td className="px-8 py-6 font-mono text-xs text-on-surface break-all">
                          {tx.transactionId ?? "—"}
                        </td>
                        <td className="px-8 py-6">
                          <div className="text-sm font-medium text-on-surface">
                            {date}
                          </div>
                          <div className="text-[10px] text-on-surface-variant">
                            {time}
                          </div>
                        </td>
                        <td className="px-8 py-6 font-bold text-on-surface">
                          {formatAmount(tx.amount)} USDT
                        </td>
                        <td className="px-8 py-6 text-right">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold border bg-secondary/10 text-secondary border-secondary/20">
                            {tx.status}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Mobile Card View */}
            <div className="md:hidden divide-y divide-white/5">
              {items.map((tx) => {
                const { date, time } = formatDate(tx.date);
                return (
                  <div key={tx.id} className="p-4 space-y-3">
                    <div className="flex justify-between items-start gap-3">
                      <span className="font-mono text-xs text-on-surface break-all">
                        {tx.transactionId ?? "—"}
                      </span>
                      <span className="shrink-0 inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold border bg-secondary/10 text-secondary border-secondary/20">
                        {tx.status}
                      </span>
                    </div>
                    <div className="flex justify-between items-baseline">
                      <div>
                        <div className="text-sm font-medium text-on-surface">
                          {date}
                        </div>
                        <div className="text-[10px] text-on-surface-variant">
                          {time}
                        </div>
                      </div>
                      <div className="font-bold text-on-surface">
                        {formatAmount(tx.amount)} USDT
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {items.length === 0 && (
              <div className="p-10 text-center">
                <p className="text-on-surface-variant text-sm">
                  No withdrawals yet
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
