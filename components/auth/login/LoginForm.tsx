"use client";

import { useState } from "react";
import Link from "next/link";
import LoginMethodTabs, { LoginMethod } from "./LoginMethodTabs";
import WalletOptions from "./WalletOptions";
import InstitutionalLoginForm from "./InstitutionalLoginForm";

export default function LoginForm() {
  const [activeMethod, setActiveMethod] = useState<LoginMethod>("web3");

  return (
    <div className="p-8 md:p-16 flex flex-col justify-center bg-[var(--color-surface-container-low)]">
      {/* Heading */}
      <div className="mb-10">
        <h3
          className="text-2xl font-bold text-[var(--color-on-surface)] mb-2"
          style={{ fontFamily: "var(--font-headline)" }}
        >
          Welcome Back
        </h3>
        <p className="text-[var(--color-on-surface-variant)]">
          Select your preferred entry method.
        </p>
      </div>

      {/* Tab switcher */}
      <LoginMethodTabs active={activeMethod} onChange={setActiveMethod} />

      {/* Wallet options — shown when Web3 tab is active */}
      {activeMethod === "web3" && (
        <WalletOptions onConnect={(id) => console.log("Connect:", id)} />
      )}

      {/* Divider */}
      <div className="relative my-10">
        <div aria-hidden="true" className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-[var(--color-outline-variant)]/20" />
        </div>
        <div className="relative flex justify-center text-xs uppercase tracking-widest font-bold">
          <span className="bg-[var(--color-surface-container-low)] px-4 text-[var(--color-on-surface-variant)]">
            Institutional Access
          </span>
        </div>
      </div>

      {/* Institutional form — always visible below divider */}
      <InstitutionalLoginForm />

      {/* Terms */}
      <div className="mt-8 text-center">
        <p className="text-xs text-[var(--color-on-surface-variant)]">
          By entering, you agree to our{" "}
          <Link
            href="#"
            className="
              text-[var(--color-on-surface)]
              border-b border-[var(--color-outline-variant)]
              hover:text-[var(--color-secondary)]
              hover:border-[var(--color-secondary)]
              transition-all
            "
          >
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link
            href="#"
            className="
              text-[var(--color-on-surface)]
              border-b border-[var(--color-outline-variant)]
              hover:text-[var(--color-secondary)]
              hover:border-[var(--color-secondary)]
              transition-all
            "
          >
            Privacy Protocol
          </Link>
          .
        </p>
      </div>

      {/* Sign-up nudge */}
      <div className="mt-4 text-center">
        <p className="text-xs text-[var(--color-on-surface-variant)]">
          New to the network?{" "}
          <Link
            href="/register"
            className="text-[var(--color-secondary)] font-semibold hover:underline"
          >
            Create Account
          </Link>
        </p>
      </div>
    </div>
  );
}
