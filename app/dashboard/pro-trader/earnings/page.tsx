// app/dashboard/earnings/page.tsx
import EarningsHeader from "@/components/pro-trader/earningsPage/EarningsHeader";
import WithdrawalForm from "@/components/pro-trader/earningsPage/WithdrawalForm";
import PayoutHistory from "@/components/pro-trader/earningsPage/PayoutHistory";
import SecurityBanner from "@/components/pro-trader/earningsPage/SecurityBanner";
import StatsBentoGrid from "@/components/pro-trader/earningsPage/StatsBentoGrid";

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
