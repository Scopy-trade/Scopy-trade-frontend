"use client";

import { RiShareLine } from "react-icons/ri";

interface OrgAccessCodeProps {
  value: string;
  onChange: (value: string) => void;
}

export default function OrgAccessCode({ value, onChange }: OrgAccessCodeProps) {
  return (
    <div className="p-6 rounded-xl bg-[var(--color-surface-container-low)] border border-dashed border-[var(--color-outline-variant)]/20">
      <div className="flex items-center gap-3 mb-4">
        <RiShareLine className="text-[var(--color-primary-fixed-dim)] text-xl" />
        <h3 className="text-sm font-bold tracking-tight text-[var(--color-on-surface)]">
          Joining an Organization?
        </h3>
      </div>
      <p className="text-xs text-[var(--color-on-surface-variant)] mb-4 leading-relaxed">
        If you were invited by a desk manager, enter your access code here to
        link your sub-account.
      </p>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Access Code (Optional)"
        className="
          w-full bg-[var(--color-surface-container-highest)] border-none
          rounded-lg py-3 px-4 text-xs
          focus:ring-1 focus:ring-[var(--color-primary)] focus:outline-none
          placeholder:text-[var(--color-on-surface-variant)]/30
          text-[var(--color-on-surface)]
          transition-all
        "
      />
    </div>
  );
}
