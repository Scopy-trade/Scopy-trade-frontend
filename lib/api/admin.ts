import {
  DashboardStatsResponse,
  UsersResponse,
  GetUserResponse,
  UserActionResponse,
  Signal,
  DeleteSignalResponse,
  GetAllSignalsResponse,
} from "..";
import { adminApi } from "./client";

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
    return adminApi.post<UserActionResponse>(`/dashboard/users/${userId}/suspend`, {
      reason,
    });
  },

  unbanUser(userId: string) {
    return adminApi.post<UserActionResponse>(
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

export const adminSignalService = {
  getAll(params?: {
    page?: number;
    limit?: number;
    search?: string;
    status?: string;
  }) {
    return adminApi.get<GetAllSignalsResponse>("/dashboard/signals", {
      params,
    });
  },

  getById(signalId: string) {
    return adminApi.get<Signal>(`/dashboard/signals/${signalId}`);
  },

  delete(signalId: string) {
    return adminApi.delete<DeleteSignalResponse>(
      `/dashboard/signals/${signalId}`,
    );
  },
};
