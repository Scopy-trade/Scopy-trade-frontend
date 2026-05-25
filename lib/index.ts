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

export interface Signal {
  _id: string;
  pair: string;
  tradeType: "BUY" | "SELL";
  entryPrice: number;
  tp: number;
  sl: number;
  status: "ACTIVE" | "EXPIRED";
  leverage?: string;
  trader?: string;
  tier?: string;
  winRate?: number;
  roi30d?: number;
  maxDrawdown?: number;
  copiers?: number;
  pnl7d?: number;
  aum?: number;
  sharpeRatio?: number;
  createdAt?: string;
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

export interface ExchangeListItem {
  id: string;
  name: string;
  requiresPassphrase: boolean;
  fields: string[];
  connected: boolean;
}

export interface ConnectionSummary {
  _id: string;
  id?: string; // Some responses might use _id
  exchange: string;
  label: string;
  accountInfo: Record<string, unknown>;
  connectedAt: string;
  lastTestStatus?: string;
  lastTestedAt?: string;
  isActive: boolean;
}

export interface SupportedExchangesResponse {
  success: boolean;
  exchanges: ExchangeListItem[];
  message?: string;
}

export interface ExchangeConnectionsResponse {
  success: boolean;
  connections: ConnectionSummary[];
  message?: string;
}
