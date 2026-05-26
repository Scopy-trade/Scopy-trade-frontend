import { ExchangeConnectionsResponse, SupportedExchangesResponse } from "..";
import { userApi } from "./client";

export const exchangeService = {
  getUserExchanges() {
    return userApi.get<SupportedExchangesResponse>("/exchanges");
  },

  getUserExchangeConnections() {
    return userApi.get<ExchangeConnectionsResponse>("/exchanges/connections");
  },

  connectExchange(
    payload: Record<string, unknown>,
  ): Promise<ExchangeConnectionsResponse> {
    return userApi.post<ExchangeConnectionsResponse>(
      "/exchanges/connect",
      payload,
    );
  },

  testConnection(connectionId: string) {
    return userApi.post(`/exchanges/connections/${connectionId}/test`);
  },

  removeConnection(connectionId: string) {
    return userApi.delete(`/exchanges/connections/${connectionId}`);
  },

  updateConnectionCredentials(
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
