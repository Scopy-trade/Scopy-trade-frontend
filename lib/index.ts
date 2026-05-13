export interface SignalInterface {
  id: number;
  pair: string;
  tradeType: "BUY" | "SELL";
  logo: string;
  logoBg: string;
  date: string;
  time: string;
  entryPrice: number;
  tp: number;
  sl: number;
  result: "SUCCESS" | "BAD" | "EVEN";
  status: "ACTIVE" | "EXPIRED";
  followers: number;
  volume: string;
  leverage?: string;
}

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

export interface AuthResponse {
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
