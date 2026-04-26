import Link from "next/link";

export default function CtaSection() {
  return (
    <section className="py-32 px-6 lg:px-24">
      <div className="relative rounded-[2.5rem] overflow-hidden bg-[var(--color-primary-container)] p-12 md:p-16 text-center border border-[var(--color-primary)]/20 max-w-6xl mx-auto">
        {/* Radial glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(circle at center, rgba(182,196,255,0.1) 0%, transparent 70%)",
          }}
        />

        <div className="relative z-10 max-w-2xl mx-auto">
          <h2
            className="text-4xl md:text-5xl font-black tracking-tight mb-8 text-[var(--color-on-primary-fixed)]"
            style={{ fontFamily: "var(--font-headline)" }}
          >
            Ready to Trade with Sovereign Control?
          </h2>
          <p className="text-lg text-[var(--color-on-primary-container)]/80 mb-12">
            Join the next generation of copy trading. No custody, no risk of
            platform insolvency, total transparency.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link
              href="/register"
              className="px-10 py-5 bg-[var(--color-secondary)] text-[var(--color-on-secondary)] font-bold rounded-xl shadow-xl shadow-[var(--color-secondary)]/30 active:scale-95 transition-transform hover:opacity-90"
            >
              Register
            </Link>
            <button className="px-10 py-5 bg-[var(--color-on-primary-fixed)] text-[var(--color-primary-fixed)] font-bold rounded-xl border border-[var(--color-primary)]/30 hover:bg-[var(--color-on-primary-fixed)]/80 transition-all">
              Read Documentation
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
