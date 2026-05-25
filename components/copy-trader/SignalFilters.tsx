"use client";

import { useState } from "react";
import { MdFilterList } from "react-icons/md";

const assetTabs = ["ALL", "CRYPTO", "FOREX", "INDICES"];

export default function SignalFilters() {
  const [activeTab, setActiveTab] = useState("ALL");
  const [riskLevel, setRiskLevel] = useState("Moderate");
  const [traderTier, setTraderTier] = useState("Elite");

  return (
    <div className="flex flex-wrap items-center gap-3 w-full">
      {/* Asset tabs */}
      <div className="flex items-center bg-surface-container-highest/50 rounded p-1 border border-white/5">
        {assetTabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-3 py-1 rounded text-[10px] font-bold uppercase tracking-widest transition-all ${
              activeTab === tab
                ? "bg-secondary text-on-secondary shadow-sm"
                : "text-slate-400 hover:text-slate-200 hover:bg-white/5"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Risk Level */}
      <div className="flex items-center gap-2 px-3 py-1.5 rounded bg-surface-container-highest/50 border border-white/5 text-xs font-bold">
        <span className="text-slate-500 uppercase tracking-widest text-[10px]">RISK:</span>
        <select
          value={riskLevel}
          onChange={(e) => setRiskLevel(e.target.value)}
          className="bg-transparent border-none outline-none text-slate-200 cursor-pointer appearance-none"
        >
          <option value="Low" className="bg-surface-container">Low</option>
          <option value="Moderate" className="bg-surface-container">Moderate</option>
          <option value="High" className="bg-surface-container">High</option>
        </select>
      </div>

      {/* Trader Tier */}
      <div className="flex items-center gap-2 px-3 py-1.5 rounded bg-surface-container-highest/50 border border-white/5 text-xs font-bold">
        <span className="text-slate-500 uppercase tracking-widest text-[10px]">TIER:</span>
        <select
          value={traderTier}
          onChange={(e) => setTraderTier(e.target.value)}
          className="bg-transparent border-none outline-none text-slate-200 cursor-pointer appearance-none"
        >
          <option value="Elite" className="bg-surface-container">Elite</option>
          <option value="Pro" className="bg-surface-container">Pro</option>
          <option value="Rising Star" className="bg-surface-container">Rising Star</option>
        </select>
      </div>

      {/* Advanced Sorting */}
      <button className="ml-auto flex items-center gap-2 px-3 py-1.5 rounded bg-surface-container hover:bg-surface-container-high border border-white/5 text-[10px] uppercase tracking-widest font-bold text-slate-300 transition-all">
        <MdFilterList size={14} />
        More Filters
      </button>
    </div>
  );
}
