// components/SignalDetailsModal.tsx
"use client";

import { MdClose } from "react-icons/md";

interface Signal {
  id: number;
  pair: string;
  direction: "buy" | "sell";
  logo: string;
  logoBg: string;
  date: string;
  time: string;
  entryPrice: number;
  tp: number;
  sl: number;
  result: "profit" | "loss" | "breakeven";
  status: "active" | "expired";
  followers: number;
  volume: string;
  leverage?: string;
}

interface SignalDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  signal: Signal | null;
}

export default function SignalDetailsModal({
  isOpen,
  onClose,
  signal,
}: SignalDetailsModalProps) {
  if (!isOpen || !signal) return null;

  const getResultColor = (result: string) => {
    switch (result) {
      case "profit":
        return "text-green-500";
      case "loss":
        return "text-red-500";
      default:
        return "text-gray-400";
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className="bg-gray-900 rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-gray-900 border-b border-gray-800 px-6 py-4 flex justify-between items-center">
          <h2 className="text-xl font-bold text-white">Signal Details</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <MdClose className="text-2xl" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Header */}
          <div className="flex items-center gap-4">
            <div
              className={`w-14 h-14 rounded-full ${signal.logoBg} flex items-center justify-center`}
            >
              <img
                alt={signal.pair.split("/")[0]}
                className="w-8 h-8"
                src={signal.logo}
              />
            </div>
            <div>
              <div className="text-2xl font-bold text-white">{signal.pair}</div>
              <div className="flex gap-2 mt-1">
                <span
                  className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                    signal.direction === "buy"
                      ? "bg-green-500/10 text-green-500"
                      : "bg-red-500/10 text-red-500"
                  }`}
                >
                  {signal.direction}
                </span>
                {signal.leverage && (
                  <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-gray-800 text-gray-300">
                    {signal.leverage}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Key Stats */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-800/50 rounded-xl p-3">
              <div className="text-xs text-gray-400 mb-1">Entry Price</div>
              <div className="text-lg font-bold text-white">
                $
                {signal.entryPrice.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </div>
            </div>
            <div className="bg-gray-800/50 rounded-xl p-3">
              <div className="text-xs text-gray-400 mb-1">Take Profit (TP)</div>
              <div className="text-lg font-bold text-green-500">
                $
                {signal.tp.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </div>
            </div>
            <div className="bg-gray-800/50 rounded-xl p-3">
              <div className="text-xs text-gray-400 mb-1">Stop Loss (SL)</div>
              <div className="text-lg font-bold text-red-500">
                $
                {signal.sl.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </div>
            </div>
            <div className="bg-gray-800/50 rounded-xl p-3">
              <div className="text-xs text-gray-400 mb-1">Result</div>
              <div
                className={`text-lg font-bold ${getResultColor(signal.result)}`}
              >
                {signal.result}
              </div>
            </div>
          </div>

          {/* Additional Info */}
          <div className="space-y-3">
            <div className="flex justify-between items-center py-2 border-b border-gray-800">
              <span className="text-gray-400 text-sm">Status</span>
              <span
                className={`text-sm font-semibold ${
                  signal.status === "active" ? "text-blue-500" : "text-gray-400"
                }`}
              >
                {signal.status}
              </span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-800">
              <span className="text-gray-400 text-sm">Date Created</span>
              <span className="text-white text-sm">{signal.date}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-800">
              <span className="text-gray-400 text-sm">Time</span>
              <span className="text-white text-sm">{signal.time}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-800">
              <span className="text-gray-400 text-sm">Copy Volume</span>
              <span className="text-white text-sm font-semibold">
                {signal.followers.toLocaleString()} Traders
              </span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-gray-400 text-sm">Total Volume</span>
              <span className="text-white text-sm">{signal.volume}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
