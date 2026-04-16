import Image from "next/image";

const exchanges = [
  { initial: "B", name: "Binance" },
  { initial: "O", name: "OKX" },
  { initial: "C", name: "Coinbase" },
  { initial: "K", name: "KuCoin" },
  { initial: "B", name: "Bybit" },
  { initial: "G", name: "Gate.io" },
];

export default function ExchangesSection() {
  return (
    <section className="py-24 bg-[var(--color-surface)] px-6 lg:px-24">
      <div className="glass-panel p-8 md:p-12 rounded-3xl border border-[var(--color-outline-variant)]/10 max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: text + exchange grid */}
          <div>
            <h2
              className="text-3xl font-bold mb-6 text-[var(--color-on-surface)]"
              style={{ fontFamily: "var(--font-headline)" }}
            >
              Global Integration Ecosystem
            </h2>
            <p className="text-[var(--color-on-surface-variant)] mb-8 leading-relaxed">
              SCopyTrade connects seamlessly with the world&apos;s leading
              liquidity providers. Deploy your strategy across multiple
              exchanges from a single, sovereign dashboard.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
              {exchanges.map(({ initial, name }) => (
                <div
                  key={name}
                  className="flex items-center gap-3 grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all cursor-pointer"
                >
                  <div className="w-8 h-8 bg-[var(--color-on-surface)]/10 rounded-full flex items-center justify-center font-bold text-[var(--color-on-surface)] text-sm flex-shrink-0">
                    {initial}
                  </div>
                  <span className="font-semibold text-[var(--color-on-surface)]">
                    {name}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: network image with overlay badge */}
          <div className="relative h-[300px] rounded-2xl overflow-hidden shadow-2xl shadow-slate-950">
            <Image
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAwVTGIgHN3Q5hKWwR80J6yQGWIXyNj4WcsRBjnvqz9hL4cecgTl8_Ht6rXpzKUeYyRoNwex68fdQNzicFCqyp-Y_22lf5yFv7OQvgP30TgpssmGTrmOgFW4EwSGOMerrSZ_e3t8KkTIAf5tbZkXiNyWhM2hUCYHYB-84ydPKRHTKh-FNHAx6_zJpLnzVwIKHMd6Y35qmnamN4NCWH7KbLiPUagZtQl5LMDLb_t930OY5Oy6BXLMzUUZ5H5vDu2ycseTlPt_kaWnw"
              alt="Abstract digital connection network with emerald green nodes"
              fill
              className="object-cover"
              unoptimized
            />
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-background)] via-transparent to-transparent" />

            {/* Status badge */}
            <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between">
              <div className="bg-[var(--color-surface-container-high)]/90 backdrop-blur-md px-4 py-2 rounded-lg border border-[var(--color-outline-variant)]/20">
                <span className="text-xs text-[var(--color-on-surface-variant)] block uppercase tracking-tighter">
                  Secure API Tunnels
                </span>
                <span className="text-sm font-bold text-[var(--color-secondary)]">
                  ACTIVE 100.0% UPTIME
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
