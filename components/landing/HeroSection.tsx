import Link from "next/link";
import Image from "next/image";
import { RiMoonLine } from "react-icons/ri";

const avatars = [
  {
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuCKSRye1Fsdw3KuT7mbrHAW1RpnKcJOKtSwUazF_BMHrQoF97sVTQOw96FLrFkU5YzFAZvxWku0SfYDGiSv4quhnHpTubc-bzXbGwQIyWBK-oF9KuShypRAzk0vlybGJ_rCAFDLxGVFj63rAGj5v4mOPvSLgYR9saxi_jmsZmZ0H3fEFrT2AdXMw8JP9YinusCDbNyjV2uRgv3WzoF8cz79TOTUJnGv_XQtiNyUb0ayPf5CZZX83Q9tkSKGv1PljfdYh7NREnFDvQ",
    alt: "Professional male trader avatar",
  },
  {
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuAV-RJ9qag3r4YOX6Se1bT3VszMhYfvs-s5IARR4b0ECFxI8WICgJfD2GRtPnvhiCv7BA_mfqqNx5ome9MoCuM9rBx_Bjqq8eJDp-dDYAP_wJFXmWAvHls1bub3RGqbP7C84hWqQlFTZNLhVYEKLp8zW-E8HxYjTCmxRqlmUJL1Rq9aHJjc5Sf7N2caFyNzlaF46TjBWzePHnddoLznH4ZU8RCNMkvrNacO7dSvSl5l9K7IGfiYn5UUeDQKIWmkvuUMOPNjGTXe1Q",
    alt: "Female financial analyst avatar",
  },
  {
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuBE5TmhrEZEwcVHsOvfBmAZXJWH6Nw5T12tKy9FMeees_oHzkrAb0ta5WuyJ-t0OdbvF-e5IgNXoVd5czJmiukJKC_R4ZowxiMxV4SzPgD-9RWKS-yIlduepUBbij0g3Kh9qnMfs9mwsrW64LU1sD4MMQtuQEGwFaPObqixJoCuu2lrF1ygeHhs0SrzPY_3Z1KQ4kw0KD2fItu63wXE6myLRC5--s7XiopqJTqYzcQCMlDp0bB593CtgDUHA6w1EHR7GFGjsQAWNQ",
    alt: "Young technology professional avatar",
  },
];

// Simulated chart bar heights as percentages
const chartBars = [20, 35, 30, 55, 45, 80, 70];

export default function HeroSection() {
  return (
    <section className="relative min-h-[921px] flex items-center justify-center overflow-hidden px-6 lg:px-24">
      {/* Ambient glow blobs */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-[var(--color-primary)]/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-[var(--color-secondary)]/10 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-6xl w-full grid lg:grid-cols-2 gap-16 items-center">
        {/* Left: copy */}
        <div className="space-y-8">
          {/* Live badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[var(--color-surface-container-highest)] rounded-full border border-[var(--color-outline-variant)]/20">
            <span className="w-2 h-2 bg-[var(--color-secondary)] rounded-full animate-pulse" />
            <span className="text-xs font-medium tracking-widest uppercase text-[var(--color-on-surface-variant)]">
              Live Trading Active
            </span>
          </div>

          <h1
            className="text-6xl md:text-7xl font-extrabold tracking-tighter leading-tight text-[var(--color-on-surface)]"
            style={{ fontFamily: "var(--font-headline)" }}
          >
            Sovereign <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-secondary)] to-[var(--color-primary)]">
              Copy Trading.
            </span>
          </h1>

          <p className="text-xl text-[var(--color-on-surface-variant)] max-w-xl leading-relaxed">
            Execute trades from top signals directly on your exchange without
            giving up control of your funds. The terminal for serious traders
            who value security.
          </p>

          <div className="flex flex-wrap gap-4 pt-4">
            <Link
              href="/register"
              className="px-8 py-4 bg-gradient-to-r from-[var(--color-secondary)] to-[var(--color-secondary-container)] text-[var(--color-on-secondary)] font-bold rounded-lg shadow-lg shadow-[var(--color-secondary)]/20 hover:opacity-90 transition-all active:scale-95"
            >
              Register
            </Link>
            <button className="px-8 py-4 bg-[var(--color-surface-container-highest)] text-[var(--color-on-surface)] font-semibold rounded-lg border border-[var(--color-outline-variant)]/20 hover:bg-[var(--color-surface-bright)] transition-all">
              Login
            </button>
          </div>

          {/* Avatar strip */}
          <div className="flex items-center gap-8 pt-8">
            <div className="flex -space-x-3">
              {avatars.map((a) => (
                <div
                  key={a.alt}
                  className="w-10 h-10 rounded-full border-2 border-[var(--color-background)] overflow-hidden"
                >
                  <Image
                    src={a.src}
                    alt={a.alt}
                    width={40}
                    height={40}
                    className="w-full h-full object-cover"
                    unoptimized
                  />
                </div>
              ))}
            </div>
            <p className="text-sm text-[var(--color-on-surface-variant)] font-medium">
              Trusted by 2,500+ active traders
            </p>
          </div>
        </div>

        {/* Right: strategy card */}
        <div className="relative group">
          {/* Glow ring */}
          <div className="absolute -inset-1 bg-gradient-to-r from-[var(--color-primary)]/20 to-[var(--color-secondary)]/20 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 pointer-events-none" />

          <div className="relative bg-[var(--color-surface-container-low)] rounded-2xl p-6 border border-[var(--color-outline-variant)]/10">
            {/* Card header */}
            <div className="flex justify-between items-center mb-8">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[var(--color-secondary)]/10 flex items-center justify-center">
                  <RiMoonLine className="text-[var(--color-secondary)] text-xl" />
                </div>
                <div>
                  <h3
                    className="font-bold text-[var(--color-on-surface)]"
                    style={{ fontFamily: "var(--font-headline)" }}
                  >
                    Alpha Whale Strategy
                  </h3>
                  <p className="text-xs text-[var(--color-on-surface-variant)]">
                    Active Trading Signal
                  </p>
                </div>
              </div>
              <span className="px-2 py-1 bg-[var(--color-secondary-container)]/20 text-[var(--color-secondary)] text-xs font-bold rounded">
                +12.4%
              </span>
            </div>

            {/* Mini chart */}
            <div className="h-48 w-full bg-[var(--color-surface-container-lowest)] rounded-lg mb-6 overflow-hidden flex items-end px-2 gap-1">
              {chartBars.map((h, i) => (
                <div
                  key={i}
                  className={`w-full rounded-t transition-all ${
                    i === chartBars.length - 1
                      ? "bg-[var(--color-secondary)] shadow-[0_-4px_10px_rgba(78,222,163,0.3)]"
                      : "bg-[var(--color-secondary)]/40"
                  }`}
                  style={{ height: `${h}%` }}
                />
              ))}
            </div>

            {/* Trade details */}
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-[var(--color-on-surface-variant)]">
                  Pair
                </span>
                <span className="text-[var(--color-on-surface)] font-mono">
                  BTC/USDT
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-[var(--color-on-surface-variant)]">
                  Entry
                </span>
                <span className="text-[var(--color-on-surface)] font-mono">
                  $64,231.00
                </span>
              </div>
              <button className="w-full py-3 bg-[var(--color-primary-container)] text-[var(--color-on-primary-container)] font-bold rounded-lg border border-[var(--color-primary)]/20 mt-4 active:scale-95 transition-all hover:opacity-90">
                Execute Trade
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
