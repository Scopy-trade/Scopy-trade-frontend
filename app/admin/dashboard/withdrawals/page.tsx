"use client";

import { useState } from "react";

type StandingVariant = "excellent" | "new" | "flagged";
type TierVariant = "master" | "rising" | "risk";

interface WithdrawalRequest {
  id: string;
  name: string;
  initials: string;
  uid: string;
  tier: string;
  tierVariant: TierVariant;
  requestedAmount: string;
  currentBalance: string;
  historicalEarnings: string;
  standing: string;
  standingVariant: StandingVariant;
  borderVariant: "green" | "muted" | "red";
  complianceAlert?: string;
  notesPlaceholder: string;
}

const REQUESTS: WithdrawalRequest[] = [
  {
    id: "WD-9921",
    name: "Alexander Volkov",
    initials: "AV",
    uid: "992-XAQ-11",
    tier: "Master Tier",
    tierVariant: "master",
    requestedAmount: "$12,450.00",
    currentBalance: "$84,120.55",
    historicalEarnings: "$312,900.00",
    standing: "Excellent",
    standingVariant: "excellent",
    borderVariant: "green",
    notesPlaceholder: "Verify KYC or add audit notes...",
  },
  {
    id: "WD-4412",
    name: "Elena Moretti",
    initials: "EM",
    uid: "441-LMN-09",
    tier: "Rising Star",
    tierVariant: "rising",
    requestedAmount: "$4,200.00",
    currentBalance: "$6,100.20",
    historicalEarnings: "$18,400.00",
    standing: "New Acc.",
    standingVariant: "new",
    borderVariant: "muted",
    notesPlaceholder: "First withdrawal verification...",
  },
  {
    id: "WD-1028",
    name: "Marcus Thorne",
    initials: "MT",
    uid: "102-KBT-88",
    tier: "High Risk",
    tierVariant: "risk",
    requestedAmount: "$92,000.00",
    currentBalance: "$95,000.00",
    historicalEarnings: "$450,210.00",
    standing: "Flagged",
    standingVariant: "flagged",
    borderVariant: "red",
    complianceAlert:
      "System flagged: Large withdrawal request immediately following high-volatility win. Review manual trade logs.",
    notesPlaceholder: "Notes for compliance...",
  },
];

const TIER_STYLES: Record<TierVariant, string> = {
  master: "bg-[#4edea3]/10 text-[#4edea3]",
  rising: "bg-[#b6c4ff]/10 text-[#b6c4ff]",
  risk: "bg-[#ffb4ab]/10 text-[#ffb4ab]",
};

const BORDER_STYLES: Record<string, string> = {
  green: "border-l-[#4edea3]",
  muted: "border-l-[#44474d]/40",
  red: "border-l-[#ffb4ab]",
};

const STANDING_DOT: Record<StandingVariant, string> = {
  excellent: "bg-[#4edea3]",
  new: "bg-[#b6c4ff] animate-pulse",
  flagged: "bg-[#ffb4ab]",
};

const AMOUNT_COLOR: Record<string, string> = {
  green: "text-[#4edea3]",
  muted: "text-[#dae2fd]",
  red: "text-[#ffb4ab]",
};

export default function WithdrawalsPage() {
  const [notes, setNotes] = useState<Record<string, string>>({});
  const [approved, setApproved] = useState<Record<string, boolean>>({});
  const [rejected, setRejected] = useState<Record<string, boolean>>({});

  const handleApprove = (id: string, isRisk: boolean) => {
    if (isRisk) return;
    setApproved((prev) => ({ ...prev, [id]: true }));
  };

  const handleReject = (id: string) => {
    setRejected((prev) => ({ ...prev, [id]: true }));
  };

  return (
    <div className="space-y-8 max-w-[1600px] mx-auto">
      {/* Page Header */}
      <div>
        <h2 className="text-xl sm:text-2xl font-black text-[#dae2fd] font-[Manrope,sans-serif] tracking-tight">
          Withdrawal Management
        </h2>
        <p className="text-xs text-[#8f9098] mt-1 max-w-2xl leading-relaxed">
          Validate and authorize trader payouts. All approvals are recorded on
          the internal ledger with multi-sig verification.
        </p>
      </div>

      {/* Status Bento Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Total Pending Payouts */}
        <div className="bg-[#131b2e] border border-white/5 p-6 rounded-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity pointer-events-none">
            <span className="material-symbols-outlined text-6xl text-[#dae2fd]">
              payments
            </span>
          </div>
          <p className="text-[9px] font-bold text-[#8f9098] uppercase tracking-widest mb-4">
            Total Pending Payouts
          </p>
          <div className="flex items-baseline gap-1">
            <h3 className="text-3xl font-black font-[Manrope,sans-serif] text-[#dae2fd] tracking-tighter">
              $428,901
            </h3>
            <span className="text-sm text-[#4edea3] font-bold">.42</span>
          </div>
          <div className="flex items-center gap-2 mt-3">
            <span className="material-symbols-outlined text-[#4edea3] text-sm">
              schedule
            </span>
            <span className="text-[11px] text-[#4edea3] font-semibold">
              12 Requests Awaiting
            </span>
          </div>
        </div>

        {/* Vault Liquidity */}
        <div className="bg-[#131b2e] border border-white/5 p-6 rounded-2xl">
          <p className="text-[9px] font-bold text-[#8f9098] uppercase tracking-widest mb-4">
            Vault Liquidity Status
          </p>
          <h3 className="text-3xl font-black font-[Manrope,sans-serif] text-[#4edea3] tracking-tighter">
            Healthy
          </h3>
          <div className="mt-4 w-full bg-[#060e20] h-1.5 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-[#4edea3] to-[#00a572] w-[88%] rounded-full" />
          </div>
          <div className="mt-2 flex justify-between text-[10px] font-bold text-[#8f9098] uppercase">
            <span>Reserve: $2.4M</span>
            <span>88%</span>
          </div>
        </div>

        {/* Approval Velocity — spans 2 cols on lg */}
        <div className="sm:col-span-2 bg-[#131b2e] border border-white/5 p-6 rounded-2xl">
          <div className="flex justify-between items-start mb-5">
            <div>
              <p className="text-[9px] font-bold text-[#8f9098] uppercase tracking-widest mb-1">
                Approval Velocity
              </p>
              <h4 className="text-lg font-black font-[Manrope,sans-serif] text-[#dae2fd] tracking-tight">
                Efficiency: 94.2%
              </h4>
            </div>
            <button className="text-[10px] font-black text-[#4edea3] bg-[#4edea3]/10 px-3 py-1 rounded-lg uppercase tracking-widest hover:bg-[#4edea3]/20 transition-colors">
              View Reports
            </button>
          </div>
          <div className="flex items-end gap-1.5 h-14">
            {[75, 87, 50, 100, 63, 87, 75].map((h, i) => (
              <div
                key={i}
                className={`flex-1 rounded-t-sm transition-all ${
                  h === 100 ? "bg-[#4edea3]" : "bg-[#4edea3]/30"
                }`}
                style={{ height: `${h}%` }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Queue Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h3 className="flex items-center gap-2 text-base font-black font-[Manrope,sans-serif] text-[#dae2fd]">
          <span className="material-symbols-outlined text-[#4edea3]">
            verified_user
          </span>
          Withdrawal Approval Queue
        </h3>
        <div className="flex gap-2">
          <button className="px-3 py-2 bg-[#171f33] border border-white/5 rounded-xl text-xs font-semibold text-[#c5c6ce] hover:bg-[#222a3d] transition-colors">
            Sort: Newest First
          </button>
          <button className="px-3 py-2 bg-[#171f33] border border-white/5 rounded-xl text-xs font-semibold text-[#c5c6ce] hover:bg-[#222a3d] transition-colors">
            Filter: High Value
          </button>
        </div>
      </div>

      {/* Request Cards */}
      <div className="space-y-4">
        {REQUESTS.map((req) => {
          const isApproved = approved[req.id];
          const isRejected = rejected[req.id];
          const isRisk = req.borderVariant === "red";
          const resolved = isApproved || isRejected;

          return (
            <div
              key={req.id}
              className={`grid grid-cols-1 lg:grid-cols-12 gap-px transition-opacity ${resolved ? "opacity-50" : ""}`}
            >
              {/* Left panel */}
              <div
                className={`lg:col-span-8 bg-[#171f33] border border-white/5 p-6 sm:p-8 rounded-2xl lg:rounded-r-none border-l-4 ${BORDER_STYLES[req.borderVariant]}`}
              >
                {/* Top row */}
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-8">
                  <div className="flex items-start gap-4">
                    {/* Avatar initials */}
                    <div
                      className={`w-14 h-14 rounded-xl flex items-center justify-center text-lg font-black flex-shrink-0 ring-2 ${
                        isRisk
                          ? "bg-[#ffb4ab]/10 text-[#ffb4ab] ring-[#ffb4ab]/20"
                          : req.borderVariant === "green"
                            ? "bg-[#4edea3]/10 text-[#4edea3] ring-[#4edea3]/20"
                            : "bg-[#b6c4ff]/10 text-[#b6c4ff] ring-[#b6c4ff]/10"
                      }`}
                    >
                      {req.initials}
                    </div>
                    <div>
                      <h4 className="text-lg font-black font-[Manrope,sans-serif] text-[#dae2fd] tracking-tight">
                        {req.name}
                      </h4>
                      <div className="flex flex-wrap items-center gap-2 mt-1.5">
                        <span
                          className={`text-[10px] font-black px-2 py-0.5 rounded-lg uppercase tracking-widest ${TIER_STYLES[req.tierVariant]}`}
                        >
                          {req.tier}
                        </span>
                        <span className="text-[11px] text-[#8f9098] flex items-center gap-1">
                          <span className="material-symbols-outlined text-sm">
                            id_card
                          </span>
                          UID: {req.uid}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="text-left sm:text-right">
                    <p className="text-[9px] font-bold text-[#8f9098] uppercase tracking-widest mb-1">
                      Requested Amount
                    </p>
                    <p
                      className={`text-2xl sm:text-3xl font-black font-[Manrope,sans-serif] tracking-tighter ${AMOUNT_COLOR[req.borderVariant]}`}
                    >
                      {req.requestedAmount}
                    </p>
                  </div>
                </div>

                {/* Stats row */}
                <div className="grid grid-cols-3 gap-4 sm:gap-8">
                  {[
                    { label: "Current Balance", value: req.currentBalance },
                    {
                      label: "Historical Earnings",
                      value: req.historicalEarnings,
                    },
                    {
                      label: "Account Standing",
                      value: req.standing,
                      dot: true,
                    },
                  ].map((stat) => (
                    <div key={stat.label} className="space-y-1">
                      <p className="text-[9px] font-bold text-[#8f9098] uppercase tracking-wider">
                        {stat.label}
                      </p>
                      {stat.dot ? (
                        <div className="flex items-center gap-2">
                          <span
                            className={`w-2 h-2 rounded-full flex-shrink-0 ${STANDING_DOT[req.standingVariant]}`}
                          />
                          <span className="text-sm sm:text-base font-semibold text-[#dae2fd] tracking-tight">
                            {stat.value}
                          </span>
                        </div>
                      ) : (
                        <p className="text-sm sm:text-base font-semibold text-[#dae2fd] tracking-tight">
                          {stat.value}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Right panel */}
              <div className="lg:col-span-4 bg-[#222a3d] border border-white/5 border-t-0 lg:border-t lg:border-l-0 p-6 sm:p-8 rounded-2xl lg:rounded-l-none flex flex-col justify-between gap-6">
                <div className="space-y-3">
                  <label className="block text-[9px] font-bold text-[#8f9098] uppercase tracking-widest">
                    {req.complianceAlert
                      ? "Compliance Alert"
                      : "Internal Compliance Notes"}
                  </label>

                  {req.complianceAlert && (
                    <div className="bg-[#ffb4ab]/5 border border-[#ffb4ab]/20 rounded-xl p-3">
                      <p className="text-[10px] text-[#ffb4ab] leading-relaxed">
                        {req.complianceAlert}
                      </p>
                    </div>
                  )}

                  <textarea
                    rows={req.complianceAlert ? 2 : 3}
                    value={notes[req.id] ?? ""}
                    onChange={(e) =>
                      setNotes((prev) => ({
                        ...prev,
                        [req.id]: e.target.value,
                      }))
                    }
                    placeholder={req.notesPlaceholder}
                    disabled={resolved}
                    className="w-full bg-[#060e20] border border-white/5 rounded-xl p-3 text-xs text-[#dae2fd] focus:outline-none focus:ring-1 focus:ring-[#4edea3]/30 placeholder:text-[#44474d] resize-none disabled:opacity-40"
                  />
                </div>

                {/* Action buttons */}
                {resolved ? (
                  <div
                    className={`py-3 rounded-xl text-center text-xs font-black uppercase tracking-widest ${
                      isApproved
                        ? "bg-[#4edea3]/10 text-[#4edea3] border border-[#4edea3]/20"
                        : "bg-[#ffb4ab]/10 text-[#ffb4ab] border border-[#ffb4ab]/20"
                    }`}
                  >
                    {isApproved ? "✓ Approved & Released" : "✕ Rejected"}
                  </div>
                ) : (
                  <div className="flex gap-3">
                    <button
                      onClick={() => handleReject(req.id)}
                      className={`flex-1 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${
                        isRisk
                          ? "bg-[#93000a] text-[#ffdad6] hover:bg-[#ffb4ab] hover:text-[#690005]"
                          : "bg-[#171f33] border border-white/5 text-[#dae2fd] hover:bg-[#5d001b]/40 hover:text-[#ffb4ab] hover:border-[#ffb4ab]/20"
                      }`}
                    >
                      Reject
                    </button>
                    <button
                      onClick={() => handleApprove(req.id, isRisk)}
                      disabled={isRisk}
                      className={`flex-[2] py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${
                        isRisk
                          ? "bg-[#171f33] border border-white/5 text-[#44474d] cursor-not-allowed"
                          : "bg-gradient-to-r from-[#4edea3] to-[#00a572] text-[#003824] hover:brightness-110 shadow-lg shadow-[#4edea3]/10"
                      }`}
                    >
                      Approve &amp; Release
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Floating Action Button */}
      <div className="fixed bottom-8 right-8 z-50 group">
        <button className="bg-[#4edea3] text-[#003824] w-14 h-14 rounded-full shadow-2xl shadow-[#4edea3]/30 flex items-center justify-center hover:scale-110 transition-transform">
          <span className="material-symbols-outlined text-2xl">send</span>
        </button>
        <span className="absolute right-full mr-4 top-1/2 -translate-y-1/2 bg-[#4edea3] text-[#003824] px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-xl">
          Manual Disbursement
        </span>
      </div>
    </div>
  );
}
