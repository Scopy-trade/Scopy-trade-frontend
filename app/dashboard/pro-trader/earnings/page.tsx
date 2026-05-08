// app/dashboard/earnings/page.tsx
import EarningsHeader from "@/components/pro-trader/earnings/EarningsHeader";
import WithdrawalForm from "@/components/pro-trader/earnings/WithdrawalForm";
import PayoutHistory from "@/components/pro-trader/earnings/PayoutHistory";
import SecurityBanner from "@/components/pro-trader/earnings/SecurityBanner";
import StatsBentoGrid from "@/components/pro-trader/earnings/StatsBentoGrid";

export default function EarningsPage() {
  return (
    <>
      <EarningsHeader />
      <StatsBentoGrid />

      <div className="grid grid-cols-12 gap-8">
        <WithdrawalForm />
        <PayoutHistory />
      </div>

      <SecurityBanner />
    </>
  );
}
