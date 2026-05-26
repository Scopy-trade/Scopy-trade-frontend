// app/register/page.tsx
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import BrandingPanel from "@/components/auth/register/BrandingPanel";
import { ExchangeSettings } from "@/components/onboarding/ExchangeSettings";
import { exchangeService } from "@/lib/api/exchanges";

export default function OnboardingPage() {
  const router = useRouter();
  const [connectionCount, setConnectionCount] = useState(0);
  const [isConnecting, setIsConnecting] = useState(false);
  const [hasClickedContinue, setHasClickedContinue] = useState(false);

  // Fetch initial connection count
  useEffect(() => {
    const fetchConnectionCount = async () => {
      try {
        const response = await exchangeService.getUserExchangeConnections();
        if (response.success && response.connections) {
          setConnectionCount(response.connections.length);
        }
      } catch (error) {
        console.error("Failed to fetch connections:", error);
      }
    };
    fetchConnectionCount();
  }, []);

  const handleConnectionChange = async () => {
    // Refresh connection count when connections are added/removed
    try {
      const response = await exchangeService.getUserExchangeConnections();
      if (response.success && response.connections) {
        setConnectionCount(response.connections.length);
      }
    } catch (error) {
      console.error("Failed to refresh connections:", error);
    }
  };

  const handleContinue = () => {
    setHasClickedContinue(true);

    // Check if there are connections before proceeding
    if (connectionCount === 0) {
      // Show a toast or alert to the user
      const event = new CustomEvent("show-toast", {
        detail: {
          message: "Please connect at least one exchange before continuing",
          type: "warning",
        },
      });
      window.dispatchEvent(event);
      return;
    }

    // Navigate to dashboard
    router.push("/dashboard/copy-trader");
  };

  return (
    <div className="min-h-screen flex flex-col bg-surface-container-lowest text-on-surface">
      <main className="grow flex flex-col lg:flex-row items-stretch overflow-hidden">
        {/* Left – branding (visible on lg screens) */}
        <BrandingPanel />

        {/* Right – exchange settings */}
        <div className="min-h-screen w-full lg:w-2/3 flex flex-col bg-background text-on-background">
          <main className="mt-20 grow px-8 py-12 max-w-7xl mx-auto w-full">
            {/* Header with connection status */}
            <header className="mb-8">
              <div className="flex items-center justify-between mb-2">
                <h1 className="text-4xl font-bold font-headline tracking-tight">
                  Exchange Settings
                </h1>
                {connectionCount > 0 && (
                  <div className="px-3 py-1 bg-secondary/20 text-secondary rounded-full text-sm font-medium">
                    {connectionCount}{" "}
                    {connectionCount === 1 ? "Exchange" : "Exchanges"} Connected
                  </div>
                )}
              </div>
              <p className="text-on-surface-variant max-w-2xl font-body">
                Connect your exchange API keys to enable automated copy trading.
                Your keys are encrypted and stored with sovereign security
                protocols.
              </p>
            </header>

            {/* Progress indicator */}
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-2">
                <div className="flex-1 h-1 bg-surface-container-highest rounded-full overflow-hidden">
                  <div
                    className="h-full bg-secondary transition-all duration-500 ease-out rounded-full"
                    style={{ width: connectionCount > 0 ? "100%" : "0%" }}
                  />
                </div>
                <span className="text-sm font-medium text-on-surface-variant">
                  {connectionCount > 0
                    ? "Ready to proceed"
                    : "Connect an exchange"}
                </span>
              </div>
            </div>

            {/* Exchange Settings Component */}
            <ExchangeSettings onConnectionChange={handleConnectionChange} />

            {/* Continue button with improved UI */}
            <div className="mt-10 pt-6 border-t border-outline/20">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-sm text-on-surface-variant">
                  {connectionCount === 0 ? (
                    <span className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-warning rounded-full animate-pulse" />
                      Connect at least one exchange to continue
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-secondary rounded-full" />
                      Ready to start copy trading
                    </span>
                  )}
                </div>

                <button
                  onClick={handleContinue}
                  disabled={connectionCount === 0 || isConnecting}
                  className={`
                    px-8 py-3 rounded-lg font-bold text-sm uppercase tracking-widest
                    transition-all duration-200 flex items-center gap-2
                    ${
                      connectionCount > 0 && !isConnecting
                        ? "bg-secondary hover:bg-secondary/90 text-on-secondary shadow-lg shadow-secondary/20 hover:shadow-secondary/40 active:scale-[0.98]"
                        : "bg-surface-container-highest text-on-surface-variant cursor-not-allowed opacity-50"
                    }
                  `}
                >
                  Continue to Dashboard
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </main>
        </div>
      </main>

      {/* Toast notification component */}
      <ToastNotification />
    </div>
  );
}

// Toast notification component
function ToastNotification() {
  const [toast, setToast] = useState<{
    show: boolean;
    message: string;
    type: "success" | "error" | "warning" | "info";
  }>({ show: false, message: "", type: "info" });

  useEffect(() => {
    const handleShowToast = (
      event: CustomEvent<{
        message: string;
        type: "success" | "error" | "warning" | "info";
      }>,
    ) => {
      setToast({
        show: true,
        message: event.detail.message,
        type: event.detail.type,
      });

      // Auto-hide after 4 seconds
      setTimeout(() => {
        setToast((prev) => ({ ...prev, show: false }));
      }, 4000);
    };

    window.addEventListener("show-toast", handleShowToast as EventListener);

    return () => {
      window.removeEventListener(
        "show-toast",
        handleShowToast as EventListener,
      );
    };
  }, []);

  if (!toast.show) return null;

  const getToastStyles = () => {
    switch (toast.type) {
      case "success":
        return "bg-success text-white";
      case "error":
        return "bg-error text-white";
      case "warning":
        return "bg-warning text-black";
      default:
        return "bg-info text-white";
    }
  };

  const getToastIcon = () => {
    switch (toast.type) {
      case "success":
        return (
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        );
      case "error":
        return (
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        );
      case "warning":
        return (
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        );
      default:
        return (
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        );
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 animate-in slide-in-from-bottom-2 fade-in duration-300">
      <div
        className={`rounded-lg shadow-lg p-4 min-w-75 flex items-center gap-3 ${getToastStyles()}`}
      >
        {getToastIcon()}
        <p className="text-sm font-medium">{toast.message}</p>
      </div>
    </div>
  );
}
