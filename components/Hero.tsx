"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight, ArrowDown } from "lucide-react";
import { useLoaded } from "./loaderState";

// The ribbon itself lives in RibbonStage (fixed, behind <main>) so it can follow the reader into Services.
const ease = [0.22, 1, 0.36, 1] as [number, number, number, number];
// Entrances wait for the loader's curtain (useLoaded) so they play in view rather than behind it.
const rise = (i: number, ready: boolean) => ({
  initial: { y: "110%" },
  animate: { y: ready ? "0%" : "110%" },
  transition: { duration: 1.1, delay: 0.3 + i * 0.12, ease },
});
const fade = (i: number, ready: boolean) => ({
  initial: { opacity: 0, y: 16 },
  animate: ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 },
  transition: { duration: 0.9, delay: 0.6 + i * 0.1, ease },
});

const disciplines = ["Websites", "Apps", "Brand", "AI", "Growth"];

export default function Hero() {
  const ready = useLoaded();
  const { scrollY } = useScroll();
  const copyY = useTransform(scrollY, [0, 800], [0, -120]);
  const copyOpacity = useTransform(scrollY, [0, 600], [1, 0]);

  return (
    <section className="relative min-h-[100svh] overflow-hidden flex flex-col">
      {/* keeps the headline readable where it overlaps the sculpture; fades with the copy so no band follows the ribbon down */}
      <motion.div
        style={{ opacity: copyOpacity }}
        className="absolute inset-x-0 bottom-0 h-[50%] lg:h-[38%] bg-gradient-to-t from-ink via-ink/60 to-transparent pointer-events-none"
      />

      <motion.div
        style={{ y: copyY, opacity: copyOpacity }}
        className="relative z-10 flex-1 flex flex-col justify-end max-w-[1400px] w-full mx-auto px-6 lg:px-10 pt-32 pb-10 lg:pb-14"
      >
        <motion.div {...fade(0, ready)} className="flex items-center gap-2 micro-label mb-8">
          <span className="spark-dot" />
          Now booking · new projects for 2027
        </motion.div>

        <h1
          className="font-display text-canvas leading-[0.9] text-[clamp(3.4rem,11.5vw,11rem)]"
          style={{ letterSpacing: "-0.04em" }}
        >
          <span className="block overflow-hidden pb-[0.06em]">
            <motion.span className="block" {...rise(0, ready)}>
              Built to be
            </motion.span>
          </span>
          <span className="block overflow-hidden pb-[0.12em] -mt-[0.06em]">
            <motion.span className="block italic-violet pr-[0.1em]" {...rise(1, ready)}>
              unmistakable.
            </motion.span>
          </span>
        </h1>

        <div className="mt-8 lg:mt-10 grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end border-t border-canvas/10 pt-8">
          <motion.p {...fade(1, ready)} className="text-lg lg:text-xl text-graphite-soft max-w-xl leading-relaxed">
            A digital studio for <span className="text-canvas">websites, apps, brands, AI and growth</span>.
            Senior craft, a small team, and launches measured in weeks, not quarters.
          </motion.p>

          <motion.div {...fade(2, ready)} className="flex flex-col sm:flex-row gap-3">
            <a
              href="https://wa.me/918590090380"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-canvas px-7 py-4 rounded-full text-base font-medium inline-flex items-center justify-center gap-3"
            >
              <span className="spark-dot" />
              Start your project
              <ArrowUpRight size={18} />
            </a>
            <a
              href="#services"
              className="btn-ghost px-7 py-4 rounded-full text-base font-medium inline-flex items-center justify-center gap-2"
            >
              What we build
              <ArrowDown size={16} />
            </a>
          </motion.div>
        </div>

        <motion.ul {...fade(3, ready)} className="mt-10 hidden sm:flex flex-wrap gap-x-6 gap-y-2 micro-label text-graphite lg:pr-20">
          {disciplines.map((d, i) => (
            <li key={d} className="flex items-center gap-6">
              {i > 0 && <span className="w-1 h-1 rounded-full bg-graphite" />}
              <span className="text-graphite-soft">/0{i + 1}</span> {d}
            </li>
          ))}
          <li className="hidden md:block ml-auto">Est · MMXXVI</li>
        </motion.ul>
      </motion.div>
    </section>
  );
}
