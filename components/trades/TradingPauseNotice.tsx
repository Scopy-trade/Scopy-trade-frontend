"use client";

import { TRADING_PAUSED_MESSAGE } from "@/lib/tradingAvailability";
import { useTradingAvailability } from "@/lib/hooks/useTradingAvailability";

export default function TradingPauseNotice() {
  const { tradingPaused } = useTradingAvailability();
  if (!tradingPaused) return null;
  return (
    <aside role="status" className="mb-4 rounded-lg border border-secondary/20 bg-secondary/5 px-4 py-2 text-sm text-secondary">
      {TRADING_PAUSED_MESSAGE}
    </aside>
  );
}
