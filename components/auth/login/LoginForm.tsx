// components/auth/login/LoginForm.tsx
"use client";

import { useState, FormEvent, useEffect } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  RiMailLine,
  RiLockLine,
  RiEyeLine,
  RiEyeCloseLine,
  RiArrowRightLine,
  RiGoogleFill,
  RiGithubFill,
} from "react-icons/ri";
import { authAPI, User } from "@/lib/api/auth";

export default function LoginForm() {
  const [email, setEmail] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("savedEmail") || "";
    }
    return "";
  });
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [rememberMe, setRememberMe] = useState(() => {
    if (typeof window !== "undefined") {
      return !!localStorage.getItem("savedEmail");
    }
    return false;
  });

  const searchParams = useSearchParams();
  const registered = searchParams.get("registered");
  const successMessage =
    registered === "true"
      ? "Account created successfully! Please sign in."
      : "";

  useEffect(() => {
    if (registered === "true") {
      const timer = setTimeout(() => {
        window.history.replaceState({}, "", "/login");
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [registered]);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    try {
      const user: User = await authAPI.login({ email, password, rememberMe });
      if (rememberMe) {
        localStorage.setItem("savedEmail", email);
      } else {
        localStorage.removeItem("savedEmail");
      }
      const redirect: string = await authAPI.getPostLoginRedirect(user);
      window.location.href = redirect;
    } catch (err: unknown) {
      let errorMessage = "Login failed. Please check your credentials.";
      if (
        err &&
        typeof err === "object" &&
        "message" in err &&
        typeof (err as { message: unknown }).message === "string"
      ) {
        errorMessage = (err as { message: string }).message;
      }
      setError(errorMessage);
      setIsLoading(false);
    }
  }

  return (
    <div className="w-full md:w-1/2 flex items-center justify-center p-8 lg:p-14 overflow-y-auto bg-[var(--color-surface-container-lowest)]">
      <div className="w-full max-w-sm">
        {/* Mobile logo */}
        <div className="md:hidden flex items-center gap-2 mb-8">
          <div className="w-8 h-8 bg-gradient-to-br from-[var(--color-secondary)] to-[var(--color-primary)] rounded-lg flex items-center justify-center">
            <span className="text-[var(--color-on-secondary)] font-black text-sm">
              S
            </span>
          </div>
          <span
            className="text-xl font-black tracking-tighter text-[var(--color-on-surface)]"
            style={{ fontFamily: "var(--font-headline)" }}
          >
            SCopyTrade
          </span>
        </div>

        {/* Heading */}
        <div className="mb-8">
          <h2
            className="text-3xl font-black tracking-tight text-[var(--color-on-surface)] mb-2"
            style={{ fontFamily: "var(--font-headline)" }}
          >
            Welcome back
          </h2>
          <p className="text-[var(--color-on-surface-variant)]">
            Sign in to your account to continue
          </p>
        </div>

        {/* Success */}
        {successMessage && (
          <div className="mb-5 p-3.5 bg-[var(--color-secondary)]/10 border border-[var(--color-secondary)]/20 rounded-xl text-[var(--color-secondary)] text-sm">
            {successMessage}
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="mb-5 p-3.5 bg-[var(--color-error-container)]/30 border border-[var(--color-error)]/20 rounded-xl text-[var(--color-error)] text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-xs font-bold uppercase tracking-widest text-[var(--color-on-surface-variant)] mb-2"
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
                placeholder="name@example.com"
                disabled={isLoading}
                className="w-full bg-[var(--color-surface-container-highest)] rounded-xl py-3.5 pl-12 pr-4 text-[var(--color-on-surface)] placeholder:text-[var(--color-outline)] focus:ring-2 focus:ring-[var(--color-secondary)]/20 focus:outline-none border border-transparent focus:border-[var(--color-secondary)]/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed text-sm"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label
                htmlFor="password"
                className="block text-xs font-bold uppercase tracking-widest text-[var(--color-on-surface-variant)]"
              >
                Password
              </label>
              <Link
                href="/forgot-password"
                className="text-xs text-[var(--color-secondary)] hover:underline"
              >
                Forgot password?
              </Link>
            </div>
            <div className="relative">
              <RiLockLine className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--color-on-surface-variant)]/50 text-lg pointer-events-none" />
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                disabled={isLoading}
                className="w-full bg-[var(--color-surface-container-highest)] rounded-xl py-3.5 pl-12 pr-12 text-[var(--color-on-surface)] placeholder:text-[var(--color-outline)] focus:ring-2 focus:ring-[var(--color-secondary)]/20 focus:outline-none border border-transparent focus:border-[var(--color-secondary)]/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed text-sm"
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

          {/* Remember me */}
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="w-4 h-4 rounded border-[var(--color-outline)] text-[var(--color-secondary)] focus:ring-[var(--color-secondary)]/20 accent-[var(--color-secondary)]"
            />
            <span className="text-sm text-[var(--color-on-surface-variant)]">
              Remember me for 30 days
            </span>
          </label>

          {/* Submit */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full button-gradient text-[var(--color-on-secondary)] font-bold py-3.5 rounded-xl shadow-lg shadow-[var(--color-secondary)]/15 hover:opacity-90 hover:shadow-xl active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Signing in...</span>
              </div>
            ) : (
              <>
                <span>Sign In</span>
                <RiArrowRightLine className="text-lg" />
              </>
            )}
          </button>

          {/* Divider */}
          <div className="relative my-2">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[var(--color-outline-variant)]" />
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="px-3 bg-[var(--color-surface-container-lowest)] text-[var(--color-on-surface-variant)]">
                Or continue with
              </span>
            </div>
          </div>

          {/* Social */}
          <div className="grid grid-cols-2 gap-3">
            {[
              {
                Icon: RiGoogleFill,
                label: "Google",
                iconClass: "text-red-500",
              },
              {
                Icon: RiGithubFill,
                label: "GitHub",
                iconClass: "text-[var(--color-on-surface)]",
              },
            ].map(({ Icon, label, iconClass }) => (
              <button
                key={label}
                type="button"
                disabled={isLoading}
                className="flex items-center justify-center gap-2.5 py-3 rounded-xl border border-[var(--color-outline-variant)] bg-[var(--color-surface-container-highest)] hover:bg-[var(--color-surface-container-high)] transition-colors disabled:opacity-50"
              >
                <Icon className={iconClass} />
                <span className="text-sm font-medium text-[var(--color-on-surface)]">
                  {label}
                </span>
              </button>
            ))}
          </div>

          {/* Sign up */}
          <p className="text-center text-sm text-[var(--color-on-surface-variant)] pt-1">
            Don&apos;t have an account?{" "}
            <Link
              href="/register"
              className="text-[var(--color-secondary)] font-bold hover:underline"
            >
              Create one
            </Link>
          </p>
        </form>

        {/* Security badges */}
        <div className="mt-8 pt-6 border-t border-[var(--color-outline-variant)]/30 flex justify-center gap-6">
          {["256-bit AES", "MPC Custody", "ISO 27001"].map((badge) => (
            <div key={badge} className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 bg-[var(--color-secondary)] rounded-full" />
              <span className="text-[10px] uppercase tracking-wider text-[var(--color-on-surface-variant)]/50 font-bold">
                {badge}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
