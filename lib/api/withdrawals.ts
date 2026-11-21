export type WithdrawalStatus = "QUOTED" | "QUEUED" | "SIGNED" | "COMPLETED" | "FAILED" | "REVIEW";
export interface Withdrawal {
  _id: string;
  requestId?: string;
  amount: string;
  payoutAmount?: string;
  networkFeeReserve?: string;
  networkFee?: string | null;
  refundedAmount?: string | null;
  additionalNetworkFee?: string;
  quoteExpiresAt?: string | null;
  address: string;
  status: WithdrawalStatus;
  transactionId: string | null;
  createdAt: string;
  completedAt?: string | null;
  lastError: string | null;
  fundsReserved: boolean;
}
