// components/auth/register/RegisterForm.tsx
"use client";

import { useState, FormEvent, ChangeEvent } from "react";
import Link from "next/link";
import {
  RiMailLine,
  RiLockLine,
  RiArrowRightLine,
  RiUserLine,
  RiEyeLine,
  RiEyeCloseLine,
  RiCheckboxCircleLine,
  RiCloseCircleLine,
  RiLineChartLine,
  RiUserFollowLine,
} from "react-icons/ri";
import { authAPI } from "@/lib/api/client";
import { UserRole } from "@/lib";
import BrandLogo from "@/components/brand/BrandLogo";

interface PasswordRequirement {
  label: string;
  validator: (password: string) => boolean;
}

interface RoleOption {
  value: UserRole;
  label: string;
  description: string;
  Icon: React.ComponentType<{ className?: string }>;
}

const roleOptions: RoleOption[] = [
  {
    value: "CopyTrader",
    label: "Copy Trader",
    description: "Follow & copy traders",
    Icon: RiUserFollowLine,
  },
  {
    value: "Pro Trader",
    label: "Pro Trader",
    description: "Publish signals",
    Icon: RiLineChartLine,
  },
];

const requirements: PasswordRequirement[] = [
  { label: "At least 8 characters", validator: (p) => p.length >= 8 },
  { label: "Uppercase letter", validator: (p) => /[A-Z]/.test(p) },
  { label: "Lowercase letter", validator: (p) => /[a-z]/.test(p) },
  { label: "Number", validator: (p) => /\d/.test(p) },
  {
    label: "Special character",
    validator: (p) => /[!@#$%^&*(),.?":{}|<>]/.test(p),
  },
];

function getStrength(pwd: string) {
  if (!pwd) return null;
  const score = requirements.filter((r) => r.validator(pwd)).length;
  if (score <= 2)
    return {
      text: "Weak",
      color: "text-[#ffb4ab]",
      bg: "bg-[#ffb4ab]",
      width: "33%",
    };
  if (score <= 4)
    return {
      text: "Medium",
      color: "text-yellow-400",
      bg: "bg-yellow-400",
      width: "66%",
    };
  return {
    text: "Strong",
    color: "text-[#4edea3]",
    bg: "bg-[#4edea3]",
    width: "100%",
  };
}

export default function RegisterForm() {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [role, setRole] = useState<UserRole>("CopyTrader");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [pwdFocused, setPwdFocused] = useState(false);

  const strengthInfo = getStrength(password);
  const pwdScore = requirements.filter((r) => r.validator(password)).length;
  const isSubmitDisabled =
    isLoading || pwdScore < 3 || password !== confirmPassword;

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    if (password !== confirmPassword) return setError("Passwords do not match");
    if (pwdScore < 3) return setError("Please use a stronger password");
    if (!firstName || !lastName) return setError("Please enter your full name");
    setIsLoading(true);
    try {
      await authAPI.register({
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
        role,
      });
      window.location.href = "/login?registered=true";
    } catch (err: unknown) {
      let msg = "Registration failed. Please try again.";
      if (
        err &&
        typeof err === "object" &&
        "message" in err &&
        typeof (err as { message: unknown }).message === "string"
      ) {
        msg = (err as { message: string }).message;
      }
      setError(msg);
      setIsLoading(false);
    }
  }

  const inputClass =
    "w-full bg-[var(--color-surface-container-highest)] rounded-xl py-3 pl-10 pr-4 text-sm text-[var(--color-on-surface)] placeholder:text-[var(--color-outline)] focus:ring-2 focus:ring-[var(--color-secondary)]/20 focus:outline-none border border-transparent focus:border-[var(--color-secondary)]/30 transition-all disabled:opacity-50";

  return (
    <div className="w-full lg:w-1/2 flex items-center justify-center p-6 md:p-10 xl:p-14 overflow-y-auto bg-[var(--color-surface-container-lowest)]">
      <div className="w-full max-w-sm py-4">
        {/* Mobile logo */}
        <div className="lg:hidden mb-7">
          <BrandLogo className="h-12 w-40" priority />
        </div>

        {/* Heading */}
        <div className="mb-7">
          <h2
            className="text-3xl font-black tracking-tight text-[var(--color-on-surface)] mb-1.5"
            style={{ fontFamily: "var(--font-headline)" }}
          >
            Create Account
          </h2>
          <p className="text-[var(--color-on-surface-variant)] text-sm">
            Join SCopyTrade and start copy trading
          </p>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-5 p-3.5 bg-[var(--color-error-container)]/30 border border-[var(--color-error)]/20 rounded-xl text-[var(--color-error)] text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name fields */}
          <div className="grid grid-cols-2 gap-3">
            {[
              {
                id: "firstName",
                label: "First Name",
                value: firstName,
                set: setFirstName,
                placeholder: "Alex",
              },
              {
                id: "lastName",
                label: "Last Name",
                value: lastName,
                set: setLastName,
                placeholder: "Sovereign",
              },
            ].map((f) => (
              <div key={f.id}>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-[var(--color-on-surface-variant)] mb-1.5">
                  {f.label}
                </label>
                <div className="relative">
                  <RiUserLine className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-on-surface-variant)]/50 text-sm pointer-events-none" />
                  <input
                    id={f.id}
                    type="text"
                    required
                    value={f.value}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      f.set(e.target.value)
                    }
                    placeholder={f.placeholder}
                    disabled={isLoading}
                    className={inputClass}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Email */}
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-widest text-[var(--color-on-surface-variant)] mb-1.5">
              Email Address
            </label>
            <div className="relative">
              <RiMailLine className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-on-surface-variant)]/50 text-sm pointer-events-none" />
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setEmail(e.target.value)
                }
                placeholder="name@example.com"
                disabled={isLoading}
                className={inputClass}
              />
            </div>
          </div>

          {/* Role selector */}
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-widest text-[var(--color-on-surface-variant)] mb-1.5">
              Account Type
            </label>
            <div className="grid grid-cols-2 gap-2">
              {roleOptions.map(({ value, label, description, Icon }) => {
                const selected = role === value;
                return (
                  <button
                    key={value}
                    type="button"
                    onClick={() => setRole(value)}
                    disabled={isLoading}
                    className={`p-3 rounded-xl text-left transition-all border ${
                      selected
                        ? "border-[var(--color-secondary)] bg-[var(--color-secondary)]/10"
                        : "border-[var(--color-outline-variant)]/30 bg-[var(--color-surface-container-highest)] hover:border-[var(--color-secondary)]/40"
                    } disabled:opacity-50`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon
                        className={`text-base flex-shrink-0 ${selected ? "text-[var(--color-secondary)]" : "text-[var(--color-on-surface-variant)]"}`}
                      />
                      <div>
                        <p className="text-xs font-bold text-[var(--color-on-surface)]">
                          {label}
                        </p>
                        <p className="text-[10px] text-[var(--color-on-surface-variant)]">
                          {description}
                        </p>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-widest text-[var(--color-on-surface-variant)] mb-1.5">
              Password
            </label>
            <div className="relative">
              <RiLockLine className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-on-surface-variant)]/50 text-sm pointer-events-none" />
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setPassword(e.target.value)
                }
                onFocus={() => setPwdFocused(true)}
                onBlur={() => setPwdFocused(false)}
                placeholder="Create a strong password"
                disabled={isLoading}
                className={`${inputClass} pr-10`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--color-on-surface-variant)]/50 hover:text-[var(--color-secondary)] transition-colors"
              >
                {showPassword ? <RiEyeCloseLine /> : <RiEyeLine />}
              </button>
            </div>

            {/* Strength bar */}
            {password && strengthInfo && (
              <div className="mt-2">
                <div className="h-1 bg-[var(--color-surface-container-highest)] rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-300 ${strengthInfo.bg}`}
                    style={{ width: strengthInfo.width }}
                  />
                </div>
                <p
                  className={`text-[10px] mt-1 font-semibold ${strengthInfo.color}`}
                >
                  {strengthInfo.text} password
                </p>
              </div>
            )}

            {/* Requirements */}
            {(pwdFocused || password.length > 0) && (
              <div className="mt-2 grid grid-cols-2 gap-x-3 gap-y-1">
                {requirements.map((req) => {
                  const ok = req.validator(password);
                  return (
                    <div
                      key={req.label}
                      className="flex items-center gap-1.5 text-[10px]"
                    >
                      {ok ? (
                        <RiCheckboxCircleLine className="text-[#4edea3] flex-shrink-0" />
                      ) : (
                        <RiCloseCircleLine className="text-[#ffb4ab] flex-shrink-0" />
                      )}
                      <span
                        className={
                          ok
                            ? "text-[#4edea3]"
                            : "text-[var(--color-on-surface-variant)]"
                        }
                      >
                        {req.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Confirm password */}
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-widest text-[var(--color-on-surface-variant)] mb-1.5">
              Confirm Password
            </label>
            <div className="relative">
              <RiLockLine className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-on-surface-variant)]/50 text-sm pointer-events-none" />
              <input
                id="confirmPassword"
                type={showConfirm ? "text" : "password"}
                required
                value={confirmPassword}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setConfirmPassword(e.target.value)
                }
                placeholder="Confirm your password"
                disabled={isLoading}
                className={`${inputClass} pr-10 ${confirmPassword && password !== confirmPassword ? "border-[var(--color-error)]/40 focus:border-[var(--color-error)]/40" : confirmPassword && password === confirmPassword ? "border-[var(--color-secondary)]/30" : ""}`}
              />
              <button
                type="button"
                onClick={() => setShowConfirm(!showConfirm)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--color-on-surface-variant)]/50 hover:text-[var(--color-secondary)] transition-colors"
              >
                {showConfirm ? <RiEyeCloseLine /> : <RiEyeLine />}
              </button>
            </div>
            {confirmPassword && (
              <p
                className={`text-[10px] mt-1 font-semibold flex items-center gap-1 ${password === confirmPassword ? "text-[#4edea3]" : "text-[#ffb4ab]"}`}
              >
                {password === confirmPassword ? (
                  <RiCheckboxCircleLine />
                ) : (
                  <RiCloseCircleLine />
                )}
                {password === confirmPassword
                  ? "Passwords match"
                  : "Passwords do not match"}
              </p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmitDisabled}
            className="w-full button-gradient text-[var(--color-on-secondary)] font-bold py-3.5 rounded-xl shadow-lg shadow-[var(--color-secondary)]/15 hover:opacity-90 active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed mt-2"
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Creating account...</span>
              </div>
            ) : (
              <>
                <span>Create Account</span>
                <RiArrowRightLine className="text-lg" />
              </>
            )}
          </button>

          {/* Sign in */}
          <p className="text-center text-sm text-[var(--color-on-surface-variant)]">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-[var(--color-secondary)] font-bold hover:underline"
            >
              Sign In
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
