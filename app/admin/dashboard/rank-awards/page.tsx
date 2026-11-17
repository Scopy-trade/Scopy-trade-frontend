"use client";
import { useCallback, useEffect, useState } from "react";
import { adminApi } from "@/lib/api/client";
type Award = { _id: string; userId: { firstName: string; lastName: string; traderID: string } | null; level: number; bonus: number; qualifiedMetrics: { activeCopiers: number; closedTrades: number; winRate: number; maxDrawdown: number }; createdAt: string };

export default function RankAwardsPage() {
  const [awards, setAwards] = useState<Award[]>([]), [error, setError] = useState(""), [notice, setNotice] = useState("");
  const [loading, setLoading] = useState(true), [busy, setBusy] = useState("");
  const load = useCallback(async () => {
    setError("");
    try { setAwards((await adminApi.get<{ awards: Award[] }>("/dashboard/pro/rank-awards")).awards); }
    catch (err) { setError(err instanceof Error ? err.message : "Could not load rank awards."); }
    finally { setLoading(false); }
  }, []);
  useEffect(() => { void load(); }, [load]);
  async function verify(award: Award) {
    if (!window.confirm(`Confirm that platform earnings have been verified for this level ${award.level} award, and credit the $${award.bonus} bonus to the trader's configured payout balance?`)) return;
    setBusy(award._id); setError("");
    try { const result = await adminApi.post<{ message: string }>(`/dashboard/pro/rank-awards/${award._id}/verify`, { platformEarningsVerified: true }); setNotice(result.message); await load(); }
    catch (err) { setError(err instanceof Error ? err.message : "Could not verify bonus."); }
    finally { setBusy(""); }
  }
  return <div className="space-y-6"><header><h1 className="text-3xl font-bold">Rank bonus verification</h1><p className="mt-2 text-sm text-slate-400">Review qualification evidence and verify platform earnings before crediting each one-time bonus.</p></header>{error && <p role="alert" className="text-red-300">{error} <button className="underline" onClick={() => void load()}>Retry</button></p>}{notice && <p role="status" className="text-green-300">{notice}</p>}{loading ? <p>Loading…</p> : !awards.length ? <p className="text-slate-400">No rank bonuses awaiting verification.</p> : <div className="grid gap-4 md:grid-cols-2">{awards.map(award => <article key={award._id} className="rounded-xl border border-white/10 bg-white/5 p-5"><h2 className="text-lg font-bold">{award.userId?.firstName} {award.userId?.lastName}</h2><p className="text-xs text-slate-400">{award.userId?.traderID}</p><p className="mt-4 text-xl">Level {award.level} · ${award.bonus.toLocaleString()}</p><p className="mt-3 text-sm text-slate-400">At qualification: {award.qualifiedMetrics.activeCopiers} active copiers · {award.qualifiedMetrics.closedTrades} closed trades · {award.qualifiedMetrics.winRate.toFixed(1)}% win rate · {award.qualifiedMetrics.maxDrawdown.toFixed(1)}% drawdown</p><p className="mt-2 text-xs text-slate-500">Qualified {new Date(award.createdAt).toLocaleString()}</p><button disabled={!!busy} onClick={() => void verify(award)} className="mt-5 rounded-lg bg-green-300 px-4 py-3 text-sm font-bold text-slate-950 disabled:opacity-40">{busy === award._id ? "Crediting…" : "Verify earnings & credit bonus"}</button></article>)}</div>}</div>;
}
