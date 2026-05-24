// app/dashboard/withdrawals/page.tsx
import { MdArrowBack } from "react-icons/md";
import Link from "next/link";
import SecurityBanner from "@/components/pro-trader/earningsPage/SecurityBanner";
import WithdrawalHistoryTable from "@/components/pro-trader/earningsPage/WithdrawalHistoryTable";

export default function WithdrawalsPage() {
  return (
    <>
      <div className="mb-10">
        <Link
          href="/dashboard/earnings"
          className="inline-flex items-center text-sm text-on-surface-variant hover:text-secondary mb-4 transition-colors"
        >
          <MdArrowBack className="mr-1" />
          Back to Earnings
        </Link>
        <h2 className="text-3xl font-extrabold tracking-tight text-on-surface mb-2">
          Withdrawal History
        </h2>
        <p className="text-on-surface-variant text-sm">
          View and track all your past withdrawal requests.
        </p>
      </div>

      <WithdrawalHistoryTable />

      <SecurityBanner />
    </>
  );
}
