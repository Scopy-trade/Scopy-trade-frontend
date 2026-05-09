import DashboardNav from "@/components/dashboard/DashboardNav";
import DashboardFooter from "@/components/dashboard/DashboardFooter";
import TradeHistoryStats from "@/components/copy-trader/trade-history/TradeHistoryStats";
import TradeHistoryFilters from "@/components/copy-trader/trade-history/TradeHistoryFilters";
import TradeHistoryTable from "@/components/copy-trader/trade-history/TradeHistoryTable";
import InsightCards from "@/components/copy-trader/trade-history/InsightCards";

export default function TradeHistoryPage() {
  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ backgroundColor: "#0b1326", color: "#dae2fd" }}
    >
      <DashboardNav />

      <main
        className="flex-1 pt-24 pb-12 px-8 mx-auto w-full space-y-6"
        style={{ maxWidth: "1600px" }}
      >
        {/* Header + Stats */}
        <div className="flex flex-col lg:flex-row gap-6 items-start">
          <div className="min-w-[280px]">
            <h1
              className="text-4xl font-bold tracking-tight mb-2"
              style={{ fontFamily: "Manrope, sans-serif" }}
            >
              Trade History
            </h1>
            <p style={{ color: "#c5c6ce", fontSize: "14px" }}>
              Detailed log of your executed trades and portfolio performance
              over time.
            </p>
          </div>
          <TradeHistoryStats />
        </div>

        {/* Filters */}
        <TradeHistoryFilters />

        {/* Table */}
        <TradeHistoryTable />

        {/* Insight Cards */}
        <InsightCards />
      </main>

      <DashboardFooter />
    </div>
  );
}
