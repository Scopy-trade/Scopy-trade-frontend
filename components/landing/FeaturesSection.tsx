import {
  RiShieldCheckLine,
  RiSignalTowerLine,
  RiFlashlightLine,
} from "react-icons/ri";

const features = [
  {
    Icon: RiShieldCheckLine,
    iconBg:
      "bg-[var(--color-secondary)]/10 group-hover:bg-[var(--color-secondary)]/20",
    iconColor: "text-[var(--color-secondary)]",
    title: "Non-Custodial",
    description:
      "Your funds stay in your exchange wallet. We only transmit instructions via encrypted API keys—we never touch your capital.",
  },
  {
    Icon: RiSignalTowerLine,
    iconBg:
      "bg-[var(--color-primary)]/10 group-hover:bg-[var(--color-primary)]/20",
    iconColor: "text-[var(--color-primary)]",
    title: "Expert Signals",
    description:
      "Access verified, high-performance signals from world-class algorithmic traders and fundamental analysts.",
  },
  {
    Icon: RiFlashlightLine,
    iconBg:
      "bg-[var(--color-tertiary)]/10 group-hover:bg-[var(--color-tertiary)]/20",
    iconColor: "text-[var(--color-tertiary)]",
    title: "One-Click Execution",
    description:
      "No manual entry. Instant order placement with automated stop-losses and take-profits configured to your risk tolerance.",
  },
];

export default function FeaturesSection() {
  return (
    <section className="py-32 bg-[var(--color-surface-container-lowest)] relative px-6 lg:px-24">
      {/* Section heading */}
      <div className="text-center max-w-3xl mx-auto mb-20">
        <h2
          className="text-4xl font-extrabold tracking-tight mb-4 text-[var(--color-on-surface)]"
          style={{ fontFamily: "var(--font-headline)" }}
        >
          Precision Tools for Modern Finance
        </h2>
        <p className="text-[var(--color-on-surface-variant)]">
          Everything you need to mirror professional performance without
          compromising on your security posture.
        </p>
      </div>

      {/* Cards */}
      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {features.map(({ Icon, iconBg, iconColor, title, description }) => (
          <div
            key={title}
            className="bg-[var(--color-surface-container-low)] p-8 rounded-2xl border border-[var(--color-outline-variant)]/10 hover:bg-[var(--color-surface-container)] transition-colors group"
          >
            <div
              className={`w-14 h-14 ${iconBg} rounded-xl flex items-center justify-center mb-6 transition-colors`}
            >
              <Icon className={`${iconColor} text-3xl`} />
            </div>
            <h3
              className="text-xl font-bold mb-4 text-[var(--color-on-surface)]"
              style={{ fontFamily: "var(--font-headline)" }}
            >
              {title}
            </h3>
            <p className="text-[var(--color-on-surface-variant)] leading-relaxed">
              {description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
