import {
  ConnectExchangeResponse,
  ExchangeConnectionsResponse,
  SupportedExchangesResponse,
} from "..";
import { api, userApi } from "./client";

export const exchangeService = {
  async getServerIps(signal?: AbortSignal): Promise<string[]> {
    const { data } = await api.get<{ success: boolean; ips: string[] }>(
      "/exchanges/server-ip",
      { signal, timeout: 10000 },
    );
    if (!data.success || !Array.isArray(data.ips) || !data.ips.length ||
      data.ips.some((ip) => typeof ip !== "string" || !ip.trim())) {
      throw new Error("Server IP addresses are unavailable");
    }
    return data.ips;
  },

  getUserExchanges() {
    return userApi.get<SupportedExchangesResponse>("/exchanges");
  },

  getUserExchangeConnections() {
    return userApi.get<ExchangeConnectionsResponse>("/exchanges/connections");
  },

  connectExchange(
    payload: Record<string, unknown>,
  ): Promise<ConnectExchangeResponse> {
    return userApi.post<ConnectExchangeResponse>(
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
