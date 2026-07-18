import Link from "next/link";
import BrandLogo from "@/components/brand/BrandLogo";
import {
  RiDiscordFill,
  RiGithubFill,
  RiSendPlaneFill,
  RiTwitterXFill,
} from "react-icons/ri";

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
  { label: "Twitter", href: "#", Icon: RiTwitterXFill },
  { label: "Telegram", href: "#", Icon: RiSendPlaneFill },
  { label: "GitHub", href: "#", Icon: RiGithubFill },
  { label: "Discord", href: "#", Icon: RiDiscordFill },
];

export default function Footer() {
  return (
    <footer className="bg-[#060A0E] border-t border-white/[0.04]">
      <div className="max-w-7xl mx-auto px-6 lg:px-16 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 lg:gap-16 mb-16">
          {/* Brand column */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2.5 mb-5">
              <BrandLogo className="h-12 w-40" />
            </div>
            <p className="text-zinc-600 text-xs leading-relaxed mb-6 font-medium max-w-[180px]">
              Institutional-grade copy trading. Your keys, your rules.
            </p>
            {/* Socials */}
            <div className="flex gap-2">
              {socials.map(({ label, href, Icon }) => (
                <Link
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-8 h-8 flex items-center justify-center border border-white/[0.07] rounded-lg text-zinc-600 hover:text-white hover:border-white/20 transition-all duration-200 text-sm"
                >
                  <Icon aria-hidden="true" />
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
