import type { Metadata } from "next";
import DashboardNav from "@/components/dashboard/DashboardNav";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import PortfolioCard from "@/components/dashboard/PortfolioCard";
import TradePositions from "@/components/dashboard/TradePositions";
import LinkedExchanges from "@/components/dashboard/LinkedExchanges";
import AlphaSignal from "@/components/dashboard/AlphaSignal";
import UpgradeCard from "@/components/dashboard/UpgradeCard";
import DashboardFooter from "@/components/dashboard/DashboardFooter";

export const metadata: Metadata = {
  title: "Dashboard | SCopyTrade",
  description: "SCopyTrade Terminal Overview",
};

export default function DashboardPage() {
  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ backgroundColor: "#0b1326", color: "#dae2fd" }}
    >
      <DashboardNav />

      <main
        className="flex-1 pt-24 pb-12 px-8 mx-auto w-full space-y-8"
        style={{ maxWidth: "1600px" }}
      >
        <DashboardHeader />

        {/* Main grid: 8 col left + 4 col right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left column */}
          <section className="lg:col-span-8 space-y-6">
            <PortfolioCard />
            <TradePositions />
          </section>

          {/* Right sidebar */}
          <aside className="lg:col-span-4 space-y-6">
            <LinkedExchanges />
            <AlphaSignal />
            <UpgradeCard />
          </aside>
        </div>
      </main>

      <DashboardFooter />
    </div>
  );
}
