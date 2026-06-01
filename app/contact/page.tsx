"use client";

import Footer from "@/components/landing/Footer";
import TopNavBar from "@/components/landing/TopNavBar";
import { useState } from "react";

const inquiryTypes = ["Institutional Inquiries", "Technical Support", "Media"];

export default function ContactPage() {
  const [activeType, setActiveType] = useState("Institutional Inquiries");
  const [submitState, setSubmitState] = useState<
    "idle" | "loading" | "success"
  >("idle");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitState("loading");
    setTimeout(() => {
      setSubmitState("success");
      setTimeout(() => {
        setSubmitState("idle");
        (e.target as HTMLFormElement).reset();
      }, 3000);
    }, 1500);
  };

  const submitLabel =
    submitState === "loading"
      ? "Transmitting Packet..."
      : submitState === "success"
        ? "Transmission Verified"
        : "Initialize Transmission";

  return (
    <>
      <TopNavBar />

      <main className="pt-32 pb-24 px-6 md:px-12 max-w-7xl mx-auto">
        {/* Hero Header */}
        <header className="mb-20 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <span className="inline-block mb-4 px-4 py-1 rounded-full bg-primary-container text-on-primary-container text-xs font-bold tracking-tighter uppercase">
            Institutional Portal
          </span>
          <h1 className="text-5xl md:text-7xl font-extrabold font-headline tracking-tighter mb-6 leading-[1.1]">
            Global <span className="gradient-text">Support</span> &amp; <br />
            Institutional Inquiries.
          </h1>
          <p className="max-w-2xl text-on-surface-variant text-lg leading-relaxed font-light">
            Secure connectivity for the world&apos;s most sophisticated
            copy-trading ecosystem. Reach our specialized desks for enterprise
            integration, technical resolution, or security matters.
          </p>
        </header>

        {/* Bento Grid Contact Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left: Contact Form */}
          <div className="lg:col-span-7 bg-surface-container-low p-8 md:p-12 rounded-xl">
            <form className="space-y-8" onSubmit={handleSubmit}>
              {/* Inquiry Type */}
              <div className="space-y-4">
                <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-[0.2em]">
                  Inquiry Type
                </label>
                <div className="flex flex-wrap gap-3">
                  {inquiryTypes.map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setActiveType(type)}
                      className={`px-4 py-2 rounded-lg text-sm transition-all ${
                        activeType === type
                          ? "bg-surface-container-highest text-primary font-semibold border border-primary/20"
                          : "bg-surface-container-lowest text-on-surface-variant hover:text-on-surface"
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              {/* Name & Email */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label
                    className="block text-xs font-bold text-on-surface-variant uppercase tracking-widest"
                    htmlFor="name"
                  >
                    Full Name
                  </label>
                  <input
                    className="w-full bg-surface-container-highest border-none rounded-lg p-4 text-on-surface haptic-input focus:ring-0 placeholder:text-outline/40"
                    id="name"
                    placeholder="Johnathan Doe"
                    type="text"
                  />
                </div>
                <div className="space-y-2">
                  <label
                    className="block text-xs font-bold text-on-surface-variant uppercase tracking-widest"
                    htmlFor="email"
                  >
                    Business Email
                  </label>
                  <input
                    className="w-full bg-surface-container-highest border-none rounded-lg p-4 text-on-surface haptic-input focus:ring-0 placeholder:text-outline/40"
                    id="email"
                    placeholder="j.doe@institution.com"
                    type="email"
                  />
                </div>
              </div>

              {/* Message */}
              <div className="space-y-2">
                <label
                  className="block text-xs font-bold text-on-surface-variant uppercase tracking-widest"
                  htmlFor="message"
                >
                  Message Body
                </label>
                <textarea
                  className="w-full bg-surface-container-highest border-none rounded-lg p-4 text-on-surface haptic-input focus:ring-0 placeholder:text-outline/40 resize-none"
                  id="message"
                  placeholder="Detailed description of your inquiry..."
                  rows={5}
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={submitState !== "idle"}
                className={`w-full md:w-auto px-10 py-4 font-extrabold rounded-lg shadow-xl transition-all active:scale-[0.98] uppercase tracking-widest text-sm ${
                  submitState === "success"
                    ? "bg-primary-container text-on-primary-container"
                    : "bg-gradient-to-r from-secondary to-secondary-container text-on-secondary shadow-secondary/10 hover:shadow-secondary/20"
                } ${submitState === "loading" ? "opacity-50 pointer-events-none" : ""}`}
              >
                {submitLabel}
              </button>
            </form>
          </div>

          {/* Right: Locations & Security */}
          <div className="lg:col-span-5 space-y-6">
            {/* Security Card */}
            <div className="glass-panel p-8 rounded-xl border-l-4 border-tertiary">
              <div className="flex items-start gap-4 mb-4">
                <div className="bg-tertiary-container text-on-tertiary-container p-2 rounded-lg">
                  <span className="material-symbols-outlined">security</span>
                </div>
                <div>
                  <h3 className="font-headline font-bold text-xl">
                    Security Reporting
                  </h3>
                  <p className="text-sm text-on-surface-variant">
                    Active Bug Bounty Program
                  </p>
                </div>
              </div>
              <p className="text-on-surface-variant text-sm mb-6 leading-relaxed">
                Responsible disclosure is at the core of our platform integrity.
                Report critical vulnerabilities to our security desk for
                immediate triage and bounty evaluation.
              </p>
              <a
                className="inline-flex items-center gap-2 text-tertiary text-sm font-bold uppercase tracking-widest hover:gap-4 transition-all"
                href="#"
              >
                Report Vulnerability{" "}
                <span className="material-symbols-outlined text-sm">
                  arrow_forward
                </span>
              </a>
            </div>

            {/* Global Hubs */}
            <div className="bg-surface-container p-8 rounded-xl space-y-8">
              <h3 className="font-headline font-bold text-xl mb-4">
                Global Hubs
              </h3>

              {[
                {
                  city: "Singapore",
                  address: "Marina One West Tower",
                  utc: "UTC +8",
                  src: "https://lh3.googleusercontent.com/aida-public/AB6AXuCM3wIslQx6I7-FTQkrZLXg0d6OVumyU-W-HswK7PucnFmpYtvKxMFysMo8L0UqV-Ll76Xq5mtlizaMBMaZ9CYcQ1n13CzaMNsmr-asqGsYHDMxg_ezSDMtP-ykwxqaLMkfE7ConMvlum43PqcqLYHpaUoPDcjRRfS7-u2vUiZdv2I5PNFxAuoQBC6cMwUTHa-5_ANWbvfZk6nHwILvOL5YyA2SWlgQL28rqA5f1UF1zFZWb4v8s1JRlt3YiuSK9qOsr78hpmbuWg",
                },
                {
                  city: "London",
                  address: "The Leadenhall Building",
                  utc: "UTC +0",
                  src: "https://lh3.googleusercontent.com/aida-public/AB6AXuC5CJASi1eH5fj6cdbvMM0LuQ7W5hzkJLz2jwT-f64NL1d8hdCPMHRNO57EWd9r95M_QbgkxjCzk2PYDGozJDFyuBZbUYnS-jJLe-bIhQAFlds2AbSVIoIfndpeeUDuzzUO-O6yX_K17Y3zzyD2qL8xkNOjWYZwt_kU28LH4-WBE2vqyXkvgi0qEJGMPVkJffoI8UE49wQqCJw8MLE4uUMBFZvQMpaInEamwV1nvhG9_SvkvqTcSIVaGQN6adUSeRcrZ0OD8f9mnQ",
                },
                {
                  city: "New York",
                  address: "One World Trade Center",
                  utc: "UTC -5",
                  src: "https://lh3.googleusercontent.com/aida-public/AB6AXuCxg2tW2KHcPRphLt-2GAqP34BXJeXVpQIXcNWaLuod0SeqlBC-hnPbpJRU5PnvuaaCXFdabcZXVOX8WX-7lMRitNcs8Qf2PsE8GNPJaTtCBv9IWqBp68RgioXTEAQOKNT1OdaK--Mbq9R6kh_IgZLH8j9-1VtJvJ_VZvf4aErWDDX6q6YuCyuvbDp_U8oqPPtyjPcI31YIOy46wlkZHkHJ-DNUleioPYcorLbvClR1Gf3OABh2q7ug_6QXCVxrcIc2lnDu58oChQ",
                },
              ].map((hub) => (
                <div key={hub.city} className="flex items-center gap-6">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    className="w-16 h-16 rounded-lg object-cover grayscale hover:grayscale-0 transition-all duration-500"
                    src={hub.src}
                    alt={hub.city}
                  />
                  <div>
                    <h4 className="font-bold text-on-surface">{hub.city}</h4>
                    <p className="text-sm text-on-surface-variant">
                      {hub.address}
                    </p>
                    <p className="text-xs text-outline font-label mt-1">
                      {hub.utc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Atmospheric Map Section */}
        <section className="mt-24 rounded-2xl overflow-hidden relative h-[400px] group bg-surface-container-high">
          <div className="absolute inset-0 bg-gradient-to-t from-surface-container-lowest via-transparent to-transparent z-10" />
          <div className="absolute inset-0 z-0 opacity-40 grayscale group-hover:opacity-60 group-hover:grayscale-0 transition-all duration-1000">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className="w-full h-full object-cover"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuC5vSzdJuXj2MPA2pYewsdKUkoMLA31nAlq2iPmWCF3XbA87QwvLvR-fffhMoOR4f1d9DIdU9WFzKrZwY_REfdWhrsmDmsDMkSUzmfZJtqjvWp_2DohF1trr5xl3PgqRxlm2tuJNBC-pUK8xeVrTPq84qpHBQz665SSboUnYH1o-xVMDlLk-epeh0uShAsmt_xcPZSy_g4pYi7NraO5jVU03bLQ7QHkqmYCM3DA5a-XFie1Ly5v5XCBjsxyJfXgSQz9igR7yUqnZQ"
              alt="Global financial network map"
            />
          </div>
          <div className="absolute bottom-12 left-12 z-20">
            <div className="flex items-center gap-4">
              <div className="w-3 h-3 bg-secondary rounded-full animate-pulse shadow-[0_0_10px_#4edea3]" />
              <p className="font-headline font-bold text-2xl">
                Network Infrastructure 100% Operational
              </p>
            </div>
            <p className="text-on-surface-variant mt-2 max-w-md">
              Our global low-latency servers are distributed across Tier-3+ data
              centers for maximum redundancy.
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
