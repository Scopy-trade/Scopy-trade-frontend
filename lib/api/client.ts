// lib/api/auth.ts
import axios, { AxiosError, AxiosInstance } from "axios";
import { Admin, AuthResponse, LoginCredentials, RegisterData, User } from "..";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "https://scopy-trade-backend.onrender.com/api";

interface AdminResponse {
  status: "success" | "fail" | "error";
  data?: { admin: Admin };
  message?: string;
}

interface ExchangeConnectionsResponse {
  status: "success" | "fail" | "error";
  data?: { connections: unknown[] };
  message?: string;
}

// ─── Axios Instances ──────────────────────────────────────────────────────────
const SHARED_CONFIG = {
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
} as const;

const api: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  ...SHARED_CONFIG,
});

const adminAxios: AxiosInstance = axios.create({
  baseURL: `${API_BASE_URL}/admin`,
  ...SHARED_CONFIG,
});

// ─── Interceptor factory ──────────────────────────────────────────────────────
function attachResponseInterceptor(
  instance: AxiosInstance,
  opts: {
    refreshPath: string; // absolute path on `api`, e.g. "/auth/refresh"
    clearStorage: () => void;
  },
) {
  instance.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
      const originalRequest = error.config as typeof error.config & {
        _retry?: boolean;
      };

      const status = error.response?.status;
      const url = originalRequest?.url ?? "";

      // Don't intercept auth endpoints themselves — would cause infinite loops
      const isAuthEndpoint =
        url.includes("/login") ||
        url.includes("/register") ||
        url.includes("/refresh");

      if (status === 401 && !originalRequest._retry && !isAuthEndpoint) {
        originalRequest._retry = true;

        try {
          // Always use the base `api` instance for refresh so the full path
          // resolves correctly regardless of which instance errored
          await api.post(opts.refreshPath);
          return instance(originalRequest);
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

// ─── Error normaliser ─────────────────────────────────────────────────────────

function extractErrorMessage(error: unknown, fallback: string): string {
  if (axios.isAxiosError(error)) {
    const data = error.response?.data as
      | { message?: string; error?: string }
      | undefined;
    return data?.message ?? data?.error ?? error.message ?? fallback;
  }
  return fallback;
}

// ─── Auth API ─────────────────────────────────────────────────────────────────

class AuthAPI {
  // ── User ──────────────────────────────────────────────────────────────────

  async register(data: RegisterData): Promise<string> {
    try {
      await api.post<AuthResponse>("/auth/register", data);

      const user: User = {
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        role: data.role,
        hasOnboarded: false,
      };

      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("userEmail", data.email);

      return "/login";
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

  async getPostLoginRedirect(user: User): Promise<string> {
    if (!user.role) return "/register";

    if (user.role === "Pro Trader") return "/dashboard/protrader";

    if (user.role === "CopyTrader") {
      try {
        const response = await this.getUserExchangeConnections();
        const connections = Array.isArray(response.data?.connections)
          ? response.data.connections
          : [];

        if (connections.length > 0) return "/dashboard/copytrader";
      } catch {
        // Connection check failed — assume not onboarded
      }

      return "/onboarding";
    }

    return "/register";
  }

  async logout(): Promise<void> {
    localStorage.removeItem("user");
    localStorage.removeItem("userEmail");

    try {
      await api.post("/auth/logout");
    } catch {
      // Silently swallow — local state is already cleared
    }
  }

  // ── Admin ─────────────────────────────────────────────────────────────────

  async adminLogin(credentials: LoginCredentials): Promise<Admin> {
    try {
      // adminAxios baseURL already includes /admin, so path is just /auth/login
      const { data: body } = await adminAxios.post<AdminResponse>(
        "/auth/login",
        credentials,
      );

      const admin: Admin = body.data?.admin ?? { email: credentials.email };

      localStorage.setItem("admin", JSON.stringify(admin));
      localStorage.setItem("adminEmail", credentials.email);

      return admin;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) {
          throw new Error("Invalid email or password.");
        }
      }
      throw new Error(extractErrorMessage(error, "Admin login failed"));
    }
  }

  async adminLogout(): Promise<void> {
    localStorage.removeItem("admin");
    localStorage.removeItem("adminEmail");

    try {
      await adminAxios.post("/auth/logout");
    } catch {
      // Silently swallow
    }
  }

  // ── Auth status ───────────────────────────────────────────────────────────

  async isAuthenticated(): Promise<boolean> {
    try {
      const { data: body } = await api.get<{ status: string }>("/auth/me");
      return body.status === "success";
    } catch {
      return false;
    }
  }

  async isAdminAuthenticated(): Promise<boolean> {
    try {
      const { data: body } = await adminAxios.get<{ status: string }>(
        "/auth/me",
      );
      return body.status === "success";
    } catch {
      return false;
    }
  }

  // ── Exchanges ─────────────────────────────────────────────────────────────

  async getUserExchanges(): Promise<unknown> {
    const { data } = await api.get("/exchanges");
    return data;
  }

  async getUserExchangeConnections(): Promise<ExchangeConnectionsResponse> {
    const { data } = await api.get<ExchangeConnectionsResponse>(
      "/exchanges/connections",
    );
    return data;
  }

  async connectExchange(
    connectionData: Record<string, unknown>,
  ): Promise<unknown> {
    const { data } = await api.post("/exchanges/connect", connectionData);
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
    .catch((error) => {
      // Re-throw already-normalised errors (e.g. from the block above)
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

// Export raw instances for callers that need full AxiosResponse access
export { api, adminAxios };
