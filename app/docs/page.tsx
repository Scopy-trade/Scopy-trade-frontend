"use client";

import Footer from "@/components/landing/Footer";
import TopNavBar from "@/components/landing/TopNavBar";
import { useState } from "react";

const sidebarSections = [
  {
    title: "Core Docs",
    items: [
      { label: "Introduction", icon: "description", active: true },
      { label: "API Reference", icon: "api" },
      { label: "SDKs", icon: "terminal" },
    ],
  },
  {
    title: "Architecture",
    items: [
      { label: "Security Protocols", icon: "security" },
      { label: "Trading Engine Specs", icon: "settings_input_component" },
    ],
  },
  {
    title: "Tutorials",
    items: [
      { label: "Getting Started", icon: "play_circle" },
      { label: "Mirroring Signals", icon: "sync_alt" },
    ],
  },
];

export default function DocumentationPage() {
  const [activeItem, setActiveItem] = useState("Introduction");
  const [feedback, setFeedback] = useState<"yes" | "no" | null>(null);

  return (
    <>
      <TopNavBar />

      <div className="flex pt-20">
        {/* Sidebar */}
        <aside className="w-72 shrink-0 bg-surface-container-low hidden md:block border-r border-outline-variant/5 sticky top-20 self-start h-[calc(100vh-5rem)] overflow-y-auto">
          <div className="p-6 space-y-8">
            {sidebarSections.map((section) => (
              <div key={section.title}>
                <h3 className="text-xs font-bold text-primary tracking-widest uppercase mb-4 opacity-70">
                  {section.title}
                </h3>
                <nav className="space-y-1">
                  {section.items.map(({ label, icon }) => {
                    const isActive = activeItem === label;
                    return (
                      <button
                        key={label}
                        onClick={() => setActiveItem(label)}
                        className={`group flex items-center w-full px-3 py-2 rounded-lg transition-all text-left ${
                          isActive
                            ? "text-primary bg-surface-container"
                            : "text-on-surface-variant hover:text-on-surface hover:bg-surface-container/50"
                        }`}
                      >
                        <span className="material-symbols-outlined mr-3 text-sm">
                          {icon}
                        </span>
                        <span className="text-sm font-medium">{label}</span>
                      </button>
                    );
                  })}
                </nav>
              </div>
            ))}
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 min-w-0 bg-background p-6 md:p-12">
          <div className="max-w-4xl mx-auto">
            {/* Breadcrumb */}
            <header className="mb-12">
              <div className="flex items-center gap-2 text-sm text-on-surface-variant mb-4">
                <span>Docs</span>
                <span className="material-symbols-outlined text-[10px]">
                  chevron_right
                </span>
                <span>Core Docs</span>
                <span className="material-symbols-outlined text-[10px]">
                  chevron_right
                </span>
                <span className="text-primary">Introduction</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-extrabold font-headline tracking-tight text-on-surface mb-6">
                Introduction to SCopyTrade
              </h1>
              <p className="text-lg text-on-surface-variant leading-relaxed max-w-2xl">
                Powering high-performance copy trading through non-custodial
                architecture. Our engine provides sub-millisecond execution
                times and absolute ledger transparency for institutional-grade
                signal mirroring.
              </p>
            </header>

            {/* Code Snippet */}
            <section className="mb-16">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold font-headline text-on-surface">
                  Mirroring a Signal
                </h2>
                <span className="text-xs font-mono text-secondary px-2 py-1 bg-secondary/10 rounded">
                  v2.4.0
                </span>
              </div>

              <div className="rounded-xl overflow-hidden bg-surface-container-highest border border-outline-variant/10 shadow-2xl">
                {/* Window chrome */}
                <div className="bg-surface-container-high px-4 py-2 flex items-center justify-between">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-error/40" />
                    <div className="w-3 h-3 rounded-full bg-tertiary/40" />
                    <div className="w-3 h-3 rounded-full bg-secondary/40" />
                  </div>
                  <span className="text-xs font-mono text-on-surface-variant">
                    javascript
                  </span>
                </div>

                <pre className="p-6 overflow-x-auto font-mono text-sm leading-relaxed">
                  <code className="text-on-surface">
                    <span className="text-secondary">const</span>
                    {" { SCopyClient } = "}
                    <span className="text-primary-fixed">require</span>
                    {"("}
                    <span className="text-tertiary">
                      &apos;@scopytrade/sdk&apos;
                    </span>
                    {");\n\n"}
                    <span className="text-on-surface-variant">
                      {"// Initialize secure client\n"}
                    </span>
                    <span className="text-secondary">const</span>
                    {" client = "}
                    <span className="text-secondary">new</span>{" "}
                    <span className="text-primary-fixed">SCopyClient</span>
                    {
                      "({\n    apiKey: process.env.SC_API_KEY,\n    secret: process.env.SC_SECRET\n});\n\n"
                    }
                    <span className="text-on-surface-variant">
                      {"// Subscribe to professional trader signals\n"}
                    </span>
                    <span className="text-secondary">const</span>
                    {" mirrorSignal = "}
                    <span className="text-secondary">async</span>
                    {" (traderId) => {\n    "}
                    <span className="text-secondary">try</span>
                    {" {\n        "}
                    <span className="text-secondary">const</span>
                    {" stream = "}
                    <span className="text-secondary">await</span>
                    {" client."}
                    <span className="text-primary-fixed">subscribe</span>
                    {"(traderId, {\n            leverage: "}
                    <span className="text-tertiary">2.5</span>
                    {",\n            maxDrawdown: "}
                    <span className="text-tertiary">0.05</span>
                    {",\n            priority: "}
                    <span className="text-tertiary">
                      &apos;ultra-fast&apos;
                    </span>
                    {"}\n        });\n\n        stream."}
                    <span className="text-primary-fixed">on</span>
                    {"("}
                    <span className="text-tertiary">&apos;trade&apos;</span>
                    {", (data) => {\n            console."}
                    <span className="text-primary-fixed">log</span>
                    {"("}
                    <span className="text-tertiary">
                      &apos;Order Executed:&apos;
                    </span>
                    {", data.txHash);\n        });\n    } "}
                    <span className="text-secondary">catch</span>
                    {" (err) {\n        console."}
                    <span className="text-primary-fixed">error</span>
                    {"("}
                    <span className="text-tertiary">
                      &apos;Execution failed:&apos;
                    </span>
                    {", err);\n    }\n};"}
                  </code>
                </pre>
              </div>
            </section>

            {/* Order Execution Flow */}
            <section className="mb-16">
              <h2 className="text-xl font-bold font-headline text-on-surface mb-8">
                Order Execution Flow
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  {
                    icon: "sensors",
                    color: "text-primary",
                    bg: "bg-primary/10",
                    step: "1. Signal Detection",
                    desc: "Our global websocket mesh detects signal provider transactions within 12ms of block propagation.",
                  },
                  {
                    icon: "memory",
                    color: "text-secondary",
                    bg: "bg-secondary/10",
                    step: "2. Risk Validation",
                    desc: "Proprietary logic verifies slippage, liquidity depth, and user-defined risk parameters in real-time.",
                  },
                  {
                    icon: "bolt",
                    color: "text-tertiary",
                    bg: "bg-tertiary/10",
                    step: "3. Atomic Execution",
                    desc: "The trade is mirrored across your connected wallets via non-custodial smart contract orchestration.",
                  },
                ].map(({ icon, color, bg, step, desc }) => (
                  <div
                    key={step}
                    className="bg-surface-container-low p-6 rounded-xl border border-outline-variant/5 hover:bg-surface-container transition-all"
                  >
                    <div
                      className={`w-10 h-10 rounded-lg ${bg} flex items-center justify-center mb-4`}
                    >
                      <span className={`material-symbols-outlined ${color}`}>
                        {icon}
                      </span>
                    </div>
                    <h3 className="text-sm font-bold text-on-surface mb-2">
                      {step}
                    </h3>
                    <p className="text-xs text-on-surface-variant leading-relaxed">
                      {desc}
                    </p>
                  </div>
                ))}
              </div>

              {/* Flow Visual */}
              <div className="mt-8 relative overflow-hidden rounded-2xl bg-surface-container-lowest p-8 border border-outline-variant/10">
                <div
                  className="absolute inset-0 opacity-10 pointer-events-none"
                  style={{
                    backgroundImage:
                      "radial-gradient(circle at 2px 2px, rgba(182, 196, 255, 0.1) 1px, transparent 0)",
                    backgroundSize: "24px 24px",
                  }}
                />
                <div className="relative flex flex-col items-center justify-center text-center">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDJelXqME2W-FWWw4lcbmfTwytP7bM47mj6HOmKhAbEW1QZMbLWPd5Z5sGsOFo1UzVO8OR0guWTsnHdupuZDr4WxdhIEfPmhyjLzrXCTzddelChUxI8-EOWwshPrKAIe_HXqhhPP6H9ReVgtDJ5d9q4VGOrTiAtaxdEHnBVVVhZiG5BqKEoaURW7YomHDbDslycT72hhCWKpjti57h8VdTqVaXWeW182W_zbxrzQyEXLNzvxUXyvpVZbVIctdw34SsyQvYI3vZnyw"
                    alt="Technical architecture diagram"
                    className="w-full max-w-lg mb-6 opacity-80 brightness-125"
                  />
                  <p className="text-sm font-mono text-on-surface-variant">
                    Sequence Architecture v4.2 - Distributed Order Engine
                  </p>
                </div>
              </div>
            </section>

            {/* Feedback & Help */}
            <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-8 rounded-2xl bg-primary-container/20 border border-primary/10 flex items-start gap-4">
                <span className="material-symbols-outlined text-primary text-3xl">
                  help_outline
                </span>
                <div>
                  <h4 className="font-bold text-on-surface mb-2">Need Help?</h4>
                  <p className="text-sm text-on-surface-variant mb-4">
                    Our engineering team is available 24/7 for technical
                    integration support.
                  </p>
                  <a
                    href="#"
                    className="text-primary text-sm font-bold hover:underline"
                  >
                    Join Developer Discord →
                  </a>
                </div>
              </div>

              <div className="p-8 rounded-2xl bg-surface-container-highest/30 border border-outline-variant/5 flex items-start gap-4">
                <span className="material-symbols-outlined text-secondary text-3xl">
                  rate_review
                </span>
                <div>
                  <h4 className="font-bold text-on-surface mb-2">
                    Was this helpful?
                  </h4>
                  <p className="text-sm text-on-surface-variant mb-4">
                    We are constantly improving our documentation based on your
                    feedback.
                  </p>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setFeedback("yes")}
                      className={`px-4 py-1.5 rounded-full text-xs font-bold transition-colors ${
                        feedback === "yes"
                          ? "bg-secondary text-on-secondary"
                          : "bg-surface-container hover:bg-surface-container-high"
                      }`}
                    >
                      Yes
                    </button>
                    <button
                      onClick={() => setFeedback("no")}
                      className={`px-4 py-1.5 rounded-full text-xs font-bold transition-colors ${
                        feedback === "no"
                          ? "bg-error/20 text-error"
                          : "bg-surface-container hover:bg-surface-container-high"
                      }`}
                    >
                      No
                    </button>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </main>
      </div>

      <Footer />
    </>
  );
}
