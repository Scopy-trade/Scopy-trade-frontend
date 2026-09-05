// components/dashboard/earnings/WithdrawalHistoryTable.tsx
"use client";

import { useEffect, useState } from "react";
import {
  MdSearch,
  MdErrorOutline,
  MdChevronLeft,
  MdChevronRight,
} from "react-icons/md";
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

export default function WithdrawalHistoryTable() {
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [items, setItems] = useState<WithdrawalHistoryItem[]>([]);
  const [pages, setPages] = useState(1);
  // Starts true so the initial mount doesn't need a synchronous setState
  // inside the effect below; page changes reset it from the button
  // handlers instead (a normal event handler, not an effect).
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    withdrawalService
      .getWithdrawalHistory(page)
      .then((res) => {
        if (cancelled) return;
        setItems(res.withdrawals);
        setPages(res.pages || 1);
      })
      .catch((err) => {
        if (cancelled) return;
        setError(
          err instanceof Error ? err.message : "Failed to load withdrawal history",
        );
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [page]);

  const goToPage = (newPage: number) => {
    setLoading(true);
    setError(null);
    setPage(newPage);
  };

  // Search only filters what's already loaded on the current page — there's
  // no server-side search endpoint yet.
  const filteredItems = items.filter((tx) =>
    (tx.transactionId ?? "").toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="bg-surface-container-low rounded-xl overflow-hidden border border-white/5">
      {/* Header with filters */}
      <div className="p-4 sm:p-6 border-b border-white/5 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <h3 className="text-lg font-bold text-on-surface">All Withdrawals</h3>
        </div>

        {/* Search */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <MdSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-sm" />
            <input
              type="text"
              placeholder="Search by Transaction ID"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-surface-container-highest border-none rounded-lg text-on-surface py-2 pl-9 pr-3 text-sm focus:ring-1 focus:ring-primary/20 placeholder:text-on-surface-variant/40"
            />
          </div>
        </div>
      </div>

      {loading && (
        <div className="p-12 flex flex-col items-center gap-3 text-on-surface-variant">
          <div className="h-6 w-6 rounded-full border-2 border-secondary border-t-transparent animate-spin" />
          <p className="text-sm">Loading withdrawal history…</p>
        </div>
      )}

      {!loading && error && (
        <div className="p-12 flex flex-col items-center gap-3 text-center">
          <MdErrorOutline className="text-3xl text-rose-400" />
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
                  <th className="px-8 py-5">Destination</th>
                  <th className="px-8 py-5">Amount</th>
                  <th className="px-8 py-5 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filteredItems.map((tx, index) => {
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
                      <td className="px-8 py-6 font-mono text-xs text-on-surface-variant break-all max-w-[180px]">
                        {tx.destinationAddress ?? "—"}
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
            {filteredItems.map((tx) => {
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
                    <div className="text-right">
                      <div className="font-bold text-on-surface">
                        {formatAmount(tx.amount)} USDT
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Empty state */}
          {filteredItems.length === 0 && (
            <div className="p-12 text-center">
              <p className="text-on-surface-variant">No withdrawals found</p>
            </div>
          )}

          {/* Pagination */}
          {pages > 1 && (
            <div className="flex items-center justify-between px-4 sm:px-6 py-4 border-t border-white/5">
              <button
                onClick={() => goToPage(Math.max(1, page - 1))}
                disabled={page <= 1}
                className="flex items-center gap-1 text-xs font-bold text-on-surface-variant hover:text-on-surface disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <MdChevronLeft />
                Prev
              </button>
              <span className="text-xs text-on-surface-variant">
                Page {page} of {pages}
              </span>
              <button
                onClick={() => goToPage(Math.min(pages, page + 1))}
                disabled={page >= pages}
                className="flex items-center gap-1 text-xs font-bold text-on-surface-variant hover:text-on-surface disabled:opacity-30 disabled:cursor-not-allowed"
              >
                Next
                <MdChevronRight />
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
