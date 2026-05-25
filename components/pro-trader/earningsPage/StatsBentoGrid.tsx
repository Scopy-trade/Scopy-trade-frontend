// components/dashboard/earnings/StatsBentoGrid.tsx
import {
  MdTrendingUp,
  MdSchedule,
  MdStars,
  MdCalendarToday,
  MdSync,
} from "react-icons/md";

interface StatsBentoGridProps {
  onWithdrawClick: () => void;
}

export default function StatsBentoGrid({
  onWithdrawClick,
}: StatsBentoGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
      {/* Main Balance Card */}
      <div className="bg-surface-container-low p-6 sm:p-8 rounded-xl flex flex-col justify-between relative overflow-hidden group">
        <div>
          <span className="text-on-surface-variant text-xs font-bold uppercase tracking-widest mb-4 block">
            Available for Withdrawal
          </span>
          <h3 className="text-2xl sm:text-3xl font-bold text-on-surface tracking-tighter -ml-1">
            $42,890
            <span className="text-xl sm:text-2xl text-on-surface-variant font-medium">
              .40
            </span>
          </h3>
        </div>
        <button
          onClick={onWithdrawClick}
          className="py-3 sm:py-4 mx-auto px-8 sm:px-10 mt-3 rounded-lg bg-gradient-to-r from-secondary to-secondary-container text-on-secondary font-bold text-sm tracking-tight active:scale-[0.98] transition-transform shadow-lg shadow-secondary/20 w-full sm:w-auto"
        >
          Request Payout
        </button>
      </div>

      <div className="bg-surface-container p-5 sm:p-6 rounded-xl flex flex-col justify-center">
        <span className="text-on-surface-variant text-xs font-bold uppercase tracking-widest mb-2 block">
          Total Earned (All Time)
        </span>
        <div className="text-2xl sm:text-3xl font-bold text-on-surface tracking-tight mb-2">
          $184,205.12
        </div>
        <div className="flex items-center text-secondary text-xs font-bold">
          <MdTrendingUp className="text-sm mr-1" />
          +12.5% this month
        </div>
      </div>

      <div className="bg-surface-container p-5 sm:p-6 rounded-xl flex flex-col justify-center">
        <span className="text-on-surface-variant text-xs font-bold uppercase tracking-widest mb-2 block">
          Last Payout
        </span>
        <div className="text-2xl sm:text-3xl font-bold text-on-surface tracking-tight mb-2">
          $12,000.00
        </div>
        <div className="flex items-center text-on-surface-variant text-xs font-medium">
          <MdCalendarToday className="text-sm mr-1" />
          Oct 14, 2023
        </div>
      </div>
    </div>
  );
}
