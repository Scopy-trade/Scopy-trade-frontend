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

  getProTrades(page = 1) {
    return userApi.get<{
      success: boolean;
      message: string;
      trades: ActiveProTrade[];
      page: number;
      pages: number;
    }>("/pro-trader/dashboard/trades", { params: { page } });
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
