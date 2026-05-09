import { ReactNode } from "react";

/* ── Stat Card ── */
function StatCard({
  label,
  value,
  sub,
  subColor = "text-[#4edea3]",
  icon,
  iconBg = "text-[#dae2fd]",
}: {
  label: string;
  value: string;
  sub: string;
  subColor?: string;
  icon: string;
  iconBg?: string;
}) {
  return (
    <div className="bg-[#131b2e] border border-white/5 p-5 sm:p-6 rounded-2xl relative overflow-hidden group">
      <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
        <span className={`material-symbols-outlined text-5xl ${iconBg}`}>
          {icon}
        </span>
      </div>
      <p className="text-[10px] text-[#8f9098] font-bold tracking-widest uppercase">
        {label}
      </p>
      <h3 className="text-2xl sm:text-3xl font-black text-[#dae2fd] mt-2 font-[Manrope,sans-serif]">
        {value}
      </h3>
      <p className={`text-xs mt-1 flex items-center gap-1 ${subColor}`}>
        {sub}
      </p>
    </div>
  );
}

/* ── Activity Row ── */
function ActivityRow({
  icon,
  iconColor,
  title,
  desc,
  time,
}: {
  icon: string;
  iconColor: string;
  title: string;
  desc: string;
  time: string;
}) {
  return (
    <div className="flex items-start gap-3 py-3 border-b border-white/5 last:border-0">
      <div
        className={`mt-0.5 w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${iconColor}`}
      >
        <span className="material-symbols-outlined text-base">{icon}</span>
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-[#dae2fd] truncate">{title}</p>
        <p className="text-[11px] text-[#8f9098] mt-0.5">{desc}</p>
      </div>
      <p className="text-[10px] text-[#44474d] whitespace-nowrap ml-2 mt-1">
        {time}
      </p>
    </div>
  );
}

/* ── Tier Bar ── */
function TierBar({
  label,
  pct,
  color,
}: {
  label: string;
  pct: number;
  color: string;
}) {
  return (
    <div className="space-y-1.5">
      <div className="flex justify-between text-[10px] font-bold">
        <span className="text-[#dae2fd]">{label}</span>
        <span className={color}>{pct}%</span>
      </div>
      <div className="w-full h-1.5 bg-[#060e20] rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full ${color.replace("text-", "bg-")}`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

export default function OverviewPage() {
  return (
    <div className="space-y-6 sm:space-y-8 max-w-[1600px] mx-auto">
      {/* Page heading */}
      <div>
        <h2 className="text-xl sm:text-2xl font-black text-[#dae2fd] font-[Manrope,sans-serif]">
          Overview
        </h2>
        <p className="text-xs text-[#8f9098] mt-1">
          Platform summary · Updated just now
        </p>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <StatCard
          label="Total Active Users"
          value="12,842"
          sub="↑ +4.2% from last week"
          icon="groups"
        />
        <StatCard
          label="Total System Volume"
          value="$84.2M"
          sub="↑ +12.8% 24h"
          icon="monitoring"
        />
        <StatCard
          label="Trader Earnings"
          value="$2.14M"
          sub="Platform aggregated total"
          subColor="text-[#8f9098]"
          icon="payments"
        />
        <StatCard
          label="Verification Pending"
          value="48"
          sub="⚠ Manual review required"
          subColor="text-[#ffb2b9]"
          icon="verified_user"
          iconBg="text-[#ffb2b9]"
        />
      </div>

      {/* Middle row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <div className="lg:col-span-2 bg-[#131b2e] border border-white/5 rounded-2xl p-5 sm:p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-[#dae2fd] font-[Manrope,sans-serif]">
              Recent Activity
            </h3>
            <button className="text-[10px] text-[#4edea3] font-bold hover:underline flex items-center gap-1">
              View all{" "}
              <span className="material-symbols-outlined text-xs">
                arrow_forward
              </span>
            </button>
          </div>
          <div>
            <ActivityRow
              icon="person_add"
              iconColor="bg-[#00311f] text-[#4edea3]"
              title="New user registered"
              desc="Daniel Osei · UID: 9920481 · Lagos, NG"
              time="2m ago"
            />
            <ActivityRow
              icon="block"
              iconColor="bg-[#93000a]/30 text-[#ffb4ab]"
              title="Account suspended"
              desc="Julian Reed · UID: 9910234 · TOS Violation"
              time="18m ago"
            />
            <ActivityRow
              icon="payments"
              iconColor="bg-[#002371]/40 text-[#b6c4ff]"
              title="Large withdrawal request"
              desc="Sasha Knight · $240,000 · Pending approval"
              time="34m ago"
            />
            <ActivityRow
              icon="verified_user"
              iconColor="bg-[#00311f] text-[#4edea3]"
              title="KYC approved"
              desc="Elena Markov · UID: 7721045 · Level 2"
              time="1h ago"
            />
            <ActivityRow
              icon="security"
              iconColor="bg-[#5d001b]/30 text-[#ffb2b9]"
              title="Suspicious signal detected"
              desc="Signal ID #SIG-4821 · Auto-flagged for review"
              time="2h ago"
            />
            <ActivityRow
              icon="trending_up"
              iconColor="bg-[#00311f] text-[#4edea3]"
              title="Record session volume"
              desc="$12.4M traded in past hour · All-time high"
              time="3h ago"
            />
          </div>
        </div>

        {/* Account Tier Mix */}
        <div className="bg-[#131b2e] border border-white/5 rounded-2xl p-5 sm:p-6">
          <h3 className="text-sm font-bold text-[#dae2fd] mb-5 font-[Manrope,sans-serif]">
            Account Tier Mix
          </h3>
          <div className="space-y-5">
            <TierBar label="Elite Traders" pct={12} color="text-[#4edea3]" />
            <TierBar label="Standard Traders" pct={64} color="text-[#b6c4ff]" />
            <TierBar label="Trial Users" pct={24} color="text-[#8f9098]" />
          </div>

          {/* Mini stats */}
          <div className="mt-8 grid grid-cols-2 gap-3">
            {[
              { label: "New Today", value: "+142" },
              { label: "Churned", value: "−18" },
              { label: "Avg. ROI", value: "11.4%" },
              { label: "Online Now", value: "4,201" },
            ].map((s) => (
              <div
                key={s.label}
                className="bg-[#0b1326] rounded-xl p-3 border border-white/5"
              >
                <p className="text-[9px] text-[#8f9098] uppercase tracking-widest">
                  {s.label}
                </p>
                <p className="text-base font-black text-[#dae2fd] mt-1 font-[Manrope,sans-serif]">
                  {s.value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Governance Banner */}
      <div className="bg-gradient-to-br from-[#131b2e] to-[#0f1a2e] border border-white/5 rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center gap-6">
        <div className="w-14 h-14 rounded-2xl bg-[#00311f] border border-[#4edea3]/20 flex items-center justify-center flex-shrink-0">
          <span className="material-symbols-outlined text-[#4edea3] text-2xl">
            shield
          </span>
        </div>
        <div className="flex-1">
          <h4 className="text-base font-bold text-[#dae2fd] font-[Manrope,sans-serif]">
            Governance Protocol Active
          </h4>
          <p className="text-sm text-[#8f9098] mt-1 max-w-2xl leading-relaxed">
            System-wide monitoring is tracking{" "}
            <span className="text-[#dae2fd] font-semibold">
              4,201 concurrent sessions
            </span>
            . Automated risk mitigation is enabled for all Pro Trader accounts
            with volume exceeding $1M/day.
          </p>
        </div>
        <button className="text-[#4edea3] text-xs font-bold flex items-center gap-1.5 bg-[#00311f] border border-[#4edea3]/20 px-4 py-2.5 rounded-xl hover:opacity-80 transition-all whitespace-nowrap flex-shrink-0">
          Security Audit Logs
          <span className="material-symbols-outlined text-sm">
            arrow_forward
          </span>
        </button>
      </div>
    </div>
  );
}
