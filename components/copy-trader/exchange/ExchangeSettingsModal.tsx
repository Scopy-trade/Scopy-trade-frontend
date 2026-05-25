"use client";

import ActiveConnections from "@/components/copy-trader/exchange/ActiveConnections";
import SetupConnectionForm from "@/components/copy-trader/exchange/SetupConnectionForm";
import SecurityBanner from "@/components/copy-trader/exchange/SecurityBanner";
import { MdClose } from "react-icons/md";
import { useEffect } from "react";

interface ExchangeSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ExchangeSettingsModal({
  isOpen,
  onClose,
}: ExchangeSettingsModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 md:p-8">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-md transition-opacity"
        onClick={onClose}
      ></div>

      {/* Modal Content */}
      <div className="relative w-full max-w-6xl max-h-[90vh] bg-surface-container-lowest border border-white/10 rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/5 bg-surface-container-low/50">
          <div>
            <h2 className="text-2xl font-bold font-headline text-slate-100">
              Exchange Settings
            </h2>
            <p className="text-sm text-slate-400 mt-1">
              Connect your exchange API keys to enable automated copy trading.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
          >
            <MdClose size={24} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left column */}
            <section className="lg:col-span-7 space-y-6">
              <ActiveConnections />
              <SecurityBanner />
            </section>

            {/* Right column */}
            <aside className="lg:col-span-5">
              <SetupConnectionForm />
            </aside>
          </div>
        </div>
      </div>
    </div>
  );
}
