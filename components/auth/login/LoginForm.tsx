// components/auth/login/LoginForm.tsx - NO setState in effects
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
  // Initialize state with localStorage values directly
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

  // Use Next.js useSearchParams hook instead of effect
  const searchParams = useSearchParams();
  const registered = searchParams.get("registered");

  // Show success message if coming from registration
  const successMessage =
    registered === "true"
      ? "Account created successfully! Please sign in."
      : "";

  // Clear the URL parameter without causing a re-render
  useEffect(() => {
    if (registered === "true") {
      // Use setTimeout to defer the URL replacement
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

      // Save email if remember me is checked
      if (rememberMe) {
        localStorage.setItem("savedEmail", email);
      } else {
        localStorage.removeItem("savedEmail");
      }

      const redirect: string = await authAPI.getPostLoginRedirect(user);
      window.location.href = redirect;
    } catch (err: unknown) {
      console.error("Login error:", err);

      let errorMessage = "Login failed. Please check your credentials.";
      if (
        err &&
        typeof err === "object" &&
        "message" in err &&
        typeof err.message === "string"
      ) {
        errorMessage = err.message;
      } else if (err && typeof err === "string") {
        errorMessage = err;
      }

      setError(errorMessage);
      setIsLoading(false);
    }
  }

  return (
    <div className="w-full md:w-1/2 lg:w-2/5 flex items-center justify-center p-6 md:p-8 lg:p-12 overflow-y-auto">
      <div className="w-full max-w-md">
        {/* Heading */}
        <div className="mb-8">
          <h2
            className="text-3xl font-bold text-[var(--color-on-surface)] mb-2"
            style={{ fontFamily: "var(--font-headline)" }}
          >
            Welcome back
          </h2>
          <p className="text-[var(--color-on-surface-variant)]">
            Sign in to your account to continue
          </p>
        </div>

        {/* Success message */}
        {successMessage && (
          <div className="mb-4 p-3 bg-green-500/10 border border-green-500/20 rounded-xl text-green-500 text-sm">
            {successMessage}
          </div>
        )}

        {/* Error message */}
        {error && (
          <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-500 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-[var(--color-on-surface-variant)] mb-2"
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
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setEmail(e.target.value)
                }
                placeholder="name@example.com"
                disabled={isLoading}
                className="
                  w-full bg-[var(--color-surface-container-highest)] 
                  rounded-xl py-3.5 pl-12 pr-4
                  text-[var(--color-on-surface)]
                  placeholder:text-[var(--color-outline)]
                  focus:ring-2 focus:ring-[var(--color-secondary)]/20 focus:outline-none
                  transition-all
                  disabled:opacity-50 disabled:cursor-not-allowed
                  border border-transparent focus:border-[var(--color-secondary)]/30
                "
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-[var(--color-on-surface-variant)] mb-2"
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
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setPassword(e.target.value)
                }
                placeholder="Enter your password"
                disabled={isLoading}
                className="
                  w-full bg-[var(--color-surface-container-highest)] 
                  rounded-xl py-3.5 pl-12 pr-12
                  text-[var(--color-on-surface)]
                  placeholder:text-[var(--color-outline)]
                  focus:ring-2 focus:ring-[var(--color-secondary)]/20 focus:outline-none
                  transition-all
                  disabled:opacity-50 disabled:cursor-not-allowed
                  border border-transparent focus:border-[var(--color-secondary)]/30
                "
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-[var(--color-on-surface-variant)]/50 hover:text-[var(--color-secondary)] transition-colors"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <RiEyeCloseLine className="text-lg" />
                ) : (
                  <RiEyeLine className="text-lg" />
                )}
              </button>
            </div>
          </div>

          {/* Remember me & Forgot password */}
          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setRememberMe(e.target.checked)
                }
                className="w-4 h-4 rounded border-[var(--color-outline)] text-[var(--color-secondary)] focus:ring-[var(--color-secondary)]/20"
              />
              <span className="text-sm text-[var(--color-on-surface-variant)]">
                Remember me
              </span>
            </label>
            <Link
              href="/forgot-password"
              className="text-sm text-[var(--color-secondary)] hover:underline transition-colors"
            >
              Forgot password?
            </Link>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="
              w-full bg-gradient-to-r from-[var(--color-secondary)] to-[var(--color-primary)]
              text-white font-semibold py-3.5 rounded-xl
              shadow-lg shadow-[var(--color-secondary)]/25
              hover:opacity-90 hover:shadow-xl
              active:scale-[0.98]
              transition-all flex items-center justify-center gap-2
              disabled:opacity-60 disabled:cursor-not-allowed
            "
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
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[var(--color-outline-variant)]"></div>
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="px-3 bg-[var(--color-surface-container-low)] text-[var(--color-on-surface-variant)]">
                Or continue with
              </span>
            </div>
          </div>

          {/* Social Login Buttons */}
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              disabled={isLoading}
              className="flex items-center justify-center gap-2 py-3 rounded-xl border border-[var(--color-outline-variant)] bg-[var(--color-surface-container-highest)] hover:bg-[var(--color-surface-container-high)] transition-colors disabled:opacity-50"
              aria-label="Sign in with Google"
            >
              <RiGoogleFill className="text-red-500" />
              <span className="text-sm font-medium">Google</span>
            </button>
            <button
              type="button"
              disabled={isLoading}
              className="flex items-center justify-center gap-2 py-3 rounded-xl border border-[var(--color-outline-variant)] bg-[var(--color-surface-container-highest)] hover:bg-[var(--color-surface-container-high)] transition-colors disabled:opacity-50"
              aria-label="Sign in with GitHub"
            >
              <RiGithubFill className="text-[var(--color-on-surface)]" />
              <span className="text-sm font-medium">GitHub</span>
            </button>
          </div>

          {/* Sign up link */}
          <div className="text-center pt-4">
            <p className="text-sm text-[var(--color-on-surface-variant)]">
              Don&apos;t have an account?{" "}
              <Link
                href="/register"
                className="text-[var(--color-secondary)] font-semibold hover:underline"
              >
                Create an account
              </Link>
            </p>
          </div>
        </form>

        {/* Security badges */}
        <div className="mt-8 pt-6 border-t border-[var(--color-outline-variant)]/50">
          <div className="flex justify-center gap-4">
            {["256-bit AES", "MPC Custody", "ISO 27001"].map((badge) => (
              <div key={badge} className="flex items-center gap-1.5">
                <div className="w-1 h-1 bg-green-500 rounded-full" />
                <span className="text-[10px] uppercase tracking-wider text-[var(--color-on-surface-variant)]/60 font-bold">
                  {badge}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
