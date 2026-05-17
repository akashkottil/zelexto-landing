interface OrbitProps {
  className?: string;
  /** "down" curves toward bottom-right, "up" toward top-right */
  direction?: "down" | "up";
}

/**
 * Brand signature: a soft, continuous violet curve.
 * Lime dot marks the start, violet ring marks the end.
 * Pure SVG — no runtime cost.
 */
export default function Orbit({
  className = "",
  direction = "down",
}: OrbitProps) {
  const path =
    direction === "down"
      ? "M 20 80 Q 200 20, 380 120 T 760 60"
      : "M 20 120 Q 200 200, 380 80 T 760 160";

  return (
    <svg
      aria-hidden
      viewBox="0 0 780 200"
      className={`pointer-events-none ${className}`}
      preserveAspectRatio="none"
    >
      <path
        d={path}
        fill="none"
        stroke="rgba(108,92,231,0.55)"
        strokeWidth="2"
        strokeLinecap="round"
      />
      {/* Lime spark at start */}
      <circle cx="20" cy={direction === "down" ? 80 : 120} r="5" fill="#D4FF4F">
        <animate
          attributeName="opacity"
          values="1;0.4;1"
          dur="2.5s"
          repeatCount="indefinite"
        />
      </circle>
      {/* Violet ring at end */}
      <circle
        cx="760"
        cy={direction === "down" ? 60 : 160}
        r="6"
        fill="none"
        stroke="#6C5CE7"
        strokeWidth="2"
      />
    </svg>
  );
}
