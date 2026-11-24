"use client";
import { useCallback, useEffect, useState } from "react";
import { Copier, traderFlow } from "@/lib/api/trader-flow";

export default function CopiersPage() {
  const [copiers, setCopiers] = useState<Copier[]>([]), [loading, setLoading] = useState(true), [error, setError] = useState("");
  const load = useCallback(async () => {
    setError(""); setLoading(true);
    try { setCopiers((await traderFlow.copiers()).copiers); }
    catch (err) { setError(err instanceof Error ? err.message : "Could not load copiers."); }
    finally { setLoading(false); }
  }, []);
  useEffect(() => { void load(); }, [load]);
  return <div className="space-y-6"><header><h1 className="text-3xl font-bold">Your copiers</h1><p className="mt-2 text-sm text-slate-400">{copiers.length} subscribers · {copiers.filter(c => c.rankActive).length} rank-active copiers this month</p></header>{error && <p role="alert" className="text-red-300">{error} <button onClick={() => void load()} className="underline">Retry</button></p>}{loading ? <p>Loading copiers…</p> : !copiers.length ? <div className="rounded-xl border border-white/10 p-10 text-center text-slate-400">No subscribers yet. Copy traders can discover your profile and start copying your future trades.</div> : <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">{copiers.map(row => <article key={row._id} className="space-y-4 rounded-2xl border border-white/10 bg-surface-container-low p-5"><div><h2 className="text-lg font-bold">{row.copier ? `${row.copier.firstName} ${row.copier.lastName}` : "Unavailable copier"}</h2><p className="text-xs text-slate-500">{row.copier?.traderID}</p><span className={`mt-2 inline-block rounded-full px-3 py-1 text-xs ${row.rankActive ? "bg-secondary/10 text-secondary" : "bg-white/5 text-slate-400"}`}>{row.rankActive ? "Rank-active" : "Building monthly activity"}</span></div><dl className="grid grid-cols-2 gap-4 text-sm">{[["Exchange", row.exchange?.toUpperCase() || "Unavailable"], ["Trades this month", `${row.monthlyTrades} / 15`], ["Fees this month", `$${row.monthlyFees.toFixed(2)} / $10`], ["Connected balance ≥ $100", !row.balanceFresh ? "Awaiting verification" : row.balanceQualified ? "Met" : "Not met"], ["Total copies", row.copiedTrades], ["Realized PnL", `${row.realizedPnl.toFixed(2)} USDT`], ["Copying since", new Date(row.startedAt).toLocaleDateString()]].map(([label, value]) => <div key={label}><dt className="text-xs text-slate-500">{label}</dt><dd className="mt-1">{value}</dd></div>)}</dl></article>)}</div>}<p className="text-xs text-slate-500">Rank-active copiers meet all three monthly requirements. Their private exchange credentials and account balances remain private.</p></div>;
}
