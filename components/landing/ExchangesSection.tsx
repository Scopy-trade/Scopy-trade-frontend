import Image from "next/image";

const exchanges = [
  {
    initial: "B",
    name: "Binance",
    color: "text-amber-400",
    bg: "bg-amber-500/10",
    volume: "$18.2B",
  },
  {
    initial: "O",
    name: "OKX",
    color: "text-blue-400",
    bg: "bg-blue-500/10",
    volume: "$4.1B",
  },
  {
    initial: "C",
    name: "Coinbase",
    color: "text-blue-300",
    bg: "bg-blue-500/10",
    volume: "$3.8B",
  },
  {
    initial: "K",
    name: "KuCoin",
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
    volume: "$1.9B",
  },
  {
    initial: "B",
    name: "Bybit",
    color: "text-orange-400",
    bg: "bg-orange-500/10",
    volume: "$5.6B",
  },
  {
    initial: "G",
    name: "Gate.io",
    color: "text-rose-400",
    bg: "bg-rose-500/10",
    volume: "$1.2B",
  },
];

export default function ExchangesSection() {
  return (
    <section className="py-32 px-6 lg:px-16 relative bg-[#080C10]">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left */}
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.15em] text-emerald-500 mb-5">
              Integrations
            </p>
            <h2
              className="text-4xl md:text-5xl font-black tracking-tight text-white leading-[1.05] mb-6"
              style={{
                fontFamily: "var(--font-headline)",
                letterSpacing: "-0.03em",
              }}
            >
              One Dashboard. <br />
              <span className="text-zinc-500">Every Exchange.</span>
            </h2>
            <p className="text-zinc-500 leading-relaxed mb-12 text-sm font-medium max-w-md">
              SCopyTrade connects seamlessly with the world&apos;s leading
              liquidity providers. Deploy your strategy across multiple
              exchanges without leaving your terminal.
            </p>

            {/* Exchange grid */}
            <div className="grid grid-cols-2 gap-3">
              {exchanges.map(({ initial, name, color, bg, volume }) => (
                <div
                  key={name}
                  className="group flex items-center justify-between p-4 bg-white/[0.02] border border-white/[0.05] rounded-xl hover:bg-white/[0.04] hover:border-white/[0.08] transition-all duration-200 cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-8 h-8 ${bg} rounded-lg flex items-center justify-center font-black text-sm ${color} flex-shrink-0 font-mono`}
                    >
                      {initial}
                    </div>
                    <span className="font-semibold text-zinc-300 text-sm group-hover:text-white transition-colors">
                      {name}
                    </span>
                  </div>
                  <span className="text-[11px] text-zinc-700 font-mono font-bold group-hover:text-zinc-500 transition-colors">
                    {volume}
                  </span>
                </div>
              ))}
            </div>

            {/* More coming */}
            <p className="text-xs text-zinc-700 mt-4 font-medium">
              + 12 more exchanges in beta integration
            </p>
          </div>

          {/* Right: feature callouts */}
          <div className="relative">
            {/* Main card */}
            <div className="relative bg-white/[0.02] border border-white/[0.05] rounded-2xl p-8 overflow-hidden">
              {/* Background image with overlay */}
              <div className="absolute inset-0 rounded-2xl overflow-hidden opacity-20">
                <Image
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAwVTGIgHN3Q5hKWwR80J6yQGWIXyNj4WcsRBjnvqz9hL4cecgTl8_Ht6rXpzKUeYyRoNwex68fdQNzicFCqyp-Y_22lf5yFv7OQvgP30TgpssmGTrmOgFW4EwSGOMerrSZ_e3t8KkTIAf5tbZkXiNyWhM2hUCYHYB-84ydPKRHTKh-FNHAx6_zJpLnzVwIKHMd6Y35qmnamN4NCWH7KbLiPUagZtQl5LMDLb_t930OY5Oy6BXLMzUUZ5H5vDu2ycseTlPt_kaWnw"
                  alt="Network visualization"
                  fill
                  className="object-cover"
                  unoptimized
                />
                <div className="absolute inset-0 bg-gradient-to-b from-[#080C10]/70 via-transparent to-[#080C10]/90" />
              </div>

              <div className="relative z-10 space-y-6">
                {/* Status */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                    <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest">
                      All Systems Operational
                    </span>
                  </div>
                  <span className="text-xs text-zinc-700 font-mono">
                    SLA: 99.8%
                  </span>
                </div>

                {/* Metrics */}
                <div className="grid grid-cols-2 gap-4 pt-4">
                  {[
                    { label: "API Latency", value: "23ms", good: true },
                    { label: "Active Connections", value: "2,847", good: true },
                    { label: "Orders Executed", value: "1.2M+", good: true },
                    { label: "Error Rate", value: "0.02%", good: true },
                  ].map(({ label, value }) => (
                    <div
                      key={label}
                      className="bg-black/40 backdrop-blur-sm border border-white/[0.06] rounded-xl p-4"
                    >
                      <p className="text-[11px] text-zinc-600 uppercase tracking-wider font-bold mb-2">
                        {label}
                      </p>
                      <p
                        className="text-xl font-black text-white font-mono"
                        style={{ fontFamily: "var(--font-headline)" }}
                      >
                        {value}
                      </p>
                    </div>
                  ))}
                </div>

                {/* API Key visual */}
                <div className="bg-black/60 backdrop-blur-sm border border-white/[0.06] rounded-xl p-4 font-mono">
                  <p className="text-[11px] text-zinc-700 uppercase tracking-wider mb-2">
                    Encrypted API Tunnel
                  </p>
                  <p className="text-xs text-emerald-500/70 truncate">
                    ••••••••••••••••••••••••••••••••••••••••••••••••••
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-[11px] text-emerald-400 font-bold">
                      ACTIVE — READ/TRADE ONLY
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
