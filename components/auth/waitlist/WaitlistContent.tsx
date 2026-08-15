"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import {
  RiMailOpenLine,
  RiCheckboxCircleLine,
  RiArrowRightLine,
  RiTimeLine,
  RiShieldCheckLine,
} from "react-icons/ri";
import BrandLogo from "@/components/brand/BrandLogo";

export default function WaitlistContent() {
  const searchParams = useSearchParams();
  const registered = searchParams.get("registered");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (registered === "true") {
      const timer = setTimeout(() => {
        window.history.replaceState({}, "", "/waitlist");
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [registered]);

  const isNewRegistration = registered === "true";

  const handleLogout = async () => {
    setIsLoading(true);
    try {
      // Redirect to login
      window.location.href = "/login";
    } catch {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full md:w-1/2 flex items-center justify-center p-8 lg:p-14 overflow-y-auto bg-[var(--color-surface-container-lowest)]">
      <div className="w-full max-w-sm">
        {/* Mobile logo */}
        <div className="md:hidden mb-8">
          <BrandLogo className="h-12 w-40" priority />
        </div>

        {/* Main content */}
        <div className="text-center">
          {/* Icon */}
          <div className="mb-6 flex justify-center">
            <div className="relative">
              <div className="w-16 h-16 bg-[var(--color-secondary)]/10 rounded-full flex items-center justify-center animate-pulse">
                <RiMailOpenLine className="text-3xl text-[var(--color-secondary)]" />
              </div>
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-[var(--color-secondary)] rounded-full flex items-center justify-center">
                <RiCheckboxCircleLine className="text-white text-sm" />
              </div>
            </div>
          </div>

          {/* Heading */}
          <div className="mb-6">
            <h2
              className="text-3xl font-black tracking-tight text-[var(--color-on-surface)] mb-3"
              style={{ fontFamily: "var(--font-headline)" }}
            >
              {isNewRegistration ? "Welcome to the Waitlist!" : "Welcome Back!"}
            </h2>
            <p className="text-sm text-[var(--color-on-surface-variant)] leading-relaxed">
              {isNewRegistration
                ? "Your account has been created successfully. You've been added to our waitlist and will be among the first to access SCopyTrade when we launch."
                : "Your login was successful, but we're not live just yet. You'll be notified as soon as we launch and your access is activated."}
            </p>
          </div>

          {/* Info cards */}
          <div className="space-y-3 mb-8">
            {[
              {
                icon: RiTimeLine,
                title: "Limited Access Period",
                description: isNewRegistration
                  ? "We're taking a limited number of traders during our beta launch"
                  : "We are currently in the final stages of preparation",
              },
              {
                icon: RiMailOpenLine,
                title: "We'll Notify You",
                description:
                  "Check your email regularly for our launch announcement and access details",
              },
              {
                icon: RiShieldCheckLine,
                title: "Early Access Benefit",
                description:
                  "Waitlist members get exclusive early access and special benefits",
              },
            ].map((item, index) => {
              const Icon = item.icon;
              return (
                <div
                  key={index}
                  className="bg-[var(--color-surface-container)] border border-[var(--color-outline)]/10 rounded-xl p-4 text-left hover:border-[var(--color-secondary)]/20 transition-all"
                >
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 mt-0.5">
                      <Icon className="text-[var(--color-secondary)] text-lg" />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-[var(--color-on-surface)] mb-0.5">
                        {item.title}
                      </h3>
                      <p className="text-xs text-[var(--color-on-surface-variant)]">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* CTA */}
          <div className="bg-[var(--color-secondary)]/5 border border-[var(--color-secondary)]/20 rounded-xl p-4 mb-6">
            <p className="text-xs text-[var(--color-on-surface-variant)] mb-2">
              💡 Tip:
            </p>
            <p className="text-sm text-[var(--color-on-surface)]">
              Add our email to your contacts to ensure you don't miss our launch
              announcement
            </p>
          </div>

          {/* Action buttons */}
          <div className="space-y-3">
            <Link
              href="/"
              className="w-full button-gradient text-[var(--color-on-secondary)] font-bold py-3.5 rounded-xl shadow-lg shadow-[var(--color-secondary)]/15 hover:opacity-90 active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-60"
            >
              <span>Return to Home</span>
              <RiArrowRightLine className="text-lg" />
            </Link>

            <button
              onClick={handleLogout}
              disabled={isLoading}
              className="w-full py-3.5 rounded-xl border border-[var(--color-outline)]/20 text-[var(--color-on-surface)] font-semibold hover:bg-[var(--color-surface-container-highest)] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Signing out..." : "Sign Out"}
            </button>
          </div>
        </div>

        {/* Footer note */}
        <div className="mt-8 pt-6 border-t border-[var(--color-outline)]/10">
          <p className="text-xs text-[var(--color-on-surface-variant)] text-center">
            Questions?{" "}
            <Link
              href="/contact"
              className="text-[var(--color-secondary)] hover:underline font-semibold"
            >
              Contact us
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
