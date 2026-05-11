// components/pro-trader/DashboardHeader.tsx
"use client";

import { MdAccountBalanceWallet, MdMenu } from "react-icons/md";

interface DashboardNavProps {
  isOpen: boolean;
  isCollapsed: boolean;
  onToggle: () => void;
}

export default function DashboardHeader({
  isOpen,
  isCollapsed,
  onToggle,
}: DashboardNavProps) {
  return (
    <header className="sticky md:hidden top-0 z-40 w-full bg-surface/80 backdrop-blur-xl border-b border-white/5 shadow-lg shadow-black/20 flex items-center justify-between px-4 md:px-8 h-16 font-headline text-sm">
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
            $142,509.32
          </span>
          <span className="font-bold text-xs tracking-tight sm:hidden">
            $142.5k
          </span>
        </button>

        <div className="w-8 h-8 rounded-full overflow-hidden border border-primary/20 cursor-pointer hover:border-primary/40 transition-all">
          <img
            alt="User profile"
            className="w-full h-full object-cover"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBsRKVvzzeLux6KWRFk0PknaGZRr29YEKxbAtz75KmN6qUS-yKudcOp35mygGCfRk8WbsxBSqbQyazBOuvI-dd880joJEi-8cEsQgJU7rst4BfLHZ6KZ4jCVKEEVPw0Kx7ioGkD3b-WrtoyzgIrFsAuiDKi0mNOmOfMvkcPmLlGMW1lr39gnHlTupxZwSyQROuml4bxpdHDaDRhqPecdWIH8LcwaWRW0Hq-UrsibqrM3koeWRJdj4aaiY8WV9t8ahUB050bfSOWfg"
          />
        </div>
      </div>
    </header>
  );
}
