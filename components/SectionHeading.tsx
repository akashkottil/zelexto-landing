"use client";

import { motion } from "framer-motion";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  tag?: string;
}

export default function SectionHeading({
  title,
  subtitle,
  tag,
}: SectionHeadingProps) {
  return (
    <motion.div
      className="text-center mb-20 lg:mb-24"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
    >
      {tag && (
        <span className="inline-block px-4 py-1.5 rounded-full text-[11px] uppercase tracking-[0.2em] font-medium bg-[#ff6b6b]/[0.06] text-[#ff6b6b] border border-[#ff6b6b]/15 mb-5">
          {tag}
        </span>
      )}
      <h2
        className="text-4xl md:text-5xl lg:text-6xl font-bold font-[family-name:var(--font-space-grotesk)] text-[#F5F5F5] tracking-tight"
        style={{ letterSpacing: "-0.03em" }}
      >
        {title}
      </h2>
      {subtitle && (
        <p className="mt-5 text-lg text-[#888] max-w-xl mx-auto leading-relaxed">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
