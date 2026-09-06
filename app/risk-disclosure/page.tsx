import type { Metadata } from "next";
import Link from "next/link";
import LegalPage, { type LegalSection } from "@/components/legal/LegalPage";

export const metadata: Metadata = {
  title: "Risk Disclosure | SCopyTrade",
  description:
    "Important risks associated with crypto assets, leveraged trading, copy trading, exchanges, and automated order execution on SCopyTrade.",
};

const sections: LegalSection[] = [
  {
    id: "purpose",
    title: "Purpose and scope",
    content: (
      <>
        <p>
          This disclosure explains material risks associated with using
          SCopyTrade. SCopyTrade provides technology that lets users view trade
          signals and, when they choose, transmit or copy orders to a supported
          third-party exchange account connected through API credentials.
        </p>
        <p>
          SCopyTrade is not a bank, exchange, custodian, broker, portfolio
          manager, or financial adviser. Signals, trader statistics, notes, and
          other platform content are informational and do not constitute
          personalised investment, legal, tax, or financial advice.
        </p>
      </>
    ),
  },
  {
    id: "market-risk",
    title: "Crypto-asset and market risk",
    content: (
      <ul>
        <li>
          Crypto assets are highly volatile. Prices can move suddenly and may
          be affected by liquidity, market sentiment, regulation, protocol
          failures, cyber incidents, and events outside anyone&apos;s control.
        </li>
        <li>
          You may lose some or all of the capital committed to a trade. Only
          trade with funds you can afford to lose.
        </li>
        <li>
          Leverage and derivatives magnify both gains and losses. A relatively
          small price movement can cause liquidation, additional fees, or a
          loss greater than the amount allocated to a position where the
          exchange&apos;s product rules allow it.
        </li>
        <li>
          Crypto assets may have limited liquidity. An order may fill in part,
          at a different price, or not at all.
        </li>
      </ul>
    ),
  },
  {
    id: "copy-risk",
    title: "Copy trading and signal risk",
    content: (
      <>
        <p>
          Following a pro trader does not ensure that your account will achieve
          the same result. Past performance, win rates, profit figures, and
          rankings are not reliable indicators of future performance. A pro
          trader may make errors, change strategy, take excessive risk, or
          experience losses.
        </p>
        <p>
          Results can differ because of account balance, selected quantity,
          leverage, exchange, contract specifications, fees, funding rates,
          latency, price movement, minimum order sizes, existing positions, and
          API or exchange restrictions. You remain responsible for every trade
          placed in your account, including a copied trade.
        </p>
      </>
    ),
  },
  {
    id: "execution-risk",
    title: "Execution, automation, and stop-order risk",
    content: (
      <>
        <p>
          Order transmission, position monitoring, take-profit and stop-loss
          updates, and copied-trade synchronisation rely on software, internet
          connections, exchange APIs, and exchange systems. Delays, outages,
          rate limits, incompatible order rules, stale prices, rejected orders,
          duplicate messages, or other technical failures can cause an order
          to execute late, at an unexpected price, or not at all.
        </p>
        <p>
          A stop-loss is an instruction, not a guarantee of a maximum loss.
          During gaps, fast markets, low liquidity, or exchange disruption, it
          can fill materially away from its trigger price. If a source trade
          closes, a copied position may remain open if automated closure fails;
          you must monitor your exchange account independently.
        </p>
      </>
    ),
  },
  {
    id: "exchange-risk",
    title: "Third-party exchange and API risk",
    content: (
      <>
        <p>
          Your assets remain with the exchange you select, not with SCopyTrade.
          This non-custodial structure does not remove exchange risk. An
          exchange may be hacked, become insolvent, freeze an account, change
          its rules, suspend a market, restrict withdrawals, or experience an
          outage. SCopyTrade does not control or guarantee an exchange.
        </p>
        <p>
          API credentials grant permissions within your exchange account. Use
          the narrowest permissions that support the features you select,
          follow the setup instructions, use IP restrictions where available,
          and never reuse or publicly disclose credentials. Revoking a key may
          interrupt monitoring or prevent an open position from being updated.
        </p>
      </>
    ),
  },
  {
    id: "fees",
    title: "Fees and settlement risk",
    content: (
      <>
        <p>
          Under the current product model, a profitable copied trade is charged
          a performance fee equal to 20% of its realised profit: 15% is retained
          by SCopyTrade and 5% is credited to the source pro trader. No
          performance fee is charged by SCopyTrade on a losing or breakeven
          copied trade. The platform may use the connected exchange API to
          settle an applicable fee in USDT to the configured settlement wallet.
        </p>
        <p>
          Exchange trading fees, funding payments, withdrawal fees, network
          fees, taxes, and currency conversion can reduce returns and may not be
          included in a displayed performance figure. Review the fee shown in
          the product and the exchange&apos;s own fee schedule before trading.
        </p>
      </>
    ),
  },
  {
    id: "security-regulatory",
    title: "Security, regulatory, and tax risk",
    content: (
      <>
        <p>
          Encryption and other safeguards reduce risk but cannot eliminate it.
          Account takeover, phishing, malware, credential compromise, software
          defects, and unauthorised access may result in losses.
        </p>
        <p>
          Laws governing crypto assets and automated trading vary by location
          and can change rapidly. A service, exchange, asset, or derivative may
          be restricted or unavailable in your jurisdiction. You are
          responsible for determining whether your activity is lawful and for
          reporting and paying all applicable taxes.
        </p>
      </>
    ),
  },
  {
    id: "your-responsibility",
    title: "Your responsibility",
    content: (
      <>
        <p>
          Before using SCopyTrade, assess your objectives, experience,
          financial circumstances, and tolerance for loss. Consider obtaining
          advice from an independent, appropriately authorised professional.
          Keep sufficient margin, verify orders directly at your exchange, and
          be prepared to manage or close positions manually.
        </p>
        <p>
          By using the service, you acknowledge these risks and the additional
          provisions in our <Link href="/terms-of-service">Terms of Service</Link>.
          If you do not understand or cannot accept the risks, do not trade
          through SCopyTrade.
        </p>
      </>
    ),
  },
];

export default function RiskDisclosurePage() {
  return (
    <LegalPage
      eyebrow="Legal · Trading risk"
      title="Risk Disclosure"
      summary="Crypto and leveraged copy trading involve substantial risk. This disclosure explains where losses and execution failures can arise when using SCopyTrade."
      lastUpdated="6 September 2026"
      notice={
        <p>
          <strong className="text-amber-200">You can lose all funds committed to trading.</strong>{" "}
          SCopyTrade does not guarantee profit, performance, liquidity, order execution, or loss prevention.
        </p>
      }
      sections={sections}
    />
  );
}
