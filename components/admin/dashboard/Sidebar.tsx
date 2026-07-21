"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/components/auth/AuthContext";
import BrandLogo from "@/components/brand/BrandLogo";

const navItems = [
  { label: "Overview", href: "/admin/dashboard", icon: "dashboard" },
  {
    label: "User Management",
    href: "/admin/dashboard/user-management",
    icon: "group",
  },
  {
    label: "Signal Governance",
    href: "/admin/dashboard/signals",
    icon: "security",
  },
  { label: "Trade Audit", href: "/admin/dashboard/logs", icon: "receipt_long" },
  { label: "Financials", href: "/admin/dashboard/finances", icon: "payments" },
  { label: "Earnings", href: "/admin/dashboard/earnings", icon: "monitoring" },
  {
    label: "Withdrawals",
    href: "/admin/dashboard/withdrawal",
    icon: "account_balance",
  },
];

interface SidebarProps {
  mobileOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ mobileOpen, onClose }: SidebarProps) {
  const pathname = usePathname();
  const { logout } = useAuth();

  const isActive = (href: string) => {
    if (href === "/admin/dashboard") return pathname === href;
    return pathname.startsWith(href);
  };

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <>
      {/* Mobile Overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-40 lg:hidden backdrop-blur-sm"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed left-0 top-0 h-screen w-72 bg-[#131b2e] flex flex-col py-6
          shadow-[20px_0_40px_rgba(6,14,32,0.5)] z-50 border-r border-white/5
          transition-transform duration-300 ease-in-out
          ${mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
      >
        {/* Brand */}
        <div className="px-6 mb-10 flex items-center justify-between">
          <div>
            <BrandLogo className="h-13 w-44" priority />
            <div className="ml-1 mt-1 text-[9px] text-[#8f9098] font-medium uppercase tracking-widest opacity-70">
              Sovereign Terminal
            </div>
          </div>
          <button
            onClick={onClose}
            className="lg:hidden text-[#8f9098] hover:text-[#dae2fd] transition-colors"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 space-y-0.5 px-3 overflow-y-auto">
          {navItems.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={`
                  flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200
                  ${
                    active
                      ? "bg-[#171f33] text-[#4edea3] border-r-2 border-[#4edea3]"
                      : "text-[#8f9098] hover:text-[#c5c6ce] hover:bg-[#171f33]/50"
                  }
                `}
              >
                <span
                  className={`material-symbols-outlined text-xl ${active ? "text-[#4edea3]" : ""}`}
                  style={{
                    fontVariationSettings: active ? "'FILL' 1" : "'FILL' 0",
                  }}
                >
                  {item.icon}
                </span>
                {item.label}
                {active && (
                  <span className="ml-auto w-1.5 h-1.5 rounded-full bg-[#4edea3]" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Bottom */}
        <div className="mt-auto pt-4 border-t border-white/5 px-3 space-y-0.5">
          <Link
            href="/admin/dashboard/profile"
            onClick={onClose}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200
              ${
                pathname === "/admin/dashboard/profile"
                  ? "bg-[#171f33] text-[#4edea3]"
                  : "text-[#8f9098] hover:text-[#c5c6ce] hover:bg-[#171f33]/50"
              }`}
          >
            <span className="material-symbols-outlined text-xl">
              manage_accounts
            </span>
            Profile
          </Link>
          <button
            type="button"
            onClick={handleLogout}
            className="w-full text-left flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-[#8f9098] hover:text-[#ffb4ab] hover:bg-[#93000a]/10 transition-all duration-200"
          >
            <span className="material-symbols-outlined text-xl">logout</span>
            Logout
          </button>
        </div>
      </aside>
    </>
  );
}
