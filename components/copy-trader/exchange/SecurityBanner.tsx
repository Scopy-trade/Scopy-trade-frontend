export default function SecurityBanner() {
  return (
    <div
      className="rounded-xl p-8 flex gap-6 items-start"
      style={{ backgroundColor: "#1a2340" }}
    >
      <div
        className="p-3 rounded-lg flex-shrink-0"
        style={{ backgroundColor: "#002371", color: "#b6c4ff" }}
      >
        <span className="text-3xl">🛡</span>
      </div>
      <div>
        <h4
          className="font-bold mb-2"
          style={{ color: "#b6c4ff" }}
        >
          Security Standard
        </h4>
        <p
          className="text-sm leading-relaxed"
          style={{ color: "#c5c6ce" }}
        >
          Never share your API Secret. Always enable 2FA on your exchange
          account. Our system uses end-to-end hardware-level encryption (HSM)
          to secure your credentials.
        </p>
      </div>
    </div>
  );
}
