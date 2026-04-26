"use client";

import { RiExchangeLine } from "react-icons/ri";

interface Exchange {
  name: string;
  accentColor: string;
  apiKey?: string;
  connected: boolean;
}

const exchanges: Exchange[] = [
  {
    name: "Binance",
    accentColor: "#f3ba2f",
    apiKey: "****2b41",
    connected: true,
  },
  {
    name: "Bybit",
    accentColor: "#00a1e4",
    connected: false,
  },
  {
    name: "Kraken",
    accentColor: "#5d41ff",
    apiKey: "****88f2",
    connected: true,
  },
];

export default function LinkedExchanges() {
  return (
    <div className="rounded-xl p-6" style={{ backgroundColor: "#171f33" }}>
      <h3
        className="font-bold text-lg mb-6"
        style={{ fontFamily: "var(--font-headline)", color: "#dae2fd" }}
      >
        Linked Exchanges
      </h3>

      <div className="space-y-4">
        {exchanges.map((ex) => (
          <div
            key={ex.name}
            className="p-4 flex items-center justify-between transition-all"
            style={{
              borderRadius: "0.75rem",
              backgroundColor: "#131b2e",
              border: "2px solid transparent",
            }}
            onMouseEnter={(e) => {
              if (!ex.connected)
                (e.currentTarget as HTMLDivElement).style.borderColor =
                  "rgba(182,196,255,0.15)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLDivElement).style.borderColor =
                "transparent";
            }}
          >
            <div className="flex items-center gap-4">
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center"
                style={{
                  backgroundColor: `${ex.accentColor}18`,
                }}
              >
                <RiExchangeLine
                  style={{ color: ex.accentColor, fontSize: "1.25rem" }}
                />
              </div>
              <div>
                <p className="font-bold text-sm" style={{ color: "#dae2fd" }}>
                  {ex.name}
                </p>
                <span className="text-[10px]" style={{ color: "#c5c6ce" }}>
                  {ex.connected ? `API Key: ${ex.apiKey}` : "Not configured"}
                </span>
              </div>
            </div>

            {ex.connected ? (
              <div className="flex items-center gap-2">
                <span
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ backgroundColor: "#4edea3" }}
                />
                <span
                  className="text-[11px] font-bold uppercase tracking-tighter"
                  style={{ color: "#4edea3" }}
                >
                  Connected
                </span>
              </div>
            ) : (
              <button
                className="px-3 py-1 text-[11px] font-bold uppercase tracking-tighter transition-all"
                style={{
                  borderRadius: "0.5rem",
                  backgroundColor: "#2d3449",
                  color: "#dae2fd",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.backgroundColor =
                    "#b6c4ff";
                  (e.currentTarget as HTMLButtonElement).style.color =
                    "#05297a";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.backgroundColor =
                    "#2d3449";
                  (e.currentTarget as HTMLButtonElement).style.color =
                    "#dae2fd";
                }}
              >
                Link
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
