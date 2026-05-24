// components/dashboard/earnings/WithdrawalHistoryTable.tsx
"use client";

import { useState } from "react";
import {
  MdCurrencyBitcoin,
  MdAccountBalance,
  MdFilterList,
  MdDownload,
  MdSearch,
} from "react-icons/md";

interface Transaction {
  id: string;
  date: string;
  time: string;
  method: "USDC" | "Bank Wire";
  amount: number;
  status: "COMPLETED" | "REJECTED" | "PENDING";
}

const allTransactions: Transaction[] = [
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
  {
    id: "TX-3392018742",
    date: "Nov 5, 2023",
    time: "08:30 UTC",
    method: "USDC",
    amount: 3500.0,
    status: "PENDING",
  },
];

export default function WithdrawalHistoryTable() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const getStatusStyles = (status: Transaction["status"]) => {
    switch (status) {
      case "COMPLETED":
        return "bg-secondary/10 text-secondary border-secondary/20";
      case "REJECTED":
        return "bg-error/10 text-error border-error/20";
      case "PENDING":
        return "bg-warning/10 text-warning border-warning/20";
    }
  };

  const filteredTransactions = allTransactions.filter((tx) => {
    const matchesSearch = tx.id
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || tx.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="bg-surface-container-low rounded-xl overflow-hidden border border-white/5">
      {/* Header with filters */}
      <div className="p-4 sm:p-6 border-b border-white/5 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <h3 className="text-lg font-bold text-on-surface">All Withdrawals</h3>
          <div className="flex space-x-2">
            <button className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest bg-surface-container-highest text-on-surface rounded-md flex items-center gap-1">
              <MdFilterList className="text-xs" />
              Filter
            </button>
            <button className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest bg-surface-container-highest text-on-surface rounded-md flex items-center gap-1">
              <MdDownload className="text-xs" />
              Export CSV
            </button>
          </div>
        </div>

        {/* Search and status filter */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <MdSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-sm" />
            <input
              type="text"
              placeholder="Search by Transaction ID"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-surface-container-highest border-none rounded-lg text-on-surface py-2 pl-9 pr-3 text-sm focus:ring-1 focus:ring-primary/20 placeholder:text-on-surface-variant/40"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-surface-container-highest border-none rounded-lg text-on-surface py-2 px-3 text-sm focus:ring-1 focus:ring-primary/20"
          >
            <option value="all">All Status</option>
            <option value="COMPLETED">Completed</option>
            <option value="PENDING">Pending</option>
            <option value="REJECTED">Rejected</option>
          </select>
        </div>
      </div>

      {/* Desktop Table View */}
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
            {filteredTransactions.map((tx, index) => (
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

      {/* Mobile Card View */}
      <div className="md:hidden divide-y divide-white/5">
        {filteredTransactions.map((tx) => (
          <div key={tx.id} className="p-4 space-y-3">
            <div className="flex justify-between items-start">
              <span className="font-mono text-xs text-on-surface">{tx.id}</span>
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
                <div className="flex items-center text-xs text-on-surface-variant mt-1 justify-end">
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

      {/* Empty state */}
      {filteredTransactions.length === 0 && (
        <div className="p-12 text-center">
          <p className="text-on-surface-variant">No transactions found</p>
        </div>
      )}
    </div>
  );
}
