"use client";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { Subscription, traderFlow } from "@/lib/api/trader-flow";

export default function CopyingPage() {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [loading, setLoading] = useState(true), [busy, setBusy] = useState("");
  const [error, setError] = useState(""), [notice, setNotice] = useState("");
  const load = useCallback(async () => {
    setLoading(true); setError("");
    try { setSubscriptions((await traderFlow.subscriptions()).subscriptions); }
    catch (err) { setError(err instanceof Error ? err.message : "Failed to load subscriptions."); }
    finally { setLoading(false); }
  }, []);
  useEffect(() => { void load(); }, [load]);
  async function stop(subscription: Subscription) {
    const pro = subscription.proTraderId;
    if (!pro || !window.confirm(`Stop copying ${pro.firstName} ${pro.lastName}? Future trades will no longer be copied. Existing positions continue to be managed.`)) return;
    setBusy(subscription._id); setError("");
    try { const result = await traderFlow.stop(pro._id); setNotice(result.message); await load(); }
    catch (err) { setError(err instanceof Error ? err.message : "Could not stop copying."); }
    finally { setBusy(""); }
  }
  return <div className="mx-auto w-full max-w-6xl space-y-6 p-4 md:p-8"><header><h1 className="text-3xl font-bold text-slate-100">Traders I’m copying</h1><p className="mt-2 text-sm text-slate-400">Manage your automatic copying subscriptions and allocations.</p></header>
    {error && <p role="alert" className="text-red-300">{error} <button className="underline" onClick={() => void load()}>Retry</button></p>}{notice && <p role="status" className="rounded-xl bg-secondary/10 p-4 text-secondary">{notice}</p>}
    {loading ? <p className="text-slate-400">Loading subscriptions…</p> : !subscriptions.length ? <div className="rounded-2xl border border-white/10 p-10 text-center"><p className="text-lg">You’re not copying any traders yet.</p><Link className="mt-4 inline-block text-secondary underline" href="/dashboard/copy-trader">Discover pro traders</Link></div> : <div className="grid gap-4 md:grid-cols-2">{subscriptions.map(subscription => <article key={subscription._id} className="space-y-5 rounded-2xl border border-white/10 bg-surface-container-low p-6"><div><h2 className="text-xl font-bold">{subscription.proTraderId ? `${subscription.proTraderId.firstName} ${subscription.proTraderId.lastName}` : "Unavailable trader"}</h2><p className="text-sm text-slate-500">{subscription.proTraderId?.traderID}</p></div><dl className="grid grid-cols-2 gap-4 text-sm"><div><dt className="text-slate-400">Allocation</dt><dd className="mt-1 text-lg">{subscription.allocation.toFixed(2)} USDT</dd></div><div><dt className="text-slate-400">Exchange</dt><dd className="mt-1 uppercase">{subscription.exchangeConnectionId?.exchange || "Unavailable"} {subscription.exchangeConnectionId?.label}</dd></div><div><dt className="text-slate-400">Copying since</dt><dd>{new Date(subscription.startedAt).toLocaleDateString()}</dd></div><div><dt className="text-slate-400">Risk per trade</dt><dd>{(subscription.allocation * 0.02).toFixed(2)} USDT (2%)</dd></div></dl>{!subscription.exchangeConnectionId?.isActive && <p className="text-sm text-amber-300">Exchange disconnected. Reconnect it in Exchange Settings to resume automatic orders.</p>}{subscription.proTraderId && !["active", "live"].includes(subscription.proTraderId.status || "") && <p className="text-sm text-amber-300">This trader is currently unavailable for automatic copying.</p>}<button onClick={() => void stop(subscription)} disabled={!!busy || !subscription.proTraderId} className="w-full rounded-xl border border-red-400/30 px-4 py-3 text-sm font-bold text-red-300 hover:bg-red-500/10 disabled:opacity-50">{busy === subscription._id ? "Stopping…" : "Stop copying"}</button></article>)}</div>}
    <p className="text-xs text-slate-500">Stopping copying prevents future orders. Existing trades stay in Active Trades and continue to receive the pro trader’s updates and closures.</p>
  </div>;
}
