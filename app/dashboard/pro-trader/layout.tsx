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

  // Handle responsive behavior
  useEffect(() => {
    const handleResize = () => {
      const isDesktop = window.innerWidth >= 768;

      if (isDesktop) {
        // On desktop, sidebar is always visible but can be collapsed
        setSidebarOpen(true);
        // Restore collapsed state from localStorage
        const savedCollapsed = localStorage.getItem("sidebarCollapsed");
        if (savedCollapsed !== null) {
          setSidebarCollapsed(savedCollapsed === "true");
        }
      } else {
        // On mobile, sidebar is closed by default and not collapsed
        setSidebarOpen(false);
        setSidebarCollapsed(false);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
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
    if (typeof window !== "undefined" && window.innerWidth < 768) {
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
          pt-16
        `}
      >
        <div className="p-4 md:p-8">{children}</div>
      </main>
    </div>
  );
}
