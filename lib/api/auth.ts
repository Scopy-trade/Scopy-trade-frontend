// lib/api/auth.ts - UPDATED
const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "https://scopy-trade-backend.onrender.com/api";

export interface LoginCredentials {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface RegisterData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: UserRole;
  accessCode?: string;
}

export type UserRole = "CopyTrader" | "Pro Trader";

export interface User {
  id?: string;
  _id?: string;
  email: string;
  firstName?: string;
  lastName?: string;
  role?: UserRole;
  traderID?: string;
  hasOnboarded?: boolean;
}

interface AuthResponse {
  status?: string;
  message?: string;
  user?: User;
  data?: {
    user?: User;
  };
}

export interface Admin {
  email: string;
  firstName?: string;
  lastName?: string;
}

interface AdminResponse {
  admin?: Admin;
}

interface ExchangeConnectionsResponse {
  connections?: unknown[];
}

class AuthAPI {
  private async request<T>(
    endpoint: string,
    options?: RequestInit,
  ): Promise<T> {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...options?.headers,
      },
      credentials: "include",
    });

    if (!response.ok) {
      let errorMessage = `Request failed: ${response.status}`;
      try {
        const error = (await response.json()) as {
          message?: string;
          error?: string;
        };
        errorMessage = error.message || error.error || errorMessage;
      } catch {
        errorMessage = response.statusText || errorMessage;
      }
      throw new Error(errorMessage);
    }

    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      return response.json() as Promise<T>;
    }

    return {} as T;
  }

  async register(data: RegisterData): Promise<string> {
    const response = await this.request<AuthResponse>("/auth/register", {
      method: "POST",
      body: JSON.stringify(data),
    });

    const responseUser = response.data?.user || response.user;
    const user: User = responseUser ?? {
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
      role: data.role,
      hasOnboarded: false,
    };

    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("userEmail", data.email);

    // Always redirect to login after registration
    return "/login";
  }

  async login(credentials: LoginCredentials): Promise<User> {
    const response = await this.request<AuthResponse>("/auth/login", {
      method: "POST",
      body: JSON.stringify(credentials),
    });

    const user: User = response.data?.user ||
      response.user || { email: credentials.email, hasOnboarded: false };

    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("userEmail", credentials.email);

    return user;
  }

  async getPostLoginRedirect(user: User): Promise<string> {
    if (!user.role) {
      return "/register";
    }

    // Pro traders go straight to dashboard
    if (user.role === "Pro Trader") {
      return "/dashboard/protrader";
    }

    // For CopyTrader, check onboarding status
    if (user.role === "CopyTrader") {
      // Check if user has onboarded (connected exchange)
      try {
        const response = await this.getUserExchangeConnections();
        const connections = Array.isArray(response?.connections)
          ? response.connections
          : [];

        // Has exchange connected → already onboarded → dashboard
        if (connections.length > 0) {
          return "/dashboard/copytrader";
        }
      } catch {
        // If connection check fails, assume not onboarded
      }

      // Not onboarded yet → go to onboarding
      return "/onboarding";
    }

    return "/register";
  }

  async logout(): Promise<void> {
    try {
      await this.request("/auth/logout", {
        method: "POST",
      });
    } catch {
      // Silently handle logout errors — still clear local state below
    } finally {
      localStorage.removeItem("user");
      localStorage.removeItem("userEmail");
    }
  }

  async adminLogin(credentials: LoginCredentials): Promise<Admin> {
    const response = await this.request<AdminResponse>("/admin/auth/login", {
      method: "POST",
      body: JSON.stringify(credentials),
    });

    const admin: Admin = { email: credentials.email };
    localStorage.setItem("admin", JSON.stringify(admin));
    localStorage.setItem("adminEmail", credentials.email);

    return response.admin || admin;
  }

  async adminLogout(): Promise<void> {
    try {
      await this.request("/admin/auth/logout", {
        method: "POST",
      });
    } catch {
      // Silently handle
    } finally {
      localStorage.removeItem("admin");
      localStorage.removeItem("adminEmail");
    }
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem("user");
  }

  isAdminAuthenticated(): boolean {
    return !!localStorage.getItem("admin");
  }

  getUser(): User | null {
    const userStr = localStorage.getItem("user");
    if (userStr) {
      return JSON.parse(userStr) as User;
    }
    return null;
  }

  getAdmin(): Admin | null {
    const adminStr = localStorage.getItem("admin");
    if (adminStr) {
      return JSON.parse(adminStr) as Admin;
    }
    return null;
  }

  getUserEmail(): string | null {
    return localStorage.getItem("userEmail");
  }

  async getUserExchanges(): Promise<unknown> {
    return this.request("/exchanges");
  }

  async getUserExchangeConnections(): Promise<ExchangeConnectionsResponse> {
    return this.request<ExchangeConnectionsResponse>("/exchanges/connections");
  }

  async connectExchange(
    connectionData: Record<string, unknown>,
  ): Promise<unknown> {
    return this.request("/exchanges/connect", {
      method: "POST",
      body: JSON.stringify(connectionData),
    });
  }
}

export const authAPI = new AuthAPI();
