"use client";

import { MdAccountBalanceWallet, MdMenu } from "react-icons/md";

interface CopyTraderHeaderProps {
  isOpen: boolean;
  isCollapsed: boolean;
  onToggle: () => void;
}

export default function CopyTraderHeader({
  isOpen,
  isCollapsed,
  onToggle,
}: CopyTraderHeaderProps) {
  return (
    <header className="sticky md:hidden top-0 z-40 w-full bg-surface-container-lowest/90 backdrop-blur-xl border-b border-white/5 shadow-lg shadow-black/20 flex items-center justify-between px-4 md:px-8 h-16 font-headline text-sm">
      {/* Left Section - Mobile Menu Button */}
      <div className="flex items-center gap-3">
        {/* Mobile Menu Button - Always visible on mobile */}
        <button
          onClick={onToggle}
          className="md:hidden p-2 rounded-lg bg-surface-container hover:bg-surface-container-highest transition-all text-slate-100"
          aria-label="Toggle sidebar"
        >
          <MdMenu size={20} />
        </button>

        {/* Desktop title */}
        <h1 className="text-lg font-bold tracking-tighter text-slate-100 hidden md:block">
          {isCollapsed ? "SCT" : "SCopyTrade"}
        </h1>

        {/* Mobile title */}
        <h1 className="text-lg font-bold tracking-tighter text-slate-100 md:hidden">
          SCopyTrade
        </h1>
      </div>

      {/* Right Section - User Actions */}
      <div className="flex items-center gap-3 md:gap-5">
        <button className="flex items-center gap-2 bg-surface-container px-3 py-1.5 rounded-full border border-white/5 hover:border-primary/20 transition-all">
          <MdAccountBalanceWallet className="text-secondary text-base" />
          <span className="font-bold text-xs tracking-tight hidden sm:inline">
            $24,105.00
          </span>
          <span className="font-bold text-xs tracking-tight sm:hidden">
            $24.1k
          </span>
        </button>

        <div className="w-8 h-8 rounded-full overflow-hidden border border-primary/20 cursor-pointer hover:border-primary/40 transition-all bg-surface-container-high flex items-center justify-center">
          <span className="text-xs font-bold text-secondary">CT</span>
        </div>
      </div>
    </header>
  );
}
