// components/dashboard/earnings/EarningsHeader.tsx
import { MdVerifiedUser, MdLogout } from "react-icons/md";

interface EarningsHeaderProps {
  onWithdrawClick: () => void;
}

export default function EarningsHeader({
  onWithdrawClick,
}: EarningsHeaderProps) {
  return (
    <div className="mb-10 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
      <div>
        <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-on-surface mb-2">
          Earnings &amp; Payouts
        </h2>
        <p className="text-on-surface-variant text-sm">
          Manage your professional trader revenue and withdrawal pipeline.
        </p>
      </div>
      <div className="flex items-center gap-3">
        <button
          onClick={onWithdrawClick}
          className="px-4 py-2 rounded-lg bg-gradient-to-r from-secondary to-secondary-container text-on-secondary font-bold text-sm tracking-tight active:scale-[0.98] transition-transform shadow-lg shadow-secondary/20 whitespace-nowrap"
        >
          Withdraw Funds
        </button>
        <div className="flex items-center space-x-2 text-xs font-semibold uppercase tracking-widest text-secondary opacity-60">
          <MdVerifiedUser className="text-base" />
          Sovereign Liquidity Protocol v4.2
        </div>
      </div>
    </div>
  );
}
