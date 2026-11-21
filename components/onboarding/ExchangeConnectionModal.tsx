// components/ExchangeConnectionModal.tsx
"use client";

import { useState, useEffect } from "react";
import { MdClose, MdInfo, MdSecurity, MdWarning } from "react-icons/md";
import { FaArrowRight } from "react-icons/fa";
import { RiExchangeLine, RiEyeCloseLine, RiEyeLine } from "react-icons/ri";
import { ExchangeListItem, ConnectionSummary } from "@/lib";
import { exchangeService } from "@/lib/api/exchanges";
import { exchangeConnectionGuides } from "@/lib/exchangeConnectionGuides";
import { ServerIpWhitelist } from "./ServerIpWhitelist";

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
  const [showApiSecret, setShowApiSecret] = useState(false);
  const [showPassphrase, setShowPassphrase] = useState(false);

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
      setShowApiSecret(false);
      setShowPassphrase(false);
    }
  }, [isOpen, exchange]);

  if (!isOpen || !exchange) return null;

  const instructions = exchangeConnectionGuides[exchange.id];
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

      const response = await exchangeService.connectExchange(payload);

      if (response.success && response.connection) {
        onSuccess({
          ...response.connection,
          _id: response.connection._id ?? String(response.connection.id),
        });
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
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div role="dialog" aria-modal="true" aria-labelledby="exchange-connection-title" className="relative flex max-h-[calc(100dvh-2rem)] w-full max-w-5xl flex-col bg-surface-container rounded-2xl shadow-2xl overflow-hidden animate-in slide-in-from-bottom-4 duration-300">
        {/* Header */}
        <div className="flex shrink-0 items-center justify-between gap-3 p-4 sm:p-6 border-b border-outline/20 bg-surface-container-highest">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-secondary/20 rounded-lg flex items-center justify-center">
              <RiExchangeLine aria-hidden="true" className="text-2xl text-secondary" />
            </div>
            <div>
              <h2 id="exchange-connection-title" className="text-lg sm:text-xl font-bold font-headline">
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
            aria-label="Close exchange connection"
            className="p-2 hover:bg-surface-container-highest rounded-lg transition-colors"
          >
            <MdClose className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex min-h-0 flex-1 flex-col overflow-y-auto overscroll-contain md:flex-row md:overflow-hidden">
          {/* Step Toggle - Mobile */}
          <div className="md:hidden shrink-0 p-4 border-b border-outline/20">
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
            className={`min-w-0 shrink-0 p-4 sm:p-6 md:min-h-0 md:flex-1 md:overflow-y-auto md:overscroll-contain ${
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
                <label
                  htmlFor="exchange-api-secret"
                  className="block text-xs font-bold text-on-surface-variant uppercase tracking-widest mb-2"
                >
                  Secret Key
                </label>
                <div className="relative">
                  <input
                    id="exchange-api-secret"
                    type={showApiSecret ? "text" : "password"}
                    value={formData.apiSecret}
                    onChange={(e) =>
                      handleInputChange("apiSecret", e.target.value)
                    }
                    placeholder="••••••••••••••••••••"
                    className="w-full bg-surface-container-highest border-none rounded-md p-3 pr-12 text-on-surface focus:ring-2 focus:ring-secondary/40 transition-all font-body placeholder:text-outline/40"
                  />
                  <button
                    type="button"
                    onClick={() => setShowApiSecret((visible) => !visible)}
                    aria-label={`${showApiSecret ? "Hide" : "Show"} secret key`}
                    aria-pressed={showApiSecret}
                    title={`${showApiSecret ? "Hide" : "Show"} secret key`}
                    className="absolute right-3 top-1/2 -translate-y-1/2 rounded p-1 text-on-surface-variant hover:text-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/60 transition-colors"
                  >
                    {showApiSecret ? (
                      <RiEyeCloseLine className="text-lg" aria-hidden="true" />
                    ) : (
                      <RiEyeLine className="text-lg" aria-hidden="true" />
                    )}
                  </button>
                </div>
                {errors.find((e) => e.field === "apiSecret") && (
                  <p className="text-xs text-error mt-1">
                    {errors.find((e) => e.field === "apiSecret")?.message}
                  </p>
                )}
              </div>

              {/* Passphrase Field (conditional) */}
              {requiresPassphrase && (
                <div>
                  <label
                    htmlFor="exchange-passphrase"
                    className="block text-xs font-bold text-on-surface-variant uppercase tracking-widest mb-2"
                  >
                    Passphrase
                  </label>
                  <div className="relative">
                    <input
                      id="exchange-passphrase"
                      type={showPassphrase ? "text" : "password"}
                      value={formData.passphrase}
                      onChange={(e) =>
                        handleInputChange("passphrase", e.target.value)
                      }
                      placeholder="Enter your API passphrase"
                      className="w-full bg-surface-container-highest border-none rounded-md p-3 pr-12 text-on-surface focus:ring-2 focus:ring-secondary/40 transition-all font-body placeholder:text-outline/40"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassphrase((visible) => !visible)}
                      aria-label={`${showPassphrase ? "Hide" : "Show"} passphrase`}
                      aria-pressed={showPassphrase}
                      title={`${showPassphrase ? "Hide" : "Show"} passphrase`}
                      className="absolute right-3 top-1/2 -translate-y-1/2 rounded p-1 text-on-surface-variant hover:text-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/60 transition-colors"
                    >
                      {showPassphrase ? (
                        <RiEyeCloseLine className="text-lg" aria-hidden="true" />
                      ) : (
                        <RiEyeLine className="text-lg" aria-hidden="true" />
                      )}
                    </button>
                  </div>
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
                className="w-full mt-6 py-4 rounded-md font-bold text-sm bg-secondary text-on-secondary shadow-lg shadow-secondary/20 hover:shadow-secondary/40 active:scale-[0.98] transition-all uppercase tracking-widest disabled:opacity-50 disabled:cursor-not-allowed"
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
            className={`min-w-0 shrink-0 bg-surface-container-lowest p-4 sm:p-6 md:min-h-0 md:flex-1 md:overflow-y-auto md:overscroll-contain border-t md:border-t-0 md:border-l border-outline/20 ${
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
                          {step.startsWith("DO NOT") && <MdWarning aria-hidden="true" className="inline-block mr-1 text-error" />}
                          {step}
                        </span>
                      </li>
                    ))}
                  </ol>
                </div>

                <section>
                  <h4 className="mb-3 text-sm font-bold uppercase tracking-widest text-on-surface-variant">
                    Before you create the key
                  </h4>
                  <p className="mb-3 text-xs leading-relaxed text-on-surface-variant">
                    Match these settings on {exchange.name}&apos;s API creation screen.
                    Labels can vary by account or region; the official guide below shows the exchange&apos;s screenshots.
                  </p>
                  <dl className="divide-y divide-outline/20 rounded-lg border border-outline/20 px-3">
                    {instructions.fields.map((field) => (
                      <div key={field.label} className="py-3">
                        <dt className="text-xs font-bold text-on-surface-variant">{field.label}</dt>
                        <dd className="mt-1 text-sm font-semibold text-on-surface">{field.value}</dd>
                        {field.help && <dd className="mt-1 text-xs leading-relaxed text-on-surface-variant">{field.help}</dd>}
                      </div>
                    ))}
                  </dl>
                </section>

                <ServerIpWhitelist key={exchange.id} ipField={instructions.ipField} />

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
                    View official setup guide & screenshots
                    <FaArrowRight className="w-3 h-3" />
                  </a>
                </div>

                {/* Tip */}
                <div className="flex items-start gap-2 p-3 bg-info/10 rounded-lg">
                  <MdInfo className="w-4 h-4 text-info mt-0.5" />
                  <p className="text-xs text-on-surface-variant">
                    After creating your API keys, enter them in the API form
                    to connect your account. On mobile, select the API Form tab above.
                  </p>
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-on-surface-variant">
                  Instructions for {exchange.name} coming soon.
                </p>
                <p className="text-sm text-on-surface-variant mt-2">
                  Please refer to the exchange&apos;s API documentation.
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="flex shrink-0 items-center justify-between gap-3 border-t border-outline/20 bg-surface-container-highest p-4">
          <button type="button" onClick={onClose}
            className="rounded-lg px-4 py-2 text-sm font-medium text-on-surface-variant hover:bg-surface-container-high">
            Close
          </button>
          <button type="button" onClick={() => setCurrentStep(currentStep === "form" ? "instructions" : "form")}
            className="rounded-lg px-4 py-2 text-sm font-medium text-secondary hover:bg-secondary/10 md:hidden">
            {currentStep === "form" ? "View setup guide" : "Enter API credentials"}
          </button>
          <p className="hidden text-xs text-on-surface-variant md:block">Create your key using the guide, then connect with the API form.</p>
        </div>
      </div>
    </div>
  );
}
