"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  RiMailLine,
  RiLockLine,
  RiEyeLine,
  RiEyeCloseLine,
  RiShieldCheckLine,
} from "react-icons/ri";
import { authAPI } from "@/lib/api/auth";

export default function AdminLoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      await authAPI.adminLogin({ email, password });
      window.location.href = "/admin/dashboard";
    } catch (err: any) {
      console.error("Admin login error:", err);
      setError(err.message || "Access denied. Please check your credentials.");
      setIsLoading(false);
    }
  }

  return (
    <div className="p-8 md:p-16 flex flex-col justify-center bg-[var(--color-surface-container-low)]">
      <div className="mb-10">
        <div className="inline-flex items-center gap-2 bg-[var(--color-secondary)]/10 text-[var(--color-secondary)] px-3 py-1 rounded-full mb-4">
          <RiShieldCheckLine className="text-sm" />
          <span className="text-xs font-bold tracking-wider uppercase">
            Admin Access
          </span>
        </div>
        <h3
          className="text-2xl font-bold text-[var(--color-on-surface)] mb-2"
          style={{ fontFamily: "var(--font-headline)" }}
        >
          Restricted Terminal
        </h3>
        <p className="text-[var(--color-on-surface-variant)]">
          Authorized personnel only
        </p>
      </div>

      {error && (
        <div className="mb-6 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-500 text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="group">
          <label
            htmlFor="email"
            className="block text-xs font-bold text-[var(--color-on-surface-variant)] uppercase tracking-wider mb-2"
          >
            Admin Email
          </label>
          <div className="relative">
            <RiMailLine className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--color-on-surface-variant)]/50 text-lg pointer-events-none" />
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@scopytrade.com"
              disabled={isLoading}
              className="
                w-full bg-[var(--color-surface-container-highest)] border-none
                rounded-lg py-3 pl-12 pr-4
                text-[var(--color-on-surface)]
                placeholder:text-[var(--color-outline)]
                focus:ring-1 focus:ring-[var(--color-secondary)]/50 focus:outline-none
                transition-all
                disabled:opacity-50 disabled:cursor-not-allowed
              "
            />
          </div>
        </div>

        <div className="group">
          <label
            htmlFor="password"
            className="block text-xs font-bold text-[var(--color-on-surface-variant)] uppercase tracking-wider mb-2"
          >
            Password
          </label>
          <div className="relative">
            <RiLockLine className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--color-on-surface-variant)]/50 text-lg pointer-events-none" />
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              disabled={isLoading}
              className="
                w-full bg-[var(--color-surface-container-highest)] border-none
                rounded-lg py-3 pl-12 pr-12
                text-[var(--color-on-surface)]
                placeholder:text-[var(--color-outline)]
                focus:ring-1 focus:ring-[var(--color-secondary)]/50 focus:outline-none
                transition-all
                disabled:opacity-50 disabled:cursor-not-allowed
              "
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-[var(--color-on-surface-variant)]/50 hover:text-[var(--color-secondary)] transition-colors"
            >
              {showPassword ? (
                <RiEyeCloseLine className="text-lg" />
              ) : (
                <RiEyeLine className="text-lg" />
              )}
            </button>
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="
            w-full button-gradient text-[var(--color-on-secondary)]
            font-bold py-3.5 rounded-lg mt-4
            shadow-lg shadow-[var(--color-secondary)]/10
            hover:opacity-90 active:scale-[0.98]
            transition-all flex items-center justify-center gap-2
            disabled:opacity-60 disabled:cursor-not-allowed
          "
        >
          {isLoading ? (
            <span className="animate-pulse">Authenticating…</span>
          ) : (
            <span>Access Terminal</span>
          )}
        </button>
      </form>
    </div>
  );
}
