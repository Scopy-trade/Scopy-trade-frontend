"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  RiLockLine,
  RiArrowRightLine,
  RiArrowLeftLine,
  RiCheckLine,
  RiExchangeLine,
  RiKeyLine,
  RiShieldCheckLine,
  RiInformationLine,
  RiEyeLine,
  RiEyeCloseLine,
  RiLoader4Line,
} from "react-icons/ri";
import { authAPI } from "@/lib/api/client";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Exchange {
  id: string;
  name: string;
  logo: string;
  requiresPassphrase: boolean;
}

interface FormState {
  apiKey: string;
  apiSecret: string;
  passphrase: string;
  label: string;
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const EXCHANGES: Exchange[] = [
  {
    id: "binance",
    name: "Binance",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/Binance_Logo.svg/480px-Binance_Logo.svg.png",
    requiresPassphrase: false,
  },
  {
    id: "kucoin",
    name: "KuCoin",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/KuCoin_Logo.svg/512px-KuCoin_Logo.svg.png",
    requiresPassphrase: true,
  },
  {
    id: "bybit",
    name: "Bybit",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/35/Bybit_Logo.svg/512px-Bybit_Logo.svg.png",
    requiresPassphrase: false,
  },
  {
    id: "okx",
    name: "OKX",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ef/OKX_Logo.svg/512px-OKX_Logo.svg.png",
    requiresPassphrase: true,
  },
];

const STEPS = ["Choose Exchange", "Connect API", "Confirmed"];

// ─── Component ────────────────────────────────────────────────────────────────

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [selectedExchange, setSelectedExchange] = useState<Exchange | null>(
    null,
  );
  const [form, setForm] = useState<FormState>({
    apiKey: "",
    apiSecret: "",
    passphrase: "",
    label: "",
  });
  const [showSecret, setShowSecret] = useState(false);
  const [showPassphrase, setShowPassphrase] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // ── Handlers ──────────────────────────────────────────────────────────────

  function handleSelectExchange(exchange: Exchange) {
    setSelectedExchange(exchange);
    setError("");
  }

  function handleFormChange(field: keyof FormState, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
    setError("");
  }

  function handleBack() {
    setError("");
    setStep((s) => Math.max(0, s - 1));
  }

  function handleNext() {
    if (step === 0 && !selectedExchange) {
      setError("Please select an exchange to continue.");
      return;
    }
    setError("");
    setStep((s) => s + 1);
  }

  async function handleConnect() {
    if (!selectedExchange) return;
    if (!form.apiKey.trim() || !form.apiSecret.trim()) {
      setError("API Key and Secret are required.");
      return;
    }
    if (selectedExchange.requiresPassphrase && !form.passphrase.trim()) {
      setError("This exchange requires a passphrase.");
      return;
    }

    setError("");
    setIsLoading(true);

    try {
      await authAPI.connectExchange({
        exchange: selectedExchange.id,
        apiKey: form.apiKey.trim(),
        apiSecret: form.apiSecret.trim(),
        passphrase: form.passphrase.trim() || undefined,
        label: form.label.trim() || selectedExchange.name,
      });
      setStep(2);
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : "Failed to connect exchange. Please check your credentials.";
      setError(message);
    } finally {
      setIsLoading(false);
    }
  }

  function handleGoToDashboard() {
    router.push("/login");
  }

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <div className="min-h-screen flex flex-col bg-[var(--color-surface-container-lowest)] text-[var(--color-on-surface)]">
      {/* Ambient blobs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] bg-[var(--color-primary)]/10 rounded-full blur-[120px]" />
        <div className="absolute -bottom-[20%] -right-[10%] w-[50%] h-[50%] bg-[var(--color-secondary)]/10 rounded-full blur-[120px]" />
      </div>

      {/* Header */}
      <header className="relative z-10 flex items-center justify-between px-8 py-6 border-b border-[var(--color-outline-variant)]/10">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-[var(--color-secondary)] rounded-lg flex items-center justify-center">
            <RiLockLine className="text-[var(--color-on-secondary)] text-base" />
          </div>
          <span className="brand-logo text-xl font-black tracking-tighter text-[var(--color-secondary)]">
            SCopyTrade
          </span>
        </div>
        <span className="text-xs text-[var(--color-on-surface-variant)] uppercase tracking-widest font-bold">
          Account Setup
        </span>
      </header>

      {/* Main */}
      <main className="relative z-10 flex-grow flex flex-col items-center justify-center px-4 py-12">
        {/* Step indicator */}
        <div className="flex items-center gap-0 mb-12">
          {STEPS.map((label, i) => (
            <div key={label} className="flex items-center">
              {/* Circle */}
              <div className="flex flex-col items-center gap-1.5">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300
                    ${
                      i < step
                        ? "bg-[var(--color-secondary)] text-[var(--color-on-secondary)]"
                        : i === step
                          ? "bg-[var(--color-secondary)]/20 border border-[var(--color-secondary)] text-[var(--color-secondary)]"
                          : "bg-[var(--color-surface-container)] text-[var(--color-on-surface-variant)]"
                    }
                  `}
                >
                  {i < step ? <RiCheckLine /> : i + 1}
                </div>
                <span
                  className={`text-[10px] uppercase tracking-widest font-bold whitespace-nowrap transition-colors
                    ${i === step ? "text-[var(--color-secondary)]" : "text-[var(--color-on-surface-variant)]"}
                  `}
                >
                  {label}
                </span>
              </div>
              {/* Connector */}
              {i < STEPS.length - 1 && (
                <div
                  className={`w-16 sm:w-24 h-px mx-2 mb-5 transition-all duration-500
                    ${i < step ? "bg-[var(--color-secondary)]" : "bg-[var(--color-outline-variant)]/20"}
                  `}
                />
              )}
            </div>
          ))}
        </div>

        {/* Card */}
        <div className="w-full max-w-lg bg-[var(--color-surface-container-low)] rounded-2xl overflow-hidden shadow-2xl shadow-[var(--color-surface-container-lowest)]/50">
          {/* ── Step 0: Choose Exchange ── */}
          {step === 0 && (
            <div className="p-8 md:p-10">
              <div className="mb-8">
                <h1 className="text-2xl font-bold text-[var(--color-on-surface)] mb-2">
                  Connect Your Exchange
                </h1>
                <p className="text-[var(--color-on-surface-variant)] text-sm leading-relaxed">
                  Select the exchange you trade on. We&apos;ll use read-only API
                  keys — we can never move your funds.
                </p>
              </div>

              {error && (
                <div className="mb-6 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-500 text-sm">
                  {error}
                </div>
              )}

              <div className="grid grid-cols-2 gap-3 mb-8">
                {EXCHANGES.map((exchange) => {
                  const isSelected = selectedExchange?.id === exchange.id;
                  return (
                    <button
                      key={exchange.id}
                      type="button"
                      onClick={() => handleSelectExchange(exchange)}
                      className={`
                        relative flex flex-col items-center justify-center gap-3 p-5 rounded-xl
                        border transition-all duration-200 group
                        ${
                          isSelected
                            ? "border-[var(--color-secondary)] bg-[var(--color-secondary)]/10"
                            : "border-[var(--color-outline-variant)]/10 bg-[var(--color-surface-container-highest)] hover:border-[var(--color-secondary)]/30"
                        }
                      `}
                    >
                      {isSelected && (
                        <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-[var(--color-secondary)] flex items-center justify-center">
                          <RiCheckLine className="text-[var(--color-on-secondary)] text-xs" />
                        </div>
                      )}
                      <div className="relative w-10 h-10">
                        <Image
                          src={exchange.logo}
                          alt={exchange.name}
                          fill
                          className="object-contain"
                          unoptimized
                        />
                      </div>
                      <span className="text-sm font-bold text-[var(--color-on-surface)]">
                        {exchange.name}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Security note */}
              <div className="flex items-start gap-3 p-4 rounded-xl bg-[var(--color-surface-container-highest)] mb-8">
                <RiShieldCheckLine className="text-[var(--color-secondary)] text-lg mt-0.5 flex-shrink-0" />
                <p className="text-xs text-[var(--color-on-surface-variant)] leading-relaxed">
                  Your API keys are encrypted with AES-256 and stored securely.
                  We only request{" "}
                  <span className="text-[var(--color-on-surface)] font-semibold">
                    read &amp; trade permissions
                  </span>{" "}
                  — withdrawal access is never required.
                </p>
              </div>

              <button
                type="button"
                onClick={handleNext}
                className="
                  w-full button-gradient text-[var(--color-on-secondary)]
                  font-bold py-3.5 rounded-xl
                  shadow-lg shadow-[var(--color-secondary)]/10
                  hover:opacity-90 active:scale-[0.98]
                  transition-all flex items-center justify-center gap-2
                "
              >
                <span>Continue</span>
                <RiArrowRightLine className="text-lg" />
              </button>
            </div>
          )}

          {/* ── Step 1: API Credentials ── */}
          {step === 1 && selectedExchange && (
            <div className="p-8 md:p-10">
              <button
                type="button"
                onClick={handleBack}
                className="flex items-center gap-1.5 text-xs text-[var(--color-on-surface-variant)] hover:text-[var(--color-secondary)] transition-colors mb-6"
              >
                <RiArrowLeftLine />
                <span>Back</span>
              </button>

              <div className="flex items-center gap-3 mb-8">
                <div className="relative w-10 h-10 flex-shrink-0">
                  <Image
                    src={selectedExchange.logo}
                    alt={selectedExchange.name}
                    fill
                    className="object-contain"
                    unoptimized
                  />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-[var(--color-on-surface)]">
                    {selectedExchange.name} API
                  </h1>
                  <p className="text-[var(--color-on-surface-variant)] text-sm">
                    Enter your API credentials below
                  </p>
                </div>
              </div>

              {error && (
                <div className="mb-6 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-500 text-sm">
                  {error}
                </div>
              )}

              {/* How to get API keys hint */}
              <div className="flex items-start gap-2 p-3 rounded-lg bg-[var(--color-secondary)]/10 border border-[var(--color-secondary)]/10 mb-6">
                <RiInformationLine className="text-[var(--color-secondary)] text-base mt-0.5 flex-shrink-0" />
                <p className="text-xs text-[var(--color-on-surface-variant)] leading-relaxed">
                  In your {selectedExchange.name} account, go to{" "}
                  <span className="text-[var(--color-on-surface)] font-semibold">
                    API Management
                  </span>{" "}
                  and create a key with{" "}
                  <span className="text-[var(--color-on-surface)] font-semibold">
                    Read &amp; Trade
                  </span>{" "}
                  permissions only.
                </p>
              </div>

              <div className="space-y-5">
                {/* Connection Label */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-[var(--color-on-surface-variant)] mb-2">
                    Connection Label{" "}
                    <span className="normal-case font-normal opacity-60">
                      (optional)
                    </span>
                  </label>
                  <div className="relative">
                    <RiExchangeLine className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--color-on-surface-variant)]/50 text-lg pointer-events-none" />
                    <input
                      type="text"
                      value={form.label}
                      onChange={(e) =>
                        handleFormChange("label", e.target.value)
                      }
                      placeholder={`My ${selectedExchange.name} Account`}
                      disabled={isLoading}
                      className="
                        w-full bg-[var(--color-surface-container-highest)] border-none
                        rounded-xl py-3.5 pl-12 pr-4
                        text-[var(--color-on-surface)]
                        placeholder:text-[var(--color-on-surface-variant)]/30
                        focus:ring-1 focus:ring-[var(--color-secondary)]/50 focus:outline-none
                        transition-all disabled:opacity-50 disabled:cursor-not-allowed
                      "
                    />
                  </div>
                </div>

                {/* API Key */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-[var(--color-on-surface-variant)] mb-2">
                    API Key
                  </label>
                  <div className="relative">
                    <RiKeyLine className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--color-on-surface-variant)]/50 text-lg pointer-events-none" />
                    <input
                      type="text"
                      required
                      value={form.apiKey}
                      onChange={(e) =>
                        handleFormChange("apiKey", e.target.value)
                      }
                      placeholder="Paste your API key"
                      disabled={isLoading}
                      className="
                        w-full bg-[var(--color-surface-container-highest)] border-none
                        rounded-xl py-3.5 pl-12 pr-4
                        text-[var(--color-on-surface)] font-mono text-sm
                        placeholder:text-[var(--color-on-surface-variant)]/30 placeholder:font-sans
                        focus:ring-1 focus:ring-[var(--color-secondary)]/50 focus:outline-none
                        transition-all disabled:opacity-50 disabled:cursor-not-allowed
                      "
                    />
                  </div>
                </div>

                {/* API Secret */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-[var(--color-on-surface-variant)] mb-2">
                    API Secret
                  </label>
                  <div className="relative">
                    <RiLockLine className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--color-on-surface-variant)]/50 text-lg pointer-events-none" />
                    <input
                      type={showSecret ? "text" : "password"}
                      required
                      value={form.apiSecret}
                      onChange={(e) =>
                        handleFormChange("apiSecret", e.target.value)
                      }
                      placeholder="Paste your API secret"
                      disabled={isLoading}
                      className="
                        w-full bg-[var(--color-surface-container-highest)] border-none
                        rounded-xl py-3.5 pl-12 pr-12
                        text-[var(--color-on-surface)] font-mono text-sm
                        placeholder:text-[var(--color-on-surface-variant)]/30 placeholder:font-sans
                        focus:ring-1 focus:ring-[var(--color-secondary)]/50 focus:outline-none
                        transition-all disabled:opacity-50 disabled:cursor-not-allowed
                      "
                    />
                    <button
                      type="button"
                      onClick={() => setShowSecret(!showSecret)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-[var(--color-on-surface-variant)]/50 hover:text-[var(--color-secondary)] transition-colors"
                    >
                      {showSecret ? (
                        <RiEyeCloseLine className="text-lg" />
                      ) : (
                        <RiEyeLine className="text-lg" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Passphrase (conditional) */}
                {selectedExchange.requiresPassphrase && (
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-[var(--color-on-surface-variant)] mb-2">
                      Passphrase
                    </label>
                    <div className="relative">
                      <RiLockLine className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--color-on-surface-variant)]/50 text-lg pointer-events-none" />
                      <input
                        type={showPassphrase ? "text" : "password"}
                        required
                        value={form.passphrase}
                        onChange={(e) =>
                          handleFormChange("passphrase", e.target.value)
                        }
                        placeholder="Your API passphrase"
                        disabled={isLoading}
                        className="
                          w-full bg-[var(--color-surface-container-highest)] border-none
                          rounded-xl py-3.5 pl-12 pr-12
                          text-[var(--color-on-surface)] font-mono text-sm
                          placeholder:text-[var(--color-on-surface-variant)]/30 placeholder:font-sans
                          focus:ring-1 focus:ring-[var(--color-secondary)]/50 focus:outline-none
                          transition-all disabled:opacity-50 disabled:cursor-not-allowed
                        "
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassphrase(!showPassphrase)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-[var(--color-on-surface-variant)]/50 hover:text-[var(--color-secondary)] transition-colors"
                      >
                        {showPassphrase ? (
                          <RiEyeCloseLine className="text-lg" />
                        ) : (
                          <RiEyeLine className="text-lg" />
                        )}
                      </button>
                    </div>
                  </div>
                )}
              </div>

              <button
                type="button"
                onClick={handleConnect}
                disabled={isLoading}
                className="
                  w-full mt-8 button-gradient text-[var(--color-on-secondary)]
                  font-bold py-3.5 rounded-xl
                  shadow-lg shadow-[var(--color-secondary)]/10
                  hover:opacity-90 active:scale-[0.98]
                  transition-all flex items-center justify-center gap-2
                  disabled:opacity-60 disabled:cursor-not-allowed
                "
              >
                {isLoading ? (
                  <>
                    <RiLoader4Line className="animate-spin text-lg" />
                    <span>Connecting…</span>
                  </>
                ) : (
                  <>
                    <span>Connect Exchange</span>
                    <RiArrowRightLine className="text-lg" />
                  </>
                )}
              </button>
            </div>
          )}

          {/* ── Step 2: Success ── */}
          {step === 2 && selectedExchange && (
            <div className="p-8 md:p-10 text-center">
              {/* Success icon */}
              <div className="mx-auto w-20 h-20 rounded-full bg-[var(--color-secondary)]/10 border border-[var(--color-secondary)]/20 flex items-center justify-center mb-6">
                <RiCheckLine className="text-[var(--color-secondary)] text-4xl" />
              </div>

              <h1 className="text-2xl font-bold text-[var(--color-on-surface)] mb-3">
                Exchange Connected!
              </h1>
              <p className="text-[var(--color-on-surface-variant)] text-sm leading-relaxed mb-2">
                Your{" "}
                <span className="text-[var(--color-on-surface)] font-semibold">
                  {form.label || selectedExchange.name}
                </span>{" "}
                account has been linked successfully.
              </p>
              <p className="text-[var(--color-on-surface-variant)] text-sm leading-relaxed mb-10">
                You can now log in and start copy trading.
              </p>

              {/* Summary pill */}
              <div className="flex items-center justify-center gap-3 p-4 rounded-xl bg-[var(--color-surface-container-highest)] mb-10">
                <div className="relative w-7 h-7">
                  <Image
                    src={selectedExchange.logo}
                    alt={selectedExchange.name}
                    fill
                    className="object-contain"
                    unoptimized
                  />
                </div>
                <span className="text-sm font-semibold text-[var(--color-on-surface)]">
                  {form.label || selectedExchange.name}
                </span>
                <div className="flex items-center gap-1 ml-auto text-xs text-green-500 font-bold">
                  <RiCheckLine />
                  <span>Active</span>
                </div>
              </div>

              <button
                type="button"
                onClick={handleGoToDashboard}
                className="
                  w-full button-gradient text-[var(--color-on-secondary)]
                  font-bold py-3.5 rounded-xl
                  shadow-lg shadow-[var(--color-secondary)]/10
                  hover:opacity-90 active:scale-[0.98]
                  transition-all flex items-center justify-center gap-2
                "
              >
                <span>Go to Login</span>
                <RiArrowRightLine className="text-lg" />
              </button>
            </div>
          )}
        </div>

        {/* Bottom note */}
        {step < 2 && (
          <p className="mt-6 text-xs text-[var(--color-on-surface-variant)] text-center max-w-sm">
            You can connect additional exchanges or update your keys anytime
            from your dashboard settings.
          </p>
        )}
      </main>

      {/* Bottom progress bar */}
      <div className="h-1 bg-[var(--color-surface-container-lowest)] w-full relative">
        <div
          className="absolute left-0 top-0 h-full progress-gradient transition-all duration-500"
          style={{ width: `${((step + 1) / STEPS.length) * 100}%` }}
        />
      </div>
    </div>
  );
}
