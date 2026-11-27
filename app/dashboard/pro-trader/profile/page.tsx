"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import { getAccountInitials, useAuth } from "@/components/auth/AuthContext";
import RankProgress from "@/components/pro-trader/RankProgress";

function Profile() {
  const { account } = useAuth();
  const params = useSearchParams();
  const [tab, setTab] = useState(params.get("tab") === "ranks" ? "ranks" : "details");
  return <div className="mx-auto max-w-6xl space-y-6">
    <div><h1 className="text-3xl font-bold">Your profile</h1><p className="mt-2 text-sm text-slate-400">Your account details, rank progress and benefits.</p></div>
    <div role="tablist" aria-label="Profile sections" className="flex gap-6 border-b border-white/10">
      {[["details", "Profile details"], ["ranks", "Ranks & benefits"]].map(([value, label]) => <button key={value} id={`${value}-tab`} role="tab" aria-selected={tab === value} aria-controls={`${value}-panel`} onClick={() => setTab(value)} className={`border-b-2 px-2 py-3 text-sm font-bold ${tab === value ? "border-secondary text-secondary" : "border-transparent text-slate-400"}`}>{label}</button>)}
    </div>
    {tab === "ranks" ? <section id="ranks-panel" role="tabpanel" aria-labelledby="ranks-tab"><RankProgress full /></section> : <section id="details-panel" role="tabpanel" aria-labelledby="details-tab" className="rounded-2xl border border-white/10 bg-surface-container-low p-6">
      <div className="mb-6 flex items-center gap-4"><div className="flex h-16 w-16 items-center justify-center rounded-full bg-secondary/10 text-xl font-bold text-secondary">{getAccountInitials(account)}</div><div><h2 className="text-xl font-bold">{[account.firstName, account.lastName].filter(Boolean).join(" ") || "Pro trader"}</h2><p className="text-sm text-slate-400">Pro trader</p></div></div>
      <dl className="grid gap-6 sm:grid-cols-2">{[["First name", account.firstName], ["Last name", account.lastName], ["Email address", account.email], ["Trader ID", "traderID" in account ? account.traderID : undefined]].map(([label, value]) => <div key={label}><dt className="text-xs text-slate-400">{label}</dt><dd className="mt-2 break-all text-sm">{value || "—"}</dd></div>)}</dl>
    </section>}
  </div>;
}

export default function ProfilePage() { return <Suspense fallback={<p>Loading profile…</p>}><Profile /></Suspense>; }
