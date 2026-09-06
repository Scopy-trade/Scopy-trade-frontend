import type { Metadata } from "next";
import Link from "next/link";
import LegalPage, { type LegalSection } from "@/components/legal/LegalPage";

export const metadata: Metadata = {
  title: "Terms of Service | SCopyTrade",
  description:
    "Terms governing access to and use of the SCopyTrade copy-trading platform.",
};

const sections: LegalSection[] = [
  {
    id: "agreement",
    title: "Agreement to these terms",
    content: (
      <p>
        These Terms of Service form a binding agreement between you and
        SCopyTrade. They govern your access to our websites, dashboards, APIs,
        signals, exchange integrations, trade-execution tools, and related
        services. By creating an account or using the service, you confirm that
        you have read and accepted these terms, the{" "}
        <Link href="/risk-disclosure">Risk Disclosure</Link>, and the{" "}
        <Link href="/privacy-policy">Privacy Policy</Link>. If you do not agree,
        do not use the service.
      </p>
    ),
  },
  {
    id: "eligibility",
    title: "Eligibility and availability",
    content: (
      <ul>
        <li>You must be at least 18 and able to enter a binding contract.</li>
        <li>
          You may use SCopyTrade only where the service, connected exchange,
          assets, and trading activity are lawful for you.
        </li>
        <li>
          You must not be subject to sanctions or use the service for a person
          or location for which access is prohibited.
        </li>
        <li>
          We may limit features, exchanges, assets, or access by jurisdiction,
          account status, capacity, or legal requirements.
        </li>
      </ul>
    ),
  },
  {
    id: "service",
    title: "What SCopyTrade provides",
    content: (
      <>
        <p>
          SCopyTrade provides non-custodial software for discovering signals and
          transmitting selected or copied trading instructions to supported
          exchange accounts. Pro traders can publish signals and manage source
          trades; copy traders can select signals and configure orders. We may
          also provide monitoring, trade history, analytics, notifications,
          earnings, fee settlement, and withdrawal features.
        </p>
        <p>
          SCopyTrade does not hold your exchange trading balance and is not your
          exchange. We do not promise that any user, signal, strategy, statistic,
          ranking, or trade is accurate, suitable, profitable, or continuously
          available. Nothing on the service is personalised investment advice,
          a recommendation, or a guarantee of results.
        </p>
      </>
    ),
  },
  {
    id: "account",
    title: "Your account and security",
    content: (
      <>
        <p>
          Provide accurate, current information and keep it updated. You are
          responsible for your password, email account, devices, sessions, API
          credentials, and all activity under your account. Tell us immediately
          through the <Link href="/contact">contact page</Link> if you suspect
          unauthorised access.
        </p>
        <p>
          You may not share, sell, transfer, or allow another person to use your
          account. We may require email verification or other reasonable checks
          and may reject, waitlist, suspend, or close an account as allowed by
          these terms or applicable law.
        </p>
      </>
    ),
  },
  {
    id: "exchange",
    title: "Exchange connections and instructions",
    content: (
      <ul>
        <li>
          You authorise SCopyTrade to use the API credentials you provide to
          validate your connection and send, monitor, amend, cancel, or close
          orders you initiate or configure for copying.
        </li>
        <li>
          You authorise fee settlement and withdrawal instructions expressly
          described in the product and these terms where the relevant API
          permissions support them.
        </li>
        <li>
          You must comply with your exchange&apos;s terms and maintain an active,
          funded, correctly configured account with sufficient margin.
        </li>
        <li>
          An instruction is not complete merely because it appears in
          SCopyTrade. The exchange&apos;s record controls whether and how an order
          was accepted, filled, amended, cancelled, or closed.
        </li>
        <li>
          You must monitor positions at the exchange and act manually when
          necessary. Revoking or changing credentials does not close an existing
          position.
        </li>
      </ul>
    ),
  },
  {
    id: "pro-traders",
    title: "Pro traders and copied strategies",
    content: (
      <>
        <p>
          A pro trader is an independent platform user, not an employee, agent,
          fiduciary, or representative of SCopyTrade. Pro traders are responsible
          for the signals, notes, and trading decisions they publish and must not
          make false, misleading, manipulative, or guaranteed-return claims.
        </p>
        <p>
          Copy traders decide whether and how much to trade. You understand that
          a copied order can differ from the source trade and that a source
          change or closure may fail to synchronise. Review the{" "}
          <Link href="/risk-disclosure">Risk Disclosure</Link> before using copy
          trading.
        </p>
      </>
    ),
  },
  {
    id: "fees",
    title: "Fees, earnings, and taxes",
    content: (
      <>
        <p>
          Under the current fee model, SCopyTrade charges 20% of the realised
          profit on a profitable copied trade. Of that amount, 15% is the
          platform share and 5% is credited to the source pro trader. A copied
          trade classified as a loss or breakeven does not incur this performance
          fee. We may initiate settlement in USDT from the connected exchange
          account to the disclosed settlement wallet.
        </p>
        <p>
          Any fee shown at confirmation or otherwise clearly disclosed for a
          transaction forms part of these terms. We may change fees prospectively
          after providing reasonable notice. You are also responsible for
          exchange, funding, withdrawal, network, conversion, and other
          third-party charges, and for determining and paying your taxes.
        </p>
        <p>
          Pro-trader earnings shown in the dashboard are subject to validation,
          reconciliation, fraud review, minimums, network fees, and supported
          withdrawal methods. We may correct calculation or crediting errors.
        </p>
      </>
    ),
  },
  {
    id: "acceptable-use",
    title: "Acceptable use",
    content: (
      <p>You must not:</p>
    ),
  },
  {
    id: "acceptable-use-list",
    title: "Prohibited conduct",
    content: (
      <ul>
        <li>break any law, sanction, exchange rule, or third-party right;</li>
        <li>
          manipulate markets, wash trade, defraud users, misstate performance,
          or disguise the origin or ownership of funds;
        </li>
        <li>
          probe, disrupt, overload, reverse engineer, scrape, or bypass security,
          access controls, rate limits, or technical restrictions;
        </li>
        <li>
          introduce malware, use stolen credentials, impersonate another person,
          or access another account without authorisation; or
        </li>
        <li>
          use the service to provide unauthorised financial services or resell it
          without our written permission.
        </li>
      </ul>
    ),
  },
  {
    id: "ownership",
    title: "Content and intellectual property",
    content: (
      <>
        <p>
          SCopyTrade and its licensors retain all rights in the platform,
          software, interface, branding, documentation, and content we provide.
          We grant you a limited, revocable, non-exclusive, non-transferable
          right to use the service for its intended purpose while these terms
          remain in effect.
        </p>
        <p>
          You retain ownership of content you submit. You grant SCopyTrade a
          worldwide, non-exclusive licence to host, process, reproduce, display,
          and distribute that content as needed to operate and improve the
          service. You confirm that you have the rights needed to submit it.
        </p>
      </>
    ),
  },
  {
    id: "availability",
    title: "Third parties, changes, and availability",
    content: (
      <p>
        Exchanges and other integrations are independent third parties with
        their own terms, privacy practices, systems, and risks. We may add,
        modify, suspend, or discontinue any feature and may perform maintenance
        without guaranteeing uninterrupted availability. We are not responsible
        for a third party&apos;s acts, omissions, insolvency, data, prices, or service
        failure.
      </p>
    ),
  },
  {
    id: "disclaimers",
    title: "Disclaimers and limitation of liability",
    content: (
      <>
        <p>
          To the fullest extent permitted by law, SCopyTrade is provided “as is”
          and “as available”. We disclaim implied warranties of merchantability,
          fitness for a particular purpose, non-infringement, accuracy, and
          uninterrupted or error-free operation.
        </p>
        <p>
          To the fullest extent permitted by law, SCopyTrade and its team will
          not be liable for indirect, incidental, special, consequential,
          exemplary, or punitive damages; trading losses; loss of profit,
          opportunity, data, goodwill, or digital assets; liquidation; or losses
          caused by an exchange, API, network, market event, user, or
          unauthorised account access. Nothing in these terms excludes liability
          that cannot lawfully be excluded or limited.
        </p>
      </>
    ),
  },
  {
    id: "indemnity",
    title: "Indemnity",
    content: (
      <p>
        To the extent permitted by law, you will defend, indemnify, and hold
        harmless SCopyTrade and its team from third-party claims and reasonable
        costs arising from your unlawful use, your breach of these terms, your
        content, your trading activity, or your violation of another person&apos;s
        rights. This does not apply to the extent a claim was caused by our own
        unlawful conduct.
      </p>
    ),
  },
  {
    id: "termination",
    title: "Suspension and termination",
    content: (
      <>
        <p>
          You may stop using the service and request account closure. We may
          restrict, suspend, or terminate access to protect the platform or
          users, respond to legal requirements, investigate suspected misconduct,
          or address a material breach. Where practicable, we will provide notice.
        </p>
        <p>
          Closing your SCopyTrade account does not close positions at your
          exchange or remove obligations already incurred, including fees.
          Provisions that by their nature should survive termination will do so.
        </p>
      </>
    ),
  },
  {
    id: "law-changes",
    title: "Governing law and changes",
    content: (
      <>
        <p>
          These terms are governed by the laws of the Federal Republic of
          Nigeria, without regard to conflict-of-law principles, subject to any
          mandatory consumer rights that apply to you. Before filing a claim,
          you and SCopyTrade will first attempt in good faith to resolve it
          through written notice using our contact channel.
        </p>
        <p>
          We may update these terms to reflect service, legal, security, or
          operational changes. We will post the updated terms and revise the
          effective date. For material changes, we will provide additional
          notice where required. Continued use after the change takes effect
          constitutes acceptance where permitted by law.
        </p>
      </>
    ),
  },
  {
    id: "contact",
    title: "Contact",
    content: (
      <p>
        Questions or legal notices concerning these terms may be submitted{" "}
        through our <Link href="/contact">contact page</Link>.
      </p>
    ),
  },
];

export default function TermsOfServicePage() {
  return (
    <LegalPage
      eyebrow="Legal · Platform terms"
      title="Terms of Service"
      summary="These terms set the rules for using SCopyTrade, connecting an exchange, publishing or copying trades, and settling platform fees."
      lastUpdated="6 September 2026"
      sections={sections}
    />
  );
}
