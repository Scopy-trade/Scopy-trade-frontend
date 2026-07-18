"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import {
  RiBellLine,
  RiWalletLine,
  RiMenuLine,
  RiCloseLine,
} from "react-icons/ri";
import BrandLogo from "@/components/brand/BrandLogo";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "How It Works", href: "/how-it-works" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "Documentation", href: "/docs" },
];

export default function TopNavBar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        scrolled
          ? "bg-slate-950/80 backdrop-blur-md border-b border-white/4 shadow-2xl shadow-slate-950/40"
          : "bg-transparent"
      }`}
    >
      <div className="flex justify-between items-center px-8 md:px-12 py-4 max-w-7xl mx-auto w-full">
        {/* Wordmark */}
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2.5 group">
            <BrandLogo className="h-12 w-40" priority />
          </Link>

          {/* Desktop nav links */}
          <div className="hidden xl:flex items-center gap-1 text-sm">
            {navLinks.map(({ label, href }) => {
              const active = isActive(href);
              return (
                <Link
                  key={label}
                  href={href}
                  className={`relative px-3 py-2 rounded-lg transition-all duration-200 font-medium whitespace-nowrap group ${
                    active
                      ? "text-white"
                      : "text-slate-400 hover:text-white hover:bg-white/[0.06]"
                  }`}
                >
                  {label}
                  {/* Active underline */}
                  {active && (
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4/5 h-[2px] rounded-full bg-gradient-to-r from-emerald-400 to-teal-400" />
                  )}
                </Link>
              );
            })}
          </div>
        </div>

        {/* Right actions */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            href="/login"
            className="px-5 py-2 text-sm font-semibold text-slate-300 hover:text-white rounded-lg hover:bg-white/[0.06] transition-all duration-200"
          >
            Log In
          </Link>
          <Link
            href="/register"
            className="px-5 py-2 text-sm font-bold bg-emerald-400 text-[#003824] rounded-md hover:bg-emerald-300 active:scale-95 transition-all duration-200 shadow-lg shadow-emerald-500/20"
          >
            Sign Up Free
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden w-9 h-9 flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/[0.06] rounded-lg transition-colors"
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
        <div className="md:hidden bg-slate-950/98 backdrop-blur-xl border-t border-white/[0.05] px-8 py-6 flex flex-col gap-2">
          {navLinks.map(({ label, href }) => {
            const active = isActive(href);
            return (
              <Link
                key={label}
                href={href}
                className={`py-3 px-4 rounded-lg transition-colors font-medium text-sm flex items-center gap-3 ${
                  active
                    ? "text-white bg-white/[0.06]"
                    : "text-slate-400 hover:text-white hover:bg-white/[0.05]"
                }`}
                onClick={() => setMobileOpen(false)}
              >
                {/* Active dot indicator for mobile */}
                {active && (
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 flex-shrink-0" />
                )}
                {label}
              </Link>
            );
          })}
          <div className="h-px bg-white/[0.06] my-2" />
          <div className="flex gap-3">
            <Link
              href="/login"
              className="flex-1 py-3 px-4 border border-white/10 text-slate-300 font-semibold text-sm rounded-lg text-center hover:bg-white/[0.04] transition-all"
              onClick={() => setMobileOpen(false)}
            >
              Log In
            </Link>
            <Link
              href="/register"
              className="flex-1 py-3 px-4 bg-emerald-400 text-[#003824] font-bold text-sm rounded-lg text-center active:scale-95 transition-transform shadow-lg shadow-emerald-500/20"
              onClick={() => setMobileOpen(false)}
            >
              Sign Up Free
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
