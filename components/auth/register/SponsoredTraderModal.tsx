"use client";

import { useState } from "react";
import {
  RiCloseCircleLine,
  RiCheckboxCircleLine,
  RiCheckLine,
} from "react-icons/ri";

interface SponsoredTraderModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAccept: () => void;
}

export default function SponsoredTraderModal({
  isOpen,
  onClose,
  onAccept,
}: SponsoredTraderModalProps) {
  const [understood, setUnderstood] = useState(false);

  if (!isOpen) return null;

  const terms = [
    {
      title: "Trading Capital Provision",
      description:
        "We will provide you with capital to trade with. This ensures you have sufficient funds to execute your trading strategies.",
    },
    {
      title: "Custodial Wallet",
      description:
        "The wallet will be custodial, meaning we hold the funds on your behalf. You cannot withdraw the capital directly.",
    },
    {
      title: "Profit Sharing",
      description:
        "We take 40% of every profit generated from profitable trades. You retain the remaining 60% of profits.",
    },
  ];

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-[var(--color-surface-container-highest)] rounded-2xl max-w-md w-full shadow-2xl border border-[var(--color-outline)]/10 overflow-hidden max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-[var(--color-secondary)]/10 to-[var(--color-tertiary)]/10 border-b border-[var(--color-outline)]/10 p-6 flex items-center justify-between">
          <div>
            <h3
              className="text-xl font-bold text-[var(--color-on-surface)]"
              style={{ fontFamily: "var(--font-headline)" }}
            >
              Sponsored Trader Program
            </h3>
            <p className="text-xs text-[var(--color-on-surface-variant)] mt-1">
              Understand the terms before joining
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-[var(--color-on-surface-variant)]/60 hover:text-[var(--color-on-surface)] transition-colors flex-shrink-0"
          >
            <RiCloseCircleLine className="text-2xl" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          {/* Intro */}
          <div className="bg-[var(--color-secondary)]/5 border border-[var(--color-secondary)]/20 rounded-xl p-4">
            <p className="text-sm text-[var(--color-on-surface)] leading-relaxed">
              By joining the Sponsored Trader Program, you'll receive trading
              capital to execute your strategies on our platform.
            </p>
          </div>

          {/* Terms */}
          <div className="space-y-3">
            {terms.map((term, index) => (
              <div
                key={index}
                className="bg-[var(--color-surface-container)] rounded-xl p-4 border border-[var(--color-outline)]/10 hover:border-[var(--color-secondary)]/30 transition-all"
              >
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 mt-1">
                    <RiCheckboxCircleLine className="text-[var(--color-secondary)] text-lg" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm text-[var(--color-on-surface)] mb-1">
                      {term.title}
                    </h4>
                    <p className="text-xs text-[var(--color-on-surface-variant)] leading-relaxed">
                      {term.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Key Benefit */}
          <div className="bg-[var(--color-tertiary)]/5 border border-[var(--color-tertiary)]/20 rounded-xl p-4">
            <p className="text-xs text-[var(--color-on-surface)] mb-2 font-semibold">
              Why join?
            </p>
            <p className="text-xs text-[var(--color-on-surface-variant)] leading-relaxed">
              Get access to capital without personal investment, and earn
              significant returns by sharing profits from successful trades.
            </p>
          </div>

          {/* Checkbox */}
          <label className="flex items-start gap-3 p-3 bg-[var(--color-surface-container)] rounded-xl border border-[var(--color-outline)]/10 cursor-pointer hover:border-[var(--color-secondary)]/20 transition-all">
            <input
              type="checkbox"
              checked={understood}
              onChange={(e) => setUnderstood(e.target.checked)}
              className="w-5 h-5 rounded flex-shrink-0 mt-0.5 cursor-pointer"
              style={{
                accentColor: "var(--color-secondary)",
              }}
            />
            <span className="text-sm text-[var(--color-on-surface)]">
              I understand and accept these terms
            </span>
          </label>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-[var(--color-surface-container-lowest)] border-t border-[var(--color-outline)]/10 p-4 flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-3 rounded-xl border border-[var(--color-outline)]/20 text-[var(--color-on-surface)] font-semibold hover:bg-[var(--color-surface-container-highest)] transition-colors"
          >
            Decline
          </button>
          <button
            onClick={onAccept}
            disabled={!understood}
            className="flex-1 button-gradient text-[var(--color-on-secondary)] font-semibold py-3 rounded-xl shadow-lg shadow-[var(--color-secondary)]/15 hover:opacity-90 active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            <span>Accept & Continue</span>
            <RiCheckLine />
          </button>
        </div>
      </div>
    </div>
  );
}
