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

  create(signalData: CreateSignalData) {
    return userApi.post<CreateSignalResponse>(
      "/pro-trader/dashboard/signals",
      signalData,
    );
  },

  update(signalId: string, signalData: UpdateSignalData) {
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
