// components/ExchangeConnectionModal.tsx
"use client";

import { useState, useEffect } from "react";
import { MdClose, MdInfo, MdSecurity, MdWarning } from "react-icons/md";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import { authAPI } from "@/lib/api/client";
import { ExchangeListItem, ConnectionSummary } from "@/lib";

interface ExchangeConnectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  exchange: ExchangeListItem | null;
  onSuccess: (connection: ConnectionSummary) => void;
}

interface FormData {
  apiKey: string;
  apiSecret: string;
  passphrase: string;
  label: string;
}

interface ValidationError {
  field: string;
  message: string;
}

// Exchange-specific instructions
const exchangeInstructions: Record<
  string,
  {
    title: string;
    steps: string[];
    warnings: string[];
    videoUrl?: string;
    docsUrl: string;
    requiredPermissions: string[];
  }
> = {
  binance: {
    title: "Binance API Setup Guide",
    steps: [
      "Log in to your Binance account",
      "Go to API Management (hover over profile icon → API Management)",
      "Click 'Create API' and select 'System generated'",
      "Enter a label for your API key (e.g., 'Trading Bot')",
      "Complete security verification (2FA/SMS)",
      "Copy the API Key and Secret Key immediately (Secret won't be shown again)",
      "Enable the following permissions: Enable Spot & Margin Trading",
      "⚠️ DO NOT enable Withdrawals - this is for security",
      "Click 'Save' to confirm permissions",
    ],
    warnings: [
      "Never share your Secret Key with anyone",
      "Store your Secret Key in a secure password manager",
      "Enable IP whitelisting for extra security",
      "Regularly rotate your API keys",
    ],
    docsUrl:
      "https://www.binance.com/en/support/faq/how-to-create-api-keys-on-binance-360002502072",
    requiredPermissions: ["Enable Spot & Margin Trading", "Read Only"],
  },
  bybit: {
    title: "Bybit API Setup Guide",
    steps: [
      "Log in to your Bybit account",
      "Navigate to API Management (Account & Security → API Management)",
      "Click 'Create New Key'",
      "Select 'API Key with limited access'",
      "Enter a name for your API key",
      "Set permissions: Enable 'Read-Write' for Spot and/or Derivatives trading",
      "Complete security verification (2FA/email code)",
      "Copy both API Key and Secret (Secret shown only once)",
      "Save your API Secret in a secure location",
    ],
    warnings: [
      "Never enable withdrawal permissions",
      "Use IP whitelisting when possible",
      "Regularly audit your API keys",
      "Keep your API Secret confidential",
    ],
    docsUrl: "https://bybit-exchange.github.io/docs/v5/intro",
    requiredPermissions: ["Spot Trade", "Derivatives Trade", "Read-Write"],
  },
  okx: {
    title: "OKX API Setup Guide",
    steps: [
      "Log in to your OKX account",
      "Go to API (Profile → API)",
      "Click 'Create V5 API Key'",
      "Enter a label for your API key",
      "Set Passphrase (you'll need this for authentication)",
      "Select permissions: Enable 'Trade' and 'Read'",
      "Complete security verification (2FA/SMS)",
      "Copy API Key, Secret Key, and save your Passphrase",
      "Important: Store all three pieces of information",
    ],
    warnings: [
      "Passphrase is required for OKX API authentication",
      "Never enable withdrawal permissions",
      "Store API Key, Secret, and Passphrase securely",
      "Enable IP whitelisting for production use",
    ],
    docsUrl: "https://www.okx.com/docs-v5/en/#rest-api",
    requiredPermissions: ["Trade", "Read"],
  },
  bitget: {
    title: "Bitget API Setup Guide",
    steps: [
      "Log in to your Bitget account",
      "Navigate to API Management (Dashboard → API)",
      "Click 'Create API Key'",
      "Enter a name for your API key",
      "Set a Passphrase (memorize this - required for API calls)",
      "Select permissions: Enable 'Spot trading' and/or 'Futures trading'",
      "Complete security verification (2FA/email)",
      "Copy API Key, Secret Key, and remember your Passphrase",
      "Store all credentials in a secure location",
    ],
    warnings: [
      "Passphrase is mandatory for Bitget API access",
      "Never enable withdrawal permissions",
      "Regularly rotate your API keys",
      "Use different API keys for different services",
    ],
    docsUrl: "https://www.bitget.com/api-doc/common/intro",
    requiredPermissions: ["Spot trading", "Futures trading"],
  },
};

export function ExchangeConnectionModal({
  isOpen,
  onClose,
  exchange,
  onSuccess,
}: ExchangeConnectionModalProps) {
  const [currentStep, setCurrentStep] = useState<"form" | "instructions">(
    "form",
  );
  const [formData, setFormData] = useState<FormData>({
    apiKey: "",
    apiSecret: "",
    passphrase: "",
    label: "",
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<ValidationError[]>([]);
  const [generalError, setGeneralError] = useState<string | null>(null);

  // Reset form when modal opens with new exchange
  useEffect(() => {
    if (isOpen && exchange) {
      setFormData({
        apiKey: "",
        apiSecret: "",
        passphrase: "",
        label: `${exchange.name} Connection`,
      });
      setErrors([]);
      setGeneralError(null);
      setCurrentStep("form");
    }
  }, [isOpen, exchange]);

  if (!isOpen || !exchange) return null;

  const instructions = exchangeInstructions[exchange.id];
  const requiresPassphrase = exchange.requiresPassphrase;

  const validateForm = (): boolean => {
    const newErrors: ValidationError[] = [];

    if (!formData.apiKey.trim()) {
      newErrors.push({ field: "apiKey", message: "API Key is required" });
    }

    if (!formData.apiSecret.trim()) {
      newErrors.push({ field: "apiSecret", message: "Secret Key is required" });
    }

    if (requiresPassphrase && !formData.passphrase.trim()) {
      newErrors.push({
        field: "passphrase",
        message: "Passphrase is required for this exchange",
      });
    }

    if (!formData.label.trim()) {
      newErrors.push({ field: "label", message: "Label is required" });
    }

    setErrors(newErrors);
    return newErrors.length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setGeneralError(null);

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const payload: Record<string, unknown> = {
        exchange: exchange.id,
        apiKey: formData.apiKey.trim(),
        apiSecret: formData.apiSecret.trim(),
        label: formData.label.trim(),
      };

      if (requiresPassphrase && formData.passphrase) {
        payload.passphrase = formData.passphrase.trim();
      }

      const response = await authAPI.connectExchange(payload);

      if (response.success && response.connection) {
        onSuccess(response.connection);
        onClose();
      } else {
        setGeneralError(response.message || "Failed to connect exchange");
      }
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to connect exchange";
      setGeneralError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error for this field when user starts typing
    setErrors((prev) => prev.filter((e) => e.field !== field));
    setGeneralError(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-5xl bg-surface-container rounded-2xl shadow-2xl overflow-hidden animate-in slide-in-from-bottom-4 duration-300">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-outline/20 bg-surface-container-highest">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-secondary/20 rounded-lg flex items-center justify-center">
              <span className="text-2xl">
                {exchange.id === "binance" && "🔵"}
                {exchange.id === "bybit" && "🟣"}
                {exchange.id === "okx" && "🔴"}
                {exchange.id === "bitget" && "🟠"}
              </span>
            </div>
            <div>
              <h2 className="text-xl font-bold font-headline">
                Connect {exchange.name}
              </h2>
              <p className="text-sm text-on-surface-variant">
                {currentStep === "form"
                  ? "Enter your API credentials"
                  : "Follow these steps to get your API keys"}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-surface-container-highest rounded-lg transition-colors"
          >
            <MdClose className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex flex-col md:flex-row h-full">
          {/* Step Toggle - Mobile */}
          <div className="md:hidden p-4 border-b border-outline/20">
            <div className="flex gap-2">
              <button
                onClick={() => setCurrentStep("form")}
                className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-colors ${
                  currentStep === "form"
                    ? "bg-secondary text-on-secondary"
                    : "bg-surface-container-highest text-on-surface-variant hover:bg-surface-container-high"
                }`}
              >
                API Form
              </button>
              <button
                onClick={() => setCurrentStep("instructions")}
                className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-colors ${
                  currentStep === "instructions"
                    ? "bg-secondary text-on-secondary"
                    : "bg-surface-container-highest text-on-surface-variant hover:bg-surface-container-high"
                }`}
              >
                Instructions
              </button>
            </div>
          </div>

          {/* Form Side */}
          <div
            className={`flex-1 p-6 overflow-y-auto ${
              currentStep === "form" ? "block" : "hidden md:block"
            }`}
          >
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Label Field */}
              <div>
                <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-widest mb-2">
                  Connection Label
                </label>
                <input
                  type="text"
                  value={formData.label}
                  onChange={(e) => handleInputChange("label", e.target.value)}
                  placeholder="e.g., Main Trading Account"
                  className="w-full bg-surface-container-highest border-none rounded-md p-3 text-on-surface focus:ring-2 focus:ring-secondary/40 transition-all font-body placeholder:text-outline/40"
                />
                {errors.find((e) => e.field === "label") && (
                  <p className="text-xs text-error mt-1">
                    {errors.find((e) => e.field === "label")?.message}
                  </p>
                )}
              </div>

              {/* API Key Field */}
              <div>
                <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-widest mb-2">
                  API Key
                </label>
                <input
                  type="text"
                  value={formData.apiKey}
                  onChange={(e) => handleInputChange("apiKey", e.target.value)}
                  placeholder="Paste your API key here"
                  className="w-full bg-surface-container-highest border-none rounded-md p-3 text-on-surface focus:ring-2 focus:ring-secondary/40 transition-all font-body placeholder:text-outline/40"
                />
                {errors.find((e) => e.field === "apiKey") && (
                  <p className="text-xs text-error mt-1">
                    {errors.find((e) => e.field === "apiKey")?.message}
                  </p>
                )}
              </div>

              {/* Secret Key Field */}
              <div>
                <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-widest mb-2">
                  Secret Key
                </label>
                <input
                  type="password"
                  value={formData.apiSecret}
                  onChange={(e) =>
                    handleInputChange("apiSecret", e.target.value)
                  }
                  placeholder="••••••••••••••••••••"
                  className="w-full bg-surface-container-highest border-none rounded-md p-3 text-on-surface focus:ring-2 focus:ring-secondary/40 transition-all font-body placeholder:text-outline/40"
                />
                {errors.find((e) => e.field === "apiSecret") && (
                  <p className="text-xs text-error mt-1">
                    {errors.find((e) => e.field === "apiSecret")?.message}
                  </p>
                )}
              </div>

              {/* Passphrase Field (conditional) */}
              {requiresPassphrase && (
                <div>
                  <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-widest mb-2">
                    Passphrase
                  </label>
                  <input
                    type="password"
                    value={formData.passphrase}
                    onChange={(e) =>
                      handleInputChange("passphrase", e.target.value)
                    }
                    placeholder="Enter your API passphrase"
                    className="w-full bg-surface-container-highest border-none rounded-md p-3 text-on-surface focus:ring-2 focus:ring-secondary/40 transition-all font-body placeholder:text-outline/40"
                  />
                  <p className="text-xs text-on-surface-variant mt-1">
                    Required for {exchange.name} API authentication
                  </p>
                  {errors.find((e) => e.field === "passphrase") && (
                    <p className="text-xs text-error mt-1">
                      {errors.find((e) => e.field === "passphrase")?.message}
                    </p>
                  )}
                </div>
              )}

              {/* General Error */}
              {generalError && (
                <div className="p-3 bg-error/10 border border-error/20 rounded-lg">
                  <p className="text-sm text-error">{generalError}</p>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full mt-6 py-4 rounded-md font-bold text-sm bg-linear-to-r from-secondary to-secondary-container text-on-secondary shadow-lg shadow-secondary/20 hover:shadow-secondary/40 active:scale-[0.98] transition-all uppercase tracking-widest disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Validating & Connecting...
                  </div>
                ) : (
                  "Securely Authorize Connection"
                )}
              </button>

              {/* Security Note */}
              <div className="flex items-start gap-2 p-3 bg-primary-container/30 rounded-lg">
                <MdSecurity className="w-4 h-4 text-primary mt-0.5" />
                <p className="text-xs text-on-surface-variant">
                  Your credentials are encrypted using AES-256-GCM before
                  storage. We never store plaintext API secrets or expose them
                  to clients.
                </p>
              </div>
            </form>
          </div>

          {/* Instructions Side */}
          <div
            className={`flex-1 bg-surface-container-lowest p-6 overflow-y-auto border-t md:border-t-0 md:border-l border-outline/20 ${
              currentStep === "instructions" ? "block" : "hidden md:block"
            }`}
          >
            {instructions ? (
              <div className="space-y-6">
                <h3 className="text-lg font-bold font-headline">
                  {instructions.title}
                </h3>

                {/* Steps */}
                <div>
                  <h4 className="text-sm font-bold text-on-surface-variant uppercase tracking-widest mb-3">
                    Setup Steps
                  </h4>
                  <ol className="space-y-2">
                    {instructions.steps.map((step, index) => (
                      <li key={index} className="flex gap-3 text-sm">
                        <span className="shrink-0 w-5 h-5 bg-secondary/20 text-secondary rounded-full flex items-center justify-center text-xs font-bold">
                          {index + 1}
                        </span>
                        <span className="text-on-surface leading-relaxed">
                          {step}
                        </span>
                      </li>
                    ))}
                  </ol>
                </div>

                {/* Required Permissions */}
                <div>
                  <h4 className="text-sm font-bold text-on-surface-variant uppercase tracking-widest mb-3">
                    Required Permissions
                  </h4>
                  <div className="space-y-1">
                    {instructions.requiredPermissions.map((perm, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-secondary rounded-full" />
                        <span className="text-sm text-on-surface">{perm}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Warnings */}
                <div className="p-4 bg-warning/10 border border-warning/20 rounded-lg">
                  <div className="flex items-start gap-2">
                    <MdWarning className="w-5 h-5 text-warning shrink-0" />
                    <div>
                      <h5 className="text-sm font-bold text-warning mb-2">
                        Security Warnings
                      </h5>
                      <ul className="space-y-1">
                        {instructions.warnings.map((warning, index) => (
                          <li key={index} className="text-xs text-on-surface">
                            • {warning}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Documentation Link */}
                <div>
                  <a
                    href={instructions.docsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm text-secondary hover:text-secondary/80 transition-colors"
                  >
                    View Official Documentation
                    <FaArrowRight className="w-3 h-3" />
                  </a>
                </div>

                {/* Tip */}
                <div className="flex items-start gap-2 p-3 bg-info/10 rounded-lg">
                  <MdInfo className="w-4 h-4 text-info mt-0.5" />
                  <p className="text-xs text-on-surface-variant">
                    After creating your API keys, return to the "API Form" tab
                    to enter your credentials and connect your account.
                  </p>
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-on-surface-variant">
                  Instructions for {exchange.name} coming soon.
                </p>
                <p className="text-sm text-on-surface-variant mt-2">
                  Please refer to the exchange's API documentation.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Footer with navigation buttons (desktop) */}
        <div className="hidden md:flex items-center justify-between p-4 border-t border-outline/20 bg-surface-container-highest">
          <button
            onClick={() =>
              setCurrentStep(currentStep === "form" ? "instructions" : "form")
            }
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-secondary hover:bg-secondary/10 rounded-lg transition-colors"
          >
            {currentStep === "form" ? (
              <>
                <MdInfo className="w-4 h-4" />
                View Instructions
              </>
            ) : (
              <>
                <FaArrowLeft className="w-4 h-4" />
                Back to Form
              </>
            )}
          </button>
          {currentStep === "form" && (
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="px-6 py-2 bg-secondary text-on-secondary rounded-lg font-medium text-sm hover:bg-secondary/90 transition-colors disabled:opacity-50"
            >
              Connect Exchange
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
