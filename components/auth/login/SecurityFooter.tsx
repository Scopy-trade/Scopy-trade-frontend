import { RiShieldLine, RiLockLine, RiVerifiedBadgeLine } from "react-icons/ri";

const badges = [
  { Icon: RiShieldLine, label: "256-bit AES" },
  { Icon: RiLockLine, label: "MPC Custody" },
  { Icon: RiVerifiedBadgeLine, label: "ISO 27001" },
];

export default function SecurityFooter() {
  return (
    <footer className="fixed bottom-6 left-0 w-full flex justify-center gap-8 opacity-40 px-4 pointer-events-none">
      {badges.map(({ Icon, label }) => (
        <div key={label} className="flex items-center gap-2">
          <Icon className="text-sm text-[var(--color-on-surface)]" />
          <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-[var(--color-on-surface)]">
            {label}
          </span>
        </div>
      ))}
    </footer>
  );
}
