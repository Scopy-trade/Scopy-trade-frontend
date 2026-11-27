"use client";
import { MdMenu } from "react-icons/md";
import BrandLogo from "@/components/brand/BrandLogo";
import TraderAccountActions from "@/components/dashboard/TraderAccountActions";

export default function CopyTraderHeader({ onToggle }: { onToggle: () => void }) {
  return <header className="flex h-16 shrink-0 items-center justify-between border-b border-white/5 bg-surface-container-lowest px-4 md:hidden">
    <div className="flex items-center gap-2"><button onClick={onToggle} aria-label="Toggle sidebar" className="rounded-lg p-2 text-slate-100"><MdMenu size={22} /></button><BrandLogo className="hidden h-9 w-24 sm:block" priority /></div>
    <TraderAccountActions scope="copy" />
  </header>;
}
