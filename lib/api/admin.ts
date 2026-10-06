import {
  DashboardStatsResponse,
  UsersResponse,
  GetUserResponse,
  UserActionResponse,
} from "..";
import { adminApi } from "./client";
import { ActiveProTrade } from "..";
import type { Withdrawal } from "./withdrawals";

export interface AdminWithdrawal extends Withdrawal {
  userId: string;
  proTrader: { _id: string; firstName: string; lastName: string; email: string; traderID: string } | null;
  reconciliationReason: string | null;
}
export const adminWithdrawalService = {
  list(page: number, status?: string) {
    return adminApi.get<{ rows: AdminWithdrawal[]; page: number; pages: number; total: number }>("/dashboard/pro/withdrawals", { params: { page, ...(status ? { status } : {}) } });
  },
  get(id: string) {
    return adminApi.get<{ withdrawal: AdminWithdrawal }>(`/dashboard/pro/withdrawals/${encodeURIComponent(id)}`);
  },
  reconcile(id: string) {
    return adminApi.post<{ withdrawal: AdminWithdrawal; idempotent: boolean; message: string }>(`/dashboard/pro/withdrawals/${encodeURIComponent(id)}/reconcile`, {});
  },
};

export interface AdminTradeFilters {
  status?: string;
  page?: number;
  limit?: number;
  pair?: string;
  direction?: "buy" | "sell" | "";
  tradeOrigin?: "pro" | "copy" | "";
  result?: "profit" | "loss" | "breakeven" | "";
  search?: string;
}

export interface AdminEarning {
  _id: string;
  tradeId?: string;
  pair: string;
  direction: "buy" | "sell";
  platformFee: string;
  feeStatus: "pending" | "processing" | "collected" | "failed";
  closedAt?: string | null;
  settlementCompletedAt?: string | null;
  settlementTransactionId?: string | null;
  userId: {
    _id: string;
    firstName?: string;
    lastName?: string;
    traderID?: string;
    email?: string;
  } | string;
  sourceTradeId?: {
    _id: string;
    tradeId?: string;
    userId?: {
      _id: string;
      firstName?: string;
      lastName?: string;
      traderID?: string;
    } | string;
  } | string | null;
}

export interface AdminEarningsResponse {
  success: boolean;
  earnings: AdminEarning[];
  summary: {
    actualAmount: number;
    prospectiveAmount: number;
    actualCount: number;
    prospectiveCount: number;
  };
  pagination: { total: number; page: number; limit: number; pages: number };
}

export const adminTradeService = {
  getTrades(filters: AdminTradeFilters = {}) {
    return adminApi.get<{
      success: boolean;
      trades: ActiveProTrade[];
      pagination: { total: number; page: number; limit: number; pages: number };
    }>("/dashboard/trades", { params: { ...filters } });
  },

  getTrade(tradeId: string) {
    return adminApi.get<{ success: boolean; trade: ActiveProTrade }>(
      `/dashboard/trades/${tradeId}`,
    );
  },

  getEarnings(params?: {
    category?: "actual" | "prospective";
    page?: number;
    limit?: number;
    pair?: string;
    direction?: "buy" | "sell" | "";
    feeStatus?: string;
    search?: string;
    dateFrom?: string;
    dateTo?: string;
  }) {
    return adminApi.get<AdminEarningsResponse>("/dashboard/earnings", { params });
  },
};

export const adminUserService = {
  getAllUsers(params?: {
    page?: number;
    limit?: number;
    search?: string;
    role?: string;
    status?: string;
  }) {
    return adminApi.get<UsersResponse>("/dashboard/users", {
      params,
    });
  },

  getUserById(userId: string) {
    return adminApi.get<GetUserResponse>(`/dashboard/users/${userId}`);
  },

  updateUserStatus(userId: string, status: "Active" | "Offline" | "Banned") {
    return adminApi.patch<UserActionResponse>(
      `/dashboard/users/${userId}/status`,
      { status },
    );
  },

  banUser(userId: string, reason?: string) {
    return adminApi.patch<UserActionResponse>(`/dashboard/users/${userId}/suspend`, {
      reason,
    });
  },

  unbanUser(userId: string) {
    return adminApi.patch<UserActionResponse>(
      `/dashboard/users/${userId}/activate`,
    );
  },

  deleteUser(userId: string) {
    return adminApi.delete<UserActionResponse>(`/dashboard/users/${userId}`);
  },

  getDashboardStats() {
    return adminApi.get<DashboardStatsResponse>("/dashboard/stats");
  },
};
