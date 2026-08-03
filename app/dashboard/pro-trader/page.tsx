"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { MdArrowForward, MdPendingActions, MdShowChart } from "react-icons/md";
import { ActiveProTrade } from "@/lib";
import { tradeService } from "@/lib/api/trades";
import TradesTable from "@/components/pro-trader/signalsPage/TradesTable";
import TradeDetailsModal from "@/components/pro-trader/signalsPage/TradeDetailsModal";
import { useTradeUpdates } from "@/lib/hooks/useTradeUpdates";

export default function ProTraderDashboard() {
  const [trades, setTrades] = useState<ActiveProTrade[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedTrade, setSelectedTrade] = useState<ActiveProTrade | null>(null);

  const fetchTrades = useCallback(() => tradeService.getProTrades(), []);

  useEffect(() => {
    let cancelled = false;
    void fetchTrades()
      .then((response) => {
        if (!cancelled) setTrades(response.trades);
      })
      .catch((err) => {
        if (!cancelled) setError(err instanceof Error ? err.message : "Failed to load trades");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [fetchTrades]);

  const applyLiveUpdate = useCallback((update: Partial<ActiveProTrade> & { _id: string }) => {
    setTrades((current) =>
      current.map((trade) => trade._id === update._id ? { ...trade, ...update } : trade),
    );
    setSelectedTrade((current) =>
      current?._id === update._id ? { ...current, ...update } : current,
    );
  }, []);

  useTradeUpdates({
    tradeIds: trades.map((trade) => trade._id),
    onUpdate: applyLiveUpdate,
    onReconnect: () => {
      void fetchTrades()
        .then((response) => setTrades(response.trades))
        .catch((err) => setError(err instanceof Error ? err.message : "Failed to refresh trades"));
    },
  });

  const activeTrades = trades.filter(
    (trade) => trade.status === "pending" || trade.status === "filled",
  );
  const pending = activeTrades.filter((trade) => trade.status === "pending").length;
  const filled = activeTrades.filter((trade) => trade.status === "filled").length;

  function applyUpdate(updated: ActiveProTrade) {
    setTrades((current) =>
      current.map((trade) => (trade._id === updated._id ? updated : trade)),
    );
    setSelectedTrade(updated);
  }

  return (
    <>
      <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-secondary">Trading overview</p>
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-100">Pro Trader Dashboard</h1>
          <p className="mt-2 text-slate-400">Monitor open positions and adjust live trade parameters.</p>
        </div>
        <Link href="/dashboard/pro-trader/signals" className="flex items-center gap-2 self-start rounded-lg bg-secondary px-5 py-2.5 text-sm font-bold text-on-secondary md:self-auto">Manage all trades <MdArrowForward /></Link>
      </div>

      <div className="mb-8 grid gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-white/5 bg-surface-container p-5"><MdShowChart className="mb-3 text-2xl text-secondary" /><p className="text-xs uppercase text-slate-500">Active trades</p><p className="mt-1 text-3xl font-bold">{activeTrades.length}</p></div>
        <div className="rounded-xl border border-white/5 bg-surface-container p-5"><MdPendingActions className="mb-3 text-2xl text-amber-400" /><p className="text-xs uppercase text-slate-500">Waiting for entry</p><p className="mt-1 text-3xl font-bold">{pending}</p></div>
        <div className="rounded-xl border border-white/5 bg-surface-container p-5"><MdShowChart className="mb-3 text-2xl text-primary" /><p className="text-xs uppercase text-slate-500">Filled positions</p><p className="mt-1 text-3xl font-bold">{filled}</p></div>
      </div>

      <section>
        <div className="mb-4"><h2 className="text-xl font-bold text-slate-100">Active Trades</h2><p className="mt-1 text-sm text-slate-500">Select a trade to view its exchange details or edit its price levels.</p></div>
        <TradesTable trades={activeTrades} loading={loading} error={error} onSelect={setSelectedTrade} />
      </section>

      <TradeDetailsModal trade={selectedTrade} onClose={() => setSelectedTrade(null)} onUpdated={applyUpdate} />
    </>
  );
}
