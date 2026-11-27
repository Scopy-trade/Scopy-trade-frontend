"use client";

import DashboardHeader from "@/components/pro-trader/DashboardHeader";
import DashboardSidebar from "@/components/pro-trader/DashboardSidebar";
import { useCallback, useEffect, useState } from "react";
import { AuthProvider } from "@/components/auth/AuthContext";
import TraderAccountActions from "@/components/dashboard/TraderAccountActions";
import TradingPauseNotice from "@/components/trades/TradingPauseNotice";
import ExchangeSettingsModal from "@/components/copy-trader/exchange/ExchangeSettingsModal";

function ProTraderDashboardShell({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isExchangeModalOpen, setIsExchangeModalOpen] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const checkScreenSize = () => {
      const mobile = window.innerWidth < 768;

      setIsMobile(mobile);

      if (mobile) {
        setSidebarOpen(false);
        setSidebarCollapsed(false);
      } else {
        setSidebarOpen(true);

        const savedCollapsed = localStorage.getItem("sidebarCollapsed");

        if (savedCollapsed !== null) {
          setSidebarCollapsed(savedCollapsed === "true");
        }
      }
    };

    checkScreenSize();

    window.addEventListener("resize", checkScreenSize);

    return () => {
      window.removeEventListener("resize", checkScreenSize);
    };
  }, []);

  const handleSidebarToggle = useCallback(() => {
    setSidebarOpen((prev) => !prev);
  }, []);

  const handleSidebarCollapse = useCallback(() => {
    setSidebarCollapsed((prev) => {
      const newState = !prev;

      if (typeof window !== "undefined") {
        localStorage.setItem("sidebarCollapsed", String(newState));
      }

      return newState;
    });
  }, []);

  const getMainMargin = () => {
    if (isMobile) return "ml-0";

    if (sidebarCollapsed) return "ml-20";

    return "ml-64";
  };

  return (
    <div className="h-dvh flex flex-col overflow-hidden">
      <DashboardSidebar
        isOpen={sidebarOpen}
        isCollapsed={sidebarCollapsed}
        isMobile={isMobile}
        onToggle={handleSidebarToggle}
        onCollapse={handleSidebarCollapse}
        onOpenExchangeSettings={() => setIsExchangeModalOpen(true)}
      />

      <DashboardHeader
        onToggle={handleSidebarToggle}
      />

      <main
        className={`
          min-h-0 flex-1 overflow-y-auto transition-all duration-300 ease-in-out
          ${getMainMargin()}
        `}
      >
        <div className="p-4 md:p-8"><div className="hidden md:flex justify-end px-4 py-3 md:px-8"><TraderAccountActions scope="pro" /></div><TradingPauseNotice />{children}</div>
      </main>
      <ExchangeSettingsModal
        isOpen={isExchangeModalOpen}
        onClose={() => setIsExchangeModalOpen(false)}
      />
    </div>
  );
}

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthProvider requiredRole="ProTrader">
      <ProTraderDashboardShell>{children}</ProTraderDashboardShell>
    </AuthProvider>
  );
}
