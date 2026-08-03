"use client";

import { FormEvent, useEffect, useState } from "react";
import { ExchangeBalance } from "@/lib";
import { tradeService } from "@/lib/api/trades";
import { MdClose } from "react-icons/md";

export default function OpenTradeModal({ isOpen, onClose, onTradeOpened }: { isOpen: boolean; onClose: () => void; onTradeOpened: () => void }) {
  const [form, setForm] = useState({ pair: "", entry: "", tp: "", sl: "", direction: "buy" as "buy" | "sell", notes: "", exchangeConnectionId: "", balance: "" });
  const [balances, setBalances] = useState<ExchangeBalance[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isOpen) return;
    setError(null);
    void tradeService.getBalances().then((response) => {
      const usable = response.balances.filter((item) => item.status === "ok");
      setBalances(usable);
      if (usable[0]) setForm((current) => ({ ...current, exchangeConnectionId: usable[0].connectionId, balance: String(usable[0].totalUsdtEquivalent ?? "") }));
    }).catch((err) => setError(err instanceof Error ? err.message : "Failed to load exchange balances"));
  }, [isOpen]);

  function chooseExchange(connectionId: string) {
    const selected = balances.find((item) => item.connectionId === connectionId);
    setForm((current) => ({ ...current, exchangeConnectionId: connectionId, balance: String(selected?.totalUsdtEquivalent ?? "") }));
  }

  async function submit(event: FormEvent) {
    event.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await tradeService.openProTrade({ pair: form.pair, entry: Number(form.entry), tp: Number(form.tp), sl: Number(form.sl), direction: form.direction, notes: form.notes, exchangeConnectionId: form.exchangeConnectionId, balance: Number(form.balance) });
      onTradeOpened();
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to open trade");
    } finally {
      setLoading(false);
    }
  }

  if (!isOpen) return null;
  const inputClass = "w-full px-4 py-2.5 rounded-lg bg-surface-container-highest border border-white/10 text-on-surface outline-none focus:border-secondary";
  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="bg-surface-container rounded-2xl w-full max-w-xl border border-white/10 shadow-2xl max-h-[92vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-white/10"><div><h2 className="text-xl font-bold">Open a Pro Trade</h2><p className="text-xs text-slate-400 mt-1">This places a real order and makes the open trade available to copy.</p></div><button type="button" onClick={onClose} className="p-2"><MdClose size={20} /></button></div>
        <form onSubmit={(event) => void submit(event)} className="p-6 space-y-4">
          {error && <p className="p-3 rounded-lg bg-tertiary/10 text-tertiary text-sm">{error}</p>}
          {!balances.length && <p className="p-3 rounded-lg bg-amber-500/10 text-amber-300 text-sm">Connect and verify an exchange before opening a trade.</p>}
          <div><label className="block text-sm text-slate-400 mb-2">Connected exchange</label><select required value={form.exchangeConnectionId} onChange={(e) => chooseExchange(e.target.value)} className={inputClass}><option value="">Select exchange</option>{balances.map((item) => <option key={item.connectionId} value={item.connectionId}>{item.label || item.exchange}</option>)}</select></div>
          <div><label className="block text-sm text-slate-400 mb-2">Trading pair</label><input required value={form.pair} onChange={(e) => setForm({ ...form, pair: e.target.value.toUpperCase() })} placeholder="BTC/USDT" className={inputClass} /></div>
          <div className="grid grid-cols-2 gap-4"><div><label className="block text-sm text-slate-400 mb-2">Direction</label><select value={form.direction} onChange={(e) => setForm({ ...form, direction: e.target.value as "buy" | "sell" })} className={inputClass}><option value="buy">Buy / Long</option><option value="sell">Sell / Short</option></select></div><div><label className="block text-sm text-slate-400 mb-2">Entry price</label><input required type="number" min="0" step="any" value={form.entry} onChange={(e) => setForm({ ...form, entry: e.target.value })} className={inputClass} /></div></div>
          <div className="grid grid-cols-2 gap-4"><div><label className="block text-sm text-slate-400 mb-2">Take profit</label><input required type="number" min="0" step="any" value={form.tp} onChange={(e) => setForm({ ...form, tp: e.target.value })} className={inputClass} /></div><div><label className="block text-sm text-slate-400 mb-2">Stop loss</label><input required type="number" min="0" step="any" value={form.sl} onChange={(e) => setForm({ ...form, sl: e.target.value })} className={inputClass} /></div></div>
          <div><label className="block text-sm text-slate-400 mb-2">Balance used for 2% risk sizing (USDT)</label><input required type="number" min="0" step="any" value={form.balance} onChange={(e) => setForm({ ...form, balance: e.target.value })} className={inputClass} /></div>
          <div><label className="block text-sm text-slate-400 mb-2">Notes (optional)</label><textarea rows={3} value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} className={inputClass} /></div>
          <div className="flex gap-3 pt-2"><button type="button" onClick={onClose} className="flex-1 py-2.5 rounded-lg border border-white/10">Cancel</button><button disabled={loading || !balances.length} className="flex-1 py-2.5 rounded-lg bg-secondary text-on-secondary font-bold disabled:opacity-45">{loading ? "Opening trade..." : "Open trade"}</button></div>
        </form>
      </div>
    </div>
  );
}
