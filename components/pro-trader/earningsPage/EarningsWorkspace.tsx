"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { MdAccountBalanceWallet, MdArrowDownward, MdCheckCircle, MdClose, MdRefresh } from "react-icons/md";
import { userApi } from "@/lib/api/client";
import type { Withdrawal } from "@/lib/api/withdrawals";
import WithdrawalRecords from "./WithdrawalRecords";

type Mode = "demo" | "live";
type Summary = { legacyBalance: string; accountId: string; mode: Mode; available: string; earned: string; reserved: string; withdrawalAddress: string | null; walletUnlocksAt: string | null; liveEnabled: boolean; demoFundingEnabled: boolean };
type Earning = { _id: string; tradeId: string; pair: string; closedAt: string; realizedPnl: string; platformFee: string; proTraderShare: string; proTraderCreditStatus: string; feeStatus: string; mode: string };
type Page<T> = { rows: T[]; page: number; pages: number };
type Pending = { submitted?: boolean; amount: string; mode: Mode; key: string };
const base = "/pro-trader/dashboard";
const button = "inline-flex items-center justify-center gap-2 rounded-xl bg-secondary px-5 py-3 text-sm font-bold text-on-secondary transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-40";
const input = "w-full rounded-xl border border-white/10 bg-surface-container-highest px-4 py-3 text-on-surface outline-none focus:ring-2 focus:ring-secondary/60 disabled:opacity-60";
const date = (value: string) => new Date(value).toLocaleString(undefined, { dateStyle: "medium", timeStyle: "short" });
const message = (error: unknown) => error instanceof Error ? error.message : "Something went wrong. Please try again.";
function Status({ children }: { children: string }) {
  const positive = ["CONFIRMED", "credited"].includes(children);
  return <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${positive ? "bg-secondary/10 text-secondary" : "bg-white/5 text-on-surface-variant"}`}>{children.replaceAll("_", " ").toLowerCase()}</span>;
}

export default function EarningsWorkspace({ initialTab = "earnings" }: { initialTab?: "earnings" | "withdrawals" }) {
  const [tab, setTab] = useState(initialTab);
  const [summary, setSummary] = useState<Summary | null>(null);
  const [earnings, setEarnings] = useState<Page<Earning>>({ rows: [], page: 1, pages: 1 });
  const [withdrawals, setWithdrawals] = useState<Page<Withdrawal>>({ rows: [], page: 1, pages: 1 });
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [busy, setBusy] = useState(false);
  const [address, setAddress] = useState("");
  const [walletOtp, setWalletOtp] = useState("");
  const [walletStep, setWalletStep] = useState(false);
  const [editingWallet, setEditingWallet] = useState(false);
  const [amount, setAmount] = useState("");
  const [otp, setOtp] = useState("");
  const [pending, setPending] = useState<Pending | null>(null);
  const [dialogError, setDialogError] = useState("");
  const [open, setOpen] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);
  const refreshVersion = useRef(0);
  const invalidateRefresh = useCallback(() => { ++refreshVersion.current; }, []);
  const refresh = useCallback(async (quiet = false) => {
    const version = ++refreshVersion.current;
    if (!quiet) setLoading(true);
    try {
      const [finance, rows] = await Promise.all([
        userApi.get<Summary>(base + "/finance"),
        userApi.get<Page<Earning> | Page<Withdrawal>>(base + "/" + tab, { params: { page } }),
      ]);
      if (version !== refreshVersion.current) return;
      setSummary(finance);
      if (tab === "earnings") setEarnings(rows as Page<Earning>); else setWithdrawals(rows as Page<Withdrawal>);
      setError("");
    } catch (err) { if (version === refreshVersion.current) setError(message(err)); }
    finally { if (version === refreshVersion.current) setLoading(false); }
  }, [page, tab]);
  useEffect(() => {
    void refresh();
    const timer = setInterval(() => void refresh(true), 15_000);
    return () => { clearInterval(timer); invalidateRefresh(); };
  }, [refresh, invalidateRefresh]);
  useEffect(() => {
    if (open) dialog.current?.showModal(); else dialog.current?.close();
  }, [open]);
  const storageKey = summary ? "pro-withdrawal:" + summary.accountId : "";
  async function openWithdrawal() {
    setDialogError(""); setOtp("");
    try {
      const stored = sessionStorage.getItem(storageKey);
      const previous = stored ? JSON.parse(stored) as Pending : null;
      setPending(previous); setAmount(previous?.amount || "");
      if (previous) {
        const result = await userApi.get<{ withdrawal: Withdrawal | null }>(base + "/withdrawals/request/" + encodeURIComponent(previous.key));
        if (result.withdrawal) {
          sessionStorage.removeItem(storageKey); setPending(null); setTab("withdrawals"); setPage(1);
          setNotice("Your previous request is " + result.withdrawal.status.toLowerCase() + ". No new withdrawal was created.");
          return;
        }
      }
    } catch (err) { setDialogError(message(err)); }
    setOpen(true);
  }
  async function submitWithdrawal(event: React.FormEvent) {
    event.preventDefault();
    if (!summary || busy) return;
    setBusy(true); setDialogError("");
    try {
      if (!pending) {
        const next = { amount, mode: summary.mode, key: crypto.randomUUID() };
        await userApi.post(base + "/withdraw/request-otp", { amount, mode: next.mode }, { headers: { "Idempotency-Key": next.key } });
        sessionStorage.setItem(storageKey, JSON.stringify(next)); setPending(next);
      } else {
        const attempted = { ...pending, submitted: true };
        setPending(attempted); sessionStorage.setItem(storageKey, JSON.stringify(attempted));
        const result = await userApi.post<{ message?: string }>(base + "/withdraw", { amount: pending.amount, mode: pending.mode, otp }, { headers: { "Idempotency-Key": pending.key } });
        sessionStorage.removeItem(storageKey); setPending(null); setOpen(false);
        setNotice(result.message || "Withdrawal request found. Check its status below.");
        setTab("withdrawals"); setPage(1); void refresh(true);
      }
    } catch (err) { setDialogError(message(err)); }
    finally { setBusy(false); }
  }
  async function resendCode() {
    if (!pending) return;
    setBusy(true); setDialogError("");
    try {
      await userApi.post(base + "/withdraw/request-otp", { amount: pending.amount, mode: pending.mode }, { headers: { "Idempotency-Key": pending.key } });
      setDialogError("A new verification code has been sent.");
    } catch (err) { setDialogError(message(err)); } finally { setBusy(false); }
  }
  async function saveWallet(event: React.FormEvent) {
    event.preventDefault(); setBusy(true); setError("");
    try {
      if (!walletStep) {
        await userApi.post(base + "/wallet/request-otp", { address }); setWalletStep(true);
      } else {
        await userApi.post(base + "/wallet", { address, otp: walletOtp });
        setEditingWallet(false); setWalletStep(false); setWalletOtp(""); setNotice("TRON wallet verified and saved."); void refresh(true);
      }
    } catch (err) { setError(message(err)); } finally { setBusy(false); }
  }
  async function demoFunds() {
    setBusy(true); setError("");
    try { await userApi.post(base + "/demo-credit"); setNotice("100 demo USDT added. These funds have no real value."); await refresh(true); }
    catch (err) { setError(message(err)); } finally { setBusy(false); }
  }
  const pages = tab === "earnings" ? earnings.pages : withdrawals.pages;
  const locked = summary?.mode === "live" && (!summary.liveEnabled || !summary.walletUnlocksAt || new Date(summary.walletUnlocksAt).getTime() > Date.now());
  return <div className="mx-auto max-w-7xl space-y-8">
    <header className="flex flex-wrap items-start justify-between gap-5">
      <div><p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-secondary">Your performance, rewarded</p><h1 className="text-3xl font-extrabold tracking-tight text-on-surface md:text-4xl">Earnings & withdrawals</h1><p className="mt-3 max-w-2xl text-sm leading-6 text-on-surface-variant">Earn 5% of the profit from every successful trade copied from you. Track your earnings and withdraw USDT to your TRON wallet.</p></div>
      <button className={button} onClick={openWithdrawal} disabled={!summary?.withdrawalAddress || Number(summary?.available || 0) <= 0 || !!locked}><MdArrowDownward size={18} />Withdraw USDT</button>
    </header>
    {summary?.mode === "demo" && <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-amber-400/20 bg-amber-400/5 px-5 py-4 text-sm text-amber-200"><div><strong>Demo mode</strong><p className="mt-1 text-amber-100/70">Practice the full withdrawal flow. No real funds are sent, and demo earnings never become live funds.</p></div>{summary.demoFundingEnabled && <button className="rounded-lg border border-amber-400/30 px-4 py-2 font-semibold disabled:opacity-50" disabled={busy} onClick={() => void demoFunds()}>Add demo funds</button>}</div>}
    {error && <div role="alert" className="rounded-xl border border-red-400/20 bg-red-400/10 p-4 text-sm text-red-300">{error} <button className="ml-2 underline" onClick={() => void refresh()}>Retry</button></div>}
    {notice && <div role="status" className="flex items-center gap-3 rounded-xl bg-secondary/10 p-4 text-sm text-secondary"><MdCheckCircle />{notice}<button aria-label="Dismiss notification" className="ml-auto" onClick={() => setNotice("")}><MdClose /></button></div>}
    {Number(summary?.legacyBalance || 0) > 0 && <p className="rounded-xl border border-amber-400/20 p-4 text-sm text-amber-200">Previous balance: {summary?.legacyBalance} USDT. Historical credits and payouts require reconciliation before this amount can be released into the new live balance.</p>}
    <section aria-label="Earnings summary" className="grid gap-4 sm:grid-cols-3">
      {[["Available to withdraw", summary?.available, "Collected earnings ready for payout"], ["Collected earnings", summary?.earned, "Your credited 5% share"], ["Withdrawals in progress", summary?.reserved, "Reserved until the transfer is resolved"]].map(([label, value, detail], index) => <div key={label} className={`rounded-2xl border p-6 ${index === 0 ? "border-secondary/20 bg-secondary/5" : "border-white/5 bg-surface-container-low"}`}><p className="text-sm text-on-surface-variant">{label}</p><p className="mt-4 break-all text-3xl font-bold tabular-nums text-on-surface">{value ?? "--"} <span className="text-xs font-medium text-on-surface-variant">USDT</span></p><p className="mt-3 text-xs text-on-surface-variant">{detail}</p></div>)}
    </section>
    <section className="rounded-2xl border border-white/5 bg-surface-container-low p-6">
      <div className="flex flex-wrap items-start justify-between gap-4"><div className="flex items-start gap-3"><MdAccountBalanceWallet className="mt-1 text-secondary" size={24} /><div><h2 className="font-bold text-on-surface">Your payout wallet</h2><p className="mt-1 text-xs text-on-surface-variant">USDT / TRON (TRC-20)</p><p className="mt-3 break-all font-mono text-sm text-on-surface">{summary?.withdrawalAddress || "Add and verify a TRON wallet to receive payouts."}</p></div></div><button className="text-sm font-semibold text-secondary disabled:opacity-50" disabled={busy || !summary} onClick={() => { setEditingWallet(!editingWallet); setAddress(summary?.withdrawalAddress || ""); setWalletStep(false); }}>{editingWallet ? "Cancel" : summary?.withdrawalAddress ? "Change wallet" : "Add wallet"}</button></div>
      {summary?.mode === "live" && locked && <p className="mt-4 text-xs text-amber-200">{!summary.liveEnabled ? "Live withdrawals are temporarily paused." : summary.walletUnlocksAt ? "Withdrawals unlock " + date(summary.walletUnlocksAt) : "Verify your wallet to start the 24-hour security hold."}</p>}
      {editingWallet && <form onSubmit={saveWallet} className="mt-6 grid gap-4 sm:max-w-xl"><label className="space-y-2 text-sm text-on-surface-variant"><span>TRON wallet address</span><input className={input} value={address} onChange={e => setAddress(e.target.value)} disabled={walletStep || busy} placeholder="TRON address starting with T" minLength={34} maxLength={34} required autoComplete="off" /></label>{walletStep && <label className="space-y-2 text-sm text-on-surface-variant"><span>Email verification code</span><input className={input} value={walletOtp} onChange={e => setWalletOtp(e.target.value.replace(/\D/g, ""))} inputMode="numeric" pattern="[0-9]{6}" maxLength={6} autoComplete="one-time-code" required /></label>}<p className="text-xs leading-5 text-on-surface-variant">Check the address carefully. Adding or changing your wallet starts a 24-hour hold on live withdrawals.</p><button className={button} disabled={busy}>{busy ? "Please wait..." : walletStep ? "Verify & save wallet" : "Send verification code"}</button></form>}
    </section>
    <section className="overflow-hidden rounded-2xl border border-white/5 bg-surface-container-low">
      <div className="flex items-center justify-between border-b border-white/5 px-6"><div role="tablist" aria-label="Financial history" className="flex gap-7">{(["earnings", "withdrawals"] as const).map(value => <button key={value} id={value + "-tab"} role="tab" aria-selected={tab === value} aria-controls="finance-panel" onClick={() => { setTab(value); setPage(1); }} className={`border-b-2 py-5 text-sm font-bold capitalize transition ${tab === value ? "border-secondary text-secondary" : "border-transparent text-on-surface-variant hover:text-on-surface"}`}>{value}</button>)}</div><button aria-label="Refresh history" onClick={() => void refresh()} disabled={loading} className="text-on-surface-variant hover:text-secondary"><MdRefresh size={20} /></button></div>
      <div id="finance-panel" role="tabpanel" aria-labelledby={tab + "-tab"} className="overflow-x-auto" aria-busy={loading}>
        {loading ? <p className="p-12 text-center text-sm text-on-surface-variant">Loading your {tab}...</p> : tab === "earnings" ? <table className="w-full whitespace-nowrap text-left text-sm"><thead className="bg-white/[0.02] text-xs text-on-surface-variant"><tr>{["Copied trade", "Closed", "Copier profit", "20% fee", "Your earnings / 5%", "Status"].map(text => <th key={text} className="px-6 py-4 font-medium">{text}</th>)}</tr></thead><tbody className="divide-y divide-white/5">{earnings.rows.map(row => <tr key={row._id} className="hover:bg-white/[0.02]"><td className="px-6 py-5 font-semibold text-on-surface">{row.pair}<span className="mt-1 block font-mono text-[11px] font-normal text-on-surface-variant">{row.tradeId || row._id}</span></td><td className="px-6 py-5 text-on-surface-variant">{date(row.closedAt)}</td><td className="px-6 py-5 tabular-nums">{row.realizedPnl} USDT</td><td className="px-6 py-5 tabular-nums text-on-surface-variant">{row.platformFee} USDT</td><td className="px-6 py-5 font-bold tabular-nums text-secondary">+{row.proTraderShare} USDT</td><td className="px-6 py-5"><Status>{row.proTraderCreditStatus === "credited" ? row.mode === "unallocated" ? "legacy_credit" : "credited" : "pending_collection"}</Status><span className="mt-1 block text-xs text-on-surface-variant">{row.mode === "demo" ? "Demo" : row.mode === "live" ? "Live" : "Awaiting allocation"}</span></td></tr>)}</tbody></table> : <WithdrawalRecords rows={withdrawals.rows} />}
        {!loading && (tab === "earnings" ? earnings.rows : withdrawals.rows).length === 0 && <div className="px-6 py-16 text-center"><MdAccountBalanceWallet className="mx-auto mb-4 text-on-surface-variant/40" size={34} /><p className="font-semibold text-on-surface">{tab === "earnings" ? "Your earnings start here" : "No withdrawals yet"}</p><p className="mx-auto mt-2 max-w-md text-sm leading-6 text-on-surface-variant">{tab === "earnings" ? "When a copied trade closes in profit, your 5% share will appear here. It becomes available once the fee is collected." : "Your demo and live withdrawal requests will appear here with their latest status."}</p></div>}
      </div>
      <div className="flex items-center justify-between border-t border-white/5 px-6 py-4 text-xs text-on-surface-variant"><span>Page {page} of {pages}</span><div className="flex gap-4"><button disabled={page <= 1 || loading} onClick={() => setPage(p => p - 1)} className="disabled:opacity-30">Previous</button><button disabled={page >= pages || loading} onClick={() => setPage(p => p + 1)} className="disabled:opacity-30">Next</button></div></div>
    </section>
    <p className="max-w-3xl text-xs leading-6 text-on-surface-variant">For every 100 USDT of copied-trade profit, the copier keeps 80 USDT, you earn 5 USDT, and the platform retains 15 USDT. Earnings pending collection are not withdrawable. Network uncertainty may require a review; the amount stays reserved until resolved.</p>
    <dialog ref={dialog} onCancel={e => { if (busy) e.preventDefault(); else setOpen(false); }} onClose={() => setOpen(false)} aria-labelledby="withdraw-title" className="fixed inset-0 m-auto w-[calc(100%_-_2rem)] max-w-lg rounded-2xl border border-white/10 bg-surface-container p-0 text-on-surface shadow-2xl backdrop:bg-black/70">
      <div className="flex items-center justify-between border-b border-white/5 p-6"><h2 id="withdraw-title" className="text-xl font-bold">{summary?.mode === "demo" ? "Simulate withdrawal" : "Withdraw USDT"}</h2><button disabled={busy} aria-label="Close withdrawal" onClick={() => setOpen(false)}><MdClose size={24} /></button></div>
      <form onSubmit={submitWithdrawal} className="space-y-5 p-6"><p className="text-sm text-on-surface-variant">Available: <strong className="text-secondary">{summary?.available} USDT</strong></p><p className="break-all rounded-xl bg-white/5 p-3 font-mono text-xs">TRON / {summary?.withdrawalAddress}</p>{dialogError && <p role="alert" className="text-sm text-amber-200">{dialogError}</p>}<label className="block space-y-2 text-sm"><span>Amount (USDT)</span><input className={input} value={amount} onChange={e => setAmount(e.target.value)} disabled={!!pending || busy} inputMode="decimal" pattern="(0|[1-9][0-9]*)(\.[0-9]{1,6})?" required placeholder="0.000000" /></label>{pending && <label className="block space-y-2 text-sm"><span>Email verification code</span><input className={input} value={otp} onChange={e => setOtp(e.target.value.replace(/\D/g, ""))} inputMode="numeric" pattern="[0-9]{6}" maxLength={6} required autoComplete="one-time-code" /><span className="block text-xs leading-5 text-on-surface-variant">The code confirms this exact amount, wallet, and {pending.mode} request. If a response is lost, retry this request.</span></label>}<button className={button + " w-full"} disabled={busy}>{busy ? "Please wait..." : pending ? "Confirm withdrawal" : "Send verification code"}</button>{pending && !pending.submitted && <button type="button" disabled={busy} onClick={() => { sessionStorage.removeItem(storageKey); setPending(null); setOtp(""); }} className="w-full text-sm text-on-surface-variant">Change amount</button>}{pending && <button type="button" disabled={busy} onClick={() => void resendCode()} className="w-full text-sm text-secondary">Resend code for this request</button>}<p className="text-xs leading-5 text-on-surface-variant">{summary?.mode === "demo" ? "This is a simulation. No blockchain transaction will be sent." : "Transfers are sent as USDT on TRON. Completed blockchain transfers cannot be reversed."}</p></form>
    </dialog>
  </div>;
}
