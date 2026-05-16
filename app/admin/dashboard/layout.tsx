"use client";

import Header from "@/components/admin/dashboard/Header";
import Sidebar from "@/components/admin/dashboard/Sidebar";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { authAPI } from "@/lib/api/client";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isValidating, setIsValidating] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const validate = async () => {
      try {
        await authAPI.getAdmin();
      } catch {
        router.replace("/admin/login");
      } finally {
        setIsValidating(false);
      }
    };

    validate();
  }, [router]);

  if (isValidating) return null;

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
