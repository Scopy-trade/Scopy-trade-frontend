// services/withdrawal.ts

import { userApi } from "./client";
import {
  GetWalletAddressResponse,
  SaveWalletAddressResponse,
  WithdrawFundsResponse,
  WithdrawalHistoryResponse,
} from "..";

export const withdrawalService = {
  /** Fetch the saved TRC-20 wallet address (if any) and current available balance. */
  getWalletAddress() {
    return userApi.get<GetWalletAddressResponse>("/pro-trader/dashboard/wallet");
  },

  /** Save (or replace) the TRC-20 wallet address withdrawals are sent to. */
  saveWalletAddress(address: string) {
    return userApi.post<SaveWalletAddressResponse>("/pro-trader/dashboard/wallet", {
      address,
    });
  },

  /** Withdraw `amount` USDT to the saved wallet address. */
  withdrawFunds(amount: number) {
    return userApi.post<WithdrawFundsResponse>("/pro-trader/dashboard/withdraw", {
      amount,
    });
  },

  /** Fetch a page of the current user's completed withdrawal history. */
  getWithdrawalHistory(page = 1) {
    return userApi.get<WithdrawalHistoryResponse>(
      "/pro-trader/dashboard/withdraw/history",
      { params: { page } },
    );
  },
};
