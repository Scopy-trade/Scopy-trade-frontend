"use client";

import { Fragment, useEffect, useState } from "react";
import { adminAuditLogService, type AuditPerson, type AuditLogsResponse } from "@/lib/api/admin";

const inputClass = "w-full rounded-xl border border-white/10 bg-[#0b1326] px-3 py-2.5 text-xs text-[#dae2fd] focus:outline-none focus:ring-1 focus:ring-[#4edea3]";
const buttonClass = "rounded-xl border border-white/10 bg-[#171f33] px-4 py-2.5 text-xs font-bold text-[#dae2fd] hover:bg-[#222a3d] disabled:cursor-not-allowed disabled:opacity-40";
const personId = (person: AuditPerson | undefined) => typeof person === "string" ? person : person?._id;
function personName(person: AuditPerson | undefined) {
  if (!person) return "Not recorded";
  if (typeof person === "string") return person;
  return [person.firstName, person.lastName].filter(Boolean).join(" ") || person.email || person._id;
}
function csvCell(value: unknown) {
  const text = value == null ? "" : String(value);
  const safe = /^\s*[=+\-@\t\r\n]/.test(text) ? `'${text}` : text;
  return `"${safe.replaceAll('"', '""')}"`;
}

export default function LogsPage() {
  const [filters, setFilters] = useState({ search: "", action: "", dateFrom: "", dateTo: "", page: 1, limit: 20 });
  const [data, setData] = useState<AuditLogsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [refresh, setRefresh] = useState(0);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [updatedAt, setUpdatedAt] = useState<Date | null>(null);
  const invalidDates = Boolean(filters.dateFrom && filters.dateTo && filters.dateFrom > filters.dateTo);

  useEffect(() => {
    let active = true;
    const timer = setTimeout(async () => {
      if (invalidDates) return;
      setLoading(true);
      setError("");
      try {
        const result = await adminAuditLogService.list(filters);
        if (!active) return;
        setData(result);
        setUpdatedAt(new Date());
        setExpanded(null);
      } catch (cause) {
        if (active) setError(cause instanceof Error ? cause.message : "Unable to load audit logs.");
      } finally {
        if (active) setLoading(false);
      }
    }, 300);
    return () => { active = false; clearTimeout(timer); };
  }, [filters, refresh, invalidDates]);

  function changeFilter(key: "search" | "action" | "dateFrom" | "dateTo", value: string) {
    setLoading(true);
    setFilters((current) => ({ ...current, [key]: value, page: 1 }));
  }
  function reload() { setLoading(true); setRefresh((value) => value + 1); }
  function goToPage(page: number) { setLoading(true); setFilters((current) => ({ ...current, page })); }
  function exportPage() {
    if (!data) return;
    const rows = [["ID", "Timestamp (UTC)", "Action", "Admin ID", "User ID", "Target type", "Target ID", "IP address", "User agent", "Details"],
      ...data.logs.map((log) => [log._id, log.timestamp, log.action, personId(log.admin), personId(log.userId), log.targetType, log.targetId, log.ipAddress, log.userAgent, JSON.stringify(log.details ?? null)])];
    const url = URL.createObjectURL(new Blob(["\uFEFF", rows.map((row) => row.map(csvCell).join(",")).join("\r\n")], { type: "text/csv;charset=utf-8;" }));
    const link = document.createElement("a");
    link.href = url;
    link.download = `audit-logs-page-${data.page}.csv`;
    link.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }
  const hasFilters = Boolean(filters.search || filters.action || filters.dateFrom || filters.dateTo);
  const unavailable = loading || Boolean(error) || invalidDates;

  return (
    <div className="mx-auto max-w-[1600px] space-y-6">
      <header className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div><h1 className="text-2xl font-black tracking-tight text-[#dae2fd] sm:text-3xl">Audit Logs</h1><p className="mt-2 max-w-xl text-sm text-[#8f9098]">Review recorded account, trading, exchange and administrative activity across the platform.</p></div>
        <div className="flex gap-2"><button type="button" className={buttonClass} disabled={loading || invalidDates} onClick={reload}>Refresh</button><button type="button" className="rounded-xl bg-[#4edea3] px-4 py-2.5 text-xs font-black text-[#003824] disabled:cursor-not-allowed disabled:opacity-40" disabled={unavailable || !data?.logs.length} onClick={exportPage}>Export page (CSV)</button></div>
      </header>
      <section aria-label="Audit log filters" className="rounded-2xl border border-white/5 bg-[#131b2e] p-4 sm:p-5">
        <div className="grid items-end gap-3 sm:grid-cols-2 xl:grid-cols-5">
          <label className="space-y-2 text-xs text-[#8f9098] xl:col-span-2"><span>Search</span><input type="search" className={inputClass} placeholder="Action, record / user / target ID, IP or user agent" maxLength={200} value={filters.search} onChange={(event) => changeFilter("search", event.target.value)} /></label>
          <label className="space-y-2 text-xs text-[#8f9098]"><span>Action</span><select className={inputClass} value={filters.action} onChange={(event) => changeFilter("action", event.target.value)}><option value="">All actions</option>{data?.actions.map((action) => <option key={action} value={action}>{action}</option>)}</select></label>
          <label className="space-y-2 text-xs text-[#8f9098]"><span>From date (UTC)</span><input type="date" className={inputClass} value={filters.dateFrom} max={filters.dateTo || undefined} onChange={(event) => changeFilter("dateFrom", event.target.value)} /></label>
          <label className="space-y-2 text-xs text-[#8f9098]"><span>To date (UTC)</span><input type="date" className={inputClass} value={filters.dateTo} min={filters.dateFrom || undefined} onChange={(event) => changeFilter("dateTo", event.target.value)} /></label>
        </div>
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-xs text-[#8f9098]"><p>Dates filter UTC days. Entry times use your local timezone.</p><button type="button" disabled={!hasFilters} className="font-bold text-[#4edea3] disabled:opacity-40" onClick={() => { setLoading(true); setFilters((current) => ({ ...current, search: "", action: "", dateFrom: "", dateTo: "", page: 1 })); }}>Clear filters</button></div>
      </section>
      <section aria-label="Audit log records" aria-busy={loading && !invalidDates} className="overflow-hidden rounded-2xl border border-white/5 bg-[#131b2e]">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/5 px-5 py-4"><p className="text-sm font-bold text-[#dae2fd]">Recorded activity {data && !unavailable && <span className="ml-2 text-xs font-normal text-[#8f9098]">{data.total.toLocaleString()} matching records</span>}</p><p className="text-xs text-[#8f9098]">{updatedAt ? `Last refreshed ${updatedAt.toLocaleTimeString()}` : "Awaiting first refresh"}</p></div>
        {invalidDates ? <p role="alert" className="p-12 text-center text-sm text-[#ffb2b9]">From date must be before or equal to to date.</p> : loading ? <p role="status" className="p-12 text-center text-sm text-[#8f9098]">Loading audit logs...</p> : error ? <div role="alert" className="space-y-4 p-12 text-center"><p className="text-sm text-[#ffb2b9]">{error}</p><button type="button" className={buttonClass} onClick={reload}>Try again</button></div> : !data?.logs.length ? <div className="p-12 text-center"><p className="font-bold text-[#dae2fd]">No audit logs found</p><p className="mt-2 text-sm text-[#8f9098]">{hasFilters ? "Try another search or clear the filters." : "Recorded activity will appear here when events are logged."}</p></div> : <div className="overflow-x-auto"><table className="w-full min-w-[900px] text-left text-sm"><thead className="bg-[#171f33]/60 text-[10px] uppercase tracking-widest text-[#8f9098]"><tr>{["Timestamp", "Action", "Admin / user", "Target", "IP address", "Details"].map((heading) => <th key={heading} scope="col" className="px-5 py-3">{heading}</th>)}</tr></thead><tbody>
          {data.logs.map((log) => <Fragment key={log._id}>
            <tr className="border-t border-white/5 align-top hover:bg-[#171f33]/40">
              <td className="whitespace-nowrap px-5 py-4 text-xs text-[#8f9098]">{log.timestamp ? new Date(log.timestamp).toLocaleString() : "Not recorded"}</td>
              <td className="px-5 py-4"><span className="inline-block rounded-lg bg-[#4edea3]/10 px-2.5 py-1 text-xs font-bold text-[#4edea3]">{log.action}</span></td>
              <td className="max-w-64 break-words px-5 py-4 text-xs text-[#dae2fd]">{log.admin && <p><span className="text-[#8f9098]">Admin: </span>{personName(log.admin)}</p>}{log.userId && <p className={log.admin ? "mt-2" : ""}><span className="text-[#8f9098]">User: </span>{personName(log.userId)}</p>}{!log.admin && !log.userId && <span className="text-[#8f9098]">Not recorded</span>}</td>
              <td className="px-5 py-4 text-xs text-[#8f9098]"><p>{log.targetType || (log.targetId ? "Target" : "Not recorded")}</p>{log.targetId && <p className="mt-1 font-mono">{log.targetId}</p>}</td>
              <td className="px-5 py-4 font-mono text-xs text-[#8f9098]">{log.ipAddress || "Not recorded"}</td>
              <td className="px-5 py-4"><button type="button" aria-expanded={expanded === log._id} aria-controls={`details-${log._id}`} className="whitespace-nowrap text-xs font-bold text-[#b6c4ff] hover:underline" onClick={() => setExpanded((current) => current === log._id ? null : log._id)}>{expanded === log._id ? "Hide details" : "View details"}</button></td>
            </tr>
            {expanded === log._id && <tr id={`details-${log._id}`}><td colSpan={6} className="border-t border-white/5 bg-[#0b1326] p-5"><dl className="grid gap-3 text-xs text-[#8f9098] sm:grid-cols-2">{[["Record ID", log._id], ["Admin ID", personId(log.admin)], ["User ID", personId(log.userId)], ["User agent", log.userAgent]].map(([label, value]) => <div key={label}><dt className="font-bold text-[#dae2fd]">{label}</dt><dd className="mt-1 break-all">{value || "Not recorded"}</dd></div>)}</dl><p className="mb-2 mt-5 text-xs font-bold text-[#dae2fd]">Event details</p><pre className="max-h-80 overflow-auto whitespace-pre-wrap break-words text-xs leading-6 text-[#c5c6ce]">{log.details == null ? "No additional details recorded." : JSON.stringify(log.details, null, 2)}</pre></td></tr>}
          </Fragment>)}
        </tbody></table></div>}
        {data && !unavailable && <footer className="flex flex-wrap items-center justify-between gap-3 border-t border-white/5 px-5 py-4 text-xs text-[#8f9098]"><p>{data.total ? `${(data.page - 1) * data.limit + 1}-${Math.min(data.page * data.limit, data.total)} of ${data.total.toLocaleString()}` : "0 records"}</p><div className="flex flex-wrap items-center gap-3"><label>Rows <select className="ml-1 rounded-lg bg-[#0b1326] p-2 text-[#dae2fd]" value={filters.limit} onChange={(event) => { setLoading(true); setFilters((current) => ({ ...current, page: 1, limit: Number(event.target.value) })); }}>{[20, 50, 100].map((limit) => <option key={limit} value={limit}>{limit}</option>)}</select></label><button type="button" className={buttonClass} disabled={data.page <= 1} onClick={() => goToPage(data.page - 1)}>Previous</button><span>Page {data.page} of {data.pages}</span><button type="button" className={buttonClass} disabled={data.page >= data.pages} onClick={() => goToPage(data.page + 1)}>Next</button></div></footer>}
      </section>
      <p className="text-xs leading-5 text-[#8f9098]">This view shows events recorded by the platform. Older entries may have missing identity or request details. CSV export includes the current page.</p>
    </div>
  );
}
