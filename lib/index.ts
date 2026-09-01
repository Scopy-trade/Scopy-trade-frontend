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

export interface TradeOwner {
  _id: string;
  firstName?: string;
  lastName?: string;
  traderID?: string;
  profilePhoto?: string;
}

export interface ActiveProTrade {
  _id: string;
  userId: TradeOwner | string;
  pair: string;
  direction: "buy" | "sell";
  entryPrice: string;
  entryFillPrice?: string | null;
  currentMarketPrice?: string | null;
  currentMarketPriceUpdatedAt?: string | null;
  tp: string;
  sl: string;
  quantity: string;
  status: "pending" | "filled" | "closed" | "cancelled" | "failed";
  tradeOrigin: "pro" | "copy";
  sourceTradeId?:
    | string
    | null
    | {
        _id: string;
        pair?: string;
        userId?: TradeOwner | string;
      };
  exchangeOrderId?: string | null;
  wsMonitoringActive?: boolean;
  monitoringStatus?:
    | "connecting"
    | "connected"
    | "reconnecting"
    | "disconnected"
    | "unsupported";
  monitoringError?: string | null;
  monitoringConnectedAt?: string | null;
  lastCheckedAt?: string | null;
  exchangeConnectionId:
    | string
    | {
        _id: string;
        exchange: string;
        label?: string;
      };
  signalId?: { _id: string; notes?: string } | string;
  copiers?: number;
  copyStats?: {
    total: number;
    active: number;
    profitable: number;
    copiedVolume?: number;
  } | null;
  myTrade?: {
    _id: string;
    status: string;
    tradeResult?: string | null;
  } | null;
  createdAt: string;
  closedAt?: string | null;
  exitPrice?: string | null;
  realizedPnl?: string | null;
  platformFee?: string | null;
  platformShare?: string | null;
  proTraderShare?: string | null;
  feeStatus?:
    | "pending"
    | "processing"
    | "collected"
    | "failed"
    | "waived"
    | null;
  tradeResult?: "profit" | "loss" | "breakeven" | null;
  closedVia?: "tp" | "sl" | "manual" | null;
  settlementNetwork?: string | null;
  settlementTransactionId?: string | null;
  parameterSyncStatus?: "pending" | "synced" | "failed" | null;
  parameterSyncError?: string | null;
  sourceTradeClosedAt?: string | null;
  sourceTradeCloseMessage?: string | null;
}

export interface ExchangeBalance {
  connectionId: string;
  exchange: string;
  label: string;
  status: "ok" | "error";
  totalUsdtEquivalent: string | number | null;
  error?: string;
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
  sponsored?: boolean;
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
  status?: "active" | "suspended" | "waitlist";
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

export interface ConnectExchangeResponse {
  success: boolean;
  connection: Omit<ConnectionSummary, "_id"> & {
    _id?: string;
    id: string;
  };
  message?: string;
}

// User management types
export interface UserManagementUser extends User {
  id: string;
  _id: string;
  uid?: string;
  name?: string;
  initials?: string;
  status?: "active" | "suspended" | "waitlist";
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
