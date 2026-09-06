// services/signals.ts

import { userApi } from "./client";
import {
  CreateSignalResponse,
  UpdateSignalData,
  CreateSignalData,
  DeleteSignalResponse,
  GetAllSignalsResponse,
  UpdateSignalResponse,
} from "..";

export const proTradersignalService = {
  getAllSignals(page: number = 1) {
    return userApi.get<GetAllSignalsResponse>("/pro-trader/dashboard/signals", {
      params: { page },
    });
  },

  createSignal(signalData: CreateSignalData) {
    return userApi.post<CreateSignalResponse>(
      "/pro-trader/dashboard/signals",
      signalData,
    );
  },

  updateSignal(signalId: string, signalData: UpdateSignalData) {
    return userApi.patch<UpdateSignalResponse>(
      `/pro-trader/dashboard/signals/${signalId}`,
      signalData,
    );
  },

  deleteSignal(signalId: string) {
    return userApi.delete<DeleteSignalResponse>(
      `/pro-trader/dashboard/signals/${signalId}`,
    );
  },
};

export const proTraderWithdrawalService = {
  getWallet() {
    return userApi.get<{ success: true; withdrawalAddress: string | null }>("/pro-trader/dashboard/wallet");
  },
  requestOtp(amount: number) {
    return userApi.post<{ success: true; message: string }>("/pro-trader/dashboard/withdraw/request-otp", { amount });
  },
  withdraw(amount: number, otp: string) {
    return userApi.post<{ success: true; message: string; transactionId: string }>("/pro-trader/dashboard/withdraw", { amount, otp });
  },
};
