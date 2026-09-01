import { ActiveProTrade, ExchangeBalance } from "..";
import { userApi } from "./client";

export interface OpenProTradeData {
  pair: string;
  entry: number;
  tp: number;
  sl: number;
  direction: "buy" | "sell";
  notes?: string;
  exchangeConnectionId: string;
  balance: number;
}

interface TradeMutationResponse {
  success: boolean;
  message: string;
  trade: ActiveProTrade;
}

export const tradeService = {
  getActiveProTrades() {
    return userApi.get<{ success: boolean; trades: ActiveProTrade[] }>(
      "/copy-trader/dashboard/trades",
    );
  },

  getProTrades(page = 1, status: "all" | "active" | "history" = "all") {
    return userApi.get<{
      success: boolean;
      message: string;
      trades: ActiveProTrade[];
      page: number;
      pages: number;
    }>("/pro-trader/dashboard/trades", { params: { page, status } });
  },

  getUserTrades(status: "all" | "active" | "history" = "all", page = 1) {
    return userApi.get<{
      success: boolean;
      trades: ActiveProTrade[];
      pagination: { total: number; page: number; limit: number; pages: number };
    }>("/trades", { params: { status, page } });
  },

  getTrade(tradeId: string) {
    return userApi.get<{ success: boolean; trade: ActiveProTrade }>(`/trades/${tradeId}`);
  },

  openProTrade(data: OpenProTradeData) {
    return userApi.post<TradeMutationResponse>(
      "/pro-trader/dashboard/trades",
      data,
    );
  },

  updateProTrade(
    tradeId: string,
    data: { entryPrice?: number; tp: number; sl: number },
  ) {
    return userApi.patch<TradeMutationResponse>(
      `/pro-trader/dashboard/trades/${tradeId}`,
      data,
    );
  },

  closeProTrade(tradeId: string) {
    return userApi.post<TradeMutationResponse>(
      `/pro-trader/dashboard/trades/${tradeId}/close`,
    );
  },

  copyTrade(sourceTradeId: string, exchangeConnectionId: string, balance: number) {
    return userApi.post<TradeMutationResponse>("/trades", {
      sourceTradeId,
      exchangeConnectionId,
      balance,
    });
  },

  getBalances() {
    return userApi.get<{ success: boolean; balances: ExchangeBalance[] }>(
      "/trades/balances",
    );
  },
};
