// components/auth/login/LoginBrandingPanel.tsx
"use client";

import Image from "next/image";
import { RiShieldCheckLine, RiFlaskLine, RiGlobalLine } from "react-icons/ri";

const features = [
  { Icon: RiFlaskLine, text: "Advanced Analytics" },
  { Icon: RiShieldCheckLine, text: "MPC Wallet" },
  { Icon: RiGlobalLine, text: "Global Liquidity" },
];

export default function LoginBrandingPanel() {
  return (
    <div className="hidden md:flex md:w-1/2 lg:w-3/5 relative flex-col justify-between p-8 lg:p-12 bg-gradient-to-br from-[var(--color-surface-container)] to-[var(--color-surface-container-low)] overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[var(--color-secondary)]/20 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-[var(--color-primary)]/20 rounded-full blur-[100px]" />
        <Image
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuAnqhpW3VjP16UVmJbK8K7NGZU7WE30ZuTee_lv64OrfX9o-x551OQ6FejcwLoUoI8dxfiNqtvLCHl95h-RZtp1S47Nji2rnrM1OyoS5FM4r_Z4l9JMqQftxyAkKo3HtGTXaLZPEAZtpVUIJYO6vSmelFZCBcZKdAuNc_o5I_f1abO4bBIhO1QQcqgIoRgcqUTclJqADZbj62tfiDVM5RazM6F-SIsmhu0Ww6QXSW4UC7UpOYbSulKi5RpV2VmYo1i9XAza7MFv4g"
          alt="Abstract digital visualization"
          fill
          className="object-cover opacity-20 mix-blend-overlay"
          unoptimized
        />
      </div>

      {/* Top: Logo */}
      <div className="relative z-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-[var(--color-secondary)] to-[var(--color-primary)] rounded-xl flex items-center justify-center shadow-lg">
            <span className="text-white font-black text-xl">S</span>
          </div>
          <h1
            className="text-2xl font-black tracking-tighter text-white"
            style={{ fontFamily: "var(--font-headline)" }}
          >
            SCopyTrade
          </h1>
        </div>
        <p className="text-[var(--color-on-surface-variant)] text-sm mt-2">
          The Sovereign Trading Terminal
        </p>
      </div>

      {/* Middle: Hero section */}
      <div className="relative z-10 py-8">
        <div className="inline-flex items-center gap-2 bg-[var(--color-secondary)]/20 backdrop-blur-sm px-3 py-1.5 rounded-full mb-6 border border-[var(--color-secondary)]/30">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          <span className="text-xs font-bold tracking-wider text-[var(--color-secondary)] uppercase">
            Live Markets
          </span>
        </div>

        <h2
          className="text-4xl lg:text-5xl font-bold text-white leading-tight mb-4"
          style={{ fontFamily: "var(--font-headline)" }}
        >
          Trade with{" "}
          <span className="bg-gradient-to-r from-[var(--color-secondary)] to-[var(--color-primary)] bg-clip-text text-transparent">
            Institutional
          </span>{" "}
          Precision
        </h2>

        <p className="text-[var(--color-on-surface-variant)] text-base lg:text-lg max-w-md leading-relaxed">
          Access deep liquidity, sub-millisecond execution, and enterprise-grade
          security from a single interface.
        </p>

        {/* Feature pills */}
        <div className="flex flex-wrap gap-3 mt-8">
          {features.map(({ Icon, text }) => (
            <div
              key={text}
              className="flex items-center gap-2 bg-white/5 backdrop-blur-sm rounded-full px-4 py-2 border border-white/10"
            >
              <Icon className="text-[var(--color-secondary)] text-sm" />
              <span className="text-sm text-white/80">{text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom: Stats */}
      <div className="relative z-10 flex gap-8 pt-8 border-t border-white/10">
        <div>
          <div className="text-2xl font-bold text-white">$4.2B+</div>
          <div className="text-xs text-[var(--color-on-surface-variant)] uppercase tracking-wider">
            Trading Volume
          </div>
        </div>
        <div>
          <div className="text-2xl font-bold text-white">500K+</div>
          <div className="text-xs text-[var(--color-on-surface-variant)] uppercase tracking-wider">
            Active Traders
          </div>
        </div>
        <div>
          <div className="text-2xl font-bold text-white">12ms</div>
          <div className="text-xs text-[var(--color-on-surface-variant)] uppercase tracking-wider">
            Avg. Latency
          </div>
        </div>
      </div>
    </div>
  );
}
