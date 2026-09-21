"use client";

import { ReactNode, useCallback, useEffect, useMemo, useState } from "react";
import { ActiveProTrade, TradeOwner } from "@/lib";
import { tradeService } from "@/lib/api/trades";
import { adminTradeService } from "@/lib/api/admin";
import { useTradeUpdates } from "@/lib/hooks/useTradeUpdates";
import TradeDetailsModal from "@/components/pro-trader/signalsPage/TradeDetailsModal";

type Scope = "pro" | "copy" | "admin";
type Mode = "active" | "history";

const TRADE_PAIRS = [
  "BTCUSDT", "ETHUSDT", "SOLUSDT", "XRPUSDT", "DOGEUSDT",
  "BNBUSDT", "LINKUSDT", "SUIUSDT", "AVAXUSDT", "ADAUSDT",
] as const;

const controlClass = "min-h-10 rounded-lg border border-white/10 bg-[#0b1326] px-3 text-xs text-slate-200 outline-none transition-colors focus:border-secondary/60";

function ownerName(owner: TradeOwner | string | undefined): string {
  if (!owner || typeof owner === "string") return "—";
  return [owner.firstName, owner.lastName].filter(Boolean).join(" ") || owner.traderID || "Trader";
}

function sourceOwner(trade: ActiveProTrade): TradeOwner | string | undefined {
  return typeof trade.sourceTradeId === "object" && trade.sourceTradeId
    ? trade.sourceTradeId.userId
    : undefined;
}

function exchangeName(trade: ActiveProTrade): string {
  return typeof trade.exchangeConnectionId === "object"
    ? trade.exchangeConnectionId.label || trade.exchangeConnectionId.exchange
    : "Exchange";
}

export default function TradeListScreen({
  scope,
  mode,
  headerActions,
  refreshKey = 0,
}: {
  scope: Scope;
  mode: Mode;
  headerActions?: ReactNode;
  refreshKey?: number;
}) {
  const [trades, setTrades] = useState<ActiveProTrade[]>([]);
  const [selected, setSelected] = useState<ActiveProTrade | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({ total: 0, pages: 1 });
  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");
  const [pair, setPair] = useState("");
  const [status, setStatus] = useState("");
  const [direction, setDirection] = useState<"" | "buy" | "sell">("");
  const [tradeOrigin, setTradeOrigin] = useState<"" | "pro" | "copy">("");
  const [result, setResult] = useState<"" | "profit" | "loss" | "breakeven">("");

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      setSearch(searchInput.trim());
      setPage(1);
    }, 350);
    return () => window.clearTimeout(timeout);
  }, [searchInput]);

  const load = useCallback(async () => {
    if (scope === "admin") {
      const response = await adminTradeService.getTrades({
        page,
        limit: 20,
        status: status || mode,
        pair,
        direction,
        tradeOrigin,
        result: mode === "history" ? result : "",
        search,
      });
      setTrades(response.trades);
      setPagination({ total: response.pagination.total, pages: Math.max(response.pagination.pages, 1) });
      return response;
    }

    const response = scope === "pro"
      ? await tradeService.getProTrades(page, mode)
      : await tradeService.getUserTrades(mode, page);
    setTrades(response.trades);
    return response;
  }, [direction, mode, page, pair, result, scope, search, status, tradeOrigin]);

  useEffect(() => {
    let cancelled = false;
    const timeout = window.setTimeout(() => {
      setLoading(true);
      setError(null);
      void load()
        .catch((reason) => {
          if (!cancelled) setError(reason instanceof Error ? reason.message : "Failed to load trades.");
        })
        .finally(() => {
          if (!cancelled) setLoading(false);
        });
    }, 0);
    return () => {
      cancelled = true;
      window.clearTimeout(timeout);
    };
  }, [load, refreshKey]);

  useEffect(() => {
    if (mode !== "active") return;
    const interval = window.setInterval(() => {
      void load()
        .then((response) => {
          setSelected((current) => current
            ? response.trades.find((trade) => trade._id === current._id) ?? null
            : null);
        })
        .catch(() => undefined);
    }, 15_000);
    return () => window.clearInterval(interval);
  }, [load, mode]);

  const applyUpdate = useCallback((update: Partial<ActiveProTrade> & { _id: string }) => {
    setTrades((current) => {
      if (mode === "active" && update.status && !["pending", "filled"].includes(update.status)) {
        return current.filter((trade) => trade._id !== update._id);
      }
      return current.map((trade) => trade._id === update._id ? { ...trade, ...update } : trade);
    });
    setSelected((current) => current?._id === update._id ? { ...current, ...update } : current);
  }, [mode]);

  useTradeUpdates({
    tradeIds: trades.map((trade) => trade._id),
    onUpdate: applyUpdate,
    onReconnect: () => { void load(); },
    enabled: mode === "active",
  });

  const totals = useMemo(() => ({
    count: scope === "admin" ? pagination.total : trades.length,
    profit: trades.reduce((sum, trade) => sum + Number(trade.realizedPnl || 0), 0),
    copies: trades.reduce((sum, trade) => sum + (trade.copyStats?.total || 0), 0),
  }), [pagination.total, scope, trades]);

  const title = mode === "active" ? "Active Trades" : "Trade History";
  const description = scope === "admin"
    ? mode === "active" ? "Monitor every open pro and copied position." : "Audit completed and unsuccessful positions across the platform."
    : scope === "pro"
      ? mode === "active" ? "Review open positions and update TP or SL across every copied position." : "Review outcomes and the proportionate activity generated by each trade."
      : mode === "active" ? "Monitor the live positions you copied from pro traders." : "Review your completed copied trades and profit settlements.";

  const resetFilters = () => {
    setPage(1);
    setSearchInput("");
    setSearch("");
    setPair("");
    setStatus("");
    setDirection("");
    setTradeOrigin("");
    setResult("");
  };
  const hasFilters = Boolean(searchInput || pair || status || direction || tradeOrigin || result);

  return (
    <div className="mx-auto w-full max-w-[1500px] space-y-6 px-2 py-4 md:px-6">
      <header className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-100">{title}</h1>
          <p className="mt-2 max-w-3xl text-sm text-slate-400">{description}</p>
        </div>
        {headerActions}
      </header>

      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-white/5 bg-surface-container-low p-5"><p className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Matching trades</p><p className="mt-2 text-3xl font-bold">{totals.count}</p></div>
        <div className="rounded-xl border border-white/5 bg-surface-container-low p-5"><p className="text-[10px] font-bold uppercase tracking-widest text-slate-500">{mode === "active" ? "Live positions" : "Page net realized P&L"}</p><p className={`mt-2 text-3xl font-bold ${mode === "history" && totals.profit < 0 ? "text-tertiary" : "text-secondary"}`}>{mode === "active" ? totals.count : `${totals.profit.toFixed(2)} USDT`}</p></div>
        <div className="rounded-xl border border-white/5 bg-surface-container-low p-5"><p className="text-[10px] font-bold uppercase tracking-widest text-slate-500">{scope === "copy" ? "Winning trades" : "Copy executions on page"}</p><p className="mt-2 text-3xl font-bold">{scope === "copy" ? trades.filter((trade) => trade.tradeResult === "profit").length : totals.copies}</p></div>
      </div>

      {scope === "admin" && (
        <section aria-label="Trade filters" className="rounded-xl border border-white/5 bg-surface-container-low p-4">
          <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-7">
            <label className="relative xl:col-span-2">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-base text-slate-500">search</span>
              <input className={`${controlClass} w-full pl-9`} value={searchInput} onChange={(event) => setSearchInput(event.target.value)} placeholder="Owner, trader ID or trade ID" />
            </label>
            <select aria-label="Trading pair" className={controlClass} value={pair} onChange={(event) => { setPair(event.target.value); setPage(1); }}><option value="">All pairs</option>{TRADE_PAIRS.map((item) => <option key={item} value={item}>{item.replace("USDT", "/USDT")}</option>)}</select>
            <select aria-label="Trade status" className={controlClass} value={status} onChange={(event) => { setStatus(event.target.value); setPage(1); }}><option value="">All {mode} statuses</option>{(mode === "active" ? ["pending", "filled"] : ["closed", "cancelled", "failed"]).map((item) => <option key={item} value={item}>{item[0].toUpperCase() + item.slice(1)}</option>)}</select>
            <select aria-label="Trade direction" className={controlClass} value={direction} onChange={(event) => { setDirection(event.target.value as "" | "buy" | "sell"); setPage(1); }}><option value="">Buy & sell</option><option value="buy">Buy</option><option value="sell">Sell</option></select>
            <select aria-label="Trade type" className={controlClass} value={tradeOrigin} onChange={(event) => { setTradeOrigin(event.target.value as "" | "pro" | "copy"); setPage(1); }}><option value="">All trade types</option><option value="pro">Pro trader trade</option><option value="copy">Copied trade</option></select>
            {mode === "history" ? <select aria-label="Trade result" className={controlClass} value={result} onChange={(event) => { setResult(event.target.value as "" | "profit" | "loss" | "breakeven"); setPage(1); }}><option value="">All results</option><option value="profit">Profit</option><option value="loss">Loss</option><option value="breakeven">Breakeven</option></select> : <button type="button" disabled={!hasFilters} onClick={resetFilters} className="min-h-10 rounded-lg border border-white/10 px-3 text-xs font-bold text-slate-400 transition-colors hover:text-slate-100 disabled:cursor-not-allowed disabled:opacity-40">Clear filters</button>}
          </div>
          {mode === "history" && <div className="mt-3 flex justify-end"><button type="button" disabled={!hasFilters} onClick={resetFilters} className="text-xs font-bold text-slate-400 transition-colors hover:text-slate-100 disabled:cursor-not-allowed disabled:opacity-40">Clear filters</button></div>}
        </section>
      )}

      <section className="overflow-hidden rounded-xl border border-white/5 bg-surface-container-low">
        {loading ? <div className="p-12 text-center text-slate-400">Loading trades…</div>
          : error ? <div className="p-12 text-center text-tertiary">{error}</div>
          : !trades.length ? <div className="p-12 text-center text-slate-400">No trades match these filters.</div>
          : <div className="overflow-x-auto">
              <table className="w-full min-w-[1080px] text-left">
                <thead className="bg-surface-container-high text-[10px] uppercase tracking-widest text-slate-500"><tr>
                  <th className="p-4">Pair / owner</th><th className="p-4">Trade ID</th><th className="p-4">Type</th><th className="p-4">Side</th><th className="p-4">Entry / exit</th>{mode === "active" && <th className="p-4">Market price</th>}<th className="p-4">TP / SL</th><th className="p-4">{mode === "active" ? "Status" : "Result / P&L"}</th>{scope !== "copy" && <th className="p-4">Copied</th>}<th className="p-4">{mode === "active" ? "Opened" : "Closed"}</th>
                </tr></thead>
                <tbody>{trades.map((trade) => (
                  <tr key={trade._id} tabIndex={0} onClick={() => setSelected(trade)} onKeyDown={(event) => { if (event.key === "Enter" || event.key === " ") { event.preventDefault(); setSelected(trade); } }} className="cursor-pointer border-t border-white/5 text-sm transition-colors hover:bg-white/5 focus:bg-white/5 focus:outline-none">
                    <td className="p-4"><p className="font-bold text-slate-100">{trade.pair.replace("USDT", "/USDT")}</p><p className="mt-1 text-xs text-slate-500">{scope === "admin" ? ownerName(trade.userId) : trade.tradeOrigin === "copy" ? `From ${ownerName(sourceOwner(trade))}` : exchangeName(trade)}</p></td>
                    <td className="p-4 font-mono text-xs text-slate-400">{trade.tradeId || `…${trade._id.slice(-8).toUpperCase()}`}</td>
                    <td className="p-4"><span className="rounded bg-white/5 px-2 py-1 text-[10px] font-bold uppercase text-slate-300">{trade.tradeOrigin === "pro" ? "Pro trade" : "Copied"}</span></td>
                    <td className={`p-4 font-bold uppercase ${trade.direction === "buy" ? "text-secondary" : "text-tertiary"}`}>{trade.direction}</td>
                    <td className="p-4 font-mono text-xs">{trade.entryFillPrice || trade.entryPrice}{mode === "history" && <> <span className="text-slate-600">→</span> {trade.exitPrice || "—"}</>}</td>
                    {mode === "active" && <td className="p-4 font-mono text-xs text-slate-100">{trade.currentMarketPrice || "—"}</td>}
                    <td className="p-4 font-mono text-xs"><span className="text-secondary">{trade.tp}</span><span className="text-slate-600"> / </span><span className="text-tertiary">{trade.sl}</span></td>
                    <td className="p-4">{mode === "active" ? <span className="text-xs font-bold uppercase">{trade.status}</span> : <><p className={`text-xs font-bold uppercase ${trade.tradeResult === "profit" ? "text-secondary" : trade.tradeResult === "loss" ? "text-tertiary" : "text-slate-400"}`}>{trade.tradeResult || trade.status}</p><p className="mt-1 font-mono text-xs">{trade.realizedPnl ?? "—"} USDT</p></>}</td>
                    {scope !== "copy" && <td className="p-4"><p className="font-bold">{trade.copyStats?.total ?? 0}</p><p className="text-[10px] text-slate-500">{trade.copyStats?.active ?? 0} active</p></td>}
                    <td className="p-4 text-xs text-slate-400">{new Date((mode === "history" ? trade.closedAt : trade.createdAt) || trade.createdAt).toLocaleString()}</td>
                  </tr>
                ))}</tbody>
              </table>
            </div>}
        {scope === "admin" && !loading && !error && pagination.pages > 1 && <div className="flex items-center justify-between border-t border-white/5 px-4 py-3"><p className="text-xs text-slate-500">Page {page} of {pagination.pages}</p><div className="flex gap-2"><button className="rounded-lg border border-white/10 px-3 py-2 text-xs disabled:opacity-40" disabled={page === 1} onClick={() => setPage((value) => Math.max(1, value - 1))}>Previous</button><button className="rounded-lg border border-white/10 px-3 py-2 text-xs disabled:opacity-40" disabled={page === pagination.pages} onClick={() => setPage((value) => Math.min(pagination.pages, value + 1))}>Next</button></div></div>}
      </section>

      <TradeDetailsModal trade={selected} onClose={() => setSelected(null)} canEdit={scope === "pro" && mode === "active"} onUpdated={(updated) => { setTrades((current) => current.map((trade) => trade._id === updated._id ? updated : trade)); setSelected(updated); }} />
    </div>
  );
}
