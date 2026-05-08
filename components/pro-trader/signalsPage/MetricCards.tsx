// components/MetricCards.tsx
import { MdGroups, MdTrendingUp } from "react-icons/md";

export default function MetricCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
      <div className="bg-surface-container-low p-6 rounded-2xl flex flex-col justify-between">
        <span className="text-on-surface-variant text-xs font-semibold uppercase tracking-widest">
          Total Signals
        </span>
        <div className="mt-4">
          <div className="text-3xl font-bold tracking-tight">1,248</div>
          <div className="flex items-center gap-1 text-secondary text-xs mt-1">
            <MdTrendingUp className="text-sm" />
            <span>+12% this month</span>
          </div>
        </div>
      </div>

      <div className="bg-surface-container p-6 rounded-2xl border border-secondary/10 flex flex-col justify-between">
        <span className="text-on-surface-variant text-xs font-semibold uppercase tracking-widest">
          Global Win Rate
        </span>
        <div className="mt-4">
          <div className="text-3xl font-bold tracking-tight text-secondary">
            74.2%
          </div>
          <div className="w-full bg-surface-container-lowest h-1 mt-2 rounded-full overflow-hidden">
            <div className="h-full bg-secondary w-[74%]"></div>
          </div>
        </div>
      </div>

      <div className="bg-linear-to-br from-primary-container/30 to-surface-container p-6 rounded-2xl flex flex-col justify-between">
        <div className="flex justify-between items-start">
          <span className="text-on-surface-variant text-xs font-semibold uppercase tracking-widest">
            Follower Profit Generated
          </span>
          <MdGroups className="text-primary text-xl" />
        </div>
        <div className="mt-4 flex items-baseline gap-2">
          <div className="text-4xl font-black tracking-tighter text-primary">
            $4.82M
          </div>
          <div className="text-on-surface-variant text-sm font-medium">
            USDT
          </div>
        </div>
      </div>
    </div>
  );
}
