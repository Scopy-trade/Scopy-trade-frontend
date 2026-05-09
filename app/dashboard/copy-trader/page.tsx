"use client";

import { useState } from "react";
import DashboardNav from "@/components/dashboard/DashboardNav";
import DashboardFooter from "@/components/dashboard/DashboardFooter";
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
    <div
      className="min-h-screen flex flex-col"
      style={{ backgroundColor: "#0b1326", color: "#dae2fd" }}
    >
      <DashboardNav />

      <main
        className="flex-1 pt-24 pb-12 px-8 mx-auto w-full space-y-8"
        style={{ maxWidth: "1600px" }}
      >
        {/* Header */}
        <header>
          <h1
            className="text-4xl font-bold tracking-tight mb-2"
            style={{ fontFamily: "Manrope, sans-serif" }}
          >
            Signal Factory
          </h1>
          <p style={{ color: "#c5c6ce", maxWidth: "600px" }}>
            Discover real-time high-conviction signals from the world's most
            disciplined traders. Our sovereign algorithm filters for
            performance, consistency, and risk-adjusted returns.
          </p>
        </header>

        {/* Filters */}
        <SignalFilters />

        {/* Signal Grid */}
        <SignalGrid onExecute={handleExecute} />
      </main>

      <DashboardFooter />

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
