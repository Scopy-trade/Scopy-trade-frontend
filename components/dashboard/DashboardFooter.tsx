"use client";

const footerLinks = [
  { label: "Risk Disclosure", href: "#" },
  { label: "Privacy Policy", href: "#" },
  { label: "Terms of Service", href: "#" },
  { label: "Twitter", href: "#" },
  { label: "Telegram", href: "#" },
  { label: "GitHub", href: "#" },
];

function FooterLink({ label, href }: { label: string; href: string }) {
  const handleMouseEnter = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.currentTarget.style.color = "#e2e8f0";
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.currentTarget.style.color = "#475569";
  };

  return (
    <a
      href={href}
      className="text-xs uppercase tracking-widest transition-colors"
      style={{ color: "#475569" }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {label}
    </a>
  );
}

export default function DashboardFooter() {
  return (
    <footer
      className="w-full border-t grid grid-cols-1 md:grid-cols-2 gap-8 items-center px-12 py-10"
      style={{
        backgroundColor: "#020817",
        borderColor: "rgba(30,41,59,0.4)",
      }}
    >
      <div>
        <span
          className="text-lg font-bold tracking-tighter"
          style={{ fontFamily: "var(--font-headline)", color: "#cbd5e1" }}
        >
          SCopyTrade Terminal
        </span>
        <p
          className="text-[10px] uppercase tracking-widest mt-2"
          style={{ color: "#475569" }}
        >
          © 2024 SCopyTrade Terminal. Engineered for sovereign finance.
        </p>
      </div>

      <div className="flex flex-wrap gap-x-8 gap-y-2 justify-start md:justify-end">
        {footerLinks.map((link) => (
          <FooterLink key={link.label} label={link.label} href={link.href} />
        ))}
      </div>
    </footer>
  );
}
