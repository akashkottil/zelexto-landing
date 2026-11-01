"use client";

import { useRef } from "react";
import { motion, MotionValue, useScroll, useTransform } from "framer-motion";

/** One statement, lit word by word as it scrolls through the viewport. */

const words =
  "Most of the internet looks the same. We make the part people *remember* — sites, apps, brands and AI built around one clear idea, and shipped in weeks.".split(" ");

function Word({ word, i, progress }: { word: string; i: number; progress: MotionValue<number> }) {
  const start = i / words.length;
  const opacity = useTransform(progress, [start, start + 1.5 / words.length], [0.14, 1]);
  const accent = word.startsWith("*");
  return (
    <motion.span style={{ opacity }} className={accent ? "italic-violet" : undefined}>
      {accent ? word.replaceAll("*", "") : word}{" "}
    </motion.span>
  );
}

export default function Manifesto() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.5"] });

  return (
    <section className="relative px-6 lg:px-10 py-32 lg:py-48">
      <div className="max-w-[1100px] mx-auto">
        <p className="micro-label mb-10">The studio</p>
        <div
          ref={ref}
          className="font-display text-canvas text-[clamp(2.1rem,5vw,4.6rem)] leading-[1.06]"
          style={{ letterSpacing: "-0.03em" }}
        >
          {words.map((w, i) => (
            <Word key={i} word={w} i={i} progress={scrollYProgress} />
          ))}
        </div>
      </div>
    </section>
  );
}
