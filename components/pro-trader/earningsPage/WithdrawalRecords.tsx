import type { Withdrawal } from "@/lib/api/withdrawals";
import WithdrawalDetails, { WithdrawalStatusBadge } from "./WithdrawalDetails";

export default function WithdrawalRecords({ rows }: { rows: Withdrawal[] }) {
  return <div className="divide-y divide-white/5">{rows.map(row => <details key={row._id} className="group px-5 py-5 text-on-surface sm:px-6">
    <summary className="cursor-pointer list-none rounded-lg focus-visible:outline-2 focus-visible:outline-secondary">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div><p className="font-semibold tabular-nums">{row.amount} USDT <span className="ml-2 text-xs font-normal capitalize text-on-surface-variant">{row.mode}</span></p><p className="mt-1 text-xs text-on-surface-variant">{new Date(row.createdAt).toLocaleString()}</p></div>
        <div className="flex items-center gap-3"><WithdrawalStatusBadge status={row.status} /><span className="text-xs text-secondary group-open:hidden">View details</span><span className="hidden text-xs text-secondary group-open:inline">Hide details</span></div>
      </div>
      {row.lastError && <p className="mt-3 max-w-3xl text-xs leading-5 text-on-surface-variant">{row.lastError}</p>}
    </summary>
    <div className="mt-5 rounded-xl border border-white/5 bg-white/[0.02] p-4 sm:p-5"><WithdrawalDetails row={row} /></div>
  </details>)}</div>;
}
