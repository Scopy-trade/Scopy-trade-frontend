"use client";

import { useCallback, useEffect, useState } from "react";
import { AuthProvider } from "@/components/auth/AuthContext";
import CopyTraderSidebar from "@/components/copy-trader/CopyTraderSidebar";
import CopyTraderHeader from "@/components/copy-trader/CopyTraderHeader";
import ExchangeSettingsModal from "@/components/copy-trader/exchange/ExchangeSettingsModal";

function CopyTraderDashboardShell({
  children,
}: {
  children: React.ReactNode;
}) {
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

        const savedCollapsed = localStorage.getItem("copyTraderSidebarCollapsed");

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
        localStorage.setItem("copyTraderSidebarCollapsed", String(newState));
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
    <div className="h-screen overflow-hidden bg-surface-container-lowest">
      <CopyTraderSidebar
        isOpen={sidebarOpen}
        isCollapsed={sidebarCollapsed}
        isMobile={isMobile}
        onToggle={handleSidebarToggle}
        onCollapse={handleSidebarCollapse}
        onOpenExchangeSettings={() => setIsExchangeModalOpen(true)}
      />

      <CopyTraderHeader
        onToggle={handleSidebarToggle}
      />

      <main
        className={`
          h-full overflow-y-auto transition-all duration-300 ease-in-out
          ${getMainMargin()}
        `}
      >
        <div className="min-h-full flex flex-col">{children}</div>
      </main>

      <ExchangeSettingsModal
        isOpen={isExchangeModalOpen}
        onClose={() => setIsExchangeModalOpen(false)}
      />
    </div>
  );
}

export default function CopyTraderDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider requiredRole="CopyTrader">
      <CopyTraderDashboardShell>{children}</CopyTraderDashboardShell>
    </AuthProvider>
  );
}
