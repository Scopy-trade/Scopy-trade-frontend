"use client";

const signals = [
  {
    id: "SL-9942",
    trader: "Vector Quant",
    tier: "ELITE TIER",
    followers: "8.4k",
    successRatio: "92.4%",
    pair: "BTC / USDT",
    position: "LONG",
    leverage: "20x",
    entryPrice: "$64,281.50",
    target: "$68,400.00",
    stopLoss: "$62,100.00",
    size: "featured",
  },
  {
    id: "SL-9901",
    trader: "Elena Volkov",
    tier: "Indices Specialist",
    followers: "3.1k",
    successRatio: "87.5%",
    pair: "NDX / USD",
    position: "SHORT",
    leverage: "10x",
    entryPrice: "$19,200.00",
    target: "$18,500.00",
    stopLoss: "$19,600.00",
    size: "medium",
  },
  {
    id: "SL-9887",
    trader: "Julian Thorne",
    tier: "Crypto Volatility Alpha",
    followers: "2.7k",
    successRatio: "81.2%",
    pair: "ETH / USDT",
    position: "LONG",
    leverage: "15x",
    entryPrice: "$3,450.00",
    target: "$3,900.00",
    stopLoss: "$3,200.00",
    size: "medium",
  },
  {
    id: "SL-9871",
    trader: "Luna Apex",
    tier: "FOREX MASTER",
    followers: "5.2k",
    successRatio: "89%",
    pair: "GBP / JPY",
    position: "LONG",
    leverage: "5x",
    entryPrice: "$189.50",
    target: "$193.00",
    stopLoss: "$187.00",
    size: "medium",
  },
  {
    id: "SL-9855",
    trader: "S. K. Capital",
    tier: "PRO TIER",
    followers: "1.9k",
    successRatio: "79.8%",
    pair: "SOL / USDT",
    position: "LONG",
    leverage: "8x",
    entryPrice: "$142.10",
    target: "$158.00",
    stopLoss: "$135.00",
    size: "compact",
  },
  {
    id: "SL-9841",
    trader: "Neon Alpha",
    tier: "RISING STAR",
    followers: "890",
    successRatio: "82.1%",
    pair: "GOLD / USD",
    position: "SHORT",
    leverage: "3x",
    entryPrice: "$2,310.00",
    target: "$2,250.00",
    stopLoss: "$2,340.00",
    size: "compact",
  },
];

interface SignalGridProps {
  onExecute: (signal: any) => void;
}

export default function SignalGrid({ onExecute }: SignalGridProps) {
  const featured = signals.filter((s) => s.size === "featured");
  const medium = signals.filter((s) => s.size === "medium");
  const compact = signals.filter((s) => s.size === "compact");

  return (
    <div className="space-y-4">
      {/* Featured card */}
      {featured.map((signal) => (
        <div
          key={signal.id}
          className="rounded-xl p-6 flex flex-col md:flex-row justify-between gap-6"
          style={{ backgroundColor: "#131b2e" }}
        >
          <div className="flex items-start gap-4">
            <div
              className="w-14 h-14 rounded-full flex items-center justify-center text-xl font-bold"
              style={{ backgroundColor: "#222a3d", color: "#4edea3" }}
            >
              {signal.trader[0]}
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span
                  className="text-xs font-bold px-2 py-0.5 rounded"
                  style={{ backgroundColor: "#4edea3", color: "#003824" }}
                >
                  {signal.tier}
                </span>
                <span style={{ color: "#c5c6ce", fontSize: "13px" }}>
                  {signal.followers} Followers
                </span>
              </div>
              <h3
                className="text-xl font-bold"
                style={{ fontFamily: "Manrope, sans-serif" }}
              >
                {signal.trader}
              </h3>
              <div className="flex items-center gap-4 mt-3">
                <div>
                  <p style={{ color: "#c5c6ce", fontSize: "11px" }}>
                    ASSET PAIR
                  </p>
                  <p
                    className="text-2xl font-bold"
                    style={{ fontFamily: "Manrope, sans-serif" }}
                  >
                    {signal.pair}
                  </p>
                </div>
                <span
                  className="px-3 py-1 rounded text-sm font-bold"
                  style={{ backgroundColor: "#4edea3", color: "#003824" }}
                >
                  {signal.position}
                </span>
                <div>
                  <p style={{ color: "#c5c6ce", fontSize: "11px" }}>
                    LEVERAGE
                  </p>
                  <p className="font-bold">{signal.leverage}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-end justify-between gap-4">
            <div className="text-right">
              <p style={{ color: "#c5c6ce", fontSize: "11px" }}>
                SUCCESS RATIO
              </p>
              <p
                className="text-4xl font-bold"
                style={{ color: "#4edea3", fontFamily: "Manrope, sans-serif" }}
              >
                {signal.successRatio}
              </p>
            </div>
            <button
              onClick={() => onExecute(signal)}
              className="px-6 py-3 rounded-lg font-bold text-sm transition-all hover:opacity-90 active:scale-95"
              style={{ backgroundColor: "#4edea3", color: "#003824" }}
            >
              Execute Trade
            </button>
          </div>
        </div>
      ))}

      {/* Medium cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {medium.map((signal) => (
          <div
            key={signal.id}
            className="rounded-xl p-5 flex flex-col gap-4"
            style={{ backgroundColor: "#131b2e" }}
          >
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center font-bold"
                style={{ backgroundColor: "#222a3d", color: "#4edea3" }}
              >
                {signal.trader[0]}
              </div>
              <div>
                <p className="font-bold text-sm">{signal.trader}</p>
                <p style={{ color: "#c5c6ce", fontSize: "11px" }}>
                  {signal.tier}
                </p>
              </div>
              <div className="ml-auto text-right">
                <p style={{ color: "#c5c6ce", fontSize: "11px" }}>WIN RATE</p>
                <p
                  className="font-bold"
                  style={{ color: "#4edea3" }}
                >
                  {signal.successRatio}
                </p>
              </div>
            </div>
            <div
              className="flex items-center justify-between p-3 rounded-lg"
              style={{ backgroundColor: "#222a3d" }}
            >
              <div>
                <p style={{ color: "#c5c6ce", fontSize: "10px" }}>
                  {signal.pair.split("/")[0].trim()}
                </p>
                <p className="font-bold text-sm">{signal.pair}</p>
              </div>
              <span
                className="px-2 py-0.5 rounded text-xs font-bold"
                style={{
                  backgroundColor:
                    signal.position === "LONG" ? "#4edea3" : "#ffb2b9",
                  color: signal.position === "LONG" ? "#003824" : "#67001f",
                }}
              >
                {signal.position}
              </span>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => onExecute(signal)}
                className="flex-1 py-2 rounded-lg font-bold text-sm transition-all hover:opacity-90"
                style={{ backgroundColor: "#4edea3", color: "#003824" }}
              >
                Execute
              </button>
              <button
                className="flex-1 py-2 rounded-lg font-bold text-sm transition-all hover:opacity-80"
                style={{
                  backgroundColor: "#222a3d",
                  color: "#dae2fd",
                }}
              >
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Compact rows */}
      <div className="space-y-3">
        {compact.map((signal) => (
          <div
            key={signal.id}
            className="rounded-xl px-6 py-4 flex items-center justify-between gap-4"
            style={{ backgroundColor: "#131b2e" }}
          >
            <div className="flex items-center gap-3 min-w-[160px]">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold"
                style={{ backgroundColor: "#222a3d", color: "#4edea3" }}
              >
                {signal.trader[0]}
              </div>
              <div>
                <p className="font-bold text-sm">{signal.trader}</p>
                <p style={{ color: "#c5c6ce", fontSize: "11px" }}>
                  {signal.tier}
                </p>
              </div>
            </div>
            <div className="hidden md:block">
              <p style={{ color: "#c5c6ce", fontSize: "10px" }}>ASSET</p>
              <p className="font-bold text-sm">{signal.pair}</p>
            </div>
            <div className="hidden md:block">
              <p style={{ color: "#c5c6ce", fontSize: "10px" }}>SUCCESS</p>
              <p className="font-bold text-sm" style={{ color: "#4edea3" }}>
                {signal.successRatio}
              </p>
            </div>
            <div>
              <span
                className="px-2 py-0.5 rounded text-xs font-bold"
                style={{
                  backgroundColor:
                    signal.position === "LONG" ? "#4edea3" : "#ffb2b9",
                  color: signal.position === "LONG" ? "#003824" : "#67001f",
                }}
              >
                {signal.position}
              </span>
            </div>
            <button
              onClick={() => onExecute(signal)}
              className="px-4 py-2 rounded-lg font-bold text-sm transition-all hover:opacity-90"
              style={{ backgroundColor: "#4edea3", color: "#003824" }}
            >
              Execute
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
