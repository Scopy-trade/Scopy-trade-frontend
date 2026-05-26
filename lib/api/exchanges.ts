import { ExchangeConnectionsResponse, SupportedExchangesResponse } from "..";
import { userApi } from "./client";

export const exchangeService = {
  getSupported() {
    return userApi.get<SupportedExchangesResponse>("/exchanges");
  },

  getConnections() {
    return userApi.get<ExchangeConnectionsResponse>("/exchanges/connections");
  },

  connect(payload: Record<string, unknown>) {
    return userApi.post("/exchanges/connect", payload);
  },

  testConnection(connectionId: string) {
    return userApi.post(`/exchanges/connections/${connectionId}/test`);
  },

  removeConnection(connectionId: string) {
    return userApi.delete(`/exchanges/connections/${connectionId}`);
  },

  updateCredentials(
    connectionId: string,
    payload: {
      apiKey: string;
      apiSecret: string;
      passphrase?: string;
    },
  ) {
    return userApi.patch(`/exchanges/connections/${connectionId}`, payload);
  },
};
