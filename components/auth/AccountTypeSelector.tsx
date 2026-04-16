"use client";

import { RiUser3Line, RiBuildingLine } from "react-icons/ri";

export type AccountType = "individual" | "institutional";

interface Props {
  value: AccountType;
  onChange: (value: AccountType) => void;
}

const options: { value: AccountType; label: string; icon: React.ReactNode }[] =
  [
    {
      value: "individual",
      label: "Individual",
      icon: <RiUser3Line style={{ fontSize: "1.5rem" }} />,
    },
    {
      value: "institutional",
      label: "Institutional",
      icon: <RiBuildingLine style={{ fontSize: "1.5rem" }} />,
    },
  ];

export default function AccountTypeSelector({ value, onChange }: Props) {
  return (
    <div className="space-y-4">
      <label
        className="text-xs font-bold uppercase tracking-widest"
        style={{ color: "#c5c6ce" }}
      >
        Account Category
      </label>
      <div className="grid grid-cols-2 gap-4">
        {options.map((opt) => {
          const selected = value === opt.value;
          return (
            <label key={opt.value} className="cursor-pointer">
              <input
                type="radio"
                name="acc_type"
                value={opt.value}
                checked={selected}
                onChange={() => onChange(opt.value)}
                className="sr-only"
              />
              <div
                className="p-4 transition-all duration-300"
                style={{
                  borderRadius: "0.75rem",
                  border: selected
                    ? "1px solid #4edea3"
                    : "1px solid rgba(68,71,77,0.3)",
                  backgroundColor: selected
                    ? "rgba(78,222,163,0.05)"
                    : "#171f33",
                }}
              >
                <div className="flex flex-col items-center text-center gap-2">
                  <span style={{ color: selected ? "#4edea3" : "#c5c6ce" }}>
                    {opt.icon}
                  </span>
                  <span
                    className="text-sm font-bold"
                    style={{ color: "#dae2fd" }}
                  >
                    {opt.label}
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
