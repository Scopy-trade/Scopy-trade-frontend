"use client";

import Image from "next/image";
import { RiLockLine } from "react-icons/ri";

export default function BrandingPanel() {
  return (
    <div className="hidden lg:flex lg:w-1/2 relative flex-col justify-between p-12 bg-[var(--color-surface-container-low)] overflow-hidden">
      {/* Ambient glow blobs */}
      <div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none">
        <div className="absolute -top-1/4 -left-1/4 w-full h-full bg-[var(--color-secondary-container)] blur-[120px] rounded-full" />
        <div className="absolute -bottom-1/4 -right-1/4 w-full h-full bg-[var(--color-primary-container)] blur-[120px] rounded-full" />
      </div>

      {/* Background decorative image */}
      <div className="absolute inset-0 z-0 opacity-10">
        <Image
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuAlxj2ckibgoMz-MwFzvc4iBLbEVqAEDuhOaLQ1wFsslUdn7y6_ofMqBaGb9xNsiJZ3PQVBOeG0oI36SiyuVMtTkApI0uDN-zlOm86lYYspPTebW9eZ64A3wknEpb-65R7nDp43aOVqIrgonA4HymOlA1PqATUwujl3v5x9IYMjjcj1oLUh8ayy4r_cJutjvJtUUaO0M4DRJT4joYTzceI_Hcee0LGNW7gYYn8Kebbim-IgbW5XitKI0mEQP8uqmGyf6BieBHuMsw"
          alt="Abstract digital art showing interconnected glowing nodes and data lines"
          fill
          className="object-cover"
          unoptimized
        />
      </div>

      {/* Top: Logo + headline */}
      <div className="relative z-10">
        <div className="flex items-center gap-2 mb-12">
          <div className="w-10 h-10 bg-[var(--color-secondary)] rounded-lg flex items-center justify-center">
            <RiLockLine className="text-[var(--color-on-secondary)] text-xl" />
          </div>
          <span className="brand-logo text-2xl font-black tracking-tighter text-[var(--color-secondary)]">
            SCopyTrade
          </span>
        </div>

        <h1 className="text-5xl font-extrabold tracking-tight leading-tight max-w-lg mb-6 text-[var(--color-on-surface)]">
          Enter the <span className="text-gradient">Sovereign</span> Era of
          Trading.
        </h1>

        <p className="text-[var(--color-on-surface-variant)] text-lg max-w-md">
          Institutional-grade infrastructure designed for individual
          sovereignty. Connect, copy, and scale with precision.
        </p>
      </div>

      {/* Bottom: Testimonial card */}
      <div className="relative z-10">
        <div className="glass-panel p-6 rounded-xl border border-[var(--color-outline-variant)]/10 max-w-sm">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
              <Image
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAGeHFNYxPndTIXnLVqQcxH3mV_hy3bWZ8wF3HhHRkUAGTNdadobKw0SWBF80kstlzRXMJj7M-r2e367vqZgyaThnY5R6rQ2tyf_p3CPWkzYSPUNJtps63pWQ75w4T-50YQOvNH2EI9LeVDD2viDesMDOYDgOshjK-VDH3zwSneyFBwspHbQWGbQRNAFjsrqlHt8bqxa7GcMOtBbYXSdpuJATdubOj-d38t6L-5w6AxyOL3Ovx60Rs4xGGeiKohhPl28Nr-P-Q_lA"
                alt="Marcus Thorne - Lead Strategist"
                width={48}
                height={48}
                className="w-full h-full object-cover"
                unoptimized
              />
            </div>
            <div>
              <p className="text-sm font-bold text-[var(--color-on-surface)]">
                Marcus Thorne
              </p>
              <p className="text-xs text-[var(--color-on-surface-variant)] uppercase tracking-widest">
                Lead Strategist
              </p>
            </div>
          </div>
          <p className="text-sm text-[var(--color-on-surface)] leading-relaxed">
            &ldquo;The latency on SCopyTrade is virtually non-existent.
            It&apos;s the only platform I trust for institutional
            execution.&rdquo;
          </p>
        </div>
      </div>
    </div>
  );
}
