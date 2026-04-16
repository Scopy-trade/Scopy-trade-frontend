"use client";

import { useState } from "react";
import Link from "next/link";
import {
  RiMailLine,
  RiLockPasswordLine,
  RiArrowRightLine,
  RiEyeLine,
  RiEyeOffLine,
} from "react-icons/ri";
import AccountTypeSelector, { AccountType } from "./AccountTypeSelector";
import OrgAccessCode from "./OrgAccessCode";
import PartnerLogos from "./PartnerLogos";

export default function RegisterForm() {
  const [accountType, setAccountType] = useState<AccountType>("individual");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [accessCode, setAccessCode] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    setIsLoading(false);
  };

  const inputBase: React.CSSProperties = {
    width: "100%",
    backgroundColor: "#2d3449",
    border: "none",
    borderRadius: "0.75rem",
    padding: "1rem 1rem 1rem 3rem",
    color: "#dae2fd",
    fontSize: "0.875rem",
    outline: "none",
    transition: "box-shadow 0.2s",
  };

  return (
    <div
      className="w-full lg:w-1/2 flex items-center justify-center p-6 md:p-12"
      style={{ backgroundColor: "#060e20" }}
    >
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="mb-10 text-center lg:text-left">
          <h2
            className="text-3xl font-bold tracking-tight mb-2"
            style={{ fontFamily: "var(--font-headline)", color: "#dae2fd" }}
          >
            Create Account
          </h2>
          <p style={{ color: "#c5c6ce" }}>Choose your gateway to the ledger</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Account type */}
          <AccountTypeSelector value={accountType} onChange={setAccountType} />

          {/* Inputs */}
          <div className="space-y-5">
            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-xs font-bold uppercase tracking-widest mb-2"
                style={{ color: "#c5c6ce" }}
              >
                Email Address
              </label>
              <div className="relative">
                <RiMailLine
                  className="absolute top-1/2 -translate-y-1/2"
                  style={{
                    left: "1rem",
                    color: "rgba(197,198,206,0.5)",
                    fontSize: "1.125rem",
                    pointerEvents: "none",
                  }}
                />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@company.com"
                  required
                  style={inputBase}
                  onFocus={(e) =>
                    (e.target.style.boxShadow =
                      "0 0 0 1px rgba(78,222,163,0.4)")
                  }
                  onBlur={(e) => (e.target.style.boxShadow = "none")}
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block text-xs font-bold uppercase tracking-widest mb-2"
                style={{ color: "#c5c6ce" }}
              >
                Security Password
              </label>
              <div className="relative">
                <RiLockPasswordLine
                  className="absolute top-1/2 -translate-y-1/2"
                  style={{
                    left: "1rem",
                    color: "rgba(197,198,206,0.5)",
                    fontSize: "1.125rem",
                    pointerEvents: "none",
                  }}
                />
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  style={{ ...inputBase, paddingRight: "3rem" }}
                  onFocus={(e) =>
                    (e.target.style.boxShadow =
                      "0 0 0 1px rgba(78,222,163,0.4)")
                  }
                  onBlur={(e) => (e.target.style.boxShadow = "none")}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute top-1/2 -translate-y-1/2 transition-colors"
                  style={{
                    right: "1rem",
                    color: "rgba(197,198,206,0.5)",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                  }}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <RiEyeOffLine style={{ fontSize: "1.125rem" }} />
                  ) : (
                    <RiEyeLine style={{ fontSize: "1.125rem" }} />
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Org code */}
          <OrgAccessCode value={accessCode} onChange={setAccessCode} />

          {/* Submit */}
          <div className="pt-4">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full font-bold flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
              style={{
                background:
                  "linear-gradient(to bottom right, #4edea3, #00a572)",
                color: "#003824",
                padding: "1rem",
                borderRadius: "0.75rem",
                fontSize: "0.9375rem",
                border: "none",
                cursor: isLoading ? "not-allowed" : "pointer",
                opacity: isLoading ? 0.7 : 1,
                boxShadow: "0 8px 24px rgba(78,222,163,0.15)",
              }}
              onMouseEnter={(e) =>
                !isLoading &&
                ((e.currentTarget as HTMLButtonElement).style.opacity = "0.9")
              }
              onMouseLeave={(e) =>
                !isLoading &&
                ((e.currentTarget as HTMLButtonElement).style.opacity = "1")
              }
            >
              {isLoading ? (
                <>
                  <svg
                    className="animate-spin h-5 w-5"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v8z"
                    />
                  </svg>
                  <span>Initializing…</span>
                </>
              ) : (
                <>
                  <span>Initialize My Ledger</span>
                  <RiArrowRightLine style={{ fontSize: "1.125rem" }} />
                </>
              )}
            </button>
          </div>

          {/* Sign in link */}
          <div className="text-center">
            <p className="text-sm" style={{ color: "#c5c6ce" }}>
              Already part of the network?{" "}
              <Link
                href="/login"
                className="font-semibold hover:underline"
                style={{ color: "#4edea3" }}
              >
                Sign In
              </Link>
            </p>
          </div>
        </form>

        <PartnerLogos />
      </div>
    </div>
  );
}
