"use client";

import { useState, FormEvent } from "react";
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
} from "react-icons/ri";
import PartnerLogos from "./PartnerLogos";
import { authAPI } from "@/lib/api/auth";

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

export default function RegisterForm() {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // Password visibility states
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Password strength state
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [isFocused, setIsFocused] = useState(false);

  // Password requirements
  const requirements: PasswordRequirement[] = [
    { label: "At least 8 characters", validator: (pwd) => pwd.length >= 8 },
    {
      label: "Contains uppercase letter",
      validator: (pwd) => /[A-Z]/.test(pwd),
    },
    {
      label: "Contains lowercase letter",
      validator: (pwd) => /[a-z]/.test(pwd),
    },
    { label: "Contains number", validator: (pwd) => /\d/.test(pwd) },
    {
      label: "Contains special character",
      validator: (pwd) => /[!@#$%^&*(),.?":{}|<>]/.test(pwd),
    },
  ];

  // Calculate password strength
  const calculateStrength = (pwd: string) => {
    let strength = 0;
    requirements.forEach((req) => {
      if (req.validator(pwd)) strength++;
    });
    setPasswordStrength(strength);
  };

  const handlePasswordChange = (pwd: string) => {
    setPassword(pwd);
    calculateStrength(pwd);
  };

  const getStrengthLabel = (): StrengthInfo | null => {
    if (password.length === 0) return null;
    if (passwordStrength <= 2)
      return {
        text: "Weak",
        color: "text-red-500",
        bg: "bg-red-500",
        width: "33%",
      };
    if (passwordStrength <= 4)
      return {
        text: "Medium",
        color: "text-yellow-500",
        bg: "bg-yellow-500",
        width: "66%",
      };
    return {
      text: "Strong",
      color: "text-green-500",
      bg: "bg-green-500",
      width: "100%",
    };
  };

  const strengthInfo = getStrengthLabel();

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");

    // Validation
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (passwordStrength < 3) {
      setError("Please use a stronger password");
      return;
    }

    if (!firstName || !lastName) {
      setError("Please enter both first name and last name");
      return;
    }

    setIsLoading(true);

    try {
      const registerData = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
        confirmPassword: confirmPassword,
      };

      await authAPI.register(registerData);
      window.location.href = "/dashboard";
    } catch (err: any) {
      console.error("Registration error:", err);
      setError(err.message || "Registration failed. Please try again.");
      setIsLoading(false);
    }
  }

  return (
    <div className="w-full lg:w-1/2 flex items-center justify-center p-6 md:p-12 overflow-y-auto max-h-screen">
      <div className="w-full max-w-md">
        {/* Heading */}
        <div className="mb-10 text-center lg:text-left">
          <h2 className="text-3xl font-bold tracking-tight mb-2 text-[var(--color-on-surface)]">
            Create Account
          </h2>
          <p className="text-[var(--color-on-surface-variant)]">
            Join SCopyTrade and start copy trading
          </p>
        </div>

        {/* Error message */}
        {error && (
          <div className="mb-6 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-500 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name fields - two columns */}
          <div className="grid grid-cols-2 gap-4">
            {/* First Name */}
            <div className="group">
              <label
                htmlFor="firstName"
                className="block text-xs font-bold uppercase tracking-widest text-[var(--color-on-surface-variant)] mb-2 group-focus-within:text-[var(--color-secondary)] transition-colors"
              >
                First Name
              </label>
              <div className="relative">
                <RiUserLine className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--color-on-surface-variant)]/50 text-lg pointer-events-none" />
                <input
                  id="firstName"
                  type="text"
                  required
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="John"
                  disabled={isLoading}
                  className="
                    w-full bg-[var(--color-surface-container-highest)] border-none
                    rounded-xl py-4 pl-12 pr-4
                    focus:ring-1 focus:ring-[var(--color-secondary)]/20 focus:outline-none
                    placeholder:text-[var(--color-on-surface-variant)]/30
                    text-[var(--color-on-surface)]
                    transition-all
                    disabled:opacity-50 disabled:cursor-not-allowed
                  "
                />
              </div>
            </div>

            {/* Last Name */}
            <div className="group">
              <label
                htmlFor="lastName"
                className="block text-xs font-bold uppercase tracking-widest text-[var(--color-on-surface-variant)] mb-2 group-focus-within:text-[var(--color-secondary)] transition-colors"
              >
                Last Name
              </label>
              <div className="relative">
                <RiUserLine className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--color-on-surface-variant)]/50 text-lg pointer-events-none" />
                <input
                  id="lastName"
                  type="text"
                  required
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Doe"
                  disabled={isLoading}
                  className="
                    w-full bg-[var(--color-surface-container-highest)] border-none
                    rounded-xl py-4 pl-12 pr-4
                    focus:ring-1 focus:ring-[var(--color-secondary)]/20 focus:outline-none
                    placeholder:text-[var(--color-on-surface-variant)]/30
                    text-[var(--color-on-surface)]
                    transition-all
                    disabled:opacity-50 disabled:cursor-not-allowed
                  "
                />
              </div>
            </div>
          </div>

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
                placeholder="name@example.com"
                disabled={isLoading}
                className="
                  w-full bg-[var(--color-surface-container-highest)] border-none
                  rounded-xl py-4 pl-12 pr-4
                  focus:ring-1 focus:ring-[var(--color-secondary)]/20 focus:outline-none
                  placeholder:text-[var(--color-on-surface-variant)]/30
                  text-[var(--color-on-surface)]
                  transition-all
                  disabled:opacity-50 disabled:cursor-not-allowed
                "
              />
            </div>
          </div>

          {/* Password with visibility toggle and strength meter */}
          <div className="group">
            <label
              htmlFor="password"
              className="block text-xs font-bold uppercase tracking-widest text-[var(--color-on-surface-variant)] mb-2 group-focus-within:text-[var(--color-secondary)] transition-colors"
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
                onChange={(e) => handlePasswordChange(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                placeholder="••••••••"
                disabled={isLoading}
                className="
                  w-full bg-[var(--color-surface-container-highest)] border-none
                  rounded-xl py-4 pl-12 pr-12
                  focus:ring-1 focus:ring-[var(--color-secondary)]/20 focus:outline-none
                  placeholder:text-[var(--color-on-surface-variant)]/30
                  text-[var(--color-on-surface)]
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

            {/* Password strength meter */}
            {password.length > 0 && strengthInfo && (
              <div className="mt-3 space-y-2">
                <div className="h-1.5 bg-[var(--color-surface-container-highest)] rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all duration-300 ${strengthInfo.bg}`}
                    style={{ width: strengthInfo.width }}
                  />
                </div>
                <p className={`text-xs font-medium ${strengthInfo.color}`}>
                  {strengthInfo.text} Password
                </p>
              </div>
            )}

            {/* Password requirements list */}
            {(isFocused || password.length > 0) && (
              <div className="mt-3 space-y-1.5">
                {requirements.map((req, idx) => {
                  const isValid = req.validator(password);
                  return (
                    <div key={idx} className="flex items-center gap-2 text-xs">
                      {isValid ? (
                        <RiCheckboxCircleLine className="text-green-500 text-sm" />
                      ) : (
                        <RiCloseCircleLine className="text-red-500 text-sm" />
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
          <div className="group">
            <label
              htmlFor="confirmPassword"
              className="block text-xs font-bold uppercase tracking-widest text-[var(--color-on-surface-variant)] mb-2 group-focus-within:text-[var(--color-secondary)] transition-colors"
            >
              Confirm Password
            </label>
            <div className="relative">
              <RiLockLine className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--color-on-surface-variant)]/50 text-lg pointer-events-none" />
              <input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                disabled={isLoading}
                className="
                  w-full bg-[var(--color-surface-container-highest)] border-none
                  rounded-xl py-4 pl-12 pr-12
                  focus:ring-1 focus:ring-[var(--color-secondary)]/20 focus:outline-none
                  placeholder:text-[var(--color-on-surface-variant)]/30
                  text-[var(--color-on-surface)]
                  transition-all
                  disabled:opacity-50 disabled:cursor-not-allowed
                "
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-[var(--color-on-surface-variant)]/50 hover:text-[var(--color-secondary)] transition-colors"
              >
                {showConfirmPassword ? (
                  <RiEyeCloseLine className="text-lg" />
                ) : (
                  <RiEyeLine className="text-lg" />
                )}
              </button>
            </div>

            {/* Password match indicator */}
            {confirmPassword.length > 0 && (
              <div className="mt-2">
                <p
                  className={`text-xs ${password === confirmPassword ? "text-green-500" : "text-red-500"}`}
                >
                  {password === confirmPassword
                    ? "✓ Passwords match"
                    : "✗ Passwords do not match"}
                </p>
              </div>
            )}
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <button
              type="submit"
              disabled={
                isLoading ||
                passwordStrength < 3 ||
                password !== confirmPassword
              }
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
                <span className="animate-pulse">Creating account…</span>
              ) : (
                <>
                  <span>Create Account</span>
                  <RiArrowRightLine className="text-lg" />
                </>
              )}
            </button>
          </div>

          {/* Sign in link */}
          <div className="text-center">
            <p className="text-sm text-[var(--color-on-surface-variant)]">
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

        {/* Partner logos */}
        <PartnerLogos />
      </div>
    </div>
  );
}
