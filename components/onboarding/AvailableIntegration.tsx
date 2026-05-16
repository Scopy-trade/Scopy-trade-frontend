// components/AvailableIntegration.tsx
"use client";

import { MdAddCircle, MdVpnKey } from "react-icons/md";

interface AvailableIntegrationProps {
  name: string;
  id: string;
  logo: string;
  requiresPassphrase: boolean;
  fields: string[];
  onConnect: () => void;
}

export function AvailableIntegration({
  name,
  id,
  logo,
  requiresPassphrase,
  fields,
  onConnect,
}: AvailableIntegrationProps) {
  const getLogoUrl = (exchangeId: string) => {
    // You can add actual logo URLs here
    const logos: Record<string, string> = {
      binance: "/logos/binance.svg",
      bybit: "/logos/bybit.svg",
      okx: "/logos/okx.svg",
      bitget: "/logos/bitget.svg",
    };
    return logos[exchangeId] || `/logos/${exchangeId}.svg`;
  };

  return (
    <div className="bg-surface-container-highest rounded-lg p-4 hover:bg-surface-container-highest/80 transition-colors">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-surface rounded-lg flex items-center justify-center">
            <span className="text-lg font-bold uppercase">{id.charAt(0)}</span>
          </div>
          <div>
            <h3 className="font-medium text-on-surface">{name}</h3>
            {requiresPassphrase && (
              <div className="flex items-center gap-1 mt-1">
                <MdVpnKey className="w-3 h-3 text-warning" />
                <p className="text-xs text-on-surface-variant">
                  Requires passphrase
                </p>
              </div>
            )}
            <p className="text-xs text-on-surface-variant mt-1">
              Required: {fields.join(", ")}
            </p>
          </div>
        </div>
        <button
          onClick={onConnect}
          className="flex items-center gap-2 px-3 py-1.5 bg-primary text-on-primary rounded-lg hover:bg-primary/90 transition-colors text-sm font-medium"
        >
          <MdAddCircle className="w-4 h-4" />
          Connect
        </button>
      </div>
    </div>
  );
}
