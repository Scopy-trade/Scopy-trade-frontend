"use client";

import { useState, FormEvent } from "react";
import Link from "next/link";
import { RiMailLine, RiLockLine, RiArrowRightLine } from "react-icons/ri";
import AccountTypeSelector from "./AccountTypeSelector";
import OrgAccessCode from "./OrgAccessCode";
import PartnerLogos from "./PartnerLogos";

type AccountType = "individual" | "institutional";

export default function RegisterForm() {
  const [accountType, setAccountType] = useState<AccountType>("individual");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [accessCode, setAccessCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);
    // TODO: wire up your registration logic here
    await new Promise((r) => setTimeout(r, 1200)); // simulate network
    setIsLoading(false);
  }

  return (
    <div className="w-full lg:w-1/2 flex items-center justify-center p-6 md:p-12">
      <div className="w-full max-w-md">
        {/* Heading */}
        <div className="mb-10 text-center lg:text-left">
          <h2 className="text-3xl font-bold tracking-tight mb-2 text-[var(--color-on-surface)]">
            Create Account
          </h2>
          <p className="text-[var(--color-on-surface-variant)]">
            Choose your gateway to the ledger
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Account type */}
          <AccountTypeSelector value={accountType} onChange={setAccountType} />

          {/* Input fields */}
          <div className="space-y-5">
            {/* Email */}
            <div className="group">
              <label
                htmlFor="email"
                className="block text-xs font-bold uppercase tracking-widest text-[var(--color-on-surface-variant)] mb-2 group-focus-within:text-[var(--color-secondary)] transition-colors"
              >
                Email Address
              </label>
              <div className="relative">
                <RiMailLine className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--color-on-surface-variant)]/50 text-lg pointer-events-none" />
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@company.com"
                  className="
                    w-full bg-[var(--color-surface-container-highest)] border-none
                    rounded-xl py-4 pl-12 pr-4
                    focus:ring-1 focus:ring-[var(--color-secondary)]/20 focus:outline-none
                    placeholder:text-[var(--color-on-surface-variant)]/30
                    text-[var(--color-on-surface)]
                    transition-all
                  "
                />
              </div>
            </div>

            {/* Password */}
            <div className="group">
              <label
                htmlFor="password"
                className="block text-xs font-bold uppercase tracking-widest text-[var(--color-on-surface-variant)] mb-2 group-focus-within:text-[var(--color-secondary)] transition-colors"
              >
                Security Password
              </label>
              <div className="relative">
                <RiLockLine className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--color-on-surface-variant)]/50 text-lg pointer-events-none" />
                <input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="
                    w-full bg-[var(--color-surface-container-highest)] border-none
                    rounded-xl py-4 pl-12 pr-4
                    focus:ring-1 focus:ring-[var(--color-secondary)]/20 focus:outline-none
                    placeholder:text-[var(--color-on-surface-variant)]/30
                    text-[var(--color-on-surface)]
                    transition-all
                  "
                />
              </div>
            </div>
          </div>

          {/* Org access code */}
          <OrgAccessCode value={accessCode} onChange={setAccessCode} />

          {/* Submit */}
          <div className="pt-4">
            <button
              type="submit"
              disabled={isLoading}
              className="
                w-full button-gradient text-[var(--color-on-secondary)]
                font-bold py-4 rounded-xl
                shadow-lg shadow-[var(--color-secondary)]/10
                hover:opacity-90 active:scale-[0.98]
                transition-all flex items-center justify-center gap-2
                disabled:opacity-60 disabled:cursor-not-allowed
              "
            >
              {isLoading ? (
                <span className="animate-pulse">Initializing…</span>
              ) : (
                <>
                  <span>Initialize My Ledger</span>
                  <RiArrowRightLine className="text-lg" />
                </>
              )}
            </button>
          </div>

          {/* Sign-in link */}
          <div className="text-center">
            <p className="text-sm text-[var(--color-on-surface-variant)]">
              Already part of the network?{" "}
              <Link
                href="/login"
                className="text-[var(--color-secondary)] font-semibold hover:underline"
              >
                Sign In
              </Link>
            </p>
          </div>
        </form>

        {/* Partner logos */}
        <PartnerLogos />
      </div>
    </div>
  );
}
