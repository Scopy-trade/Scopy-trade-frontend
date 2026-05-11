"use client";

import { useState } from "react";

const exchanges = [
  { id: "binance", name: "Binance", logo: "B" },
  { id: "bybit", name: "Bybit", logo: "By" },
  { id: "kraken", name: "Kraken", logo: "K" },
  { id: "coinbase", name: "Coinbase", logo: "C" },
];

interface ExecuteTradeModalProps {
  signal: any;
  onClose: () => void;
}

export default function ExecuteTradeModal({
  signal,
  onClose,
}: ExecuteTradeModalProps) {
  const [selectedExchange, setSelectedExchange] = useState("binance");
  const [tradeAmount, setTradeAmount] = useState("2,500.00");
  const [lotSize, setLotSize] = useState(1.0);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: "rgba(6, 14, 32, 0.85)" }}
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl rounded-2xl p-8 relative"
        style={{ backgroundColor: "#131b2e" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-xl font-bold transition-opacity hover:opacity-60"
          style={{ color: "#c5c6ce" }}
        >
          ✕
        </button>

        {/* Signal header */}
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <span
              className="text-xs font-bold px-2 py-0.5 rounded"
              style={{ backgroundColor: "#4edea3", color: "#003824" }}
            >
              ACTIVE SIGNAL
            </span>
            <span style={{ color: "#c5c6ce", fontSize: "13px" }}>
              ID: #{signal.id}
            </span>
          </div>
          <h2
            className="text-3xl font-bold mb-1"
            style={{ fontFamily: "Manrope, sans-serif" }}
          >
            {signal.pair}
          </h2>
          <p style={{ color: "#c5c6ce", fontSize: "14px" }}>
            Provider:{" "}
            <span style={{ color: "#4edea3" }}>{signal.trader}</span>
          </p>
        </div>

        {/* Signal stats */}
        <div
          className="grid grid-cols-3 gap-4 p-4 rounded-xl mb-6"
          style={{ backgroundColor: "#0b1326" }}
        >
          <div>
            <p style={{ color: "#c5c6ce", fontSize: "11px" }}>ENTRY PRICE</p>
            <p className="font-bold text-lg">{signal.entryPrice}</p>
          </div>
          <div>
            <p style={{ color: "#c5c6ce", fontSize: "11px" }}>TARGET 01</p>
            <p
              className="font-bold text-lg"
              style={{ color: "#4edea3" }}
            >
              {signal.target}
            </p>
          </div>
          <div>
            <p style={{ color: "#c5c6ce", fontSize: "11px" }}>STOP LOSS</p>
            <p
              className="font-bold text-lg"
              style={{ color: "#ffb2b9" }}
            >
              {signal.stopLoss}
            </p>
          </div>
        </div>

        {/* Exchange selector */}
        <div className="mb-6">
          <p
            className="text-xs font-bold uppercase tracking-widest mb-3"
            style={{ color: "#c5c6ce" }}
          >
            Select Connected Exchange
          </p>
          <div className="grid grid-cols-4 gap-3">
            {exchanges.map((exchange) => (
              <button
                key={exchange.id}
                onClick={() => setSelectedExchange(exchange.id)}
                className="flex flex-col items-center gap-2 p-4 rounded-xl font-bold text-sm transition-all"
                style={{
                  backgroundColor:
                    selectedExchange === exchange.id ? "#222a3d" : "#0b1326",
                  border:
                    selectedExchange === exchange.id
                      ? "2px solid #4edea3"
                      : "2px solid transparent",
                  color: "#dae2fd",
                }}
              >
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center font-bold"
                  style={{ backgroundColor: "#2d3449", color: "#4edea3" }}
                >
                  {exchange.logo}
                </div>
                {exchange.name}
              </button>
            ))}
          </div>
        </div>

        {/* Trade amount and lot size */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <p
              className="text-xs font-bold uppercase tracking-widest mb-2"
              style={{ color: "#c5c6ce" }}
            >
              Trade Amount (USDT)
            </p>
            <div
              className="flex items-center gap-2 p-3 rounded-lg"
              style={{ backgroundColor: "#0b1326" }}
            >
              <input
                type="text"
                value={tradeAmount}
                onChange={(e) => setTradeAmount(e.target.value)}
                className="flex-1 bg-transparent outline-none font-bold text-lg"
                style={{ color: "#dae2fd" }}
              />
              <button
                className="text-xs font-bold px-2 py-1 rounded"
                style={{ backgroundColor: "#222a3d", color: "#4edea3" }}
              >
                MAX
              </button>
            </div>
            <p
              className="text-xs mt-1"
              style={{ color: "#c5c6ce" }}
            >
              Available balance: 14,290.42 USDT
            </p>
          </div>
          <div>
            <p
              className="text-xs font-bold uppercase tracking-widest mb-2"
              style={{ color: "#c5c6ce" }}
            >
              Lot Size (Multiplier)
            </p>
            <div
              className="flex items-center gap-3 p-3 rounded-lg"
              style={{ backgroundColor: "#0b1326" }}
            >
              <button
                onClick={() => setLotSize((p) => Math.max(0.1, parseFloat((p - 0.1).toFixed(1))))}
                className="w-8 h-8 rounded-full font-bold transition-all hover:opacity-80"
                style={{ backgroundColor: "#222a3d", color: "#dae2fd" }}
              >
                −
              </button>
              <span className="flex-1 text-center font-bold text-lg">
                {lotSize.toFixed(2)}x
              </span>
              <button
                onClick={() => setLotSize((p) => parseFloat((p + 0.1).toFixed(1)))}
                className="w-8 h-8 rounded-full font-bold transition-all hover:opacity-80"
                style={{ backgroundColor: "#222a3d", color: "#dae2fd" }}
              >
                +
              </button>
            </div>
            <p
              className="text-xs mt-1"
              style={{ color: "#c5c6ce" }}
            >
              Adjust risk proportionally
            </p>
          </div>
        </div>

        {/* Confirm button */}
        <button
          className="w-full py-4 rounded-xl font-bold text-lg transition-all hover:opacity-90 active:scale-[0.98] flex items-center justify-center gap-2"
          style={{
            background: "linear-gradient(to right, #4edea3, #00a572)",
            color: "#003824",
          }}
        >
          ⚡ Confirm Execution
        </button>
        <p
          className="text-center text-xs mt-3 uppercase tracking-widest"
          style={{ color: "#c5c6ce" }}
        >
          Execution subject to sovereign terms of risk
        </p>
      </div>
    </div>
  );
}
