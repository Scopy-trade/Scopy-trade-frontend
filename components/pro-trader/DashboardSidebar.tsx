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
  const prevPathname = useRef(pathname);
  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    if (isMobile && prevPathname.current !== pathname && isOpen) {
      onToggle();
    }
    prevPathname.current = pathname;
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
          fixed top-0 left-0 pt-12 h-screen bg-surface-container-low border-r border-white/5 
          shadow-2xl shadow-black/40 flex flex-col py-6 font-headline antialiased tracking-tight
          transition-all duration-300 ease-in-out z-50 
          ${isOpen ? "translate-x-0" : "-translate-x-full md:overflow-visible overflow-hidden"}
          md:translate-x-0
          ${isCollapsed ? "md:w-20" : "md:w-64"}
          w-64
        `}
      >
        {/* Logo Section */}
        <div
          className={`transition-all duration-300 ${
            isCollapsed ? "md:px-4" : "md:px-6"
          } px-6 mb-10`}
        >
          <Link href="/dashboard" className="block">
            <div className="flex items-center gap-3">
              {/* Logo Placeholder */}
              <div className="w-8 h-8 rounded-lg bg-linear-to-br from-secondary to-secondary-container flex items-center justify-center shadow-lg shadow-secondary/20 shrink-0">
                <span className="text-white font-bold text-sm">SCT</span>
              </div>
              {(!isCollapsed || window.innerWidth < 768) && (
                <div className="transition-opacity duration-300 hidden md:block">
                  <h1 className="text-xl font-bold tracking-tighter text-slate-100">
                    SCopyTrade
                  </h1>
                  <p className="text-xs text-secondary font-medium opacity-80 uppercase tracking-widest mt-0.5">
                    Pro Trader
                  </p>
                </div>
              )}
              {/* Always show text on mobile when open */}
              {window.innerWidth < 768 && isOpen && (
                <div className="transition-opacity duration-300 md:hidden">
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

        {/* Main Navigation */}
        <nav className="flex-1 px-3 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                title={
                  isCollapsed && window.innerWidth >= 768
                    ? item.name
                    : undefined
                }
                className={`
                  flex items-center gap-3 px-4 py-3 font-medium transition-all duration-200 
                  rounded-xl active:scale-[0.98] group
                  ${
                    isActive
                      ? "text-secondary bg-surface-container shadow-inner"
                      : "text-slate-400 hover:text-slate-100 hover:bg-surface-container"
                  }
                  ${
                    isCollapsed && window.innerWidth >= 768
                      ? "md:justify-center"
                      : ""
                  }
                `}
              >
                <item.icon
                  className={`text-xl transition-transform group-hover:scale-110 ${
                    isActive ? "text-secondary" : ""
                  }`}
                />
                {(!isCollapsed || window.innerWidth < 768) && (
                  <span>{item.name}</span>
                )}
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
              ${
                isCollapsed && window.innerWidth >= 768
                  ? "md:justify-center md:px-2"
                  : "px-4"
              }
            `}
            title={
              isCollapsed && window.innerWidth >= 768
                ? "Profile Settings"
                : undefined
            }
          >
            <MdSettings
              className={`text-lg transition-transform group-hover:rotate-90`}
            />
            {(!isCollapsed || window.innerWidth < 768) && (
              <span>Profile Settings</span>
            )}
          </Link>
        </div>

        {/* Collapse Toggle Button - Visible on all screens but only shows collapse icon when expanded */}
        <button
          onClick={() => {
            if (window.innerWidth < 768) {
              onToggle();
            } else {
              onCollapse();
            }
          }}
          className={`
    absolute top-13 -translate-y-1/2
    w-10 h-10 rounded-3xl flex items-center justify-center
    text-slate-400 bg-surface-container hover:text-secondary hover:bg-surface-container
    transition-all duration-200 group z-10 border-2 border-white/5
    ${isCollapsed ? "hidden md:flex" : "flex"}
  `}
          style={{
            right: "-20px",
          }}
          title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {isCollapsed ? (
            // Expand icon - only show on desktop
            <GoSidebarExpand className="text-2xl transition-transform group-hover:scale-110" />
          ) : (
            // Collapse icon - show on all screens
            <GoSidebarCollapse className="text-2xl transition-transform group-hover:scale-110" />
          )}
        </button>
      </aside>
    </>
  );
}
