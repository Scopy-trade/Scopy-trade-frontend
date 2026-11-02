"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Rank, TraderProfile, traderFlow } from "@/lib/api/trader-flow";

export default function RankProgress({ full = false }: { full?: boolean }) {
  const [trader, setTrader] = useState<TraderProfile | null>(null), [ranks, setRanks] = useState<Rank[]>([]);
  const [error, setError] = useState("");
  const [refresh, setRefresh] = useState(0);
  useEffect(() => {
    let cancelled = false;
    void traderFlow.ranks().then(result => {
      if (!cancelled) { setError(""); setTrader(result.trader); setRanks(result.ranks); }
    }).catch(err => { if (!cancelled) setError(err instanceof Error ? err.message : "Could not load rank progress."); });
    return () => { cancelled = true; };
  }, [refresh]);
  if (error) return <p role="alert" className="mb-6 text-red-300">{error} <button onClick={() => setRefresh(value => value + 1)} className="underline">Retry</button></p>;
  if (!trader) return <p className="mb-6 text-sm text-slate-400">Loading rank progress…</p>;
  const next = trader.nextRank, metrics = trader.metrics;
  const requirements = next ? [
    { label: "Rank-active copiers", value: metrics.activeCopiers, target: next.copiers, display: `${metrics.activeCopiers} / ${next.copiers}`, met: metrics.activeCopiers >= next.copiers },
    { label: "Closed trades", value: metrics.closedTrades, target: next.trades, display: `${metrics.closedTrades} / ${next.trades}`, met: metrics.closedTrades >= next.trades },
    { label: "Win rate", value: metrics.winRate, target: next.winRate, display: `${metrics.winRate.toFixed(1)}% / ${next.winRate}%`, met: metrics.winRate >= next.winRate },
    { label: "Maximum drawdown", value: 0, target: 1, display: `${metrics.maxDrawdown === null ? "Unavailable" : `${metrics.maxDrawdown.toFixed(1)}%`} / <${next.maxDrawdown}%`, met: metrics.maxDrawdown !== null && metrics.maxDrawdown < next.maxDrawdown },
  ] : [];
  return <section className="mb-8 space-y-5">
    <div className="rounded-2xl border border-secondary/20 bg-surface-container-low p-6"><div className="flex flex-wrap items-start justify-between gap-4"><div><p className="text-xs font-bold uppercase tracking-widest text-secondary">Your rank</p><h2 className="mt-2 text-3xl font-bold">Level {trader.rank.level} · {trader.rank.name}</h2><p className="mt-2 text-sm text-slate-400">{trader.subscribers} subscribers · {metrics.activeCopiers} rank-active copiers</p>{trader.highestLevel > trader.rank.level && <p className="mt-2 text-sm text-amber-300">Highest earned: level {trader.highestLevel}. Restore 50% of that level’s copier requirement to regain its badge.</p>}</div>{!full && <Link className="rounded-lg border border-white/10 px-4 py-2 text-sm text-secondary" href="/dashboard/pro-trader/ranks">View ranks & benefits →</Link>}</div>
      {next ? <><div className="mt-6 flex flex-wrap justify-between gap-2 border-t border-white/10 pt-5"><h3 className="font-semibold">Next milestone: {next.name}</h3><span className="text-sm font-bold text-secondary">${next.bonus.toLocaleString()} one-time bonus</span></div><div className="mt-4 grid gap-4 sm:grid-cols-2">{requirements.map(item => <div key={item.label}><div className="mb-2 flex justify-between gap-2 text-xs"><span className="text-slate-400">{item.label}</span><span className={item.met ? "text-secondary" : "text-slate-200"}>{item.display} {item.met ? "✓" : ""}</span></div><div role="progressbar" aria-label={item.label} aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.min(100, item.label === "Maximum drawdown" ? (item.met ? 100 : 0) : item.value / item.target * 100)} className="h-1.5 overflow-hidden rounded-full bg-white/5"><div className="h-full rounded-full bg-secondary" style={{ width: `${Math.min(100, item.label === "Maximum drawdown" ? (item.met ? 100 : 0) : item.value / item.target * 100)}%` }} /></div></div>)}</div></> : <p className="mt-5 text-secondary">You’ve reached Legend, the highest available rank.</p>}
    </div>
    {full && <><div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">{ranks.map(rank => {
      const award = trader.awards.find(a => a.level === rank.level);
      return <article key={rank.level} className={`rounded-2xl border bg-surface-container-low p-6 ${rank.level === trader.rank.level ? "border-secondary" : "border-white/10"}`}><p className="text-xs uppercase tracking-widest text-slate-500">Level {rank.level}{rank.level === trader.rank.level ? " · Current" : ""}</p><h3 className="mt-2 text-2xl font-bold">{rank.name}</h3><p className="mt-3 text-xl font-bold text-secondary">{rank.bonus ? `$${rank.bonus.toLocaleString()} bonus` : "Your starting rank"}</p><p className="mt-4 text-sm">{rank.copiers.toLocaleString()} active copiers</p>{rank.level > 0 && <p className="mt-2 text-xs leading-relaxed text-slate-400">{rank.winRate}% win rate · {rank.trades}+ closed trades · &lt;{rank.maxDrawdown}% drawdown</p>}<p className="mt-4 border-t border-white/5 pt-3 text-xs text-slate-400">10% share of profitable copied trades</p>{award && <p className="mt-3 text-xs text-secondary">{award.status === "credited" ? `Bonus credited (${award.mode})` : "Bonus pending platform earnings verification"}</p>}</article>;
    })}</div><div className="rounded-2xl border border-white/10 p-6 text-sm leading-relaxed text-slate-400"><h3 className="mb-3 font-bold text-slate-100">Active copier rules & benefits</h3><p>All three are required: at least $100 connected balance, at least 15 filled or closed copied trades in the current month, and at least $10 in total generated fees. Monthly activity is measured per pro trader using UTC calendar months.</p><p className="mt-3">Bonuses are paid once per level after platform earnings verification. Maintain at least 50% of a level’s active copier count to keep its badge. Previously earned bonuses are not awarded again when a badge is restored.</p><p className="mt-3">Profit fees total 20%: 10% to the trader and 10% to the platform. Verified bonuses enter the existing earnings balance and follow the existing withdrawal process.</p><p className="mt-3">Win rate and drawdown use closed platform trades across your history. Drawdown is calculated from a normalized closed-trade equity curve using recorded sizing balances. Missing PnL or sizing evidence leaves drawdown unavailable and prevents promotion. Connected balances must have been verified within 24 hours.</p></div></>}
  </section>;
}
