"use client";

import { useState } from "react";

type SignalStatus = "Live" | "Closed";

interface Signal {
  id: string;
  trader: string;
  traderInitials?: string;
  asset: string;
  assetSymbol: string;
  status: SignalStatus;
  result?: string;
  resultPositive?: boolean;
  copyVolume: string;
}

const SIGNALS: Signal[] = [
  {
    id: "SIG-8821-X",
    trader: "Marcus Volt",
    traderInitials: "MV",
    asset: "BTC/USDT",
    assetSymbol: "₿",
    status: "Live",
    copyVolume: "$1,240,500",
  },
  {
    id: "SIG-7740-L",
    trader: "Sarah Chen",
    traderInitials: "SC",
    asset: "ETH/USDT",
    assetSymbol: "Ξ",
    status: "Closed",
    result: "+4.82%",
    resultPositive: true,
    copyVolume: "$842,000",
  },
  {
    id: "SIG-9012-K",
    trader: "Alex Rivers",
    traderInitials: "AR",
    asset: "SOL/USDT",
    assetSymbol: "◎",
    status: "Live",
    copyVolume: "$2,105,400",
  },
  {
    id: "SIG-8129-F",
    trader: "Elena J.",
    traderInitials: "EJ",
    asset: "AAPL/USD",
    assetSymbol: "A",
    status: "Closed",
    result: "-1.20%",
    resultPositive: false,
    copyVolume: "$312,500",
  },
  {
    id: "SIG-6634-R",
    trader: "Sasha Knight",
    traderInitials: "SK",
    asset: "XRP/USDT",
    assetSymbol: "✕",
    status: "Live",
    copyVolume: "$980,200",
  },
  {
    id: "SIG-5501-M",
    trader: "Marcus Volt",
    traderInitials: "MV",
    asset: "MATIC/USDT",
    assetSymbol: "M",
    status: "Closed",
    result: "+2.14%",
    resultPositive: true,
    copyVolume: "$421,000",
  },
];

const BAR_HEIGHTS = [40, 65, 100, 30, 45, 25, 55, 20, 35, 50, 15, 40];
const BAR_LABELS = [
  "BTC: $2.4M",
  "ETH: $3.8M",
  "SOL: $5.1M",
  "XRP: $1.2M",
  "BNB: $1.9M",
  "ADA: $0.9M",
  "MATIC: $2.1M",
  "DOT: $0.7M",
  "LINK: $1.4M",
  "AVAX: $1.8M",
  "DOGE: $0.5M",
  "UNI: $1.2M",
];

type FilterTab = "All" | "Live" | "Closed";

const initialsColor: Record<number, string> = {
  0: "bg-[#002371]/30 text-[#b6c4ff]",
  1: "bg-[#00311f]/30 text-[#4edea3]",
  2: "bg-[#5d001b]/20 text-[#ffb2b9]",
  3: "bg-[#002371]/30 text-[#b6c4ff]",
  4: "bg-[#00311f]/30 text-[#4edea3]",
  5: "bg-[#002371]/30 text-[#b6c4ff]",
};

export default function SignalsPage() {
  const [tab, setTab] = useState<FilterTab>("All");
  const [hoveredBar, setHoveredBar] = useState<number | null>(null);

  const filtered = SIGNALS.filter((s) => {
    if (tab === "All") return true;
    return s.status === tab;
  });

  return (
    <div className="space-y-6 sm:space-y-8 max-w-[1600px] mx-auto">
      {/* Heading */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-[#dae2fd] font-[Manrope,sans-serif]">
            Signal Governance
          </h2>
          <p className="text-xs text-[#8f9098] mt-1">
            Real-time audit of all generated trade signals
          </p>
        </div>
        <button className="self-start sm:self-auto flex items-center gap-2 px-4 py-2.5 bg-[#4edea3] text-[#003824] text-xs font-black rounded-xl hover:opacity-90 transition-all shadow-xl shadow-[#4edea3]/10">
          <span className="material-symbols-outlined text-base">download</span>
          Export CSV
        </button>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {[
          {
            label: "Total Signals",
            value: "14,282",
            sub: "↑ +12% this week",
            subColor: "text-[#4edea3]",
            icon: "ssid_chart",
          },
          {
            label: "Live Now",
            value: "1,842",
            sub: "Active across all pairs",
            subColor: "text-[#4edea3]",
            icon: "sensors",
            pulse: true,
          },
          {
            label: "Global Copy Volume",
            value: "$8.2M",
            sub: "USD / 24H",
            subColor: "text-[#8f9098]",
            icon: "monitoring",
          },
          {
            label: "Platform Health",
            value: "99.9%",
            sub: "All systems nominal",
            subColor: "text-[#4edea3]",
            icon: "verified",
          },
        ].map((s) => (
          <div
            key={s.label}
            className="bg-[#131b2e] border border-white/5 p-4 sm:p-6 rounded-2xl relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
              <span className="material-symbols-outlined text-4xl text-[#dae2fd]">
                {s.icon}
              </span>
            </div>
            <p className="text-[9px] text-[#8f9098] font-bold tracking-widest uppercase">
              {s.label}
            </p>
            <div className="flex items-end gap-2 mt-2">
              <h3
                className={`text-2xl sm:text-3xl font-black font-[Manrope,sans-serif] ${s.pulse ? "text-[#4edea3]" : "text-[#dae2fd]"}`}
              >
                {s.value}
              </h3>
              {s.pulse && (
                <span className="mb-1 w-2 h-2 rounded-full bg-[#4edea3] animate-pulse" />
              )}
            </div>
            <p className={`text-[10px] mt-1 ${s.subColor}`}>{s.sub}</p>
          </div>
        ))}
      </div>

      {/* Governance Ledger Table */}
      <div className="bg-[#131b2e] border border-white/5 rounded-2xl overflow-hidden shadow-2xl">
        {/* Table header controls */}
        <div className="p-4 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-white/5">
          <div>
            <h3 className="text-base font-bold text-[#dae2fd] font-[Manrope,sans-serif]">
              Governance Ledger
            </h3>
            <p className="text-xs text-[#8f9098] mt-0.5">
              Showing {filtered.length} of 14,282 signals
            </p>
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            {/* Filter tabs */}
            <div className="flex items-center gap-1 bg-[#060e20] p-1 rounded-xl">
              {(["All", "Live", "Closed"] as FilterTab[]).map((f) => (
                <button
                  key={f}
                  onClick={() => setTab(f)}
                  className={`px-3 py-1.5 text-[11px] font-bold rounded-lg transition-all ${
                    tab === f
                      ? "bg-[#4edea3] text-[#003824] shadow-lg"
                      : "text-[#8f9098] hover:text-[#dae2fd]"
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
            <button className="flex items-center gap-1.5 px-3 py-2 bg-[#171f33] border border-white/5 text-[#c5c6ce] text-xs font-semibold rounded-xl hover:bg-[#222a3d] transition-all">
              <span className="material-symbols-outlined text-base">
                filter_list
              </span>
              <span className="hidden sm:inline">Filter</span>
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left min-w-[640px]">
            <thead>
              <tr className="bg-[#171f33]/60 text-[9px] uppercase tracking-[0.15em] text-[#8f9098] font-bold border-b border-white/5">
                <th className="px-4 sm:px-6 py-4">Signal ID</th>
                <th className="px-4 sm:px-6 py-4">Pro Trader</th>
                <th className="px-4 sm:px-6 py-4">Asset</th>
                <th className="px-4 sm:px-6 py-4">Status</th>
                <th className="px-4 sm:px-6 py-4">Result</th>
                <th className="px-4 sm:px-6 py-4 text-right">Copy Volume</th>
                <th className="px-4 sm:px-6 py-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filtered.map((sig, i) => (
                <tr
                  key={sig.id}
                  className="hover:bg-[#171f33]/40 transition-colors group"
                >
                  {/* Signal ID */}
                  <td className="px-4 sm:px-6 py-4">
                    <span className="font-mono text-xs text-[#8f9098]">
                      {sig.id}
                    </span>
                  </td>

                  {/* Trader */}
                  <td className="px-4 sm:px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-black flex-shrink-0 ${initialsColor[i % 6]}`}
                      >
                        {sig.traderInitials}
                      </div>
                      <span className="text-sm font-bold text-[#dae2fd] group-hover:text-[#4edea3] transition-colors">
                        {sig.trader}
                      </span>
                    </div>
                  </td>

                  {/* Asset */}
                  <td className="px-4 sm:px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-[#171f33] border border-white/5 flex items-center justify-center text-[10px] font-black text-[#4edea3]">
                        {sig.assetSymbol}
                      </div>
                      <span className="text-sm font-medium text-[#dae2fd]">
                        {sig.asset}
                      </span>
                    </div>
                  </td>

                  {/* Status */}
                  <td className="px-4 sm:px-6 py-4">
                    {sig.status === "Live" ? (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#4edea3]/10 text-[#4edea3] text-[10px] font-black uppercase border border-[#4edea3]/20">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#4edea3] animate-pulse" />
                        Live
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-[#171f33] text-[#8f9098] text-[10px] font-black uppercase border border-white/5">
                        Closed
                      </span>
                    )}
                  </td>

                  {/* Result */}
                  <td className="px-4 sm:px-6 py-4">
                    {sig.result ? (
                      <span
                        className={`text-sm font-bold ${sig.resultPositive ? "text-[#4edea3]" : "text-[#ffb2b9]"}`}
                      >
                        {sig.result}
                      </span>
                    ) : (
                      <span className="text-[#44474d] text-sm">—</span>
                    )}
                  </td>

                  {/* Copy Volume */}
                  <td className="px-4 sm:px-6 py-4 text-right">
                    <span
                      className={`font-mono text-sm font-bold ${sig.status === "Live" ? "text-[#4edea3]" : "text-[#8f9098]"}`}
                    >
                      {sig.copyVolume}
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="px-4 sm:px-6 py-4">
                    <div className="flex items-center justify-center gap-1.5">
                      <button
                        title="View signal"
                        className="p-1.5 hover:bg-[#171f33] rounded-lg text-[#8f9098] hover:text-[#b6c4ff] transition-all"
                      >
                        <span className="material-symbols-outlined text-lg">
                          open_in_new
                        </span>
                      </button>
                      {sig.status === "Live" && (
                        <button
                          title="Halt signal"
                          className="p-1.5 hover:bg-[#93000a]/20 rounded-lg text-[#8f9098] hover:text-[#ffb4ab] transition-all"
                        >
                          <span className="material-symbols-outlined text-lg">
                            pause_circle
                          </span>
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filtered.length === 0 && (
            <div className="py-16 text-center">
              <span className="material-symbols-outlined text-4xl text-[#44474d]">
                ssid_chart
              </span>
              <p className="text-sm text-[#8f9098] mt-3">No signals found.</p>
            </div>
          )}
        </div>

        {/* Pagination */}
        <div className="px-4 sm:px-6 py-4 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-[#8f9098]">
            Showing <span className="text-[#dae2fd] font-bold">1–10</span> of{" "}
            <span className="text-[#dae2fd] font-bold">14,282</span> signals
          </p>
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
            <span className="text-[#44474d] px-1 text-xs">...</span>
            <button className="w-8 h-8 flex items-center justify-center text-xs font-bold rounded-lg text-[#8f9098] hover:bg-[#171f33] transition-colors">
              1429
            </button>
            <button className="p-1.5 text-[#8f9098] hover:text-[#4edea3] transition-colors">
              <span className="material-symbols-outlined text-lg">
                chevron_right
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Bottom row — Volume Chart + Security Pulse */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Volume Chart */}
        <div className="lg:col-span-2 bg-[#131b2e] border border-white/5 rounded-2xl p-6 sm:p-8">
          <h3 className="text-base font-bold text-[#dae2fd] font-[Manrope,sans-serif]">
            Live Volume Distribution
          </h3>
          <p className="text-xs text-[#8f9098] mt-1 mb-6">
            Across top 12 trading pairs
          </p>

          {/* Bar chart */}
          <div className="flex items-end gap-2 sm:gap-3 h-44 relative">
            {BAR_HEIGHTS.map((h, i) => (
              <div
                key={i}
                className="flex-1 relative group cursor-pointer"
                style={{ height: "100%" }}
                onMouseEnter={() => setHoveredBar(i)}
                onMouseLeave={() => setHoveredBar(null)}
              >
                {/* Tooltip */}
                {hoveredBar === i && (
                  <div className="absolute -top-9 left-1/2 -translate-x-1/2 bg-[#222a3d] border border-white/10 px-2 py-1 rounded-lg text-[10px] text-[#dae2fd] whitespace-nowrap z-10 shadow-lg">
                    {BAR_LABELS[i]}
                  </div>
                )}
                <div
                  className={`w-full rounded-t-lg transition-all duration-200 absolute bottom-0 ${
                    h === 100
                      ? "bg-[#4edea3]"
                      : hoveredBar === i
                        ? "bg-[#4edea3]/50"
                        : "bg-[#4edea3]/20"
                  }`}
                  style={{ height: `${h}%` }}
                />
              </div>
            ))}
          </div>

          {/* X-axis labels — abbreviated */}
          <div className="flex gap-2 sm:gap-3 mt-2">
            {[
              "BTC",
              "ETH",
              "SOL",
              "XRP",
              "BNB",
              "ADA",
              "MTIC",
              "DOT",
              "LINK",
              "AVAX",
              "DOGE",
              "UNI",
            ].map((label) => (
              <div
                key={label}
                className="flex-1 text-center text-[8px] text-[#44474d] truncate"
              >
                {label}
              </div>
            ))}
          </div>
        </div>

        {/* Security Pulse */}
        <div className="bg-[#131b2e] border border-white/5 rounded-2xl p-6 sm:p-8">
          <h3 className="text-base font-bold text-[#dae2fd] mb-6 font-[Manrope,sans-serif]">
            Security Pulse
          </h3>
          <div className="space-y-5">
            {[
              {
                icon: "shield",
                iconBg: "bg-[#00311f]/40 text-[#4edea3]",
                title: "KYC Compliance",
                desc: "98.4% of active signals are from verified traders.",
              },
              {
                icon: "warning",
                iconBg: "bg-[#5d001b]/30 text-[#ffb2b9]",
                title: "Risk Thresholds",
                desc: "2 signals currently flagged for volatility outliers.",
              },
              {
                icon: "gpp_good",
                iconBg: "bg-[#00311f]/40 text-[#4edea3]",
                title: "Automated Halts",
                desc: "0 signals auto-halted in the last 24 hours.",
              },
            ].map((item) => (
              <div key={item.title} className="flex items-start gap-4">
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${item.iconBg}`}
                >
                  <span className="material-symbols-outlined text-xl">
                    {item.icon}
                  </span>
                </div>
                <div>
                  <p className="text-sm font-bold text-[#dae2fd]">
                    {item.title}
                  </p>
                  <p className="text-xs text-[#8f9098] mt-0.5 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 pt-6 border-t border-white/5">
            <p className="text-xs text-[#8f9098] mb-4">
              Need manual review for a specific signal cluster?
            </p>
            <button className="w-full py-3 rounded-xl border border-[#4edea3]/30 text-[#4edea3] hover:bg-[#4edea3]/5 transition-all text-xs font-bold uppercase tracking-widest">
              Contact Support
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
