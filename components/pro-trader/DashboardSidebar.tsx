// components/pro-trader/DashboardSidebar.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  MdDashboard,
  MdGroup,
  MdSettings,
  MdShowChart,
  MdSensors,
  MdMenu,
  MdMenuOpen,
} from "react-icons/md";
import { GoSidebarCollapse, GoSidebarExpand } from "react-icons/go";
import { useEffect, useRef } from "react";

const navItems = [
  {
    name: "Dashboard",
    icon: MdDashboard,
    href: "/dashboard/pro-trader",
  },
  {
    name: "Trade Signals",
    icon: MdSensors,
    href: "/dashboard/pro-trader/signals",
  },
  {
    name: "Market Terminal",
    icon: MdShowChart,
    href: "/dashboard/pro-trader/market-terminal",
  },
  {
    name: "Earnings & Withdrawals",
    icon: MdGroup,
    href: "/dashboard/pro-trader/earnings",
  },
];

interface SidebarProps {
  isOpen: boolean;
  isCollapsed: boolean;
  onToggle: () => void;
  onCollapse: () => void;
}

export default function DashboardSidebar({
  isOpen,
  isCollapsed,
  onToggle,
  onCollapse,
}: SidebarProps) {
  const pathname = usePathname();
  const sidebarRef = useRef<HTMLElement>(null);

  // Close sidebar when clicking outside (mobile only)
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      const isMobile = window.innerWidth < 768;
      if (
        isMobile &&
        isOpen &&
        sidebarRef.current &&
        !sidebarRef.current.contains(e.target as Node)
      ) {
        onToggle();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, onToggle]);

  // Close sidebar when route changes on mobile only
  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    if (isMobile && isOpen) {
      onToggle();
    }
  }, [pathname, onToggle, isOpen]);

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden transition-opacity duration-300"
          onClick={onToggle}
        />
      )}

      {/* Sidebar */}
      <aside
        ref={sidebarRef}
        className={`
          fixed top-0 left-0 h-screen bg-surface-container-low border-r border-white/5 
          shadow-2xl shadow-black/40 flex flex-col py-6 font-headline antialiased tracking-tight
          transition-all duration-300 ease-in-out z-50
          ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
          ${isCollapsed ? "w-20" : "w-64"}
        `}
      >
        {/* Logo Section */}
        <div
          className={`px-6 mb-10 transition-all duration-300 ${isCollapsed ? "px-4" : "px-6"}`}
        >
          <Link href="/dashboard" className="block">
            <div className="flex items-center gap-3">
              {/* Logo Placeholder */}
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-secondary to-secondary-container flex items-center justify-center shadow-lg shadow-secondary/20">
                <span className="text-white font-bold text-sm">SCT</span>
              </div>
              {!isCollapsed && (
                <div className="transition-opacity duration-300">
                  <h1 className="text-xl font-bold tracking-tighter text-slate-100">
                    SCopyTrade
                  </h1>
                  <p className="text-xs text-secondary font-medium opacity-80 uppercase tracking-widest mt-0.5">
                    Pro Trader
                  </p>
                </div>
              )}
            </div>
          </Link>
        </div>

        {/* Collapse Toggle Button (Desktop only) */}
        <div className="hidden md:block px-3 mb-6">
          <button
            onClick={onCollapse}
            className={`
              w-full flex items-center gap-3 px-4 py-2 rounded-xl 
              text-slate-400 hover:text-slate-100 hover:bg-surface-container 
              transition-all duration-200 group
              ${isCollapsed ? "justify-center" : ""}
            `}
          >
            {isCollapsed ? (
              <MdMenuOpen className="text-xl transition-transform group-hover:scale-110" />
            ) : (
              <GoSidebarCollapse className="text-xl transition-transform group-hover:scale-110" />
            )}
            {!isCollapsed && (
              <span className="text-sm font-medium">Collapse</span>
            )}
          </button>
        </div>

        {/* Main Navigation */}
        <nav className="flex-1 px-3 space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                title={isCollapsed ? item.name : undefined}
                className={`
                  flex items-center gap-3 px-4 py-3 font-medium transition-all duration-200 
                  rounded-xl active:scale-[0.98] group
                  ${
                    isActive
                      ? "text-secondary bg-surface-container shadow-inner"
                      : "text-slate-400 hover:text-slate-100 hover:bg-surface-container"
                  }
                  ${isCollapsed ? "justify-center" : ""}
                `}
              >
                <item.icon
                  className={`text-xl transition-transform group-hover:scale-110 ${isActive ? "text-secondary" : ""}`}
                />
                {!isCollapsed && <span>{item.name}</span>}
              </Link>
            );
          })}
        </nav>

        {/* Profile Settings Button */}
        <div className="mt-4 px-4">
          <Link
            href="/dashboard/pro-trader/profile"
            className={`
              w-full flex py-3 rounded-xl bg-linear-to-r from-secondary to-secondary-container 
              text-on-secondary font-bold text-sm transition-transform active:scale-95 
              shadow-lg shadow-secondary/10 items-center gap-3
              ${isCollapsed ? "justify-center px-2" : "px-4"}
            `}
            title={isCollapsed ? "Profile Settings" : undefined}
          >
            <MdSettings
              className={`text-lg transition-transform group-hover:rotate-90 ${isCollapsed ? "" : ""}`}
            />
            {!isCollapsed && <span>Profile Settings</span>}
          </Link>
        </div>
      </aside>
    </>
  );
}
