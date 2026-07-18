"use client";

import { getAccountInitials, getAccountName, useAuth } from "@/components/auth/AuthContext";

interface HeaderProps {
  onMenuToggle: () => void;
}

export default function Header({ onMenuToggle }: HeaderProps) {
  const { account } = useAuth();

  return (
    <header className="sticky top-0 z-30 w-full bg-[#060e20]/80 backdrop-blur-xl border-b border-white/5 flex items-center justify-between px-4 sm:px-8 py-4">
      {/* Left */}
      <div className="flex items-center gap-4 flex-1">
        {/* Mobile hamburger */}
        <button
          onClick={onMenuToggle}
          className="lg:hidden text-[#8f9098] hover:text-[#4edea3] transition-colors p-1"
        >
          <span className="material-symbols-outlined">menu</span>
        </button>

        <h1 className="text-base sm:text-lg font-black text-[#dae2fd] whitespace-nowrap font-[Manrope,sans-serif] hidden sm:block">
          Admin Console
        </h1>

        <div className="relative max-w-xs sm:max-w-md w-full hidden md:block">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#8f9098] text-lg">
            search
          </span>
          <input
            className="w-full bg-[#171f33]/70 border border-white/5 rounded-xl py-2 pl-10 pr-4 text-xs focus:outline-none focus:ring-1 focus:ring-[#4edea3]/20 text-[#dae2fd] placeholder:text-[#44474d] transition-all"
            placeholder="Search users by UID or Email..."
            type="text"
          />
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center gap-3 sm:gap-5 ml-2">
        <button className="text-[#8f9098] hover:text-[#4edea3] transition-colors relative">
          <span className="material-symbols-outlined">notifications</span>
          <span className="absolute top-0 right-0 w-2 h-2 bg-[#4edea3] rounded-full border-2 border-[#060e20]" />
        </button>
        <button className="text-[#8f9098] hover:text-[#4edea3] transition-colors hidden sm:block">
          <span className="material-symbols-outlined">help_outline</span>
        </button>

        <div className="flex items-center gap-2 sm:gap-3 border-l border-white/10 pl-3 sm:pl-5">
          <div className="text-right hidden sm:block">
            <p className="text-xs font-bold text-[#dae2fd]">
              {getAccountName(account)}
            </p>
            <p className="text-[10px] text-[#8f9098]">Superuser</p>
          </div>
          <div className="w-8 h-8 rounded-full bg-[#171f33] border border-[#4edea3]/20 flex items-center justify-center">
            <span className="text-[10px] font-bold text-[#4edea3]">
              {getAccountInitials(account)}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
