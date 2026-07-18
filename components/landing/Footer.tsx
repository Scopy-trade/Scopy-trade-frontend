import Link from "next/link";
import BrandLogo from "@/components/brand/BrandLogo";
import {
  RiDiscordFill,
  RiGithubFill,
  RiSendPlaneFill,
  RiTwitterXFill,
} from "react-icons/ri";

const footerLinks = [
  { label: "Risk Disclosure", href: "#" },
  { label: "Privacy Policy", href: "#" },
  { label: "Terms of Service", href: "#" },
];

const socialLinks = [
  { label: "Twitter / X", href: "#", Icon: RiTwitterXFill },
  { label: "Telegram", href: "#", Icon: RiSendPlaneFill },
  { label: "GitHub", href: "#", Icon: RiGithubFill },
  { label: "Discord", href: "#", Icon: RiDiscordFill },
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
              <BrandLogo className="h-12 w-40" />
            </div>
            <p className="text-slate-400 text-xs leading-relaxed mb-6 font-medium max-w-[180px]">
              Institutional-grade copy trading. Your keys, your rules.
            </p>
            <div className="flex flex-wrap gap-3">
              {socialLinks.map(({ label, href, Icon }) => (
                <Link
                  key={label}
                  href={href}
                  aria-label={label}
                  title={label}
                  className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-800/60 text-slate-500 transition-colors hover:border-slate-700 hover:text-slate-200"
                >
                  <Icon className="text-base" aria-hidden="true" />
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
