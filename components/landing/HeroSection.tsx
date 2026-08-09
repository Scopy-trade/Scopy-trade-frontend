const stats = [
  { value: "$1.2B+", label: "Projected Copy Volume", color: "text-emerald-400" },
  { value: "450+", label: "Target Pro Traders", color: "text-[#b6c4ff]" },
  { value: "12k+", label: "Target Terminal Users", color: "text-white" },
];

export default function HeroSection() {
  return (
    <section
      id="home"
      className="relative min-h-175 flex items-center justify-center overflow-hidden px-6 lg:px-24 pt-24 pb-0"
    >
      {/* Background blobs */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-[#b6c4ff]/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-emerald-400/10 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-6xl w-full text-center space-y-8">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#2d3449] rounded-full border border-white/10 mx-auto">
          <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
          <span className="text-xs font-medium tracking-widest uppercase text-on-surface-variant">
            Dual-Side Trading Marketplace
          </span>
        </div>

        {/* Headline */}
        <h1
          className="text-5xl md:text-7xl font-extrabold tracking-tighter leading-tight text-white max-w-4xl mx-auto"
          style={{ fontFamily: "var(--font-headline)" }}
        >
          The Sovereign Terminal for <br className="hidden md:block" />
          <span className="text-transparent bg-clip-text bg-linear-to-r from-emerald-400 to-[#b6c4ff]">
            Both Sides of the Trade.
          </span>
        </h1>

        <p className="text-xl text-on-surface-variant max-w-2xl mx-auto leading-relaxed">
          Whether you&apos;re following elite signals or providing them,
          SCopyTrade provides the institutional infrastructure to trade with
          total control and zero custody.
        </p>

        {/* Metrics */}
        <p className="pt-8 text-[10px] font-bold uppercase tracking-[0.2em] text-on-surface-variant">
          Startup growth projections — targets, not historical results
        </p>
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 pt-2">
          {stats.map(({ value, label, color }) => (
            <div key={label} className="text-center">
              <p
                className={`text-3xl font-black ${color}`}
                style={{ fontFamily: "var(--font-headline)" }}
              >
                {value}
              </p>
              <p className="text-xs uppercase tracking-widest text-on-surface-variant font-semibold mt-1">
                {label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
