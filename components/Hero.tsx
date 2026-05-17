"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Orbit from "./Orbit";

const reveal = {
  hidden: { y: 40, opacity: 0 },
  visible: (i: number) => ({
    y: 0,
    opacity: 1,
    transition: {
      duration: 1,
      delay: i * 0.12,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  }),
};

export default function Hero() {
  return (
    <section className="relative min-h-[100svh] flex items-center justify-center overflow-hidden px-6 pt-28 pb-20">
      {/* Hero atmospheric violet wash */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div
          className="w-[1100px] h-[1100px] rounded-full opacity-[0.25] drift"
          style={{
            background:
              "radial-gradient(circle, rgba(108,92,231,0.55), transparent 60%)",
            filter: "blur(120px)",
          }}
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto text-center">
        {/* Top metadata row — micro labels */}
        <motion.div
          className="flex items-center justify-center gap-4 mb-12"
          custom={0}
          variants={reveal}
          initial="hidden"
          animate="visible"
        >
          <span className="micro-label inline-flex items-center gap-2">
            <span className="spark-dot" />
            Now booking · Q2 2026
          </span>
          <span className="hidden sm:inline micro-label text-graphite">
            / 09°56&apos;N · 76°15&apos;E
          </span>
        </motion.div>

        {/* Headline */}
        <div className="overflow-hidden">
          <motion.h1
            className="font-display text-[clamp(3rem,9vw,8.5rem)] text-canvas leading-[0.95]"
            style={{ letterSpacing: "-0.035em" }}
            custom={1}
            variants={reveal}
            initial="hidden"
            animate="visible"
          >
            Build <span className="italic-violet">boldly.</span>
          </motion.h1>
        </div>

        <div className="overflow-hidden">
          <motion.h1
            className="font-display text-[clamp(3rem,9vw,8.5rem)] text-canvas leading-[0.95]"
            style={{ letterSpacing: "-0.035em" }}
            custom={2}
            variants={reveal}
            initial="hidden"
            animate="visible"
          >
            Ship <span className="italic-violet">fast.</span>
          </motion.h1>
        </div>

        <motion.p
          className="mt-8 text-lg sm:text-xl text-graphite-soft max-w-xl mx-auto leading-relaxed"
          custom={3}
          variants={reveal}
          initial="hidden"
          animate="visible"
        >
          A digital studio crafting premium websites, mobile apps, and brand
          systems. Built in Kochi, working with clients across India and beyond.
        </motion.p>

        <motion.div
          className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-3"
          custom={4}
          variants={reveal}
          initial="hidden"
          animate="visible"
        >
          <a
            href="https://wa.me/918590090380"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-violet px-8 py-4 rounded-full text-base font-medium inline-flex items-center gap-2 w-full sm:w-auto justify-center"
          >
            Start your project
            <ArrowUpRight size={18} />
          </a>
          <a
            href="#portfolio"
            className="btn-ghost px-8 py-4 rounded-full text-base font-medium inline-flex items-center gap-2 w-full sm:w-auto justify-center"
          >
            View our work
          </a>
        </motion.div>

        {/* Tagline footer */}
        <motion.p
          className="mt-16 micro-label inline-flex items-center gap-3 text-graphite"
          custom={5}
          variants={reveal}
          initial="hidden"
          animate="visible"
        >
          <span className="w-8 h-px bg-graphite/60" />
          Crafted with intention · Est · MMXXVI
          <span className="w-8 h-px bg-graphite/60" />
        </motion.p>
      </div>

      {/* Orbit signature — bottom of hero */}
      <motion.div
        className="absolute bottom-6 left-0 right-0 z-0 h-[160px] opacity-70"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.7 }}
        transition={{ delay: 1.5, duration: 1.5 }}
      >
        <Orbit className="w-full h-full" direction="down" />
      </motion.div>
    </section>
  );
}
