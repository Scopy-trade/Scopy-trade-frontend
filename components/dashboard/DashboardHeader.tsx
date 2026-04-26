"use client";

export default function DashboardHeader() {
  return (
    <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
      <div>
        <h1
          className="text-3xl font-black tracking-tighter"
          style={{ fontFamily: "var(--font-headline)", color: "#dae2fd" }}
        >
          Terminal Overview
        </h1>
        <p className="text-sm mt-1" style={{ color: "#c5c6ce" }}>
          Status:{" "}
          <span className="font-bold" style={{ color: "#4edea3" }}>
            Trading Active
          </span>{" "}
          • Last sync 12s ago
        </p>
      </div>

      {/* System Load Badge */}
      <div
        className="flex items-center gap-3 px-4 py-2"
        style={{
          backgroundColor: "#131b2e",
          borderRadius: "0.75rem",
        }}
      >
        <span
          className="text-xs uppercase tracking-widest"
          style={{ color: "#c5c6ce" }}
        >
          System Load
        </span>
        <div
          className="h-1 w-24 rounded-full overflow-hidden"
          style={{ backgroundColor: "#060e20" }}
        >
          <div
            className="h-full rounded-full"
            style={{ width: "14%", backgroundColor: "#4edea3" }}
          />
        </div>
        <span
          className="text-xs font-bold"
          style={{ fontFamily: "var(--font-headline)", color: "#4edea3" }}
        >
          Low
        </span>
      </div>
    </header>
  );
}
