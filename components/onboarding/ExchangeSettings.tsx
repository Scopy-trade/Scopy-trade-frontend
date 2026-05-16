// components/ExchangeSettings.tsx
"use client";

import { useState, useEffect } from "react";
import { MdCable, MdVerifiedUser, MdRefresh } from "react-icons/md";
import { userApi, authAPI } from "@/lib/api/client";
import { ConnectedExchange } from "./ConnectedExchange";
import { AvailableIntegration } from "./AvailableIntegration";
import { ConnectionSummary, ExchangeListItem } from "@/lib";

// Response types from your backend
interface GetSupportedExchangesResponse {
  success: boolean;
  exchanges: ExchangeListItem[];
  message?: string;
}

interface GetUserConnectionsResponse {
  success: boolean;
  connections: ConnectionSummary[];
  message?: string;
}

interface TestConnectionResponse {
  success: boolean;
  message: string;
  accountInfo?: Record<string, unknown>;
}

interface DeleteConnectionResponse {
  success: boolean;
  message: string;
}

interface ExchangeSettingsProps {
  onConnectionChange?: () => void;
  onConnectClick?: (exchange: ExchangeListItem) => void;
}

export function ExchangeSettings({
  onConnectionChange,
  onConnectClick,
}: ExchangeSettingsProps) {
  const [availableExchanges, setAvailableExchanges] = useState<
    ExchangeListItem[]
  >([]);
  const [connectedExchanges, setConnectedExchanges] = useState<
    ConnectionSummary[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [testingConnectionId, setTestingConnectionId] = useState<string | null>(
    null,
  );
  const [testResults, setTestResults] = useState<
    Record<string, { success: boolean; message: string }>
  >({});

  // Fetch both available and connected exchanges
  const fetchData = async () => {
    setLoading(true);
    setError(null);

    try {
      // Fetch supported exchanges with connection status
      const exchangesResponse =
        (await authAPI.getUserExchanges()) as GetSupportedExchangesResponse;
      if (exchangesResponse.success && exchangesResponse.exchanges) {
        setAvailableExchanges(exchangesResponse.exchanges);
      }

      // Fetch user's active connections
      const connectionsResponse =
        (await authAPI.getUserExchangeConnections()) as GetUserConnectionsResponse;
      if (connectionsResponse.success && connectionsResponse.connections) {
        setConnectedExchanges(connectionsResponse.connections);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load exchanges");
      console.error("[ExchangeSettings] Error fetching data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleConnect = (exchange: ExchangeListItem) => {
    // If onConnectClick prop is provided, use it
    if (onConnectClick) {
      onConnectClick(exchange);
    } else {
      // Otherwise dispatch an event that parent can listen to
      const event = new CustomEvent("connect-exchange", { detail: exchange });
      window.dispatchEvent(event);
    }
  };

  const handleTestConnection = async (connectionId: string) => {
    setTestingConnectionId(connectionId);

    try {
      const response = (await userApi.post(
        `/exchanges/connections/${connectionId}/test`,
      )) as TestConnectionResponse;

      setTestResults((prev) => ({
        ...prev,
        [connectionId]: {
          success: true,
          message: response.message || "Connection is active",
        },
      }));

      // Refresh the connections to update accountInfo if it changed
      await fetchData();

      // Clear success message after 3 seconds
      setTimeout(() => {
        setTestResults((prev) => {
          const newResults = { ...prev };
          delete newResults[connectionId];
          return newResults;
        });
      }, 3000);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Test failed";
      setTestResults((prev) => ({
        ...prev,
        [connectionId]: { success: false, message: errorMessage },
      }));

      setTimeout(() => {
        setTestResults((prev) => {
          const newResults = { ...prev };
          delete newResults[connectionId];
          return newResults;
        });
      }, 5000);
    } finally {
      setTestingConnectionId(null);
    }
  };

  const handleRemoveConnection = async (connectionId: string) => {
    if (
      !confirm(
        "Are you sure you want to disconnect this exchange? This action cannot be undone.",
      )
    ) {
      return;
    }

    try {
      const response = (await userApi.delete(
        `/exchanges/connections/${connectionId}`,
      )) as DeleteConnectionResponse;

      if (response.success) {
        await fetchData();
        onConnectionChange?.();
      }
    } catch (err) {
      console.error("[ExchangeSettings] Error removing connection:", err);
      alert(err instanceof Error ? err.message : "Failed to remove connection");
    }
  };

  if (loading) {
    return (
      <div className="w-full">
        <div className="bg-surface-container-low rounded-xl p-8 shadow-inner border-y-4 border-emerald-400">
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-2xl h-8 w-8 border-b-2 border-emerald-400"></div>
            <span className="ml-3 text-on-surface-variant">
              Loading exchanges...
            </span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Left Column: Connected & Available Exchanges */}
      <div className="bg-surface-container-low rounded-xl p-8 shadow-inner border-y-4 border-emerald-400">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold font-headline flex items-center gap-2">
            <MdCable className="w-6 h-6 text-secondary" />
            Active Connections
          </h2>
          <button
            onClick={fetchData}
            className="p-2 hover:bg-surface-container-highest rounded-lg transition-colors"
            title="Refresh"
          >
            <MdRefresh className="w-5 h-5 text-on-surface-variant" />
          </button>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-500/10 text-red-400 rounded-lg text-sm">
            {error}
          </div>
        )}

        <div className="space-y-4">
          {connectedExchanges.length === 0 ? (
            <div className="text-center py-8 text-on-surface-variant">
              <p>No exchanges connected yet.</p>
              <p className="text-sm mt-2">
                Connect your first exchange below to start trading.
              </p>
            </div>
          ) : (
            connectedExchanges.map((connection) => (
              <ConnectedExchange
                key={connection._id}
                connection={{
                  id: connection._id,
                  name: connection.label,
                  exchangeId: connection.exchange,
                  status:
                    connection.lastTestStatus === "failed"
                      ? "Connection Failed"
                      : "Active & Synced",
                  accountInfo: connection.accountInfo,
                  connectedAt: connection.connectedAt,
                }}
                onTest={() => handleTestConnection(connection._id)}
                onRemove={() => handleRemoveConnection(connection._id)}
                isTesting={testingConnectionId === connection._id}
                testResult={testResults[connection._id]}
              />
            ))
          )}

          <h4 className="text-xs font-bold uppercase tracking-widest text-on-surface-variant pt-4 pb-2">
            Available Integrations
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {availableExchanges
              .filter((exchange) => !exchange.connected)
              .map((exchange) => (
                <AvailableIntegration
                  key={exchange.id}
                  name={exchange.name}
                  id={exchange.id}
                  logo={exchange.id}
                  requiresPassphrase={exchange.requiresPassphrase}
                  fields={exchange.fields}
                  onConnect={() => handleConnect(exchange)}
                />
              ))}

            {availableExchanges.filter((e) => !e.connected).length === 0 && (
              <div className="col-span-2 text-center py-4 text-on-surface-variant text-sm">
                All available exchanges are connected
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Security Tips Banner */}
      <div className="bg-primary-container/40 mt-5 rounded-xl p-8 flex gap-6 items-start">
        <div className="bg-primary/20 p-3 rounded-lg text-primary">
          <MdVerifiedUser className="w-8 h-8" />
        </div>
        <div>
          <h4 className="font-bold text-primary mb-2">Security Standard</h4>
          <p className="text-sm text-on-primary-container leading-relaxed">
            Never share your API Secret. Always enable 2FA on your exchange
            account. Our system uses AES-256-GCM encryption to secure your
            credentials. Credentials are encrypted before storage and never
            exposed to clients.
          </p>
        </div>
      </div>
    </div>
  );
}
