"use client";

import { useState, useEffect } from "react";
import SignalFilters from "@/components/copy-trader/SignalFilters";
import SignalGrid from "@/components/copy-trader/SignalGrid";
import ExecuteTradeModal from "@/components/copy-trader/ExecuteTradeModal";
import { ActiveProTrade } from "@/lib";
import { tradeService } from "@/lib/api/trades";

export default function CopyTraderPage() {
  const [selectedTrade, setSelectedTrade] = useState<ActiveProTrade | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [trades, setTrades] = useState<ActiveProTrade[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    async function fetchTrades() {
      try {
        setLoading(true);
        setError(null);
        const response = await tradeService.getActiveProTrades();
        setTrades(response.trades || []);
      } catch (err) {
        console.error("Failed to fetch pro trades:", err);
        setError(err instanceof Error ? err.message : "Failed to load active pro trades.");
        setTrades([]);
      } finally {
        setLoading(false);
      }
    }

    void fetchTrades();
  }, [refreshKey]);

  function handleExecute(trade: ActiveProTrade) {
    setSelectedTrade(trade);
    setIsModalOpen(true);
  }

  function handleCloseModal() {
    setIsModalOpen(false);
    setSelectedTrade(null);
  }

  return (
    <div className="flex-1 flex flex-col h-full bg-surface-container-lowest text-slate-300">
      <main className="flex-1 px-2 md:px-6 py-4 mx-auto w-full max-w-[1800px] space-y-4">
        {/* Terminal Header */}
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-2 border-b border-white/5">
          <div>
            <h1 className="text-2xl font-bold tracking-tight mb-1 font-headline text-slate-100 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-secondary animate-pulse"></span>
              Active Pro Trades
            </h1>
            <p className="text-xs text-slate-400 max-w-[600px] uppercase tracking-wider">
              Live positions opened by verified pro traders
            </p>
          </div>
        </header>

        {/* Filters */}
        <div className="bg-surface-container-low rounded-lg border border-white/5 p-3">
          <SignalFilters />
        </div>

        {/* Signal Grid / Terminal Data */}
        <div className="bg-surface-container-low rounded-lg border border-white/5 overflow-hidden flex-1">
          <SignalGrid
            trades={trades}
            loading={loading}
            error={error}
            onExecute={handleExecute} 
          />
        </div>
      </main>

      {/* Execute Trade Modal */}
      {isModalOpen && selectedTrade && (
        <ExecuteTradeModal
          trade={selectedTrade}
          onClose={handleCloseModal}
          onExecuted={() => setRefreshKey((value) => value + 1)}
        />
      )}
    </div>
  );
}
