"use client";

import Image from "next/image";
import { RiVerifiedBadgeLine } from "react-icons/ri";

const stats = [
  { value: "$4.2B+", label: "Total Vol." },
  { value: "12ms", label: "Latency" },
];

export default function LoginBrandingPanel() {
  return (
    <div className="hidden md:flex flex-col justify-between p-12 relative overflow-hidden bg-[var(--color-surface-container)]">
      {/* Background decorative image */}
      <div className="absolute inset-0 opacity-30 mix-blend-overlay pointer-events-none">
        <Image
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuAnqhpW3VjP16UVmJbK8K7NGZU7WE30ZuTee_lv64OrfX9o-x551OQ6FejcwLoUoI8dxfiNqtvLCHl95h-RZtp1S47Nji2rnrM1OyoS5FM4r_Z4l9JMqQftxyAkKo3HtGTXaLZPEAZtpVUIJYO6vSmelFZCBcZKdAuNc_o5I_f1abO4bBIhO1QQcqgIoRgcqUTclJqADZbj62tfiDVM5RazM6F-SIsmhu0Ww6QXSW4UC7UpOYbSulKi5RpV2VmYo1i9XAza7MFv4g"
          alt="Abstract 3D digital visualization of a global ledger network"
          fill
          className="object-cover"
          unoptimized
        />
      </div>

      {/* Top: wordmark */}
      <div className="relative z-10">
        <h1
          className="text-3xl font-black tracking-tighter text-[var(--color-secondary)]"
          style={{ fontFamily: "var(--font-headline)" }}
        >
          SCopyTrade
        </h1>
        <p className="text-[var(--color-on-surface-variant)] mt-2 font-medium">
          The Sovereign Ledger
        </p>
      </div>

      {/* Middle: badge + headline + subtext */}
      <div className="relative z-10">
        <div className="inline-flex items-center gap-2 bg-[var(--color-secondary)]/10 text-[var(--color-secondary)] px-3 py-1 rounded-full mb-6">
          <RiVerifiedBadgeLine className="text-sm" />
          <span className="text-xs font-bold tracking-wider uppercase">
            Institutional Grade Security
          </span>
        </div>

        <h2
          className="text-4xl font-bold text-white leading-tight mb-4"
          style={{ fontFamily: "var(--font-headline)" }}
        >
          Master the markets with Quant-led precision.
        </h2>

        <p className="text-[var(--color-on-surface-variant)] text-lg max-w-sm">
          Connect your sovereign wallet or use institutional credentials to
          access the terminal.
        </p>
      </div>

      {/* Bottom: stats */}
      <div className="relative z-10 flex gap-6">
        {stats.map((stat, i) => (
          <div
            key={stat.label}
            className={`flex flex-col ${
              i > 0
                ? "border-l border-[var(--color-outline-variant)]/20 pl-6"
                : ""
            }`}
          >
            <span
              className="text-[var(--color-secondary)] font-bold text-xl"
              style={{ fontFamily: "var(--font-headline)" }}
            >
              {stat.value}
            </span>
            <span className="text-[var(--color-on-surface-variant)] text-xs">
              {stat.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
