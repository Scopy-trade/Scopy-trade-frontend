export default function InsightCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* Weekly Performance Insight */}
      <div
        className="rounded-xl p-6 flex items-start gap-4"
        style={{ backgroundColor: "#131b2e" }}
      >
        <div
          className="p-3 rounded-lg flex-shrink-0"
          style={{ backgroundColor: "#222a3d", color: "#4edea3" }}
        >
          <span className="text-2xl">📈</span>
        </div>
        <div>
          <h4
            className="font-bold mb-2"
            style={{ fontFamily: "Manrope, sans-serif" }}
          >
            Weekly Performance Insight
          </h4>
          <p className="text-sm leading-relaxed" style={{ color: "#c5c6ce" }}>
            Your win rate on SOL/USDT shorts has increased by 15% this week.
            Consider adjusting risk parameters for high-volatility Solana
            trades.
          </p>
        </div>
      </div>

      {/* Execution Shield Active */}
      <div
        className="rounded-xl p-6 flex items-start gap-4"
        style={{ backgroundColor: "#1a2340" }}
      >
        <div
          className="p-3 rounded-lg flex-shrink-0"
          style={{ backgroundColor: "#002371", color: "#b6c4ff" }}
        >
          <span className="text-2xl">🛡</span>
        </div>
        <div>
          <h4
            className="font-bold mb-2"
            style={{ fontFamily: "Manrope, sans-serif" }}
          >
            Execution Shield Active
          </h4>
          <p className="text-sm leading-relaxed" style={{ color: "#c5c6ce" }}>
            All trades are being cross-verified across 3 liquidity pools to
            ensure minimal slippage and maximum capture.
          </p>
        </div>
      </div>
    </div>
  );
}
