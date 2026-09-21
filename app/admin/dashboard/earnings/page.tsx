"use client";

import { useCallback, useEffect, useState } from "react";
import { AdminEarning, adminTradeService } from "@/lib/api/admin";

type Category = "actual" | "prospective";

const TRADE_PAIRS = [
  "BTCUSDT", "ETHUSDT", "SOLUSDT", "XRPUSDT", "DOGEUSDT",
  "BNBUSDT", "LINKUSDT", "SUIUSDT", "AVAXUSDT", "ADAUSDT",
] as const;
const inputClass = "min-h-10 rounded-lg border border-white/10 bg-[#0b1326] px-3 text-xs text-slate-200 outline-none focus:border-[#4edea3]/60";

function personName(person: AdminEarning["userId"]): string {
  if (!person || typeof person === "string") return "Unknown copy trader";
  return [person.firstName, person.lastName].filter(Boolean).join(" ") || person.traderID || person.email || "Copy trader";
}

function proTraderName(earning: AdminEarning): string {
  const source = earning.sourceTradeId;
  if (!source || typeof source === "string" || !source.userId || typeof source.userId === "string") return "—";
  return [source.userId.firstName, source.userId.lastName].filter(Boolean).join(" ") || source.userId.traderID || "Pro trader";
}

function money(value: number | string): string {
  return `${Number(value || 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 6 })} USDT`;
}

export default function EarningsDashboardPage() {
  const [category, setCategory] = useState<Category>("actual");
  const [earnings, setEarnings] = useState<AdminEarning[]>([]);
  const [summary, setSummary] = useState({ actualAmount: 0, prospectiveAmount: 0, actualCount: 0, prospectiveCount: 0 });
  const [pagination, setPagination] = useState({ total: 0, pages: 1 });
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");
  const [pair, setPair] = useState("");
  const [direction, setDirection] = useState<"" | "buy" | "sell">("");
  const [feeStatus, setFeeStatus] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");

  useEffect(() => {
    const timeout = window.setTimeout(() => setSearch(searchInput.trim()), 350);
    return () => window.clearTimeout(timeout);
  }, [searchInput]);

  useEffect(() => setPage(1), [category, search, pair, direction, feeStatus, dateFrom, dateTo]);

  const load = useCallback(async () => {
    const response = await adminTradeService.getEarnings({
      category,
      page,
      limit: 20,
      search,
      pair,
      direction,
      feeStatus: category === "prospective" ? feeStatus : "",
      dateFrom,
      dateTo,
    });
    setEarnings(response.earnings);
    setSummary(response.summary);
    setPagination({ total: response.pagination.total, pages: Math.max(response.pagination.pages, 1) });
  }, [category, dateFrom, dateTo, direction, feeStatus, page, pair, search]);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);
    void load()
      .catch((reason) => { if (!cancelled) setError(reason instanceof Error ? reason.message : "Failed to load earnings."); })
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, [load]);

  const resetFilters = () => {
    setSearchInput(""); setSearch(""); setPair(""); setDirection("");
    setFeeStatus(""); setDateFrom(""); setDateTo("");
  };
  const hasFilters = Boolean(searchInput || pair || direction || feeStatus || dateFrom || dateTo);

  return (
    <div className="mx-auto max-w-[1500px] space-y-6 py-4">
      <header>
        <h1 className="text-3xl font-black tracking-tight text-[#dae2fd]">Platform Earnings</h1>
        <p className="mt-2 text-sm text-[#8f9098]">Track the platform fees earned from profitable copied trades and whether those fees have reached the platform wallet.</p>
      </header>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-[#4edea3]/15 bg-[#131b2e] p-5"><p className="text-[10px] font-bold uppercase tracking-widest text-[#8f9098]">Actual earnings</p><p className="mt-2 text-3xl font-black text-[#4edea3]">{money(summary.actualAmount)}</p><p className="mt-2 text-xs text-[#8f9098]">{summary.actualCount.toLocaleString()} collected fees</p></div>
        <div className="rounded-2xl border border-amber-300/15 bg-[#131b2e] p-5"><p className="text-[10px] font-bold uppercase tracking-widest text-[#8f9098]">Prospective earnings</p><p className="mt-2 text-3xl font-black text-amber-300">{money(summary.prospectiveAmount)}</p><p className="mt-2 text-xs text-[#8f9098]">{summary.prospectiveCount.toLocaleString()} fees awaiting collection</p></div>
        <div className="rounded-2xl border border-white/5 bg-[#131b2e] p-5"><p className="text-[10px] font-bold uppercase tracking-widest text-[#8f9098]">Total earned</p><p className="mt-2 text-3xl font-black text-[#dae2fd]">{money(summary.actualAmount + summary.prospectiveAmount)}</p><p className="mt-2 text-xs text-[#8f9098]">Actual plus prospective platform fees</p></div>
      </div>

      <section className="rounded-2xl border border-white/5 bg-[#131b2e] p-4">
        <div className="mb-4 flex gap-2 border-b border-white/5">
          {(["actual", "prospective"] as Category[]).map((item) => <button key={item} type="button" onClick={() => { setCategory(item); setFeeStatus(""); }} className={`border-b-2 px-4 py-3 text-sm font-bold capitalize transition-colors ${category === item ? "border-[#4edea3] text-[#4edea3]" : "border-transparent text-[#8f9098] hover:text-[#dae2fd]"}`}>{item} earnings</button>)}
        </div>
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-7">
          <label className="relative xl:col-span-2"><span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-base text-[#8f9098]">search</span><input className={`${inputClass} w-full pl-9`} value={searchInput} onChange={(event) => setSearchInput(event.target.value)} placeholder="Copy trader, pro trader or trade ID" /></label>
          <select aria-label="Trading pair" className={inputClass} value={pair} onChange={(event) => setPair(event.target.value)}><option value="">All pairs</option>{TRADE_PAIRS.map((item) => <option key={item} value={item}>{item.replace("USDT", "/USDT")}</option>)}</select>
          <select aria-label="Trade direction" className={inputClass} value={direction} onChange={(event) => setDirection(event.target.value as "" | "buy" | "sell")}><option value="">Buy & sell</option><option value="buy">Buy</option><option value="sell">Sell</option></select>
          {category === "prospective" ? <select aria-label="Collection status" className={inputClass} value={feeStatus} onChange={(event) => setFeeStatus(event.target.value)}><option value="">All collection states</option><option value="pending">Pending</option><option value="processing">Processing</option><option value="failed">Failed</option></select> : <div className="flex min-h-10 items-center rounded-lg border border-white/5 px-3 text-xs text-[#8f9098]">Collected fees only</div>}
          <input aria-label="From date" title="From date" type="date" className={inputClass} value={dateFrom} onChange={(event) => setDateFrom(event.target.value)} />
          <input aria-label="To date" title="To date" type="date" className={inputClass} value={dateTo} onChange={(event) => setDateTo(event.target.value)} />
        </div>
        <div className="mt-3 flex items-center justify-between"><p className="text-xs text-[#8f9098]">{pagination.total.toLocaleString()} matching records</p><button type="button" disabled={!hasFilters} onClick={resetFilters} className="text-xs font-bold text-[#8f9098] hover:text-[#dae2fd] disabled:cursor-not-allowed disabled:opacity-40">Clear filters</button></div>
      </section>

      <section className="overflow-hidden rounded-2xl border border-white/5 bg-[#131b2e]">
        {loading ? <div className="p-12 text-center text-[#8f9098]">Loading earnings…</div> : error ? <div className="p-12 text-center text-[#ffb2b9]">{error}</div> : !earnings.length ? <div className="p-12 text-center text-[#8f9098]">No {category} earnings match these filters.</div> : <div className="overflow-x-auto"><table className="w-full min-w-[1050px] text-left"><thead className="bg-[#171f33]/70 text-[10px] uppercase tracking-widest text-[#8f9098]"><tr><th className="p-4">Trade</th><th className="p-4">Copy trader</th><th className="p-4">Pro trader</th><th className="p-4">Pair / side</th><th className="p-4">Platform earning</th><th className="p-4">Collection status</th><th className="p-4">{category === "actual" ? "Collected" : "Earned"}</th><th className="p-4">Transaction</th></tr></thead><tbody>{earnings.map((earning) => <tr key={earning._id} className="border-t border-white/5 text-sm"><td className="p-4 font-mono text-xs text-[#dae2fd]">{earning.tradeId || `…${earning._id.slice(-8).toUpperCase()}`}</td><td className="p-4"><p className="font-bold text-[#dae2fd]">{personName(earning.userId)}</p>{typeof earning.userId === "object" && earning.userId.email && <p className="mt-1 text-xs text-[#8f9098]">{earning.userId.email}</p>}</td><td className="p-4 text-[#c5c6ce]">{proTraderName(earning)}</td><td className="p-4"><p className="font-bold text-[#dae2fd]">{earning.pair.replace("USDT", "/USDT")}</p><p className={`mt-1 text-xs font-bold uppercase ${earning.direction === "buy" ? "text-[#4edea3]" : "text-[#ffb2b9]"}`}>{earning.direction}</p></td><td className="p-4 font-mono font-bold text-[#4edea3]">{money(earning.platformFee)}</td><td className="p-4"><span className={`rounded-full px-2.5 py-1 text-[10px] font-bold uppercase ${earning.feeStatus === "collected" ? "bg-[#4edea3]/10 text-[#4edea3]" : earning.feeStatus === "failed" ? "bg-[#ffb2b9]/10 text-[#ffb2b9]" : "bg-amber-300/10 text-amber-300"}`}>{earning.feeStatus}</span></td><td className="p-4 text-xs text-[#8f9098]">{new Date((category === "actual" ? earning.settlementCompletedAt : earning.closedAt) || earning.closedAt || "").toLocaleString()}</td><td className="max-w-48 truncate p-4 font-mono text-xs text-[#8f9098]" title={earning.settlementTransactionId || undefined}>{earning.settlementTransactionId || "—"}</td></tr>)}</tbody></table></div>}
        {!loading && !error && pagination.pages > 1 && <div className="flex items-center justify-between border-t border-white/5 px-4 py-3"><p className="text-xs text-[#8f9098]">Page {page} of {pagination.pages}</p><div className="flex gap-2"><button className="rounded-lg border border-white/10 px-3 py-2 text-xs disabled:opacity-40" disabled={page === 1} onClick={() => setPage((value) => Math.max(1, value - 1))}>Previous</button><button className="rounded-lg border border-white/10 px-3 py-2 text-xs disabled:opacity-40" disabled={page === pagination.pages} onClick={() => setPage((value) => Math.min(pagination.pages, value + 1))}>Next</button></div></div>}
      </section>
    </div>
  );
}
