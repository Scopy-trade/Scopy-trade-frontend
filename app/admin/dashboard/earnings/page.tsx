"use client";

import { useState } from "react";

const LEDGER_ROWS = [
  {
    date: "Mar 28, 2024",
    time: "14:22:10 UTC",
    trader: "Alpha_Quant",
    initials: "AQ",
    pair: "BTC/USDT",
    direction: "LONG 10x",
    directionPositive: true,
    signalId: "#SIG-92841",
    followerProfit: "$12,450.00",
    commission: "+$2,490.00",
    status: "Settled",
  },
  {
    date: "Mar 28, 2024",
    time: "12:15:45 UTC",
    trader: "CryptoNexus",
    initials: "CN",
    pair: "ETH/USDT",
    direction: "LONG 5x",
    directionPositive: true,
    signalId: "#SIG-92839",
    followerProfit: "$3,120.50",
    commission: "+$624.10",
    status: "Settled",
  },
  {
    date: "Mar 28, 2024",
    time: "09:02:11 UTC",
    trader: "SolanaWhale",
    initials: "SW",
    pair: "SOL/USDT",
    direction: "SHORT 20x",
    directionPositive: false,
    signalId: "#SIG-92812",
    followerProfit: "$45,210.00",
    commission: "+$9,042.00",
    status: "Settled",
  },
  {
    date: "Mar 27, 2024",
    time: "22:45:00 UTC",
    trader: "BullMarketOnly",
    initials: "BM",
    pair: "BTC/USDT",
    direction: "LONG 25x",
    directionPositive: true,
    signalId: "#SIG-92790",
    followerProfit: "$1,200.00",
    commission: "+$240.00",
    status: "Settled",
  },
];

const CHART_BARS = [40, 55, 45, 65, 80, 50, 60, 95, 70, 75, 55, 45, 85, 60];

const INITIALS_COLORS: Record<number, string> = {
  0: "bg-[#002371]/40 text-[#b6c4ff]",
  1: "bg-[#00311f]/40 text-[#4edea3]",
  2: "bg-[#5d001b]/30 text-[#ffb2b9]",
  3: "bg-[#002371]/40 text-[#b6c4ff]",
};

export default function EarningsDashboardPage() {
  const [hoveredBar, setHoveredBar] = useState<number | null>(null);

  const BAR_TOOLTIPS = [
    "$3.8k",
    "$5.1k",
    "$4.4k",
    "$6.2k",
    "$7.9k",
    "$4.8k",
    "$5.7k",
    "$9.3k",
    "$6.8k",
    "$7.2k",
    "$5.2k",
    "$4.3k",
    "$8.1k",
    "$5.7k",
  ];

  return (
    <div className="space-y-6 sm:space-y-8 max-w-[1600px] mx-auto">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-[#dae2fd] font-[Manrope,sans-serif] tracking-tight">
            Revenue Console
          </h2>
          <p className="text-xs text-[#8f9098] mt-1">
            Platform performance and 20% commission attribution.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="px-3 py-2 bg-[#131b2e] border border-white/5 rounded-xl text-[10px] font-semibold text-[#8f9098] uppercase tracking-widest">
            MAR 01 – MAR 31, 2024
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-[#222a3d] hover:bg-[#2d3449] border border-white/5 transition-colors rounded-xl text-sm font-medium text-[#dae2fd]">
            <span className="material-symbols-outlined text-sm">download</span>
            Export Report
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        {/* Total Platform Revenue */}
        <div className="bg-[#131b2e] border border-white/5 rounded-2xl p-6 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-40 h-40 bg-[#4edea3]/5 blur-3xl rounded-full -mr-10 -mt-10 group-hover:bg-[#4edea3]/10 transition-colors pointer-events-none" />
          <div className="flex items-center justify-between mb-4">
            <p className="text-[10px] text-[#8f9098] font-bold uppercase tracking-widest">
              Total Platform Revenue
            </p>
            <span
              className="material-symbols-outlined text-[#4edea3]"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              payments
            </span>
          </div>
          <h3 className="text-3xl font-black font-[Manrope,sans-serif] text-[#dae2fd]">
            $142,804.22
          </h3>
          <div className="flex items-center gap-1.5 text-[#4edea3] text-xs font-bold mt-1">
            <span className="material-symbols-outlined text-xs">
              trending_up
            </span>
            +12.4% vs last month
          </div>
          <div className="mt-5 pt-5 border-t border-white/5">
            <p className="text-[9px] text-[#8f9098] uppercase tracking-widest font-bold">
              Accumulated 20% Commission
            </p>
          </div>
        </div>

        {/* Total Copied Volume */}
        <div className="bg-[#131b2e] border border-white/5 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <p className="text-[10px] text-[#8f9098] font-bold uppercase tracking-widest">
              Total Copied Volume
            </p>
            <span className="material-symbols-outlined text-[#8f9098]">
              monitoring
            </span>
          </div>
          <h3 className="text-3xl font-black font-[Manrope,sans-serif] text-[#dae2fd]">
            $2.48M
          </h3>
          <div className="flex items-center gap-1.5 text-[#8f9098] text-xs font-bold mt-1">
            <span className="material-symbols-outlined text-xs">sync</span>
            Across 1,420 active copy-traders
          </div>
          <div className="mt-5">
            <div className="w-full h-1.5 bg-[#060e20] rounded-full overflow-hidden">
              <div className="h-full w-3/4 bg-gradient-to-r from-[#b6c4ff] to-[#4edea3] rounded-full" />
            </div>
          </div>
        </div>

        {/* Avg Commission per Trade */}
        <div className="bg-[#131b2e] border border-white/5 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <p className="text-[10px] text-[#8f9098] font-bold uppercase tracking-widest">
              Avg. Commission / Trade
            </p>
            <span className="material-symbols-outlined text-[#8f9098]">
              analytics
            </span>
          </div>
          <h3 className="text-3xl font-black font-[Manrope,sans-serif] text-[#dae2fd]">
            $64.12
          </h3>
          <div className="flex items-center gap-1.5 text-[#ec667a] text-xs font-bold mt-1">
            <span className="material-symbols-outlined text-xs">
              trending_flat
            </span>
            Stable performance delta
          </div>
          {/* Mini sparkline bars */}
          <div className="mt-5 flex items-end gap-1 h-10">
            {[40, 65, 30, 80, 55, 90].map((h, i) => (
              <div
                key={i}
                className="flex-1 rounded-sm bg-[#4edea3]/20"
                style={{ height: `${h}%` }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Revenue Trend Chart */}
      <div className="bg-[#131b2e] border border-white/5 rounded-2xl p-6 sm:p-8 relative overflow-hidden">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h4 className="text-base font-bold font-[Manrope,sans-serif] text-[#dae2fd]">
              Revenue Trends (30D)
            </h4>
            <p className="text-xs text-[#8f9098] mt-0.5">
              Visualizing the platform&apos;s 20% cut across all pools.
            </p>
          </div>
          <div className="flex gap-2">
            <button className="px-3 py-1 text-[10px] font-black text-[#4edea3] bg-[#4edea3]/10 border border-[#4edea3]/20 rounded-full uppercase tracking-wider">
              Commission
            </button>
            <button className="px-3 py-1 text-[10px] font-bold text-[#8f9098] hover:text-[#dae2fd] transition-colors uppercase tracking-wider">
              Volume
            </button>
          </div>
        </div>

        <div className="h-56 w-full flex items-end justify-between gap-1.5 relative">
          {/* Grid lines */}
          <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="w-full border-t border-white/5" />
            ))}
          </div>

          {CHART_BARS.map((h, i) => (
            <div
              key={i}
              className="flex-1 relative group cursor-pointer"
              style={{ height: "100%" }}
              onMouseEnter={() => setHoveredBar(i)}
              onMouseLeave={() => setHoveredBar(null)}
            >
              {hoveredBar === i && (
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-[#222a3d] border border-white/10 px-2 py-1 rounded-lg text-[10px] text-[#dae2fd] whitespace-nowrap z-10 shadow-lg">
                  {BAR_TOOLTIPS[i]}
                </div>
              )}
              <div
                className={`w-full rounded-t-lg absolute bottom-0 transition-all duration-150 ${
                  hoveredBar === i
                    ? "bg-[#4edea3]/60"
                    : h >= 85
                      ? "bg-[#4edea3]/50"
                      : h >= 65
                        ? "bg-[#4edea3]/30"
                        : "bg-[#4edea3]/20"
                }`}
                style={{ height: `${h}%` }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Commission Ledger */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-base font-bold font-[Manrope,sans-serif] text-[#dae2fd]">
              Commission Ledger
            </h4>
            <p className="text-xs text-[#8f9098] mt-0.5">
              Displaying latest 50 settlements
            </p>
          </div>
          <button className="flex items-center gap-1.5 px-3 py-2 bg-[#171f33] border border-white/5 rounded-xl text-[#8f9098] hover:text-[#dae2fd] transition-colors text-xs font-semibold">
            <span className="material-symbols-outlined text-base">
              filter_list
            </span>
            <span className="hidden sm:inline">Filter</span>
          </button>
        </div>

        <div className="bg-[#131b2e] border border-white/5 rounded-2xl overflow-hidden shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left min-w-[700px]">
              <thead>
                <tr className="bg-[#171f33]/60 text-[9px] uppercase tracking-[0.15em] text-[#8f9098] font-bold border-b border-white/5">
                  <th className="px-6 py-5">Timestamp</th>
                  <th className="px-6 py-5">Pro Trader</th>
                  <th className="px-6 py-5">Trading Pair</th>
                  <th className="px-6 py-5">Signal ID</th>
                  <th className="px-6 py-5">Total Follower Profit</th>
                  <th className="px-6 py-5 text-right">
                    SCopyTrade Commission (20%)
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {LEDGER_ROWS.map((row, i) => (
                  <tr
                    key={row.signalId}
                    className="hover:bg-[#171f33]/40 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <p className="text-sm font-medium text-[#dae2fd]">
                        {row.date}
                      </p>
                      <p className="text-[10px] text-[#8f9098]">{row.time}</p>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-black flex-shrink-0 ${INITIALS_COLORS[i % 4]}`}
                        >
                          {row.initials}
                        </div>
                        <span className="text-sm font-bold text-[#dae2fd]">
                          {row.trader}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-1 bg-[#060e20] text-[10px] font-black rounded-lg border border-white/5 text-[#dae2fd]">
                          {row.pair}
                        </span>
                        <span
                          className={`text-[10px] font-bold ${row.directionPositive ? "text-[#4edea3]" : "text-[#ffb2b9]"}`}
                        >
                          {row.direction}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-mono text-xs text-[#8f9098]">
                        {row.signalId}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm font-bold text-[#dae2fd]">
                        {row.followerProfit}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <p className="text-sm font-black text-[#4edea3]">
                        {row.commission}
                      </p>
                      <p className="text-[9px] text-[#8f9098] uppercase">
                        {row.status}
                      </p>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination footer */}
          <div className="px-6 py-4 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-3">
            <span className="text-xs text-[#8f9098]">
              Showing <span className="text-[#dae2fd] font-bold">1–4</span> of{" "}
              <span className="text-[#dae2fd] font-bold">50</span> settlements
            </span>
            <div className="flex items-center gap-1">
              <button
                disabled
                className="p-1.5 text-[#8f9098] disabled:opacity-30"
              >
                <span className="material-symbols-outlined text-lg">
                  chevron_left
                </span>
              </button>
              {[1, 2, 3].map((n) => (
                <button
                  key={n}
                  className={`w-8 h-8 flex items-center justify-center text-xs font-bold rounded-lg transition-colors ${
                    n === 1
                      ? "bg-[#4edea3] text-[#003824]"
                      : "text-[#8f9098] hover:bg-[#171f33]"
                  }`}
                >
                  {n}
                </button>
              ))}
              <button className="p-1.5 text-[#8f9098] hover:text-[#4edea3] transition-colors">
                <span className="material-symbols-outlined text-lg">
                  chevron_right
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
