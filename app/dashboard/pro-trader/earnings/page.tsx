// app/dashboard/earnings/page.tsx
"use client";

import { useState } from "react";
import EarningsHeader from "@/components/pro-trader/earningsPage/EarningsHeader";
import PayoutHistory from "@/components/pro-trader/earningsPage/PayoutHistory";
import SecurityBanner from "@/components/pro-trader/earningsPage/SecurityBanner";
import StatsBentoGrid from "@/components/pro-trader/earningsPage/StatsBentoGrid";
import WithdrawalModal from "@/components/pro-trader/earningsPage/WithdrawalModal";

export default function EarningsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <EarningsHeader onWithdrawClick={() => setIsModalOpen(true)} />
      <StatsBentoGrid onWithdrawClick={() => setIsModalOpen(true)} />

      <div className="grid grid-cols-1 gap-8">
        <PayoutHistory />
      </div>

      <SecurityBanner />

      <WithdrawalModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}
