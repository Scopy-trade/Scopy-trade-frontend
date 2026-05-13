// components/ExchangeSettings.tsx
"use client";

import { useState } from "react";
import { MdCable, MdVerifiedUser, MdKey } from "react-icons/md";
import { ConnectedExchange } from "./ConnectedExchange";
import { AvailableIntegration } from "./AvailableIntegration";

const availableExchanges = [
  { name: "OKX Terminal", logo: "okx" },
  { name: "Bitget", logo: "bitget" },
  { name: "Bybit Derivatives", logo: "bybit" },
  { name: "Binance", logo: "binance" },
];

export function ExchangeSettings() {
  const [connectedExchange, setConnectedExchange] = useState({
    name: "Binance Global",
    status: "Active & Synced",
  });

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      {/* Left Column: Supported & Connected Exchanges */}
      <section className="lg:col-span-7 space-y-6">
        <div className="bg-surface-container-low rounded-xl p-8 shadow-inner border-l-4 border-emerald-400">
          <h2 className="text-xl font-bold font-headline mb-6 flex items-center gap-2">
            <MdCable className="w-6 h-6 text-secondary" />
            Active Connections
          </h2>
          <div className="space-y-4">
            <ConnectedExchange exchange={connectedExchange} />

            <h4 className="text-xs font-bold uppercase tracking-widest text-on-surface-variant pt-4 pb-2">
              Available Integrations
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {availableExchanges.map((exchange) => (
                <AvailableIntegration
                  key={exchange.name}
                  name={exchange.name}
                  logo={exchange.logo}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Security Tips Banner */}
        <div className="bg-primary-container/40 rounded-xl p-8 flex gap-6 items-start">
          <div className="bg-primary/20 p-3 rounded-lg text-primary">
            <MdVerifiedUser className="w-8 h-8" />
          </div>
          <div>
            <h4 className="font-bold text-primary mb-2">Security Standard</h4>
            <p className="text-sm text-on-primary-container leading-relaxed">
              Never share your API Secret. Always enable 2FA on your exchange
              account. Our system uses end-to-end hardware-level encryption
              (HSM) to secure your credentials.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
