"use client";

import Link from "next/link";
import {
  RiNotification3Line,
  RiWallet3Line,
  RiArrowRightLine,
} from "react-icons/ri";

const navLinks = [
  { label: "Dashboard", href: "/dashboard", active: true },
  { label: "Signals", href: "#" },
  { label: "API Management", href: "#" },
  { label: "Portfolio", href: "#" },
  { label: "Documentation", href: "#" },
];

export default function DashboardNav() {
  return (
    <nav
      className="fixed top-0 w-full z-50 flex justify-between items-center px-8 py-4"
      style={{
        background: "rgba(6, 8, 24, 0.85)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        boxShadow: "0 4px 40px rgba(0,0,0,0.4)",
        borderBottom: "1px solid rgba(68,71,77,0.2)",
      }}
    >
      {/* Left: Logo + Links */}
      <div className="flex items-center gap-8">
        <span
          className="text-2xl font-black tracking-tighter"
          style={{ fontFamily: "var(--font-headline)", color: "#f8fafc" }}
        >
          SCopyTrade
        </span>
        <div
          className="hidden md:flex gap-6 text-sm"
          style={{ fontFamily: "var(--font-headline)" }}
        >
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="transition-all duration-300 pb-1 font-semibold tracking-tight"
              style={
                link.active
                  ? {
                      color: "#4edea3",
                      borderBottom: "2px solid #4edea3",
                    }
                  : { color: "#8f9098" }
              }
              onMouseEnter={(e) => {
                if (!link.active)
                  (e.currentTarget as HTMLAnchorElement).style.color =
                    "#f8fafc";
              }}
              onMouseLeave={(e) => {
                if (!link.active)
                  (e.currentTarget as HTMLAnchorElement).style.color =
                    "#8f9098";
              }}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-3">
        {[RiNotification3Line, RiWallet3Line].map((Icon, i) => (
          <button
            key={i}
            className="p-2 rounded-lg transition-all duration-300 active:scale-95"
            style={{ color: "#8f9098" }}
            onMouseEnter={(e) =>
              ((e.currentTarget as HTMLButtonElement).style.background =
                "rgba(45,52,73,0.6)")
            }
            onMouseLeave={(e) =>
              ((e.currentTarget as HTMLButtonElement).style.background =
                "transparent")
            }
          >
            <Icon style={{ fontSize: "1.25rem" }} />
          </button>
        ))}
        <button
          className="flex items-center gap-2 px-5 py-2 font-bold text-sm transition-all active:scale-95 hover:brightness-110"
          style={{
            fontFamily: "var(--font-headline)",
            background: "#00a572",
            color: "#003824",
            borderRadius: "0.5rem",
          }}
        >
          Connect Wallet
          <RiArrowRightLine />
        </button>
      </div>
    </nav>
  );
}
