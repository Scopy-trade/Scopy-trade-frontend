// components/ConnectedExchange.tsx
import { MdEdit, MdLinkOff } from "react-icons/md";

interface ConnectedExchangeProps {
  exchange: {
    name: string;
    status: string;
  };
}

export function ConnectedExchange({ exchange }: ConnectedExchangeProps) {
  return (
    <div className="bg-surface-container rounded-lg p-6 flex justify-between items-center group hover:bg-surface-container-high transition-colors">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 bg-surface-container-highest rounded-md flex items-center justify-center">
          <ExchangeLogo exchange={exchange.name} />
        </div>
        <div>
          <h3 className="font-bold text-lg leading-tight">{exchange.name}</h3>
          <div className="flex items-center gap-2 mt-1">
            <span className="w-2 h-2 bg-secondary rounded-full"></span>
            <span className="text-xs text-on-surface-variant uppercase tracking-widest font-semibold">
              {exchange.status}
            </span>
          </div>
        </div>
      </div>
      <div className="flex gap-3">
        <button className="p-2 text-on-surface-variant hover:text-on-surface hover:bg-surface-container-highest rounded-lg transition-all">
          <MdEdit className="w-5 h-5" />
        </button>
        <button className="p-2 text-tertiary-fixed-dim hover:bg-tertiary-container/30 rounded-lg transition-all">
          <MdLinkOff className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}

function ExchangeLogo({ exchange }: { exchange: string }) {
  const logos: Record<string, string> = {
    "Binance Global": "🟡",
    "OKX Terminal": "🟢",
    "Coinbase Pro": "🔵",
    "Bybit Derivatives": "🟣",
    Kraken: "🐙",
  };

  return (
    <div className="w-8 h-8 flex items-center justify-center text-2xl">
      {logos[exchange] || "📈"}
    </div>
  );
}
