"use client";

import { RiFlashlightLine } from "react-icons/ri";

export default function AlphaSignal() {
  return (
    <div
      className="rounded-xl p-6"
      style={{
        backgroundColor: "rgba(0,35,113,0.2)",
        border: "1px solid rgba(182,196,255,0.1)",
      }}
    >
      <div className="flex items-center gap-2 mb-2">
        <RiFlashlightLine style={{ color: "#b6c4ff", fontSize: "1.125rem" }} />
        <h3
          className="font-bold text-lg"
          style={{ fontFamily: "var(--font-headline)", color: "#dae2fd" }}
        >
          Alpha Signal
        </h3>
      </div>
      <p className="text-sm mb-4" style={{ color: "#c5c6ce" }}>
        New High-Yield strategy detected for ETH/USDT pair based on whale
        movement.
      </p>

      {/* Probability bar */}
      <div
        className="rounded-lg p-4 mb-4"
        style={{ backgroundColor: "#060e20" }}
      >
        <div className="flex justify-between text-xs mb-2">
          <span style={{ color: "#c5c6ce" }}>Success Probability</span>
          <span className="font-bold" style={{ color: "#4edea3" }}>
            84%
          </span>
        </div>
        <div
          className="h-1.5 w-full rounded-full overflow-hidden"
          style={{ backgroundColor: "#171f33" }}
        >
          <div
            className="h-full rounded-full"
            style={{
              width: "84%",
              background: "linear-gradient(to right, #b6c4ff, #4edea3)",
            }}
          />
        </div>
      </div>

      <button
        className="w-full py-3 font-black transition-all active:scale-95 hover:scale-[1.02]"
        style={{
          fontFamily: "var(--font-headline)",
          backgroundColor: "#4edea3",
          color: "#003824",
          borderRadius: "0.5rem",
          boxShadow: "0 8px 24px rgba(78,222,163,0.15)",
          border: "none",
          cursor: "pointer",
        }}
      >
        Review Signal
      </button>
    </div>
  );
}
