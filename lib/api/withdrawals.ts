export type WithdrawalStatus = "QUEUED" | "SIGNED" | "COMPLETED" | "FAILED" | "REVIEW" | "LEGACY_SUBMITTED";
export interface Withdrawal {
  _id: string;
  requestId?: string;
  amount: string;
  address: string;
  status: WithdrawalStatus;
  transactionId: string | null;
  createdAt: string;
  completedAt?: string | null;
  lastError: string | null;
  fundsReserved: boolean;
}
