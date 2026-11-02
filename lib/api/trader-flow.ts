import { userApi } from "./client";

export type Person = { _id: string; firstName: string; lastName: string; traderID: string; profilePhoto?: { url?: string }; status?: string };
export type Rank = { level: number; name: string; copiers: number; trades: number; winRate: number; maxDrawdown: number; bonus: number };
export type TraderProfile = Person & {
  createdAt: string; rank: Rank; highestLevel: number; nextRank: Rank | null;
  metrics: { activeCopiers: number; closedTrades: number; winRate: number; maxDrawdown: number | null };
  subscribers: number; activeTrades: number; realizedPnl: number;
  awards: { _id: string; level: number; bonus: number; status: "pending" | "credited"; mode: string | null }[];
  subscription: { _id: string; allocation: number } | null;
  progress: { copiersRemaining: number; tradesRemaining: number; winRateMet: boolean; drawdownMet: boolean } | null;
};
export type Subscription = { _id: string; proTraderId: Person | null; allocation: number; startedAt: string; exchangeConnectionId: { _id: string; exchange: string; label: string; isActive: boolean } | null };
export type Copier = { _id: string; copier: Person | null; startedAt: string; allocation: number; exchange?: string; label?: string; copiedTrades: number; monthlyTrades: number; monthlyFees: number; realizedPnl: number; rankActive: boolean; balanceQualified: boolean; balanceFresh: boolean };
export type CopyNotice = { _id: string; title: string; message: string; readAt: string | null; createdAt: string };
const copy = "/copy-trader/dashboard", pro = "/pro-trader/dashboard";
export const traderFlow = {
  discover: (page = 1) => userApi.get<{ traders: TraderProfile[]; page: number; pages: number }>(`${copy}/traders`, { params: { page } }),
  profile: (id: string) => userApi.get<{ trader: TraderProfile }>(`${copy}/traders/${id}`),
  start: (id: string, exchangeConnectionId: string, allocation: number) => userApi.post<{ message: string }>(`${copy}/traders/${id}/copy`, { exchangeConnectionId, allocation }),
  stop: (id: string) => userApi.delete<{ message: string }>(`${copy}/traders/${id}/copy`),
  subscriptions: () => userApi.get<{ subscriptions: Subscription[] }>(`${copy}/subscriptions`),
  copiers: () => userApi.get<{ copiers: Copier[] }>(`${pro}/copiers`),
  ranks: () => userApi.get<{ ranks: Rank[]; trader: TraderProfile }>(`${pro}/ranks`),
  notifications: (page = 1) => userApi.get<{ notifications: CopyNotice[]; unread: number; pages: number }>(`${copy}/notifications`, { params: { page } }),
  read: (id: string) => userApi.patch(`${copy}/notifications/${id}/read`),
};
