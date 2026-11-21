import type { Withdrawal } from "@/lib/api/withdrawals";

export function WithdrawalStatusBadge({ status }: { status: Withdrawal["status"] }) {
  const colors = status === "COMPLETED" ? "bg-emerald-400/10 text-emerald-300" : status === "FAILED" ? "bg-red-400/10 text-red-300" : status === "REVIEW" ? "bg-amber-400/10 text-amber-200" : "bg-white/5 text-slate-300";
  return <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${colors}`}>{status.replaceAll("_", " ")}</span>;
}

export default function WithdrawalDetails({ row }: { row: Withdrawal }) {
  const fields = [
    ["Withdrawal ID", row._id], ["Request ID", row.requestId || "Unavailable"],
    ["Total reserved", `${row.amount} USDT`],
    ["Wallet payout", `${row.payoutAmount ?? row.amount} USDT${row.status === "FAILED" ? " (not paid)" : ""}`],
    ["Network fee reserve", `${row.networkFeeReserve ?? "0.000000"} USDT`],
    ["Actual network fee", row.networkFee == null ? "Awaiting chain confirmation" : `${row.networkFee} USDT`],
    ["Balance refund", row.refundedAmount == null ? "Awaiting resolution" : `${row.refundedAmount} USDT`],
    ["Additional network cost", `${row.additionalNetworkFee ?? "0.000000"} USDT`], ["Destination / TRON", row.address],
    ["Created", new Date(row.createdAt).toLocaleString()],
    ["Completed", row.completedAt ? new Date(row.completedAt).toLocaleString() : "Not completed"],
    ["Funds", row.fundsReserved ? "Reserved pending resolution" : row.status === "FAILED" ? "Unsent funds refunded after consumed network fees" : row.status === "COMPLETED" ? "Payout sent; unused fee reserve returned" : "Reservation unavailable"],
  ];
  return <div className="space-y-4 text-sm">
    <WithdrawalStatusBadge status={row.status} />
    {row.lastError && <p className="rounded-xl border border-white/10 bg-white/5 p-4 leading-6">{row.lastError}</p>}
    <dl className="grid gap-4 sm:grid-cols-2">{fields.map(([label, value]) => <div key={label} className="min-w-0"><dt className="text-xs text-slate-400">{label}</dt><dd className="mt-1 break-all">{value}</dd></div>)}</dl>
    <div><p className="text-xs text-slate-400">TRON transaction hash</p><p className="mt-1 break-all font-mono text-xs">{row.transactionId || "Not available"}</p>
      {/^[a-f0-9]{64}$/i.test(row.transactionId || "") && <a className="mt-2 inline-block text-emerald-300 underline" href={`https://tronscan.org/#/transaction/${row.transactionId}`} target="_blank" rel="noopener noreferrer">View on TRON explorer</a>}
    </div>
  </div>;
}
