"use client";

import { useEffect } from "react";
import { MdClose } from "react-icons/md";
import { ExchangeSettings } from "@/components/onboarding/ExchangeSettings";

interface ExchangeSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConnectionChange?: () => void;
}

export default function ExchangeSettingsModal({
  isOpen,
  onClose,
  onConnectionChange,
}: ExchangeSettingsModalProps) {
  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="exchange-settings-title"
    >
      <button
        type="button"
        className="absolute inset-0 bg-black/80 backdrop-blur-md"
        onClick={onClose}
        aria-label="Close exchange settings"
      />

      <section className="relative flex max-h-[94vh] w-full max-w-6xl flex-col overflow-hidden rounded-2xl border border-white/10 bg-surface-container-lowest shadow-2xl">
        <header className="flex shrink-0 items-start justify-between gap-4 border-b border-white/5 bg-surface-container-low/70 px-5 py-4 sm:px-7 sm:py-5">
          <div>
            <h2
              id="exchange-settings-title"
              className="text-xl font-bold text-slate-100 sm:text-2xl"
            >
              Exchange Connections
            </h2>
            <p className="mt-1 max-w-2xl text-sm text-slate-400">
              Connect, verify, and remove trading API connections. Credentials
              are validated before they are encrypted and stored.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full p-2 text-slate-400 transition-colors hover:bg-white/10 hover:text-white"
            aria-label="Close exchange settings"
          >
            <MdClose size={24} />
          </button>
        </header>

        <div className="overflow-y-auto p-4 sm:p-6">
          <ExchangeSettings onConnectionChange={onConnectionChange} />
        </div>
      </section>
    </div>
  );
}
