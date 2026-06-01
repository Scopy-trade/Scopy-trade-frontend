import Link from "next/link";

const footerLinks = [
  { label: "Risk Disclosure", href: "#" },
  { label: "Privacy Policy", href: "#" },
  { label: "Terms of Service", href: "#" },
];

const socialLinks = [
  { label: "Twitter / X", href: "#" },
  { label: "Telegram", href: "#" },
  { label: "GitHub", href: "#" },
  { label: "Discord", href: "#" },
];

const navColumns = [
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
      { label: "Contact", href: "/contact" },
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

export default function Footer() {
  return (
    <footer className="bg-slate-950 w-full border-t border-slate-800/30">
      <div className="max-w-7xl mx-auto px-6 lg:px-16 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 lg:gap-16 mb-12">
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
            <p className="text-slate-400 text-xs leading-relaxed mb-6 font-medium max-w-[180px]">
              Institutional-grade copy trading. Your keys, your rules.
            </p>
            <div className="flex flex-wrap gap-3">
              {socialLinks.map(({ label, href }) => (
                <Link
                  key={label}
                  href={href}
                  className="text-xs font-medium text-slate-500 hover:text-slate-200 transition-colors uppercase tracking-widest"
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>

          {/* Nav columns */}
          {navColumns.map(({ title, links }) => (
            <div key={title}>
              <h4 className="text-xs font-bold uppercase tracking-[0.12em] text-slate-500 mb-5">
                {title}
              </h4>
              <ul className="space-y-3">
                {links.map(({ label, href }) => (
                  <li key={label}>
                    <Link
                      href={href}
                      className="text-sm text-slate-500 hover:text-slate-200 transition-colors duration-200 font-medium"
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center pt-8 border-t border-slate-800/30">
          <p className="text-xs font-medium text-slate-400 uppercase tracking-widest">
            © {new Date().getFullYear()} SCopyTrade Terminal. Engineered for
            sovereign finance.
          </p>
          <div className="flex flex-wrap gap-x-8 gap-y-2 md:justify-end">
            {footerLinks.map(({ label, href }) => (
              <Link
                key={label}
                href={href}
                className="text-xs uppercase tracking-widest text-slate-500 hover:text-slate-200 transition-colors font-medium"
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom shimmer */}
      <div className="w-full h-1 bg-gradient-to-r from-transparent via-emerald-400/20 to-transparent" />
    </footer>
  );
}
