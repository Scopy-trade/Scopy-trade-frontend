// components/auth/login/LoginBrandingPanel.tsx
"use client";

import Image from "next/image";
import { RiShieldCheckLine, RiFlaskLine, RiGlobalLine } from "react-icons/ri";

const features = [
  { Icon: RiFlaskLine, text: "Advanced Analytics" },
  { Icon: RiShieldCheckLine, text: "MPC Wallet" },
  { Icon: RiGlobalLine, text: "Global Liquidity" },
];

const stats = [
  { value: "$4.2B+", label: "Trading Volume" },
  { value: "500K+", label: "Active Traders" },
  { value: "12ms", label: "Avg. Latency" },
];

export default function LoginBrandingPanel() {
  return (
    <div className="hidden md:flex md:w-1/2 relative flex-col justify-between p-10 lg:p-14 bg-[var(--color-surface-container)] overflow-hidden">
      {/* Ambient glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-1/4 -right-1/4 w-[600px] h-[600px] bg-[var(--color-secondary)]/10 rounded-full blur-[120px]" />
        <div className="absolute -bottom-1/4 -left-1/4 w-[500px] h-[500px] bg-[var(--color-primary)]/10 rounded-full blur-[120px]" />
      </div>

      {/* Background image */}
      <div className="absolute inset-0 opacity-[0.07] pointer-events-none">
        <Image
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuAnqhpW3VjP16UVmJbK8K7NGZU7WE30ZuTee_lv64OrfX9o-x551OQ6FejcwLoUoI8dxfiNqtvLCHl95h-RZtp1S47Nji2rnrM1OyoS5FM4r_Z4l9JMqQftxyAkKo3HtGTXaLZPEAZtpVUIJYO6vSmelFZCBcZKdAuNc_o5I_f1abO4bBIhO1QQcqgIoRgcqUTclJqADZbj62tfiDVM5RazM6F-SIsmhu0Ww6QXSW4UC7UpOYbSulKi5RpV2VmYo1i9XAza7MFv4g"
          alt="Abstract digital visualization"
          fill
          className="object-cover"
          unoptimized
        />
      </div>

      {/* Dot grid */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle, #4edea3 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      {/* Top: Logo */}
      <div className="relative z-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-[var(--color-secondary)] to-[var(--color-primary)] rounded-xl flex items-center justify-center shadow-lg shadow-[var(--color-secondary)]/20">
            <span className="text-[var(--color-on-secondary)] font-black text-xl">
              S
            </span>
          </div>
          <div>
            <h1
              className="text-2xl font-black tracking-tighter text-[var(--color-on-surface)]"
              style={{ fontFamily: "var(--font-headline)" }}
            >
              SCopyTrade
            </h1>
            <p className="text-[10px] uppercase tracking-widest text-[var(--color-on-surface-variant)] opacity-60">
              Sovereign Terminal
            </p>
          </div>
        </div>
      </div>

      {/* Middle: Hero */}
      <div className="relative z-10">
        <div className="inline-flex items-center gap-2 bg-[var(--color-secondary)]/10 border border-[var(--color-secondary)]/20 px-3 py-1.5 rounded-full mb-6">
          <span className="w-2 h-2 bg-[var(--color-secondary)] rounded-full animate-pulse" />
          <span className="text-xs font-bold tracking-wider text-[var(--color-secondary)] uppercase">
            Live Markets
          </span>
        </div>

        <h2
          className="text-4xl xl:text-5xl font-bold text-[var(--color-on-surface)] leading-tight mb-5"
          style={{ fontFamily: "var(--font-headline)" }}
        >
          Trade with{" "}
          <span
            className="text-transparent bg-clip-text"
            style={{
              backgroundImage:
                "linear-gradient(to right, var(--color-secondary), var(--color-primary))",
            }}
          >
            Institutional
          </span>{" "}
          Precision
        </h2>

        <p className="text-[var(--color-on-surface-variant)] text-base max-w-sm leading-relaxed mb-8">
          Access deep liquidity, sub-millisecond execution, and enterprise-grade
          security from a single interface.
        </p>

        {/* Feature pills */}
        <div className="flex flex-wrap gap-2.5">
          {features.map(({ Icon, text }) => (
            <div
              key={text}
              className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-2"
            >
              <Icon className="text-[var(--color-secondary)] text-sm flex-shrink-0" />
              <span className="text-sm text-[var(--color-on-surface)]">
                {text}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom: Stats */}
      <div className="relative z-10 flex gap-0 pt-8 border-t border-white/8">
        {stats.map((s, i) => (
          <div
            key={s.label}
            className={`flex-1 ${i > 0 ? "border-l border-white/10 pl-6" : ""}`}
          >
            <p
              className="text-2xl font-black text-[var(--color-on-surface)]"
              style={{ fontFamily: "var(--font-headline)" }}
            >
              {s.value}
            </p>
            <p className="text-[10px] uppercase tracking-widest text-[var(--color-on-surface-variant)] mt-0.5">
              {s.label}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
