"use client";

const availableExchanges = [
  { id: "okx", name: "OKX Terminal" },
  { id: "coinbase", name: "Coinbase Pro" },
  { id: "bybit", name: "Bybit Derivatives" },
  { id: "kraken", name: "Kraken" },
];

export default function ActiveConnections() {
  return (
    <div
      className="rounded-xl p-8"
      style={{
        backgroundColor: "#131b2e",
        borderLeft: "4px solid #4edea3",
      }}
    >
      <h2
        className="text-xl font-bold mb-6 flex items-center gap-2"
        style={{ fontFamily: "Manrope, sans-serif" }}
      >
        <span style={{ color: "#4edea3" }}>⚡</span>
        Active Connections
      </h2>

      {/* Connected exchange */}
      <div
        className="rounded-lg p-6 flex justify-between items-center mb-6"
        style={{ backgroundColor: "#171f33" }}
      >
        <div className="flex items-center gap-4">
          <div
            className="w-12 h-12 rounded-lg flex items-center justify-center font-bold text-lg"
            style={{ backgroundColor: "#222a3d", color: "#f0b90b" }}
          >
            B
          </div>
          <div>
            <h3 className="font-bold text-lg">Binance Global</h3>
            <div className="flex items-center gap-2 mt-1">
              <span
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: "#4edea3" }}
              />
              <span
                className="text-xs font-bold uppercase tracking-widest"
                style={{ color: "#c5c6ce" }}
              >
                Active & Synced
              </span>
            </div>
          </div>
        </div>
        <div className="flex gap-3">
          <button
            className="p-2 rounded-lg transition-all hover:opacity-80"
            style={{ backgroundColor: "#222a3d", color: "#c5c6ce" }}
          >
            ✎
          </button>
          <button
            className="p-2 rounded-lg transition-all hover:opacity-80"
            style={{ backgroundColor: "#222a3d", color: "#ffb2b9" }}
          >
            ✕
          </button>
        </div>
      </div>

      {/* Available integrations */}
      <p
        className="text-xs font-bold uppercase tracking-widest mb-4"
        style={{ color: "#c5c6ce" }}
      >
        Available Integrations
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {availableExchanges.map((exchange) => (
          <div
            key={exchange.id}
            className="flex items-center justify-between p-5 rounded-lg transition-all hover:opacity-90"
            style={{ backgroundColor: "#0b1326" }}
          >
            <div className="flex items-center gap-3">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs"
                style={{ backgroundColor: "#222a3d", color: "#4edea3" }}
              >
                {exchange.name[0]}
              </div>
              <span className="font-semibold text-sm">{exchange.name}</span>
            </div>
            <button
              className="text-xs font-bold px-3 py-1.5 rounded transition-all hover:opacity-90"
              style={{ backgroundColor: "#222a3d", color: "#4edea3" }}
            >
              CONNECT
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
