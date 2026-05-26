import axios, {
  AxiosError,
  AxiosInstance,
  InternalAxiosRequestConfig,
} from "axios";
import { Admin, AuthResponse, LoginCredentials, RegisterData, User } from "..";
import { exchangeService } from "./exchanges";

const API_BASE_URL = "/api";

// ─── Types ─────────────────────────────────────────────────────────────

interface AdminResponse {
  status: "success" | "fail" | "error";
  data?: { admin: Admin };
  message?: string;
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

    if (normalizedRole === "Pro Trader") {
      return "/dashboard/pro-trader";
    }

    if (normalizedRole === "CopyTrader" || normalizedRole === "Copy Trader") {
      try {
        const res = await exchangeService.getConnections();
        const connections = res.connections ?? [];

        if (connections.length > 0) {
          return "/dashboard/copy-trader";
        }
      } catch {
        // Ignore error and proceed to onboarding
      }

      return "/onboarding";
    }

    return "/register";
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
}

export const authAPI = new AuthAPI();

type ApiMethod = "get" | "post" | "put" | "patch" | "delete";

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
    .request<T & { success: boolean; message?: string }>({
      method,
      url: endpoint,
      data: body,
      params: options.params,
      headers: options.headers,
    })
    .then(({ data }) => {
      if (data.success !== true) {
        throw new Error(data.message ?? `Request to ${endpoint} failed`);
      }
      return data as T; // ✅ return the whole flat response
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
