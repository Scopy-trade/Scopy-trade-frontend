import Image from "next/image";

export default function UpgradeCard() {
  return (
    <div
      className="rounded-xl p-6 relative overflow-hidden"
      style={{ backgroundColor: "#171f33", height: "200px" }}
    >
      <Image
        src="https://lh3.googleusercontent.com/aida-public/AB6AXuC1H0xIKUEKy3eFy8JJmpp95uE2cKkIvM_REP2tcqvf6UQHKzU7dsQKBrZ8IXLdXKVftNwa1lFU_yuXWNav1uXYVxULS62QUY1PL4vYxmvG0upIqoDMIT22nK_2JyLEx_a1WHqKRPmxAxr0RlvgvvoYT2EEh9TTdK7UzBn75RtEhvfKORB0e6WkL0Q_WXHZb0lacx2-naLGkEFs5AeSKW1Xa0B5O1pmyAGzPRnKqSBUquGT0w5TnWIUouFs4lJ253bs3lBuouY0xw"
        alt="Cyberpunk finance illustration"
        fill
        className="object-cover"
        style={{ opacity: 0.25, mixBlendMode: "overlay" }}
        unoptimized
      />
      <div
        className="relative z-10 flex flex-col justify-end h-full"
        style={{ height: "calc(200px - 3rem)" }}
      >
        <h4
          className="font-extrabold text-white"
          style={{ fontFamily: "var(--font-headline)" }}
        >
          Upgrade to Pro
        </h4>
        <p className="text-xs mt-1" style={{ color: "#8f9098" }}>
          Unlock advanced copy-trading and custom bot triggers.
        </p>
      </div>
    </div>
  );
}