// components/ApiForm.tsx
"use client";

import { useState } from "react";
import { MdCheck, MdClose } from "react-icons/md";

const exchanges = ["Binance Global", "OKX", "Coinbase", "Bybit"];

const permissions = [
  { label: "Enable Spot Trading", defaultChecked: true, mandatory: false },
  { label: "Read-Only Balance access", defaultChecked: true, mandatory: false },
  {
    label: "Disable Withdrawals",
    defaultChecked: false,
    mandatory: true,
    disabled: true,
  },
];

export function ApiForm() {
  const [selectedExchange, setSelectedExchange] = useState("Binance Global");
  const [apiKey, setApiKey] = useState("");
  const [secretKey, setSecretKey] = useState("");
  const [permissionState, setPermissionState] = useState(
    permissions.map((p) => p.defaultChecked),
  );

  const handlePermissionChange = (index: number) => {
    if (permissions[index].disabled) return;
    const newState = [...permissionState];
    newState[index] = !newState[index];
    setPermissionState(newState);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle API connection logic here
    console.log({ selectedExchange, apiKey, secretKey, permissionState });
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      {/* Exchange Selector */}
      <div>
        <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-widest mb-2">
          Select Exchange
        </label>
        <select
          value={selectedExchange}
          onChange={(e) => setSelectedExchange(e.target.value)}
          className="w-full bg-surface-container-highest border-none rounded-md p-3 text-on-surface focus:ring-2 focus:ring-primary/40 transition-all font-body"
        >
          {exchanges.map((exchange) => (
            <option key={exchange}>{exchange}</option>
          ))}
        </select>
      </div>

      {/* API Key */}
      <div>
        <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-widest mb-2">
          API Key
        </label>
        <input
          type="text"
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
          placeholder="Paste your API key here"
          className="w-full bg-surface-container-highest border-none rounded-md p-3 text-on-surface focus:ring-2 focus:ring-primary/40 transition-all font-body placeholder:text-outline/40"
        />
      </div>

      {/* Secret Key */}
      <div>
        <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-widest mb-2">
          Secret Key
        </label>
        <input
          type="password"
          value={secretKey}
          onChange={(e) => setSecretKey(e.target.value)}
          placeholder="••••••••••••••••••••"
          className="w-full bg-surface-container-highest border-none rounded-md p-3 text-on-surface focus:ring-2 focus:ring-primary/40 transition-all font-body placeholder:text-outline/40"
        />
      </div>

      {/* Permissions Checklist */}
      <div className="pt-4 space-y-4">
        <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-widest mb-2">
          Required Permissions
        </label>
        <div className="space-y-3">
          {permissions.map((permission, index) => (
            <label
              key={permission.label}
              className="flex items-center gap-3 cursor-pointer group"
            >
              <div className="relative w-5 h-5 flex items-center justify-center">
                <input
                  type="checkbox"
                  checked={permissionState[index]}
                  onChange={() => handlePermissionChange(index)}
                  disabled={permission.disabled}
                  className="peer sr-only"
                />
                <div
                  className={`w-5 h-5 rounded border transition-all ${
                    permissionState[index] && !permission.disabled
                      ? "bg-secondary border-secondary"
                      : permission.disabled
                        ? "bg-tertiary/20 border-tertiary/40"
                        : "bg-surface-container-highest border-outline/20"
                  }`}
                />
                {permissionState[index] && !permission.disabled && (
                  <MdCheck className="text-on-secondary text-xs absolute" />
                )}
                {permission.disabled && !permissionState[index] && (
                  <MdClose className="text-tertiary text-xs absolute" />
                )}
              </div>
              <span
                className={`text-sm font-medium ${
                  permission.disabled ? "text-tertiary" : ""
                }`}
              >
                {permission.label}
                {permission.mandatory && " (MANDATORY)"}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Action Button */}
      <button
        type="submit"
        className="w-full mt-6 py-4 rounded-md font-bold text-sm bg-linear-to-r from-secondary to-secondary-container text-on-secondary shadow-lg shadow-secondary/20 hover:shadow-secondary/40 active:scale-[0.98] transition-all uppercase tracking-widest"
      >
        Securely Authorize Connection
      </button>
    </form>
  );
}
