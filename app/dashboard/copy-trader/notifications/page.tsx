"use client";
import { useCallback, useEffect, useState } from "react";
import { CopyNotice, traderFlow } from "@/lib/api/trader-flow";

export default function NotificationsPage() {
  const [rows, setRows] = useState<CopyNotice[]>([]), [page, setPage] = useState(1), [pages, setPages] = useState(1);
  const [unread, setUnread] = useState(0), [error, setError] = useState(""), [loading, setLoading] = useState(true);
  const load = useCallback(async () => {
    setError("");
    try { const result = await traderFlow.notifications(page); setRows(result.notifications); setUnread(result.unread); setPages(result.pages); }
    catch (err) { setError(err instanceof Error ? err.message : "Could not load notifications."); }
    finally { setLoading(false); }
  }, [page]);
  useEffect(() => { void load(); const timer = setInterval(() => void load(), 30_000); return () => clearInterval(timer); }, [load]);
  async function read(id: string) { try { await traderFlow.read(id); window.dispatchEvent(new Event("notifications-updated")); await load(); } catch (err) { setError(err instanceof Error ? err.message : "Could not mark notification as read."); } }
  return <div className="mx-auto w-full max-w-4xl space-y-5 p-4 md:p-8"><header><h1 className="text-3xl font-bold">Notifications</h1><p className="mt-2 text-sm text-slate-400">{unread} unread · Settlement alerts and automatic copy updates.</p></header>{error && <p role="alert" className="text-red-300">{error} <button className="underline" onClick={() => void load()}>Retry</button></p>}{loading ? <p>Loading…</p> : !rows.length ? <p className="rounded-xl border border-white/10 p-8 text-slate-400">No notifications yet.</p> : rows.map(row => <article key={row._id} className={`rounded-xl border p-5 ${row.readAt ? "border-white/5 bg-surface-container-low" : "border-amber-400/30 bg-amber-400/5"}`}><h2 className="font-bold">{row.title}</h2>{row.kind === "settlement_due" && <a href="/dashboard/copy-trader" className="mt-2 inline-block text-sm text-secondary underline">Open settlement</a>}<p className="mt-2 text-sm leading-relaxed text-slate-300">{row.message}</p><div className="mt-4 flex items-center justify-between gap-4 text-xs text-slate-500"><time>{new Date(row.createdAt).toLocaleString()}</time>{!row.readAt && <button onClick={() => void read(row._id)} className="text-secondary">Mark as read</button>}</div></article>)}{pages > 1 && <nav className="flex justify-between"><button disabled={page === 1} onClick={() => setPage(p => p - 1)}>Previous</button><span>{page} / {pages}</span><button disabled={page === pages} onClick={() => setPage(p => p + 1)}>Next</button></nav>}</div>;
}
