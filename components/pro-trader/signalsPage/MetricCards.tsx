"use client";

import { SignalInterface } from "@/lib";
import { MdTrendingUp, MdCheckCircle, MdError } from "react-icons/md";

interface MetricCardsProps {
  signals: SignalInterface[];
}

export default function MetricCards({ signals }: MetricCardsProps) {
  const totalSignals = signals.length;
  const successfulSignals = signals.filter((s) => s.result === "profit").length;
  const failedSignals = signals.filter((s) => s.result === "loss").length;
  const breakEvenSignals = signals.filter(
    (s) => s.result === "breakeven",
  ).length;

  const winRate =
    totalSignals > 0 ? (successfulSignals / totalSignals) * 100 : 0;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
      {/* Total Signals */}
      <div className="bg-surface-container rounded-2xl p-6 border border-white/5">
        <div className="flex items-center justify-between mb-4">
          <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center">
            <MdTrendingUp className="text-2xl text-secondary" />
          </div>
          <span className="text-3xl font-black text-on-surface">
            {totalSignals}
          </span>
        </div>
        <h3 className="text-sm font-medium text-on-surface-variant">
          Total Signals
        </h3>
        <p className="text-xs text-on-surface-variant/60 mt-1">
          All time published
        </p>
      </div>

      {/* Win Rate */}
      <div className="bg-surface-container rounded-2xl p-6 border border-white/5">
        <div className="flex items-center justify-between mb-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center">
            <MdCheckCircle className="text-2xl text-emerald-400" />
          </div>
          <span className="text-3xl font-black text-on-surface">
            {winRate.toFixed(1)}%
          </span>
        </div>
        <h3 className="text-sm font-medium text-on-surface-variant">
          Win Rate
        </h3>
        <p className="text-xs text-on-surface-variant/60 mt-1">
          Successful signals
        </p>
      </div>

      {/* Successful */}
      <div className="bg-surface-container rounded-2xl p-6 border border-white/5">
        <div className="flex items-center justify-between mb-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center">
            <MdCheckCircle className="text-2xl text-emerald-400" />
          </div>
          <span className="text-3xl font-black text-on-surface">
            {successfulSignals}
          </span>
        </div>
        <h3 className="text-sm font-medium text-on-surface-variant">
          Successful
        </h3>
        <p className="text-xs text-on-surface-variant/60 mt-1">+ PnL signals</p>
      </div>

      {/* Failed */}
      <div className="bg-surface-container rounded-2xl p-6 border border-white/5">
        <div className="flex items-center justify-between mb-4">
          <div className="w-12 h-12 rounded-xl bg-rose-500/10 flex items-center justify-center">
            <MdError className="text-2xl text-rose-400" />
          </div>
          <span className="text-3xl font-black text-on-surface">
            {failedSignals}
          </span>
        </div>
        <h3 className="text-sm font-medium text-on-surface-variant">Failed</h3>
        <p className="text-xs text-on-surface-variant/60 mt-1">- PnL signals</p>
      </div>
    </div>
  );
}
