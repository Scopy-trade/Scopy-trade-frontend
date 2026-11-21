import type { User } from "@/lib";

export const TRADING_PAUSED_MESSAGE =
  "Live trading is coming soon. Stay tuned!";

export function isTradingPaused(user: Pick<User, "status"> | null | undefined): boolean {
  return user?.status !== "live";
}
