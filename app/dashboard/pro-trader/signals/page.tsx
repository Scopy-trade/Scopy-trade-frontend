"use client";

import { useEffect, useState } from "react";
import { MdAdd, MdSettings } from "react-icons/md";
import { ActiveProTrade } from "@/lib";
import { tradeService } from "@/lib/api/trades";
import OpenTradeModal from "@/components/pro-trader/signalsPage/OpenTradeModal";
import TradesTable from "@/components/pro-trader/signalsPage/TradesTable";
import ExchangeSettingsModal from "@/components/copy-trader/exchange/ExchangeSettingsModal";

export default function TradesPage() {
  const [trades, setTrades] = useState<ActiveProTrade[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [openTrade, setOpenTrade] = useState(false);
  const [exchangeSettings, setExchangeSettings] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    let cancelled = false;
    void tradeService.getProTrades()
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
  }, [refreshKey]);

  const active = trades.filter((trade) => trade.status === "pending" || trade.status === "filled").length;
  const closed = trades.filter((trade) => trade.status === "closed").length;

  return (
    <>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
        <div><h2 className="text-4xl font-extrabold tracking-tight text-on-surface mb-2">Trades Dashboard</h2><p className="text-on-surface-variant max-w-xl">Open real positions on your exchange. Active positions are published automatically for copy traders.</p></div>
        <div className="flex gap-3"><button type="button" onClick={() => setExchangeSettings(true)} className="px-4 py-2.5 flex items-center gap-2 rounded-lg border border-white/10 text-slate-300"><MdSettings /> Exchanges</button><button type="button" onClick={() => setOpenTrade(true)} className="px-5 py-2.5 flex items-center gap-2 rounded-lg bg-secondary text-on-secondary font-semibold"><MdAdd size={20} /> Open trade</button></div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div className="p-5 rounded-xl bg-surface-container border border-white/5"><p className="text-xs text-slate-500 uppercase">Total trades</p><p className="text-3xl font-bold mt-2">{trades.length}</p></div>
        <div className="p-5 rounded-xl bg-surface-container border border-white/5"><p className="text-xs text-slate-500 uppercase">Active now</p><p className="text-3xl font-bold text-secondary mt-2">{active}</p></div>
        <div className="p-5 rounded-xl bg-surface-container border border-white/5"><p className="text-xs text-slate-500 uppercase">Closed</p><p className="text-3xl font-bold mt-2">{closed}</p></div>
      </div>

      <TradesTable trades={trades} loading={loading} error={error} />
      <OpenTradeModal isOpen={openTrade} onClose={() => setOpenTrade(false)} onTradeOpened={() => { setLoading(true); setError(null); setRefreshKey((value) => value + 1); }} />
      <ExchangeSettingsModal isOpen={exchangeSettings} onClose={() => setExchangeSettings(false)} />
    </>
  );
}
