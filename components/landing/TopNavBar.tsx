"use client";

import Link from "next/link";
import { useState } from "react";
import {
  RiBellLine,
  RiWalletLine,
  RiMenuLine,
  RiCloseLine,
} from "react-icons/ri";

const navLinks = [
  { label: "Dashboard", href: "#" },
  { label: "Signals", href: "#" },
  { label: "API Management", href: "#" },
  { label: "Portfolio", href: "#" },
  { label: "Documentation", href: "#" },
];

export default function TopNavBar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full z-50 bg-slate-950/80 backdrop-blur-md shadow-2xl shadow-slate-950/40">
      <div className="flex justify-between items-center px-6 md:px-8 py-4 w-full max-w-full">
        {/* Wordmark */}
        <div className="flex items-center gap-8">
          <Link
            href="/"
            className="text-2xl font-black tracking-tighter text-slate-50"
            style={{ fontFamily: "var(--font-headline)" }}
          >
            SCopyTrade
          </Link>

          {/* Desktop nav links */}
          <div className="hidden md:flex items-center gap-6 text-sm tracking-tight">
            {navLinks.map(({ label, href }) => (
              <Link
                key={label}
                href={href}
                className="text-slate-400 hover:text-slate-100 transition-all duration-300"
                style={{ fontFamily: "var(--font-headline)" }}
              >
                {label}
              </Link>
            ))}
          </div>
        </div>

        {/* Right actions */}
        <div className="hidden md:flex items-center gap-4">
          <button
            aria-label="Notifications"
            className="p-2 text-slate-400 hover:bg-slate-800/50 rounded-full transition-all duration-300"
          >
            <RiBellLine className="text-xl" />
          </button>
          <button
            aria-label="Wallet"
            className="p-2 text-slate-400 hover:bg-slate-800/50 rounded-full transition-all duration-300"
          >
            <RiWalletLine className="text-xl" />
          </button>
          <Link
            href="/register"
            className="px-6 py-2 bg-emerald-400 text-[var(--color-on-secondary-container)] font-semibold rounded-md active:scale-95 transition-transform hover:opacity-90"
          >
            Connect Wallet
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2 text-slate-400 hover:text-slate-100 transition-colors"
          onClick={() => setMobileOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? (
            <RiCloseLine className="text-2xl" />
          ) : (
            <RiMenuLine className="text-2xl" />
          )}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-slate-950/95 border-t border-slate-800/30 px-6 py-4 flex flex-col gap-4">
          {navLinks.map(({ label, href }) => (
            <Link
              key={label}
              href={href}
              className="text-slate-400 hover:text-slate-100 transition-colors py-1 text-sm font-medium"
              onClick={() => setMobileOpen(false)}
            >
              {label}
            </Link>
          ))}
          <Link
            href="/register"
            className="mt-2 px-6 py-2 bg-emerald-400 text-[var(--color-on-secondary-container)] font-semibold rounded-md text-center active:scale-95 transition-transform"
            onClick={() => setMobileOpen(false)}
          >
            Connect Wallet
          </Link>
        </div>
      )}
    </nav>
  );
}
