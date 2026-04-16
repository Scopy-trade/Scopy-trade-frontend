"use client";

import { useState, FormEvent } from "react";
import Link from "next/link";
import { RiBuildingLine, RiKey2Line, RiArrowRightLine } from "react-icons/ri";

export default function InstitutionalLoginForm() {
  const [email, setEmail] = useState("");
  const [accessKey, setAccessKey] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);
    // TODO: wire up your authentication logic here
    await new Promise((r) => setTimeout(r, 1200));
    setIsLoading(false);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Institutional ID / Email */}
      <div>
        <label
          htmlFor="inst-email"
          className="block text-xs font-bold text-[var(--color-on-surface-variant)] uppercase tracking-wider mb-2"
        >
          Institutional ID / Email
        </label>
        <div className="relative group">
          <RiBuildingLine
            className="
              absolute left-4 top-1/2 -translate-y-1/2 text-lg pointer-events-none
              text-[var(--color-on-surface-variant)]
              group-focus-within:text-[var(--color-secondary)] transition-colors
            "
          />
          <input
            id="inst-email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="entity@scopytrade.com"
            className="
              w-full bg-[var(--color-surface-container-highest)] border-none
              rounded-lg py-3 pl-12 pr-4
              text-[var(--color-on-surface)]
              placeholder:text-[var(--color-outline)]
              focus:ring-1 focus:ring-[var(--color-secondary)]/50 focus:outline-none
              transition-all
            "
          />
        </div>
      </div>

      {/* Access Key */}
      <div>
        <div className="flex justify-between items-center mb-2">
          <label
            htmlFor="access-key"
            className="block text-xs font-bold text-[var(--color-on-surface-variant)] uppercase tracking-wider"
          >
            Access Key
          </label>
          <Link
            href="#"
            className="text-[10px] text-[var(--color-primary)] hover:text-[var(--color-secondary)] uppercase tracking-tighter transition-colors"
          >
            Request Access
          </Link>
        </div>
        <div className="relative group">
          <RiKey2Line
            className="
              absolute left-4 top-1/2 -translate-y-1/2 text-lg pointer-events-none
              text-[var(--color-on-surface-variant)]
              group-focus-within:text-[var(--color-secondary)] transition-colors
            "
          />
          <input
            id="access-key"
            type="password"
            required
            value={accessKey}
            onChange={(e) => setAccessKey(e.target.value)}
            placeholder="••••••••••••••••"
            className="
              w-full bg-[var(--color-surface-container-highest)] border-none
              rounded-lg py-3 pl-12 pr-4
              text-[var(--color-on-surface)]
              placeholder:text-[var(--color-outline)]
              focus:ring-1 focus:ring-[var(--color-secondary)]/50 focus:outline-none
              transition-all
            "
          />
        </div>
      </div>

      {/* Submit */}
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
          <>
            <span>Enter Terminal</span>
            <RiArrowRightLine className="text-lg" />
          </>
        )}
      </button>
    </form>
  );
}
