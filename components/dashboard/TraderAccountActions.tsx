"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { MdAccountBalanceWallet } from "react-icons/md";
import { getAccountInitials, useAuth } from "@/components/auth/AuthContext";
import NotificationBell from "@/components/copy-trader/NotificationBell";
import { useSettlementSummary } from "@/lib/hooks/useSettlementSummary";
import { userApi } from "@/lib/api/client";

export default function TraderAccountActions({ scope }: { scope: "copy" | "pro" }) {
  const { account } = useAuth();
  const { summary, error } = useSettlementSummary(scope === "copy");
  const [available, setAvailable] = useState<string | null>(null);
  const [financeError, setFinanceError] = useState(false);
  useEffect(() => {
    if (scope !== "pro") return;
    let active = true;
    async function refresh() {
      try {
        const result = await userApi.get<{ available: string }>("/pro-trader/dashboard/finance");
        if (active) { setAvailable(result.available); setFinanceError(false); }
      } catch { if (active) setFinanceError(true); }
    }
    void refresh();
    const timer = window.setInterval(() => { if (!document.hidden) void refresh(); }, 30_000);
    return () => { active = false; window.clearInterval(timer); };
  }, [scope]);
  const amount = scope === "copy" ? summary?.pendingAmount : available;
  const unavailable = scope === "copy" ? error : financeError;
  return <div className="flex items-center justify-end gap-3">
    <NotificationBell scope={scope} />
    <Link href={scope === "copy" ? "/dashboard/copy-trader#settlement" : "/dashboard/pro-trader/earnings"}
      title={scope === "copy" ? "Profit-share fees you owe. Your trading funds stay on your exchange." : "Your available earnings for withdrawal"}
      className="flex items-center gap-2 rounded-xl border border-white/10 bg-surface-container px-3 py-2 hover:border-secondary/40">
      <MdAccountBalanceWallet className="shrink-0 text-lg text-secondary" />
      <span><span className="block text-[10px] text-slate-400">{scope === "copy" ? "Settlement owed" : "Available earnings"}</span>
        <span className="block text-xs font-bold tabular-nums">{unavailable ? "Unavailable" : amount == null ? "Loading…" : `${Number(amount).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} USDT`}</span></span>
    </Link>
    <Link href={`/dashboard/${scope}-trader/profile`} aria-label="Your profile" className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-primary/20 bg-surface-container-high text-xs font-bold text-secondary ${scope === "copy" ? "hidden" : ""}`}>
      {getAccountInitials(account)}
    </Link>
  </div>;
}
