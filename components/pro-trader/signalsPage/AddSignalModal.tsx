// components/pro-trader/AddSignalModal.tsx
"use client";

import { useState } from "react";
import { MdClose } from "react-icons/md";

interface AddSignalModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface FormData {
  pair: string;
  entry: string;
  tp: string;
  sl: string;
  leverage?: string;
  notes?: string;
}

export default function AddSignalModal({
  isOpen,
  onClose,
}: AddSignalModalProps) {
  const [formData, setFormData] = useState<FormData>({
    pair: "",
    entry: "",
    tp: "",
    sl: "",
    leverage: "",
    notes: "",
  });

  const [tradeType, setTradeType] = useState<"BUY" | "SELL">("BUY");

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Prepare data according to backend model
    const signalData = {
      pair: formData.pair,
      entry: formData.entry,
      tp: formData.tp,
      sl: formData.sl,
      tradeType: tradeType,
      leverage: formData.leverage,
      notes: formData.notes,
      // trader: will be added from authenticated user
      // signalResult: defaults to null
      // status: defaults to "active"
    };

    console.log("Signal data to be sent:", signalData);
    // TODO: Connect to backend API when ready

    // Reset form and close modal
    handleReset();
    onClose();
  };

  const handleReset = () => {
    setFormData({
      pair: "",
      entry: "",
      tp: "",
      sl: "",
      leverage: "",
      notes: "",
    });
    setTradeType("BUY");
  };

  if (!isOpen) return null;

  // Common trading pairs
  const tradingPairs = [
    "BTC/USDT",
    "ETH/USDT",
    "SOL/USDT",
    "BNB/USDT",
    "XRP/USDT",
    "ADA/USDT",
    "DOGE/USDT",
    "MATIC/USDT",
    "DOT/USDT",
    "AVAX/USDT",
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className="bg-gray-900 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-gray-900 border-b border-gray-800 px-6 py-4 flex justify-between items-center">
          <div>
            <h2 className="text-xl font-bold text-white">Create New Signal</h2>
            <p className="text-sm text-gray-400 mt-1">
              Publish a new trading signal for your followers
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <MdClose className="text-2xl" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Trading Pair */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Trading Pair <span className="text-red-500">*</span>
            </label>
            <select
              name="pair"
              value={formData.pair}
              onChange={handleInputChange}
              required
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2.5 text-white focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-colors outline-none"
            >
              <option value="">Select trading pair</option>
              {tradingPairs.map((pair) => (
                <option key={pair} value={pair}>
                  {pair}
                </option>
              ))}
            </select>
          </div>

          {/* Trade Type & Leverage Row */}
          <div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Direction <span className="text-red-500">*</span>
              </label>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setTradeType("BUY")}
                  className={`flex-1 px-4 py-2.5 rounded-lg font-semibold transition-all ${
                    tradeType === "BUY"
                      ? "bg-green-600 text-white shadow-lg shadow-green-600/20"
                      : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                  }`}
                >
                  BUY / Long
                </button>
                <button
                  type="button"
                  onClick={() => setTradeType("SELL")}
                  className={`flex-1 px-4 py-2.5 rounded-lg font-semibold transition-all ${
                    tradeType === "SELL"
                      ? "bg-red-600 text-white shadow-lg shadow-red-600/20"
                      : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                  }`}
                >
                  SELL / Short
                </button>
              </div>
            </div>
          </div>

          {/* Entry, TP, SL Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Entry Price <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                  $
                </span>
                <input
                  type="number"
                  name="entry"
                  value={formData.entry}
                  onChange={handleInputChange}
                  step="any"
                  required
                  placeholder="0.00"
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg pl-7 pr-4 py-2.5 text-white focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-colors outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Take Profit (TP) <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                  $
                </span>
                <input
                  type="number"
                  name="tp"
                  value={formData.tp}
                  onChange={handleInputChange}
                  step="any"
                  required
                  placeholder="0.00"
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg pl-7 pr-4 py-2.5 text-white focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-colors outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Stop Loss (SL) <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                  $
                </span>
                <input
                  type="number"
                  name="sl"
                  value={formData.sl}
                  onChange={handleInputChange}
                  step="any"
                  required
                  placeholder="0.00"
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg pl-7 pr-4 py-2.5 text-white focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-colors outline-none"
                />
              </div>
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Additional Notes (Optional)
            </label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleInputChange}
              rows={3}
              placeholder="Add any additional information about this signal..."
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2.5 text-white focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-colors outline-none resize-none"
            />
          </div>

          {/* Info Box */}
          <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
            <p className="text-xs text-blue-400">
              ⚡ Your signal will be automatically published with "active"
              status. You can track its performance in the dashboard after
              creation.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={handleReset}
              className="flex-1 px-4 py-2.5 rounded-lg border border-gray-700 text-gray-300 font-semibold hover:bg-gray-800 transition-colors"
            >
              Reset
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2.5 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/20"
            >
              Publish Signal
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
