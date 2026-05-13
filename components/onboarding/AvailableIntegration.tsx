// components/AvailableIntegration.tsx
interface AvailableIntegrationProps {
  name: string;
  logo: string;
}

export function AvailableIntegration({
  name,
  logo,
}: AvailableIntegrationProps) {
  const exchangeLogos: Record<string, string> = {
    okx: "🟢",
    coinbase: "🔵",
    bybit: "🟣",
    kraken: "🐙",
  };

  return (
    <div className="bg-surface-container-low border border-outline-variant/10 p-5 rounded-lg flex items-center justify-between hover:bg-surface-container transition-colors">
      <div className="flex items-center gap-3">
        <div className="w-6 h-6 flex items-center justify-center text-xl">
          {exchangeLogos[logo] || "📈"}
        </div>
        <span className="font-semibold text-sm">{name}</span>
      </div>
      <button className="text-xs font-bold px-3 py-1.5 rounded bg-surface-container-highest text-secondary hover:bg-secondary hover:text-on-secondary transition-all">
        CONNECT
      </button>
    </div>
  );
}
