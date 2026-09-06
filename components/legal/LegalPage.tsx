import type { ReactNode } from "react";
import Link from "next/link";
import Footer from "@/components/landing/Footer";
import TopNavBar from "@/components/landing/TopNavBar";

export interface LegalSection {
  id: string;
  title: string;
  content: ReactNode;
}

interface LegalPageProps {
  eyebrow: string;
  title: string;
  summary: string;
  lastUpdated: string;
  sections: LegalSection[];
  notice?: ReactNode;
}

const legalDocuments = [
  { label: "Risk Disclosure", href: "/risk-disclosure" },
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms of Service", href: "/terms-of-service" },
  { label: "Cookie Policy", href: "/cookie-policy" },
];

export default function LegalPage({
  eyebrow,
  title,
  summary,
  lastUpdated,
  sections,
  notice,
}: LegalPageProps) {
  return (
    <div className="min-h-screen bg-[#080c10] text-white antialiased selection:bg-emerald-500/30 selection:text-emerald-100">
      <TopNavBar />

      <main className="relative overflow-hidden px-6 pb-24 pt-32 lg:px-16 lg:pt-40">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[520px]">
          <div className="absolute left-1/2 top-10 h-72 w-[760px] -translate-x-1/2 rounded-full bg-emerald-500/[0.06] blur-[140px]" />
          <div
            className="absolute inset-0 opacity-[0.025]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.8) 1px, transparent 1px)",
              backgroundSize: "64px 64px",
            }}
          />
        </div>

        <div className="relative mx-auto max-w-7xl">
          <nav
            aria-label="Breadcrumb"
            className="mb-10 flex items-center gap-2 text-xs font-medium text-zinc-600"
          >
            <Link href="/" className="transition-colors hover:text-zinc-300">
              Home
            </Link>
            <span aria-hidden="true">/</span>
            <span className="text-zinc-400">{title}</span>
          </nav>

          <header className="max-w-4xl border-b border-white/[0.07] pb-12">
            <p className="mb-5 text-xs font-bold uppercase tracking-[0.18em] text-emerald-400">
              {eyebrow}
            </p>
            <h1 className="mb-6 text-4xl font-black tracking-[-0.04em] text-white sm:text-5xl lg:text-6xl">
              {title}
            </h1>
            <p className="max-w-3xl text-base font-medium leading-8 text-zinc-400 sm:text-lg">
              {summary}
            </p>
            <p className="mt-6 text-xs font-semibold uppercase tracking-[0.14em] text-zinc-600">
              Last updated: {lastUpdated}
            </p>
          </header>

          {notice && (
            <div className="mt-8 max-w-4xl rounded-xl border border-amber-400/20 bg-amber-400/[0.06] p-5 text-sm leading-7 text-amber-100/80">
              {notice}
            </div>
          )}

          <div className="mt-14 grid gap-12 lg:grid-cols-[240px_minmax(0,760px)] lg:gap-20">
            <aside className="lg:sticky lg:top-28 lg:self-start">
              <div className="rounded-xl border border-white/[0.06] bg-white/[0.025] p-5">
                <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.16em] text-zinc-600">
                  Legal documents
                </p>
                <ul className="space-y-1">
                  {legalDocuments.map((document) => (
                    <li key={document.href}>
                      <Link
                        href={document.href}
                        aria-current={document.label === title ? "page" : undefined}
                        className={`block rounded-lg px-3 py-2.5 text-sm font-semibold transition-colors ${
                          document.label === title
                            ? "bg-emerald-400/10 text-emerald-300"
                            : "text-zinc-500 hover:bg-white/[0.04] hover:text-zinc-200"
                        }`}
                      >
                        {document.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6 hidden px-5 lg:block">
                <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.16em] text-zinc-700">
                  On this page
                </p>
                <ul className="space-y-2.5 border-l border-white/[0.07] pl-4">
                  {sections.map((section) => (
                    <li key={section.id}>
                      <a
                        href={`#${section.id}`}
                        className="text-xs leading-5 text-zinc-600 transition-colors hover:text-emerald-400"
                      >
                        {section.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>

            <article className="min-w-0 space-y-12">
              {sections.map((section, index) => (
                <section
                  id={section.id}
                  key={section.id}
                  className="scroll-mt-32 border-b border-white/[0.06] pb-12 last:border-0"
                >
                  <div className="mb-5 flex items-baseline gap-4">
                    <span className="font-mono text-xs font-bold text-emerald-500/70">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <h2 className="text-2xl font-extrabold tracking-tight text-zinc-100">
                      {section.title}
                    </h2>
                  </div>
                  <div className="space-y-4 text-sm leading-7 text-zinc-400 sm:text-[15px] [&_a]:font-semibold [&_a]:text-emerald-400 [&_a]:underline-offset-4 hover:[&_a]:underline [&_li]:pl-1 [&_strong]:font-semibold [&_strong]:text-zinc-200 [&_ul]:ml-5 [&_ul]:list-disc [&_ul]:space-y-2">
                    {section.content}
                  </div>
                </section>
              ))}
            </article>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
