"use client";

import { FormEvent, useEffect, useState } from "react";
import { MdClose, MdEdit, MdLock, MdSave } from "react-icons/md";
import { ActiveProTrade } from "@/lib";
import { tradeService } from "@/lib/api/trades";

function exchangeLabel(trade: ActiveProTrade) {
  if (typeof trade.exchangeConnectionId === "string") return "Exchange";
  return trade.exchangeConnectionId.label || trade.exchangeConnectionId.exchange;
}

export default function TradeDetailsModal({
  trade,
  onClose,
  onUpdated,
  canEdit = true,
}: {
  trade: ActiveProTrade | null;
  onClose: () => void;
  onUpdated: (trade: ActiveProTrade) => void;
  canEdit?: boolean;
}) {
  const [editing, setEditing] = useState(false);
  const [entryPrice, setEntryPrice] = useState("");
  const [tp, setTp] = useState("");
  const [sl, setSl] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!trade) return;
    setEntryPrice(trade.entryPrice);
    setTp(trade.tp);
    setSl(trade.sl);
    setEditing(false);
    setError(null);
  }, [trade]);

  useEffect(() => {
    if (!trade) return;
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [trade, onClose]);

  if (!trade) return null;
  const entryEditable = trade.status === "pending" && !trade.entryFillPrice;
  const inputClass =
    "w-full rounded-lg border border-white/10 bg-surface-container-highest px-3 py-2 font-mono outline-none focus:border-secondary disabled:cursor-not-allowed disabled:opacity-50";

  async function save(event: FormEvent) {
    event.preventDefault();
    if (!trade) return;
    const values = [Number(entryPrice), Number(tp), Number(sl)];
    if (values.some((value) => !Number.isFinite(value) || value <= 0)) {
      setError("All price levels must be positive numbers.");
      return;
    }
    setSaving(true);
    setError(null);
    try {
      const response = await tradeService.updateProTrade(trade._id, {
        ...(entryEditable ? { entryPrice: Number(entryPrice) } : {}),
        tp: Number(tp),
        sl: Number(sl),
      });
      onUpdated(response.trade);
      setEditing(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update trade");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-labelledby="trade-details-title">
      <button type="button" className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} aria-label="Close trade details" />
      <section className="relative w-full max-w-2xl overflow-hidden rounded-2xl border border-white/10 bg-surface-container shadow-2xl">
        <header className="flex items-start justify-between border-b border-white/10 p-6">
          <div>
            <div className="mb-2 flex items-center gap-2">
              <span className={`rounded px-2 py-1 text-[10px] font-bold uppercase ${trade.direction === "buy" ? "bg-secondary/10 text-secondary" : "bg-tertiary/10 text-tertiary"}`}>{trade.direction === "buy" ? "Long" : "Short"}</span>
              <span className="rounded bg-white/5 px-2 py-1 text-[10px] font-bold uppercase text-slate-400">{trade.status}</span>
            </div>
            <h2 id="trade-details-title" className="text-3xl font-bold text-slate-100">{trade.pair}</h2>
            <p className="mt-1 text-sm text-slate-400">{exchangeLabel(trade)} · Opened {new Date(trade.createdAt).toLocaleString()}</p>
          </div>
          <button type="button" onClick={onClose} className="rounded-full p-2 text-slate-400 hover:bg-white/10 hover:text-white" aria-label="Close"><MdClose size={22} /></button>
        </header>

        <form onSubmit={(event) => void save(event)} className="space-y-6 p-6">
          {error && <p className="rounded-lg border border-tertiary/20 bg-tertiary/10 p-3 text-sm text-tertiary">{error}</p>}

          <div className="rounded-lg border border-white/10 bg-surface-container-high p-3 text-sm">
            <div className="flex items-center justify-between gap-3">
              <span className="text-slate-400">Exchange monitoring</span>
              <span className={`font-semibold capitalize ${trade.monitoringStatus === "connected" ? "text-secondary" : trade.monitoringStatus === "connecting" || trade.monitoringStatus === "reconnecting" ? "text-amber-400" : "text-tertiary"}`}>
                {trade.monitoringStatus || (trade.wsMonitoringActive ? "connected" : "disconnected")}
              </span>
            </div>
            {trade.monitoringError && <p className="mt-2 text-xs text-tertiary">{trade.monitoringError}</p>}
            {trade.lastCheckedAt && <p className="mt-1 text-xs text-slate-500">Last reconciled {new Date(trade.lastCheckedAt).toLocaleString()}</p>}
          </div>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            <div><p className="text-[10px] uppercase text-slate-500">Quantity</p><p className="mt-1 font-mono text-sm">{trade.quantity}</p></div>
            <div><p className="text-[10px] uppercase text-slate-500">Fill price</p><p className="mt-1 font-mono text-sm">{trade.entryFillPrice || "Not filled"}</p></div>
            <div><p className="text-[10px] uppercase text-slate-500">Market price</p><p className="mt-1 font-mono text-sm">{trade.currentMarketPrice || "Unavailable"}</p></div>
            <div className="col-span-2"><p className="text-[10px] uppercase text-slate-500">Exchange order ID</p><p className="mt-1 truncate font-mono text-sm">{trade.exchangeOrderId || "Unavailable"}</p></div>
          </div>

          {(trade.status === "closed" || trade.copyStats) && (
            <div className="grid gap-3 rounded-xl border border-white/10 bg-surface-container-high p-4 sm:grid-cols-4">
              {trade.status === "closed" && <>
                <div><p className="text-[10px] uppercase text-slate-500">Exit price</p><p className="mt-1 font-mono text-sm">{trade.exitPrice || "—"}</p></div>
                <div><p className="text-[10px] uppercase text-slate-500">Realized P&amp;L</p><p className={`mt-1 font-mono text-sm font-bold ${Number(trade.realizedPnl) >= 0 ? "text-secondary" : "text-tertiary"}`}>{trade.realizedPnl ?? "—"} USDT</p></div>
              </>}
              {trade.copyStats && <>
                <div><p className="text-[10px] uppercase text-slate-500">Total copiers</p><p className="mt-1 text-sm font-bold">{trade.copyStats.total}</p></div>
                <div><p className="text-[10px] uppercase text-slate-500">Active / profitable</p><p className="mt-1 text-sm font-bold">{trade.copyStats.active} / {trade.copyStats.profitable}</p></div>
              </>}
              {trade.tradeOrigin === "copy" && trade.platformFee && (
                <div><p className="text-[10px] uppercase text-slate-500">20% settlement</p><p className="mt-1 text-sm font-bold">{trade.platformFee} USDT · {trade.feeStatus}</p></div>
              )}
            </div>
          )}

          <div className="grid gap-4 sm:grid-cols-3">
            <label className="text-sm text-slate-400">Entry price<input type="number" min="0" step="any" disabled={!editing || !entryEditable} value={entryPrice} onChange={(event) => setEntryPrice(event.target.value)} className={`${inputClass} mt-2`} /></label>
            <label className="text-sm text-slate-400">Take profit<input type="number" min="0" step="any" disabled={!editing} value={tp} onChange={(event) => setTp(event.target.value)} className={`${inputClass} mt-2`} /></label>
            <label className="text-sm text-slate-400">Stop loss<input type="number" min="0" step="any" disabled={!editing} value={sl} onChange={(event) => setSl(event.target.value)} className={`${inputClass} mt-2`} /></label>
          </div>

          {!entryEditable && <div className="flex items-start gap-2 rounded-lg bg-white/5 p-3 text-xs text-slate-400"><MdLock className="mt-0.5 shrink-0" />Entry price is locked because this order has started filling. TP and SL can still be amended where supported by the connected exchange.</div>}

          <div className="flex justify-end gap-3 border-t border-white/10 pt-5">
            {canEdit && (editing ? <><button type="button" onClick={() => { setEditing(false); setEntryPrice(trade.entryPrice); setTp(trade.tp); setSl(trade.sl); setError(null); }} className="rounded-lg border border-white/10 px-4 py-2 text-sm">Cancel</button><button disabled={saving} className="flex items-center gap-2 rounded-lg bg-secondary px-5 py-2 text-sm font-bold text-on-secondary disabled:opacity-50"><MdSave />{saving ? "Updating exchange..." : "Save changes"}</button></> : <button type="button" onClick={() => setEditing(true)} className="flex items-center gap-2 rounded-lg bg-secondary px-5 py-2 text-sm font-bold text-on-secondary"><MdEdit />Edit parameters</button>)}
            {!canEdit && <button type="button" onClick={onClose} className="rounded-lg border border-white/10 px-5 py-2 text-sm">Close</button>}
          </div>
        </form>
      </section>
    </div>
  );
}
