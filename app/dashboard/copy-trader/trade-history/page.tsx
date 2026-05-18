import TradeHistoryStats from "@/components/copy-trader/trade-history/TradeHistoryStats";
import TradeHistoryFilters from "@/components/copy-trader/trade-history/TradeHistoryFilters";
import TradeHistoryTable from "@/components/copy-trader/trade-history/TradeHistoryTable";
import InsightCards from "@/components/copy-trader/trade-history/InsightCards";

export default function TradeHistoryPage() {
  return (
    <div className="flex-1 px-4 md:px-8 py-6 max-w-7xl mx-auto w-full space-y-6">
      {/* Header + Stats */}
      <div className="flex flex-col lg:flex-row gap-6 items-start">
        <div className="min-w-[280px]">
          <h1 className="text-3xl font-bold tracking-tight mb-2 font-headline text-slate-100">
            Trade History
          </h1>
          <p className="text-slate-400 text-sm">
            Detailed log of your executed trades and portfolio performance over time.
          </p>
        </div>
        <TradeHistoryStats />
      </div>

      {/* Filters */}
      <TradeHistoryFilters />

      {/* Table */}
      <div className="overflow-x-auto pb-4">
        <TradeHistoryTable />
      </div>

      {/* Insight Cards */}
      <InsightCards />
    </div>
  );
}
