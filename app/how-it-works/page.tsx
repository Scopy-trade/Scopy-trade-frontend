import TopNavBar from "@/components/landing/TopNavBar";
import Footer from "@/components/landing/Footer";
import Link from "next/link";

export const metadata = {
  title: "How It Works | SCopyTrade",
  description:
    "A non-custodial copy trading infrastructure where professional strategies meet global liquidity. No middlemen. No delay. Complete autonomy.",
};

// ─── Dual Steps Data ──────────────────────────────────────────────────────────

const copyTraderSteps = [
  {
    n: "01",
    title: "Connect API",
    body: "Securely link your exchange account. Your funds stay in your wallet. SCopyTrade only sends execution signals.",
  },
  {
    n: "02",
    title: "Choose Pro Trader",
    body: "Browse verified performance metrics. Select strategies that align with your risk appetite and target ROI.",
  },
  {
    n: "03",
    title: "Instant Mirroring",
    body: "Execute trades at millisecond speed. Every move from the pro is instantly mirrored in your sub-account.",
  },
];

const proTraderSteps = [
  {
    n: "01",
    title: "Create Signal",
    body: "Trade as you normally would on your preferred platform. Our engine monitors your execution in real-time.",
  },
  {
    n: "02",
    title: "Broadcast",
    body: "Signals are automatically cleaned and distributed to your subscriber pool through our high-performance relay.",
  },
  {
    n: "03",
    title: "Earn Commission",
    body: "Monetize your expertise. Receive performance-based fees automatically settled to your sovereign wallet.",
  },
];

// ─── Security Cards ───────────────────────────────────────────────────────────

const securityCards = [
  {
    title: "Non-Custodial",
    body: "Funds never leave your account. We only mirror trade commands via restricted API permissions.",
    icon: (
      <path
        d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    ),
  },
  {
    title: "Encrypted Keys",
    body: "API keys are stored using multi-layer HSM with AES-256 encryption. Zero plaintext ever touches disk.",
    icon: (
      <>
        <rect
          x="3"
          y="11"
          width="18"
          height="11"
          rx="2"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <path
          d="M7 11V7a5 5 0 0 1 10 0v4"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <circle cx="12" cy="16" r="1" fill="currentColor" />
      </>
    ),
  },
  {
    title: "Read-Only Permissions",
    body: "We request the minimum viable scope. Withdrawal permissions are structurally impossible to grant.",
    icon: (
      <>
        <path
          d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.5" />
      </>
    ),
  },
  {
    title: "Audit Trail",
    body: "Every action is immutably logged. Review your complete execution history at any time.",
    icon: (
      <>
        <path
          d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        <path
          d="M14 2v6h6M16 13H8M16 17H8M10 9H8"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </>
    ),
  },
];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function HowItWorksPage() {
  return (
    <div
      className="bg-[#060e20] text-[#dae2fd] antialiased"
      style={{ fontFamily: "var(--font-body)" }}
    >
      <TopNavBar />

      <main className="pt-20">
        {/* ── Hero ─────────────────────────────────────────────────────────── */}
        <section
          className="relative flex flex-col justify-center items-center px-8 py-28 text-center overflow-hidden"
          style={{
            backgroundImage:
              "radial-gradient(at 0% 0%, rgba(182,196,255,0.10) 0, transparent 50%), radial-gradient(at 100% 100%, rgba(78,222,163,0.06) 0, transparent 50%)",
          }}
        >
          {/* Subtle grid texture */}
          <div
            className="absolute inset-0 opacity-[0.025] pointer-events-none"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)",
              backgroundSize: "48px 48px",
            }}
          />

          {/* Glow blobs — positioned differently from landing hero */}
          <div className="absolute left-0 top-0 w-72 h-72 bg-[#b6c4ff]/8 rounded-full blur-[100px] pointer-events-none" />
          <div className="absolute right-0 bottom-0 w-64 h-64 bg-[#4edea3]/6 rounded-full blur-[80px] pointer-events-none" />

          <div className="relative z-10 max-w-3xl mx-auto space-y-6">
            {/* Badge */}
            <span className="inline-block px-4 py-1.5 rounded-full bg-[#002371] text-[#768ee3] text-xs font-bold tracking-widest uppercase border border-[#b6c4ff]/20">
              The Dual-Sided Marketplace
            </span>

            {/* Headline — layout differs from landing: left-aligned number style */}
            <div className="space-y-2">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#8f9098]">
                How It Works
              </p>
              <h1
                className="text-5xl md:text-6xl font-extrabold leading-tight tracking-tight text-white"
                style={{
                  fontFamily: "var(--font-headline)",
                  letterSpacing: "-0.04em",
                }}
              >
                Institutional Precision.{" "}
                <span className="text-[#4edea3]">Sovereign Control.</span>
              </h1>
            </div>

            <p className="text-[#c5c6ce] text-lg md:text-xl max-w-2xl mx-auto font-light leading-relaxed">
              A non-custodial copy trading infrastructure where professional
              strategies meet global liquidity. No middlemen. No delay. Complete
              autonomy.
            </p>

            {/* Subtle stat strip — replaces avatar cluster */}
            <div className="flex items-center justify-center gap-8 pt-4">
              {[
                { v: "<100ms", l: "Execution" },
                { v: "99.99%", l: "Uptime" },
                { v: "AES-256", l: "Encryption" },
              ].map(({ v, l }) => (
                <div key={l} className="text-center">
                  <p
                    className="text-base font-black text-white font-mono"
                    style={{ fontFamily: "var(--font-headline)" }}
                  >
                    {v}
                  </p>
                  <p className="text-[10px] uppercase tracking-widest text-[#8f9098] font-semibold">
                    {l}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Dual Steps Grid ───────────────────────────────────────────────── */}
        <section className="px-6 lg:px-8 py-24 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
            {/* Copy Trader Journey */}
            <div className="bg-[#131b2e] rounded-2xl p-8 flex flex-col gap-10 border border-white/[0.05]">
              <div className="flex items-center justify-between">
                <h2
                  className="text-2xl font-bold text-white"
                  style={{ fontFamily: "var(--font-headline)" }}
                >
                  For Copy Traders
                </h2>
                <div className="w-10 h-10 rounded-xl bg-[#b6c4ff]/10 flex items-center justify-center">
                  <svg
                    className="w-5 h-5 text-[#b6c4ff]"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      d="M3 17l6-6 4 4 8-9"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M17 8h4v4"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>

              <div className="space-y-10 relative">
                {/* Connector line */}
                <div className="absolute left-6 top-4 bottom-4 w-px bg-white/[0.06]" />

                {copyTraderSteps.map(({ n, title, body }) => (
                  <div key={n} className="relative z-10 flex gap-6">
                    <div
                      className="flex-shrink-0 w-12 h-12 rounded-xl bg-[#2d3449] flex items-center justify-center font-black text-sm text-[#b6c4ff]"
                      style={{ fontFamily: "var(--font-headline)" }}
                    >
                      {n}
                    </div>
                    <div>
                      <h3
                        className="font-bold text-white mb-1.5"
                        style={{ fontFamily: "var(--font-headline)" }}
                      >
                        {title}
                      </h3>
                      <p className="text-[#c5c6ce] text-sm leading-relaxed">
                        {body}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-auto pt-4">
                <Link
                  href="/register"
                  className="block w-full bg-[#222a3d] hover:bg-[#2d3449] text-white text-center py-4 rounded-xl font-bold transition-all active:scale-[0.98] border border-white/[0.06]"
                >
                  Explore Strategies
                </Link>
              </div>
            </div>

            {/* Pro Trader Journey */}
            <div className="bg-[#171f33] rounded-2xl p-8 flex flex-col gap-10 border border-white/[0.06]">
              <div className="flex items-center justify-between">
                <h2
                  className="text-2xl font-bold text-white"
                  style={{ fontFamily: "var(--font-headline)" }}
                >
                  For Pro Traders
                </h2>
                <div className="w-10 h-10 rounded-xl bg-[#4edea3]/10 flex items-center justify-center">
                  <svg
                    className="w-5 h-5 text-[#4edea3]"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>

              <div className="space-y-10 relative">
                <div className="absolute left-6 top-4 bottom-4 w-px bg-white/[0.06]" />

                {proTraderSteps.map(({ n, title, body }) => (
                  <div key={n} className="relative z-10 flex gap-6">
                    <div
                      className="flex-shrink-0 w-12 h-12 rounded-xl bg-[#2d3449] flex items-center justify-center font-black text-sm text-[#4edea3]"
                      style={{ fontFamily: "var(--font-headline)" }}
                    >
                      {n}
                    </div>
                    <div>
                      <h3
                        className="font-bold text-white mb-1.5"
                        style={{ fontFamily: "var(--font-headline)" }}
                      >
                        {title}
                      </h3>
                      <p className="text-[#c5c6ce] text-sm leading-relaxed">
                        {body}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-auto pt-4">
                <Link
                  href="/register?role=provider"
                  className="block w-full text-center py-4 rounded-xl font-bold transition-all active:scale-[0.98] shadow-xl text-[#003824]"
                  style={{
                    background:
                      "linear-gradient(135deg, #4edea3 0%, #00a572 100%)",
                  }}
                >
                  Apply as Strategist
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ── Security Architecture ─────────────────────────────────────────── */}
        <section className="bg-[#131b2e] py-24 relative overflow-hidden">
          {/* Decorative blob */}
          <div className="absolute -right-40 top-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#b6c4ff]/5 rounded-full blur-[120px] pointer-events-none" />

          <div className="max-w-7xl mx-auto px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
            {/* Left: copy */}
            <div className="space-y-8">
              <div className="flex items-center gap-3">
                <svg
                  className="w-5 h-5 text-[#4edea3]"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
                <span className="text-[#4edea3] font-bold tracking-widest text-xs uppercase">
                  Security Architecture
                </span>
              </div>

              <h2
                className="text-4xl md:text-5xl font-extrabold leading-tight text-white"
                style={{
                  fontFamily: "var(--font-headline)",
                  letterSpacing: "-0.03em",
                }}
              >
                The Sovereign Guard
              </h2>

              <p className="text-[#c5c6ce] text-lg leading-relaxed">
                Security isn&apos;t a feature; it&apos;s our foundation.
                We&apos;ve built an institutional-grade envelope that ensures
                you never lose custody of your capital.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {securityCards.map(({ title, body, icon }) => (
                  <div
                    key={title}
                    className="p-6 bg-[#222a3d] rounded-2xl space-y-3 border border-white/[0.05] hover:border-[#b6c4ff]/20 transition-colors"
                  >
                    <svg
                      className="w-5 h-5 text-[#b6c4ff]"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      {icon}
                    </svg>
                    <h4
                      className="font-bold text-white"
                      style={{ fontFamily: "var(--font-headline)" }}
                    >
                      {title}
                    </h4>
                    <p className="text-xs text-[#c5c6ce] leading-relaxed">
                      {body}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: visual terminal card */}
            <div className="relative group">
              <div className="absolute -inset-4 bg-[#b6c4ff]/8 rounded-3xl blur-3xl group-hover:bg-[#b6c4ff]/14 transition-all duration-700 pointer-events-none" />
              <div
                className="relative rounded-3xl p-8 border border-white/[0.08]"
                style={{
                  background: "rgba(49, 57, 77, 0.7)",
                  backdropFilter: "blur(20px)",
                  WebkitBackdropFilter: "blur(20px)",
                }}
              >
                {/* Terminal header */}
                <div className="flex items-center gap-2 mb-6">
                  <div className="w-3 h-3 rounded-full bg-red-500/50" />
                  <div className="w-3 h-3 rounded-full bg-amber-500/50" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/50" />
                  <span className="ml-3 text-xs text-[#8f9098] font-mono tracking-wider">
                    SECURITY MODULE — AES-256
                  </span>
                </div>

                {/* Animated SVG network */}
                <div className="rounded-2xl overflow-hidden bg-[#060e20] border border-white/[0.06] p-6 mb-6">
                  <svg
                    viewBox="0 0 360 200"
                    className="w-full"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    {/* Lines */}
                    {[
                      [180, 100, 60, 40],
                      [180, 100, 300, 40],
                      [180, 100, 40, 160],
                      [180, 100, 320, 160],
                      [180, 100, 130, 180],
                      [180, 100, 230, 180],
                      [60, 40, 300, 40],
                      [40, 160, 130, 180],
                      [320, 160, 230, 180],
                    ].map(([x1, y1, x2, y2], i) => (
                      <line
                        key={i}
                        x1={x1}
                        y1={y1}
                        x2={x2}
                        y2={y2}
                        stroke="#b6c4ff"
                        strokeWidth="0.6"
                        strokeOpacity="0.25"
                      />
                    ))}
                    {/* Nodes */}
                    {[
                      { cx: 180, cy: 100, r: 7, fill: "#4edea3" },
                      { cx: 60, cy: 40, r: 4, fill: "#b6c4ff" },
                      { cx: 300, cy: 40, r: 4, fill: "#b6c4ff" },
                      { cx: 40, cy: 160, r: 4, fill: "#b6c4ff" },
                      { cx: 320, cy: 160, r: 4, fill: "#b6c4ff" },
                      { cx: 130, cy: 180, r: 3, fill: "#4edea3" },
                      { cx: 230, cy: 180, r: 3, fill: "#4edea3" },
                    ].map(({ cx, cy, r, fill }, i) => (
                      <circle
                        key={i}
                        cx={cx}
                        cy={cy}
                        r={r}
                        fill={fill}
                        fillOpacity="0.7"
                      />
                    ))}
                    {/* Center pulse ring */}
                    <circle
                      cx="180"
                      cy="100"
                      r="14"
                      stroke="#4edea3"
                      strokeWidth="1"
                      strokeOpacity="0.3"
                    />
                    <circle
                      cx="180"
                      cy="100"
                      r="22"
                      stroke="#4edea3"
                      strokeWidth="0.5"
                      strokeOpacity="0.15"
                    />
                  </svg>
                </div>

                {/* Status row */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center text-xs font-bold uppercase tracking-wider text-[#c5c6ce]">
                    <span>Encryption Sync</span>
                    <span className="text-[#4edea3]">Active</span>
                  </div>
                  <div className="w-full h-1 bg-[#060e20] rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full w-2/3 animate-pulse"
                      style={{
                        background:
                          "linear-gradient(90deg, #b6c4ff 0%, #4edea3 100%)",
                      }}
                    />
                  </div>
                  <div className="flex justify-between text-[10px] text-[#8f9098] font-mono">
                    <span>API TUNNEL</span>
                    <span>READ / TRADE ONLY</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Final CTA ────────────────────────────────────────────────────── */}
        <section className="py-32 px-8 text-center bg-[#060e20]">
          <div className="max-w-3xl mx-auto space-y-10">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#8f9098]">
              Ready to begin?
            </p>
            <h2
              className="text-3xl md:text-5xl font-extrabold text-white"
              style={{
                fontFamily: "var(--font-headline)",
                letterSpacing: "-0.03em",
              }}
            >
              Ready to automate your
              <br />
              sovereign edge?
            </h2>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-2">
              <Link
                href="/register"
                className="px-10 py-5 rounded-xl font-bold text-[#003824] shadow-2xl hover:scale-105 transition-all active:scale-95"
                style={{
                  background:
                    "linear-gradient(135deg, #4edea3 0%, #00a572 100%)",
                }}
              >
                Start Copying Now
              </Link>
              <Link
                href="/register?role=provider"
                className="bg-[#131b2e] border border-white/[0.08] px-10 py-5 rounded-xl font-bold hover:bg-[#171f33] hover:border-white/[0.14] transition-all active:scale-95 text-white"
              >
                Become a Trader
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
