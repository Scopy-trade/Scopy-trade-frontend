// components/dashboard/earnings/WithdrawalForm.tsx
"use client";

import { useState } from "react";
import { MdExpandMore } from "react-icons/md";

interface WithdrawalFormData {
  method: string;
  amount: number;
}

const payoutMethods = [
  { value: "usdc_eth", label: "USDC (Ethereum Mainnet)" },
  { value: "usdt_trc20", label: "USDT (TRC-20)" },
  { value: "bank_sepa", label: "Direct Bank Transfer (SEPA)" },
];

export default function WithdrawalForm() {
  const [formData, setFormData] = useState<WithdrawalFormData>({
    method: "usdc_eth",
    amount: 0,
  });

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
  };

  const youReceive = Math.max(0, formData.amount - networkFee);

  return (
    <div className="col-span-12 xl:col-span-4">
      <div className="bg-surface-container-low p-8 rounded-xl h-full border border-white/5">
        <h3 className="text-lg font-bold text-on-surface mb-6">
          Withdraw Funds
        </h3>
        <form onSubmit={handleSubmit} className="space-y-6">
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
              <span className="text-on-surface">${networkFee.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm font-bold">
              <span className="text-on-surface">You'll Receive</span>
              <span className="text-secondary">${youReceive.toFixed(2)}</span>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-4 rounded-lg bg-surface-bright text-on-surface font-extrabold uppercase tracking-widest text-xs hover:bg-on-background hover:text-surface transition-all duration-300"
          >
            Initialize Sovereign Payout
          </button>

          <p className="text-[10px] text-center text-on-surface-variant/60 leading-relaxed px-4">
            By proceeding, you acknowledge that blockchain transactions are
            irreversible. Ensure the destination wallet address is correct.
          </p>
        </form>
      </div>
    </div>
  );
}
