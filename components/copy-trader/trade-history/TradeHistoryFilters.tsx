"use client";

import { useState } from "react";

export default function TradeHistoryFilters() {
  const [period, setPeriod] = useState("Last 30 Days");
  const [exchange, setExchange] = useState("All Exchanges");
  const [asset, setAsset] = useState("All Assets");

  return (
    <div
      className="rounded-xl p-4 flex flex-wrap items-center gap-3"
      style={{ backgroundColor: "#131b2e" }}
    >
      {/* Period */}
      <select
        value={period}
        onChange={(e) => setPeriod(e.target.value)}
        className="px-4 py-2 rounded-lg text-sm font-semibold outline-none cursor-pointer"
        style={{ backgroundColor: "#222a3d", color: "#dae2fd", border: "none" }}
      >
        <option>Last 7 Days</option>
        <option>Last 30 Days</option>
        <option>Last 90 Days</option>
        <option>All Time</option>
      </select>

      {/* Exchange */}
      <select
        value={exchange}
        onChange={(e) => setExchange(e.target.value)}
        className="px-4 py-2 rounded-lg text-sm font-semibold outline-none cursor-pointer"
        style={{ backgroundColor: "#222a3d", color: "#dae2fd", border: "none" }}
      >
        <option>All Exchanges</option>
        <option>Binance</option>
        <option>Bybit</option>
        <option>OKX</option>
        <option>Kraken</option>
      </select>

      {/* Asset */}
      <select
        value={asset}
        onChange={(e) => setAsset(e.target.value)}
        className="px-4 py-2 rounded-lg text-sm font-semibold outline-none cursor-pointer"
        style={{ backgroundColor: "#222a3d", color: "#dae2fd", border: "none" }}
      >
        <option>All Assets</option>
        <option>BTC/USDT</option>
        <option>ETH/USDT</option>
        <option>SOL/USDT</option>
        <option>GOLD/USD</option>
      </select>

      {/* Export and Filter buttons */}
      <div className="ml-auto flex gap-2">
        <button
          className="p-2 rounded-lg transition-all hover:opacity-80"
          style={{ backgroundColor: "#222a3d", color: "#c5c6ce" }}
        >
          ⬇
        </button>
        <button
          className="p-2 rounded-lg transition-all hover:opacity-80"
          style={{ backgroundColor: "#222a3d", color: "#c5c6ce" }}
        >
          ☰
        </button>
      </div>
    </div>
  );
}
