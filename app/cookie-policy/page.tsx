import type { Metadata } from "next";
import Link from "next/link";
import LegalPage, { type LegalSection } from "@/components/legal/LegalPage";

export const metadata: Metadata = {
  title: "Cookie Policy | SCopyTrade",
  description:
    "Details about cookies and browser storage used by the SCopyTrade platform.",
};

const sections: LegalSection[] = [
  {
    id: "overview",
    title: "About cookies and browser storage",
    content: (
      <>
        <p>
          Cookies are small text files stored by your browser. SCopyTrade uses
          cookies to keep sessions secure, remember authentication, and protect
          requests from forgery. We also use local storage, a separate browser
          feature, to cache limited account details for the signed-in experience.
        </p>
        <p>
          This policy should be read with our{" "}
          <Link href="/privacy-policy">Privacy Policy</Link>, which explains how
          we handle personal information more broadly.
        </p>
      </>
    ),
  },
  {
    id: "cookies-used",
    title: "Cookies we use",
    content: (
      <div className="overflow-x-auto">
        <table className="w-full min-w-[620px] border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-white/10 text-zinc-200">
              <th className="px-3 py-3 font-semibold">Cookie</th>
              <th className="px-3 py-3 font-semibold">Purpose</th>
              <th className="px-3 py-3 font-semibold">Typical duration</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/[0.06]">
            <tr>
              <td className="px-3 py-4 font-mono text-xs text-emerald-400">user_token</td>
              <td className="px-3 py-4">Authenticates a user account and protects dashboard routes.</td>
              <td className="px-3 py-4">Up to 24 hours</td>
            </tr>
            <tr>
              <td className="px-3 py-4 font-mono text-xs text-emerald-400">refresh_token</td>
              <td className="px-3 py-4">Renews an eligible signed-in session when “remember me” is used.</td>
              <td className="px-3 py-4">Up to 7 days</td>
            </tr>
            <tr>
              <td className="px-3 py-4 font-mono text-xs text-emerald-400">csrf_token</td>
              <td className="px-3 py-4">Helps confirm that state-changing requests came from the SCopyTrade interface.</td>
              <td className="px-3 py-4">Up to 7 days</td>
            </tr>
          </tbody>
        </table>
        <p className="mt-4 text-xs text-zinc-600">
          Administrators use equivalent, separately scoped authentication cookies.
          A cookie may be deleted earlier when you sign out or the session is revoked.
        </p>
      </div>
    ),
  },
  {
    id: "categories",
    title: "Cookie categories",
    content: (
      <>
        <p>
          The cookies currently used by the customer-facing product are
          <strong>strictly necessary</strong>. They support authentication,
          account security, and core requests. SCopyTrade does not currently set
          advertising or behavioural-targeting cookies through the product.
        </p>
        <p>
          If we introduce optional analytics, personalisation, or advertising
          cookies, we will update this policy and request consent where required
          before placing them.
        </p>
      </>
    ),
  },
  {
    id: "local-storage",
    title: "Local storage",
    content: (
      <p>
        After registration or sign-in, the frontend may save a limited user or
        administrator profile and email address in local storage. This helps the
        interface maintain context; the protected server session remains the
        source of authentication. These values are removed during normal logout
        or after certain authentication failures, and can also be cleared using
        your browser controls.
      </p>
    ),
  },
  {
    id: "controls",
    title: "Your controls",
    content: (
      <>
        <p>
          Most browsers let you view, delete, or block cookies and site data.
          Blocking strictly necessary cookies will prevent login, session
          renewal, or other protected features from working. You can remove
          SCopyTrade site data through your browser settings and sign in again to
          create a new session.
        </p>
        <p>
          Browser settings vary by provider. Use the privacy or site-data section
          of your browser&apos;s settings for current instructions.
        </p>
      </>
    ),
  },
  {
    id: "changes-contact",
    title: "Changes and contact",
    content: (
      <p>
        We may update this policy when our storage technologies or legal
        obligations change. The updated date above identifies the latest version.
        For questions about cookies or site data, use our{" "}
        <Link href="/contact">contact page</Link>.
      </p>
    ),
  },
];

export default function CookiePolicyPage() {
  return (
    <LegalPage
      eyebrow="Legal · Browser data"
      title="Cookie Policy"
      summary="A clear record of the cookies and local browser storage SCopyTrade uses for authentication, security, and core platform functionality."
      lastUpdated="6 September 2026"
      sections={sections}
    />
  );
}
