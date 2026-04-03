"use client";

const words = [
  "MVP Development",
  "AI Integration",
  "Shopify Stores",
  "Landing Pages",
  "Backend APIs",
  "Digital Marketing",
  "SaaS Platforms",
  "Mobile Apps",
];

export default function Marquee() {
  return (
    <div className="relative py-8 overflow-hidden border-y border-white/[0.04]">
      <div className="marquee flex whitespace-nowrap">
        {[...words, ...words].map((word, i) => (
          <span key={i} className="flex items-center gap-8 mx-8">
            <span className="text-[clamp(1rem,2vw,1.5rem)] font-[family-name:var(--font-space-grotesk)] font-medium text-[#333] uppercase tracking-[0.15em]">
              {word}
            </span>
            <span className="w-2 h-2 rounded-full bg-[#ff6b6b]/30" />
          </span>
        ))}
      </div>
    </div>
  );
}
