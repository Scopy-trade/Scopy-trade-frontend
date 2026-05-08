// app/dashboard/pro-trader/layout.tsx
"use client";

import DashboardHeader from "@/components/pro-trader/DashboardHeader";
import DashboardSidebar from "@/components/pro-trader/DashboardSidebar";
import { useCallback, useEffect, useState } from "react";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Handle responsive behavior
  useEffect(() => {
    const checkScreenSize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);

      if (mobile) {
        // On mobile, sidebar is closed by default
        setSidebarOpen(false);
        setSidebarCollapsed(false);
      } else {
        // On desktop, sidebar is open by default
        setSidebarOpen(true);
        // Restore collapsed state from localStorage
        const savedCollapsed = localStorage.getItem("sidebarCollapsed");
        if (savedCollapsed !== null) {
          setSidebarCollapsed(savedCollapsed === "true");
        } else {
          setSidebarCollapsed(false);
        }
      }
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  const handleSidebarToggle = useCallback(() => {
    setSidebarOpen((prev) => !prev);
  }, []);

  const handleSidebarCollapse = useCallback(() => {
    setSidebarCollapsed((prev) => {
      const newState = !prev;
      localStorage.setItem("sidebarCollapsed", String(newState));
      return newState;
    });
  }, []);

  // Adjust main content margin based on sidebar state
  const getMainMargin = () => {
    if (isMobile) {
      return "ml-0";
    }
    if (sidebarCollapsed) {
      return "ml-20";
    }
    return "ml-64";
  };

  return (
    <div className="h-screen overflow-hidden">
      <DashboardSidebar
        isOpen={sidebarOpen}
        isCollapsed={sidebarCollapsed}
        onToggle={handleSidebarToggle}
        onCollapse={handleSidebarCollapse}
      />
      <DashboardHeader
        isOpen={sidebarOpen}
        isCollapsed={sidebarCollapsed}
        onToggle={handleSidebarToggle}
      />
      <main
        className={`
          h-full overflow-y-auto transition-all duration-300 ease-in-out
          ${getMainMargin()}
          pt-16 md:pt-4
        `}
      >
        <div className="p-4 md:p-8">{children}</div>
      </main>
    </div>
  );
}
