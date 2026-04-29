const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "https://scopy-trade-backend.onrender.com/api";

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  accessCode?: string;
}

export interface User {
  email: string;
  firstName?: string;
  lastName?: string;
}

export interface Admin {
  email: string;
  firstName?: string;
  lastName?: string;
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
        const error = await response.json();
        errorMessage = error.message || errorMessage;
      } catch (e) {
        errorMessage = response.statusText || errorMessage;
      }
      throw new Error(errorMessage);
    }

    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      return response.json();
    }

    return {} as T;
  }

  async register(data: RegisterData): Promise<User> {
    const response = await this.request<any>("/auth/register", {
      method: "POST",
      body: JSON.stringify(data),
    });

    const user: User = {
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
    };

    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("userEmail", data.email);

    return response.user || user;
  }

  async login(credentials: LoginCredentials): Promise<User> {
    const response = await this.request<any>("/auth/login", {
      method: "POST",
      body: JSON.stringify(credentials),
    });

    const user: User = { email: credentials.email };
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("userEmail", credentials.email);

    return response.user || user;
  }

  async logout(): Promise<void> {
    try {
      await this.request("/auth/logout", {
        method: "POST",
      });
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      localStorage.removeItem("user");
      localStorage.removeItem("userEmail");
    }
  }

  async adminLogin(credentials: LoginCredentials): Promise<Admin> {
    const response = await this.request<any>("/admin/auth/login", {
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
    } catch (error) {
      console.error("Admin logout error:", error);
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
      return JSON.parse(userStr);
    }
    return null;
  }

  getAdmin(): Admin | null {
    const adminStr = localStorage.getItem("admin");
    if (adminStr) {
      return JSON.parse(adminStr);
    }
    return null;
  }

  getUserEmail(): string | null {
    return localStorage.getItem("userEmail");
  }

  async getUserExchanges(): Promise<any> {
    return this.request("/exchanges", {
      method: "GET",
    });
  }

  async getUserExchangeConnections(): Promise<any> {
    return this.request("/exchanges/connections", {
      method: "GET",
    });
  }

  async connectExchange(connectionData: any): Promise<any> {
    return this.request("/exchanges/connect", {
      method: "POST",
      body: JSON.stringify(connectionData),
    });
  }
}

export const authAPI = new AuthAPI();
