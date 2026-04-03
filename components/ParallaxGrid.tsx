"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function ParallaxGrid() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll();

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -300]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -500]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const y4 = useTransform(scrollYProgress, [0, 1], [0, -400]);
  const rotate1 = useTransform(scrollYProgress, [0, 1], [0, 45]);
  const rotate2 = useTransform(scrollYProgress, [0, 1], [0, -30]);

  return (
    <div ref={ref} className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      {/* Fine dot grid — tight spacing, subtle */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `radial-gradient(circle, #ffffff 0.5px, transparent 0.5px)`,
          backgroundSize: "32px 32px",
        }}
      />

      {/* Thin line grid overlay — very subtle */}
      <div
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)`,
          backgroundSize: "80px 80px",
        }}
      />

      {/* Floating white/gray gradient orbs — Layer 1 */}
      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full"
        style={{
          y: y1,
          background: "radial-gradient(circle, rgba(255,255,255,0.06), transparent 70%)",
          filter: "blur(80px)",
          top: "5%",
          right: "10%",
        }}
      />

      {/* Layer 2 */}
      <motion.div
        className="absolute w-[600px] h-[600px] rounded-full"
        style={{
          y: y2,
          background: "radial-gradient(circle, rgba(255,255,255,0.04), transparent 70%)",
          filter: "blur(100px)",
          top: "35%",
          left: "5%",
        }}
      />

      {/* Layer 3 */}
      <motion.div
        className="absolute w-[400px] h-[400px] rounded-full"
        style={{
          y: y3,
          background: "radial-gradient(circle, rgba(200,200,200,0.05), transparent 70%)",
          filter: "blur(70px)",
          top: "65%",
          right: "20%",
        }}
      />

      {/* Layer 4 — additional depth */}
      <motion.div
        className="absolute w-[350px] h-[350px] rounded-full"
        style={{
          y: y4,
          background: "radial-gradient(circle, rgba(255,255,255,0.03), transparent 70%)",
          filter: "blur(90px)",
          top: "80%",
          left: "30%",
        }}
      />

      {/* Floating geometric shapes with parallax */}
      <motion.div
        className="absolute w-20 h-20 border border-white/[0.03] rounded-xl"
        style={{ y: y1, rotate: rotate1, top: "20%", left: "8%" }}
      />
      <motion.div
        className="absolute w-16 h-16 border border-white/[0.04] rounded-full"
        style={{ y: y2, top: "55%", right: "12%" }}
      />
      <motion.div
        className="absolute w-12 h-12 border border-white/[0.03] rotate-45"
        style={{ y: y3, rotate: rotate2, top: "75%", left: "20%" }}
      />
      <motion.div
        className="absolute w-24 h-24 border border-white/[0.025] rounded-2xl"
        style={{ y: y1, rotate: rotate2, top: "35%", right: "30%" }}
      />
      <motion.div
        className="absolute w-8 h-8 bg-white/[0.02] rounded-full"
        style={{ y: y3, top: "85%", right: "40%" }}
      />
      <motion.div
        className="absolute w-14 h-14 border border-white/[0.03] rounded-lg rotate-12"
        style={{ y: y2, rotate: rotate1, top: "15%", right: "45%" }}
      />

      {/* Horizontal accent lines with parallax */}
      <motion.div
        className="absolute h-px w-48 opacity-[0.05]"
        style={{
          y: y1,
          background: "linear-gradient(90deg, transparent, #ffffff, transparent)",
          top: "25%",
          left: "5%",
        }}
      />
      <motion.div
        className="absolute h-px w-64 opacity-[0.04]"
        style={{
          y: y3,
          background: "linear-gradient(90deg, transparent, #ffffff, transparent)",
          top: "55%",
          right: "5%",
        }}
      />
      <motion.div
        className="absolute w-px h-48 opacity-[0.04]"
        style={{
          y: y2,
          background: "linear-gradient(180deg, transparent, #ffffff, transparent)",
          top: "40%",
          left: "50%",
        }}
      />
      <motion.div
        className="absolute h-px w-32 opacity-[0.03]"
        style={{
          y: y4,
          background: "linear-gradient(90deg, transparent, #ffffff, transparent)",
          top: "75%",
          left: "25%",
        }}
      />

      {/* Grain / noise texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  );
}
