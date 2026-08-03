"use client";

import { useEffect, useRef } from "react";
import { ActiveProTrade } from "@/lib";

type TradePatch = Partial<ActiveProTrade> & { _id: string };

interface UseTradeUpdatesOptions {
  tradeIds: string[];
  onUpdate: (update: TradePatch) => void;
  onReconnect?: () => void;
  enabled?: boolean;
}

interface ServerMessage {
  type?: string;
  data?: Record<string, unknown> | Array<Record<string, unknown>>;
}

function tradeSocketUrl(): string {
  const protocol = window.location.protocol === "https:" ? "wss:" : "ws:";
  return `${protocol}//${window.location.host}/ws/trades`;
}

function toTradePatch(data: Record<string, unknown>): TradePatch | null {
  const tradeId = String(data.tradeId ?? data._id ?? "");
  if (!tradeId) return null;

  const patch: TradePatch = { _id: tradeId };
  const fields: Array<keyof ActiveProTrade> = [
    "pair",
    "direction",
    "entryPrice",
    "entryFillPrice",
    "tp",
    "sl",
    "quantity",
    "status",
    "exchangeOrderId",
    "wsMonitoringActive",
    "monitoringStatus",
    "monitoringError",
    "monitoringConnectedAt",
    "lastCheckedAt",
    "createdAt",
  ];
  for (const field of fields) {
    if (data[field] !== undefined) {
      (patch as Record<string, unknown>)[field] = data[field];
    }
  }
  if (data.filledPrice !== undefined && data.filledPrice !== null) {
    patch.entryFillPrice = String(data.filledPrice);
  }
  return patch;
}

export function useTradeUpdates({
  tradeIds,
  onUpdate,
  onReconnect,
  enabled = true,
}: UseTradeUpdatesOptions): void {
  const socketRef = useRef<WebSocket | null>(null);
  const tradeIdsRef = useRef(new Set(tradeIds));
  const onUpdateRef = useRef(onUpdate);
  const onReconnectRef = useRef(onReconnect);

  useEffect(() => {
    onUpdateRef.current = onUpdate;
  }, [onUpdate]);

  useEffect(() => {
    onReconnectRef.current = onReconnect;
  }, [onReconnect]);

  useEffect(() => {
    const previous = tradeIdsRef.current;
    const next = new Set(tradeIds);
    tradeIdsRef.current = next;
    const socket = socketRef.current;
    if (socket?.readyState !== WebSocket.OPEN) return;

    for (const tradeId of next) {
      if (!previous.has(tradeId)) {
        socket.send(JSON.stringify({ type: "subscribe_trade", tradeId }));
      }
    }
    for (const tradeId of previous) {
      if (!next.has(tradeId)) {
        socket.send(JSON.stringify({ type: "unsubscribe_trade", tradeId }));
      }
    }
  }, [tradeIds]);

  useEffect(() => {
    if (!enabled) return;

    let disposed = false;
    let reconnectTimer: ReturnType<typeof setTimeout> | null = null;
    let reconnectAttempts = 0;
    let connectedOnce = false;

    const connect = () => {
      if (disposed) return;
      const socket = new WebSocket(tradeSocketUrl());
      socketRef.current = socket;

      socket.addEventListener("open", () => {
        reconnectAttempts = 0;
        socket.send(JSON.stringify({ type: "get_active_trades" }));
        for (const tradeId of tradeIdsRef.current) {
          socket.send(JSON.stringify({ type: "subscribe_trade", tradeId }));
        }
        if (connectedOnce) onReconnectRef.current?.();
        connectedOnce = true;
      });

      socket.addEventListener("message", (event) => {
        let message: ServerMessage;
        try {
          message = JSON.parse(String(event.data)) as ServerMessage;
        } catch {
          return;
        }

        if (message.type === "active_trades" && Array.isArray(message.data)) {
          for (const item of message.data) {
            const patch = toTradePatch(item);
            if (patch) onUpdateRef.current(patch);
          }
          return;
        }
        if (!message.data || Array.isArray(message.data)) return;
        const patch = toTradePatch(message.data);
        if (!patch) return;
        if (message.type === "trade_closed") patch.status = "closed";
        if (
          message.type === "trade_update" ||
          message.type === "trade_state" ||
          message.type === "trade_closed" ||
          message.type === "monitoring_update"
        ) {
          onUpdateRef.current(patch);
        }
      });

      socket.addEventListener("close", () => {
        if (socketRef.current === socket) socketRef.current = null;
        if (disposed) return;
        const delay = Math.min(1000 * 2 ** reconnectAttempts, 30000);
        reconnectAttempts += 1;
        reconnectTimer = setTimeout(connect, delay);
      });
    };

    connect();
    return () => {
      disposed = true;
      if (reconnectTimer) clearTimeout(reconnectTimer);
      socketRef.current?.close(1000, "Page closed");
      socketRef.current = null;
    };
  }, [enabled]);
}
