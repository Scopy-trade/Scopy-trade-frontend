// components/ConnectedExchange.tsx
"use client";

import {
  MdCheckCircle,
  MdWarning,
  MdRefresh,
  MdDelete,
  MdInfo,
} from "react-icons/md";

interface ConnectedExchangeProps {
  connection: {
    id: string;
    name: string;
    exchangeId: string;
    status: string;
    accountInfo?: Record<string, unknown>;
    connectedAt?: string;
  };
  onTest: () => void;
  onRemove: () => void;
  isTesting?: boolean;
  testResult?: {
    success: boolean;
    message: string;
  };
}

export function ConnectedExchange({
  connection,
  onTest,
  onRemove,
  isTesting = false,
  testResult,
}: ConnectedExchangeProps) {
  const isActive = connection.status === "Active & Synced";
  const setup = connection.accountInfo?.isolatedMarginSetup as {
    pairs?: Array<{ symbol: string; status: string; message?: string }>;
  } | undefined;
  const setupPairs = connection.exchangeId === "bitget" && Array.isArray(setup?.pairs) ? setup.pairs : [];
  const isReady = (status: string) => status === "ready" || status === "configured";
  const readyCount = setupPairs.filter(pair => isReady(pair.status)).length;
  const setupMessages = [...new Set(setupPairs.filter(pair => !isReady(pair.status)).map(pair => pair.message).filter(Boolean))];

  const getAccountInfoDisplay = () => {
    if (!connection.accountInfo) return null;

    const info = connection.accountInfo;
    if (info.accountType) return `Type: ${info.accountType}`;
    if (info.userId) return `User ID: ${info.userId}`;
    if (info.uid) return `UID: ${info.uid}`;
    if (info.canTrade !== undefined)
      return `Trading: ${info.canTrade ? "Enabled" : "Disabled"}`;
    return null;
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return null;
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  return (
    <div className="bg-surface-container-highest rounded-lg p-4 border border-outline-variant">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div
              className={`w-2 h-2 rounded-full absolute -top-1 -right-1 ${isActive ? "bg-emerald-400 animate-pulse" : "bg-red-400"}`}
            />
            <div className="w-10 h-10 bg-surface rounded-lg flex items-center justify-center">
              <span className="text-lg font-bold uppercase">
                {connection.exchangeId.charAt(0)}
              </span>
            </div>
          </div>
          <div>
            <h3 className="font-semibold text-on-surface">{connection.name}</h3>
            <div className="flex items-center gap-2 mt-1">
              <p
                className={`text-xs ${isActive ? "text-emerald-400" : "text-red-400"}`}
              >
                {connection.status}
              </p>
              {isActive && (
                <MdCheckCircle className="w-3 h-3 text-emerald-400" />
              )}
            </div>
            {getAccountInfoDisplay() && (
              <div className="flex items-center gap-1 mt-1 text-xs text-on-surface-variant">
                <MdInfo className="w-3 h-3" />
                <span>{getAccountInfoDisplay()}</span>
              </div>
            )}
            {connection.connectedAt && (
              <p className="text-xs text-on-surface-variant mt-1">
                Connected: {formatDate(connection.connectedAt)}
              </p>
            )}
          </div>
        </div>
        <div className="flex gap-2">
          <button
            onClick={onTest}
            disabled={isTesting}
            className="p-2 hover:bg-surface-container rounded-lg transition-colors disabled:opacity-50"
            title={connection.exchangeId === "bitget" ? "Test Connection and Prepare Trading Pairs" : "Test Connection"}
            aria-label={connection.exchangeId === "bitget" ? "Test Connection and Prepare Trading Pairs" : "Test Connection"}
          >
            {isTesting ? (
              <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
            ) : (
              <MdRefresh className="w-4 h-4 text-primary" />
            )}
          </button>
          <button
            onClick={onRemove}
            className="p-2 hover:bg-error-container rounded-lg transition-colors"
            title="Disconnect"
          >
            <MdDelete className="w-4 h-4 text-error" />
          </button>
        </div>
      </div>

      {setupPairs.length > 0 && (
        <div className="mt-4 rounded-lg bg-surface p-3">
          <p className="text-xs font-semibold text-on-surface">
            Isolated margin: {readyCount}/{setupPairs.length} pairs ready
          </p>
          <div className="mt-2 flex flex-wrap gap-2">
            {setupPairs.map(pair => (
              <span key={pair.symbol} title={pair.message || "Isolated margin is ready"}
                className={`rounded px-2 py-1 text-xs ${isReady(pair.status) ? "bg-emerald-500/10 text-emerald-400" : "bg-amber-500/10 text-amber-300"}`}>
                {pair.symbol}: {isReady(pair.status) ? "Ready" : pair.status === "blocked" ? "Blocked" : "Retry needed"}
              </span>
            ))}
          </div>
          {setupMessages.map(message => <p key={message} className="mt-2 text-xs text-amber-300">{message}</p>)}
          {readyCount < setupPairs.length && <p className="mt-2 text-xs text-on-surface-variant">After resolving the setup messages, use the refresh button to retry.</p>}
        </div>
      )}

      {testResult && (
        <div
          className={`mt-3 p-2 rounded-md text-sm flex items-center gap-2 ${
            testResult.success
              ? "bg-emerald-500/10 text-emerald-400"
              : "bg-red-500/10 text-red-400"
          }`}
        >
          {testResult.success ? (
            <MdCheckCircle className="w-4 h-4 shrink-0" />
          ) : (
            <MdWarning className="w-4 h-4 shrink-0" />
          )}
          <span className="text-xs">{testResult.message}</span>
        </div>
      )}
    </div>
  );
}
