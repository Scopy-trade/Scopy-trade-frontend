"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { adminWithdrawalService, type AdminWithdrawal } from "@/lib/api/admin";
import WithdrawalDetails, { WithdrawalStatusBadge } from "@/components/pro-trader/earningsPage/WithdrawalDetails";

const button = "rounded-xl border border-white/10 px-4 py-2 text-sm font-semibold hover:bg-white/5 disabled:opacity-40";
const errorMessage = (error: unknown) => error instanceof Error ? error.message : "Unable to load withdrawals. Please retry.";

export default function WithdrawalsPage() {
  const [status, setStatus] = useState("REVIEW");
  const [page, setPage] = useState(1);
  const [data, setData] = useState<{ rows: AdminWithdrawal[]; pages: number; total: number }>({ rows: [], pages: 1, total: 0 });
  const [selected, setSelected] = useState<AdminWithdrawal | null>(null);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [detailError, setDetailError] = useState("");
  const [notice, setNotice] = useState("");
  const version = useRef(0);
  const dialog = useRef<HTMLDialogElement>(null);
  const invalidateRefresh = useCallback(() => { ++version.current; }, []);
  const refresh = useCallback(async () => {
    const request = ++version.current;
    setLoading(true); setError("");
    try {
      const result = await adminWithdrawalService.list(page, status || undefined);
      if (request === version.current) setData(result);
    } catch (err) { if (request === version.current) setError(errorMessage(err)); }
    finally { if (request === version.current) setLoading(false); }
  }, [page, status]);
  useEffect(() => { void refresh(); return invalidateRefresh; }, [refresh, invalidateRefresh]);
  useEffect(() => { if (selected) dialog.current?.showModal(); else dialog.current?.close(); }, [selected]);

  async function inspect(id: string) {
    if (busy) return;
    setBusy(true); setError(""); setNotice(""); setDetailError("");
    try { setSelected((await adminWithdrawalService.get(id)).withdrawal); }
    catch (err) { setError(errorMessage(err)); }
    finally { setBusy(false); }
  }
  async function reconcile() {
    if (!selected || busy) return;
    setBusy(true); setDetailError(""); setNotice("");
    try {
      const result = await adminWithdrawalService.reconcile(selected._id);
      setSelected(result.withdrawal); setNotice(result.message); await refresh();
    } catch (err) { setDetailError(errorMessage(err)); }
    finally { setBusy(false); }
  }

  return <div className="mx-auto max-w-7xl space-y-6 text-[#dae2fd]">
    <header><h1 className="text-2xl font-bold">Withdrawal management</h1><p className="mt-2 max-w-3xl text-sm leading-6 text-slate-400">Inspect ProTrader payouts and reconcile withdrawals under review against confirmed TRON evidence. Unresolved payouts keep their funds reserved.</p></header>
    <div className="flex flex-wrap items-center justify-between gap-4">
      <label className="flex items-center gap-3 text-sm">Status<select value={status} disabled={busy} onChange={e => { setStatus(e.target.value); setPage(1); }} className="rounded-xl border border-white/10 bg-[#171f33] px-4 py-2"><option value="">All statuses</option>{["REVIEW", "QUEUED", "SIGNED", "CONFIRMED", "FAILED"].map(value => <option key={value}>{value}</option>)}</select></label>
      <button className={button} disabled={loading || busy} onClick={() => void refresh()}>Refresh</button>
    </div>
    {error && <p role="alert" className="rounded-xl bg-red-400/10 p-4 text-sm text-red-300">{error}</p>}
    <section aria-label="Withdrawal records" aria-busy={loading} className="overflow-hidden rounded-2xl border border-white/5 bg-[#131b2e]">
      {loading ? <p className="p-10 text-center text-slate-400">Loading withdrawals...</p> : error ? <p className="p-10 text-center text-slate-400">Withdrawals could not be loaded. Use Refresh to retry.</p> : data.rows.length === 0 ? <p className="p-10 text-center text-slate-400">No withdrawals match this status.</p> : <div className="overflow-x-auto"><table className="w-full text-left text-sm"><thead className="text-xs text-slate-400"><tr>{["ProTrader", "Amount / mode", "Status", "Requested", "Funds", "Details"].map(label => <th className="px-5 py-4" key={label}>{label}</th>)}</tr></thead><tbody className="divide-y divide-white/5">{data.rows.map(row => <tr key={row._id}>
        <td className="px-5 py-5"><p>{row.proTrader ? `${row.proTrader.firstName} ${row.proTrader.lastName}` : "Unavailable account"}</p><p className="mt-1 text-xs text-slate-400">{row.proTrader?.traderID || row.userId}</p></td>
        <td className="whitespace-nowrap px-5 py-5">{row.amount} USDT<span className="mt-1 block text-xs capitalize text-slate-400">{row.mode}</span></td>
        <td className="px-5 py-5"><WithdrawalStatusBadge status={row.status} /></td>
        <td className="whitespace-nowrap px-5 py-5 text-slate-400">{new Date(row.createdAt).toLocaleString()}</td>
        <td className="px-5 py-5">{row.fundsReserved ? "Reserved" : row.status === "FAILED" ? "Refunded" : row.status === "CONFIRMED" ? row.mode === "demo" ? "Simulated" : "Paid" : "—"}</td>
        <td className="px-5 py-5"><button className={button} disabled={busy} onClick={() => void inspect(row._id)} aria-label={`Inspect withdrawal ${row._id}`}>Inspect</button></td>
      </tr>)}</tbody></table></div>}
      <footer className="flex flex-wrap items-center justify-between gap-4 border-t border-white/5 px-5 py-4 text-xs text-slate-400"><span>{data.total} records · Page {page} of {data.pages}</span><div className="flex gap-3"><button className={button} disabled={page <= 1 || loading || busy} onClick={() => setPage(p => p - 1)}>Previous</button><button className={button} disabled={page >= data.pages || loading || busy} onClick={() => setPage(p => p + 1)}>Next</button></div></footer>
    </section>
    <dialog ref={dialog} onCancel={e => { if (busy) e.preventDefault(); else setSelected(null); }} onClose={() => setSelected(null)} aria-labelledby="withdrawal-detail-title" className="fixed inset-0 m-auto max-h-[90dvh] w-[calc(100%_-_2rem)] max-w-2xl overflow-y-auto rounded-2xl border border-white/10 bg-[#131b2e] p-6 text-[#dae2fd] backdrop:bg-black/70">
      <header className="mb-6 flex items-center justify-between gap-4"><h2 id="withdrawal-detail-title" className="text-xl font-bold">Withdrawal details</h2><button className={button} disabled={busy} onClick={() => setSelected(null)}>Close</button></header>
      {selected && <><p className="mb-4 text-sm text-slate-400">{selected.proTrader ? `${selected.proTrader.firstName} ${selected.proTrader.lastName} · ${selected.proTrader.email}` : selected.userId}</p><WithdrawalDetails row={selected} />
        {selected.reconciliationReason && <div className="mt-5 rounded-xl bg-white/5 p-4 text-sm"><p className="mb-2 text-xs text-slate-400">Last processing / reconciliation reason</p>{selected.reconciliationReason}</div>}
        {notice && <p role="status" className="mt-4 rounded-xl bg-emerald-400/10 p-4 text-sm text-emerald-200">{notice}</p>}
        {detailError && <p role="alert" className="mt-4 text-sm text-red-300">{detailError}</p>}
        {selected.status === "REVIEW" && <div className="mt-6 space-y-3 border-t border-white/10 pt-5"><p className="text-xs leading-5 text-slate-400">Check TRON to resolve this payout. A verified transfer marks it confirmed; a proven execution failure refunds the exact amount once. Inconclusive results remain under review. Every check is audited.</p><button className="w-full rounded-xl bg-emerald-300 px-5 py-3 text-sm font-bold text-emerald-950 disabled:opacity-40" disabled={busy} onClick={() => void reconcile()}>{busy ? "Checking TRON..." : "Check TRON & reconcile"}</button></div>}
      </>}
    </dialog>
  </div>;
}
