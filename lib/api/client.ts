import axios, {
  AxiosError,
  AxiosInstance,
  InternalAxiosRequestConfig,
} from "axios";
import {
  Admin,
  AuthResponse,
  ConnectionSummary,
  ExchangeConnectionsResponse,
  LoginCredentials,
  RegisterData,
  SupportedExchangesResponse,
  User,
} from "..";

const API_BASE_URL = "/api";

// ─── Types ─────────────────────────────────────────────────────────────

interface AdminResponse {
  status: "success" | "fail" | "error";
  data?: { admin: Admin };
  message?: string;
}

// User management types
export interface UserManagementUser extends User {
  id: string;
  _id: string;
  uid?: string;
  name?: string;
  initials?: string;
  status?: "Active" | "Offline" | "Banned";
  trades?: string;
  lastActive?: string;
  location?: string;
  roi?: string;
  roiPositive?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

interface UsersResponse {
  status: string;
  data: {
    users: UserManagementUser[];
    total: number;
    page: number;
    limit: number;
  };
  message?: string;
}

interface UserActionResponse {
  status: string;
  message: string;
  data?: {
    user?: UserManagementUser;
  };
}

interface GetUserResponse {
  status: string;
  data: {
    user: UserManagementUser;
  };
}

interface DashboardStatsResponse {
  status: string;
  data: {
    totalUsers: number;
    activeNow: number;
    pendingKYC: number;
    bannedAccounts: number;
  };
}

// Signal types based on backend
export interface Signal {
  _id: string;
  pair: string;
  tp: number;
  sl: number;
  entry: number;
  direction: "BUY" | "SELL";
  notes?: string;
  trader: string;
  status: "active" | "expired";
  result?: "SUCCESS" | "BAD" | "EVEN";
  pnl?: string;
  pnlPercent?: string;
  volume?: string;
  followers?: number;
  createdAt: string;
  updatedAt: string;
}

interface CreateSignalData {
  pair: string;
  tp: number;
  sl: number;
  entry: number;
  direction: "BUY" | "SELL";
  notes?: string;
}

interface UpdateSignalData {
  pair?: string;
  tp?: number;
  sl?: number;
  entry?: number;
  direction?: "BUY" | "SELL";
  notes?: string;
}

interface GetAllSignalsResponse {
  success: boolean;
  message: string;
  signals: Signal[];
  page: number;
  limit: number;
  pageSize: number;
  pages: number;
}

interface CreateSignalResponse {
  success: boolean;
  message: string;
  signal: Signal;
}

interface UpdateSignalResponse {
  success: boolean;
  message: string;
  signal: Signal;
}

interface DeleteSignalResponse {
  success: boolean;
  message: string;
}

// Extended config type for retry logic
interface ExtendedAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

// ─── Axios ─────────────────────────────────────────────────────────────

const SHARED_CONFIG = {
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
} as const;

export const api: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  ...SHARED_CONFIG,
});

export const adminAxios: AxiosInstance = axios.create({
  baseURL: `${API_BASE_URL}/admin`,
  ...SHARED_CONFIG,
});

// ─── Interceptor ───────────────────────────────────────────────────────

function attachResponseInterceptor(
  instance: AxiosInstance,
  opts: {
    refreshPath: string;
    clearStorage: () => void;
  },
) {
  instance.interceptors.response.use(
    (res) => res,
    async (error: AxiosError) => {
      const original = error.config as ExtendedAxiosRequestConfig | undefined;

      const status = error.response?.status;
      const url = original?.url ?? "";

      const isAuthEndpoint =
        url.includes("/login") ||
        url.includes("/register") ||
        url.includes("/refresh");

      if (status === 401 && !original?._retry && !isAuthEndpoint && original) {
        original._retry = true;

        try {
          await api.post(opts.refreshPath);
          return instance(original);
        } catch {
          opts.clearStorage();
          return Promise.reject(error);
        }
      }

      return Promise.reject(error);
    },
  );
}

attachResponseInterceptor(api, {
  refreshPath: "/auth/refresh",
  clearStorage: () => {
    localStorage.removeItem("user");
    localStorage.removeItem("userEmail");
  },
});

attachResponseInterceptor(adminAxios, {
  refreshPath: "/admin/auth/refresh",
  clearStorage: () => {
    localStorage.removeItem("admin");
    localStorage.removeItem("adminEmail");
  },
});

// ─── Error helper ──────────────────────────────────────────────────────

interface ErrorResponseData {
  message?: string;
  error?: string;
}

function extractErrorMessage(error: unknown, fallback: string): string {
  if (axios.isAxiosError(error)) {
    const data = error.response?.data as ErrorResponseData | undefined;

    return data?.message ?? data?.error ?? error.message ?? fallback;
  }
  return fallback;
}

// ─── API CLASS ────────────────────────────────────────────────────────

class AuthAPI {
  // ── USER ────────────────────────────────────────────────────────────

  async register(data: RegisterData): Promise<User> {
    try {
      const { data: body } = await api.post<AuthResponse>(
        "/auth/register",
        data,
      );

      const user: User = body.data?.user ?? {
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        role: data.role,
        hasOnboarded: false,
      };

      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("userEmail", user.email);

      return user;
    } catch (error) {
      throw new Error(extractErrorMessage(error, "Registration failed"));
    }
  }

  async login(credentials: LoginCredentials): Promise<User> {
    try {
      const { data: body } = await api.post<AuthResponse>(
        "/auth/login",
        credentials,
      );

      const user: User = body.data?.user ?? {
        email: credentials.email,
        hasOnboarded: false,
      };

      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("userEmail", credentials.email);

      return user;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 403) {
          throw new Error(
            "Your account has been suspended. Please contact support.",
          );
        }
        if (error.response?.status === 401) {
          throw new Error("Invalid email or password.");
        }
      }

      throw new Error(extractErrorMessage(error, "Login failed"));
    }
  }

  async getUser(): Promise<User> {
    try {
      interface UserMeResponse {
        status: string;
        data: User;
      }

      const { data: body } = await api.get<UserMeResponse>("/auth/me");

      if (body.status !== "success") {
        throw new Error("Failed to fetch user");
      }

      return body.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) {
          throw new Error("Not authenticated");
        }
      }

      throw new Error(extractErrorMessage(error, "Failed to fetch user"));
    }
  }

  async logout(): Promise<void> {
    localStorage.removeItem("user");
    localStorage.removeItem("userEmail");

    try {
      await api.post("/auth/logout");
    } catch {
      // Ignore logout errors
    }
  }

  async getPostLoginRedirect(user: User): Promise<string> {
    if (!user.role) return "/register";

    const normalizedRole = user.role.trim();

    if (normalizedRole === "Pro Trader") return "/dashboard/pro-trader";

    if (normalizedRole === "CopyTrader" || normalizedRole === "Copy Trader") {
      try {
        const res = await this.getUserExchangeConnections();
        const connections = res.connections ?? [];

        if (connections.length > 0) return "/dashboard/copy-trader";
      } catch {
        // Ignore error and proceed to onboarding
      }

      return "/onboarding";
    }

    return "/register";
  }

  // ── PRO TRADER SIGNALS ───────────────────────────────────────────────

  async getAllSignals(page: number = 1): Promise<GetAllSignalsResponse> {
    try {
      const { data } = await api.get<GetAllSignalsResponse>(
        `/signals?page=${page}`,
      );
      return data;
    } catch (error) {
      throw new Error(extractErrorMessage(error, "Failed to fetch signals"));
    }
  }

  async createSignal(
    signalData: CreateSignalData,
  ): Promise<CreateSignalResponse> {
    try {
      const { data } = await api.post<CreateSignalResponse>(
        "/signals",
        signalData,
      );
      return data;
    } catch (error) {
      throw new Error(extractErrorMessage(error, "Failed to create signal"));
    }
  }

  async updateSignal(
    signalId: string,
    signalData: UpdateSignalData,
  ): Promise<UpdateSignalResponse> {
    try {
      const { data } = await api.patch<UpdateSignalResponse>(
        `/signals/${signalId}`,
        signalData,
      );
      return data;
    } catch (error) {
      throw new Error(extractErrorMessage(error, "Failed to update signal"));
    }
  }

  async deleteSignal(signalId: string): Promise<DeleteSignalResponse> {
    try {
      const { data } = await api.delete<DeleteSignalResponse>(
        `/signals/${signalId}`,
      );
      return data;
    } catch (error) {
      throw new Error(extractErrorMessage(error, "Failed to delete signal"));
    }
  }

  // ── ADMIN ───────────────────────────────────────────────────────────

  async adminLogin(credentials: LoginCredentials): Promise<Admin> {
    try {
      const { data: body } = await adminAxios.post<AdminResponse>(
        "/auth/login",
        credentials,
      );

      const admin: Admin = body.data?.admin ?? { email: credentials.email };

      localStorage.setItem("admin", JSON.stringify(admin));
      localStorage.setItem("adminEmail", credentials.email);

      return admin;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        throw new Error("Invalid email or password.");
      }

      throw new Error(extractErrorMessage(error, "Admin login failed"));
    }
  }

  async getAdmin(): Promise<Admin> {
    try {
      interface AdminMeResponse {
        status: string;
        data: Admin;
      }

      const { data: body } = await adminAxios.get<AdminMeResponse>("/auth/me");

      if (body.status !== "success") {
        throw new Error("Failed to fetch admin");
      }

      return body.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) {
          throw new Error("Not authenticated");
        }
      }

      throw new Error(extractErrorMessage(error, "Failed to fetch admin"));
    }
  }

  async adminLogout(): Promise<void> {
    localStorage.removeItem("admin");
    localStorage.removeItem("adminEmail");

    try {
      await adminAxios.post("/auth/logout");
    } catch {
      // Ignore logout errors
    }
  }

  // ── USER MANAGEMENT (ADMIN) ─────────────────────────────────────────

  async getAllUsers(params?: {
    page?: number;
    limit?: number;
    search?: string;
    role?: string;
    status?: string;
  }): Promise<UsersResponse> {
    try {
      const queryParams = new URLSearchParams();
      if (params?.page) queryParams.append("page", params.page.toString());
      if (params?.limit) queryParams.append("limit", params.limit.toString());
      if (params?.search) queryParams.append("search", params.search);
      if (params?.role) queryParams.append("role", params.role);
      if (params?.status) queryParams.append("status", params.status);

      const url = `/dashboard/users${queryParams.toString() ? `?${queryParams.toString()}` : ""}`;
      const { data } = await adminAxios.get<UsersResponse>(url);
      return data;
    } catch (error) {
      throw new Error(extractErrorMessage(error, "Failed to fetch users"));
    }
  }

  async getUserById(userId: string): Promise<UserManagementUser> {
    try {
      const { data } = await adminAxios.get<GetUserResponse>(
        `/dashboard/users/${userId}`,
      );

      if (data.status !== "success") {
        throw new Error("Failed to fetch user");
      }

      return data.data.user;
    } catch (error) {
      throw new Error(extractErrorMessage(error, "Failed to fetch user"));
    }
  }

  async updateUserStatus(
    userId: string,
    status: "Active" | "Offline" | "Banned",
  ): Promise<UserActionResponse> {
    try {
      const { data } = await adminAxios.patch<UserActionResponse>(
        `/dashboard/users/${userId}/status`,
        { status },
      );
      return data;
    } catch (error) {
      throw new Error(
        extractErrorMessage(error, "Failed to update user status"),
      );
    }
  }

  async banUser(userId: string, reason?: string): Promise<UserActionResponse> {
    try {
      const { data } = await adminAxios.post<UserActionResponse>(
        `/dashboard/users/${userId}/ban`,
        { reason },
      );
      return data;
    } catch (error) {
      throw new Error(extractErrorMessage(error, "Failed to ban user"));
    }
  }

  async unbanUser(userId: string): Promise<UserActionResponse> {
    try {
      const { data } = await adminAxios.post<UserActionResponse>(
        `/dashboard/users/${userId}/unban`,
      );
      return data;
    } catch (error) {
      throw new Error(extractErrorMessage(error, "Failed to unban user"));
    }
  }

  async updateUserRole(
    userId: string,
    role: "Pro Trader" | "Copy Trader",
  ): Promise<UserActionResponse> {
    try {
      const { data } = await adminAxios.patch<UserActionResponse>(
        `/dashboard/users/${userId}/role`,
        { role },
      );
      return data;
    } catch (error) {
      throw new Error(extractErrorMessage(error, "Failed to update user role"));
    }
  }

  async deleteUser(userId: string): Promise<UserActionResponse> {
    try {
      const { data } = await adminAxios.delete<UserActionResponse>(
        `/dashboard/users/${userId}`,
      );
      return data;
    } catch (error) {
      throw new Error(extractErrorMessage(error, "Failed to delete user"));
    }
  }

  async getDashboardStats(): Promise<{
    totalUsers: number;
    activeNow: number;
    pendingKYC: number;
    bannedAccounts: number;
  }> {
    try {
      const { data } =
        await adminAxios.get<DashboardStatsResponse>("/dashboard/stats");

      return data.data;
    } catch (error) {
      console.error("Failed to fetch dashboard stats:", error);
      return {
        totalUsers: 0,
        activeNow: 0,
        pendingKYC: 0,
        bannedAccounts: 0,
      };
    }
  }

  // ── ADMIN SIGNALS ───────────────────────────────────────────────────

  async adminGetAllSignals(params?: {
    page?: number;
    limit?: number;
    search?: string;
    status?: string;
  }): Promise<GetAllSignalsResponse> {
    try {
      const queryParams = new URLSearchParams();
      if (params?.page) queryParams.append("page", params.page.toString());
      if (params?.limit) queryParams.append("limit", params.limit.toString());
      if (params?.search) queryParams.append("search", params.search);
      if (params?.status) queryParams.append("status", params.status);

      const url = `/dashboard/signals${queryParams.toString() ? `?${queryParams.toString()}` : ""}`;
      const { data } = await adminAxios.get<GetAllSignalsResponse>(url);
      return data;
    } catch (error) {
      throw new Error(extractErrorMessage(error, "Failed to fetch signals"));
    }
  }

  async adminGetSignalById(signalId: string): Promise<Signal> {
    try {
      interface GetSignalResponse {
        success: boolean;
        message: string;
        signal: Signal;
      }
      const { data } = await adminAxios.get<GetSignalResponse>(
        `/dashboard/signals/${signalId}`,
      );
      return data.signal;
    } catch (error) {
      throw new Error(extractErrorMessage(error, "Failed to fetch signal"));
    }
  }

  async adminDeleteSignal(signalId: string): Promise<DeleteSignalResponse> {
    try {
      const { data } = await adminAxios.delete<DeleteSignalResponse>(
        `/dashboard/signals/${signalId}`,
      );
      return data;
    } catch (error) {
      throw new Error(extractErrorMessage(error, "Failed to delete signal"));
    }
  }

  // ── EXCHANGES ───────────────────────────────────────────────────────

  async getUserExchanges(): Promise<SupportedExchangesResponse> {
    const { data } = await api.get<SupportedExchangesResponse>("/exchanges");
    return data;
  }

  async getUserExchangeConnections(): Promise<ExchangeConnectionsResponse> {
    const { data } = await api.get<ExchangeConnectionsResponse>(
      "/exchanges/connections",
    );
    return data;
  }

  async connectExchange(payload: Record<string, unknown>): Promise<{
    success: boolean;
    message: string;
    connection: ConnectionSummary;
  }> {
    interface ConnectExchangeResponse {
      success: boolean;
      message: string;
      connection: ConnectionSummary;
    }
    const { data } = await api.post<ConnectExchangeResponse>(
      "/exchanges/connect",
      payload,
    );
    return data;
  }

  async testConnection(connectionId: string): Promise<{
    success: boolean;
    message: string;
    accountInfo?: Record<string, unknown>;
  }> {
    interface TestConnectionResponse {
      success: boolean;
      message: string;
      accountInfo?: Record<string, unknown>;
    }
    const { data } = await api.post<TestConnectionResponse>(
      `/exchanges/connections/${connectionId}/test`,
    );
    return data;
  }

  async removeConnection(connectionId: string): Promise<{
    success: boolean;
    message: string;
  }> {
    interface RemoveConnectionResponse {
      success: boolean;
      message: string;
    }
    const { data } = await api.delete<RemoveConnectionResponse>(
      `/exchanges/connections/${connectionId}`,
    );
    return data;
  }

  async updateConnectionCredentials(
    connectionId: string,
    payload: { apiKey: string; apiSecret: string; passphrase?: string },
  ): Promise<{
    success: boolean;
    message: string;
  }> {
    interface UpdateConnectionResponse {
      success: boolean;
      message: string;
    }
    const { data } = await api.patch<UpdateConnectionResponse>(
      `/exchanges/connections/${connectionId}`,
      payload,
    );
    return data;
  }
}

export const authAPI = new AuthAPI();

type ApiMethod = "get" | "post" | "put" | "patch" | "delete";

interface ApiEnvelope<T> {
  status: "success" | "fail" | "error";
  data?: T;
  message?: string;
}

interface RequestOptions {
  params?: Record<string, unknown>;
  headers?: Record<string, string>;
}

async function makeRequest<T>(
  instance: AxiosInstance,
  method: ApiMethod,
  endpoint: string,
  body?: unknown,
  options: RequestOptions = {},
): Promise<T> {
  return instance
    .request<ApiEnvelope<T>>({
      method,
      url: endpoint,
      data: body,
      params: options.params,
      headers: options.headers,
    })
    .then(({ data: envelope }) => {
      if (envelope.status !== "success") {
        throw new Error(envelope.message ?? `Request to ${endpoint} failed`);
      }
      return envelope.data as T;
    })
    .catch((error: unknown) => {
      if (error instanceof Error && !axios.isAxiosError(error)) throw error;
      throw new Error(
        extractErrorMessage(error, `Request to ${endpoint} failed`),
      );
    });
}

function buildApiHelper(instance: AxiosInstance) {
  return {
    /** GET /api/<endpoint> — or /api/admin/<endpoint> for adminApi */
    get<T>(endpoint: string, options?: RequestOptions): Promise<T> {
      return makeRequest<T>(instance, "get", endpoint, undefined, options);
    },
    /** POST /api/<endpoint> */
    post<T>(
      endpoint: string,
      body?: unknown,
      options?: RequestOptions,
    ): Promise<T> {
      return makeRequest<T>(instance, "post", endpoint, body, options);
    },
    /** PUT /api/<endpoint> — full resource replacement */
    put<T>(
      endpoint: string,
      body?: unknown,
      options?: RequestOptions,
    ): Promise<T> {
      return makeRequest<T>(instance, "put", endpoint, body, options);
    },
    /** PATCH /api/<endpoint> — partial update */
    patch<T>(
      endpoint: string,
      body?: unknown,
      options?: RequestOptions,
    ): Promise<T> {
      return makeRequest<T>(instance, "patch", endpoint, body, options);
    },
    /** DELETE /api/<endpoint> */
    delete<T>(endpoint: string, options?: RequestOptions): Promise<T> {
      return makeRequest<T>(instance, "delete", endpoint, undefined, options);
    },
  };
}

export const userApi = buildApiHelper(api);

export const adminApi = buildApiHelper(adminAxios);
