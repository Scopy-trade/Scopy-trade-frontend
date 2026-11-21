"use client";

import { useEffect, useState } from "react";
import { exchangeService } from "@/lib/api/exchanges";

export function ServerIpWhitelist({ ipField }: { ipField: string }) {
  const [ips, setIps] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [copyStatus, setCopyStatus] = useState("");
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    exchangeService.getServerIps(controller.signal).then((addresses) => {
      if (!controller.signal.aborted) setIps(addresses);
    }).catch(() => {
      if (!controller.signal.aborted) setError(true);
    }).finally(() => {
      if (!controller.signal.aborted) setLoading(false);
    });
    return () => controller.abort();
  }, [attempt]);

  const copy = async (value: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopyStatus("Copied to clipboard.");
    } catch {
      setCopyStatus("Copy unavailable. Select the address above and copy it manually.");
    }
  };

  return (
    <section aria-labelledby="server-ip-title" className="space-y-3 rounded-lg border border-secondary/30 bg-secondary/5 p-4">
      <h4 id="server-ip-title" className="text-sm font-bold">ScopyTrade server IP allowlist</h4>
      <p className="text-xs leading-relaxed text-on-surface-variant">
        Add every address below to {ipField}. These are the servers that connect
        to your exchange. Use these addresses rather than your device IP or the website URL.
      </p>
      {loading ? (
        <p role="status" className="text-sm text-on-surface-variant">Loading server IP addresses...</p>
      ) : error ? (
        <div className="space-y-2">
          <p role="alert" className="text-sm text-error">Could not load the server IP addresses. Retry before setting the IP restriction.</p>
          <button type="button" onClick={() => {
            setLoading(true);
            setError(false);
            setIps([]);
            setCopyStatus("");
            setAttempt((value) => value + 1);
          }} className="rounded px-3 py-2 text-sm font-medium text-secondary hover:bg-secondary/10">Retry</button>
        </div>
      ) : (
        <div className="space-y-2">
          {ips.map((ip) => (
            <div key={ip} className="flex items-center gap-2">
              <input readOnly value={ip} aria-label={`Server IP address ${ip}`}
                onFocus={(event) => event.currentTarget.select()}
                className="min-w-0 flex-1 rounded bg-surface-container-highest px-3 py-2 font-mono text-sm" />
              <button type="button" onClick={() => copy(ip)} aria-label={`Copy IP address ${ip}`}
                className="shrink-0 rounded px-3 py-2 text-sm font-medium text-secondary hover:bg-secondary/10">Copy</button>
            </div>
          ))}
          {ips.length > 1 && (
            <button type="button" onClick={() => copy(ips.join(","))}
              className="rounded px-3 py-2 text-sm font-medium text-secondary hover:bg-secondary/10">Copy all addresses</button>
          )}
          <p className="text-xs text-on-surface-variant">If the exchange has separate IP entries, add each address individually.</p>
        </div>
      )}
      <p role="status" className="text-xs text-on-surface-variant">{copyStatus}</p>
    </section>
  );
}
