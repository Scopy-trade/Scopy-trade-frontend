import Link from "next/link";

const footerSections = [
  {
    title: "Product",
    links: [
      { label: "Dashboard", href: "#" },
      { label: "Signal Feed", href: "#" },
      { label: "API Management", href: "#" },
      { label: "Portfolio Analytics", href: "#" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Blog", href: "#" },
      { label: "Careers", href: "#" },
      { label: "Press Kit", href: "#" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Risk Disclosure", href: "#" },
      { label: "Privacy Policy", href: "#" },
      { label: "Terms of Service", href: "#" },
      { label: "Cookie Policy", href: "#" },
    ],
  },
];

const socials = [
  { label: "Twitter", href: "#", icon: "𝕏" },
  { label: "Telegram", href: "#", icon: "✈" },
  { label: "GitHub", href: "#", icon: "⌥" },
  { label: "Discord", href: "#", icon: "◈" },
];

export default function Footer() {
  return (
    <footer className="bg-[#060A0E] border-t border-white/[0.04]">
      <div className="max-w-7xl mx-auto px-6 lg:px-16 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 lg:gap-16 mb-16">
          {/* Brand column */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2.5 mb-5">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-emerald-400 to-teal-600 flex items-center justify-center shadow-lg shadow-emerald-500/20">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path
                    d="M7 1L12 4V10L7 13L2 10V4L7 1Z"
                    stroke="white"
                    strokeWidth="1.5"
                    strokeLinejoin="round"
                  />
                  <circle cx="7" cy="7" r="1.5" fill="white" />
                </svg>
              </div>
              <span
                className="text-lg font-bold tracking-tight text-white"
                style={{
                  fontFamily: "var(--font-headline)",
                  letterSpacing: "-0.02em",
                }}
              >
                SCopy<span className="text-emerald-400">Trade</span>
              </span>
            </div>
            <p className="text-zinc-600 text-xs leading-relaxed mb-6 font-medium max-w-[180px]">
              Institutional-grade copy trading. Your keys, your rules.
            </p>
            {/* Socials */}
            <div className="flex gap-2">
              {socials.map(({ label, href, icon }) => (
                <Link
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-8 h-8 flex items-center justify-center border border-white/[0.07] rounded-lg text-zinc-600 hover:text-white hover:border-white/20 transition-all duration-200 text-sm"
                >
                  {icon}
                </Link>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {footerSections.map(({ title, links }) => (
            <div key={title}>
              <h4 className="text-xs font-bold uppercase tracking-[0.12em] text-zinc-500 mb-5">
                {title}
              </h4>
              <ul className="space-y-3">
                {links.map(({ label, href }) => (
                  <li key={label}>
                    <Link
                      href={href}
                      className="text-sm text-zinc-600 hover:text-zinc-300 transition-colors duration-200 font-medium"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-white/[0.04] flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-zinc-700 font-medium">
            © {new Date().getFullYear()} SCopyTrade. All rights reserved.
          </p>
          <p className="text-xs text-zinc-800 font-medium">
            Not financial advice. Trading crypto involves substantial risk.
          </p>
        </div>
      </div>

      {/* Bottom shimmer */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-emerald-500/15 to-transparent" />
    </footer>
  );
}
