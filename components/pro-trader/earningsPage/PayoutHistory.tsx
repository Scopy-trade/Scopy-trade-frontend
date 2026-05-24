// components/dashboard/earnings/PayoutHistory.tsx
import {
  MdCurrencyBitcoin,
  MdAccountBalance,
  MdFilterList,
  MdDownload,
  MdArrowForward,
} from "react-icons/md";
import Link from "next/link";

interface Transaction {
  id: string;
  date: string;
  time: string;
  method: "USDC" | "Bank Wire";
  amount: number;
  status: "COMPLETED" | "REJECTED";
}

const transactions: Transaction[] = [
  {
    id: "TX-7742091183",
    date: "Oct 14, 2023",
    time: "14:22 UTC",
    method: "USDC",
    amount: 12000.0,
    status: "COMPLETED",
  },
  {
    id: "TX-9902113401",
    date: "Sep 28, 2023",
    time: "09:12 UTC",
    method: "Bank Wire",
    amount: 8500.0,
    status: "COMPLETED",
  },
  {
    id: "TX-1209338455",
    date: "Sep 12, 2023",
    time: "21:45 UTC",
    method: "USDC",
    amount: 5200.0,
    status: "COMPLETED",
  },
  {
    id: "TX-8839012247",
    date: "Aug 30, 2023",
    time: "11:05 UTC",
    method: "Bank Wire",
    amount: 14100.0,
    status: "REJECTED",
  },
  {
    id: "TX-4402199321",
    date: "Aug 15, 2023",
    time: "16:55 UTC",
    method: "USDC",
    amount: 10000.0,
    status: "COMPLETED",
  },
];

export default function PayoutHistory() {
  const getStatusStyles = (status: Transaction["status"]) => {
    switch (status) {
      case "COMPLETED":
        return "bg-secondary/10 text-secondary border-secondary/20";
      case "REJECTED":
        return "bg-error/10 text-error border-error/20";
    }
  };

  return (
    <div className="w-full">
      <div className="bg-surface-container-low rounded-xl overflow-hidden border border-white/5">
        <div className="px-4 sm:px-8 py-4 sm:py-6 border-b border-white/5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <h3 className="text-lg font-bold text-on-surface">Payout History</h3>
          <div className="flex space-x-2 w-full sm:w-auto">
            <button className="flex-1 sm:flex-initial px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest bg-surface-container-highest text-on-surface rounded-md flex items-center justify-center gap-1">
              <MdFilterList className="text-xs" />
              Filter
            </button>
            <button className="flex-1 sm:flex-initial px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest bg-surface-container-highest text-on-surface rounded-md flex items-center justify-center gap-1">
              <MdDownload className="text-xs" />
              Export CSV
            </button>
            <Link
              href="/dashboard/withdrawals"
              className="flex-1 sm:flex-initial px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest bg-secondary/20 text-secondary rounded-md flex items-center justify-center gap-1"
            >
              View All
              <MdArrowForward className="text-xs" />
            </Link>
          </div>
        </div>

        {/* Desktop Table View - Hidden on mobile */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-surface-container-low text-on-surface-variant text-[10px] font-black uppercase tracking-[0.2em]">
              <tr>
                <th className="px-8 py-5">Transaction ID</th>
                <th className="px-8 py-5">Date &amp; Time</th>
                <th className="px-8 py-5">Method</th>
                <th className="px-8 py-5">Amount</th>
                <th className="px-8 py-5 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {transactions.slice(0, 3).map((tx, index) => (
                <tr
                  key={tx.id}
                  className={`${
                    index % 2 === 0 ? "" : "bg-surface-container-lowest/50"
                  } hover:bg-white/[0.02] transition-colors`}
                >
                  <td className="px-8 py-6 font-mono text-xs text-on-surface">
                    {tx.id}
                  </td>
                  <td className="px-8 py-6">
                    <div className="text-sm font-medium text-on-surface">
                      {tx.date}
                    </div>
                    <div className="text-[10px] text-on-surface-variant">
                      {tx.time}
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center text-sm text-on-surface">
                      {tx.method === "USDC" ? (
                        <MdCurrencyBitcoin className="text-sm mr-2 opacity-60" />
                      ) : (
                        <MdAccountBalance className="text-sm mr-2 opacity-60" />
                      )}
                      {tx.method === "USDC" ? "USDC (ETH)" : "Bank Wire"}
                    </div>
                  </td>
                  <td className="px-8 py-6 font-bold text-on-surface">
                    $
                    {tx.amount.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </td>
                  <td className="px-8 py-6 text-right">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${getStatusStyles(tx.status)}`}
                    >
                      {tx.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Card View - Visible only on mobile */}
        <div className="md:hidden divide-y divide-white/5">
          {transactions.slice(0, 3).map((tx) => (
            <div key={tx.id} className="p-4 space-y-3">
              <div className="flex justify-between items-start">
                <span className="font-mono text-xs text-on-surface">
                  {tx.id}
                </span>
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${getStatusStyles(tx.status)}`}
                >
                  {tx.status}
                </span>
              </div>
              <div className="flex justify-between items-baseline">
                <div>
                  <div className="text-sm font-medium text-on-surface">
                    {tx.date}
                  </div>
                  <div className="text-[10px] text-on-surface-variant">
                    {tx.time}
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-on-surface">
                    $
                    {tx.amount.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </div>
                  <div className="flex items-center text-xs text-on-surface-variant mt-1">
                    {tx.method === "USDC" ? (
                      <MdCurrencyBitcoin className="text-xs mr-1" />
                    ) : (
                      <MdAccountBalance className="text-xs mr-1" />
                    )}
                    {tx.method === "USDC" ? "USDC (ETH)" : "Bank Wire"}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Link for Mobile */}
        <div className="md:hidden p-4 border-t border-white/5 text-center">
          <Link
            href="/dashboard/withdrawals"
            className="text-secondary text-sm font-medium hover:underline inline-flex items-center gap-1"
          >
            View All Transactions
            <MdArrowForward className="text-sm" />
          </Link>
        </div>
      </div>
    </div>
  );
}
