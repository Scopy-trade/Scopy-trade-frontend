import Link from "next/link";
import Image from "next/image";

const avatars = [
  {
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuCKSRye1Fsdw3KuT7mbrHAW1RpnKcJOKtSwUazF_BMHrQoF97sVTQOw96FLrFkU5YzFAZvxWku0SfYDGiSv4quhnHpTubc-bzXbGwQIyWBK-oF9KuShypRAzk0vlybGJ_rCAFDLxGVFj63rAGj5v4mOPvSLgYR9saxi_jmsZmZ0H3fEFrT2AdXMw8JP9YinusCDbNyjV2uRgv3WzoF8cz79TOTUJnGv_XQtiNyUb0ayPf5CZZX83Q9tkSKGv1PljfdYh7NREnFDvQ",
    alt: "Trader avatar",
  },
  {
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuAV-RJ9qag3r4YOX6Se1bT3VszMhYfvs-s5IARR4b0ECFxI8WICgJfD2GRtPnvhiCv7BA_mfqqNx5ome9MoCuM9rBx_Bjqq8eJDp-dDYAP_wJFXmWAvHls1bub3RGqbP7C84hWqQlFTZNLhVYEKLp8zW-E8HxYjTCmxRqlmUJL1Rq9aHJjc5Sf7N2caFyNzlaF46TjBWzePHnddoLznH4ZU8RCNMkvrNacO7dSvSl5l9K7IGfiYn5UUeDQKIWmkvuUMOPNjGTXe1Q",
    alt: "Analyst avatar",
  },
  {
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuBE5TmhrEZEwcVHsOvfBmAZXJWH6Nw5T12tKy9FMeees_oHzkrAb0ta5WuyJ-t0OdbvF-e5IgNXoVd5czJmiukJKC_R4ZowxiMxV4SzPgD-9RWKS-yIlduepUBbij0g3Kh9qnMfs9mwsrW64LU1sD4MMQtuQEGwFaPObqixJoCuu2lrF1ygeHhs0SrzPY_3Z1KQ4kw0KD2fItu63wXE6myLRC5--s7XiopqJTqYzcQCMlDp0bB593CtgDUHA6w1EHR7GFGjsQAWNQ",
    alt: "Professional avatar",
  },
];

const chartBars = [22, 38, 28, 55, 42, 68, 58, 82, 72, 91];

const stats = [
  { value: "$2.4B+", label: "Volume Traded" },
  { value: "2,500+", label: "Active Traders" },
  { value: "99.8%", label: "Uptime SLA" },
];

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-6 lg:px-16 pt-32 pb-20">
      {/* Background effects */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
          }}
        />
        {/* Glow blobs */}
        <div className="absolute top-1/3 left-1/4 w-[600px] h-[600px] bg-emerald-500/5 rounded-full blur-[150px]" />
        <div className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] bg-teal-400/5 rounded-full blur-[120px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[300px] bg-emerald-600/3 rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-7xl w-full">
        {/* Eyebrow badge */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex items-center gap-2.5 px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full">
            <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
            <span className="text-xs font-semibold tracking-[0.12em] uppercase text-emerald-400">
              Live Trading Infrastructure
            </span>
          </div>
        </div>

        {/* Headline */}
        <div className="text-center max-w-5xl mx-auto mb-8">
          <h1
            className="text-6xl md:text-7xl lg:text-[88px] font-black tracking-[-0.04em] leading-[0.92] text-white mb-6"
            style={{ fontFamily: "var(--font-headline)" }}
          >
            Trade Smarter. <br />
            <span
              className="text-transparent"
              style={{
                WebkitTextStroke: "1px rgba(255,255,255,0.15)",
              }}
            >
              Stay Sovereign.
            </span>
          </h1>
          <p className="text-lg md:text-xl text-zinc-400 leading-relaxed max-w-2xl mx-auto font-medium">
            Mirror elite trader signals directly on your exchange — no custody,
            no counterparty risk, total transparency. Built for traders who
            never compromise on security.
          </p>
        </div>

        {/* CTA row */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <Link
            href="/register"
            className="group relative px-8 py-4 bg-emerald-500 text-white font-bold rounded-xl text-base hover:bg-emerald-400 active:scale-[0.98] transition-all duration-200 shadow-2xl shadow-emerald-500/25 overflow-hidden"
          >
            <span className="relative z-10 flex items-center gap-2">
              Start Trading Free
              <svg
                className="w-4 h-4 group-hover:translate-x-0.5 transition-transform"
                viewBox="0 0 16 16"
                fill="none"
              >
                <path
                  d="M3 8h10M9 4l4 4-4 4"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </Link>
          <Link
            href="#"
            className="px-8 py-4 border border-white/10 text-zinc-300 font-semibold rounded-xl text-base hover:bg-white/[0.04] hover:border-white/20 active:scale-[0.98] transition-all duration-200 backdrop-blur-sm"
          >
            View Live Signals
          </Link>
        </div>

        {/* Social proof */}
        <div className="flex items-center justify-center gap-6 mb-20">
          <div className="flex -space-x-2.5">
            {avatars.map((a) => (
              <div
                key={a.alt}
                className="w-9 h-9 rounded-full border-2 border-[#080C10] overflow-hidden ring-1 ring-white/10"
              >
                <Image
                  src={a.src}
                  alt={a.alt}
                  width={36}
                  height={36}
                  className="w-full h-full object-cover"
                  unoptimized
                />
              </div>
            ))}
          </div>
          <div className="h-4 w-px bg-white/10" />
          <p className="text-sm text-zinc-500 font-medium">
            Trusted by{" "}
            <span className="text-zinc-300 font-semibold">2,500+ traders</span>{" "}
            worldwide
          </p>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto mb-20">
          {stats.map(({ value, label }) => (
            <div key={label} className="text-center">
              <div
                className="text-2xl md:text-3xl font-black text-white mb-1"
                style={{
                  fontFamily: "var(--font-headline)",
                  letterSpacing: "-0.03em",
                }}
              >
                {value}
              </div>
              <div className="text-xs text-zinc-600 uppercase tracking-widest font-semibold">
                {label}
              </div>
            </div>
          ))}
        </div>

        {/* Trading card UI mockup */}
        <div className="relative max-w-4xl mx-auto">
          {/* Outer glow */}
          <div className="absolute -inset-px rounded-2xl bg-gradient-to-b from-white/[0.08] to-transparent" />
          <div className="relative bg-[#0D1117] rounded-2xl border border-white/[0.06] overflow-hidden shadow-2xl shadow-black/60">
            {/* Terminal header bar */}
            <div className="flex items-center justify-between px-5 py-3.5 border-b border-white/[0.05] bg-white/[0.02]">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/50" />
                <div className="w-3 h-3 rounded-full bg-amber-500/50" />
                <div className="w-3 h-3 rounded-full bg-emerald-500/50" />
              </div>
              <span className="text-xs text-zinc-600 font-mono tracking-wider">
                ALPHA WHALE STRATEGY — BTC/USDT
              </span>
              <span className="text-xs font-bold text-emerald-400 font-mono">
                +12.4%
              </span>
            </div>

            <div className="p-6 md:p-8 grid md:grid-cols-3 gap-6 md:gap-8">
              {/* Chart area */}
              <div className="md:col-span-2">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3
                      className="text-white font-bold text-lg mb-0.5"
                      style={{ fontFamily: "var(--font-headline)" }}
                    >
                      Performance
                    </h3>
                    <p className="text-zinc-600 text-xs font-mono">
                      LAST 10 PERIODS
                    </p>
                  </div>
                  <div className="flex gap-1">
                    {["1D", "1W", "1M"].map((t, i) => (
                      <button
                        key={t}
                        className={`px-3 py-1 rounded text-xs font-semibold transition-all ${
                          i === 1
                            ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/20"
                            : "text-zinc-600 hover:text-zinc-400"
                        }`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Chart */}
                <div className="h-40 flex items-end gap-1.5">
                  {chartBars.map((h, i) => (
                    <div key={i} className="flex-1 flex flex-col justify-end">
                      <div
                        className="rounded-t-sm transition-all relative overflow-hidden"
                        style={{
                          height: `${h}%`,
                          background:
                            i === chartBars.length - 1
                              ? "linear-gradient(to top, #10b981, #34d399)"
                              : "rgba(16, 185, 129, 0.2)",
                        }}
                      />
                    </div>
                  ))}
                </div>

                {/* Chart x labels */}
                <div className="flex justify-between mt-2">
                  {[
                    "Jan",
                    "Feb",
                    "Mar",
                    "Apr",
                    "May",
                    "Jun",
                    "Jul",
                    "Aug",
                    "Sep",
                    "Oct",
                  ].map((m) => (
                    <span
                      key={m}
                      className="text-[10px] text-zinc-700 font-mono"
                    >
                      {m}
                    </span>
                  ))}
                </div>
              </div>

              {/* Trade info */}
              <div className="space-y-4">
                <div className="bg-emerald-500/5 border border-emerald-500/10 rounded-xl p-4">
                  <p className="text-xs text-zinc-600 uppercase tracking-widest mb-1 font-semibold">
                    Current Signal
                  </p>
                  <p
                    className="text-emerald-400 font-black text-xl font-mono"
                    style={{ fontFamily: "var(--font-headline)" }}
                  >
                    LONG
                  </p>
                </div>

                <div className="space-y-3">
                  {[
                    { l: "Pair", v: "BTC/USDT" },
                    { l: "Entry", v: "$64,231.00" },
                    { l: "Stop Loss", v: "$61,800.00" },
                    { l: "Take Profit", v: "$69,500.00" },
                  ].map(({ l, v }) => (
                    <div
                      key={l}
                      className="flex justify-between items-center py-2 border-b border-white/[0.04]"
                    >
                      <span className="text-xs text-zinc-600 font-medium">
                        {l}
                      </span>
                      <span className="text-xs text-zinc-300 font-mono font-bold">
                        {v}
                      </span>
                    </div>
                  ))}
                </div>

                <button className="w-full py-3 bg-emerald-500 text-white font-bold rounded-xl text-sm hover:bg-emerald-400 active:scale-[0.98] transition-all shadow-lg shadow-emerald-500/20">
                  Execute Trade
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
