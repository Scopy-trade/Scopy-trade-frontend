"use client";

import { useState } from "react";

type LogStatus = "success" | "pending" | "error" | "warning";
type ActionType =
  | "SIGNAL_CREATED"
  | "WITHDRAWAL_REQ"
  | "TRADE_EXECUTED"
  | "LOGIN_FAILED"
  | "PERM_CHANGE"
  | "RISK_ADJUST"
  | "ACCOUNT_UPGRADE"
  | "API_POLL";

interface LogEntry {
  id: string;
  timestamp: string;
  userId: string;
  action: ActionType;
  metadata: string;
  status: LogStatus;
  isSystem?: boolean;
  isError?: boolean;
}

const LOGS: LogEntry[] = [
  {
    id: "1",
    timestamp: "2025-05-09 14:22:15.002",
    userId: "USR-89102-X",
    action: "SIGNAL_CREATED",
    metadata:
      "pair: BTC/USDT | direction: LONG | leverage: 20x | entry: 34,210.50",
    status: "success",
  },
  {
    id: "2",
    timestamp: "2025-05-09 14:21:44.981",
    userId: "USR-11204-Q",
    action: "WITHDRAWAL_REQ",
    metadata:
      "amount: 2.45 ETH | dest: 0x71C...49f | network: ERC20 | mfa_verified: true",
    status: "pending",
  },
  {
    id: "3",
    timestamp: "2025-05-09 14:20:01.222",
    userId: "SYSTEM_AUTO",
    action: "TRADE_EXECUTED",
    metadata:
      "order_id: TXN-8849 | qty: 1.2 BTC | slippage: 0.02% | fee: 0.001 BTC",
    status: "success",
    isSystem: true,
  },
  {
    id: "4",
    timestamp: "2025-05-09 14:18:55.109",
    userId: "USR-99012-P",
    action: "LOGIN_FAILED",
    metadata:
      "err_code: 403_INVALID_SIGNATURE | attempts: 3 | ip: 192.168.1.44",
    status: "error",
    isError: true,
  },
  {
    id: "5",
    timestamp: "2025-05-09 14:15:33.456",
    userId: "ADMIN-MSTR",
    action: "PERM_CHANGE",
    metadata:
      "target_user: USR-442 | action: ENABLE_API_KEY | scope: read_write",
    status: "success",
  },
  {
    id: "6",
    timestamp: "2025-05-09 14:12:11.002",
    userId: "SYSTEM_AUTO",
    action: "RISK_ADJUST",
    metadata:
      "asset: SOL | factor: 1.2x → 0.8x | reason: volatility_spike_alert",
    status: "success",
    isSystem: true,
  },
  {
    id: "7",
    timestamp: "2025-05-09 14:10:05.992",
    userId: "USR-33120-W",
    action: "ACCOUNT_UPGRADE",
    metadata: "tier: PRO → INSTITUTIONAL | billing: ANNUAL | promo_code: NONE",
    status: "success",
  },
  {
    id: "8",
    timestamp: "2025-05-09 14:08:44.221",
    userId: "SYSTEM_AUTO",
    action: "API_POLL",
    metadata: "exchange: BINANCE | latency: 42ms | status: ACTIVE",
    status: "success",
    isSystem: true,
  },
  {
    id: "9",
    timestamp: "2025-05-09 14:06:19.881",
    userId: "USR-44201-D",
    action: "WITHDRAWAL_REQ",
    metadata:
      "amount: $12,400 | dest: 0xA3F...B21 | network: TRC20 | mfa_verified: true",
    status: "pending",
  },
  {
    id: "10",
    timestamp: "2025-05-09 14:04:02.334",
    userId: "USR-71008-T",
    action: "SIGNAL_CREATED",
    metadata:
      "pair: ETH/USDT | direction: SHORT | leverage: 10x | entry: 1,820.40",
    status: "success",
  },
];

const ACTION_STYLES: Record<ActionType, { bg: string; text: string }> = {
  SIGNAL_CREATED: { bg: "bg-[#00311f]/40", text: "text-[#4edea3]" },
  WITHDRAWAL_REQ: { bg: "bg-[#5d001b]/30", text: "text-[#ffb2b9]" },
  TRADE_EXECUTED: { bg: "bg-[#171f33]", text: "text-[#c5c6ce]" },
  LOGIN_FAILED: { bg: "bg-[#93000a]/40", text: "text-[#ffb4ab]" },
  PERM_CHANGE: { bg: "bg-[#002371]/30", text: "text-[#b6c4ff]" },
  RISK_ADJUST: { bg: "bg-[#171f33]", text: "text-[#c5c6ce]" },
  ACCOUNT_UPGRADE: { bg: "bg-[#00311f]/40", text: "text-[#4edea3]" },
  API_POLL: { bg: "bg-[#171f33]", text: "text-[#8f9098]" },
};

const STATUS_ICON: Record<LogStatus, { icon: string; color: string }> = {
  success: { icon: "check_circle", color: "text-[#4edea3]" },
  pending: { icon: "pending", color: "text-[#b6c4ff]" },
  error: { icon: "report", color: "text-[#ffb2b9]" },
  warning: { icon: "warning", color: "text-[#ffb2b9]" },
};

type FilterTab = "All" | "Success" | "Pending" | "Error";

export default function LogsPage() {
  const [tab, setTab] = useState<FilterTab>("All");
  const [search, setSearch] = useState("");

  const filtered = LOGS.filter((l) => {
    const matchTab =
      tab === "All" ||
      (tab === "Success" && l.status === "success") ||
      (tab === "Pending" && l.status === "pending") ||
      (tab === "Error" && (l.status === "error" || l.status === "warning"));
    const matchSearch =
      l.userId.toLowerCase().includes(search.toLowerCase()) ||
      l.action.toLowerCase().includes(search.toLowerCase()) ||
      l.metadata.toLowerCase().includes(search.toLowerCase());
    return matchTab && matchSearch;
  });

  return (
    <div className="space-y-6 sm:space-y-8 max-w-[1600px] mx-auto">
      {/* Heading */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-3xl font-black text-[#dae2fd] font-[Manrope,sans-serif] tracking-tight">
            System Audit Log
          </h2>
          <p className="text-xs sm:text-sm text-[#8f9098] mt-1 max-w-md">
            Immutable ledger of all platform administrative and autonomous
            actions recorded in real-time.
          </p>
        </div>
        <div className="flex items-center gap-3 flex-shrink-0">
          <button className="flex items-center gap-2 px-4 py-2.5 bg-[#171f33] border border-white/5 text-[#c5c6ce] text-xs font-semibold rounded-xl hover:bg-[#222a3d] transition-all">
            <span className="material-symbols-outlined text-base">
              filter_list
            </span>
            <span className="hidden sm:inline">Filter Parameters</span>
          </button>
          <button className="flex items-center gap-2 px-4 py-2.5 bg-[#4edea3] text-[#003824] text-xs font-black rounded-xl hover:opacity-90 transition-all shadow-xl shadow-[#4edea3]/10">
            <span className="material-symbols-outlined text-base">
              download
            </span>
            <span className="hidden sm:inline">Export Ledger</span>
          </button>
        </div>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          {
            label: "Total Actions (24h)",
            value: "142,891",
            sub: "+12.4%",
            subColor: "text-[#4edea3]",
            accent: "border-[#4edea3]",
          },
          {
            label: "Failed Validations",
            value: "12",
            sub: "−2.1% today",
            subColor: "text-[#ffb2b9]",
            accent: "border-[#b6c4ff]",
          },
          {
            label: "Withdrawal Requests",
            value: "84",
            sub: "Awaiting approval",
            subColor: "text-[#8f9098]",
            accent: "border-[#ffb2b9]",
          },
          {
            label: "System Integrity",
            value: "99.9%",
            sub: "Optimal performance",
            subColor: "text-[#4edea3]",
            accent: "border-[#4edea3]",
          },
        ].map((s) => (
          <div
            key={s.label}
            className={`bg-[#131b2e] border border-white/5 border-l-4 ${s.accent} p-4 sm:p-6 rounded-2xl`}
          >
            <p className="text-[9px] text-[#8f9098] font-bold tracking-widest uppercase">
              {s.label}
            </p>
            <p className="text-2xl sm:text-3xl font-black font-mono text-[#dae2fd] mt-2">
              {s.value}
            </p>
            <p className={`text-[10px] mt-1 ${s.subColor}`}>{s.sub}</p>
          </div>
        ))}
      </div>

      {/* Ledger card */}
      <div className="bg-[#131b2e] border border-white/5 rounded-2xl overflow-hidden shadow-2xl flex flex-col">
        {/* Controls */}
        <div className="p-4 sm:p-5 border-b border-white/5 flex flex-col sm:flex-row items-start sm:items-center gap-3">
          {/* Filter tabs */}
          <div className="flex items-center gap-1 bg-[#060e20] p-1 rounded-xl">
            {(["All", "Success", "Pending", "Error"] as FilterTab[]).map(
              (f) => (
                <button
                  key={f}
                  onClick={() => setTab(f)}
                  className={`px-3 py-1.5 text-[11px] font-bold rounded-lg transition-all ${
                    tab === f
                      ? "bg-[#4edea3] text-[#003824] shadow-lg"
                      : "text-[#8f9098] hover:text-[#dae2fd]"
                  }`}
                >
                  {f}
                </button>
              ),
            )}
          </div>
          {/* Search */}
          <div className="relative flex-1 w-full sm:max-w-xs">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#44474d] text-base">
              search
            </span>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search UID, action, or metadata..."
              className="w-full bg-[#0b1326] border border-white/10 rounded-xl pl-9 pr-3 py-2 text-xs text-[#dae2fd] placeholder:text-[#44474d] focus:outline-none focus:ring-1 focus:ring-[#4edea3]/20 font-mono"
            />
          </div>
          <div className="sm:ml-auto flex items-center gap-2 text-[10px] text-[#8f9098]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#4edea3] animate-pulse" />
            Live Sync Active
          </div>
        </div>

        {/* Table — desktop */}
        <div className="overflow-x-auto">
          {/* Header */}
          <div className="hidden md:grid grid-cols-12 gap-3 px-5 py-3 bg-[#171f33]/60 border-b border-white/5 text-[9px] font-bold uppercase tracking-[0.15em] text-[#8f9098] min-w-[860px]">
            <div className="col-span-3">Timestamp</div>
            <div className="col-span-2">User ID</div>
            <div className="col-span-2">Action Type</div>
            <div className="col-span-4">Metadata / Details</div>
            <div className="col-span-1 text-right">Status</div>
          </div>

          {/* Rows */}
          <div className="divide-y divide-white/[0.03] font-mono text-[12px] min-w-0">
            {filtered.map((log) => {
              const actionStyle = ACTION_STYLES[log.action];
              const statusIcon = STATUS_ICON[log.status];
              return (
                <div
                  key={log.id}
                  className={`px-4 sm:px-5 py-3.5 transition-colors group
                    ${log.isError ? "bg-[#93000a]/5 hover:bg-[#93000a]/10" : "hover:bg-[#171f33]/40"}
                  `}
                >
                  {/* Mobile layout */}
                  <div className="md:hidden flex flex-col gap-1.5">
                    <div className="flex items-center justify-between">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-black ${actionStyle.bg} ${actionStyle.text}`}
                      >
                        {log.action}
                      </span>
                      <span
                        className={`material-symbols-outlined text-lg ${statusIcon.color}`}
                        style={
                          log.status === "success"
                            ? {
                                fontVariationSettings: "'FILL' 1",
                              }
                            : undefined
                        }
                      >
                        {statusIcon.icon}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span
                        className={`text-xs font-bold ${log.isSystem ? "text-[#8f9098]" : log.isError ? "text-[#ffb2b9]" : "text-[#b6c4ff]"}`}
                      >
                        {log.userId}
                      </span>
                      <span className="text-[#44474d]">·</span>
                      <span className="text-[10px] text-[#44474d]">
                        {log.timestamp.split(" ")[1]}
                      </span>
                    </div>
                    <p className="text-[11px] text-[#8f9098] truncate">
                      {log.metadata}
                    </p>
                  </div>

                  {/* Desktop layout */}
                  <div className="hidden md:grid grid-cols-12 gap-3 items-center min-w-[860px]">
                    <div className="col-span-3 text-[#44474d] text-[11px]">
                      {log.timestamp}
                    </div>
                    <div
                      className={`col-span-2 font-bold text-[11px] ${log.isSystem ? "text-[#8f9098]" : log.isError ? "text-[#ffb2b9]" : "text-[#b6c4ff]"}`}
                    >
                      {log.userId}
                    </div>
                    <div className="col-span-2">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-black ${actionStyle.bg} ${actionStyle.text}`}
                      >
                        {log.action}
                      </span>
                    </div>
                    <div className="col-span-4 text-[#c5c6ce] text-[11px] truncate">
                      {log.metadata}
                    </div>
                    <div className="col-span-1 flex justify-end">
                      <span
                        className={`material-symbols-outlined text-lg ${statusIcon.color}`}
                        style={
                          log.status === "success"
                            ? { fontVariationSettings: "'FILL' 1" }
                            : undefined
                        }
                      >
                        {statusIcon.icon}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}

            {filtered.length === 0 && (
              <div className="py-16 text-center">
                <span className="material-symbols-outlined text-4xl text-[#44474d]">
                  manage_search
                </span>
                <p className="text-sm text-[#8f9098] mt-3 font-sans">
                  No log entries found.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Status bar */}
        <div className="px-4 sm:px-5 py-3 bg-[#171f33]/60 border-t border-white/5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-[10px] text-[#8f9098] font-mono">
          <div className="flex items-center gap-4 flex-wrap">
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#4edea3] animate-pulse" />
              <span>Live Sync Active</span>
            </div>
            <span>
              Showing{" "}
              <span className="text-[#dae2fd] font-bold">
                {filtered.length}
              </span>{" "}
              of <span className="text-[#dae2fd] font-bold">2,491,029</span>{" "}
              records
            </span>
          </div>
          <div className="flex items-center gap-4">
            <span>Buffer: 12%</span>
            <span className="hidden sm:inline text-[#44474d]">|</span>
            <span className="hidden sm:inline">Node: AWS-US-EAST-1</span>
          </div>
        </div>
      </div>

      {/* Insights row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Security Insight */}
        <div className="relative bg-[#131b2e] border border-white/5 rounded-2xl p-6 overflow-hidden group">
          <div className="absolute -right-4 -bottom-4 opacity-5 group-hover:opacity-10 transition-opacity">
            <span
              className="material-symbols-outlined text-8xl text-[#dae2fd]"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              security
            </span>
          </div>
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-lg bg-[#5d001b]/30 flex items-center justify-center">
              <span className="material-symbols-outlined text-[#ffb2b9] text-base">
                gpp_bad
              </span>
            </div>
            <h3 className="text-sm font-bold text-[#dae2fd] font-[Manrope,sans-serif]">
              Security Insight
            </h3>
          </div>
          <p className="text-xs text-[#8f9098] leading-relaxed">
            System detected{" "}
            <span className="text-[#ffb2b9] font-semibold">
              3 failed login attempts
            </span>{" "}
            from a high-risk IP range in Tokyo. Automated geofencing has been
            suggested for USR-99012-P.
          </p>
          <button className="mt-4 text-[10px] text-[#ffb2b9] font-bold flex items-center gap-1 hover:underline">
            Review threat{" "}
            <span className="material-symbols-outlined text-xs">
              arrow_forward
            </span>
          </button>
        </div>

        {/* Network Throughput */}
        <div className="lg:col-span-2 bg-[#131b2e] border border-white/5 rounded-2xl p-6 flex flex-col sm:flex-row items-start sm:items-center gap-6">
          <div className="flex-1 w-full">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg bg-[#00311f]/40 flex items-center justify-center">
                <span className="material-symbols-outlined text-[#4edea3] text-base">
                  network_check
                </span>
              </div>
              <h3 className="text-sm font-bold text-[#dae2fd] font-[Manrope,sans-serif]">
                Network Throughput
              </h3>
            </div>
            <div className="h-2 bg-[#060e20] rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-[#b6c4ff] to-[#4edea3] w-[78%] rounded-full" />
            </div>
            <div className="flex justify-between mt-2 text-[10px] text-[#8f9098] font-mono">
              <span>Ingress: 4.2 GB/s</span>
              <span className="text-[#dae2fd] font-bold">78% capacity</span>
              <span>Egress: 2.1 GB/s</span>
            </div>

            {/* Mini stats */}
            <div className="mt-5 grid grid-cols-3 gap-3">
              {[
                { label: "Uptime", value: "99.98%" },
                { label: "Avg Latency", value: "18ms" },
                { label: "Active Nodes", value: "12 / 12" },
              ].map((s) => (
                <div
                  key={s.label}
                  className="bg-[#0b1326] rounded-xl p-3 border border-white/5"
                >
                  <p className="text-[9px] text-[#8f9098] uppercase tracking-widest">
                    {s.label}
                  </p>
                  <p className="text-sm font-black font-mono text-[#dae2fd] mt-1">
                    {s.value}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="hidden sm:flex flex-col items-center gap-2 flex-shrink-0">
            <div className="w-14 h-14 rounded-2xl bg-[#00311f]/40 border border-[#4edea3]/20 flex items-center justify-center">
              <span className="material-symbols-outlined text-[#4edea3] text-2xl">
                bolt
              </span>
            </div>
            <p className="text-[9px] text-[#8f9098] uppercase tracking-widest text-center">
              Node Latency
            </p>
            <p className="text-2xl font-black font-mono text-[#4edea3]">18ms</p>
          </div>
        </div>
      </div>
    </div>
  );
}
