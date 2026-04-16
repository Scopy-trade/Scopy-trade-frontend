import Link from "next/link";

const footerLinks = [
  { label: "Risk Disclosure", href: "#" },
  { label: "Privacy Policy", href: "#" },
  { label: "Terms of Service", href: "#" },
  { label: "Twitter", href: "#" },
  { label: "Telegram", href: "#" },
  { label: "GitHub", href: "#" },
];

export default function Footer() {
  return (
    <footer className="bg-slate-950 w-full border-t border-slate-800/30">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center px-8 md:px-12 py-10 w-full max-w-7xl mx-auto">
        {/* Left: wordmark + copyright */}
        <div>
          <span
            className="text-lg font-bold text-slate-300"
            style={{ fontFamily: "var(--font-headline)" }}
          >
            SCopyTrade
          </span>
          <p className="text-xs uppercase tracking-widest text-slate-400 mt-4 leading-loose">
            © {new Date().getFullYear()} SCopyTrade Terminal. Engineered for
            sovereign finance.
          </p>
        </div>

        {/* Right: links */}
        <div className="flex flex-wrap gap-x-8 gap-y-4 md:justify-end">
          {footerLinks.map(({ label, href }) => (
            <Link
              key={label}
              href={href}
              className="text-xs uppercase tracking-widest text-slate-500 hover:text-slate-200 transition-colors"
            >
              {label}
            </Link>
          ))}
        </div>
      </div>

      {/* Bottom shimmer line */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-emerald-400/20 to-transparent" />
    </footer>
  );
}
