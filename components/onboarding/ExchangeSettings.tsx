// components/onboarding/ExchangeSettings.tsx (enhanced)
"use client";

import { useState, useEffect } from "react";
import {
  MdCable,
  MdVerifiedUser,
  MdRefresh,
  MdCheckCircle,
  MdError,
} from "react-icons/md";
import { userApi, authAPI } from "@/lib/api/client";
import { ConnectedExchange } from "./ConnectedExchange";
import { AvailableIntegration } from "./AvailableIntegration";
import { ConnectionSummary, ExchangeListItem } from "@/lib";
import { ExchangeConnectionModal } from "./ExchangeConnectionModal";

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

interface ExchangeSettingsProps {
  onConnectionChange?: () => void;
}

export function ExchangeSettings({
  onConnectionChange,
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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedExchange, setSelectedExchange] =
    useState<ExchangeListItem | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);

    try {
      const exchangesResponse =
        (await authAPI.getUserExchanges()) as GetSupportedExchangesResponse;
      if (exchangesResponse.success && exchangesResponse.exchanges) {
        setAvailableExchanges(exchangesResponse.exchanges);
      }

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
    setSelectedExchange(exchange);
    setIsModalOpen(true);
  };

  const handleConnectSuccess = (connection: ConnectionSummary) => {
    fetchData();
    onConnectionChange?.();

    // Show success message
    setSuccessMessage(`Successfully connected ${connection.label}`);
    setTimeout(() => setSuccessMessage(null), 3000);

    // Trigger a custom event for toast notification
    const event = new CustomEvent("show-toast", {
      detail: {
        message: `Successfully connected ${connection.label}`,
        type: "success",
      },
    });
    window.dispatchEvent(event);
  };

  const handleTestConnection = async (connectionId: string) => {
    setTestingConnectionId(connectionId);

    try {
      const response = (await userApi.post(
        `/exchanges/connections/${connectionId}/test`,
      )) as {
        success: boolean;
        message: string;
        accountInfo?: Record<string, unknown>;
      };

      setTestResults((prev) => ({
        ...prev,
        [connectionId]: {
          success: true,
          message: response.message || "Connection is active",
        },
      }));

      await fetchData();

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
      const connection = connectedExchanges.find((c) => c._id === connectionId);
      const response = (await userApi.delete(
        `/exchanges/connections/${connectionId}`,
      )) as {
        success: boolean;
        message: string;
      };

      if (response.success) {
        await fetchData();
        onConnectionChange?.();

        // Show success message
        const event = new CustomEvent("show-toast", {
          detail: {
            message: connection
              ? `${connection.label} disconnected successfully`
              : "Exchange disconnected",
            type: "success",
          },
        });
        window.dispatchEvent(event);
      }
    } catch (err) {
      console.error("[ExchangeSettings] Error removing connection:", err);
      const event = new CustomEvent("show-toast", {
        detail: {
          message:
            err instanceof Error ? err.message : "Failed to remove connection",
          type: "error",
        },
      });
      window.dispatchEvent(event);
    }
  };

  if (loading) {
    return (
      <div className="w-full">
        <div className="bg-surface-container-low rounded-xl p-8 shadow-inner">
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-2xl h-8 w-8 border-b-2 border-secondary"></div>
            <span className="ml-3 text-on-surface-variant">
              Loading exchanges...
            </span>
          </div>
        </div>
      </div>
    );
  }

  const hasConnections = connectedExchanges.length > 0;

  return (
    <div className="w-full">
      {/* Success Message Banner */}
      {successMessage && (
        <div className="mb-4 p-3 bg-success/10 border border-success/20 rounded-lg animate-in slide-in-from-top-2 fade-in duration-200">
          <div className="flex items-center gap-2 text-success">
            <MdCheckCircle className="w-5 h-5" />
            <p className="text-sm font-medium">{successMessage}</p>
          </div>
        </div>
      )}

      {/* Error Banner */}
      {error && (
        <div className="mb-4 p-3 bg-error/10 border border-error/20 rounded-lg">
          <div className="flex items-center gap-2 text-error">
            <MdError className="w-5 h-5" />
            <p className="text-sm font-medium">{error}</p>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="bg-surface-container-low rounded-xl p-8 shadow-inner">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold font-headline flex items-center gap-2">
            <MdCable className="w-6 h-6 text-secondary" />
            Active Connections
            {hasConnections && (
              <span className="ml-2 text-sm font-normal text-on-surface-variant">
                ({connectedExchanges.length})
              </span>
            )}
          </h2>
          <button
            onClick={fetchData}
            className="p-2 hover:bg-surface-container-highest rounded-lg transition-colors"
            title="Refresh"
          >
            <MdRefresh className="w-5 h-5 text-on-surface-variant" />
          </button>
        </div>

        <div className="space-y-4">
          {!hasConnections ? (
            <div className="text-center py-12 bg-surface-container-highest/30 rounded-lg">
              <div className="w-16 h-16 mx-auto mb-4 bg-surface-container-highest rounded-full flex items-center justify-center">
                <MdCable className="w-8 h-8 text-on-surface-variant" />
              </div>
              <p className="text-on-surface-variant mb-2">
                No exchanges connected yet
              </p>
              <p className="text-sm text-on-surface-variant/70">
                Connect your first exchange below to start trading
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

          {/* Available Integrations Section */}
          <div className="pt-6">
            <h4 className="text-xs font-bold uppercase tracking-widest text-on-surface-variant pb-4">
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
                <div className="col-span-2 text-center py-8 bg-surface-container-highest/30 rounded-lg">
                  <p className="text-on-surface-variant text-sm">
                    All available exchanges are connected
                  </p>
                  <p className="text-xs text-on-surface-variant/70 mt-1">
                    You can connect multiple accounts of the same exchange using
                    different API keys
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Security Tips Banner */}
      <div className="bg-primary-container/40 mt-6 rounded-xl p-6 flex gap-4 items-start">
        <div className="bg-primary/20 p-2 rounded-lg text-primary shrink-0">
          <MdVerifiedUser className="w-6 h-6" />
        </div>
        <div>
          <h4 className="font-bold text-primary mb-1">Security Standard</h4>
          <p className="text-sm text-on-primary-container leading-relaxed">
            Never share your API Secret. Always enable 2FA on your exchange
            account. Our system uses AES-256-GCM encryption to secure your
            credentials. Credentials are encrypted before storage and never
            exposed to clients.
          </p>
        </div>
      </div>

      {/* Connection Modal */}
      <ExchangeConnectionModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedExchange(null);
        }}
        exchange={selectedExchange}
        onSuccess={handleConnectSuccess}
      />
    </div>
  );
}
