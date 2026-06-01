import Link from "next/link";

export default function DualEntrySection() {
  return (
    <section
      id="for-traders"
      className="px-6 lg:px-24 -mt-4 relative z-20 pb-24"
    >
      <div className="grid lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
        {/* For Copy Traders */}
        <div className="group relative overflow-hidden bg-[#131b2e] p-10 rounded-[2.5rem] border border-white/10 hover:border-emerald-400/50 transition-all duration-500">
          {/* Background icon */}
          <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity select-none pointer-events-none">
            <svg
              width="96"
              height="96"
              viewBox="0 0 24 24"
              fill="none"
              className="text-emerald-400"
            >
              <path
                d="M3 17l6-6 4 4 8-9"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M17 8h4v4"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          <div className="relative z-10 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-400/10 rounded-full">
              <span className="text-[10px] font-bold tracking-widest uppercase text-emerald-400">
                For Copy Traders
              </span>
            </div>

            <h2
              className="text-4xl font-bold text-white"
              style={{ fontFamily: "var(--font-headline)" }}
            >
              Execute like a Pro.
              <br />
              No Custody.
            </h2>

            <p className="text-[#c5c6ce] text-lg leading-relaxed">
              Access verified, high-performance signals and execute across 15+
              exchanges without ever moving your funds from your own wallet.
            </p>

            <ul className="space-y-3">
              {[
                "Mirror institutional-grade strategies",
                "Unified multi-exchange dashboard",
                "Encrypted API key management",
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-3 text-sm text-white"
                >
                  <svg
                    className="w-4 h-4 text-emerald-400 flex-shrink-0"
                    viewBox="0 0 16 16"
                    fill="none"
                  >
                    <path
                      d="M13.5 4.5C11.5 6.5 9 10 7.5 12L3 8"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  {item}
                </li>
              ))}
            </ul>

            <Link
              href="/register"
              className="w-full py-5 bg-emerald-400 text-[#003824] font-bold rounded-2xl shadow-xl shadow-emerald-400/10 active:scale-[0.98] transition-transform flex items-center justify-center gap-2 hover:bg-emerald-300"
            >
              Start Copying
              <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none">
                <path
                  d="M3 8h10M9 4l4 4-4 4"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
          </div>
        </div>

        {/* For Pro Traders / Signal Providers */}
        <div
          id="for-providers"
          className="group relative overflow-hidden bg-[#131b2e] p-10 rounded-[2.5rem] border border-white/10 hover:border-[#b6c4ff]/50 transition-all duration-500"
        >
          {/* Background icon */}
          <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity select-none pointer-events-none">
            <svg
              width="96"
              height="96"
              viewBox="0 0 24 24"
              fill="none"
              className="text-[#b6c4ff]"
            >
              <path
                d="M12 2L15 8l6 .75-4.5 4.25L17.5 19 12 16 6.5 19l1-5.97L3 8.75 9 8z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          <div className="relative z-10 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#b6c4ff]/10 rounded-full">
              <span className="text-[10px] font-bold tracking-widest uppercase text-[#b6c4ff]">
                For Pro Traders
              </span>
            </div>

            <h2
              className="text-4xl font-bold text-white"
              style={{ fontFamily: "var(--font-headline)" }}
            >
              Monetize your Edge.
              <br />
              Scale your Impact.
            </h2>

            <p className="text-[#c5c6ce] text-lg leading-relaxed">
              Broadcast signals to thousands of traders and earn commissions
              automatically. Professional tools built for signal providers.
            </p>

            <ul className="space-y-3">
              {[
                "Signal Factory automation tools",
                "Institutional-grade performance analytics",
                "Automated commission settlement",
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-3 text-sm text-white"
                >
                  <svg
                    className="w-4 h-4 text-[#b6c4ff] flex-shrink-0"
                    viewBox="0 0 16 16"
                    fill="none"
                  >
                    <path
                      d="M13.5 4.5C11.5 6.5 9 10 7.5 12L3 8"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  {item}
                </li>
              ))}
            </ul>

            <Link
              href="/register?role=provider"
              className="w-full py-5 bg-[#b6c4ff] text-[#05297a] font-bold rounded-2xl shadow-xl shadow-[#b6c4ff]/10 active:scale-[0.98] transition-transform flex items-center justify-center gap-2 hover:bg-[#dce1ff]"
            >
              Become a Provider
              <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none">
                <path
                  d="M3 8h10M9 4l4 4-4 4"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
