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
      className="text-center mb-20"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}
    >
      {tag && (
        <span className="inline-block px-4 py-1.5 rounded-full text-sm font-medium bg-white/[0.06] text-[#888] border border-white/10 mb-4">
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
        <p className="mt-5 text-lg text-[#888] max-w-2xl mx-auto leading-relaxed">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
