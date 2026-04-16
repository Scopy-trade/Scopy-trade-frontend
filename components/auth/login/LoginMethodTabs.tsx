"use client";

export type LoginMethod = "web3" | "institutional";

interface LoginMethodTabsProps {
  active: LoginMethod;
  onChange: (method: LoginMethod) => void;
}

const tabs: { value: LoginMethod; label: string }[] = [
  { value: "web3", label: "Web3 Wallet" },
  { value: "institutional", label: "Institutional" },
];

export default function LoginMethodTabs({
  active,
  onChange,
}: LoginMethodTabsProps) {
  return (
    <div className="flex p-1 bg-[var(--color-surface-container-lowest)] rounded-lg mb-8">
      {tabs.map(({ value, label }) => {
        const isActive = active === value;
        return (
          <button
            key={value}
            type="button"
            onClick={() => onChange(value)}
            className={`
              flex-1 py-2 text-sm font-semibold rounded-md transition-all duration-200
              ${
                isActive
                  ? "bg-[var(--color-surface-container-highest)] text-[var(--color-secondary)] shadow-sm"
                  : "text-[var(--color-on-surface-variant)] hover:text-[var(--color-on-surface)]"
              }
            `}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}
