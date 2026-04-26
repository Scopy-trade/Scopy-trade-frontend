const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "https://scopy-trade-backend.onrender.com/api";

interface ApiRequest {
  email: string;
  password: string;
}

interface ExchangeConnection {
  exchange: string;
  apiKey: string;
  apiSecret: string;
  passphrase?: string;
  label: string;
}

export const apiClient = {
  // User authentication endpoints
  async login(credentials: ApiRequest) {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Login failed");
    }

    return response.json();
  },

  async register(userData: any) {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Registration failed");
    }

    return response.json();
  },

  async logout() {
    const response = await fetch(`${API_BASE_URL}/auth/logout`, {
      method: "POST",
    });

    if (!response.ok) {
      throw new Error("Logout failed");
    }

    return response.json();
  },

  // Exchange endpoints (protected)
  async getUserExchanges(email: string, password: string) {
    const response = await fetch(`${API_BASE_URL}/exchanges`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Failed to fetch exchanges");
    }

    return response.json();
  },

  async getUserExchangeConnections(email: string, password: string) {
    const response = await fetch(`${API_BASE_URL}/exchanges/connections`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Failed to fetch connections");
    }

    return response.json();
  },

  async connectExchange(
    connectionData: ExchangeConnection,
    email: string,
    password: string,
  ) {
    const response = await fetch(`${API_BASE_URL}/exchanges/connect`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(connectionData),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Failed to connect exchange");
    }

    return response.json();
  },
};
