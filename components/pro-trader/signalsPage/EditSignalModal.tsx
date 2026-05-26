"use client";

import { useState, useEffect } from "react";
import { MdClose } from "react-icons/md";
import { proTradersignalService } from "@/lib/api/pro-trader";
import { SignalInterface } from "@/lib";

interface EditSignalModalProps {
  isOpen: boolean;
  signal: SignalInterface | null;
  onClose: () => void;
  onSignalUpdated: () => void;
}

export default function EditSignalModal({
  isOpen,
  signal,
  onClose,
  onSignalUpdated,
}: EditSignalModalProps) {
  const [formData, setFormData] = useState({
    pair: "",
    entry: "",
    tp: "",
    sl: "",
    direction: "buy" as "buy" | "sell",
    notes: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (signal) {
      setFormData({
        pair: signal.pair,
        entry: signal.entry.toString(),
        tp: signal.tp.toString(),
        sl: signal.sl.toString(),
        direction: signal.direction,
        notes: signal.notes || "",
      });
    }
  }, [signal]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!signal) return;

    setLoading(true);
    setError(null);

    try {
      const response = await proTradersignalService.updateSignal(signal._id, {
        pair: formData.pair,
        entry: parseFloat(formData.entry),
        tp: parseFloat(formData.tp),
        sl: parseFloat(formData.sl),
        direction: formData.direction,
        notes: formData.notes,
      });

      if (response.success) {
        onSignalUpdated();
        onClose();
      } else {
        setError(response.message || "Failed to update signal");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update signal");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="bg-surface-container rounded-2xl w-full max-w-md border border-white/10 shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <h2 className="text-xl font-bold text-on-surface">Edit Signal</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-white/10 transition-colors"
          >
            <MdClose size={20} className="text-on-surface-variant" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {error && (
            <div className="p-3 rounded-lg bg-rose-500/10 border border-rose-500/20">
              <p className="text-rose-400 text-sm">{error}</p>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-on-surface-variant mb-2">
              Trading Pair
            </label>
            <input
              type="text"
              value={formData.pair}
              onChange={(e) =>
                setFormData({ ...formData, pair: e.target.value })
              }
              placeholder="e.g., BTC/USDT"
              required
              className="w-full px-4 py-2 rounded-lg bg-surface-container-highest border border-white/10 text-on-surface focus:outline-none focus:border-secondary transition-colors"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-on-surface-variant mb-2">
                Direction
              </label>
              <select
                value={formData.direction}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    direction: e.target.value as "buy" | "sell",
                  })
                }
                className="w-full px-4 py-2 rounded-lg bg-surface-container-highest border border-white/10 text-on-surface focus:outline-none focus:border-secondary transition-colors"
              >
                <option value="buy">BUY (Long)</option>
                <option value="sell">SELL (Short)</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-on-surface-variant mb-2">
                Entry Price
              </label>
              <input
                type="number"
                step="0.01"
                value={formData.entry}
                onChange={(e) =>
                  setFormData({ ...formData, entry: e.target.value })
                }
                placeholder="Entry price"
                required
                className="w-full px-4 py-2 rounded-lg bg-surface-container-highest border border-white/10 text-on-surface focus:outline-none focus:border-secondary transition-colors"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-on-surface-variant mb-2">
                Take Profit (TP)
              </label>
              <input
                type="number"
                step="0.01"
                value={formData.tp}
                onChange={(e) =>
                  setFormData({ ...formData, tp: e.target.value })
                }
                placeholder="TP price"
                required
                className="w-full px-4 py-2 rounded-lg bg-surface-container-highest border border-white/10 text-on-surface focus:outline-none focus:border-secondary transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-on-surface-variant mb-2">
                Stop Loss (SL)
              </label>
              <input
                type="number"
                step="0.01"
                value={formData.sl}
                onChange={(e) =>
                  setFormData({ ...formData, sl: e.target.value })
                }
                placeholder="SL price"
                required
                className="w-full px-4 py-2 rounded-lg bg-surface-container-highest border border-white/10 text-on-surface focus:outline-none focus:border-secondary transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-on-surface-variant mb-2">
              Notes (Optional)
            </label>
            <textarea
              value={formData.notes}
              onChange={(e) =>
                setFormData({ ...formData, notes: e.target.value })
              }
              placeholder="Additional notes or analysis..."
              rows={3}
              className="w-full px-4 py-2 rounded-lg bg-surface-container-highest border border-white/10 text-on-surface focus:outline-none focus:border-secondary transition-colors resize-none"
            />
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 rounded-lg border border-white/10 text-on-surface-variant hover:bg-white/5 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-4 py-2 rounded-lg bg-secondary text-on-secondary font-semibold hover:bg-secondary-container transition-colors disabled:opacity-50"
            >
              {loading ? "Updating..." : "Update Signal"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
