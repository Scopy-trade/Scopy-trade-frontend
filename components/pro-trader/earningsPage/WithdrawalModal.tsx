// components/dashboard/earnings/WithdrawalModal.tsx
"use client";

import { useEffect, useState } from "react";
import {
  MdClose,
  MdCheckCircle,
  MdErrorOutline,
  MdArrowBack,
  MdContentCopy,
} from "react-icons/md";
import { withdrawalService } from "@/lib/api/withdrawal";
import { WalletRequirements } from "@/lib";

interface WithdrawalModalProps {
  onClose: () => void;
  /** Called once a withdrawal succeeds, with the user's new available balance. */
  onSuccess?: (remainingBalance: number) => void;
}

type Step = "loading" | "load-error" | "address" | "withdraw" | "success";

// Mirrors the backend's own precision check: a positive number with at
// most 6 decimal places (USDT/TRC-20 precision).
const AMOUNT_PATTERN = /^\d+(\.\d{1,6})?$/;

function formatUsdt(value: number): string {
  return value.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 6,
  });
}

// Rendered only while the withdrawal flow is open — the parent mounts
// this component conditionally (`{isModalOpen && <WithdrawalModal .../>}`)
// rather than passing an `isOpen` flag, so each open is a fresh mount with
// clean state and a single wallet/balance fetch.
export default function WithdrawalModal({
  onClose,
  onSuccess,
}: WithdrawalModalProps) {
  const [step, setStep] = useState<Step>("loading");
  const [loadError, setLoadError] = useState<string | null>(null);

  const [balance, setBalance] = useState(0);
  const [savedAddress, setSavedAddress] = useState<string | null>(null);
  const [requirements, setRequirements] = useState<WalletRequirements | null>(
    null,
  );

  const [addressInput, setAddressInput] = useState("");
  const [addressSubmitting, setAddressSubmitting] = useState(false);
  const [addressError, setAddressError] = useState<string | null>(null);

  const [amountInput, setAmountInput] = useState("");
  const [withdrawSubmitting, setWithdrawSubmitting] = useState(false);
  const [withdrawError, setWithdrawError] = useState<string | null>(null);

  const [successInfo, setSuccessInfo] = useState<{
    transactionId: string;
    remainingBalance: number;
  } | null>(null);
  const [copied, setCopied] = useState(false);

  // Lock background scroll for as long as the modal is mounted, and load
  // the wallet/balance data once on mount (a fresh mount happens each time
  // the parent opens the modal, so this always reflects the latest state).
  useEffect(() => {
    document.body.style.overflow = "hidden";

    let cancelled = false;
    withdrawalService
      .getWalletAddress()
      .then((res) => {
        if (cancelled) return;
        setBalance(res.proEarningsBalance);
        setSavedAddress(res.withdrawalAddress);
        setRequirements(res.requirements);
        setAddressInput(res.withdrawalAddress ?? "");
        setStep(res.withdrawalAddress ? "withdraw" : "address");
      })
      .catch((err) => {
        if (cancelled) return;
        setLoadError(
          err instanceof Error ? err.message : "Failed to load wallet details",
        );
        setStep("load-error");
      });

    return () => {
      document.body.style.overflow = "unset";
      cancelled = true;
    };
  }, []);

  const retryLoad = () => {
    setStep("loading");
    setLoadError(null);
    withdrawalService
      .getWalletAddress()
      .then((res) => {
        setBalance(res.proEarningsBalance);
        setSavedAddress(res.withdrawalAddress);
        setRequirements(res.requirements);
        setAddressInput(res.withdrawalAddress ?? "");
        setStep(res.withdrawalAddress ? "withdraw" : "address");
      })
      .catch((err) => {
        setLoadError(
          err instanceof Error ? err.message : "Failed to load wallet details",
        );
        setStep("load-error");
      });
  };

  const handleSaveAddress = async (e: React.FormEvent) => {
    e.preventDefault();
    setAddressError(null);

    if (!addressInput.trim()) {
      setAddressError("A wallet address is required.");
      return;
    }

    setAddressSubmitting(true);
    try {
      const res = await withdrawalService.saveWalletAddress(
        addressInput.trim(),
      );
      setSavedAddress(res.withdrawalAddress);
      setStep("withdraw");
    } catch (err) {
      setAddressError(
        err instanceof Error ? err.message : "Failed to save wallet address",
      );
    } finally {
      setAddressSubmitting(false);
    }
  };

  const numericAmount = Number(amountInput);
  const amountIsValid =
    amountInput.trim() !== "" &&
    AMOUNT_PATTERN.test(amountInput.trim()) &&
    numericAmount > 0 &&
    numericAmount <= balance;

  const handleMaxClick = () => {
    // Balance already carries at most 6 decimals server-side, so this is
    // safe to drop straight into the amount field.
    setAmountInput(String(balance));
  };

  const handleWithdraw = async (e: React.FormEvent) => {
    e.preventDefault();
    setWithdrawError(null);

    if (!amountIsValid) {
      setWithdrawError(
        numericAmount > balance
          ? "Amount exceeds your available balance."
          : "Enter a valid amount (up to 6 decimal places).",
      );
      return;
    }

    setWithdrawSubmitting(true);
    try {
      const res = await withdrawalService.withdrawFunds(numericAmount);
      setSuccessInfo({
        transactionId: res.transactionId,
        remainingBalance: res.remainingBalance,
      });
      setBalance(res.remainingBalance);
      onSuccess?.(res.remainingBalance);
      setStep("success");
    } catch (err) {
      setWithdrawError(
        err instanceof Error ? err.message : "Failed to process withdrawal",
      );
    } finally {
      setWithdrawSubmitting(false);
    }
  };

  const handleCopyTxId = async () => {
    if (!successInfo) return;
    try {
      await navigator.clipboard.writeText(successInfo.transactionId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard access can fail silently (permissions/insecure context);
      // the transaction id is still visible on screen either way.
    }
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 transition-opacity"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <div
            className="relative bg-surface-container-low rounded-xl w-full max-w-md border border-white/5 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-white/5">
              <h3 className="text-xl font-bold text-on-surface">
                {step === "address" ? "Set Withdrawal Address" : "Withdraw Funds"}
              </h3>
              <button
                onClick={onClose}
                className="text-on-surface-variant hover:text-on-surface transition-colors"
              >
                <MdClose className="text-2xl" />
              </button>
            </div>

            {/* Loading */}
            {step === "loading" && (
              <div className="p-10 flex flex-col items-center justify-center gap-3 text-on-surface-variant">
                <div className="h-8 w-8 rounded-full border-2 border-secondary border-t-transparent animate-spin" />
                <p className="text-sm">Loading your wallet details…</p>
              </div>
            )}

            {/* Load error */}
            {step === "load-error" && (
              <div className="p-6 flex flex-col items-center gap-4 text-center">
                <MdErrorOutline className="text-4xl text-rose-400" />
                <p className="text-sm text-on-surface-variant">
                  {loadError ?? "Something went wrong loading your wallet details."}
                </p>
                <button
                  onClick={retryLoad}
                  className="px-6 py-2.5 rounded-lg bg-secondary text-on-secondary font-bold text-sm"
                >
                  Try Again
                </button>
              </div>
            )}

            {/* Step: set/edit wallet address */}
            {step === "address" && (
              <form onSubmit={handleSaveAddress} className="p-6 space-y-6">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-on-surface-variant mb-2">
                    TRC-20 (Tron) Wallet Address
                  </label>
                  <input
                    type="text"
                    value={addressInput}
                    onChange={(e) => setAddressInput(e.target.value)}
                    placeholder={requirements?.example ?? "T..."}
                    className="w-full bg-surface-container-highest border-none rounded-lg text-on-surface py-3 px-4 font-mono text-sm focus:ring-1 focus:ring-primary/20"
                  />
                  {requirements && (
                    <p className="mt-2 text-[10px] text-on-surface-variant/70 leading-relaxed">
                      Must be a {requirements.format} address, starting with
                      &ldquo;{requirements.mustStartWith}&rdquo;,{" "}
                      {requirements.length} characters long.
                    </p>
                  )}
                </div>

                {addressError && (
                  <p className="text-xs text-rose-400 flex items-center gap-1.5">
                    <MdErrorOutline className="text-sm shrink-0" />
                    {addressError}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={addressSubmitting}
                  className="w-full py-4 rounded-lg bg-gradient-to-r from-secondary to-secondary-container text-on-secondary font-extrabold uppercase tracking-widest text-xs hover:opacity-90 transition-all duration-300 disabled:opacity-50"
                >
                  {addressSubmitting ? "Saving…" : "Save Address & Continue"}
                </button>

                <p className="text-[10px] text-center text-on-surface-variant/60 leading-relaxed">
                  Withdrawals only ever go to this address. Double-check it
                  before saving — blockchain transactions cannot be reversed.
                </p>
              </form>
            )}

            {/* Step: withdraw */}
            {step === "withdraw" && (
              <form onSubmit={handleWithdraw} className="p-6 space-y-6">
                <div className="p-4 bg-surface-container rounded-lg border border-outline-variant/10 flex items-center justify-between">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">
                      Available Balance
                    </p>
                    <p className="text-lg font-bold text-on-surface">
                      {formatUsdt(balance)} USDT
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setStep("address")}
                    className="text-xs font-bold text-secondary hover:underline"
                  >
                    Change Address
                  </button>
                </div>

                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant mb-1">
                    Sending To
                  </p>
                  <p className="text-xs font-mono text-on-surface-variant break-all">
                    {savedAddress}
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-on-surface-variant mb-2">
                    Withdrawal Amount
                  </label>
                  <div className="relative group">
                    <input
                      type="text"
                      inputMode="decimal"
                      value={amountInput}
                      onChange={(e) => setAmountInput(e.target.value)}
                      placeholder="0.00"
                      className="w-full bg-surface-container-highest border-none rounded-lg text-2xl font-bold text-on-surface py-4 px-4 focus:ring-1 focus:ring-primary/20 placeholder:text-on-surface-variant/20"
                    />
                    <span className="absolute right-4 top-5 font-bold text-on-surface-variant">
                      USDT
                    </span>
                  </div>
                  <div className="mt-2 flex justify-end text-[10px] font-bold uppercase tracking-tighter">
                    <span
                      onClick={handleMaxClick}
                      className="text-secondary cursor-pointer hover:underline"
                    >
                      Max: {formatUsdt(balance)} USDT
                    </span>
                  </div>
                </div>

                {withdrawError && (
                  <p className="text-xs text-rose-400 flex items-center gap-1.5">
                    <MdErrorOutline className="text-sm shrink-0" />
                    {withdrawError}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={withdrawSubmitting || balance <= 0}
                  className="w-full py-4 rounded-lg bg-gradient-to-r from-secondary to-secondary-container text-on-secondary font-extrabold uppercase tracking-widest text-xs hover:opacity-90 transition-all duration-300 disabled:opacity-50"
                >
                  {withdrawSubmitting
                    ? "Processing…"
                    : balance <= 0
                      ? "No Balance Available"
                      : "Withdraw Funds"}
                </button>

                <p className="text-[10px] text-center text-on-surface-variant/60 leading-relaxed">
                  By proceeding, you acknowledge that blockchain transactions
                  are irreversible. Ensure the destination wallet address is
                  correct.
                </p>
              </form>
            )}

            {/* Step: success */}
            {step === "success" && successInfo && (
              <div className="p-6 space-y-6 text-center">
                <MdCheckCircle className="text-5xl text-secondary mx-auto" />
                <div>
                  <p className="text-lg font-bold text-on-surface mb-1">
                    Withdrawal Initiated
                  </p>
                  <p className="text-sm text-on-surface-variant">
                    Your funds are on their way to your wallet.
                  </p>
                </div>

                <div className="p-4 bg-surface-container rounded-lg border border-outline-variant/10 text-left space-y-3">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant mb-1">
                      Transaction ID
                    </p>
                    <div className="flex items-center gap-2">
                      <p className="text-xs font-mono text-on-surface break-all">
                        {successInfo.transactionId}
                      </p>
                      <button
                        type="button"
                        onClick={handleCopyTxId}
                        className="shrink-0 text-on-surface-variant hover:text-secondary transition-colors"
                      >
                        <MdContentCopy className="text-sm" />
                      </button>
                    </div>
                    {copied && (
                      <p className="text-[10px] text-secondary mt-1">Copied!</p>
                    )}
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant mb-1">
                      Remaining Balance
                    </p>
                    <p className="text-sm font-bold text-on-surface">
                      {formatUsdt(successInfo.remainingBalance)} USDT
                    </p>
                  </div>
                </div>

                <button
                  onClick={onClose}
                  className="w-full py-4 rounded-lg bg-gradient-to-r from-secondary to-secondary-container text-on-secondary font-extrabold uppercase tracking-widest text-xs hover:opacity-90 transition-all duration-300"
                >
                  Done
                </button>
              </div>
            )}

            {/* Back link when editing an already-saved address */}
            {step === "address" && savedAddress && (
              <button
                type="button"
                onClick={() => setStep("withdraw")}
                className="absolute top-6 left-6 text-on-surface-variant hover:text-on-surface transition-colors"
                aria-label="Back"
              >
                <MdArrowBack className="text-xl" />
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
