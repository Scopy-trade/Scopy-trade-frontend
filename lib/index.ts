export interface SignalInterface {
  _id: string;
  pair: string;
  tradeType: "buy" | "sell";
  logo?: string;
  logoBg?: string;
  date?: string;
  time?: string;
  entry: number;
  tp: number;
  sl: number;
  result: "profit" | "loss" | "breakeven";
  status: "active" | "expired";
  trader?: string;
  followers?: number;
  volume?: string;
  leverage?: string;
  createdAt: string;
  direction: "buy" | "sell";
  notes?: string;
}

export interface Signal {
  _id: string;
  pair: string;
  tradeType: "BUY" | "SELL";
  entryPrice: number;
  tp: number;
  sl: number;
  status: "active" | "expired";
  leverage?: string;
  trader?: string;
  result?: "SUCCESS" | "BAD" | "EVEN";
  tier?: string;
  notes?: string;
  winRate?: number;
  roi30d?: number;
  pnlPercent?: string;
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

export interface UsersResponse {
  success: boolean;
  message?: string;
  users: UserManagementUser[];
  page: number;
  limit: number;
  pages: number;
}

export interface UserActionResponse {
  success: boolean;
  message: string;
  data?: {
    user?: UserManagementUser;
  };
}

export interface GetUserResponse {
  success: boolean;
  data: {
    user: UserManagementUser;
  };
}

export interface DashboardStatsResponse {
  success: boolean;
  data: {
    totalUsers: number;
    activeNow: number;
    pendingKYC: number;
    bannedAccounts: number;
  };
}

// Signal types based on backend

export interface GetAllSignalsResponse {
  success: boolean;
  message: string;
  signals: SignalInterface[];
  page: number;
  limit: number;
  pageSize: number;
  pages: number;
}

export interface DeleteSignalResponse {
  success: boolean;
  message: string;
}

export interface CreateSignalData {
  pair: string;
  tp: number;
  sl: number;
  entry: number;
  direction: "buy" | "sell";
  notes?: string;
}

export interface UpdateSignalData {
  pair?: string;
  tp?: number;
  sl?: number;
  entry?: number;
  direction?: "buy" | "sell";
  notes?: string;
}

export interface CreateSignalResponse {
  success: boolean;
  message: string;
  signal: SignalInterface;
}

export interface UpdateSignalResponse {
  success: boolean;
  message: string;
  signal: SignalInterface;
}
