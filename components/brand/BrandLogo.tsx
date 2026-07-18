import Image from "next/image";

interface BrandLogoProps {
  compact?: boolean;
  className?: string;
  priority?: boolean;
}

export default function BrandLogo({
  compact = false,
  className = "",
  priority = false,
}: BrandLogoProps) {
  if (compact) {
    return (
      <Image
        src="/scopy-icon.png"
        alt="SCopyTrade"
        width={283}
        height={279}
        priority={priority}
        className={`block object-cover ${className}`}
      />
    );
  }

  return (
    <span
      className={`relative block overflow-hidden ${className}`}
      role="img"
      aria-label="SCopyTrade"
    >
      <Image
        src="/scopy-logo.png"
        alt=""
        fill
        priority={priority}
        sizes="(max-width: 768px) 144px, 176px"
        className="object-cover object-center"
      />
    </span>
  );
}
