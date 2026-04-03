"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Phone } from "lucide-react";
import { useRef } from "react";
import MagneticButton from "./MagneticButton";

const textReveal = {
  hidden: { y: 100, opacity: 0 },
  visible: (i: number) => ({
    y: 0,
    opacity: 1,
    transition: {
      duration: 1,
      delay: i * 0.15,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
    },
  }),
};

export default function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const textY = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.6], [1, 0.92]);
  const badgeY = useTransform(scrollYProgress, [0, 1], [0, 80]);

  return (
    <section
      ref={ref}
      className="relative min-h-[100vh] flex items-center justify-center overflow-hidden"
    >
      {/* Large centered gradient */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <motion.div
          className="w-[900px] h-[900px] rounded-full opacity-[0.07]"
          style={{
            background: "radial-gradient(circle, #ff6b6b, transparent 65%)",
            filter: "blur(120px)",
          }}
          animate={{
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <motion.div
        className="relative z-10 max-w-6xl mx-auto px-6 text-center"
        style={{ y: textY, opacity, scale }}
      >
        {/* Badge */}
        <motion.div style={{ y: badgeY }}>
          <motion.span
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-[13px] font-medium bg-white/[0.04] text-[#888] border border-white/[0.08] mb-10 cursor-default"
            custom={0}
            variants={textReveal}
            initial="hidden"
            animate="visible"
            whileHover={{ borderColor: "rgba(255,107,107,0.3)", scale: 1.03 }}
          >
            <span className="w-2 h-2 rounded-full bg-[#ff6b6b] animate-pulse" />
            Now accepting projects for Q2 2026
          </motion.span>
        </motion.div>

        {/* Headline — Shopify Editions style massive text */}
        <div className="overflow-hidden mb-4">
          <motion.h1
            className="text-[clamp(3rem,8vw,8rem)] font-bold font-[family-name:var(--font-space-grotesk)] leading-[0.9] tracking-tight"
            style={{ letterSpacing: "-0.04em" }}
            custom={1}
            variants={textReveal}
            initial="hidden"
            animate="visible"
          >
            Build{" "}
            <span className="text-[#ff6b6b] text-glow-accent">faster</span>
          </motion.h1>
        </div>

        <div className="overflow-hidden mb-4">
          <motion.h1
            className="text-[clamp(3rem,8vw,8rem)] font-bold font-[family-name:var(--font-space-grotesk)] leading-[0.9] tracking-tight"
            style={{ letterSpacing: "-0.04em" }}
            custom={2}
            variants={textReveal}
            initial="hidden"
            animate="visible"
          >
            with <span className="text-[#ff6b6b]">AI</span>
          </motion.h1>
        </div>

        <motion.p
          className="text-lg sm:text-xl text-[#888] max-w-xl mx-auto mb-12 leading-relaxed"
          custom={3}
          variants={textReveal}
          initial="hidden"
          animate="visible"
        >
          From idea to launch — we design, develop, and scale your
          product with <span className="text-[#F5F5F5]">speed</span>,{" "}
          <span className="text-[#F5F5F5]">precision</span>, and{" "}
          <span className="text-[#ff6b6b]">personal support</span>.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
          custom={4}
          variants={textReveal}
          initial="hidden"
          animate="visible"
        >
          <MagneticButton
            href="https://wa.me/918590090380"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-accent px-8 py-4 rounded-full text-base font-semibold flex items-center gap-2 w-full sm:w-auto justify-center"
          >
            Start Your Project
            <ArrowRight size={18} />
          </MagneticButton>
          <MagneticButton
            href="tel:+918590090380"
            className="btn-secondary px-8 py-4 rounded-full text-base font-semibold flex items-center gap-2 w-full sm:w-auto justify-center"
          >
            <Phone size={18} />
            Book a Call
          </MagneticButton>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        style={{ opacity }}
      >
        <div className="flex flex-col items-center gap-3">
          <span className="text-[11px] uppercase tracking-[0.2em] text-[#666]">Scroll</span>
          <div className="w-5 h-8 rounded-full border border-white/15 flex items-start justify-center p-1">
            <motion.div
              className="w-1 h-1 rounded-full bg-[#ff6b6b]"
              animate={{ y: [0, 14, 0] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
        </div>
      </motion.div>
    </section>
  );
}
