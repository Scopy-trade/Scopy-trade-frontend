"use client";

import { useState } from "react";

const ACTIVITY = [
  {
    icon: "block",
    iconBg: "bg-[#93000a]/30 text-[#ffb4ab]",
    title: "Banned user Julian Reed",
    time: "2h ago",
  },
  {
    icon: "manage_accounts",
    iconBg: "bg-[#002371]/30 text-[#b6c4ff]",
    title: "Updated permissions for USR-442",
    time: "5h ago",
  },
  {
    icon: "download",
    iconBg: "bg-[#00311f]/30 text-[#4edea3]",
    title: "Exported signal ledger CSV",
    time: "Yesterday",
  },
  {
    icon: "gpp_bad",
    iconBg: "bg-[#5d001b]/30 text-[#ffb2b9]",
    title: "Flagged USR-99012-P for review",
    time: "Yesterday",
  },
  {
    icon: "verified_user",
    iconBg: "bg-[#00311f]/30 text-[#4edea3]",
    title: "Approved KYC for Elena Markov",
    time: "2 days ago",
  },
];

const SESSIONS = [
  {
    device: "Chrome · Windows 11",
    location: "Lagos, NG",
    ip: "102.89.23.14",
    time: "Now",
    current: true,
  },
  {
    device: "Safari · iPhone 15",
    location: "Lagos, NG",
    ip: "102.89.23.15",
    time: "3h ago",
    current: false,
  },
  {
    device: "Firefox · macOS",
    location: "London, UK",
    ip: "178.62.14.91",
    time: "2 days ago",
    current: false,
  },
];

const PERMISSIONS = [
  { label: "User Management", granted: true },
  { label: "Signal Governance", granted: true },
  { label: "Financial Controls", granted: true },
  { label: "Withdrawal Approval", granted: true },
  { label: "System Configuration", granted: true },
  { label: "Audit Log Export", granted: true },
  { label: "Root Key Access", granted: false },
  { label: "Infrastructure Admin", granted: false },
];

export default function ProfilePage() {
  const [name, setName] = useState("Admin_Root");
  const [email, setEmail] = useState("admin@scopytrade.com");
  const [twoFA, setTwoFA] = useState(true);
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [smsAlerts, setSmsAlerts] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="space-y-6 sm:space-y-8 max-w-[1400px] mx-auto">
      {/* Heading */}
      <div>
        <h2 className="text-xl sm:text-2xl font-black text-[#dae2fd] font-[Manrope,sans-serif]">
          Profile
        </h2>
        <p className="text-xs text-[#8f9098] mt-1">
          Manage your admin identity, security settings, and access permissions.
        </p>
      </div>

      {/* Top identity card */}
      <div className="bg-[#131b2e] border border-white/5 rounded-2xl overflow-hidden">
        {/* Banner */}
        <div className="h-24 sm:h-32 bg-gradient-to-r from-[#002371] via-[#00311f] to-[#0b1326] relative">
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage:
                "radial-gradient(circle, #4edea3 1px, transparent 1px)",
              backgroundSize: "28px 28px",
            }}
          />
        </div>

        <div className="px-6 sm:px-8 pb-6 sm:pb-8">
          {/* Avatar row */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 -mt-10 sm:-mt-12 mb-6">
            <div className="flex items-end gap-4">
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-[#00311f] border-4 border-[#131b2e] flex items-center justify-center flex-shrink-0 shadow-xl">
                <span className="text-3xl sm:text-4xl font-black text-[#4edea3] font-[Manrope,sans-serif]">
                  A
                </span>
              </div>
              <div className="pb-1">
                <div className="flex items-center gap-2">
                  <h3 className="text-lg sm:text-xl font-black text-[#dae2fd] font-[Manrope,sans-serif]">
                    {name}
                  </h3>
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#4edea3]/10 text-[#4edea3] text-[10px] font-black border border-[#4edea3]/20">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#4edea3] animate-pulse" />
                    Superuser
                  </span>
                </div>
                <p className="text-xs text-[#8f9098] mt-0.5">{email}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 pb-1">
              <div className="flex items-center gap-1.5 px-3 py-1.5 bg-[#00311f]/40 border border-[#4edea3]/20 rounded-xl text-[10px] font-bold text-[#4edea3]">
                <span className="material-symbols-outlined text-sm">
                  shield
                </span>
                Security Clearance: L5
              </div>
            </div>
          </div>

          {/* Quick stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { label: "Actions Today", value: "142", icon: "bolt" },
              { label: "Users Managed", value: "12,842", icon: "group" },
              { label: "Sessions", value: "3", icon: "devices" },
              { label: "Last Login", value: "Now", icon: "login" },
            ].map((s) => (
              <div
                key={s.label}
                className="bg-[#0b1326] border border-white/5 rounded-xl p-3 sm:p-4"
              >
                <div className="flex items-center gap-2 mb-1">
                  <span className="material-symbols-outlined text-[#8f9098] text-base">
                    {s.icon}
                  </span>
                  <p className="text-[9px] text-[#8f9098] uppercase tracking-widest">
                    {s.label}
                  </p>
                </div>
                <p className="text-lg font-black text-[#dae2fd] font-[Manrope,sans-serif]">
                  {s.value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Middle row: Edit info + Permissions */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Edit profile form */}
        <div className="lg:col-span-3 bg-[#131b2e] border border-white/5 rounded-2xl p-6 sm:p-8">
          <h3 className="text-sm font-bold text-[#dae2fd] mb-6 font-[Manrope,sans-serif]">
            Account Information
          </h3>
          <div className="space-y-5">
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-widest text-[#8f9098] mb-2">
                Display Name
              </label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-[#0b1326] border border-white/10 rounded-xl px-4 py-3 text-sm text-[#dae2fd] placeholder:text-[#44474d] focus:outline-none focus:border-[#4edea3]/40 focus:ring-1 focus:ring-[#4edea3]/20 transition-all"
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-widest text-[#8f9098] mb-2">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#0b1326] border border-white/10 rounded-xl px-4 py-3 text-sm text-[#dae2fd] placeholder:text-[#44474d] focus:outline-none focus:border-[#4edea3]/40 focus:ring-1 focus:ring-[#4edea3]/20 transition-all"
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-widest text-[#8f9098] mb-2">
                Role
              </label>
              <input
                value="Superuser · Root Administrator"
                readOnly
                className="w-full bg-[#060e20] border border-white/5 rounded-xl px-4 py-3 text-sm text-[#44474d] cursor-not-allowed"
              />
            </div>

            {/* Toggles */}
            <div className="pt-2 border-t border-white/5 space-y-4">
              <p className="text-[10px] font-bold uppercase tracking-widest text-[#8f9098]">
                Notifications
              </p>
              {[
                {
                  label: "Email Alerts",
                  sub: "Critical platform events",
                  value: emailAlerts,
                  set: setEmailAlerts,
                },
                {
                  label: "SMS Alerts",
                  sub: "High-priority incidents only",
                  value: smsAlerts,
                  set: setSmsAlerts,
                },
              ].map((t) => (
                <div
                  key={t.label}
                  className="flex items-center justify-between"
                >
                  <div>
                    <p className="text-sm font-semibold text-[#dae2fd]">
                      {t.label}
                    </p>
                    <p className="text-[10px] text-[#8f9098]">{t.sub}</p>
                  </div>
                  <button
                    onClick={() => t.set(!t.value)}
                    className={`relative w-11 h-6 rounded-full transition-all duration-200 ${t.value ? "bg-[#4edea3]" : "bg-[#2d3449]"}`}
                  >
                    <span
                      className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-all duration-200 ${t.value ? "left-6" : "left-1"}`}
                    />
                  </button>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={handleSave}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-black transition-all ${
                  saved
                    ? "bg-[#00311f] text-[#4edea3] border border-[#4edea3]/30"
                    : "bg-[#4edea3] text-[#003824] hover:opacity-90 shadow-lg shadow-[#4edea3]/10"
                }`}
              >
                <span className="material-symbols-outlined text-base">
                  {saved ? "check" : "save"}
                </span>
                {saved ? "Saved!" : "Save Changes"}
              </button>
              <button className="px-5 py-2.5 rounded-xl text-xs font-semibold text-[#8f9098] hover:text-[#dae2fd] bg-[#171f33] border border-white/5 transition-all">
                Discard
              </button>
            </div>
          </div>
        </div>

        {/* Permissions */}
        <div className="lg:col-span-2 bg-[#131b2e] border border-white/5 rounded-2xl p-6 sm:p-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-sm font-bold text-[#dae2fd] font-[Manrope,sans-serif]">
              Access Permissions
            </h3>
            <span className="text-[10px] text-[#8f9098] bg-[#171f33] px-2 py-1 rounded-lg border border-white/5">
              L5 Clearance
            </span>
          </div>
          <div className="space-y-2.5">
            {PERMISSIONS.map((p) => (
              <div
                key={p.label}
                className="flex items-center justify-between py-2 border-b border-white/[0.04] last:border-0"
              >
                <div className="flex items-center gap-2.5">
                  <span
                    className={`material-symbols-outlined text-base ${p.granted ? "text-[#4edea3]" : "text-[#44474d]"}`}
                    style={
                      p.granted
                        ? { fontVariationSettings: "'FILL' 1" }
                        : undefined
                    }
                  >
                    {p.granted ? "check_circle" : "cancel"}
                  </span>
                  <span
                    className={`text-xs font-semibold ${p.granted ? "text-[#dae2fd]" : "text-[#44474d]"}`}
                  >
                    {p.label}
                  </span>
                </div>
                <span
                  className={`text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full ${
                    p.granted
                      ? "bg-[#00311f]/40 text-[#4edea3] border border-[#4edea3]/20"
                      : "bg-[#171f33] text-[#44474d] border border-white/5"
                  }`}
                >
                  {p.granted ? "Granted" : "Restricted"}
                </span>
              </div>
            ))}
          </div>
          <p className="text-[10px] text-[#44474d] mt-4 leading-relaxed">
            Permission changes require Root Key access. Contact system owner to
            modify.
          </p>
        </div>
      </div>

      {/* Bottom row: Security + Activity + Sessions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Security */}
        <div className="bg-[#131b2e] border border-white/5 rounded-2xl p-6 sm:p-8">
          <h3 className="text-sm font-bold text-[#dae2fd] mb-5 font-[Manrope,sans-serif]">
            Security
          </h3>
          <div className="space-y-4">
            {/* 2FA */}
            <div className="flex items-center justify-between p-4 bg-[#0b1326] rounded-xl border border-white/5">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-[#00311f]/40 flex items-center justify-center">
                  <span className="material-symbols-outlined text-[#4edea3] text-lg">
                    phonelink_lock
                  </span>
                </div>
                <div>
                  <p className="text-xs font-bold text-[#dae2fd]">
                    Two-Factor Auth
                  </p>
                  <p className="text-[10px] text-[#8f9098]">
                    Authenticator app
                  </p>
                </div>
              </div>
              <button
                onClick={() => setTwoFA(!twoFA)}
                className={`relative w-11 h-6 rounded-full transition-all duration-200 ${twoFA ? "bg-[#4edea3]" : "bg-[#2d3449]"}`}
              >
                <span
                  className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-all duration-200 ${twoFA ? "left-6" : "left-1"}`}
                />
              </button>
            </div>

            <button className="w-full flex items-center justify-between p-4 bg-[#0b1326] rounded-xl border border-white/5 hover:border-[#b6c4ff]/20 transition-all group">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-[#002371]/30 flex items-center justify-center">
                  <span className="material-symbols-outlined text-[#b6c4ff] text-lg">
                    key
                  </span>
                </div>
                <div className="text-left">
                  <p className="text-xs font-bold text-[#dae2fd]">
                    Change Password
                  </p>
                  <p className="text-[10px] text-[#8f9098]">
                    Last changed 30 days ago
                  </p>
                </div>
              </div>
              <span className="material-symbols-outlined text-[#44474d] group-hover:text-[#b6c4ff] transition-colors text-base">
                chevron_right
              </span>
            </button>

            <button className="w-full flex items-center justify-between p-4 bg-[#0b1326] rounded-xl border border-white/5 hover:border-[#ffb2b9]/20 transition-all group">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-[#5d001b]/20 flex items-center justify-center">
                  <span className="material-symbols-outlined text-[#ffb2b9] text-lg">
                    logout
                  </span>
                </div>
                <div className="text-left">
                  <p className="text-xs font-bold text-[#ffb2b9]">
                    Logout All Devices
                  </p>
                  <p className="text-[10px] text-[#8f9098]">
                    Terminate all active sessions
                  </p>
                </div>
              </div>
              <span className="material-symbols-outlined text-[#44474d] group-hover:text-[#ffb2b9] transition-colors text-base">
                chevron_right
              </span>
            </button>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-[#131b2e] border border-white/5 rounded-2xl p-6 sm:p-8">
          <h3 className="text-sm font-bold text-[#dae2fd] mb-5 font-[Manrope,sans-serif]">
            Recent Activity
          </h3>
          <div className="space-y-1">
            {ACTIVITY.map((a, i) => (
              <div
                key={i}
                className="flex items-start gap-3 py-3 border-b border-white/[0.04] last:border-0"
              >
                <div
                  className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 ${a.iconBg}`}
                >
                  <span className="material-symbols-outlined text-base">
                    {a.icon}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-[#dae2fd] leading-snug">
                    {a.title}
                  </p>
                  <p className="text-[10px] text-[#44474d] mt-0.5">{a.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Active Sessions */}
        <div className="bg-[#131b2e] border border-white/5 rounded-2xl p-6 sm:p-8">
          <h3 className="text-sm font-bold text-[#dae2fd] mb-5 font-[Manrope,sans-serif]">
            Active Sessions
          </h3>
          <div className="space-y-3">
            {SESSIONS.map((s, i) => (
              <div
                key={i}
                className={`p-4 rounded-xl border transition-all ${
                  s.current
                    ? "bg-[#00311f]/20 border-[#4edea3]/20"
                    : "bg-[#0b1326] border-white/5"
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2.5">
                    <span
                      className={`material-symbols-outlined text-xl ${s.current ? "text-[#4edea3]" : "text-[#8f9098]"}`}
                    >
                      {s.device.includes("iPhone")
                        ? "smartphone"
                        : "laptop_mac"}
                    </span>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <p className="text-xs font-bold text-[#dae2fd]">
                          {s.device}
                        </p>
                        {s.current && (
                          <span className="text-[9px] font-black text-[#4edea3] bg-[#4edea3]/10 px-1.5 py-0.5 rounded-full border border-[#4edea3]/20">
                            Current
                          </span>
                        )}
                      </div>
                      <p className="text-[10px] text-[#8f9098] mt-0.5">
                        {s.location} · {s.ip}
                      </p>
                    </div>
                  </div>
                  <p className="text-[10px] text-[#44474d] whitespace-nowrap">
                    {s.time}
                  </p>
                </div>
                {!s.current && (
                  <button className="mt-2.5 text-[10px] text-[#ffb2b9] font-bold hover:underline flex items-center gap-1">
                    <span className="material-symbols-outlined text-xs">
                      logout
                    </span>
                    Revoke session
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
