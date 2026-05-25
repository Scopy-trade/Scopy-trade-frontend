import TopNavBar from "@/components/landing/TopNavBar";
import Footer from "@/components/landing/Footer";
import Link from "next/link";

// Team members data
const team = [
  {
    name: "Arjan Mehta",
    role: "Co-Founder & CEO",
    bio: "Former quant at Two Sigma with 12 years in algorithmic trading. Passionate about democratizing institutional tools for retail traders.",
    initials: "AM",
    accent: "emerald",
  },
  {
    name: "Sofia Chen",
    role: "Co-Founder & CTO",
    bio: "Ex-Coinbase security engineer. Built the zero-trust API architecture that powers our non-custodial infrastructure.",
    initials: "SC",
    accent: "sky",
  },
  {
    name: "Olumide Adesanya",
    role: "Head of Signal Network",
    bio: "10+ years running prop desks in Lagos and London. Curates and vets every trader on the SCopyTrade signal network.",
    initials: "OA",
    accent: "violet",
  },
  {
    name: "Priya Natarajan",
    role: "Head of Risk",
    bio: "PhD in financial mathematics from MIT. Designed the real-time drawdown monitoring and position-sizing engine.",
    initials: "PN",
    accent: "amber",
  },
  {
    name: "Marco Ricci",
    role: "Head of Product",
    bio: "Former lead designer at Kraken. Obsessed with making complex trading workflows feel effortless.",
    initials: "MR",
    accent: "rose",
  },
  {
    name: "Yuki Tanaka",
    role: "Lead Engineer",
    bio: "Systems engineer who optimized SCopyTrade's execution pipeline to sub-100ms latency across all integrated exchanges.",
    initials: "YT",
    accent: "teal",
  },
];

const values = [
  {
    icon: "⬡",
    title: "Sovereignty First",
    description:
      "We believe traders should never surrender control of their assets to access professional-grade tools. Non-custodial is not a feature — it's a philosophy.",
  },
  {
    icon: "◎",
    title: "Radical Transparency",
    description:
      "Every signal provider's live track record is audited and publicly displayed. No airbrushed backtests. No black-box performance claims.",
  },
  {
    icon: "◈",
    title: "Security Without Compromise",
    description:
      "256-bit encrypted API tunnels, read/trade-only key scoping, and zero data retention on withdrawal credentials. Your security posture is never negotiated.",
  },
  {
    icon: "⬢",
    title: "Institutional Access for All",
    description:
      "The tools and strategies used by hedge funds shouldn't require a hedge fund minimum. We're leveling the playing field, one trader at a time.",
  },
];

const milestones = [
  { year: "2021", event: "SCopyTrade founded in London by Arjan & Sofia" },
  {
    year: "2022",
    event: "Seed round closed. First 100 beta traders onboarded",
  },
  { year: "2022", event: "Binance and OKX integrations launched" },
  { year: "2023", event: "Crossed $100M in monthly trading volume" },
  { year: "2023", event: "Series A — $12M raised to scale the signal network" },
  { year: "2024", event: "2,500+ active traders. $2.4B+ cumulative volume" },
  { year: "2025", event: "Launched API analytics suite and mobile app" },
];

const accentMap: Record<string, { ring: string; bg: string; text: string }> = {
  emerald: {
    ring: "ring-emerald-500/20",
    bg: "bg-emerald-500/10",
    text: "text-emerald-400",
  },
  sky: { ring: "ring-sky-500/20", bg: "bg-sky-500/10", text: "text-sky-400" },
  violet: {
    ring: "ring-violet-500/20",
    bg: "bg-violet-500/10",
    text: "text-violet-400",
  },
  amber: {
    ring: "ring-amber-500/20",
    bg: "bg-amber-500/10",
    text: "text-amber-400",
  },
  rose: {
    ring: "ring-rose-500/20",
    bg: "bg-rose-500/10",
    text: "text-rose-400",
  },
  teal: {
    ring: "ring-teal-500/20",
    bg: "bg-teal-500/10",
    text: "text-teal-400",
  },
};

export const metadata = {
  title: "About Us | SCopyTrade",
  description:
    "Learn about SCopyTrade — the team and mission behind sovereign copy trading.",
};

export default function AboutPage() {
  return (
    <div className="bg-[#080C10] text-white antialiased selection:bg-emerald-500/30 selection:text-emerald-200">
      <TopNavBar />

      <main className="pt-28">
        {/* ─── HERO ─────────────────────────────────────────────── */}
        <section className="relative py-24 px-6 lg:px-16 overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <div
              className="absolute inset-0 opacity-[0.025]"
              style={{
                backgroundImage: `
                  linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)
                `,
                backgroundSize: "60px 60px",
              }}
            />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-emerald-500/6 rounded-full blur-[150px]" />
          </div>

          <div className="max-w-7xl mx-auto relative z-10">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-xs text-zinc-600 mb-10 font-medium">
              <Link href="/" className="hover:text-zinc-400 transition-colors">
                Home
              </Link>
              <span>/</span>
              <span className="text-zinc-400">About Us</span>
            </div>

            <div className="max-w-3xl">
              <p className="text-xs font-bold uppercase tracking-[0.15em] text-emerald-500 mb-5">
                Our Story
              </p>
              <h1
                className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tight text-white leading-[1.0] mb-8"
                style={{
                  fontFamily: "var(--font-headline)",
                  letterSpacing: "-0.04em",
                }}
              >
                Built for Traders
                <br />
                <span
                  className="text-transparent"
                  style={{ WebkitTextStroke: "1px rgba(255,255,255,0.15)" }}
                >
                  By Traders.
                </span>
              </h1>
              <p className="text-zinc-400 text-lg leading-relaxed max-w-xl font-medium">
                SCopyTrade was born out of frustration. We watched talented
                traders lose funds to exchange collapses and custodial failures.
                We decided to build something different — a trading terminal
                where sovereignty is non-negotiable.
              </p>
            </div>
          </div>
        </section>

        {/* ─── MISSION STATEMENT ───────────────────────────────── */}
        <section className="py-24 px-6 lg:px-16 relative">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              {/* Large pull quote */}
              <div className="relative">
                <div className="absolute -left-4 top-0 bottom-0 w-px bg-gradient-to-b from-emerald-500/40 to-transparent" />
                <p
                  className="text-3xl md:text-4xl font-black text-white leading-[1.15] pl-8"
                  style={{
                    fontFamily: "var(--font-headline)",
                    letterSpacing: "-0.025em",
                  }}
                >
                  &quot;The financial system wasn&apos;t built to protect retail
                  traders.
                  <span className="text-emerald-400">
                    {" "}
                    We&apos;re rebuilding it from the ground up.&quot;
                  </span>
                </p>
                <div className="mt-8 pl-8 flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 ring-1 ring-emerald-500/20 flex items-center justify-center text-sm font-black text-emerald-400">
                    AM
                  </div>
                  <div>
                    <p className="text-sm font-bold text-zinc-300">
                      Arjan Mehta
                    </p>
                    <p className="text-xs text-zinc-600">Co-Founder & CEO</p>
                  </div>
                </div>
              </div>

              {/* Stats block */}
              <div className="grid grid-cols-2 gap-4">
                {[
                  { v: "2021", l: "Founded" },
                  { v: "$2.4B+", l: "Volume Traded" },
                  { v: "2,500+", l: "Active Traders" },
                  { v: "6", l: "Exchanges Integrated" },
                ].map(({ v, l }) => (
                  <div
                    key={l}
                    className="bg-white/[0.02] border border-white/[0.05] rounded-2xl p-6"
                  >
                    <p
                      className="text-3xl font-black text-white mb-2"
                      style={{
                        fontFamily: "var(--font-headline)",
                        letterSpacing: "-0.03em",
                      }}
                    >
                      {v}
                    </p>
                    <p className="text-xs text-zinc-600 uppercase tracking-widest font-bold">
                      {l}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ─── VALUES ───────────────────────────────────────────── */}
        <section className="py-24 px-6 lg:px-16 relative bg-[#060A0E]">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
          <div className="max-w-7xl mx-auto">
            <div className="mb-14">
              <p className="text-xs font-bold uppercase tracking-[0.15em] text-emerald-500 mb-4">
                What We Stand For
              </p>
              <h2
                className="text-4xl md:text-5xl font-black text-white tracking-tight"
                style={{
                  fontFamily: "var(--font-headline)",
                  letterSpacing: "-0.03em",
                }}
              >
                Our Principles
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              {values.map(({ icon, title, description }) => (
                <div
                  key={title}
                  className="group flex gap-6 p-7 bg-white/[0.02] border border-white/[0.05] rounded-2xl hover:bg-white/[0.04] hover:border-white/[0.08] transition-all duration-300"
                >
                  <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/15 flex items-center justify-center text-emerald-400 text-lg font-mono">
                    {icon}
                  </div>
                  <div>
                    <h3
                      className="text-base font-bold text-white mb-2"
                      style={{ fontFamily: "var(--font-headline)" }}
                    >
                      {title}
                    </h3>
                    <p className="text-zinc-600 text-sm leading-relaxed font-medium">
                      {description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── TIMELINE ─────────────────────────────────────────── */}
        <section className="py-24 px-6 lg:px-16 relative">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
          <div className="max-w-4xl mx-auto">
            <div className="mb-14 text-center">
              <p className="text-xs font-bold uppercase tracking-[0.15em] text-emerald-500 mb-4">
                Our Journey
              </p>
              <h2
                className="text-4xl md:text-5xl font-black text-white tracking-tight"
                style={{
                  fontFamily: "var(--font-headline)",
                  letterSpacing: "-0.03em",
                }}
              >
                Milestones
              </h2>
            </div>

            <div className="relative">
              {/* Vertical line */}
              <div className="absolute left-[72px] top-0 bottom-0 w-px bg-gradient-to-b from-emerald-500/30 via-white/[0.04] to-transparent" />

              <div className="space-y-8">
                {milestones.map(({ year, event }, i) => (
                  <div key={i} className="flex gap-8 items-start group">
                    {/* Year */}
                    <div className="flex-shrink-0 w-[72px] text-right">
                      <span className="text-xs font-black text-zinc-700 font-mono group-hover:text-emerald-500 transition-colors">
                        {year}
                      </span>
                    </div>

                    {/* Dot */}
                    <div className="flex-shrink-0 relative z-10 mt-0.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-[#080C10] border-2 border-zinc-700 group-hover:border-emerald-500 transition-colors" />
                    </div>

                    {/* Event */}
                    <div className="flex-1 pb-2">
                      <p className="text-sm text-zinc-500 font-medium group-hover:text-zinc-300 transition-colors leading-relaxed">
                        {event}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ─── TEAM ─────────────────────────────────────────────── */}
        <section className="py-24 px-6 lg:px-16 relative bg-[#060A0E]">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
          <div className="max-w-7xl mx-auto">
            <div className="mb-14">
              <p className="text-xs font-bold uppercase tracking-[0.15em] text-emerald-500 mb-4">
                The People
              </p>
              <h2
                className="text-4xl md:text-5xl font-black text-white tracking-tight"
                style={{
                  fontFamily: "var(--font-headline)",
                  letterSpacing: "-0.03em",
                }}
              >
                Meet the Team
              </h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {team.map(({ name, role, bio, initials, accent }) => {
                const colors = accentMap[accent] || accentMap.emerald;
                return (
                  <div
                    key={name}
                    className="group bg-white/[0.02] border border-white/[0.05] rounded-2xl p-6 hover:bg-white/[0.04] hover:border-white/[0.08] transition-all duration-300"
                  >
                    {/* Avatar */}
                    <div
                      className={`w-14 h-14 rounded-2xl ${colors.bg} ring-1 ${colors.ring} flex items-center justify-center mb-5 group-hover:scale-105 transition-transform duration-300`}
                    >
                      <span
                        className={`text-lg font-black ${colors.text}`}
                        style={{ fontFamily: "var(--font-headline)" }}
                      >
                        {initials}
                      </span>
                    </div>

                    <h3
                      className="text-base font-bold text-white mb-1"
                      style={{ fontFamily: "var(--font-headline)" }}
                    >
                      {name}
                    </h3>
                    <p
                      className={`text-xs font-bold mb-3 ${colors.text} uppercase tracking-wider`}
                    >
                      {role}
                    </p>
                    <p className="text-zinc-600 text-sm leading-relaxed font-medium">
                      {bio}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ─── JOIN US CTA ──────────────────────────────────────── */}
        <section className="py-24 px-6 lg:px-16 relative">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-xs font-bold uppercase tracking-[0.15em] text-emerald-500 mb-5">
              Join the Mission
            </p>
            <h2
              className="text-4xl md:text-5xl font-black text-white tracking-tight mb-6"
              style={{
                fontFamily: "var(--font-headline)",
                letterSpacing: "-0.03em",
              }}
            >
              We&apos;re Hiring
            </h2>
            <p className="text-zinc-500 text-base leading-relaxed mb-10 font-medium">
              We&apos;re a remote-first team building the future of
              decentralized trading infrastructure. If you&apos;re passionate
              about finance, cryptography, or distributed systems — we&apos;d
              love to hear from you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="#"
                className="px-8 py-4 bg-emerald-500 text-white font-bold rounded-xl hover:bg-emerald-400 active:scale-[0.98] transition-all shadow-2xl shadow-emerald-500/20"
              >
                View Open Roles
              </Link>
              <Link
                href="/"
                className="px-8 py-4 border border-white/10 text-zinc-400 font-semibold rounded-xl hover:bg-white/[0.04] hover:border-white/20 active:scale-[0.98] transition-all"
              >
                Back to Home
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
