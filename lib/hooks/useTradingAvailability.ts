"use client";

import { useAuth } from "@/components/auth/AuthContext";
import { isTradingPaused } from "@/lib/tradingAvailability";

export function useTradingAvailability() {
  const { user } = useAuth();
  return { tradingPaused: isTradingPaused(user) };
}
