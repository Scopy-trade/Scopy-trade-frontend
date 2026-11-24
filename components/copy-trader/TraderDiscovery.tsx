"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { MdClose, MdPeople, MdArrowForward } from "react-icons/md";
import { traderFlow, TraderProfile } from "@/lib/api/trader-flow";
import { exchangeService } from "@/lib/api/exchanges";
import { ConnectionSummary } from "@/lib";
import ProfitShareCard from "./ProfitShareCard";

const action = "rounded-xl bg-secondary px-5 py-3 text-sm font-bold text-on-secondary disabled:opacity-40 disabled:cursor-not-allowed hover:brightness-110";
const input = "w-full rounded-xl border border-white/10 bg-surface-container-highest p-3 text-slate-100 focus:outline-none focus:ring-2 focus:ring-secondary";
const errorMessage = (error: unknown) => error instanceof Error ? error.message : "Unable to complete this request.";
const percent = (n: number | null) => n === null ? "Unavailable" : `${n.toFixed(1)}%`;
function Avatar({ trader }: { trader: TraderProfile }) {
  return <div className="relative flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-secondary/10 text-xl font-bold text-secondary">{trader.profilePhoto?.url ? <Image src={trader.profilePhoto.url} alt="" fill unoptimized className="object-cover" /> : `${trader.firstName[0] || ""}${trader.lastName[0] || ""}`}</div>;
}
function Stats({ trader }: { trader: TraderProfile }) {
  return <dl className="grid grid-cols-2 gap-4 text-sm">{[["Win rate", percent(trader.metrics.winRate)], ["Closed trades", trader.metrics.closedTrades], ["Max. drawdown", percent(trader.metrics.maxDrawdown)], ["Subscribers", trader.subscribers]].map(([label, value]) => <div key={label}><dt className="text-xs text-slate-400">{label}</dt><dd className="mt-1 text-lg font-semibold text-slate-100">{value}</dd></div>)}</dl>;
}
export default function TraderDiscovery() {
  const [traders, setTraders] = useState<TraderProfile[]>([]);
  const [loading, setLoading] = useState(true), [error, setError] = useState("");
  const [page, setPage] = useState(1), [pages, setPages] = useState(1);
  const [selected, setSelected] = useState<TraderProfile | null>(null);
  const [connections, setConnections] = useState<ConnectionSummary[]>([]);
  const [connection, setConnection] = useState("");
  const [busy, setBusy] = useState(false), [connectionsLoading, setConnectionsLoading] = useState(false);
  const [dialogError, setDialogError] = useState(""), [notice, setNotice] = useState("");
  const dialog = useRef<HTMLDialogElement>(null), selectionVersion = useRef(0);
  const load = useCallback(async () => {
    setLoading(true); setError("");
    try { const result = await traderFlow.discover(page); setTraders(result.traders); setPages(result.pages); }
    catch (err) { setError(errorMessage(err)); }
    finally { setLoading(false); }
  }, [page]);
  useEffect(() => { void load(); }, [load]);
  useEffect(() => { if (selected && !dialog.current?.open) dialog.current?.showModal(); }, [selected]);
  async function open(trader: TraderProfile) {
    const version = ++selectionVersion.current;
    setSelected(trader); setDialogError(""); setConnections([]); setConnection(""); setConnectionsLoading(true);
    const results = await Promise.allSettled([traderFlow.profile(trader._id), exchangeService.getUserExchangeConnections()]);
    if (version !== selectionVersion.current) return;
    if (results[0].status === "fulfilled") setSelected(results[0].value.trader);
    else setDialogError(errorMessage(results[0].reason));
    if (results[1].status === "fulfilled") {
      const available = results[1].value.connections.filter(account => account.isActive && ["bybit", "okx", "bitget"].includes(account.exchange));
      setConnections(available); setConnection(available[0]?._id || "");
    }
    else setDialogError(errorMessage(results[1].reason));
    setConnectionsLoading(false);
  }
  function close() { if (busy) return; ++selectionVersion.current; dialog.current?.close(); setSelected(null); }
  async function copy(event: React.FormEvent) {
    event.preventDefault(); if (!selected) return;
    setBusy(true); setDialogError("");
    try { const result = await traderFlow.start(selected._id, connection); setNotice(result.message); dialog.current?.close(); setSelected(null); await load(); }
    catch (err) { setDialogError(errorMessage(err)); }
    finally { setBusy(false); }
  }
  return <div className="mx-auto w-full max-w-7xl space-y-6 p-4 md:p-8">
    <header className="flex flex-wrap items-end justify-between gap-4"><div><p className="mb-2 text-xs font-bold uppercase tracking-widest text-secondary">Find your trading strategy</p><h1 className="text-3xl font-bold text-slate-100">Discover Pro Traders</h1><p className="mt-2 max-w-2xl text-sm text-slate-400">Choose a trader. Their future trades are automatically copied to your connected exchange using your live available futures balance.</p></div><Link href="/dashboard/copy-trader/copying" className="flex items-center gap-2 text-sm text-secondary">Traders I’m copying <MdArrowForward /></Link></header>
    <ProfitShareCard />
    {notice && <p role="status" className="rounded-xl bg-secondary/10 p-4 text-sm text-secondary">{notice}</p>}
    {error && <div role="alert" className="rounded-xl bg-red-500/10 p-4 text-red-300">{error} <button onClick={() => void load()} className="ml-2 underline">Retry</button></div>}
    {loading ? <p className="py-16 text-center text-slate-400">Loading pro traders…</p> : !traders.length && !error ? <div className="rounded-2xl border border-white/10 p-12 text-center"><MdPeople className="mx-auto mb-4 text-4xl text-secondary" /><h2 className="text-xl font-bold">No pro traders available yet</h2><p className="mt-2 text-sm text-slate-400">Profiles appear here when pro trader accounts are activated.</p></div> : <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">{traders.map(trader => <article key={trader._id} className="overflow-hidden rounded-2xl border border-white/10 bg-surface-container-low transition hover:border-secondary/40"><button onClick={() => void open(trader)} className="w-full space-y-6 p-6 text-left focus-visible:outline-2 focus-visible:outline-secondary" aria-label={`View ${trader.firstName} ${trader.lastName}'s profile`}><div className="flex items-center gap-3"><Avatar trader={trader} /><div><h2 className="text-lg font-bold text-slate-100">{trader.firstName} {trader.lastName}</h2><p className="text-xs text-slate-500">{trader.traderID}</p><span className="mt-2 inline-block rounded-full bg-secondary/10 px-2 py-1 text-xs text-secondary">Level {trader.rank.level} · {trader.rank.name}</span></div></div><Stats trader={trader} /><p className="text-xs text-slate-500">View profile and performance details →</p></button><div className="border-t border-white/5 px-6 py-4"><button className={`${action} w-full`} disabled={!!trader.subscription} onClick={() => void open(trader)}>{trader.subscription ? "Currently copying" : "Copy"}</button></div></article>)}</div>}
    {pages > 1 && <nav aria-label="Trader pages" className="flex items-center justify-center gap-4"><button className={action} disabled={page === 1 || loading} onClick={() => setPage(p => p - 1)}>Previous</button><span className="text-sm">{page} / {pages}</span><button className={action} disabled={page === pages || loading} onClick={() => setPage(p => p + 1)}>Next</button></nav>}
    <dialog ref={dialog} onCancel={event => { event.preventDefault(); close(); }} onClose={() => { ++selectionVersion.current; setSelected(null); }} className="fixed inset-0 m-auto max-h-[90vh] w-[calc(100%-2rem)] max-w-xl overflow-y-auto rounded-2xl border border-white/10 bg-surface-container p-6 text-slate-200 backdrop:bg-black/75">
      {selected && <><div className="mb-6 flex items-start justify-between gap-4"><div className="flex items-center gap-3"><Avatar trader={selected} /><div><h2 className="text-xl font-bold">{selected.firstName} {selected.lastName}</h2><p className="mt-1 text-sm text-secondary">Level {selected.rank.level} · {selected.rank.name}</p></div></div><button aria-label="Close profile" disabled={busy} onClick={close} className="rounded-lg p-2 hover:bg-white/10"><MdClose size={22} /></button></div>
        <Stats trader={selected} /><dl className="my-5 grid grid-cols-2 gap-4 border-y border-white/10 py-4 text-sm"><div><dt className="text-slate-400">Rank-active copiers</dt><dd>{selected.metrics.activeCopiers}</dd></div><div><dt className="text-slate-400">Open positions</dt><dd>{selected.activeTrades}</dd></div><div><dt className="text-slate-400">Realized PnL</dt><dd>{selected.realizedPnl.toFixed(2)} USDT</dd></div><div><dt className="text-slate-400">Joined</dt><dd>{new Date(selected.createdAt).toLocaleDateString()}</dd></div></dl>
        <p className="mb-5 text-xs leading-relaxed text-slate-500">Performance reflects closed platform trades. Drawdown uses a normalized closed-trade equity curve; missing data is marked unavailable. Past performance does not guarantee future results.</p>
        {dialogError && <p role="alert" className="mb-4 rounded-lg bg-red-500/10 p-3 text-sm text-red-300">{dialogError}</p>}
        {selected.subscription ? <div className="rounded-xl bg-secondary/10 p-4 text-sm"><p>You are following this trader. Future trades use your live available futures balance.</p><Link className="mt-3 inline-block text-secondary underline" href="/dashboard/copy-trader/copying">Manage copying</Link></div> : <form onSubmit={event => void copy(event)} className="space-y-4"><h3 className="font-bold">Start copying future trades</h3>
          {connectionsLoading ? <p className="text-sm text-slate-400">Loading exchange accounts...</p> : <><label className="block text-sm">Exchange account<select value={connection} onChange={event => setConnection(event.target.value)} className={`${input} mt-2`} required disabled={busy}><option value="">Select account</option>{connections.map(account => <option key={account._id} value={account._id}>{account.exchange.toUpperCase()} {account.label}</option>)}</select></label>{!connections.length && <p className="text-sm text-slate-400">Connect an exchange account using Exchange Settings in the sidebar to start copying.</p>}</>}
          <p className="text-xs leading-relaxed text-slate-400">Each trade risks up to 2% of your live available futures balance at its stop loss, including estimated trading fees. Balance and outstanding settlement are checked when each trade is copied. You can follow this trader now even with no funds or unpaid settlement. Concurrent trades increase total exposure. Existing pro positions will not be copied. Stopping copying prevents future orders; existing positions continue to be managed.</p><p className="text-xs text-slate-400">Profit fee: 10% to the trader + 10% to the platform (20% total).</p><button className={`${action} w-full`} disabled={busy || connectionsLoading || !connection}>{busy ? "Enabling copying..." : "Copy"}</button>
        </form>}
      </>}
    </dialog>
  </div>;
}
