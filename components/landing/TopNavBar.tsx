"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
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
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[#080C10]/95 backdrop-blur-xl border-b border-white/[0.04] shadow-2xl shadow-black/50"
          : "bg-transparent"
      }`}
    >
      <div className="flex justify-between items-center px-8 md:px-12 py-5 max-w-7xl mx-auto">
        {/* Wordmark */}
        <div className="flex items-center gap-10">
          <Link href="/" className="flex items-center gap-2.5 group">
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
              className="text-xl font-bold tracking-tight text-white"
              style={{
                fontFamily: "var(--font-headline)",
                letterSpacing: "-0.02em",
              }}
            >
              SCopy<span className="text-emerald-400">Trade</span>
            </span>
          </Link>

          <div className="hidden lg:flex items-center gap-1 text-sm">
            {navLinks.map(({ label, href }) => (
              <Link
                key={label}
                href={href}
                className="px-4 py-2 text-zinc-400 hover:text-white rounded-lg hover:bg-white/[0.06] transition-all duration-200 font-medium"
              >
                {label}
              </Link>
            ))}
          </div>
        </div>

        {/* Right actions */}
        <div className="hidden md:flex items-center gap-3">
          <button
            aria-label="Notifications"
            className="w-9 h-9 flex items-center justify-center text-zinc-500 hover:text-zinc-200 hover:bg-white/[0.06] rounded-lg transition-all duration-200"
          >
            <RiBellLine className="text-lg" />
          </button>
          <button
            aria-label="Wallet"
            className="w-9 h-9 flex items-center justify-center text-zinc-500 hover:text-zinc-200 hover:bg-white/[0.06] rounded-lg transition-all duration-200"
          >
            <RiWalletLine className="text-lg" />
          </button>

          <div className="w-px h-5 bg-white/10 mx-1" />

          <Link
            href="/login"
            className="px-5 py-2 text-sm font-semibold text-zinc-300 hover:text-white rounded-lg hover:bg-white/[0.06] transition-all duration-200"
          >
            Log In
          </Link>
          <Link
            href="/register"
            className="px-5 py-2 text-sm font-bold bg-emerald-500 text-white rounded-lg hover:bg-emerald-400 active:scale-95 transition-all duration-200 shadow-lg shadow-emerald-500/20"
          >
            Get Started
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden w-9 h-9 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-white/[0.06] rounded-lg transition-colors"
          onClick={() => setMobileOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? (
            <RiCloseLine className="text-xl" />
          ) : (
            <RiMenuLine className="text-xl" />
          )}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-[#080C10]/98 backdrop-blur-xl border-t border-white/[0.05] px-8 py-6 flex flex-col gap-2">
          {navLinks.map(({ label, href }) => (
            <Link
              key={label}
              href={href}
              className="py-3 px-4 text-zinc-400 hover:text-white hover:bg-white/[0.05] rounded-lg transition-colors font-medium text-sm"
              onClick={() => setMobileOpen(false)}
            >
              {label}
            </Link>
          ))}
          <div className="h-px bg-white/[0.06] my-2" />
          <Link
            href="/register"
            className="py-3 px-4 bg-emerald-500 text-white font-bold text-sm rounded-lg text-center active:scale-95 transition-transform shadow-lg shadow-emerald-500/20"
            onClick={() => setMobileOpen(false)}
          >
            Get Started
          </Link>
        </div>
      )}
    </nav>
  );
}
