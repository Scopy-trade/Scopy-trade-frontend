interface SetupField {
  label: string;
  value: string;
  help?: string;
}

interface ExchangeConnectionGuide {
  title: string;
  steps: string[];
  fields: SetupField[];
  ipField: string;
  warnings: string[];
  docsUrl: string;
}

// Checked against the exchanges' official setup guides and illustrated creation forms.
// These are manual HMAC connections: no broker/app binding or RSA public key is used.
export const exchangeConnectionGuides: Record<string, ExchangeConnectionGuide> = {
  bybit: {
    title: "Create your Bybit API key",
    steps: [
      "On the Bybit website, open your profile menu and choose API. On API Management, select Create New Key.",
      "In Select Your API Key Type, choose System-generated API Keys. This gives you the key and secret that ScopyTrade needs.",
      "On Create New Key, use the settings below before selecting Submit.",
      "Complete the requested security verification. Copy the API Key and Secret Key into the ScopyTrade form before closing the result screen.",
    ],
    fields: [
      { label: "API Key Usage", value: "API Transaction", help: "Use this for the manual key-and-secret connection here. The Connect to Third-Party Applications option is for applications listed by Bybit." },
      { label: "Name for the API key", value: "ScopyTrade", help: "Any name you can recognize later is fine." },
      { label: "API Key Permissions", value: "Read-Write", help: "Read-Only cannot place or manage copied trades." },
      { label: "IP restriction", value: "Only IPs with permissions granted are allowed to access the OpenAPI", help: "Paste the ScopyTrade server IP addresses shown below into the IP address box." },
      { label: "Unified Trading > Contract", value: "Enable Orders and Positions", help: "These allow derivatives orders and position management. Leave unrelated product permissions off." },
      { label: "Assets / Wallet", value: "Leave Withdrawal and transfer permissions off", help: "ScopyTrade does not need permission to move funds." },
    ],
    ipField: "the IP address box under Only IPs with permissions granted are allowed to access the OpenAPI",
    warnings: ["Choose a system-generated key; self-generated RSA keys do not work with this form.", "Save your secret securely when it is displayed. Never enable Withdrawal."],
    docsUrl: "https://www.bybit.com/en/help-center/article/How-to-create-your-API-key",
  },
  okx: {
    title: "Create your OKX API key",
    steps: [
      "On the OKX website, open your profile menu, choose API and connections (or API), then Create API key.",
      "Fill in the creation form using the settings below. Choose the account you actually want ScopyTrade to trade on.",
      "Submit the form and complete the security verification requested by OKX.",
      "Copy the API key and Secret key into ScopyTrade, together with the Passphrase you created in the form.",
    ],
    fields: [
      { label: "API key name", value: "ScopyTrade" },
      { label: "Account", value: "Your intended trading account", help: "If Main account is preselected and locked, leave it as shown. Select a subaccount only if that is where you intend to trade." },
      { label: "Used for / Purpose", value: "API trading", help: "Use the manual API trading option. Binding third-party apps is for applications listed by OKX." },
      { label: "IP address allowlist", value: "Paste the ScopyTrade server IP addresses below" },
      { label: "Permissions", value: "Read and Trade", help: "Keep Withdraw off. Leave separate Transfer, Loan and Earn permissions off if they are offered." },
      { label: "Passphrase", value: "Create and save your own API passphrase", help: "Enter this same passphrase in ScopyTrade. It is separate from your OKX login password and cannot be recovered if lost." },
    ],
    ipField: "IP address allowlist on the Create API key form",
    warnings: ["Save the API key, secret and passphrase securely.", "Never enable Withdraw. A key for another account or trading environment will not connect correctly."],
    docsUrl: "https://www.okx.com/help/api-faq",
  },
  bitget: {
    title: "Create your Bitget API key",
    steps: [
      "On the Bitget website, open your profile menu and choose API keys (or API). Select Create API key.",
      "Choose System-generated API key. Fill in the key configuration using the settings below.",
      "Select Next and complete the security verification requested by Bitget.",
      "Copy the API key and Secret key into ScopyTrade, together with the API passphrase you created. Save the secret before leaving the result screen.",
    ],
    fields: [
      { label: "Note / API name", value: "ScopyTrade" },
      { label: "Passphrase / API passphrase", value: "Create and save your own API passphrase", help: "Use the same passphrase in ScopyTrade; this is not your Bitget login password." },
      { label: "Permissions", value: "Read-write", help: "Read-only cannot execute copied trades." },
      { label: "Futures", value: "Enable Futures Orders and Holdings", help: "Allow both order and position management. Leave Spot Trade and Margin Trade off for this futures connection." },
      { label: "IP address / Bind IP", value: "Paste the ScopyTrade server IP addresses below" },
      { label: "Withdrawal / Transfer", value: "Leave disabled" },
    ],
    ipField: "the IP address / Bind IP field in the key configuration form",
    warnings: ["Choose a system-generated key; user-generated RSA keys do not work with this form.", "Never enable withdrawal or transfer access. Keep the API key, secret and passphrase secure."],
    docsUrl: "https://www.bitget.com/academy/trade-crypto-on-bitget-using-twm-one",
  },
};
