interface LogoProps {
  size?: "sm" | "md" | "lg";
  variant?: "wordmark" | "lockup" | "mark";
  className?: string;
}

/**
 * Zelexto brand lockup.
 *
 *  • wordmark = "zelexto.studio" in Instrument Serif italic (.studio = violet gradient)
 *  • mark      = small cursive "z." inside a violet ring
 *  • lockup    = mark + wordmark
 */
export default function Logo({
  size = "md",
  variant = "wordmark",
  className = "",
}: LogoProps) {
  const sizeMap = {
    sm: { text: "text-base", mark: 28 },
    md: { text: "text-lg", mark: 36 },
    lg: { text: "text-2xl", mark: 44 },
  };
  const s = sizeMap[size];

  const Wordmark = (
    <span
      className={`font-display italic ${s.text} tracking-tight leading-none`}
      style={{ fontFamily: "var(--font-instrument-serif), Georgia, serif" }}
    >
      <span className="text-canvas">zelexto</span>
      <span
        style={{
          background:
            "linear-gradient(90deg, #6C5CE7 0%, #8B7BF0 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
        }}
      >
        .studio
      </span>
    </span>
  );

  const Mark = (
    <span
      className="relative inline-flex items-center justify-center rounded-full"
      style={{
        width: s.mark,
        height: s.mark,
        border: "1.5px solid rgba(108,92,231,0.85)",
      }}
    >
      <span
        className="italic leading-none text-canvas"
        style={{
          fontFamily: "var(--font-instrument-serif), Georgia, serif",
          fontSize: s.mark * 0.55,
          transform: "translateY(-1px)",
        }}
      >
        z.
      </span>
    </span>
  );

  if (variant === "mark") return <span className={className}>{Mark}</span>;
  if (variant === "wordmark")
    return <span className={className}>{Wordmark}</span>;

  return (
    <span className={`inline-flex items-center gap-3 ${className}`}>
      {Mark}
      {Wordmark}
    </span>
  );
}
