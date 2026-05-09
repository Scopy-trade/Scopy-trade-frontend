export default function TradeHistoryStats() {
  return (
    <div className="flex flex-col sm:flex-row gap-4 flex-1">
      {/* Total Trades */}
      <div
        className="flex-1 rounded-xl p-6"
        style={{ backgroundColor: "#131b2e" }}
      >
        <p
          className="text-xs font-bold uppercase tracking-widest mb-3"
          style={{ color: "#c5c6ce" }}
        >
          Total Trades
        </p>
        <div className="flex items-center gap-3">
          <span
            className="text-4xl font-bold"
            style={{ fontFamily: "Manrope, sans-serif" }}
          >
            1,284
          </span>
          <span
            className="text-xs font-bold px-2 py-1 rounded"
            style={{ backgroundColor: "#4edea3", color: "#003824" }}
          >
            92% Win Rate
          </span>
        </div>
      </div>

      {/* Net PnL */}
      <div
        className="flex-1 rounded-xl p-6"
        style={{ backgroundColor: "#131b2e" }}
      >
        <p
          className="text-xs font-bold uppercase tracking-widest mb-3"
          style={{ color: "#c5c6ce" }}
        >
          Net PnL
        </p>
        <div className="flex items-center gap-2">
          <span
            className="text-4xl font-bold"
            style={{ color: "#4edea3", fontFamily: "Manrope, sans-serif" }}
          >
            +$12,450.00
          </span>
          <span className="text-sm" style={{ color: "#4edea3" }}>
            +14.2%
          </span>
        </div>
      </div>

      {/* Best Asset */}
      <div
        className="flex-1 rounded-xl p-6"
        style={{ backgroundColor: "#131b2e" }}
      >
        <p
          className="text-xs font-bold uppercase tracking-widest mb-3"
          style={{ color: "#c5c6ce" }}
        >
          Best Asset
        </p>
        <div className="flex items-center gap-2">
          <span
            className="text-4xl font-bold"
            style={{ fontFamily: "Manrope, sans-serif" }}
          >
            BTC/USDT
          </span>
          <span className="text-sm" style={{ color: "#c5c6ce" }}>
            42 trades
          </span>
        </div>
      </div>
    </div>
  );
}
