// components/auth/register/RegisterForm.tsx - COMPLETE FIXED VERSION
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
import { authAPI, UserRole } from "@/lib/api/auth";

interface PasswordRequirement {
  label: string;
  validator: (password: string) => boolean;
}

interface StrengthInfo {
  text: string;
  color: string;
  bg: string;
  width: string;
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
    description: "Follow traders",
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
  {
    label: "At least 8 characters",
    validator: (pwd: string) => pwd.length >= 8,
  },
  {
    label: "Contains uppercase letter",
    validator: (pwd: string) => /[A-Z]/.test(pwd),
  },
  {
    label: "Contains lowercase letter",
    validator: (pwd: string) => /[a-z]/.test(pwd),
  },
  { label: "Contains number", validator: (pwd: string) => /\d/.test(pwd) },
  {
    label: "Contains special character",
    validator: (pwd: string) => /[!@#$%^&*(),.?":{}|<>]/.test(pwd),
  },
];

export default function RegisterForm() {
  const [email, setEmail] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [role, setRole] = useState<UserRole>("CopyTrader");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);
  const [passwordStrength, setPasswordStrength] = useState<number>(0);
  const [isFocused, setIsFocused] = useState<boolean>(false);

  const calculateStrength = (pwd: string): void => {
    let strength = 0;
    requirements.forEach((req) => {
      if (req.validator(pwd)) strength++;
    });
    setPasswordStrength(strength);
  };

  const handlePasswordChange = (pwd: string): void => {
    setPassword(pwd);
    calculateStrength(pwd);
  };

  const getStrengthLabel = (): StrengthInfo | null => {
    if (password.length === 0) return null;
    if (passwordStrength <= 2) {
      return {
        text: "Weak",
        color: "text-red-500",
        bg: "bg-red-500",
        width: "33%",
      };
    }
    if (passwordStrength <= 4) {
      return {
        text: "Medium",
        color: "text-yellow-500",
        bg: "bg-yellow-500",
        width: "66%",
      };
    }
    return {
      text: "Strong",
      color: "text-green-500",
      bg: "bg-green-500",
      width: "100%",
    };
  };

  const strengthInfo = getStrengthLabel();

  const validateForm = (): string | null => {
    if (password !== confirmPassword) {
      return "Passwords do not match";
    }
    if (passwordStrength < 3) {
      return "Please use a stronger password";
    }
    if (!firstName || !lastName) {
      return "Please enter both first name and last name";
    }
    if (!email) {
      return "Please enter an email address";
    }
    return null;
  };

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

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
      // Redirect to login page after successful registration
      window.location.href = "/login?registered=true";
    } catch (err: unknown) {
      console.error("Registration error:", err);

      let errorMessage = "Registration failed. Please try again.";
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

  const isSubmitDisabled =
    isLoading || passwordStrength < 3 || password !== confirmPassword;

  return (
    <div className="w-full lg:w-1/2 flex items-center justify-center p-6 md:p-10 overflow-y-auto">
      <div className="w-full max-w-md">
        {/* Heading */}
        <div className="mb-6 text-center lg:text-left">
          <h2 className="text-2xl font-bold tracking-tight mb-1 text-[var(--color-on-surface)]">
            Create Account
          </h2>
          <p className="text-sm text-[var(--color-on-surface-variant)]">
            Join SCopyTrade and start copy trading
          </p>
        </div>

        {/* Error message */}
        {error && (
          <div className="mb-4 p-2.5 bg-red-500/10 border border-red-500/20 rounded-lg text-red-500 text-xs">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name fields - two columns */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label
                htmlFor="firstName"
                className="block text-xs font-medium text-[var(--color-on-surface-variant)] mb-1"
              >
                First Name
              </label>
              <div className="relative">
                <RiUserLine className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-on-surface-variant)]/50 text-sm pointer-events-none" />
                <input
                  id="firstName"
                  type="text"
                  required
                  value={firstName}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setFirstName(e.target.value)
                  }
                  placeholder="John"
                  disabled={isLoading}
                  className="w-full bg-[var(--color-surface-container-highest)] rounded-lg py-2.5 pl-9 pr-3 text-sm focus:ring-1 focus:ring-[var(--color-secondary)]/20 focus:outline-none disabled:opacity-50"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="lastName"
                className="block text-xs font-medium text-[var(--color-on-surface-variant)] mb-1"
              >
                Last Name
              </label>
              <div className="relative">
                <RiUserLine className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-on-surface-variant)]/50 text-sm pointer-events-none" />
                <input
                  id="lastName"
                  type="text"
                  required
                  value={lastName}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setLastName(e.target.value)
                  }
                  placeholder="Doe"
                  disabled={isLoading}
                  className="w-full bg-[var(--color-surface-container-highest)] rounded-lg py-2.5 pl-9 pr-3 text-sm focus:ring-1 focus:ring-[var(--color-secondary)]/20 focus:outline-none disabled:opacity-50"
                />
              </div>
            </div>
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-xs font-medium text-[var(--color-on-surface-variant)] mb-1"
            >
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
                className="w-full bg-[var(--color-surface-container-highest)] rounded-lg py-2.5 pl-9 pr-3 text-sm focus:ring-1 focus:ring-[var(--color-secondary)]/20 focus:outline-none disabled:opacity-50"
              />
            </div>
          </div>

          {/* Account role */}
          <div>
            <label className="block text-xs font-medium text-[var(--color-on-surface-variant)] mb-1">
              Account Type
            </label>
            <div className="grid grid-cols-2 gap-2">
              {roleOptions.map(({ value, label, description, Icon }) => {
                const isSelected = role === value;
                return (
                  <button
                    key={value}
                    type="button"
                    onClick={() => setRole(value)}
                    disabled={isLoading}
                    className={`p-2 rounded-lg text-left transition-all border ${
                      isSelected
                        ? "border-[var(--color-secondary)] bg-[var(--color-secondary)]/10"
                        : "border-transparent bg-[var(--color-surface-container-highest)] hover:border-[var(--color-secondary)]/30"
                    } disabled:opacity-50`}
                    aria-pressed={isSelected}
                  >
                    <div className="flex items-center gap-2">
                      <Icon
                        className={`text-base ${isSelected ? "text-[var(--color-secondary)]" : "text-[var(--color-on-surface-variant)]"}`}
                      />
                      <div>
                        <div className="text-xs font-bold text-[var(--color-on-surface)]">
                          {label}
                        </div>
                        <div className="text-[10px] text-[var(--color-on-surface-variant)]">
                          {description}
                        </div>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="block text-xs font-medium text-[var(--color-on-surface-variant)] mb-1"
            >
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
                  handlePasswordChange(e.target.value)
                }
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                placeholder="Create a strong password"
                disabled={isLoading}
                className="w-full bg-[var(--color-surface-container-highest)] rounded-lg py-2.5 pl-9 pr-9 text-sm focus:ring-1 focus:ring-[var(--color-secondary)]/20 focus:outline-none disabled:opacity-50"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--color-on-surface-variant)]/50 hover:text-[var(--color-secondary)]"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <RiEyeCloseLine className="text-sm" />
                ) : (
                  <RiEyeLine className="text-sm" />
                )}
              </button>
            </div>

            {password.length > 0 && strengthInfo && (
              <div className="mt-1.5">
                <div className="h-1 bg-[var(--color-surface-container-highest)] rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all duration-300 ${strengthInfo.bg}`}
                    style={{ width: strengthInfo.width }}
                  />
                </div>
                <p
                  className={`text-[10px] mt-0.5 font-medium ${strengthInfo.color}`}
                >
                  {strengthInfo.text} Password
                </p>
              </div>
            )}

            {(isFocused || password.length > 0) && (
              <div className="mt-1.5 space-y-0.5">
                {requirements.map((req, idx) => {
                  const isValid = req.validator(password);
                  return (
                    <div
                      key={idx}
                      className="flex items-center gap-1.5 text-[10px]"
                    >
                      {isValid ? (
                        <RiCheckboxCircleLine className="text-green-500 text-[10px]" />
                      ) : (
                        <RiCloseCircleLine className="text-red-500 text-[10px]" />
                      )}
                      <span
                        className={
                          isValid
                            ? "text-green-600"
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

          {/* Confirm Password */}
          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-xs font-medium text-[var(--color-on-surface-variant)] mb-1"
            >
              Confirm Password
            </label>
            <div className="relative">
              <RiLockLine className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-on-surface-variant)]/50 text-sm pointer-events-none" />
              <input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                required
                value={confirmPassword}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setConfirmPassword(e.target.value)
                }
                placeholder="Confirm your password"
                disabled={isLoading}
                className="w-full bg-[var(--color-surface-container-highest)] rounded-lg py-2.5 pl-9 pr-9 text-sm focus:ring-1 focus:ring-[var(--color-secondary)]/20 focus:outline-none disabled:opacity-50"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--color-on-surface-variant)]/50 hover:text-[var(--color-secondary)]"
                aria-label={
                  showConfirmPassword ? "Hide password" : "Show password"
                }
              >
                {showConfirmPassword ? (
                  <RiEyeCloseLine className="text-sm" />
                ) : (
                  <RiEyeLine className="text-sm" />
                )}
              </button>
            </div>
            {confirmPassword.length > 0 && (
              <p
                className={`text-[10px] mt-0.5 ${password === confirmPassword ? "text-green-500" : "text-red-500"}`}
              >
                {password === confirmPassword
                  ? "✓ Passwords match"
                  : "✗ Passwords do not match"}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitDisabled}
            className="w-full bg-gradient-to-r from-[var(--color-secondary)] to-[var(--color-primary)] text-white font-semibold py-2.5 rounded-lg hover:opacity-90 active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Creating account...</span>
              </div>
            ) : (
              <>
                <span>Create Account</span>
                <RiArrowRightLine className="text-base" />
              </>
            )}
          </button>

          {/* Sign in link */}
          <div className="text-center">
            <p className="text-xs text-[var(--color-on-surface-variant)]">
              Already have an account?{" "}
              <Link
                href="/login"
                className="text-[var(--color-secondary)] font-semibold hover:underline"
              >
                Sign In
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
