"use client";

import Image from "next/image";
import { RiLockLine } from "react-icons/ri";

export default function BrandingPanel() {
  return (
    <div
      className="hidden lg:flex lg:w-1/2 relative flex-col justify-between p-12 overflow-hidden"
      style={{ backgroundColor: "#131b2e" }}
    >
      {/* Ambient glow orbs */}
      <div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none overflow-hidden">
        <div
          className="absolute rounded-full"
          style={{
            top: "-25%",
            left: "-25%",
            width: "100%",
            height: "100%",
            background: "#00a572",
            filter: "blur(120px)",
          }}
        />
        <div
          className="absolute rounded-full"
          style={{
            bottom: "-25%",
            right: "-25%",
            width: "100%",
            height: "100%",
            background: "#002371",
            filter: "blur(120px)",
          }}
        />
      </div>

      {/* Background texture */}
      <div className="absolute inset-0 z-0 opacity-10">
        <Image
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuAlxj2ckibgoMz-MwFzvc4iBLbEVqAEDuhOaLQ1wFsslUdn7y6_ofMqBaGb9xNsiJZ3PQVBOeG0oI36SiyuVMtTkApI0uDN-zlOm86lYYspPTebW9eZ64A3wknEpb-65R7nDp43aOVqIrgonA4HymOlA1PqATUwujl3v5x9IYMjjcj1oLUh8ayy4r_cJutjvJtUUaO0M4DRJT4joYTzceI_Hcee0LGNW7gYYn8Kebbim-IgbW5XitKI0mEQP8uqmGyf6BieBHuMsw"
          alt="Abstract digital art showing interconnected glowing nodes"
          fill
          className="object-cover"
          unoptimized
        />
      </div>

      {/* Top: Logo + headline */}
      <div className="relative z-10">
        <div className="flex items-center gap-2 mb-12">
          <div
            className="w-10 h-10 rounded-lg flex items-center justify-center"
            style={{ backgroundColor: "#4edea3" }}
          >
            <RiLockLine style={{ color: "#003824", fontSize: "1.25rem" }} />
          </div>
          <span
            className="text-2xl font-black tracking-tighter"
            style={{ fontFamily: "var(--font-headline)", color: "#4edea3" }}
          >
            SCopyTrade
          </span>
        </div>

        <h1
          className="text-5xl font-extrabold tracking-tight leading-tight max-w-lg mb-6"
          style={{ fontFamily: "var(--font-headline)", color: "#dae2fd" }}
        >
          Enter the <span className="text-gradient">Sovereign</span> Era of
          Trading.
        </h1>

        <p className="text-lg max-w-md" style={{ color: "#c5c6ce" }}>
          Institutional-grade infrastructure designed for individual
          sovereignty. Connect, copy, and scale with precision.
        </p>
      </div>

      {/* Bottom: Testimonial card */}
      <div className="relative z-10">
        <div
          className="glass-panel p-6 max-w-sm"
          style={{
            borderRadius: "0.75rem",
            border: "1px solid rgba(68,71,77,0.3)",
          }}
        >
          <div className="flex items-center gap-4 mb-4">
            <div
              className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0"
              style={{ position: "relative" }}
            >
              <Image
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAGeHFNYxPndTIXnLVqQcxH3mV_hy3bWZ8wF3HhHRkUAGTNdadobKw0SWBF80kstlzRXMJj7M-r2e367vqZgyaThnY5R6rQ2tyf_p3CPWkzYSPUNJtps63pWQ75w4T-50YQOvNH2EI9LeVDD2viDesMDOYDgOshjK-VDH3zwSneyFBwspHbQWGbQRNAFjsrqlHt8bqxa7GcMOtBbYXSdpuJATdubOj-d38t6L-5w6AxyOL3Ovx60Rs4xGGeiKohhPl28Nr-P-Q_lA"
                alt="Marcus Thorne"
                width={48}
                height={48}
                className="object-cover w-full h-full"
                unoptimized
              />
            </div>
            <div>
              <p className="text-sm font-bold" style={{ color: "#dae2fd" }}>
                Marcus Thorne
              </p>
              <p
                className="text-xs uppercase tracking-widest"
                style={{ color: "#c5c6ce" }}
              >
                Lead Strategist
              </p>
            </div>
          </div>
          <p className="text-sm leading-relaxed" style={{ color: "#dae2fd" }}>
            &quot;The latency on SCopyTrade is virtually non-existent. It&apos;s
            the only platform I trust for institutional execution.&quot;
          </p>
        </div>
      </div>
    </div>
  );
}
