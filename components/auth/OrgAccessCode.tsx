"use client";

import { RiShareLine } from "react-icons/ri";

interface Props {
  value: string;
  onChange: (value: string) => void;
}

export default function OrgAccessCode({ value, onChange }: Props) {
  return (
    <div
      className="p-6"
      style={{
        borderRadius: "0.75rem",
        backgroundColor: "#131b2e",
        border: "1px dashed rgba(68,71,77,0.4)",
      }}
    >
      <div className="flex items-center gap-3 mb-4">
        <RiShareLine style={{ color: "#b6c4ff", fontSize: "1.25rem" }} />
        <h3
          className="text-sm font-bold tracking-tight"
          style={{ fontFamily: "var(--font-headline)", color: "#dae2fd" }}
        >
          Joining an Organization?
        </h3>
      </div>
      <p className="text-xs mb-4 leading-relaxed" style={{ color: "#c5c6ce" }}>
        If you were invited by a desk manager, enter your access code here to
        link your sub-account.
      </p>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Access Code (Optional)"
        className="w-full text-xs transition-all outline-none"
        style={{
          backgroundColor: "#2d3449",
          border: "none",
          borderRadius: "0.5rem",
          padding: "0.75rem 1rem",
          color: "#dae2fd",
        }}
      />
    </div>
  );
}
