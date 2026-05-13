// components/Footer.tsx
import { FaTwitter, FaGithub } from "react-icons/fa";

const footerLinks = [
  { name: "Risk Disclosure", href: "#" },
  { name: "Privacy Policy", href: "#" },
  { name: "Terms of Service", href: "#" },
];

export function Footer() {
  return (
    <footer className="w-full border-t border-slate-800/30 bg-slate-950 mt-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center px-12 py-10 w-full">
        <div>
          <span className="text-lg font-bold text-slate-300 font-headline mb-2 block">
            SCopyTrade Terminal
          </span>
          <p className="font-body text-xs uppercase tracking-widest text-slate-400">
            © 2024 SCopyTrade Terminal. Engineered for sovereign finance.
          </p>
        </div>
        <div className="flex flex-wrap gap-x-8 gap-y-4 md:justify-end">
          {footerLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-slate-500 hover:text-slate-200 transition-colors font-body text-xs uppercase tracking-widest"
            >
              {link.name}
            </a>
          ))}
          <div className="flex gap-4 items-center pl-4 border-l border-slate-800/50">
            <a
              href="#"
              className="text-slate-500 hover:text-emerald-400 transition-colors"
            >
              <FaTwitter className="w-4 h-4" />
            </a>
            <a
              href="#"
              className="text-slate-500 hover:text-emerald-400 transition-colors"
            >
              <FaGithub className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
