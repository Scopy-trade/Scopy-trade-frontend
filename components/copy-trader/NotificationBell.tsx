"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { MdNotifications } from "react-icons/md";
import { traderFlow } from "@/lib/api/trader-flow";

export default function NotificationBell({ scope = "copy" }: { scope?: "copy" | "pro" }) {
  const [unread, setUnread] = useState(0);
  useEffect(() => {
    let active = true;
    async function refresh() {
      if (document.hidden) return;
      try { const result = await traderFlow.notifications(1, scope); if (active) setUnread(result.unread); }
      catch { /* Keep the last known count until the next poll. */ }
    }
    void refresh();
    const timer = window.setInterval(() => void refresh(), 60_000);
    window.addEventListener("notifications-updated", refresh);
    return () => { active = false; window.clearInterval(timer); window.removeEventListener("notifications-updated", refresh); };
  }, [scope]);
  return <Link href={`/dashboard/${scope}-trader/notifications`} aria-label={`Notifications, ${unread} unread`} className="relative rounded-lg border border-white/10 bg-surface-container p-2 text-slate-200">
    <MdNotifications size={22} />
    {unread > 0 && <span className="absolute -right-2 -top-2 rounded-full bg-amber-400 px-1.5 text-[10px] font-bold text-black">{unread > 99 ? "99+" : unread}</span>}
  </Link>;
}
