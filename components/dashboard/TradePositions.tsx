"use client";

import { RiCloseLine } from "react-icons/ri";

type Direction = "long" | "short";

interface Position {
  symbol: string;
  pair: string;
  direction: Direction;
  leverage: string;
  entryPrice: string;
  pnl: string;
  pnlPositive: boolean;
}

const positions: Position[] = [
  {
    symbol: "BTC",
    pair: "Bitcoin / USDT",
    direction: "long",
    leverage: "20x",
    entryPrice: "$64,281.00",
    pnl: "+$1,420.50",
    pnlPositive: true,
  },
  {
    symbol: "ETH",
    pair: "Ethereum / USDT",
    direction: "short",
    leverage: "10x",
    entryPrice: "$3,412.50",
    pnl: "-$240.12",
    pnlPositive: false,
  },
  {
    symbol: "SOL",
    pair: "Solana / USDT",
    direction: "long",
    leverage: "5x",
    entryPrice: "$145.20",
    pnl: "+$64.12",
    pnlPositive: true,
  },
];

export default function TradePositions() {
  return (
    <div className="rounded-xl p-6" style={{ backgroundColor: "#171f33" }}>
      <div className="flex justify-between items-center mb-6">
        <h3
          className="font-bold text-lg"
          style={{ fontFamily: "var(--font-headline)", color: "#dae2fd" }}
        >
          Active Trade Positions
        </h3>
        <span className="text-xs" style={{ color: "#c5c6ce" }}>
          8 Live Threads
        </span>
      </div>

      <div className="space-y-3">
        {positions.map((pos, i) => (
          <div
            key={i}
            className="grid items-center p-4 transition-all cursor-pointer"
            style={{
              gridTemplateColumns: "repeat(12, minmax(0, 1fr))",
              borderRadius: "0.75rem",
              backgroundColor: i % 2 === 0 ? "#131b2e" : "#060e20",
            }}
            onMouseEnter={(e) =>
              ((e.currentTarget as HTMLDivElement).style.backgroundColor =
                "#222a3d")
            }
            onMouseLeave={(e) =>
              ((e.currentTarget as HTMLDivElement).style.backgroundColor =
                i % 2 === 0 ? "#131b2e" : "#060e20")
            }
          >
            {/* Symbol + pair */}
            <div
              className="flex items-center gap-3"
              style={{ gridColumn: "span 4" }}
            >
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm"
                style={{
                  backgroundColor: "#2d3449",
                  color: "#dae2fd",
                }}
              >
                {pos.symbol}
              </div>
              <div>
                <p className="font-bold text-sm" style={{ color: "#dae2fd" }}>
                  {pos.pair}
                </p>
                <span
                  className="px-2 py-0.5 text-[10px] uppercase font-bold tracking-widest"
                  style={{
                    borderRadius: "9999px",
                    backgroundColor:
                      pos.direction === "long"
                        ? "rgba(0,82,54,0.5)"
                        : "rgba(93,0,27,0.5)",
                    color: pos.direction === "long" ? "#4edea3" : "#ffb2b9",
                  }}
                >
                  {pos.direction === "long" ? "Long" : "Short"} {pos.leverage}
                </span>
              </div>
            </div>

            {/* Entry price */}
            <div className="text-right" style={{ gridColumn: "span 3" }}>
              <p className="text-xs" style={{ color: "#c5c6ce" }}>
                Entry Price
              </p>
              <p
                className="font-semibold text-sm"
                style={{
                  fontFamily: "var(--font-headline)",
                  color: "#dae2fd",
                }}
              >
                {pos.entryPrice}
              </p>
            </div>

            {/* PNL */}
            <div className="text-right" style={{ gridColumn: "span 3" }}>
              <p className="text-xs" style={{ color: "#c5c6ce" }}>
                Current PNL
              </p>
              <p
                className="font-bold text-sm"
                style={{
                  fontFamily: "var(--font-headline)",
                  color: pos.pnlPositive ? "#4edea3" : "#ffb2b9",
                }}
              >
                {pos.pnl}
              </p>
            </div>

            {/* Close button */}
            <div className="flex justify-end" style={{ gridColumn: "span 2" }}>
              <button
                className="w-8 h-8 flex items-center justify-center transition-all"
                style={{
                  borderRadius: "0.5rem",
                  backgroundColor: "#2d3449",
                  color: "#dae2fd",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.backgroundColor =
                    "#93000a";
                  (e.currentTarget as HTMLButtonElement).style.color =
                    "#ffdad6";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.backgroundColor =
                    "#2d3449";
                  (e.currentTarget as HTMLButtonElement).style.color =
                    "#dae2fd";
                }}
              >
                <RiCloseLine style={{ fontSize: "1rem" }} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
