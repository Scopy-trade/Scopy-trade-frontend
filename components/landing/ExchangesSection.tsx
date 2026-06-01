const exchanges = [
  {
    initial: "B",
    name: "Binance",
    color: "text-amber-400",
    bg: "bg-amber-500/10",
  },
  {
    initial: "O",
    name: "OKX",
    color: "text-blue-400",
    bg: "bg-blue-500/10",
  },
  {
    initial: "C",
    name: "Coinbase",
    color: "text-blue-300",
    bg: "bg-blue-500/10",
  },
  {
    initial: "K",
    name: "KuCoin",
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
  },
  {
    initial: "B",
    name: "Bybit",
    color: "text-orange-400",
    bg: "bg-orange-500/10",
  },
  {
    initial: "G",
    name: "Gate.io",
    color: "text-rose-400",
    bg: "bg-rose-500/10",
  },
];

export default function ExchangesSection() {
  return (
    <section id="security" className="py-24 bg-[#0b1326] px-6 lg:px-24">
      <div
        className="glass-panel p-12 rounded-3xl border border-white/10 max-w-7xl mx-auto"
        style={{
          background: "rgba(49, 57, 77, 0.7)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
        }}
      >
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: text + exchange grid */}
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.15em] text-emerald-500 mb-5">
              Integrations
            </p>
            <h2
              className="text-3xl font-bold mb-6 text-white"
              style={{ fontFamily: "var(--font-headline)" }}
            >
              Global Integration Ecosystem
            </h2>
            <p className="text-[#c5c6ce] mb-8 leading-relaxed">
              SCopyTrade connects seamlessly with the world&apos;s leading
              liquidity providers. Deploy your strategy across multiple
              exchanges from a single, sovereign dashboard.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {exchanges.map(({ initial, name, color, bg }) => (
                <div
                  key={name}
                  className="group flex items-center gap-3 grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all cursor-pointer p-3 rounded-xl hover:bg-white/[0.04]"
                >
                  <div
                    className={`w-8 h-8 ${bg} rounded-full flex items-center justify-center font-bold text-sm ${color} flex-shrink-0 font-mono`}
                  >
                    {initial}
                  </div>
                  <span className="font-semibold text-white text-sm">
                    {name}
                  </span>
                </div>
              ))}
            </div>

            <p className="text-xs text-[#8f9098] mt-4 font-medium">
              + 12 more exchanges in beta integration
            </p>
          </div>

          {/* Right: status card */}
          <div className="relative h-[300px] rounded-2xl overflow-hidden shadow-2xl shadow-slate-950 bg-[#171f33] border border-white/[0.06]">
            {/* Network visualization background */}
            <div className="absolute inset-0 opacity-20">
              {/* SVG network dots */}
              <svg
                className="w-full h-full"
                viewBox="0 0 400 300"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Connection lines */}
                {[
                  [200, 150, 80, 60],
                  [200, 150, 320, 60],
                  [200, 150, 60, 200],
                  [200, 150, 340, 200],
                  [200, 150, 150, 270],
                  [200, 150, 260, 270],
                  [80, 60, 320, 60],
                  [60, 200, 150, 270],
                  [340, 200, 260, 270],
                ].map(([x1, y1, x2, y2], i) => (
                  <line
                    key={i}
                    x1={x1}
                    y1={y1}
                    x2={x2}
                    y2={y2}
                    stroke="#4edea3"
                    strokeWidth="0.5"
                    strokeOpacity="0.4"
                  />
                ))}
                {/* Nodes */}
                {[
                  [200, 150],
                  [80, 60],
                  [320, 60],
                  [60, 200],
                  [340, 200],
                  [150, 270],
                  [260, 270],
                ].map(([cx, cy], i) => (
                  <circle
                    key={i}
                    cx={cx}
                    cy={cy}
                    r={i === 0 ? 6 : 4}
                    fill="#4edea3"
                    fillOpacity={i === 0 ? 0.8 : 0.4}
                  />
                ))}
              </svg>
            </div>

            <div className="absolute inset-0 bg-gradient-to-t from-[#0b1326] via-transparent to-transparent" />

            <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between">
              <div
                className="backdrop-blur-md px-4 py-2 rounded-lg border border-white/10"
                style={{ background: "rgba(34, 42, 61, 0.9)" }}
              >
                <span className="text-xs text-[#c5c6ce] block uppercase tracking-tighter">
                  Secure API Tunnels
                </span>
                <span className="text-sm font-bold text-emerald-400">
                  ACTIVE — 99.8% UPTIME
                </span>
              </div>
              <div
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-white/10 backdrop-blur-md"
                style={{ background: "rgba(34, 42, 61, 0.9)" }}
              >
                <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                <span className="text-xs font-bold text-emerald-400">LIVE</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
