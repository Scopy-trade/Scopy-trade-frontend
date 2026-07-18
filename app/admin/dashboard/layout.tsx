"use client";

import Header from "@/components/admin/dashboard/Header";
import Sidebar from "@/components/admin/dashboard/Sidebar";
import { useState } from "react";
import { AuthProvider } from "@/components/auth/AuthContext";

function AdminDashboardShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <div className="min-h-screen bg-[#0b1326]">
      <Sidebar mobileOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      {/* Main — offset by sidebar width on lg+ */}
      <div className="lg:ml-72 min-h-screen flex flex-col">
        <Header onMenuToggle={() => setSidebarOpen(true)} />
        <main className="flex-1 p-4 sm:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider scope="admin">
      <AdminDashboardShell>{children}</AdminDashboardShell>
    </AuthProvider>
  );
}
