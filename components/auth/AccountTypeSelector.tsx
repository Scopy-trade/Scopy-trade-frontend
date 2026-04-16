"use client";

import { useState } from "react";
import { RiUser3Line, RiBuildingLine } from "react-icons/ri";

type AccountType = "individual" | "institutional";

interface AccountTypeSelectorProps {
  value: AccountType;
  onChange: (value: AccountType) => void;
}

const options: {
  value: AccountType;
  label: string;
  Icon: React.ElementType;
}[] = [
  { value: "individual", label: "Individual", Icon: RiUser3Line },
  { value: "institutional", label: "Institutional", Icon: RiBuildingLine },
];

export default function AccountTypeSelector({
  value,
  onChange,
}: AccountTypeSelectorProps) {
  return (
    <div className="space-y-3">
      <label className="text-xs font-bold uppercase tracking-widest text-[var(--color-on-surface-variant)]">
        Account Category
      </label>
      <div className="grid grid-cols-2 gap-4">
        {options.map(({ value: optVal, label, Icon }) => {
          const isSelected = value === optVal;
          return (
            <label key={optVal} className="relative group cursor-pointer">
              <input
                type="radio"
                name="acc_type"
                value={optVal}
                checked={isSelected}
                onChange={() => onChange(optVal)}
                className="sr-only"
              />
              <div
                className={`
                  p-4 rounded-xl border transition-all duration-300
                  bg-[var(--color-surface-container)]
                  ${
                    isSelected
                      ? "border-[var(--color-secondary)] bg-[var(--color-secondary)]/5"
                      : "border-[var(--color-outline-variant)]/10 hover:border-[var(--color-secondary)]/40"
                  }
                `}
              >
                <div className="flex flex-col items-center text-center gap-2">
                  <Icon
                    className={`text-2xl transition-colors ${
                      isSelected
                        ? "text-[var(--color-secondary)]"
                        : "text-[var(--color-on-surface-variant)] group-hover:text-[var(--color-secondary)]"
                    }`}
                  />
                  <span className="text-sm font-bold text-[var(--color-on-surface)]">
                    {label}
                  </span>
                </div>
              </div>
            </label>
          );
        })}
      </div>
    </div>
  );
}
