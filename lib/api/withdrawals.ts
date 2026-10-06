export type WithdrawalStatus = "QUEUED" | "SIGNED" | "CONFIRMED" | "FAILED" | "REVIEW" | "LEGACY_SUBMITTED";
export interface Withdrawal {
  _id: string;
  requestId?: string;
  amount: string;
  address: string;
  mode: "demo" | "live";
  status: WithdrawalStatus;
  transactionId: string | null;
  createdAt: string;
  completedAt?: string | null;
  lastError: string | null;
  fundsReserved: boolean;
}
