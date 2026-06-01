import {
  RiShieldCheckLine,
  RiSignalTowerLine,
  RiFlashlightLine,
  RiBarChartBoxLine,
} from "react-icons/ri";

const features = [
  {
    Icon: RiShieldCheckLine,
    accent: "emerald",
    tag: "Security",
    title: "Non-Custodial by Design",
    description:
      "Your funds never leave your exchange wallet. We transmit only encrypted API instructions — complete sovereignty, zero counterparty exposure.",
    metric: "0% custody risk",
  },
  {
    Icon: RiSignalTowerLine,
    accent: "primary",
    tag: "Intelligence",
    title: "Verified Expert Signals",
    description:
      "Access a curated network of high-performance algorithmic traders and fundamental analysts, each with audited live track records.",
    metric: "200+ verified traders",
  },
  {
    Icon: RiFlashlightLine,
    accent: "secondary",
    tag: "Execution",
    title: "Instant One-Click Trading",
    description:
      "Sub-100ms order placement with automated risk parameters. Stop-losses and take-profits configured to your exact risk tolerance.",
    metric: "<100ms execution",
  },
  {
    Icon: RiBarChartBoxLine,
    accent: "tertiary",
    tag: "Analytics",
    title: "Deep Portfolio Insights",
    description:
      "Real-time P&L tracking, attribution analysis, drawdown monitoring, and Sharpe ratio reporting across all connected exchanges.",
    metric: "Real-time data",
  },
];

const accentMap: Record<
  string,
  { bg: string; text: string; border: string; tagBg: string; tagText: string }
> = {
  emerald: {
    bg: "bg-emerald-500/10",
    text: "text-emerald-400",
    border: "border-emerald-500/20",
    tagBg: "bg-emerald-500/10",
    tagText: "text-emerald-400",
  },
  primary: {
    bg: "bg-[#b6c4ff]/10",
    text: "text-[#b6c4ff]",
    border: "border-[#b6c4ff]/20",
    tagBg: "bg-[#b6c4ff]/10",
    tagText: "text-[#b6c4ff]",
  },
  secondary: {
    bg: "bg-[#4edea3]/10",
    text: "text-[#4edea3]",
    border: "border-[#4edea3]/20",
    tagBg: "bg-[#4edea3]/10",
    tagText: "text-[#4edea3]",
  },
  tertiary: {
    bg: "bg-[#ffb2b9]/10",
    text: "text-[#ffb2b9]",
    border: "border-[#ffb2b9]/20",
    tagBg: "bg-[#ffb2b9]/10",
    tagText: "text-[#ffb2b9]",
  },
};

export default function FeaturesSection() {
  return (
    <section className="py-32 relative px-6 lg:px-16 bg-[#0b1326]">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20">
          <div className="max-w-xl">
            <p className="text-xs font-bold uppercase tracking-[0.15em] text-emerald-500 mb-4">
              Platform Features
            </p>
            <h2
              className="text-4xl md:text-5xl font-black tracking-tight text-white leading-[1.05]"
              style={{
                fontFamily: "var(--font-headline)",
                letterSpacing: "-0.03em",
              }}
            >
              Precision Tools for Modern Finance
            </h2>
          </div>
          <p className="text-[#c5c6ce] max-w-sm leading-relaxed text-sm font-medium md:text-right">
            Everything you need to mirror professional performance without
            compromising your security posture.
          </p>
        </div>

        {/* Feature grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {features.map(({ Icon, accent, tag, title, description, metric }) => {
            const colors = accentMap[accent];
            return (
              <div
                key={title}
                className="group relative bg-white/[0.02] border border-white/[0.05] rounded-2xl p-6 hover:bg-white/[0.04] hover:border-white/[0.08] transition-all duration-300 overflow-hidden"
              >
                {/* Hover glow */}
                <div
                  className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${colors.bg} blur-xl`}
                />

                <div className="relative z-10">
                  {/* Tag */}
                  <span
                    className={`inline-flex items-center px-2.5 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider mb-6 ${colors.tagBg} ${colors.tagText}`}
                  >
                    {tag}
                  </span>

                  {/* Icon */}
                  <div
                    className={`w-12 h-12 ${colors.bg} ${colors.border} border rounded-xl flex items-center justify-center mb-6 group-hover:scale-105 transition-transform duration-300`}
                  >
                    <Icon className={`${colors.text} text-2xl`} />
                  </div>

                  <h3
                    className="text-base font-bold text-white mb-3 leading-snug"
                    style={{ fontFamily: "var(--font-headline)" }}
                  >
                    {title}
                  </h3>
                  <p className="text-[#8f9098] text-sm leading-relaxed mb-6">
                    {description}
                  </p>

                  <div className="flex items-center gap-2 pt-4 border-t border-white/[0.04]">
                    <span
                      className={`text-xs font-bold ${colors.text} font-mono`}
                    >
                      {metric}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Marquee strip */}
        <div className="mt-20 border-y border-white/[0.04] py-5 overflow-hidden relative">
          <div className="flex gap-16 items-center text-xs font-bold uppercase tracking-[0.15em] text-[#44474d] whitespace-nowrap animate-[scroll_20s_linear_infinite]">
            {[
              "Non-Custodial",
              "Sub-100ms Execution",
              "256-bit Encryption",
              "Live Signal Feed",
              "Multi-Exchange",
              "Risk Management",
              "API Key Security",
              "99.8% Uptime",
              "Non-Custodial",
              "Sub-100ms Execution",
              "256-bit Encryption",
              "Live Signal Feed",
              "Multi-Exchange",
              "Risk Management",
              "API Key Security",
              "99.8% Uptime",
            ].map((item, i) => (
              <span key={i} className="flex items-center gap-4">
                {item}
                <span className="text-white/10">◆</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
