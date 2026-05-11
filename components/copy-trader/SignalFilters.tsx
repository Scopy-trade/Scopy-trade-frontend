"use client";

import { useState } from "react";

const assetTabs = ["All Assets", "Crypto", "Forex", "Indices"];

export default function SignalFilters() {
  const [activeTab, setActiveTab] = useState("All Assets");
  const [riskLevel, setRiskLevel] = useState("Moderate");
  const [traderTier, setTraderTier] = useState("Elite (Tier 1)");

  return (
    <div className="flex flex-wrap items-center gap-4">
      {/* Asset tabs */}
      <div className="flex items-center gap-1 bg-[#131b2e] rounded-lg p-1">
        {assetTabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className="px-4 py-2 rounded-md text-sm font-semibold transition-all"
            style={{
              backgroundColor: activeTab === tab ? "#4edea3" : "transparent",
              color: activeTab === tab ? "#003824" : "#c5c6ce",
              fontFamily: "Inter, sans-serif",
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Risk Level */}
      <div
        className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold"
        style={{ backgroundColor: "#131b2e", color: "#dae2fd" }}
      >
        <span style={{ color: "#c5c6ce" }}>RISK LEVEL:</span>
        <select
          value={riskLevel}
          onChange={(e) => setRiskLevel(e.target.value)}
          className="bg-transparent border-none outline-none font-semibold cursor-pointer"
          style={{ color: "#dae2fd" }}
        >
          <option value="Low">Low</option>
          <option value="Moderate">Moderate</option>
          <option value="High">High</option>
        </select>
      </div>

      {/* Trader Tier */}
      <div
        className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold"
        style={{ backgroundColor: "#131b2e", color: "#dae2fd" }}
      >
        <span style={{ color: "#c5c6ce" }}>TRADER TIER:</span>
        <select
          value={traderTier}
          onChange={(e) => setTraderTier(e.target.value)}
          className="bg-transparent border-none outline-none font-semibold cursor-pointer"
          style={{ color: "#dae2fd" }}
        >
          <option value="Elite (Tier 1)">Elite (Tier 1)</option>
          <option value="Pro (Tier 2)">Pro (Tier 2)</option>
          <option value="Rising Star">Rising Star</option>
        </select>
      </div>

      {/* Advanced Sorting */}
      <button
        className="ml-auto flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all hover:opacity-80"
        style={{ backgroundColor: "#131b2e", color: "#dae2fd" }}
      >
        <span>⚙</span>
        Advanced Sorting
      </button>
    </div>
  );
}
