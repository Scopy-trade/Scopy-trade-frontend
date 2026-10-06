import type { Withdrawal } from "@/lib/api/withdrawals";

export function WithdrawalStatusBadge({ status }: { status: Withdrawal["status"] }) {
  const colors = status === "CONFIRMED" ? "bg-emerald-400/10 text-emerald-300" : status === "FAILED" ? "bg-red-400/10 text-red-300" : status === "REVIEW" ? "bg-amber-400/10 text-amber-200" : "bg-white/5 text-slate-300";
  return <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${colors}`}>{status.replaceAll("_", " ")}</span>;
}

export default function WithdrawalDetails({ row }: { row: Withdrawal }) {
  const fields = [
    ["Withdrawal ID", row._id], ["Request ID", row.requestId || "Unavailable (legacy withdrawal)"],
    ["Amount", `${row.amount} USDT`], ["Destination / TRON", row.address],
    ["Mode", row.mode === "demo" ? "Demo — simulated transfer" : "Live"],
    ["Created", new Date(row.createdAt).toLocaleString()],
    ["Completed", row.completedAt ? new Date(row.completedAt).toLocaleString() : "Not completed"],
    ["Funds", row.fundsReserved ? "Reserved pending resolution" : row.status === "FAILED" ? "Returned to available balance" : row.status === "CONFIRMED" ? row.mode === "demo" ? "Demo balance deducted" : "Paid; balance remains deducted" : "Legacy record — reservation unavailable"],
  ];
  return <div className="space-y-4 text-sm">
    <WithdrawalStatusBadge status={row.status} />
    {row.lastError && <p className="rounded-xl border border-white/10 bg-white/5 p-4 leading-6">{row.lastError}</p>}
    <dl className="grid gap-4 sm:grid-cols-2">{fields.map(([label, value]) => <div key={label} className="min-w-0"><dt className="text-xs text-slate-400">{label}</dt><dd className="mt-1 break-all">{value}</dd></div>)}</dl>
    <div><p className="text-xs text-slate-400">TRON transaction hash</p><p className="mt-1 break-all font-mono text-xs">{row.transactionId || (row.mode === "demo" ? "No blockchain transaction (demo)" : "Not available")}</p>
      {row.mode === "live" && /^[a-f0-9]{64}$/i.test(row.transactionId || "") && <a className="mt-2 inline-block text-emerald-300 underline" href={`https://tronscan.org/#/transaction/${row.transactionId}`} target="_blank" rel="noopener noreferrer">View on TRON explorer</a>}
    </div>
  </div>;
}
