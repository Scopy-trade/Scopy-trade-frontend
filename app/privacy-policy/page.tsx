import type { Metadata } from "next";
import Link from "next/link";
import LegalPage, { type LegalSection } from "@/components/legal/LegalPage";

export const metadata: Metadata = {
  title: "Privacy Policy | SCopyTrade",
  description:
    "How SCopyTrade collects, uses, shares, secures, and retains personal information.",
};

const sections: LegalSection[] = [
  {
    id: "scope",
    title: "Who this policy applies to",
    content: (
      <p>
        This Privacy Policy applies when you visit SCopyTrade, create an
        account, join the waitlist, connect an exchange, use copy-trading or
        pro-trader features, contact us, or otherwise interact with our
        services. In this policy, “SCopyTrade”, “we”, “us”, and “our” refer to
        the operator of the SCopyTrade platform.
      </p>
    ),
  },
  {
    id: "information-collected",
    title: "Information we collect",
    content: (
      <ul>
        <li>
          <strong>Account and identity data:</strong> name, email address,
          password hash, phone number, trader ID, role, profile photo, address,
          gender, account status, sponsorship status, and email-verification
          records when provided or required.
        </li>
        <li>
          <strong>Exchange connection data:</strong> exchange name, account
          label, encrypted API key, encrypted API secret, encrypted passphrase
          where applicable, connection status, permission and account snapshots,
          and testing timestamps. Secret credentials are not returned to the
          frontend after storage.
        </li>
        <li>
          <strong>Trading and financial activity:</strong> signals, pairs,
          direction, quantities, entry and exit prices, take-profit and
          stop-loss values, order identifiers, exchange responses, trade status,
          realised profit or loss, fees, settlement transaction details, pro
          earnings balances, and withdrawal addresses and records.
        </li>
        <li>
          <strong>Communications:</strong> messages submitted through our
          contact channels and operational emails such as verification, trade,
          security, and withdrawal notices.
        </li>
        <li>
          <strong>Device and security data:</strong> IP address, user agent,
          cookie and session identifiers, request information, timestamps,
          error and monitoring records, and audit-log details.
        </li>
        <li>
          <strong>Browser storage:</strong> limited account details and email
          addresses may be cached in local storage to support the signed-in
          experience. See our <Link href="/cookie-policy">Cookie Policy</Link>.
        </li>
      </ul>
    ),
  },
  {
    id: "use",
    title: "How we use information",
    content: (
      <ul>
        <li>create, verify, authenticate, and administer accounts;</li>
        <li>
          validate exchange connections and transmit, monitor, synchronise, and
          record orders you request;
        </li>
        <li>
          calculate, collect, reconcile, and report platform fees and pro-trader
          earnings;
        </li>
        <li>
          send service, security, verification, trade, and withdrawal messages;
        </li>
        <li>
          prevent fraud and abuse, secure the platform, enforce our terms, and
          investigate incidents;
        </li>
        <li>
          maintain, troubleshoot, analyse, and improve performance and
          reliability; and
        </li>
        <li>comply with legal obligations and respond to lawful requests.</li>
      </ul>
    ),
  },
  {
    id: "legal-bases",
    title: "Legal bases",
    content: (
      <p>
        Where applicable law requires a legal basis, we process information as
        necessary to perform our contract with you, comply with law, pursue
        legitimate interests such as security and service improvement, protect
        vital interests, or with your consent. Where processing relies on
        consent, you may withdraw it at any time without affecting earlier
        lawful processing.
      </p>
    ),
  },
  {
    id: "sharing",
    title: "How information is shared",
    content: (
      <>
        <p>We may share information with:</p>
        <ul>
          <li>
            supported exchanges, including Binance, Bybit, OKX, and Bitget, when
            needed to validate a connection or carry out an instruction;
          </li>
          <li>
            hosting, database, security, analytics, email-delivery, and media
            storage providers that process data for us under appropriate terms;
          </li>
          <li>
            professional advisers, auditors, insurers, or prospective parties
            to a financing, merger, acquisition, or sale;
          </li>
          <li>
            regulators, courts, law enforcement, or other persons where required
            by law or necessary to protect rights and safety; and
          </li>
          <li>other parties at your direction or with your consent.</li>
        </ul>
        <p>
          We do not sell personal information in exchange for money. Public or
          shared pro-trader information may include trader identity, signals,
          notes, and performance statistics, but not secret exchange credentials.
        </p>
      </>
    ),
  },
  {
    id: "retention",
    title: "Retention and international transfers",
    content: (
      <>
        <p>
          We retain information for as long as necessary to provide the service,
          secure accounts, resolve disputes, maintain legitimate trading and
          audit records, enforce agreements, and meet legal, tax, accounting, or
          regulatory obligations. Retention periods vary by record type. We may
          retain de-identified or aggregated information where it can no longer
          reasonably identify you.
        </p>
        <p>
          SCopyTrade and its providers may process information in countries
          other than your own. Where required, we use lawful transfer mechanisms
          and safeguards appropriate to the information and destination.
        </p>
      </>
    ),
  },
  {
    id: "security",
    title: "Security",
    content: (
      <p>
        We use administrative, technical, and organisational safeguards designed
        to protect information. Exchange credentials are encrypted at rest using
        authenticated encryption, passwords are hashed, and authentication uses
        protected session cookies and request-forgery controls. No system is
        completely secure, so we cannot guarantee that information will never be
        lost, accessed, or disclosed improperly. Keep your password and exchange
        credentials confidential and notify us promptly of suspected compromise.
      </p>
    ),
  },
  {
    id: "rights",
    title: "Your privacy rights",
    content: (
      <>
        <p>
          Depending on where you live, you may have rights to request access,
          correction, deletion, restriction, objection, portability, information
          about processing, or withdrawal of consent, and to complain to a data
          protection authority. Nigerian users may also have rights under the
          Nigeria Data Protection Act 2023.
        </p>
        <p>
          We may need to verify your identity and may retain information where an
          exception or legal obligation applies. Submit a request through our{" "}
          <Link href="/contact">contact page</Link>. You may also update certain
          account details through the product where that feature is available.
        </p>
      </>
    ),
  },
  {
    id: "children-changes",
    title: "Children and policy changes",
    content: (
      <>
        <p>
          SCopyTrade is not directed to anyone under 18, and we do not knowingly
          collect personal information from children. Contact us if you believe a
          child has provided information to us.
        </p>
        <p>
          We may update this policy as the service or law changes. We will post
          the revised version here, change the “Last updated” date, and provide
          additional notice where required.
        </p>
      </>
    ),
  },
  {
    id: "contact",
    title: "Contact us",
    content: (
      <p>
        For privacy questions, complaints, or rights requests, use our{" "}
        <Link href="/contact">contact page</Link> and identify the request as
        “Privacy”. If you are not satisfied with our response, you may contact
        the data protection authority available in your jurisdiction.
      </p>
    ),
  },
];

export default function PrivacyPolicyPage() {
  return (
    <LegalPage
      eyebrow="Legal · Data protection"
      title="Privacy Policy"
      summary="This policy explains what information SCopyTrade handles, why we use it, when it is shared, and the choices available to you."
      lastUpdated="6 September 2026"
      sections={sections}
    />
  );
}
