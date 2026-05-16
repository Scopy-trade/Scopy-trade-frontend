"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { authAPI } from "@/lib/api/client";

export default function CopyTraderDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isValidating, setIsValidating] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const validate = async () => {
      try {
        const user = await authAPI.getUser();
        const role = user.role?.trim();

        if (role !== "CopyTrader" && role !== "Copy Trader") {
          throw new Error("Unauthorized");
        }
      } catch {
        router.replace("/login");
      } finally {
        setIsValidating(false);
      }
    };

    validate();
  }, [router]);

  if (isValidating) return null;

  return <div className="min-h-screen bg-[#0b1326]">{children}</div>;
}
