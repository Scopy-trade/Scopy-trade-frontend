"use client";

import { useState } from "react";
import { MdAdd, MdSettings } from "react-icons/md";
import TradeListScreen from "@/components/trades/TradeListScreen";
import OpenTradeModal from "@/components/pro-trader/signalsPage/OpenTradeModal";
import ExchangeSettingsModal from "@/components/copy-trader/exchange/ExchangeSettingsModal";

export default function ActiveTradesPage() {
  const [openTrade, setOpenTrade] = useState(false);
  const [exchangeSettings, setExchangeSettings] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  return (
    <>
      <TradeListScreen
        scope="pro"
        mode="active"
        refreshKey={refreshKey}
        headerActions={(
          <div className="flex gap-3">
            <button type="button" onClick={() => setExchangeSettings(true)} className="flex items-center gap-2 rounded-lg border border-white/10 px-4 py-2.5 text-slate-300">
              <MdSettings /> Exchanges
            </button>
            <button type="button" onClick={() => setOpenTrade(true)} className="flex items-center gap-2 rounded-lg bg-secondary px-5 py-2.5 font-semibold text-on-secondary">
              <MdAdd size={20} /> Open trade
            </button>
          </div>
        )}
      />
      <OpenTradeModal
        isOpen={openTrade}
        onClose={() => setOpenTrade(false)}
        onTradeOpened={() => setRefreshKey((value) => value + 1)}
      />
      <ExchangeSettingsModal
        isOpen={exchangeSettings}
        onClose={() => setExchangeSettings(false)}
      />
    </>
  );
}
