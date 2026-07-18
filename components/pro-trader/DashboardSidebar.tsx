"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  MdDashboard,
  MdGroup,
  MdSettings,
  MdShowChart,
  MdSensors,
  MdLogout,
} from "react-icons/md";

import { GoSidebarCollapse, GoSidebarExpand } from "react-icons/go";

import { useEffect, useRef } from "react";
import { useAuth } from "@/components/auth/AuthContext";
import BrandLogo from "@/components/brand/BrandLogo";

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
  isMobile: boolean;
  onToggle: () => void;
  onCollapse: () => void;
}

export default function DashboardSidebar({
  isOpen,
  isCollapsed,
  isMobile,
  onToggle,
  onCollapse,
}: SidebarProps) {
  const pathname = usePathname();
  const { logout } = useAuth();

  const sidebarRef = useRef<HTMLElement>(null);

  // Close sidebar when clicking outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
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

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMobile, isOpen, onToggle]);

  // Close sidebar when route changes on mobile
  const prevPathname = useRef(pathname);

  useEffect(() => {
    if (isMobile && prevPathname.current !== pathname && isOpen) {
      onToggle();
    }

    prevPathname.current = pathname;
  }, [pathname, isMobile, isOpen, onToggle]);

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && isMobile && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity duration-300"
          onClick={onToggle}
        />
      )}

      {/* Sidebar */}
      <aside
        ref={sidebarRef}
        className={`
          fixed top-0 left-0 pt-12 h-screen
          bg-surface-container-low border-r border-white/5
          shadow-2xl shadow-black/40
          flex flex-col py-6
          font-headline antialiased tracking-tight
          transition-all duration-300 ease-in-out z-50

          ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}

          ${isCollapsed ? "md:w-20" : "md:w-64"}

          w-64
        `}
      >
        {/* Logo */}
        <div
          className={`
            transition-all duration-300
            ${isCollapsed ? "md:px-4" : "md:px-6"}
            px-6 mb-10
          `}
        >
          <Link href="/dashboard/pro-trader" className="block">
            {isCollapsed && !isMobile ? (
              <BrandLogo compact className="h-9 w-9 rounded-lg" priority />
            ) : (
              <div>
                <BrandLogo className="h-13 w-44" priority />
                <p className="mt-1 ml-1 text-xs font-medium uppercase tracking-widest text-secondary opacity-80">
                  Pro Trader
                </p>
              </div>
            )}
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.name}
                href={item.href}
                title={isCollapsed && !isMobile ? item.name : undefined}
                className={`
                  flex items-center gap-3 px-4 py-3
                  font-medium transition-all duration-200
                  rounded-xl active:scale-[0.98] group

                  ${
                    isActive
                      ? "text-secondary bg-surface-container shadow-inner"
                      : "text-slate-400 hover:text-slate-100 hover:bg-surface-container"
                  }

                  ${isCollapsed && !isMobile ? "md:justify-center" : ""}
                `}
              >
                <item.icon
                  className={`
                    text-xl transition-transform
                    group-hover:scale-110
                    ${isActive ? "text-secondary" : ""}
                  `}
                />

                {(!isCollapsed || isMobile) && <span>{item.name}</span>}
              </Link>
            );
          })}
        </nav>

        {/* Profile Button */}
        <div className="mt-4 px-4">
          <Link
            href="/dashboard/pro-trader/profile"
            title={isCollapsed && !isMobile ? "Profile Settings" : undefined}
            className={`
              w-full flex py-3 rounded-xl
              bg-linear-to-r from-secondary to-secondary-container
              text-on-secondary font-bold text-sm
              transition-transform active:scale-95
              shadow-lg shadow-secondary/10
              items-center gap-3

              ${isCollapsed && !isMobile ? "md:justify-center md:px-2" : "px-4"}
            `}
          >
            <MdSettings className="text-lg" />

            {(!isCollapsed || isMobile) && <span>Profile Settings</span>}
          </Link>
          <button
            type="button"
            onClick={() => void logout()}
            title={isCollapsed && !isMobile ? "Logout" : undefined}
            className={`mt-3 w-full flex py-3 rounded-xl bg-surface-container hover:bg-surface-container-high text-slate-300 hover:text-tertiary font-bold text-sm transition-all active:scale-95 border border-white/5 items-center gap-3 ${isCollapsed && !isMobile ? "md:justify-center md:px-2" : "px-4"}`}
          >
            <MdLogout className="text-lg" />
            {(!isCollapsed || isMobile) && <span>Logout</span>}
          </button>
        </div>

        {/* Collapse Button */}
        <button
          onClick={() => {
            if (isMobile) {
              onToggle();
            } else {
              onCollapse();
            }
          }}
          className={`
            absolute top-13 -translate-y-1/2
            w-10 h-10 rounded-3xl
            flex items-center justify-center
            text-slate-400
            bg-surface-container
            hover:text-secondary
            hover:bg-surface-container
            transition-all duration-200
            group z-10 border-2 border-white/5

            ${isCollapsed ? "hidden md:flex" : "flex"}
          `}
          style={{
            right: "-20px",
          }}
          title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {isCollapsed ? (
            <GoSidebarExpand className="text-2xl transition-transform group-hover:scale-110" />
          ) : (
            <GoSidebarCollapse className="text-2xl transition-transform group-hover:scale-110" />
          )}
        </button>
      </aside>
    </>
  );
}
