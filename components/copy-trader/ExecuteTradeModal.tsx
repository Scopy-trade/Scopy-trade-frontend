"use client";

import { useEffect, useMemo, useState } from "react";
import { ActiveProTrade, ExchangeBalance } from "@/lib";
import { tradeService } from "@/lib/api/trades";
import { MdClose } from "react-icons/md";

export default function ExecuteTradeModal({
  trade,
  onClose,
  onExecuted,
}: {
  trade: ActiveProTrade;
  onClose: () => void;
  onExecuted: () => void;
}) {
  const [balances, setBalances] = useState<ExchangeBalance[]>([]);
  const [connectionId, setConnectionId] = useState("");
  const [balance, setBalance] = useState("");
  const [loadingBalances, setLoadingBalances] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    void tradeService.getBalances()
      .then((response) => {
        const usable = response.balances.filter((item) => item.status === "ok");
        setBalances(usable);
        if (usable[0]) {
          setConnectionId(usable[0].connectionId);
          setBalance(String(usable[0].totalUsdtEquivalent ?? ""));
        }
      })
      .catch((err) => setError(err instanceof Error ? err.message : "Failed to load exchanges"))
      .finally(() => setLoadingBalances(false));
  }, []);

  const selected = useMemo(
    () => balances.find((item) => item.connectionId === connectionId),
    [balances, connectionId],
  );

  function selectConnection(id: string) {
    setConnectionId(id);
    const item = balances.find((entry) => entry.connectionId === id);
    setBalance(String(item?.totalUsdtEquivalent ?? ""));
  }

  async function confirm() {
    const parsedBalance = Number(balance);
    if (!connectionId || !Number.isFinite(parsedBalance) || parsedBalance <= 0) {
      setError("Select an exchange and enter a positive risk balance.");
      return;
    }

    setSubmitting(true);
    setError(null);
    try {
      await tradeService.copyTrade(trade._id, connectionId, parsedBalance);
      onExecuted();
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to copy trade");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" onClick={onClose}>
      <div className="w-full max-w-xl rounded-2xl p-6 md:p-8 bg-[#131b2e] border border-white/10" onClick={(event) => event.stopPropagation()}>
        <div className="flex justify-between items-start mb-6">
          <div>
            <span className="text-[10px] font-bold px-2 py-1 rounded bg-secondary/10 text-secondary">ACTIVE PRO TRADE</span>
            <h2 className="text-3xl font-bold mt-3">{trade.pair}</h2>
            <p className="text-sm text-slate-400 mt-1">Copy this live {trade.direction === "buy" ? "long" : "short"} position</p>
          </div>
          <button type="button" onClick={onClose} className="p-2 text-slate-400 hover:text-white"><MdClose size={22} /></button>
        </div>

        <div className="grid grid-cols-3 gap-3 p-4 rounded-xl bg-[#0b1326] mb-6">
          <div><p className="text-[10px] text-slate-500">ENTRY</p><p className="font-mono font-bold">{trade.entryFillPrice || trade.entryPrice}</p></div>
          <div><p className="text-[10px] text-slate-500">TAKE PROFIT</p><p className="font-mono font-bold text-secondary">{trade.tp}</p></div>
          <div><p className="text-[10px] text-slate-500">STOP LOSS</p><p className="font-mono font-bold text-tertiary">{trade.sl}</p></div>
        </div>

        {error && <p className="mb-4 p-3 rounded-lg bg-tertiary/10 text-tertiary text-sm">{error}</p>}

        <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Connected exchange</label>
        <select
          value={connectionId}
          disabled={loadingBalances || !balances.length}
          onChange={(event) => selectConnection(event.target.value)}
          className="w-full p-3 rounded-lg bg-[#0b1326] border border-white/10 mb-4"
        >
          {!balances.length && <option value="">{loadingBalances ? "Loading..." : "No connected exchange"}</option>}
          {balances.map((item) => <option key={item.connectionId} value={item.connectionId}>{item.label || item.exchange}</option>)}
        </select>

        <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Balance used for 2% risk sizing (USDT)</label>
        <input
          type="number"
          min="0"
          step="0.01"
          value={balance}
          onChange={(event) => setBalance(event.target.value)}
          className="w-full p-3 rounded-lg bg-[#0b1326] border border-white/10 outline-none focus:border-secondary"
        />
        {selected && <p className="text-xs text-slate-500 mt-2">Available: {selected.totalUsdtEquivalent ?? "unavailable"} USDT</p>}

        <button
          type="button"
          disabled={submitting || loadingBalances || !balances.length}
          onClick={() => void confirm()}
          className="w-full mt-6 py-3.5 rounded-xl bg-secondary text-on-secondary font-bold disabled:opacity-45"
        >
          {submitting ? "Opening copy trade..." : "Confirm copy trade"}
        </button>
      </div>
    </div>
  );
}
