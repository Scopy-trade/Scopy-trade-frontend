"use client";

import { MdTrendingUp, MdTrendingDown } from "react-icons/md";

const signals = [
  {
    id: "SL-9942",
    trader: "Vector Quant",
    tier: "ELITE TIER",
    followers: "8.4k",
    successRatio: "92.4%",
    pair: "BTC/USDT",
    position: "LONG",
    leverage: "20x",
    entryPrice: "64,281.50",
    target: "68,400.00",
    stopLoss: "62,100.00",
    time: "2m ago",
    status: "ACTIVE",
  },
  {
    id: "SL-9901",
    trader: "Elena Volkov",
    tier: "Indices Specialist",
    followers: "3.1k",
    successRatio: "87.5%",
    pair: "NDX/USD",
    position: "SHORT",
    leverage: "10x",
    entryPrice: "19,200.00",
    target: "18,500.00",
    stopLoss: "19,600.00",
    time: "15m ago",
    status: "ACTIVE",
  },
  {
    id: "SL-9887",
    trader: "Julian Thorne",
    tier: "Crypto Volatility",
    followers: "2.7k",
    successRatio: "81.2%",
    pair: "ETH/USDT",
    position: "LONG",
    leverage: "15x",
    entryPrice: "3,450.00",
    target: "3,900.00",
    stopLoss: "3,200.00",
    time: "1h ago",
    status: "ACTIVE",
  },
  {
    id: "SL-9871",
    trader: "Luna Apex",
    tier: "FOREX MASTER",
    followers: "5.2k",
    successRatio: "89.0%",
    pair: "GBP/JPY",
    position: "LONG",
    leverage: "5x",
    entryPrice: "189.50",
    target: "193.00",
    stopLoss: "187.00",
    time: "3h ago",
    status: "ACTIVE",
  },
  {
    id: "SL-9855",
    trader: "S. K. Capital",
    tier: "PRO TIER",
    followers: "1.9k",
    successRatio: "79.8%",
    pair: "SOL/USDT",
    position: "LONG",
    leverage: "8x",
    entryPrice: "142.10",
    target: "158.00",
    stopLoss: "135.00",
    time: "5h ago",
    status: "WAITING",
  },
  {
    id: "SL-9841",
    trader: "Neon Alpha",
    tier: "RISING STAR",
    followers: "890",
    successRatio: "82.1%",
    pair: "GOLD/USD",
    position: "SHORT",
    leverage: "3x",
    entryPrice: "2,310.00",
    target: "2,250.00",
    stopLoss: "2,340.00",
    time: "12h ago",
    status: "WAITING",
  },
];

interface SignalGridProps {
  onExecute: (signal: any) => void;
}

export default function SignalGrid({ onExecute }: SignalGridProps) {
  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full text-left text-sm whitespace-nowrap">
        <thead className="bg-surface-container-highest/50 text-slate-400 text-xs uppercase tracking-wider sticky top-0 z-10">
          <tr>
            <th className="px-4 py-3 font-medium border-b border-white/5">Time</th>
            <th className="px-4 py-3 font-medium border-b border-white/5">Pair</th>
            <th className="px-4 py-3 font-medium border-b border-white/5">Trader</th>
            <th className="px-4 py-3 font-medium border-b border-white/5">Type</th>
            <th className="px-4 py-3 font-medium border-b border-white/5 text-right">Entry</th>
            <th className="px-4 py-3 font-medium border-b border-white/5 text-right">Target</th>
            <th className="px-4 py-3 font-medium border-b border-white/5 text-right">Stop Loss</th>
            <th className="px-4 py-3 font-medium border-b border-white/5 text-right">Win Rate</th>
            <th className="px-4 py-3 font-medium border-b border-white/5 text-center">Action</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/5 text-slate-200">
          {signals.map((signal) => {
            const isLong = signal.position === "LONG";
            const posColor = isLong ? "text-secondary" : "text-tertiary";
            const bgPosColor = isLong ? "bg-secondary/10" : "bg-tertiary/10";
            const borderPosColor = isLong ? "border-secondary/20" : "border-tertiary/20";
            const Icon = isLong ? MdTrendingUp : MdTrendingDown;

            return (
              <tr
                key={signal.id}
                className="hover:bg-surface-container/80 transition-colors group"
              >
                <td className="px-4 py-3 text-xs text-slate-500">
                  {signal.time}
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2 font-bold font-headline">
                    <span>{signal.pair}</span>
                    <span className="text-xs text-slate-500 px-1 bg-surface-container rounded">
                      {signal.leverage}
                    </span>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded bg-surface-container-highest flex items-center justify-center text-xs font-bold text-primary">
                      {signal.trader[0]}
                    </div>
                    <div>
                      <p className="font-bold text-sm leading-tight">{signal.trader}</p>
                      <p className="text-[10px] text-slate-400 uppercase tracking-wide">
                        {signal.tier}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <div className={`flex items-center gap-1 text-xs font-bold px-2 py-1 rounded border w-min ${bgPosColor} ${posColor} ${borderPosColor}`}>
                    <Icon size={14} />
                    {signal.position}
                  </div>
                </td>
                <td className="px-4 py-3 text-right font-mono text-sm">
                  ${signal.entryPrice}
                </td>
                <td className="px-4 py-3 text-right font-mono text-sm text-secondary">
                  ${signal.target}
                </td>
                <td className="px-4 py-3 text-right font-mono text-sm text-tertiary">
                  ${signal.stopLoss}
                </td>
                <td className="px-4 py-3 text-right font-mono text-sm">
                  {signal.successRatio}
                </td>
                <td className="px-4 py-3 text-center">
                  <button
                    onClick={() => onExecute(signal)}
                    className="px-4 py-1.5 rounded bg-surface-container-high hover:bg-primary/20 text-primary border border-white/5 hover:border-primary/30 transition-all font-bold text-xs uppercase tracking-wider"
                  >
                    Execute
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
