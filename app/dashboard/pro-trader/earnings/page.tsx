// app/dashboard/earnings/page.tsx
"use client";

import { useEffect, useState } from "react";
import EarningsHeader from "@/components/pro-trader/earningsPage/EarningsHeader";
import PayoutHistory from "@/components/pro-trader/earningsPage/PayoutHistory";
import SecurityBanner from "@/components/pro-trader/earningsPage/SecurityBanner";
import StatsBentoGrid from "@/components/pro-trader/earningsPage/StatsBentoGrid";
import WithdrawalModal from "@/components/pro-trader/earningsPage/WithdrawalModal";
import { withdrawalService } from "@/lib/api/withdrawal";

export default function EarningsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [balance, setBalance] = useState(0);
  const [balanceLoading, setBalanceLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    withdrawalService
      .getWalletAddress()
      .then((res) => {
        if (!cancelled) setBalance(res.proEarningsBalance);
      })
      .catch(() => {
        // Stats card just keeps showing 0 / stays on its loading state;
        // the withdrawal modal itself surfaces a retry if this fails.
      })
      .finally(() => {
        if (!cancelled) setBalanceLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <>
      <EarningsHeader onWithdrawClick={() => setIsModalOpen(true)} />
      <StatsBentoGrid
        onWithdrawClick={() => setIsModalOpen(true)}
        balance={balance}
        balanceLoading={balanceLoading}
      />

      <div className="grid grid-cols-1 gap-8">
        <PayoutHistory />
      </div>

      <SecurityBanner />

      {isModalOpen && (
        <WithdrawalModal
          onClose={() => setIsModalOpen(false)}
          onSuccess={(remainingBalance) => setBalance(remainingBalance)}
        />
      )}
    </>
  );
}
