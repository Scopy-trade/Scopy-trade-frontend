"use client";

import { useState } from "react";

const exchanges = ["Binance Global", "OKX", "Coinbase", "Bybit"];

export default function SetupConnectionForm() {
  const [selectedExchange, setSelectedExchange] = useState("Binance Global");
  const [apiKey, setApiKey] = useState("");
  const [secretKey, setSecretKey] = useState("");
  const [spotTrading, setSpotTrading] = useState(true);
  const [readBalance, setReadBalance] = useState(true);

  return (
    <div
      className="rounded-xl p-8 sticky top-28"
      style={{ backgroundColor: "#131b2e" }}
    >
      <h2
        className="text-xl font-bold mb-6 flex items-center gap-2"
        style={{ fontFamily: "Manrope, sans-serif" }}
      >
        <span style={{ color: "#b6c4ff" }}>🔑</span>
        Setup Connection
      </h2>

      <div className="space-y-6">
        {/* Exchange selector */}
        <div>
          <label
            className="block text-xs font-bold uppercase tracking-widest mb-2"
            style={{ color: "#c5c6ce" }}
          >
            Select Exchange
          </label>
          <select
            value={selectedExchange}
            onChange={(e) => setSelectedExchange(e.target.value)}
            className="w-full rounded-lg p-3 outline-none font-medium transition-all"
            style={{
              backgroundColor: "#222a3d",
              color: "#dae2fd",
              border: "none",
            }}
          >
            {exchanges.map((ex) => (
              <option key={ex} value={ex}>
                {ex}
              </option>
            ))}
          </select>
        </div>

        {/* API Key */}
        <div>
          <label
            className="block text-xs font-bold uppercase tracking-widest mb-2"
            style={{ color: "#c5c6ce" }}
          >
            API Key
          </label>
          <input
            type="text"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            placeholder="Paste your API key here"
            className="w-full rounded-lg p-3 outline-none transition-all"
            style={{
              backgroundColor: "#222a3d",
              color: "#dae2fd",
              border: "none",
            }}
          />
        </div>

        {/* Secret Key */}
        <div>
          <label
            className="block text-xs font-bold uppercase tracking-widest mb-2"
            style={{ color: "#c5c6ce" }}
          >
            Secret Key
          </label>
          <input
            type="password"
            value={secretKey}
            onChange={(e) => setSecretKey(e.target.value)}
            placeholder="••••••••••••••••••••"
            className="w-full rounded-lg p-3 outline-none transition-all"
            style={{
              backgroundColor: "#222a3d",
              color: "#dae2fd",
              border: "none",
            }}
          />
        </div>

        {/* Permissions */}
        <div>
          <label
            className="block text-xs font-bold uppercase tracking-widest mb-4"
            style={{ color: "#c5c6ce" }}
          >
            Required Permissions
          </label>
          <div className="space-y-3">
            {/* Spot Trading */}
            <label className="flex items-center gap-3 cursor-pointer">
              <div
                className="w-5 h-5 rounded flex items-center justify-center flex-shrink-0 transition-all"
                style={{
                  backgroundColor: spotTrading ? "#4edea3" : "#222a3d",
                  border: spotTrading ? "none" : "1px solid #44474d",
                }}
                onClick={() => setSpotTrading(!spotTrading)}
              >
                {spotTrading && (
                  <span className="text-xs font-bold" style={{ color: "#003824" }}>✓</span>
                )}
              </div>
              <span className="text-sm font-medium">Enable Spot Trading</span>
            </label>

            {/* Read Balance */}
            <label className="flex items-center gap-3 cursor-pointer">
              <div
                className="w-5 h-5 rounded flex items-center justify-center flex-shrink-0 transition-all"
                style={{
                  backgroundColor: readBalance ? "#4edea3" : "#222a3d",
                  border: readBalance ? "none" : "1px solid #44474d",
                }}
                onClick={() => setReadBalance(!readBalance)}
              >
                {readBalance && (
                  <span className="text-xs font-bold" style={{ color: "#003824" }}>✓</span>
                )}
              </div>
              <span className="text-sm font-medium">Read-Only Balance access</span>
            </label>

            {/* Disable Withdrawals - always locked */}
            <label className="flex items-center gap-3">
              <div
                className="w-5 h-5 rounded flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: "#5d001b", border: "1px solid #ffb2b9" }}
              >
                <span className="text-xs font-bold" style={{ color: "#ffb2b9" }}>✕</span>
              </div>
              <span
                className="text-sm font-medium"
                style={{ color: "#ffb2b9" }}
              >
                Disable Withdrawals (MANDATORY)
              </span>
            </label>
          </div>
        </div>

        {/* Submit */}
        <button
          className="w-full py-4 rounded-lg font-bold text-sm uppercase tracking-widest transition-all hover:opacity-90 active:scale-[0.98]"
          style={{
            background: "linear-gradient(to right, #4edea3, #00a572)",
            color: "#003824",
          }}
        >
          Securely Authorize Connection
        </button>
      </div>
    </div>
  );
}
