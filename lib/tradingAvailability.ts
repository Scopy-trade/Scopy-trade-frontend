import type { User } from "@/lib";

export const TRADING_PAUSED_MESSAGE =
  "Trading is not enabled for this account. New trades and copy subscriptions are available to live accounts only. You can still manage existing positions and stop copying.";

export function isTradingPaused(user: Pick<User, "status"> | null | undefined): boolean {
  return user?.status !== "live";
}
