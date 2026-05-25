"use client";

import { MdTrendingUp, MdTrendingDown, MdPeople, MdStar } from "react-icons/md";
import { Signal } from "@/lib";

/* ── Fallback mock data (used when backend hasn't been connected yet) ── */
const FALLBACK_SIGNALS: Signal[] = [
  {
    _id: "SL-9942",
    trader: "Vector Quant",
    tier: "ELITE TIER",
    pair: "BTC/USDT",
    tradeType: "BUY",
    leverage: "20x",
    entryPrice: 64281.5,
    tp: 68400.0,
    sl: 62100.0,
    status: "ACTIVE",
    winRate: 92.4,
    roi30d: 116.02,
    maxDrawdown: 20.2,
    copiers: 8400,
    pnl7d: 1895.22,
    aum: 377990.5,
    sharpeRatio: 25.0,
  },
  {
    _id: "SL-9901",
    trader: "Elena Volkov",
    tier: "INDICES PRO",
    pair: "NDX/USD",
    tradeType: "SELL",
    leverage: "10x",
    entryPrice: 19200.0,
    tp: 18500.0,
    sl: 19600.0,
    status: "ACTIVE",
    winRate: 87.5,
    roi30d: 84.31,
    maxDrawdown: 15.8,
    copiers: 3100,
    pnl7d: 1240.8,
    aum: 245000.0,
    sharpeRatio: 18.5,
  },
  {
    _id: "SL-9887",
    trader: "Julian Thorne",
    tier: "CRYPTO VOLATILITY",
    pair: "ETH/USDT",
    tradeType: "BUY",
    leverage: "15x",
    entryPrice: 3450.0,
    tp: 3900.0,
    sl: 3200.0,
    status: "ACTIVE",
    winRate: 81.2,
    roi30d: 67.44,
    maxDrawdown: 24.1,
    copiers: 2700,
    pnl7d: 980.55,
    aum: 189000.0,
    sharpeRatio: 14.2,
  },
  {
    _id: "SL-9871",
    trader: "Luna Apex",
    tier: "FOREX MASTER",
    pair: "GBP/JPY",
    tradeType: "BUY",
    leverage: "5x",
    entryPrice: 189.5,
    tp: 193.0,
    sl: 187.0,
    status: "ACTIVE",
    winRate: 89.0,
    roi30d: 52.18,
    maxDrawdown: 12.5,
    copiers: 5200,
    pnl7d: 672.3,
    aum: 310000.0,
    sharpeRatio: 21.0,
  },
  {
    _id: "SL-9855",
    trader: "S. K. Capital",
    tier: "PRO TIER",
    pair: "SOL/USDT",
    tradeType: "BUY",
    leverage: "8x",
    entryPrice: 142.1,
    tp: 158.0,
    sl: 135.0,
    status: "ACTIVE",
    winRate: 79.8,
    roi30d: 41.92,
    maxDrawdown: 28.4,
    copiers: 1900,
    pnl7d: 445.12,
    aum: 128000.0,
    sharpeRatio: 11.8,
  },
  {
    _id: "SL-9841",
    trader: "Neon Alpha",
    tier: "RISING STAR",
    pair: "GOLD/USD",
    tradeType: "SELL",
    leverage: "3x",
    entryPrice: 2310.0,
    tp: 2250.0,
    sl: 2340.0,
    status: "ACTIVE",
    winRate: 82.1,
    roi30d: 33.6,
    maxDrawdown: 18.9,
    copiers: 890,
    pnl7d: 312.44,
    aum: 85000.0,
    sharpeRatio: 9.5,
  },
];

/* ── Helpers ── */

function formatNumber(n: number | undefined, prefix = ""): string {
  if (n === undefined || n === null) return "—";
  if (Math.abs(n) >= 1_000_000) return `${prefix}${(n / 1_000_000).toFixed(2)}M`;
  if (Math.abs(n) >= 1_000) return `${prefix}${(n / 1_000).toFixed(2)}k`;
  return `${prefix}${n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

function formatCopiers(n: number | undefined): string {
  if (n === undefined || n === null) return "—";
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}k`;
  return n.toString();
}

/* ── Skeleton Card ── */

function SkeletonCard() {
  return (
    <div className="rounded-xl border border-white/5 p-5 bg-surface-container-low">
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-full skeleton-pulse" />
        <div className="flex-1">
          <div className="h-4 w-32 skeleton-pulse mb-2" />
          <div className="h-3 w-20 skeleton-pulse" />
        </div>
        <div className="w-5 h-5 skeleton-pulse rounded" />
      </div>
      {/* PNL */}
      <div className="mb-1">
        <div className="h-3 w-24 skeleton-pulse mb-2" />
        <div className="h-7 w-36 skeleton-pulse mb-1" />
        <div className="h-3 w-20 skeleton-pulse" />
      </div>
      {/* Stats */}
      <div className="grid grid-cols-3 gap-3 mt-4 mb-4">
        {[1, 2, 3].map((i) => (
          <div key={i}>
            <div className="h-3 w-14 skeleton-pulse mb-2" />
            <div className="h-4 w-16 skeleton-pulse" />
          </div>
        ))}
      </div>
      {/* Buttons */}
      <div className="flex gap-2 mt-4">
        <div className="h-9 flex-1 skeleton-pulse rounded-lg" />
        <div className="h-9 flex-1 skeleton-pulse rounded-lg" />
      </div>
    </div>
  );
}

/* ── Empty State ── */

function EmptyState() {
  return (
    <div className="col-span-full flex flex-col items-center justify-center py-20 text-center">
      <div className="w-16 h-16 rounded-full bg-surface-container-highest/50 flex items-center justify-center mb-4">
        <MdTrendingUp className="text-3xl text-slate-500" />
      </div>
      <h3 className="text-lg font-bold text-slate-300 mb-2 font-headline">
        No Active Signals
      </h3>
      <p className="text-sm text-slate-500 max-w-sm">
        There are currently no trading signals available. Check back later or
        adjust your filters.
      </p>
    </div>
  );
}

/* ── Signal Card ── */

function SignalCard({
  signal,
  onExecute,
}: {
  signal: Signal;
  onExecute: (signal: Signal) => void;
}) {
  const isLong = signal.tradeType === "BUY";
  const pnlPositive = (signal.pnl7d ?? 0) >= 0;

  return (
    <div className="rounded-xl border border-white/5 bg-surface-container-low card-glow overflow-hidden">
      {/* ─ Header: Avatar + Name + Star ─ */}
      <div className="px-5 pt-5 pb-3 flex items-center gap-3">
        {/* Avatar */}
        <div className="w-10 h-10 rounded-full bg-surface-container-highest flex items-center justify-center text-sm font-bold text-primary shrink-0 border border-white/10">
          {(signal.trader ?? signal.pair)?.[0]?.toUpperCase() ?? "?"}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <p className="font-bold text-sm text-slate-100 truncate font-headline">
              {signal.trader ?? "Unknown Trader"}
            </p>
            <span className="inline-flex items-center text-[9px] font-bold px-1.5 py-0.5 rounded bg-surface-container-highest/60 text-slate-400 uppercase tracking-wider shrink-0">
              {signal.tier ?? "API"}
            </span>
          </div>
          <div className="flex items-center gap-2 mt-0.5">
            <MdPeople className="text-xs text-slate-500" />
            <span className="text-[10px] text-slate-500">
              {formatCopiers(signal.copiers)} / 500
            </span>
          </div>
        </div>

        <MdStar className="text-lg text-slate-600 hover:text-yellow-500 cursor-pointer transition-colors shrink-0" />
      </div>

      {/* ─ PNL Section ─ */}
      <div className="px-5 pb-3">
        <p className="text-[10px] text-slate-500 uppercase tracking-wider mb-1">
          7D PNL (USDT)
        </p>
        <div className="flex items-end justify-between">
          <div>
            <p
              className={`text-xl font-bold font-mono tracking-tight ${
                pnlPositive ? "text-secondary" : "text-tertiary"
              }`}
            >
              {pnlPositive ? "+" : ""}
              {formatNumber(signal.pnl7d)}
            </p>
            <p
              className={`text-[11px] font-mono mt-0.5 ${
                pnlPositive ? "text-secondary/70" : "text-tertiary/70"
              }`}
            >
              ROI {pnlPositive ? "+" : ""}
              {signal.roi30d?.toFixed(2) ?? "0.00"}%
            </p>
          </div>
          {/* Mini chart placeholder — CSS gradient wave */}
          <div className="w-20 h-10 relative overflow-hidden rounded">
            <svg viewBox="0 0 80 40" className="w-full h-full" preserveAspectRatio="none">
              <defs>
                <linearGradient id={`grad-${signal._id}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={pnlPositive ? "#4edea3" : "#ffb2b9"} stopOpacity="0.3" />
                  <stop offset="100%" stopColor={pnlPositive ? "#4edea3" : "#ffb2b9"} stopOpacity="0" />
                </linearGradient>
              </defs>
              <path
                d={
                  pnlPositive
                    ? "M0,30 Q10,28 15,25 T30,20 T45,15 T60,12 T80,5 V40 H0 Z"
                    : "M0,10 Q10,12 15,18 T30,22 T45,28 T60,30 T80,35 V40 H0 Z"
                }
                fill={`url(#grad-${signal._id})`}
              />
              <path
                d={
                  pnlPositive
                    ? "M0,30 Q10,28 15,25 T30,20 T45,15 T60,12 T80,5"
                    : "M0,10 Q10,12 15,18 T30,22 T45,28 T60,30 T80,35"
                }
                fill="none"
                stroke={pnlPositive ? "#4edea3" : "#ffb2b9"}
                strokeWidth="1.5"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* ─ Stats Row ─ */}
      <div className="px-5 py-3 grid grid-cols-3 gap-3 border-t border-white/5">
        <div>
          <p className="text-[9px] text-slate-500 uppercase tracking-wider">AUM (USDT)</p>
          <p className="text-xs font-bold font-mono text-slate-200 mt-0.5">
            {formatNumber(signal.aum)}
          </p>
        </div>
        <div>
          <p className="text-[9px] text-slate-500 uppercase tracking-wider">7D MDD</p>
          <p className="text-xs font-bold font-mono text-tertiary mt-0.5">
            {signal.maxDrawdown?.toFixed(1) ?? "—"}%
          </p>
        </div>
        <div>
          <p className="text-[9px] text-slate-500 uppercase tracking-wider">Sharpe Ratio</p>
          <p className="text-xs font-bold font-mono text-slate-200 mt-0.5">
            {signal.sharpeRatio?.toFixed(2) ?? "—"}
          </p>
        </div>
      </div>

      {/* ─ Pair + Position + Win Rate ─ */}
      <div className="px-5 py-3 border-t border-white/5 flex flex-wrap items-center justify-between gap-2">
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="font-bold text-sm text-slate-100 font-headline">
            {signal.pair}
          </span>
          {signal.leverage && (
            <span className="text-[10px] text-slate-500 px-1.5 py-0.5 bg-surface-container rounded font-mono">
              {signal.leverage}
            </span>
          )}
          <span
            className={`inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded ${
              isLong
                ? "bg-secondary/15 text-secondary border border-secondary/20"
                : "bg-tertiary/15 text-tertiary border border-tertiary/20"
            }`}
          >
            {isLong ? <MdTrendingUp size={11} /> : <MdTrendingDown size={11} />}
            {isLong ? "LONG" : "SHORT"}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-14 h-1.5 rounded-full bg-surface-container-highest overflow-hidden">
            <div
              className="h-full rounded-full bg-secondary"
              style={{ width: `${Math.min(signal.winRate ?? 0, 100)}%` }}
            />
          </div>
          <span className="text-[10px] font-mono font-bold text-secondary">
            {signal.winRate?.toFixed(0) ?? "—"}%
          </span>
        </div>
      </div>

      {/* ─ Action Buttons ─ */}
      <div className="px-5 pb-5 pt-2 flex gap-2">
        <button className="flex-1 py-2.5 rounded-lg bg-surface-container-high hover:bg-surface-container-highest text-slate-300 font-bold text-xs uppercase tracking-wider transition-all border border-white/5">
          Mock
        </button>
        <button
          onClick={() => onExecute(signal)}
          className="flex-1 py-2.5 rounded-lg button-gradient text-on-secondary font-bold text-xs uppercase tracking-wider transition-all hover:opacity-90 active:scale-[0.98]"
        >
          Copy
        </button>
      </div>
    </div>
  );
}

/* ── Main Component ── */

interface SignalGridProps {
  onExecute: (signal: any) => void;
  signals?: Signal[];
  loading?: boolean;
  error?: string | null;
}

export default function SignalGrid({
  onExecute,
  signals,
  loading = false,
  error = null,
}: SignalGridProps) {
  const displaySignals = signals && signals.length > 0 ? signals : (!loading && !error ? FALLBACK_SIGNALS : []);

  return (
    <div className="p-3 md:p-5">
      {/* Error banner */}
      {error && (
        <div className="mb-4 px-4 py-3 rounded-lg bg-tertiary/10 border border-tertiary/20 text-tertiary text-sm">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {loading ? (
          <>
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <SkeletonCard key={i} />
            ))}
          </>
        ) : displaySignals.length > 0 ? (
          displaySignals.map((signal) => (
            <SignalCard
              key={signal._id}
              signal={signal}
              onExecute={onExecute}
            />
          ))
        ) : (
          <EmptyState />
        )}
      </div>
    </div>
  );
}
