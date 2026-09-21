"use client";

import { useCallback, useEffect, useState } from "react";
import type { GetUserResponse, UserManagementUser } from "@/lib";
import { adminUserService } from "@/lib/api/admin";

type UserStatus = "active" | "suspended" | "waitlist";
type UserRole = "ProTrader" | "CopyTrader";
type RoleFilter = "all" | UserRole;
type StatusFilter = "all" | UserStatus;

interface TableUser extends UserManagementUser {
  id: string;
  name: string;
  initials: string;
  role: UserRole;
  status: UserStatus;
  activeTradeCount: number;
  lastActivityAt: string | null;
}

const roleFilters: Array<{ value: RoleFilter; label: string }> = [
  { value: "all", label: "All Users" },
  { value: "ProTrader", label: "Pro Trader" },
  { value: "CopyTrader", label: "Copy Trader" },
];

const statusStyle: Record<UserStatus, string> = {
  active: "text-[#4edea3]",
  suspended: "text-[#ffb4ab]",
  waitlist: "text-amber-300",
};

const statusDot: Record<UserStatus, string> = {
  active: "bg-[#4edea3]",
  suspended: "bg-[#ffb4ab]",
  waitlist: "bg-amber-300",
};

const roleStyle: Record<UserRole, string> = {
  ProTrader: "bg-[#00311f]/40 text-[#4edea3] border-[#4edea3]/20",
  CopyTrader: "bg-[#002371]/40 text-[#b6c4ff] border-[#b6c4ff]/20",
};

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

function formatDate(value?: string | null): string {
  if (!value) return "No trade activity";
  return new Intl.DateTimeFormat(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}

function formatRole(role?: string): string {
  return role === "ProTrader" ? "Pro Trader" : "Copy Trader";
}

function MiniStat({
  label,
  value,
  icon,
  sub,
}: {
  label: string;
  value: number;
  icon: string;
  sub: string;
}) {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/5 bg-[#131b2e] p-4 sm:p-5">
      <span className="material-symbols-outlined absolute right-3 top-3 text-4xl text-[#dae2fd]/10">
        {icon}
      </span>
      <p className="text-[9px] font-bold uppercase tracking-widest text-[#8f9098]">
        {label}
      </p>
      <h3 className="mt-1.5 text-2xl font-black text-[#dae2fd]">{value}</h3>
      <p className="mt-1 text-[10px] text-[#8f9098]">{sub}</p>
    </div>
  );
}

function UserDetailsModal({
  details,
  loading,
  error,
  actionLoading,
  onClose,
  onToggleStatus,
}: {
  details: GetUserResponse["data"] | null;
  loading: boolean;
  error: string | null;
  actionLoading: boolean;
  onClose: () => void;
  onToggleStatus: (user: UserManagementUser) => void;
}) {
  const user = details?.user;
  const status = (user?.status || "waitlist") as UserStatus;
  const name = user
    ? `${user.firstName || ""} ${user.lastName || ""}`.trim() || user.email
    : "User details";

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
      onMouseDown={(event) => event.target === event.currentTarget && onClose()}
    >
      <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl border border-white/10 bg-[#131b2e] shadow-2xl">
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-white/5 bg-[#131b2e] px-5 py-4">
          <div>
            <h3 className="text-lg font-black text-[#dae2fd]">{name}</h3>
            {user && <p className="text-xs text-[#8f9098]">{user.email}</p>}
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close user details"
            className="rounded-lg p-2 text-[#8f9098] hover:bg-white/5 hover:text-white"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {loading ? (
          <div className="flex min-h-72 items-center justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#4edea3] border-t-transparent" />
          </div>
        ) : error ? (
          <div className="p-10 text-center text-sm text-[#ffb4ab]">{error}</div>
        ) : user && details ? (
          <div className="space-y-6 p-5 sm:p-6">
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {[
                ["Custom user ID", user.traderID || "Not assigned"],
                ["Role", formatRole(user.role)],
                ["Status", status],
                ["Joined", formatDate(user.createdAt)],
                ["Last trade activity", formatDate(details.tradeStats.lastActivityAt)],
                ["Email verified", user.isVerified ? "Yes" : "No"],
              ].map(([label, value]) => (
                <div key={label} className="rounded-xl bg-[#0b1326] p-3">
                  <p className="text-[9px] font-bold uppercase tracking-wider text-[#8f9098]">
                    {label}
                  </p>
                  <p className="mt-1 break-words text-sm font-semibold capitalize text-[#dae2fd]">
                    {String(value)}
                  </p>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
              {[
                ["Total trades", details.tradeStats.totalTrades],
                ["Active", details.tradeStats.activeTrades],
                ["Closed", details.tradeStats.closedTrades],
                ["Profitable", details.tradeStats.profitableTrades],
                ["Losing", details.tradeStats.losingTrades],
              ].map(([label, value]) => (
                <div key={label} className="rounded-xl border border-white/5 bg-[#171f33] p-3 text-center">
                  <p className="text-xl font-black text-[#dae2fd]">{value}</p>
                  <p className="text-[9px] uppercase tracking-wide text-[#8f9098]">{label}</p>
                </div>
              ))}
            </div>

            <div>
              <h4 className="mb-3 text-sm font-bold text-[#dae2fd]">Recent trade activity</h4>
              {details.recentTrades.length ? (
                <div className="overflow-x-auto rounded-xl border border-white/5">
                  <table className="w-full min-w-[520px] text-left text-xs">
                    <thead className="bg-[#0b1326] text-[9px] uppercase tracking-wider text-[#8f9098]">
                      <tr>
                        <th className="px-3 py-2.5">Pair</th>
                        <th className="px-3 py-2.5">Direction</th>
                        <th className="px-3 py-2.5">Origin</th>
                        <th className="px-3 py-2.5">Status</th>
                        <th className="px-3 py-2.5">Updated</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {details.recentTrades.map((trade) => (
                        <tr key={trade._id} className="text-[#c5c6ce]">
                          <td className="px-3 py-3 font-semibold text-[#dae2fd]">{trade.pair}</td>
                          <td className="px-3 py-3 uppercase">{trade.direction}</td>
                          <td className="px-3 py-3 capitalize">{trade.tradeOrigin}</td>
                          <td className="px-3 py-3 capitalize">{trade.status}</td>
                          <td className="px-3 py-3">{formatDate(trade.updatedAt)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="rounded-xl bg-[#0b1326] p-5 text-center text-xs text-[#8f9098]">
                  This user has no trade activity yet.
                </p>
              )}
            </div>

            <div className="flex justify-end border-t border-white/5 pt-4">
              <button
                type="button"
                disabled={actionLoading}
                onClick={() => onToggleStatus(user)}
                className={`rounded-lg px-4 py-2 text-xs font-bold disabled:opacity-50 ${
                  status === "active"
                    ? "bg-[#93000a]/30 text-[#ffb4ab] hover:bg-[#93000a]/50"
                    : "bg-[#00311f] text-[#4edea3] hover:bg-[#00472d]"
                }`}
              >
                {actionLoading ? "Updating..." : status === "active" ? "Suspend user" : "Activate user"}
              </button>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default function UserManagementPage() {
  const [roleFilter, setRoleFilter] = useState<RoleFilter>("all");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState<TableUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [stats, setStats] = useState({ totalUsers: 0, activeUsers: 0, newUsers: 0, suspendedUsers: 0 });
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalUsersCount, setTotalUsersCount] = useState(0);
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [details, setDetails] = useState<GetUserResponse["data"] | null>(null);
  const [detailsLoading, setDetailsLoading] = useState(false);
  const [detailsError, setDetailsError] = useState<string | null>(null);
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await adminUserService.getAllUsers({
        page: currentPage,
        limit: 10,
        search: search || undefined,
        role: roleFilter === "all" ? undefined : roleFilter,
        status: statusFilter === "all" ? undefined : statusFilter,
      });
      setUsers(
        response.users.map((user) => {
          const name = `${user.firstName || ""} ${user.lastName || ""}`.trim() || user.email;
          return {
            ...user,
            id: user._id || user.id,
            name,
            initials: getInitials(name),
            role: (user.role || "CopyTrader") as UserRole,
            status: (user.status || "waitlist") as UserStatus,
            activeTradeCount: user.activeTradeCount || 0,
            lastActivityAt: user.lastActivityAt || null,
          };
        }),
      );
      setStats(response.stats);
      setTotalUsersCount(response.total);
      setTotalPages(Math.max(response.pages, 1));
    } catch (fetchError) {
      setError(fetchError instanceof Error ? fetchError.message : "Failed to load users");
      setUsers([]);
    } finally {
      setLoading(false);
    }
  }, [currentPage, roleFilter, search, statusFilter]);

  useEffect(() => {
    const timeoutId = setTimeout(() => void fetchUsers(), 350);
    return () => clearTimeout(timeoutId);
  }, [fetchUsers]);

  const openDetails = useCallback(async (userId: string) => {
    setSelectedUserId(userId);
    setOpenMenuId(null);
    setDetails(null);
    setDetailsError(null);
    setDetailsLoading(true);
    try {
      const response = await adminUserService.getUserById(userId);
      setDetails(response.data);
    } catch (detailError) {
      setDetailsError(detailError instanceof Error ? detailError.message : "Failed to load user details");
    } finally {
      setDetailsLoading(false);
    }
  }, []);

  const toggleUserStatus = useCallback(async (user: UserManagementUser) => {
    const isActive = user.status === "active";
    if (!window.confirm(`${isActive ? "Suspend" : "Activate"} this user?`)) return;
    const userId = user._id || user.id;
    setActionLoading(userId);
    try {
      if (isActive) await adminUserService.banUser(userId);
      else await adminUserService.unbanUser(userId);
      await fetchUsers();
      if (selectedUserId === userId) await openDetails(userId);
    } catch (actionError) {
      window.alert(actionError instanceof Error ? actionError.message : "Failed to update user status");
    } finally {
      setActionLoading(null);
    }
  }, [fetchUsers, openDetails, selectedUserId]);

  return (
    <div className="mx-auto max-w-[1600px] space-y-6 sm:space-y-8">
      <div>
        <h2 className="text-xl font-black text-[#dae2fd] sm:text-2xl">User Management</h2>
        <p className="mt-1 text-xs text-[#8f9098]">Manage all platform users · {totalUsersCount} matching users</p>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <MiniStat label="Total Users" value={stats.totalUsers} icon="groups" sub="All registered accounts" />
        <MiniStat label="Active Users" value={stats.activeUsers} icon="sensors" sub="Users with an open trade" />
        <MiniStat label="New Users" value={stats.newUsers} icon="person_add" sub="Joined this month" />
        <MiniStat label="Suspended Users" value={stats.suspendedUsers} icon="block" sub="Currently suspended" />
      </div>

      <div className="overflow-hidden rounded-2xl border border-white/5 bg-[#131b2e] shadow-2xl">
        <div className="flex flex-col gap-4 border-b border-white/5 p-4 sm:p-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex max-w-full items-center gap-1 overflow-x-auto rounded-xl bg-[#060e20] p-1">
            {roleFilters.map((filter) => (
              <button
                key={filter.value}
                type="button"
                onClick={() => { setRoleFilter(filter.value); setCurrentPage(1); }}
                className={`whitespace-nowrap rounded-lg px-3 py-1.5 text-[11px] font-bold transition-all ${
                  roleFilter === filter.value ? "bg-[#4edea3] text-[#003824]" : "text-[#8f9098] hover:text-[#dae2fd]"
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>

          <div className="flex w-full flex-col gap-2 sm:flex-row lg:w-auto">
            <div className="relative flex-1 sm:w-64">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-base text-[#44474d]">search</span>
              <input
                value={search}
                onChange={(event) => { setSearch(event.target.value); setCurrentPage(1); }}
                placeholder="Search name, email or ID..."
                className="w-full rounded-xl border border-white/10 bg-[#0b1326] py-2 pl-9 pr-3 text-xs text-[#dae2fd] outline-none focus:ring-1 focus:ring-[#4edea3]/30"
              />
            </div>
            <select
              aria-label="Filter users by status"
              value={statusFilter}
              onChange={(event) => { setStatusFilter(event.target.value as StatusFilter); setCurrentPage(1); }}
              className="rounded-xl border border-white/10 bg-[#0b1326] px-3 py-2 text-xs text-[#c5c6ce] outline-none focus:ring-1 focus:ring-[#4edea3]/30"
            >
              <option value="all">All statuses</option>
              <option value="active">Active</option>
              <option value="waitlist">Waitlist</option>
              <option value="suspended">Suspended</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px] text-left">
            <thead>
              <tr className="border-b border-white/5 bg-[#171f33]/60 text-[9px] font-bold uppercase tracking-[0.15em] text-[#8f9098]">
                <th className="px-4 py-4 sm:px-6">User</th>
                <th className="px-4 py-4">Custom user ID</th>
                <th className="px-4 py-4">Role</th>
                <th className="px-4 py-4">Status</th>
                <th className="px-4 py-4">Active trades</th>
                <th className="px-4 py-4">Last activity</th>
                <th className="px-4 py-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {loading ? (
                <tr><td colSpan={7} className="px-4 py-16 text-center text-sm text-[#8f9098]">Loading users...</td></tr>
              ) : error ? (
                <tr><td colSpan={7} className="px-4 py-16 text-center text-sm text-[#ffb4ab]">{error}</td></tr>
              ) : users.length === 0 ? (
                <tr><td colSpan={7} className="px-4 py-16 text-center text-sm text-[#8f9098]">No users found.</td></tr>
              ) : users.map((user) => (
                <tr
                  key={user.id}
                  tabIndex={0}
                  onClick={() => void openDetails(user.id)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") void openDetails(user.id);
                  }}
                  className={`cursor-pointer transition-colors hover:bg-[#171f33]/50 focus:bg-[#171f33]/50 focus:outline-none ${user.status === "suspended" ? "bg-[#93000a]/5" : ""}`}
                >
                  <td className="px-4 py-4 sm:px-6">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#b6c4ff]/10 bg-[#002371]/30 text-xs font-black text-[#b6c4ff]">
                        {user.initials}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-[#dae2fd]">{user.name}</p>
                        <p className="text-[10px] text-[#8f9098]">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4 font-mono text-xs text-[#c5c6ce]">{user.traderID || "—"}</td>
                  <td className="px-4 py-4">
                    <span className={`inline-flex rounded-full border px-2 py-0.5 text-[10px] font-bold ${roleStyle[user.role]}`}>
                      {formatRole(user.role)}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <span className={`inline-flex items-center gap-1.5 text-[11px] font-semibold capitalize ${statusStyle[user.status]}`}>
                      <span className={`h-1.5 w-1.5 rounded-full ${statusDot[user.status]}`} />{user.status}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-xs font-bold text-[#dae2fd]">{user.activeTradeCount}</td>
                  <td className="px-4 py-4 text-xs text-[#c5c6ce]">{formatDate(user.lastActivityAt)}</td>
                  <td className="relative px-4 py-4 text-center" onClick={(event) => event.stopPropagation()}>
                    <button
                      type="button"
                      aria-label={`Actions for ${user.name}`}
                      aria-expanded={openMenuId === user.id}
                      onClick={() => setOpenMenuId((current) => current === user.id ? null : user.id)}
                      className="rounded-lg p-1.5 text-[#8f9098] hover:bg-white/5 hover:text-[#dae2fd]"
                    >
                      <span className="material-symbols-outlined">more_horiz</span>
                    </button>
                    {openMenuId === user.id && (
                      <div className="absolute right-4 top-12 z-20 w-40 overflow-hidden rounded-xl border border-white/10 bg-[#171f33] p-1 text-left shadow-2xl">
                        <button type="button" onClick={() => void openDetails(user.id)} className="w-full rounded-lg px-3 py-2 text-left text-xs text-[#dae2fd] hover:bg-white/5">User details</button>
                        <button
                          type="button"
                          disabled={actionLoading === user.id}
                          onClick={() => { setOpenMenuId(null); void toggleUserStatus(user); }}
                          className={`w-full rounded-lg px-3 py-2 text-left text-xs hover:bg-white/5 disabled:opacity-50 ${user.status === "active" ? "text-[#ffb4ab]" : "text-[#4edea3]"}`}
                        >
                          {user.status === "active" ? "Suspend" : "Activate"}
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {!loading && !error && users.length > 0 && (
            <div className="flex flex-col items-center justify-between gap-3 border-t border-white/5 px-4 py-4 sm:flex-row sm:px-6">
              <p className="text-xs text-[#8f9098]">
                Showing <span className="font-bold text-[#dae2fd]">{(currentPage - 1) * 10 + 1}–{Math.min(currentPage * 10, totalUsersCount)}</span> of <span className="font-bold text-[#dae2fd]">{totalUsersCount}</span> users
              </p>
              <div className="flex items-center gap-1">
                <button type="button" onClick={() => setCurrentPage((page) => page - 1)} disabled={currentPage === 1} className="p-1.5 text-[#8f9098] disabled:opacity-30"><span className="material-symbols-outlined">chevron_left</span></button>
                <span className="px-3 text-xs text-[#c5c6ce]">Page {currentPage} of {totalPages}</span>
                <button type="button" onClick={() => setCurrentPage((page) => page + 1)} disabled={currentPage === totalPages} className="p-1.5 text-[#8f9098] disabled:opacity-30"><span className="material-symbols-outlined">chevron_right</span></button>
              </div>
            </div>
          )}
        </div>
      </div>

      {selectedUserId && (
        <UserDetailsModal
          details={details}
          loading={detailsLoading}
          error={detailsError}
          actionLoading={actionLoading === selectedUserId}
          onClose={() => { setSelectedUserId(null); setDetails(null); }}
          onToggleStatus={(user) => void toggleUserStatus(user)}
        />
      )}
    </div>
  );
}
