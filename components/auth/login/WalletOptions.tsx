"use client";

import { RiQrCodeLine, RiArrowRightSLine } from "react-icons/ri";
import { PiWallet } from "react-icons/pi";

interface Wallet {
  id: string;
  name: string;
  description: string;
  Icon: React.ElementType;
  iconBg: string;
  iconColor: string;
}

const wallets: Wallet[] = [
  {
    id: "metamask",
    name: "MetaMask",
    description: "Connect via Browser Extension",
    Icon: PiWallet,
    iconBg: "bg-[#f6851b]/10",
    iconColor: "text-[#f6851b]",
  },
  {
    id: "walletconnect",
    name: "WalletConnect",
    description: "Scan with Mobile App",
    Icon: RiQrCodeLine,
    iconBg: "bg-[var(--color-primary)]/10",
    iconColor: "text-[var(--color-primary)]",
  },
];

interface WalletOptionsProps {
  onConnect?: (walletId: string) => void;
}

export default function WalletOptions({ onConnect }: WalletOptionsProps) {
  return (
    <div className="space-y-4">
      {wallets.map(({ id, name, description, Icon, iconBg, iconColor }) => (
        <button
          key={id}
          type="button"
          onClick={() => onConnect?.(id)}
          className="
            w-full group flex items-center justify-between p-4
            bg-[var(--color-surface-container)] rounded-xl
            border border-[var(--color-outline-variant)]/10
            hover:border-[var(--color-secondary)]/30
            transition-all active:scale-[0.98]
          "
        >
          <div className="flex items-center gap-4">
            <div
              className={`w-10 h-10 ${iconBg} rounded-lg flex items-center justify-center flex-shrink-0`}
            >
              <Icon className={`${iconColor} text-xl`} />
            </div>
            <div className="text-left">
              <p className="font-bold text-[var(--color-on-surface)]">{name}</p>
              <p className="text-xs text-[var(--color-on-surface-variant)]">
                {description}
              </p>
            </div>
          </div>
          <RiArrowRightSLine
            className="
              text-[var(--color-on-surface-variant)] text-xl
              group-hover:text-[var(--color-secondary)] transition-colors
            "
          />
        </button>
      ))}
    </div>
  );
}
