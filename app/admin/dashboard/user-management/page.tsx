"use client";

import { useState } from "react";

type UserStatus = "Active" | "Offline" | "Banned";
type UserRole = "Pro Trader" | "Copy Trader";

interface User {
  id: number;
  uid: string;
  name: string;
  initials: string;
  role: UserRole;
  status: UserStatus;
  trades: string;
  lastActive: string;
  location: string;
  roi?: string;
  roiPositive?: boolean;
}

const USERS: User[] = [
  {
    id: 1,
    uid: "8429103",
    name: "Alex Sovereign",
    initials: "AS",
    role: "Pro Trader",
    status: "Active",
    trades: "412 Trades",
    lastActive: "2 mins ago",
    location: "IP: 192.168.1.1",
    roi: "+14.2% ROI",
    roiPositive: true,
  },
  {
    id: 2,
    uid: "7721045",
    name: "Elena Markov",
    initials: "EM",
    role: "Copy Trader",
    status: "Offline",
    trades: "12 Active Follows",
    lastActive: "14 hours ago",
    location: "London, UK",
    roi: "+3.2% Profit",
    roiPositive: true,
  },
  {
    id: 3,
    uid: "9910234",
    name: "Julian Reed",
    initials: "JR",
    role: "Pro Trader",
    status: "Banned",
    trades: "Violation Flagged",
    lastActive: "3 months ago",
    location: "TOS Violation",
    roi: "Locked",
    roiPositive: false,
  },
  {
    id: 4,
    uid: "5542109",
    name: "Sasha Knight",
    initials: "SK",
    role: "Pro Trader",
    status: "Active",
    trades: "89 Trades",
    lastActive: "Online",
    location: "Mobile Terminal",
    roi: "+21.5% ROI",
    roiPositive: true,
  },
  {
    id: 5,
    uid: "3381920",
    name: "Daniel Osei",
    initials: "DO",
    role: "Copy Trader",
    status: "Active",
    trades: "5 Active Follows",
    lastActive: "Just now",
    location: "Lagos, NG",
    roi: "+1.8% Profit",
    roiPositive: true,
  },
  {
    id: 6,
    uid: "6613409",
    name: "Miriam Chen",
    initials: "MC",
    role: "Pro Trader",
    status: "Offline",
    trades: "201 Trades",
    lastActive: "2 days ago",
    location: "Singapore",
    roi: "+9.1% ROI",
    roiPositive: true,
  },
];

type Filter = "All Users" | "Pro Trader" | "Copy Trader";

const statusStyle: Record<UserStatus, string> = {
  Active: "text-[#4edea3]",
  Offline: "text-[#8f9098]",
  Banned: "text-[#ffb4ab]",
};
const statusDot: Record<UserStatus, string> = {
  Active: "bg-[#4edea3] animate-pulse",
  Offline: "bg-[#8f9098]",
  Banned: "bg-[#ffb4ab]",
};
const roleStyle: Record<UserRole, string> = {
  "Pro Trader": "bg-[#00311f]/40 text-[#4edea3] border border-[#4edea3]/20",
  "Copy Trader": "bg-[#002371]/40 text-[#b6c4ff] border border-[#b6c4ff]/20",
};
const initialsRing: Record<number, string> = {
  1: "bg-[#002371]/30 text-[#b6c4ff] border-[#b6c4ff]/10",
  2: "bg-[#5d001b]/20 text-[#ffb2b9] border-[#ffb2b9]/10",
  3: "bg-[#171f33] text-[#8f9098] border-white/5",
  4: "bg-[#00311f]/30 text-[#4edea3] border-[#4edea3]/10",
  5: "bg-[#00311f]/30 text-[#4edea3] border-[#4edea3]/10",
  6: "bg-[#002371]/30 text-[#b6c4ff] border-[#b6c4ff]/10",
};

/* ── Stat Card ── */
function MiniStat({
  label,
  value,
  icon,
  sub,
  subColor = "text-[#4edea3]",
}: {
  label: string;
  value: string;
  icon: string;
  sub: string;
  subColor?: string;
}) {
  return (
    <div className="bg-[#131b2e] border border-white/5 p-4 sm:p-5 rounded-2xl relative overflow-hidden group">
      <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
        <span className="material-symbols-outlined text-4xl text-[#dae2fd]">
          {icon}
        </span>
      </div>
      <p className="text-[9px] text-[#8f9098] font-bold tracking-widest uppercase">
        {label}
      </p>
      <h3 className="text-2xl font-black text-[#dae2fd] mt-1.5 font-[Manrope,sans-serif]">
        {value}
      </h3>
      <p className={`text-[10px] mt-1 ${subColor}`}>{sub}</p>
    </div>
  );
}

export default function UserManagementPage() {
  const [filter, setFilter] = useState<Filter>("All Users");
  const [search, setSearch] = useState("");

  const filtered = USERS.filter((u) => {
    const matchRole = filter === "All Users" || u.role === filter;
    const matchSearch =
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.uid.includes(search);
    return matchRole && matchSearch;
  });

  return (
    <div className="space-y-6 sm:space-y-8 max-w-[1600px] mx-auto">
      {/* Heading */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-[#dae2fd] font-[Manrope,sans-serif]">
            User Management
          </h2>
          <p className="text-xs text-[#8f9098] mt-1">
            Manage all platform users · {USERS.length} shown
          </p>
        </div>
        <button className="self-start sm:self-auto flex items-center gap-2 px-4 py-2.5 bg-[#4edea3] text-[#003824] text-xs font-black rounded-xl hover:opacity-90 transition-all shadow-xl shadow-[#4edea3]/10">
          <span className="material-symbols-outlined text-base">
            person_add
          </span>
          Add User
        </button>
      </div>

      {/* Mini stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <MiniStat
          label="Total Users"
          value="12,842"
          icon="groups"
          sub="↑ +4.2% this week"
        />
        <MiniStat
          label="Active Now"
          value="4,201"
          icon="sensors"
          sub="Live sessions"
        />
        <MiniStat
          label="Pending KYC"
          value="48"
          icon="verified_user"
          sub="⚠ Needs review"
          subColor="text-[#ffb2b9]"
        />
        <MiniStat
          label="Banned Accounts"
          value="134"
          icon="block"
          sub="↓ −2 today"
          subColor="text-[#8f9098]"
        />
      </div>

      {/* Table card */}
      <div className="bg-[#131b2e] border border-white/5 rounded-2xl overflow-hidden shadow-2xl">
        {/* Controls */}
        <div className="p-4 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-white/5">
          {/* Filter tabs */}
          <div className="flex items-center gap-1 bg-[#060e20] p-1 rounded-xl">
            {(["All Users", "Pro Trader", "Copy Trader"] as Filter[]).map(
              (f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-3 py-1.5 text-[11px] font-bold rounded-lg transition-all whitespace-nowrap ${
                    filter === f
                      ? "bg-[#4edea3] text-[#003824] shadow-lg"
                      : "text-[#8f9098] hover:text-[#dae2fd]"
                  }`}
                >
                  {f}
                </button>
              ),
            )}
          </div>

          {/* Search + Filter btn */}
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <div className="relative flex-1 sm:flex-initial sm:w-56">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#44474d] text-base">
                search
              </span>
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search name or UID..."
                className="w-full bg-[#0b1326] border border-white/10 rounded-xl pl-9 pr-3 py-2 text-xs text-[#dae2fd] placeholder:text-[#44474d] focus:outline-none focus:ring-1 focus:ring-[#4edea3]/20"
              />
            </div>
            <button className="flex items-center gap-1.5 px-3 py-2 bg-[#171f33] border border-white/5 text-[#c5c6ce] text-xs font-semibold rounded-xl hover:bg-[#222a3d] transition-all">
              <span className="material-symbols-outlined text-base">
                filter_alt
              </span>
              <span className="hidden sm:inline">Filter</span>
            </button>
          </div>
        </div>

        {/* Table — scrollable on mobile */}
        <div className="overflow-x-auto">
          <table className="w-full text-left min-w-[640px]">
            <thead>
              <tr className="bg-[#171f33]/60 text-[9px] uppercase tracking-[0.15em] text-[#8f9098] font-bold border-b border-white/5">
                <th className="px-4 sm:px-6 py-4">User Identity</th>
                <th className="px-4 sm:px-6 py-4">Role</th>
                <th className="px-4 sm:px-6 py-4">Status</th>
                <th className="px-4 sm:px-6 py-4">Trades / Activity</th>
                <th className="px-4 sm:px-6 py-4">Performance</th>
                <th className="px-4 sm:px-6 py-4">Last Active</th>
                <th className="px-4 sm:px-6 py-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filtered.map((user) => (
                <tr
                  key={user.id}
                  className={`transition-colors group ${
                    user.status === "Banned"
                      ? "bg-[#93000a]/5 hover:bg-[#93000a]/10 opacity-70"
                      : "hover:bg-[#171f33]/40"
                  }`}
                >
                  {/* Identity */}
                  <td className="px-4 sm:px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-9 h-9 rounded-full flex items-center justify-center border flex-shrink-0 ${initialsRing[user.id] ?? "bg-[#171f33] text-[#8f9098] border-white/5"}`}
                      >
                        <span className="text-xs font-black">
                          {user.initials}
                        </span>
                      </div>
                      <div>
                        <p
                          className={`text-sm font-bold text-[#dae2fd] group-hover:text-[#4edea3] transition-colors ${user.status === "Banned" ? "line-through" : ""}`}
                        >
                          {user.name}
                        </p>
                        <p className="text-[10px] text-[#8f9098] font-mono">
                          UID: {user.uid}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* Role */}
                  <td className="px-4 sm:px-6 py-4">
                    <span
                      className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold ${roleStyle[user.role]}`}
                    >
                      {user.role}
                    </span>
                  </td>

                  {/* Status */}
                  <td className="px-4 sm:px-6 py-4">
                    <div
                      className={`flex items-center gap-1.5 text-[11px] font-semibold ${statusStyle[user.status]}`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${statusDot[user.status]}`}
                      />
                      {user.status}
                    </div>
                  </td>

                  {/* Trades */}
                  <td className="px-4 sm:px-6 py-4">
                    <p className="text-xs text-[#dae2fd] font-medium">
                      {user.trades}
                    </p>
                  </td>

                  {/* Performance */}
                  <td className="px-4 sm:px-6 py-4">
                    <p
                      className={`text-xs font-bold ${user.roiPositive ? "text-[#4edea3]" : "text-[#ffb4ab]"}`}
                    >
                      {user.roi}
                    </p>
                  </td>

                  {/* Last Active */}
                  <td className="px-4 sm:px-6 py-4">
                    <p className="text-xs text-[#dae2fd]">{user.lastActive}</p>
                    <p className="text-[10px] text-[#8f9098]">
                      {user.location}
                    </p>
                  </td>

                  {/* Actions */}
                  <td className="px-4 sm:px-6 py-4">
                    <div className="flex items-center justify-center gap-1.5">
                      {user.status === "Banned" ? (
                        <button className="px-3 py-1 bg-[#222a3d] border border-white/10 text-[10px] font-bold rounded-lg text-[#dae2fd] hover:bg-[#2d3449] transition-all">
                          Restore
                        </button>
                      ) : (
                        <>
                          <button
                            title="Edit"
                            className="p-1.5 hover:bg-[#171f33] rounded-lg text-[#8f9098] hover:text-[#4edea3] transition-all"
                          >
                            <span className="material-symbols-outlined text-lg">
                              edit_note
                            </span>
                          </button>
                          <button
                            title="View"
                            className="p-1.5 hover:bg-[#171f33] rounded-lg text-[#8f9098] hover:text-[#b6c4ff] transition-all"
                          >
                            <span className="material-symbols-outlined text-lg">
                              open_in_new
                            </span>
                          </button>
                          <button
                            title="Ban"
                            className="p-1.5 hover:bg-[#93000a]/20 rounded-lg text-[#8f9098] hover:text-[#ffb4ab] transition-all"
                          >
                            <span className="material-symbols-outlined text-lg">
                              block
                            </span>
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filtered.length === 0 && (
            <div className="py-16 text-center">
              <span className="material-symbols-outlined text-4xl text-[#44474d]">
                manage_search
              </span>
              <p className="text-sm text-[#8f9098] mt-3">No users found.</p>
            </div>
          )}
        </div>

        {/* Pagination */}
        <div className="px-4 sm:px-6 py-4 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-[#8f9098]">
            Showing{" "}
            <span className="text-[#dae2fd] font-bold">
              1–{filtered.length}
            </span>{" "}
            of <span className="text-[#dae2fd] font-bold">12,842</span> users
          </p>
          <div className="flex items-center gap-1">
            <button
              disabled
              className="p-1.5 text-[#8f9098] disabled:opacity-30"
            >
              <span className="material-symbols-outlined text-lg">
                chevron_left
              </span>
            </button>
            {[1, 2, 3].map((n) => (
              <button
                key={n}
                className={`w-8 h-8 flex items-center justify-center text-xs font-bold rounded-lg transition-colors ${
                  n === 1
                    ? "bg-[#4edea3] text-[#003824]"
                    : "text-[#8f9098] hover:bg-[#171f33]"
                }`}
              >
                {n}
              </button>
            ))}
            <span className="text-[#44474d] px-1 text-xs">...</span>
            <button className="w-8 h-8 flex items-center justify-center text-xs font-bold rounded-lg text-[#8f9098] hover:bg-[#171f33] transition-colors">
              257
            </button>
            <button className="p-1.5 text-[#8f9098] hover:text-[#4edea3] transition-colors">
              <span className="material-symbols-outlined text-lg">
                chevron_right
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
