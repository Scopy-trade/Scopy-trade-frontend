// app/page.tsx
"use client";

import { useState } from "react";
import MetricCards from "@/components/pro-trader/signalsPage/MetricCards";
import SignalsTable from "@/components/pro-trader/signalsPage/SignalsTable";
import FloatingButton from "@/components/pro-trader/signalsPage/FloatingButton";
import AddSignalModal from "@/components/pro-trader/signalsPage/AddSignalModal";
import { MdAdd } from "react-icons/md";

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);

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
      <MetricCards />

      {/* Signals Table */}
      <SignalsTable />

      {/* Floating Action Button */}
      <FloatingButton onClick={() => setIsModalOpen(true)} />

      {/* Add Signal Modal */}
      <AddSignalModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}
