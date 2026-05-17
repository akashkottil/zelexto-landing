"use client";

const words = [
  "Web Experiences",
  "Mobile Apps",
  "Brand Systems",
  "AI Integration",
  "Design Systems",
  "Landing Pages",
  "Editorial Sites",
  "Product Design",
];

export default function Marquee() {
  return (
    <div className="relative py-10 overflow-hidden border-y border-canvas/[0.05] bg-ink-deep/40">
      <div className="marquee flex whitespace-nowrap">
        {[...words, ...words].map((word, i) => (
          <span key={i} className="flex items-center gap-10 mx-8">
            <span
              className="font-display text-[clamp(1.5rem,3vw,2.25rem)] text-canvas/40"
              style={{ letterSpacing: "-0.02em" }}
            >
              {word}
            </span>
            <span
              className="w-1.5 h-1.5 rounded-full"
              style={{ background: "rgba(108,92,231,0.5)" }}
            />
          </span>
        ))}
      </div>
    </div>
  );
}
