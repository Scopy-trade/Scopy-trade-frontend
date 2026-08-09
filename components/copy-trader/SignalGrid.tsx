"use client";

import { ActiveProTrade } from "@/lib";
import { MdContentCopy, MdPeople, MdTrendingUp } from "react-icons/md";

function traderName(trade: ActiveProTrade) {
  const owner = typeof trade.userId === "string" ? undefined : trade.userId;
  const name = [owner?.firstName, owner?.lastName]
    .filter(Boolean)
    .join(" ");
  return name || owner?.traderID || "Pro Trader";
}

function traderId(trade: ActiveProTrade) {
  return typeof trade.userId === "string" ? undefined : trade.userId?.traderID;
}

function TradeCard({
  trade,
  onExecute,
}: {
  trade: ActiveProTrade;
  onExecute: (trade: ActiveProTrade) => void;
}) {
  const isLong = trade.direction === "buy";
  const alreadyCopied = Boolean(trade.myTrade);

  return (
    <article className="rounded-xl border border-white/5 bg-surface-container-low p-5 card-glow">
      <div className="flex items-start justify-between gap-4 mb-5">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-10 h-10 rounded-full bg-surface-container-highest border border-white/10 flex items-center justify-center font-bold text-secondary shrink-0">
            {traderName(trade).charAt(0).toUpperCase()}
          </div>
          <div className="min-w-0">
            <p className="font-bold text-slate-100 truncate">{traderName(trade)}</p>
            <p className="text-[10px] text-slate-500 uppercase tracking-wider">
              {traderId(trade) || "Verified pro"}
            </p>
          </div>
        </div>
        <span className={`text-[10px] font-bold px-2 py-1 rounded uppercase ${
          isLong ? "bg-secondary/10 text-secondary" : "bg-tertiary/10 text-tertiary"
        }`}>
          {isLong ? "Long" : "Short"}
        </span>
      </div>

      <div className="flex items-end justify-between mb-5">
        <div>
          <p className="text-[10px] text-slate-500 uppercase tracking-wider">Open trade</p>
          <p className="text-2xl font-bold text-slate-100 font-mono">{trade.pair}</p>
        </div>
        <div className="text-right">
          <p className="text-[10px] text-slate-500 uppercase tracking-wider">Status</p>
          <p className="text-sm font-bold text-secondary uppercase">{trade.status}</p>
        </div>
      </div>

      <dl className="grid grid-cols-3 gap-3 py-4 border-y border-white/5 mb-4">
        <div>
          <dt className="text-[9px] text-slate-500 uppercase">Entry</dt>
          <dd className="text-xs font-mono text-slate-200 mt-1">{trade.entryFillPrice || trade.entryPrice}</dd>
        </div>
        <div>
          <dt className="text-[9px] text-slate-500 uppercase">Take profit</dt>
          <dd className="text-xs font-mono text-secondary mt-1">{trade.tp}</dd>
        </div>
        <div>
          <dt className="text-[9px] text-slate-500 uppercase">Stop loss</dt>
          <dd className="text-xs font-mono text-tertiary mt-1">{trade.sl}</dd>
        </div>
      </dl>

      <div className="flex items-center justify-between mb-4 text-xs text-slate-500">
        <span className="inline-flex items-center gap-1"><MdPeople /> {trade.copiers ?? 0} copiers</span>
        <span>{new Date(trade.createdAt).toLocaleString()}</span>
      </div>

      <button
        type="button"
        disabled={alreadyCopied}
        onClick={() => onExecute(trade)}
        className="w-full py-2.5 rounded-lg bg-secondary text-on-secondary font-bold text-sm flex items-center justify-center gap-2 disabled:opacity-45 disabled:cursor-not-allowed"
      >
        <MdContentCopy /> {alreadyCopied ? "Already copied" : "Copy this trade"}
      </button>
    </article>
  );
}

export default function SignalGrid({
  trades,
  loading,
  error,
  onExecute,
}: {
  trades: ActiveProTrade[];
  loading: boolean;
  error: string | null;
  onExecute: (trade: ActiveProTrade) => void;
}) {
  if (loading) {
    return <div className="p-12 text-center text-slate-400">Loading active pro trades...</div>;
  }

  if (error) {
    return <div className="p-12 text-center text-tertiary">{error}</div>;
  }

  if (!trades.length) {
    return (
      <div className="p-20 text-center flex flex-col items-center">
        <MdTrendingUp className="text-4xl text-slate-600 mb-3" />
        <h3 className="font-bold text-slate-200">No active pro trades</h3>
        <p className="text-sm text-slate-500 mt-1">New trades opened by pro traders will appear here.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 p-4">
      {trades.map((trade) => (
        <TradeCard key={trade._id} trade={trade} onExecute={onExecute} />
      ))}
    </div>
  );
}
