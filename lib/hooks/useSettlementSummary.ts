"use client";

import { useEffect, useState } from "react";
import { ProfitShareSummary, tradeService } from "@/lib/api/trades";

export function useSettlementSummary(enabled = true) {
  const [summary, setSummary] = useState<ProfitShareSummary | null>(null);
  const [error, setError] = useState(false);
  useEffect(() => {
    if (!enabled) return;
    let active = true;
    async function refresh() {
      try {
        const result = await tradeService.getProfitShare();
        if (active) { setSummary(result.profitShare); setError(false); }
      } catch { if (active) setError(true); }
    }
    void refresh();
    const timer = window.setInterval(() => { if (!document.hidden) void refresh(); }, 30_000);
    window.addEventListener("notifications-updated", refresh);
    return () => { active = false; window.clearInterval(timer); window.removeEventListener("notifications-updated", refresh); };
  }, [enabled]);
  return { summary, error };
}
