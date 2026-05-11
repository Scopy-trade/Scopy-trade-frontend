import DashboardNav from "@/components/dashboard/DashboardNav";
import DashboardFooter from "@/components/dashboard/DashboardFooter";
import ActiveConnections from "@/components/copy-trader/exchange/ActiveConnections";
import SetupConnectionForm from "@/components/copy-trader/exchange/SetupConnectionForm";
import SecurityBanner from "@/components/copy-trader/exchange/SecurityBanner";

export default function ExchangeSettingsPage() {
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
        {/* Header */}
        <header>
          <h1
            className="text-4xl font-bold tracking-tight mb-2"
            style={{ fontFamily: "Manrope, sans-serif" }}
          >
            Exchange Settings
          </h1>
          <p style={{ color: "#c5c6ce", maxWidth: "600px" }}>
            Connect your exchange API keys to enable automated copy trading.
            Your keys are encrypted and stored with sovereign security
            protocols.
          </p>
        </header>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left column */}
          <section className="lg:col-span-7 space-y-6">
            <ActiveConnections />
            <SecurityBanner />
          </section>

          {/* Right column */}
          <aside className="lg:col-span-5">
            <SetupConnectionForm />
          </aside>
        </div>
      </main>

      <DashboardFooter />
    </div>
  );
}
