"use client";

import { useState, useEffect } from "react";
import { authAPI, UserManagementUser } from "@/lib/api/client";

type UserStatus = "Active" | "Offline" | "Banned";
type UserRole = "Pro Trader" | "Copy Trader";

interface User {
  id: string;
  _id: string;
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
  email: string;
  firstName?: string;
  lastName?: string;
  hasOnboarded?: boolean;
}

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

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

function getRandomColor(index: number): string {
  const colors = [
    "bg-[#002371]/30 text-[#b6c4ff] border-[#b6c4ff]/10",
    "bg-[#5d001b]/20 text-[#ffb2b9] border-[#ffb2b9]/10",
    "bg-[#171f33] text-[#8f9098] border-white/5",
    "bg-[#00311f]/30 text-[#4edea3] border-[#4edea3]/10",
  ];
  return colors[index % colors.length];
}

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
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [stats, setStats] = useState({
    totalUsers: "0",
    activeNow: "0",
    pendingKYC: "0",
    bannedAccounts: "0",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalUsersCount, setTotalUsersCount] = useState(0);
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  const itemsPerPage = 10;

  // Fetch users from API
  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const roleParam = filter === "All Users" ? undefined : filter;
      const response = await authAPI.getAllUsers({
        page: currentPage,
        limit: itemsPerPage,
        search: search || undefined,
        role: roleParam,
      });

      if (response.status === "success" && response.data) {
        const formattedUsers: User[] = response.data.users.map(
          (user, index) => ({
            id: user._id || user.id,
            _id: user._id || user.id,
            uid: user.uid || user._id?.slice(-7) || `UID${index + 1}`,
            name:
              user.name ||
              `${user.firstName || ""} ${user.lastName || ""}`.trim() ||
              user.email,
            initials: user.initials || getInitials(user.name || user.email),
            role: (user.role === "CopyTrader"
              ? "Copy Trader"
              : user.role || "Copy Trader") as UserRole,
            status: user.status || "Offline",
            trades: user.trades || "0 Trades",
            lastActive:
              user.lastActive ||
              new Date(user.updatedAt || Date.now()).toLocaleDateString(),
            location: user.location || "Unknown",
            roi: user.roi || "0%",
            roiPositive: user.roiPositive ?? true,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            hasOnboarded: user.hasOnboarded,
          }),
        );

        setUsers(formattedUsers);
        setTotalUsersCount(response.data.total);
        setTotalPages(Math.ceil(response.data.total / itemsPerPage));
      }
    } catch (err) {
      console.error("Failed to fetch users:", err);
      setError(err instanceof Error ? err.message : "Failed to load users");
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  // Fetch dashboard stats
  const fetchStats = async () => {
    try {
      const statsData = await authAPI.getDashboardStats();
      setStats({
        totalUsers: statsData.totalUsers.toLocaleString(),
        activeNow: statsData.activeNow.toLocaleString(),
        pendingKYC: statsData.pendingKYC.toLocaleString(),
        bannedAccounts: statsData.bannedAccounts.toLocaleString(),
      });
    } catch (err) {
      console.error("Failed to fetch stats:", err);
    }
  };

  // Handle user actions
  const handleBanUser = async (userId: string) => {
    if (!confirm("Are you sure you want to ban this user?")) return;
    setActionLoading(userId);
    try {
      await authAPI.banUser(userId);
      await fetchUsers();
      await fetchStats();
    } catch (err) {
      console.error("Failed to ban user:", err);
      alert(err instanceof Error ? err.message : "Failed to ban user");
    } finally {
      setActionLoading(null);
    }
  };

  const handleUnbanUser = async (userId: string) => {
    if (!confirm("Are you sure you want to unban this user?")) return;
    setActionLoading(userId);
    try {
      await authAPI.unbanUser(userId);
      await fetchUsers();
      await fetchStats();
    } catch (err) {
      console.error("Failed to unban user:", err);
      alert(err instanceof Error ? err.message : "Failed to unban user");
    } finally {
      setActionLoading(null);
    }
  };

  const handleUpdateRole = async (userId: string, newRole: UserRole) => {
    if (!confirm(`Change user role to ${newRole}?`)) return;
    setActionLoading(userId);
    try {
      await authAPI.updateUserRole(userId, newRole);
      await fetchUsers();
    } catch (err) {
      console.error("Failed to update role:", err);
      alert(err instanceof Error ? err.message : "Failed to update role");
    } finally {
      setActionLoading(null);
    }
  };

  // Debounced search
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (currentPage === 1) {
        fetchUsers();
      } else {
        setCurrentPage(1);
      }
    }, 500);
    return () => clearTimeout(timeoutId);
  }, [search, filter]);

  useEffect(() => {
    fetchUsers();
  }, [currentPage]);

  useEffect(() => {
    fetchStats();
  }, []);

  const paginate = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="space-y-6 sm:space-y-8 max-w-[1600px] mx-auto">
      {/* Heading */}
      <div>
        <h2 className="text-xl sm:text-2xl font-black text-[#dae2fd] font-[Manrope,sans-serif]">
          User Management
        </h2>
        <p className="text-xs text-[#8f9098] mt-1">
          Manage all platform users · {totalUsersCount} total users
        </p>
      </div>

      {/* Mini stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <MiniStat
          label="Total Users"
          value={stats.totalUsers}
          icon="groups"
          sub="↑ +4.2% this week"
        />
        <MiniStat
          label="Active Now"
          value={stats.activeNow}
          icon="sensors"
          sub="Live sessions"
        />
        <MiniStat
          label="Pending KYC"
          value={stats.pendingKYC}
          icon="verified_user"
          sub="⚠ Needs review"
          subColor="text-[#ffb2b9]"
        />
        <MiniStat
          label="Banned Accounts"
          value={stats.bannedAccounts}
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
                  onClick={() => {
                    setFilter(f);
                    setCurrentPage(1);
                  }}
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
              {loading ? (
                <tr>
                  <td colSpan={7} className="px-4 sm:px-6 py-16 text-center">
                    <div className="flex flex-col items-center justify-center gap-3">
                      <div className="w-8 h-8 border-2 border-[#4edea3] border-t-transparent rounded-full animate-spin" />
                      <p className="text-sm text-[#8f9098]">Loading users...</p>
                    </div>
                  </td>
                </tr>
              ) : error ? (
                <tr>
                  <td colSpan={7} className="px-4 sm:px-6 py-16 text-center">
                    <div className="flex flex-col items-center gap-3">
                      <span className="material-symbols-outlined text-4xl text-[#ffb4ab]">
                        error
                      </span>
                      <p className="text-sm text-[#ffb4ab]">{error}</p>
                      <button
                        onClick={fetchUsers}
                        className="px-4 py-2 bg-[#171f33] text-[#dae2fd] text-xs font-bold rounded-lg hover:bg-[#222a3d]"
                      >
                        Retry
                      </button>
                    </div>
                  </td>
                </tr>
              ) : users.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-4 sm:px-6 py-16 text-center">
                    <span className="material-symbols-outlined text-4xl text-[#44474d]">
                      manage_search
                    </span>
                    <p className="text-sm text-[#8f9098] mt-3">
                      No users found.
                    </p>
                  </td>
                </tr>
              ) : (
                users.map((user, index) => (
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
                          className={`w-9 h-9 rounded-full flex items-center justify-center border flex-shrink-0 ${getRandomColor(index)}`}
                        >
                          <span className="text-xs font-black">
                            {user.initials}
                          </span>
                        </div>
                        <div>
                          <p
                            className={`text-sm font-bold text-[#dae2fd] group-hover:text-[#4edea3] transition-colors ${
                              user.status === "Banned" ? "line-through" : ""
                            }`}
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
                      <select
                        value={user.role}
                        onChange={(e) =>
                          handleUpdateRole(user.id, e.target.value as UserRole)
                        }
                        disabled={actionLoading === user.id}
                        className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold cursor-pointer ${roleStyle[user.role]} ${
                          actionLoading === user.id
                            ? "opacity-50 cursor-wait"
                            : ""
                        }`}
                      >
                        <option value="Pro Trader">Pro Trader</option>
                        <option value="Copy Trader">Copy Trader</option>
                      </select>
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
                        className={`text-xs font-bold ${
                          user.roiPositive ? "text-[#4edea3]" : "text-[#ffb4ab]"
                        }`}
                      >
                        {user.roi}
                      </p>
                    </td>

                    {/* Last Active */}
                    <td className="px-4 sm:px-6 py-4">
                      <p className="text-xs text-[#dae2fd]">
                        {user.lastActive}
                      </p>
                      <p className="text-[10px] text-[#8f9098]">
                        {user.location}
                      </p>
                    </td>

                    {/* Actions */}
                    <td className="px-4 sm:px-6 py-4">
                      <div className="flex items-center justify-center gap-1.5">
                        {user.status === "Banned" ? (
                          <button
                            onClick={() => handleUnbanUser(user.id)}
                            disabled={actionLoading === user.id}
                            className="px-3 py-1 bg-[#222a3d] border border-white/10 text-[10px] font-bold rounded-lg text-[#dae2fd] hover:bg-[#2d3449] transition-all disabled:opacity-50"
                          >
                            {actionLoading === user.id ? "..." : "Restore"}
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
                              onClick={() => handleBanUser(user.id)}
                              disabled={actionLoading === user.id}
                              title="Ban"
                              className="p-1.5 hover:bg-[#93000a]/20 rounded-lg text-[#8f9098] hover:text-[#ffb4ab] transition-all disabled:opacity-50"
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
                ))
              )}
            </tbody>
          </table>

          {!loading && !error && users.length > 0 && (
            <div className="px-4 sm:px-6 py-4 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-3">
              <p className="text-xs text-[#8f9098]">
                Showing{" "}
                <span className="text-[#dae2fd] font-bold">
                  {(currentPage - 1) * itemsPerPage + 1}–
                  {Math.min(currentPage * itemsPerPage, totalUsersCount)}
                </span>{" "}
                of{" "}
                <span className="text-[#dae2fd] font-bold">
                  {totalUsersCount}
                </span>{" "}
                users
              </p>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => paginate(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="p-1.5 text-[#8f9098] disabled:opacity-30 hover:text-[#4edea3] transition-colors"
                >
                  <span className="material-symbols-outlined text-lg">
                    chevron_left
                  </span>
                </button>
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  let pageNum: number;
                  if (totalPages <= 5) {
                    pageNum = i + 1;
                  } else if (currentPage <= 3) {
                    pageNum = i + 1;
                  } else if (currentPage >= totalPages - 2) {
                    pageNum = totalPages - 4 + i;
                  } else {
                    pageNum = currentPage - 2 + i;
                  }
                  return (
                    <button
                      key={pageNum}
                      onClick={() => paginate(pageNum)}
                      className={`w-8 h-8 flex items-center justify-center text-xs font-bold rounded-lg transition-colors ${
                        currentPage === pageNum
                          ? "bg-[#4edea3] text-[#003824]"
                          : "text-[#8f9098] hover:bg-[#171f33]"
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                })}
                {totalPages > 5 && currentPage < totalPages - 2 && (
                  <>
                    <span className="text-[#44474d] px-1 text-xs">...</span>
                    <button
                      onClick={() => paginate(totalPages)}
                      className="w-8 h-8 flex items-center justify-center text-xs font-bold rounded-lg text-[#8f9098] hover:bg-[#171f33] transition-colors"
                    >
                      {totalPages}
                    </button>
                  </>
                )}
                <button
                  onClick={() => paginate(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="p-1.5 text-[#8f9098] disabled:opacity-30 hover:text-[#4edea3] transition-colors"
                >
                  <span className="material-symbols-outlined text-lg">
                    chevron_right
                  </span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
