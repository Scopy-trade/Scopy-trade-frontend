// components/dashboard/earnings/WithdrawalModal.tsx
"use client";

import { useState, useEffect } from "react";
import { MdClose, MdExpandMore } from "react-icons/md";

interface WithdrawalModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface WithdrawalFormData {
  method: string;
  amount: number;
}

const payoutMethods = [
  { value: "usdc_eth", label: "USDC (Ethereum Mainnet)" },
  { value: "usdt_trc20", label: "USDT (TRC-20)" },
  { value: "bank_sepa", label: "Direct Bank Transfer (SEPA)" },
];

export default function WithdrawalModal({
  isOpen,
  onClose,
}: WithdrawalModalProps) {
  const [formData, setFormData] = useState<WithdrawalFormData>({
    method: "usdc_eth",
    amount: 0,
  });

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const networkFee = 12.5;
  const maxAmount = 42890.4;
  const minAmount = 100;

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value) || 0;
    setFormData({ ...formData, amount: value });
  };

  const handleMaxClick = () => {
    setFormData({ ...formData, amount: maxAmount });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Withdrawal request:", formData);
    // Handle withdrawal logic here
    onClose();
  };

  const youReceive = Math.max(0, formData.amount - networkFee);

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 transition-opacity"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <div
            className="relative bg-surface-container-low rounded-xl w-full max-w-md border border-white/5 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-white/5">
              <h3 className="text-xl font-bold text-on-surface">
                Withdraw Funds
              </h3>
              <button
                onClick={onClose}
                className="text-on-surface-variant hover:text-on-surface transition-colors"
              >
                <MdClose className="text-2xl" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-on-surface-variant mb-2">
                  Payout Method
                </label>
                <div className="relative">
                  <select
                    value={formData.method}
                    onChange={(e) =>
                      setFormData({ ...formData, method: e.target.value })
                    }
                    className="w-full bg-surface-container-highest border-none rounded-lg text-on-surface py-3 px-4 appearance-none focus:ring-1 focus:ring-primary/20"
                  >
                    {payoutMethods.map((method) => (
                      <option key={method.value} value={method.value}>
                        {method.label}
                      </option>
                    ))}
                  </select>
                  <MdExpandMore className="absolute right-3 top-3 text-on-surface-variant pointer-events-none text-xl" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-on-surface-variant mb-2">
                  Withdrawal Amount
                </label>
                <div className="relative group">
                  <input
                    type="number"
                    value={formData.amount || ""}
                    onChange={handleAmountChange}
                    placeholder="0.00"
                    className="w-full bg-surface-container-highest border-none rounded-lg text-2xl font-bold text-on-surface py-4 px-4 focus:ring-1 focus:ring-primary/20 placeholder:text-on-surface-variant/20"
                    step="0.01"
                    min={minAmount}
                    max={maxAmount}
                  />
                  <span className="absolute right-4 top-5 font-bold text-on-surface-variant">
                    USD
                  </span>
                </div>
                <div className="mt-2 flex justify-between text-[10px] font-bold uppercase tracking-tighter">
                  <span className="text-on-surface-variant">
                    Min: ${minAmount.toFixed(2)}
                  </span>
                  <span
                    onClick={handleMaxClick}
                    className="text-secondary cursor-pointer hover:underline"
                  >
                    Max: ${maxAmount.toFixed(2)}
                  </span>
                </div>
              </div>

              <div className="p-4 bg-surface-container rounded-lg border border-outline-variant/10">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-on-surface-variant">Network Fee</span>
                  <span className="text-on-surface">
                    ${networkFee.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-bold">
                  <span className="text-on-surface">You'll Receive</span>
                  <span className="text-secondary">
                    ${youReceive.toFixed(2)}
                  </span>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-4 rounded-lg bg-gradient-to-r from-secondary to-secondary-container text-on-secondary font-extrabold uppercase tracking-widest text-xs hover:opacity-90 transition-all duration-300"
              >
                Initialize Sovereign Payout
              </button>

              <p className="text-[10px] text-center text-on-surface-variant/60 leading-relaxed">
                By proceeding, you acknowledge that blockchain transactions are
                irreversible. Ensure the destination wallet address is correct.
              </p>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
