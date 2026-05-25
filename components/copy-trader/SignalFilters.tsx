"use client";

import { useState } from "react";
import { MdFilterList, MdSearch } from "react-icons/md";

const assetTabs = ["ALL", "CRYPTO", "FOREX", "INDICES"];
const periodTabs = ["7D", "30D", "90D"];
const metricTabs = ["PNL", "ROI", "MDD", "AUM", "Copy Traders", "Sharpe Ratio"];

export default function SignalFilters() {
  const [activeAsset, setActiveAsset] = useState("ALL");
  const [activePeriod, setActivePeriod] = useState("7D");
  const [activeMetric, setActiveMetric] = useState("PNL");
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <div className="flex flex-col gap-3 w-full">
      {/* Top row: Period + Metric tabs */}
      <div className="flex flex-wrap items-center gap-2">
        {/* Period selector */}
        <div className="flex items-center bg-surface-container-highest/50 rounded p-0.5 border border-white/5">
          {periodTabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActivePeriod(tab)}
              className={`px-3 py-1.5 rounded text-[10px] font-bold uppercase tracking-widest transition-all ${
                activePeriod === tab
                  ? "bg-surface-container-high text-slate-100 shadow-sm"
                  : "text-slate-500 hover:text-slate-300 hover:bg-white/5"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Metric tabs */}
        <div className="flex items-center gap-0.5 flex-wrap">
          {metricTabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveMetric(tab)}
              className={`px-3 py-1.5 rounded text-[10px] font-bold uppercase tracking-widest transition-all ${
                activeMetric === tab
                  ? "bg-secondary/15 text-secondary border border-secondary/20"
                  : "text-slate-500 hover:text-slate-300 hover:bg-white/5"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Right side: Search + Filter */}
        <div className="ml-auto flex items-center gap-2">
          {searchOpen && (
            <input
              type="text"
              placeholder="Search traders..."
              className="bg-surface-container-highest/50 border border-white/5 rounded px-3 py-1.5 text-xs text-slate-200 outline-none focus:border-primary/30 w-40 transition-all placeholder:text-slate-600"
              autoFocus
              onBlur={() => setSearchOpen(false)}
            />
          )}
          <button
            onClick={() => setSearchOpen(!searchOpen)}
            className="p-2 rounded bg-surface-container hover:bg-surface-container-high border border-white/5 text-slate-400 hover:text-slate-200 transition-all"
          >
            <MdSearch size={16} />
          </button>
          <button className="p-2 rounded bg-surface-container hover:bg-surface-container-high border border-white/5 text-slate-400 hover:text-slate-200 transition-all">
            <MdFilterList size={16} />
          </button>
        </div>
      </div>

      {/* Bottom row: Asset tabs */}
      <div className="flex flex-wrap items-center gap-3">
        {/* Asset tabs */}
        <div className="flex items-center bg-surface-container-highest/50 rounded p-0.5 border border-white/5">
          {assetTabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveAsset(tab)}
              className={`px-3 py-1.5 rounded text-[10px] font-bold uppercase tracking-widest transition-all ${
                activeAsset === tab
                  ? "bg-secondary text-on-secondary shadow-sm"
                  : "text-slate-400 hover:text-slate-200 hover:bg-white/5"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
