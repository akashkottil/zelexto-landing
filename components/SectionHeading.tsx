"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface SectionHeadingProps {
  /** Display title with optional <em> tags around emphasis word for italic violet */
  title: ReactNode;
  subtitle?: string;
  tag?: string;
  /** "/ 01" style version label */
  version?: string;
  align?: "left" | "center";
}

export default function SectionHeading({
  title,
  subtitle,
  tag,
  version,
  align = "center",
}: SectionHeadingProps) {
  const alignCls = align === "center" ? "text-center mx-auto" : "text-left";
  const subAlign = align === "center" ? "mx-auto" : "";

  return (
    <motion.div
      className={`mb-16 lg:mb-20 max-w-3xl ${alignCls}`}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
    >
      {(tag || version) && (
        <div
          className={`flex items-center gap-3 mb-6 ${
            align === "center" ? "justify-center" : ""
          }`}
        >
          {tag && (
            <span className="inline-flex items-center gap-2 micro-label text-violet-soft">
              <span className="spark-dot" />
              {tag}
            </span>
          )}
          {version && (
            <span className="micro-label text-graphite">{version}</span>
          )}
        </div>
      )}

      <h2
        className="font-display text-4xl md:text-5xl lg:text-6xl text-canvas leading-[1.05]"
        style={{ letterSpacing: "-0.025em" }}
      >
        {title}
      </h2>

      {subtitle && (
        <p
          className={`mt-5 text-base lg:text-lg text-graphite-soft max-w-xl leading-relaxed ${subAlign}`}
        >
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
