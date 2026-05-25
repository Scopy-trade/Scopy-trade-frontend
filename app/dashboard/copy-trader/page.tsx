"use client";

import { useState } from "react";
import SignalFilters from "@/components/copy-trader/SignalFilters";
import SignalGrid from "@/components/copy-trader/SignalGrid";
import ExecuteTradeModal from "@/components/copy-trader/ExecuteTradeModal";

export default function CopyTraderPage() {
  const [selectedSignal, setSelectedSignal] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  function handleExecute(signal: any) {
    setSelectedSignal(signal);
    setIsModalOpen(true);
  }

  function handleCloseModal() {
    setIsModalOpen(false);
    setSelectedSignal(null);
  }

  return (
    <div className="flex-1 flex flex-col h-full bg-surface-container-lowest text-slate-300">
      <main className="flex-1 px-2 md:px-6 py-4 mx-auto w-full max-w-[1800px] space-y-4">
        {/* Terminal Header */}
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-2 border-b border-white/5">
          <div>
            <h1 className="text-2xl font-bold tracking-tight mb-1 font-headline text-slate-100 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-secondary animate-pulse"></span>
              Signal Factory
            </h1>
            <p className="text-xs text-slate-400 max-w-[600px] uppercase tracking-wider">
              Live algorithmic execution feed &bull; Elite trader syndicates
            </p>
          </div>
        </header>

        {/* Filters */}
        <div className="bg-surface-container-low rounded-lg border border-white/5 p-3">
          <SignalFilters />
        </div>

        {/* Signal Grid / Terminal Data */}
        <div className="bg-surface-container-low rounded-lg border border-white/5 overflow-hidden flex-1">
          <SignalGrid onExecute={handleExecute} />
        </div>
      </main>

      {/* Execute Trade Modal */}
      {isModalOpen && selectedSignal && (
        <ExecuteTradeModal
          signal={selectedSignal}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
}
