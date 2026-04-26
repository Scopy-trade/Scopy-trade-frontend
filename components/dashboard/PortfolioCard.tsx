"use client";

import { useState } from "react";

const chartBars = [
  { height: "40%", highlight: false },
  { height: "45%", highlight: false },
  { height: "55%", highlight: false },
  { height: "52%", highlight: false },
  { height: "65%", highlight: false },
  { height: "75%", highlight: true },
  { height: "68%", highlight: false },
  { height: "80%", highlight: false },
  { height: "85%", highlight: false },
  { height: "95%", highlight: true, glow: true },
  { height: "88%", highlight: false },
  { height: "92%", highlight: false },
  { height: "100%", highlight: true, glow: true },
  { height: "90%", highlight: false },
];

const timeframes = ["1D", "1W", "1M"];

export default function PortfolioCard() {
  const [activeFrame, setActiveFrame] = useState("1W");

  return (
    <div
      className="rounded-xl p-8 relative overflow-hidden"
      style={{ backgroundColor: "#171f33" }}
    >
      {/* Ambient glow */}
      <div
        className="absolute top-0 right-0 pointer-events-none"
        style={{
          width: "16rem",
          height: "16rem",
          background: "rgba(182,196,255,0.05)",
          filter: "blur(100px)",
          marginRight: "-8rem",
          marginTop: "-8rem",
        }}
      />

      {/* Header row */}
      <div className="flex justify-between items-start relative z-10">
        <div className="space-y-1">
          <span
            className="text-xs uppercase tracking-widest"
            style={{ color: "#c5c6ce" }}
          >
            Total Portfolio Balance
          </span>
          <div className="flex items-baseline gap-3">
            <h2
              className="text-5xl font-black tracking-tighter"
              style={{ fontFamily: "var(--font-headline)", color: "#dae2fd" }}
            >
              $142,850.42
            </h2>
            <span className="font-bold text-lg" style={{ color: "#4edea3" }}>
              +12.4%
            </span>
          </div>
        </div>

        {/* Timeframe buttons */}
        <div className="flex gap-2">
          {timeframes.map((tf) => (
            <button
              key={tf}
              onClick={() => setActiveFrame(tf)}
              className="px-3 py-1 text-xs font-bold transition-all"
              style={{
                borderRadius: "0.5rem",
                backgroundColor: activeFrame === tf ? "#4edea3" : "#2d3449",
                color: activeFrame === tf ? "#003824" : "#c5c6ce",
              }}
            >
              {tf}
            </button>
          ))}
        </div>
      </div>

      {/* Chart bars */}
      <div className="mt-12 h-[300px] w-full relative flex items-end gap-[2%]">
        {chartBars.map((bar, i) => (
          <div
            key={i}
            className="rounded-t-lg transition-all cursor-pointer"
            style={{
              height: bar.height,
              width: "4%",
              backgroundColor: bar.highlight ? "#4edea3" : "#2d3449",
              boxShadow: bar.glow ? "0 0 20px rgba(78,222,163,0.4)" : undefined,
            }}
            onMouseEnter={(e) => {
              if (!bar.highlight)
                (e.currentTarget as HTMLDivElement).style.backgroundColor =
                  "rgba(78,222,163,0.3)";
            }}
            onMouseLeave={(e) => {
              if (!bar.highlight)
                (e.currentTarget as HTMLDivElement).style.backgroundColor =
                  "#2d3449";
            }}
          />
        ))}
      </div>
    </div>
  );
}
