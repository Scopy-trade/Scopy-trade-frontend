import Link from "next/link";

export default function CtaSection() {
  return (
    <section className="py-32 px-6 lg:px-24">
      <div className="max-w-7xl mx-auto">
        <div
          className="relative rounded-[2.5rem] overflow-hidden p-16 text-center border border-[#b6c4ff]/20"
          style={{ background: "#002371" }}
        >
          {/* Radial glow */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(circle at center, rgba(182,196,255,0.10) 0%, transparent 70%)",
            }}
          />

          <div className="relative z-10 max-w-2xl mx-auto">
            <h2
              className="text-5xl font-black tracking-tight mb-8 text-[#dae2fd]"
              style={{
                fontFamily: "var(--font-headline)",
                letterSpacing: "-0.03em",
              }}
            >
              Join the Next Generation of Copy Trading.
            </h2>
            <p className="text-lg text-[#b6c4ff]/80 mb-12 leading-relaxed">
              Whether you are building wealth or building an empire, SCopyTrade
              is the sovereign choice for serious finance.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Link
                href="/register"
                className="px-10 py-5 bg-emerald-400 text-[#003824] font-bold rounded-xl shadow-xl shadow-emerald-400/30 active:scale-95 transition-transform hover:bg-emerald-300"
              >
                Launch Terminal
              </Link>
              <Link
                href="#"
                className="px-10 py-5 bg-[#dce1ff] text-[#002371] font-bold rounded-xl border border-[#b6c4ff]/30 hover:bg-white transition-all active:scale-95"
              >
                Read Documentation
              </Link>
            </div>

            {/* Bottom trust signals */}
            <div className="mt-14 pt-10 border-t border-white/[0.08] grid grid-cols-2 md:grid-cols-4 gap-8">
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
                  <p className="text-xs text-[#b6c4ff]/60 uppercase tracking-widest font-semibold">
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
