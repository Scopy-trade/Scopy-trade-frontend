// components/auth/register/BrandingPanel.tsx
"use client";

import Image from "next/image";
import {
  RiLockLine,
  RiShieldCheckLine,
  RiLineChartLine,
  RiUserFollowLine,
} from "react-icons/ri";

const steps = [
  {
    icon: RiUserFollowLine,
    title: "Choose your role",
    desc: "Copy Trader or Pro Trader",
  },
  {
    icon: RiLineChartLine,
    title: "Connect & follow",
    desc: "Mirror top signal providers",
  },
  {
    icon: RiShieldCheckLine,
    title: "Trade with confidence",
    desc: "Institutional-grade security",
  },
];

export default function BrandingPanel() {
  return (
    <div className="hidden lg:flex lg:w-1/2 relative flex-col justify-between p-10 xl:p-14 bg-[var(--color-surface-container-low)] overflow-hidden">
      {/* Ambient glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-1/4 -left-1/4 w-[600px] h-[600px] bg-[var(--color-secondary-container)]/40 rounded-full blur-[140px]" />
        <div className="absolute -bottom-1/4 -right-1/4 w-[600px] h-[600px] bg-[var(--color-primary-container)]/40 rounded-full blur-[140px]" />
      </div>

      {/* Background decorative image */}
      <div className="absolute inset-0 z-0 opacity-[0.06] pointer-events-none">
        <Image
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuAlxj2ckibgoMz-MwFzvc4iBLbEVqAEDuhOaLQ1wFsslUdn7y6_ofMqBaGb9xNsiJZ3PQVBOeG0oI36SiyuVMtTkApI0uDN-zlOm86lYYspPTebW9eZ64A3wknEpb-65R7nDp43aOVqIrgonA4HymOlA1PqATUwujl3v5x9IYMjjcj1oLUh8ayy4r_cJutjvJtUUaO0M4DRJT4joYTzceI_Hcee0LGNW7gYYn8Kebbim-IgbW5XitKI0mEQP8uqmGyf6BieBHuMsw"
          alt="Abstract digital art showing interconnected glowing nodes"
          fill
          className="object-cover"
          unoptimized
          fetchPriority="high"
        />
      </div>

      {/* Dot grid */}
      <div
        className="absolute inset-0 opacity-[0.035] pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle, #4edea3 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      {/* Top: Logo */}
      <div className="relative z-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[var(--color-secondary)] rounded-xl flex items-center justify-center shadow-lg shadow-[var(--color-secondary)]/20">
            <RiLockLine className="text-[var(--color-on-secondary)] text-xl" />
          </div>
          <div>
            <span
              className="text-2xl font-black tracking-tighter text-[var(--color-secondary)]"
              style={{ fontFamily: "var(--font-headline)" }}
            >
              SCopyTrade
            </span>
            <p className="text-[10px] uppercase tracking-widest text-[var(--color-on-surface-variant)] opacity-60">
              Sovereign Terminal
            </p>
          </div>
        </div>
      </div>

      {/* Middle: Hero + steps */}
      <div className="relative z-10">
        <h1
          className="text-4xl xl:text-5xl font-extrabold tracking-tight leading-tight mb-5 text-[var(--color-on-surface)]"
          style={{ fontFamily: "var(--font-headline)" }}
        >
          Enter the <span className="text-gradient">Sovereign</span> Era of
          Trading.
        </h1>

        <p className="text-[var(--color-on-surface-variant)] text-base max-w-sm leading-relaxed mb-10">
          Institutional-grade infrastructure designed for individual
          sovereignty. Connect, copy, and scale with precision.
        </p>

        {/* Steps */}
        <div className="space-y-4">
          {steps.map(({ icon: Icon, title, desc }, i) => (
            <div key={title} className="flex items-center gap-4">
              <div className="relative flex-shrink-0">
                <div className="w-10 h-10 rounded-xl bg-[var(--color-secondary)]/10 border border-[var(--color-secondary)]/20 flex items-center justify-center">
                  <Icon className="text-[var(--color-secondary)] text-lg" />
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[var(--color-surface-container-low)] border border-[var(--color-outline-variant)]/20 flex items-center justify-center">
                  <span className="text-[8px] font-black text-[var(--color-on-surface-variant)]">
                    {i + 1}
                  </span>
                </div>
              </div>
              <div>
                <p className="text-sm font-bold text-[var(--color-on-surface)]">
                  {title}
                </p>
                <p className="text-xs text-[var(--color-on-surface-variant)]">
                  {desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom: Testimonial */}
      <div className="relative z-10">
        <div className="bg-white/[0.04] backdrop-blur-sm border border-white/8 rounded-2xl p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0 ring-2 ring-[var(--color-secondary)]/20">
              <Image
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAGeHFNYxPndTIXnLVqQcxH3mV_hy3bWZ8wF3HhHRkUAGTNdadobKw0SWBF80kstlzRXMJj7M-r2e367vqZgyaThnY5R6rQ2tyf_p3CPWkzYSPUNJtps63pWQ75w4T-50YQOvNH2EI9LeVDD2viDesMDOYDgOshjK-VDH3zwSneyFBwspHbQWGbQRNAFjsrqlHt8bqxa7GcMOtBbYXSdpuJATdubOj-d38t6L-5w6AxyOL3Ovx60Rs4xGGeiKohhPl28Nr-P-Q_lA"
                alt="Marcus Thorne"
                width={40}
                height={40}
                className="w-full h-full object-cover"
                unoptimized
              />
            </div>
            <div>
              <p className="text-sm font-bold text-[var(--color-on-surface)]">
                Marcus Thorne
              </p>
              <p className="text-[10px] uppercase tracking-widest text-[var(--color-on-surface-variant)]">
                Lead Strategist
              </p>
            </div>
            {/* Stars */}
            <div className="ml-auto flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <span key={i} className="text-[var(--color-secondary)] text-xs">
                  ★
                </span>
              ))}
            </div>
          </div>
          <p className="text-sm text-[var(--color-on-surface-variant)] leading-relaxed">
            &ldquo;The latency on SCopyTrade is virtually non-existent.
            It&apos;s the only platform I trust for institutional
            execution.&rdquo;
          </p>
        </div>
      </div>
    </div>
  );
}
