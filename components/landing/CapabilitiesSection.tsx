export default function CapabilitiesSection() {
  return (
    <section id="how-it-works" className="py-32 bg-[#060e20] mt-0">
      <div className="max-w-7xl mx-auto px-6 lg:px-24">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <p className="text-xs font-bold uppercase tracking-[0.15em] text-emerald-500 mb-4">
            How It Works
          </p>
          <h2
            className="text-4xl font-extrabold tracking-tight mb-4 text-white"
            style={{ fontFamily: "var(--font-headline)" }}
          >
            Sovereign Capabilities
          </h2>
          <p className="text-[#c5c6ce]">
            The terminal infrastructure designed to elevate both retail traders
            and signal architects.
          </p>
        </div>

        {/* Split grid */}
        <div className="grid md:grid-cols-2 gap-px bg-white/5 overflow-hidden rounded-[2rem] border border-white/10">
          {/* Trader Experience */}
          <div className="bg-[#131b2e] p-12">
            <h3
              className="text-2xl font-bold text-emerald-400 mb-8 flex items-center gap-3"
              style={{ fontFamily: "var(--font-headline)" }}
            >
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
                <circle
                  cx="11"
                  cy="11"
                  r="8"
                  stroke="currentColor"
                  strokeWidth="2"
                />
                <path
                  d="M21 21l-4.35-4.35"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
              The Trader Experience
            </h3>
            <div className="space-y-8">
              {[
                {
                  title: "Zero-Custody Trust",
                  desc: "No 'Transfer to Wallet' required. Keep 100% control of your funds on your preferred exchange at all times.",
                  icon: (
                    <path
                      d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinejoin="round"
                    />
                  ),
                },
                {
                  title: "Instant Signal Mirroring",
                  desc: "Execution latency under 100ms across all connected exchanges. Never miss an entry or exit point.",
                  icon: (
                    <path
                      d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinejoin="round"
                    />
                  ),
                },
                {
                  title: "Smart Risk Management",
                  desc: "Auto-apply stop-losses and take-profits based on your personal risk tolerance. Never over-expose a position.",
                  icon: (
                    <>
                      <path
                        d="M3 3h18v18H3z"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M9 9h6M9 12h6M9 15h4"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                    </>
                  ),
                },
              ].map(({ title, desc, icon }) => (
                <div key={title} className="flex gap-6">
                  <div className="w-12 h-12 shrink-0 bg-emerald-400/10 rounded-xl flex items-center justify-center">
                    <svg
                      className="w-5 h-5 text-emerald-400"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      {icon}
                    </svg>
                  </div>
                  <div>
                    <h4
                      className="font-bold text-white mb-2"
                      style={{ fontFamily: "var(--font-headline)" }}
                    >
                      {title}
                    </h4>
                    <p className="text-sm text-[#c5c6ce] leading-relaxed">
                      {desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Provider Toolkit */}
          <div className="bg-[#131b2e] p-12">
            <h3
              className="text-2xl font-bold text-[#b6c4ff] mb-8 flex items-center gap-3"
              style={{ fontFamily: "var(--font-headline)" }}
            >
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
                <path
                  d="M3 3h7v7H3zM14 3h7v7h-7zM14 14h7v7h-7zM3 14h7v7H3z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinejoin="round"
                />
              </svg>
              The Provider Toolkit
            </h3>
            <div className="space-y-8">
              {[
                {
                  title: "Mass Distribution",
                  desc: "One trade from your master account broadcasted to thousands of followers instantly via our secure bridge.",
                  icon: (
                    <>
                      <circle
                        cx="12"
                        cy="5"
                        r="2"
                        stroke="currentColor"
                        strokeWidth="1.5"
                      />
                      <circle
                        cx="5"
                        cy="19"
                        r="2"
                        stroke="currentColor"
                        strokeWidth="1.5"
                      />
                      <circle
                        cx="19"
                        cy="19"
                        r="2"
                        stroke="currentColor"
                        strokeWidth="1.5"
                      />
                      <path
                        d="M12 7v4M10 15l-3 2M14 15l3 2"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                    </>
                  ),
                },
                {
                  title: "Reputation Engine",
                  desc: "Build your brand with verifiable on-chain performance metrics and immutable PnL history.",
                  icon: (
                    <>
                      <path
                        d="M18 20V10M12 20V4M6 20v-6"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                    </>
                  ),
                },
                {
                  title: "Automated Commissions",
                  desc: "Earn performance fees automatically. Set your rate, let the protocol handle settlement — no chasing payments.",
                  icon: (
                    <>
                      <circle
                        cx="12"
                        cy="12"
                        r="9"
                        stroke="currentColor"
                        strokeWidth="1.5"
                      />
                      <path
                        d="M12 7v1m0 8v1M9.5 9.5l.7.7m3.6 3.6.7.7M7 12h1m8 0h1M9.5 14.5l.7-.7M13.1 10.9l.7-.7"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                    </>
                  ),
                },
              ].map(({ title, desc, icon }) => (
                <div key={title} className="flex gap-6">
                  <div className="w-12 h-12 shrink-0 bg-[#b6c4ff]/10 rounded-xl flex items-center justify-center">
                    <svg
                      className="w-5 h-5 text-[#b6c4ff]"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      {icon}
                    </svg>
                  </div>
                  <div>
                    <h4
                      className="font-bold text-white mb-2"
                      style={{ fontFamily: "var(--font-headline)" }}
                    >
                      {title}
                    </h4>
                    <p className="text-sm text-[#c5c6ce] leading-relaxed">
                      {desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
