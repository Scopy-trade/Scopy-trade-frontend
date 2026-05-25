// app/dashboard/pro-trader/page.tsx
"use client";

import { useState, useEffect } from "react";
import MetricCards from "@/components/pro-trader/signalsPage/MetricCards";
import SignalsTable from "@/components/pro-trader/signalsPage/SignalsTable";
import FloatingButton from "@/components/pro-trader/signalsPage/FloatingButton";
import AddSignalModal from "@/components/pro-trader/signalsPage/AddSignalModal";
import { MdAdd } from "react-icons/md";
import { authAPI, Signal } from "@/lib/api/client";

export default function SignalsDashboardPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [signals, setSignals] = useState<Signal[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [refetchKey, setRefetchKey] = useState(0);

  const fetchSignals = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await authAPI.getAllSignals(currentPage);

      if (response.success) {
        setSignals(response.signals);
        setTotalPages(response.pages);
      } else {
        throw new Error(response.message || "Failed to fetch signals");
      }
    } catch (err) {
      console.error("Failed to fetch signals:", err);
      setError(err instanceof Error ? err.message : "Failed to load signals");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSignals();
  }, [currentPage, refetchKey]);

  const handleSignalCreated = () => {
    setIsModalOpen(false);
    setRefetchKey((prev) => prev + 1);
  };

  const handleSignalDeleted = () => {
    setRefetchKey((prev) => prev + 1);
  };

  return (
    <>
      {/* Dashboard Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
        <div>
          <h2 className="text-4xl font-extrabold tracking-tight text-on-surface mb-2">
            Signals Dashboard
          </h2>
          <p className="text-on-surface-variant max-w-xl">
            Historical performance of your published trading signals. Every
            execution is verified on our platform.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="px-5 py-2.5 hidden md:flex items-center gap-2 rounded-lg bg-secondary text-on-secondary font-semibold text-xs transition-all hover:bg-secondary-container"
        >
          <MdAdd className="text-2xl" /> Create new signal
        </button>
      </div>

      {/* Metrics Grid */}
      <MetricCards signals={signals} />

      {/* Signals Table */}
      <SignalsTable
        signals={signals}
        loading={loading}
        error={error}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        onSignalDeleted={handleSignalDeleted}
      />

      {/* Floating Action Button */}
      <FloatingButton onClick={() => setIsModalOpen(true)} />

      {/* Add Signal Modal */}
      <AddSignalModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSignalCreated={handleSignalCreated}
      />
    </>
  );
}
