"use client";

import { motion, useScroll, useTransform } from "framer-motion";

export default function ParallaxGrid() {
  const { scrollYProgress } = useScroll();

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -400]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -600]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -250]);
  const y4 = useTransform(scrollYProgress, [0, 1], [0, -500]);
  const rotate1 = useTransform(scrollYProgress, [0, 1], [0, 60]);
  const rotate2 = useTransform(scrollYProgress, [0, 1], [0, -45]);
  const opacity1 = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.04, 0.06, 0.04, 0.02]);

  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      {/* Fine dot grid */}
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: `radial-gradient(circle, #ffffff 0.5px, transparent 0.5px)`,
          backgroundSize: "28px 28px",
        }}
      />

      {/* Larger accent grid */}
      <div
        className="absolute inset-0 opacity-[0.012]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,107,107,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,107,107,0.4) 1px, transparent 1px)`,
          backgroundSize: "120px 120px",
        }}
      />

      {/* Cross pattern at intersections */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `radial-gradient(circle, rgba(255,107,107,0.5) 1px, transparent 1px)`,
          backgroundSize: "120px 120px",
        }}
      />

      {/* Gradient orbs — Layer 1 (warm) */}
      <motion.div
        className="absolute w-[700px] h-[700px] rounded-full"
        style={{
          y: y1,
          opacity: opacity1,
          background: "radial-gradient(circle, rgba(255,107,107,0.15), transparent 70%)",
          filter: "blur(100px)",
          top: "-5%",
          right: "5%",
        }}
      />

      {/* Layer 2 (cool white) */}
      <motion.div
        className="absolute w-[600px] h-[600px] rounded-full opacity-[0.04]"
        style={{
          y: y2,
          background: "radial-gradient(circle, rgba(255,255,255,0.12), transparent 70%)",
          filter: "blur(100px)",
          top: "30%",
          left: "-5%",
        }}
      />

      {/* Layer 3 (warm accent) */}
      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full opacity-[0.035]"
        style={{
          y: y3,
          background: "radial-gradient(circle, rgba(255,138,138,0.12), transparent 70%)",
          filter: "blur(90px)",
          top: "55%",
          right: "15%",
        }}
      />

      {/* Layer 4 (deep) */}
      <motion.div
        className="absolute w-[450px] h-[450px] rounded-full opacity-[0.03]"
        style={{
          y: y4,
          background: "radial-gradient(circle, rgba(255,107,107,0.1), transparent 70%)",
          filter: "blur(80px)",
          top: "75%",
          left: "20%",
        }}
      />

      {/* Floating shapes */}
      <motion.div
        className="absolute w-24 h-24 border border-white/[0.025] rounded-2xl"
        style={{ y: y1, rotate: rotate1, top: "18%", left: "6%" }}
      />
      <motion.div
        className="absolute w-16 h-16 border border-accent/[0.04] rounded-full"
        style={{ y: y2, top: "50%", right: "10%" }}
      />
      <motion.div
        className="absolute w-14 h-14 border border-white/[0.02] rotate-45"
        style={{ y: y3, rotate: rotate2, top: "72%", left: "18%" }}
      />
      <motion.div
        className="absolute w-20 h-20 border border-accent/[0.03] rounded-xl"
        style={{ y: y1, rotate: rotate2, top: "38%", right: "28%" }}
      />
      <motion.div
        className="absolute w-10 h-10 bg-accent/[0.015] rounded-full blur-sm"
        style={{ y: y3, top: "82%", right: "38%" }}
      />

      {/* Accent lines */}
      <motion.div
        className="absolute h-px w-60 opacity-[0.04]"
        style={{
          y: y1,
          background: "linear-gradient(90deg, transparent, rgba(255,107,107,0.5), transparent)",
          top: "22%",
          left: "3%",
        }}
      />
      <motion.div
        className="absolute h-px w-80 opacity-[0.03]"
        style={{
          y: y3,
          background: "linear-gradient(90deg, transparent, rgba(255,107,107,0.4), transparent)",
          top: "58%",
          right: "3%",
        }}
      />
      <motion.div
        className="absolute w-px h-60 opacity-[0.03]"
        style={{
          y: y2,
          background: "linear-gradient(180deg, transparent, rgba(255,255,255,0.3), transparent)",
          top: "35%",
          left: "50%",
        }}
      />
    </div>
  );
}
