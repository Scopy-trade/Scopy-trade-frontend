import Link from "next/link";

export default function CtaSection() {
  return (
    <section className="py-32 px-6 lg:px-16 relative bg-[#080C10]">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

      <div className="max-w-7xl mx-auto">
        {/* Main CTA block */}
        <div className="relative rounded-3xl overflow-hidden border border-white/[0.06] bg-[#0D1117]">
          {/* Background decorations */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {/* Grid */}
            <div
              className="absolute inset-0 opacity-[0.025]"
              style={{
                backgroundImage: `
                  linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)
                `,
                backgroundSize: "40px 40px",
              }}
            />
            {/* Glows */}
            <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-emerald-500/8 rounded-full blur-[100px]" />
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-teal-500/5 rounded-full blur-[80px]" />
            <div className="absolute bottom-0 right-0 w-80 h-80 bg-emerald-600/5 rounded-full blur-[80px]" />
          </div>

          <div className="relative z-10 px-8 md:px-16 lg:px-24 py-20 md:py-28">
            {/* Top row with badge */}
            <div className="flex flex-col lg:flex-row lg:items-center gap-12 lg:gap-16">
              {/* Left: text */}
              <div className="flex-1">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-emerald-500/10 border border-emerald-500/15 rounded-full mb-8">
                  <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
                  <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">
                    Start in under 5 minutes
                  </span>
                </div>

                <h2
                  className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.0] mb-6"
                  style={{
                    fontFamily: "var(--font-headline)",
                    letterSpacing: "-0.04em",
                  }}
                >
                  Ready to Trade with <br className="hidden md:block" />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400">
                    Sovereign Control?
                  </span>
                </h2>

                <p className="text-zinc-500 text-base leading-relaxed max-w-lg font-medium">
                  Join the next generation of copy trading. No custody, no risk
                  of platform insolvency, total transparency — your keys, your
                  rules.
                </p>
              </div>

              {/* Right: CTA + trust signals */}
              <div className="lg:w-80 space-y-4">
                <Link
                  href="/register"
                  className="flex items-center justify-center gap-2 w-full py-4 bg-emerald-500 text-white font-bold rounded-xl text-base hover:bg-emerald-400 active:scale-[0.98] transition-all shadow-2xl shadow-emerald-500/20"
                >
                  Create Free Account
                  <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none">
                    <path
                      d="M3 8h10M9 4l4 4-4 4"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </Link>
                <button className="flex items-center justify-center gap-2 w-full py-4 border border-white/10 text-zinc-400 font-semibold rounded-xl text-base hover:bg-white/[0.04] hover:border-white/20 active:scale-[0.98] transition-all">
                  Read Documentation
                </button>

                {/* Trust points */}
                <div className="pt-4 space-y-2.5">
                  {[
                    "No credit card required",
                    "Connect your exchange in minutes",
                    "Cancel anytime, no lock-in",
                  ].map((item) => (
                    <div
                      key={item}
                      className="flex items-center gap-2.5 text-sm text-zinc-600 font-medium"
                    >
                      <svg
                        className="w-4 h-4 text-emerald-500 flex-shrink-0"
                        viewBox="0 0 16 16"
                        fill="none"
                      >
                        <path
                          d="M3 8l3.5 3.5L13 4"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom divider stats */}
            <div className="mt-16 pt-10 border-t border-white/[0.05] grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { v: "2,500+", l: "Active Traders" },
                { v: "$2.4B+", l: "Volume Processed" },
                { v: "200+", l: "Signal Providers" },
                { v: "6", l: "Supported Exchanges" },
              ].map(({ v, l }) => (
                <div key={l} className="text-center">
                  <p
                    className="text-2xl font-black text-white mb-1 font-mono"
                    style={{ fontFamily: "var(--font-headline)" }}
                  >
                    {v}
                  </p>
                  <p className="text-xs text-zinc-700 uppercase tracking-widest font-semibold">
                    {l}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
