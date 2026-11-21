"use client";

import { TRADING_PAUSED_MESSAGE } from "@/lib/tradingAvailability";
import { useTradingAvailability } from "@/lib/hooks/useTradingAvailability";

export default function TradingPauseNotice() {
  const { tradingPaused } = useTradingAvailability();
  if (!tradingPaused) return null;
  return (
    <aside role="status" className="mb-6 rounded-xl border border-amber-400/20 bg-amber-400/10 p-4 text-sm text-amber-200">
      <p className="font-semibold">Trading unavailable for this account</p>
      <p className="mt-1 leading-relaxed">{TRADING_PAUSED_MESSAGE}</p>
    </aside>
  );
}
