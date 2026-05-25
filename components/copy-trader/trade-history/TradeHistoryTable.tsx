"use client";

import { useState } from "react";

const trades = [
  {
    id: 1,
    date: "Oct 24, 2023",
    time: "14:22:45 UTC",
    pair: "BTC/USDT",
    asset: "Bitcoin",
    type: "LONG",
    exchange: "Binance Futures",
    entry: "34,120.50",
    exit: "35,440.00",
    pnl: "+$1,319.50",
    pnlPercent: "+3.86%",
    status: "Completed",
  },
  {
    id: 2,
    date: "Oct 23, 2023",
    time: "09:15:12 UTC",
    pair: "SOL/USDT",
    asset: "Solana",
    type: "SHORT",
    exchange: "Bybit Perp",
    entry: "32.45",
    exit: "33.90",
    pnl: "-$145.20",
    pnlPercent: "-4.47%",
    status: "Liquidation",
  },
  {
    id: 3,
    date: "Oct 22, 2023",
    time: "21:04:33 UTC",
    pair: "ETH/USDT",
    asset: "Ethereum",
    type: "LONG",
    exchange: "OKX Futures",
    entry: "1,780.20",
    exit: "1,890.10",
    pnl: "+$4,221.00",
    pnlPercent: "+6.17%",
    status: "Completed",
  },
  {
    id: 4,
    date: "Oct 21, 2023",
    time: "11:33:20 UTC",
    pair: "GOLD/USD",
    asset: "Gold",
    type: "SHORT",
    exchange: "Kraken",
    entry: "1,980.00",
    exit: "1,950.00",
    pnl: "+$890.00",
    pnlPercent: "+2.10%",
    status: "Completed",
  },
  {
    id: 5,
    date: "Oct 20, 2023",
    time: "08:45:10 UTC",
    pair: "BTC/USDT",
    asset: "Bitcoin",
    type: "LONG",
    exchange: "Binance Futures",
    entry: "29,800.00",
    exit: "28,100.00",
    pnl: "-$620.00",
    pnlPercent: "-5.70%",
    status: "Stopped",
  },
];

const pages = [1, 2, 3];

export default function TradeHistoryTable() {
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <div
      className="rounded-xl overflow-hidden"
      style={{ backgroundColor: "#131b2e" }}
    >
      {/* Table - Mobile Responsive wrapper */}
      <div className="overflow-x-auto scroll-smooth-touch w-full">
        <table className="w-full min-w-[800px] whitespace-nowrap">
          <thead>
            <tr style={{ borderBottom: "1px solid #222a3d" }}>
              {["DATE/TIME", "ASSET PAIR", "TYPE", "EXCHANGE", "ENTRY / EXIT", "PNL", "STATUS"].map((col) => (
                <th
                  key={col}
                  className="px-6 py-4 text-left text-xs font-bold uppercase tracking-widest"
                  style={{ color: "#c5c6ce" }}
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {trades.map((trade) => (
              <tr
                key={trade.id}
                className="transition-all hover:opacity-80"
                style={{ borderBottom: "1px solid #171f33" }}
              >
                {/* Date */}
                <td className="px-6 py-5">
                  <p className="font-bold text-sm">{trade.date}</p>
                  <p className="text-xs" style={{ color: "#c5c6ce" }}>
                    {trade.time}
                  </p>
                </td>

                {/* Asset Pair */}
                <td className="px-6 py-5">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs"
                      style={{ backgroundColor: "#222a3d", color: "#4edea3" }}
                    >
                      {trade.pair[0]}
                    </div>
                    <div>
                      <p className="font-bold text-sm">{trade.pair}</p>
                      <p className="text-xs" style={{ color: "#c5c6ce" }}>
                        {trade.asset}
                      </p>
                    </div>
                  </div>
                </td>

                {/* Type */}
                <td className="px-6 py-5">
                  <span
                    className="px-3 py-1 rounded text-xs font-bold"
                    style={{
                      backgroundColor:
                        trade.type === "LONG" ? "#4edea3" : "#ffb2b9",
                      color: trade.type === "LONG" ? "#003824" : "#67001f",
                    }}
                  >
                    {trade.type}
                  </span>
                </td>

                {/* Exchange */}
                <td className="px-6 py-5">
                  <p className="text-sm">{trade.exchange}</p>
                </td>

                {/* Entry / Exit */}
                <td className="px-6 py-5">
                  <p className="font-bold text-sm font-mono">{trade.entry}</p>
                  <p className="text-xs font-mono" style={{ color: "#c5c6ce" }}>
                    {trade.exit}
                  </p>
                </td>

                {/* PnL */}
                <td className="px-6 py-5">
                  <p
                    className="font-bold text-sm font-mono tracking-tight"
                    style={{
                      color: trade.pnl.startsWith("+") ? "#4edea3" : "#ffb2b9",
                    }}
                  >
                    {trade.pnl}
                  </p>
                  <p
                    className="text-[11px] font-mono"
                    style={{
                      color: trade.pnl.startsWith("+") ? "rgba(78, 222, 163, 0.7)" : "rgba(255, 178, 185, 0.7)",
                    }}
                  >
                    {trade.pnlPercent}
                  </p>
                </td>

                {/* Status */}
                <td className="px-6 py-5">
                  <div className="flex items-center gap-2">
                    <span
                      className="w-2 h-2 rounded-full"
                      style={{
                        backgroundColor:
                          trade.status === "Completed"
                            ? "#4edea3"
                            : trade.status === "Liquidation"
                            ? "#ffb2b9"
                            : "#f0b90b",
                      }}
                    />
                    <span className="text-sm">{trade.status}</span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination - Responsive wrap */}
      <div
        className="px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4"
        style={{ borderTop: "1px solid #222a3d" }}
      >
        <p className="text-sm text-center sm:text-left" style={{ color: "#c5c6ce" }}>
          Showing 1 to 25 of 1,284 trades
        </p>
        <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0 w-full sm:w-auto justify-center sm:justify-end">
          <button
            className="w-8 h-8 rounded-lg flex items-center justify-center transition-all hover:opacity-80 shrink-0"
            style={{ backgroundColor: "#222a3d", color: "#c5c6ce" }}
          >
            ‹
          </button>
          {pages.map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm transition-all shrink-0"
              style={{
                backgroundColor: currentPage === page ? "#4edea3" : "#222a3d",
                color: currentPage === page ? "#003824" : "#dae2fd",
              }}
            >
              {page}
            </button>
          ))}
          <span style={{ color: "#c5c6ce" }} className="px-1 shrink-0">...</span>
          <button
            className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm transition-all hover:opacity-80 shrink-0"
            style={{ backgroundColor: "#222a3d", color: "#dae2fd" }}
          >
            52
          </button>
          <button
            className="w-8 h-8 rounded-lg flex items-center justify-center transition-all hover:opacity-80 shrink-0"
            style={{ backgroundColor: "#222a3d", color: "#c5c6ce" }}
          >
            ›
          </button>
        </div>
      </div>
    </div>
  );
}
