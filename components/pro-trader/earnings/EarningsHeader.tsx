// components/dashboard/earnings/EarningsHeader.tsx
import { MdVerifiedUser } from "react-icons/md";

export default function EarningsHeader() {
  return (
    <div className="mb-10 flex items-end justify-between">
      <div>
        <h2 className="text-3xl font-extrabold tracking-tight text-on-surface mb-2">
          Earnings &amp; Payouts
        </h2>
        <p className="text-on-surface-variant text-sm">
          Manage your professional trader revenue and withdrawal pipeline.
        </p>
      </div>
      <div className="flex items-center space-x-2 text-xs font-semibold uppercase tracking-widest text-secondary opacity-60">
        <MdVerifiedUser className="text-base" />
        Sovereign Liquidity Protocol v4.2
      </div>
    </div>
  );
}
