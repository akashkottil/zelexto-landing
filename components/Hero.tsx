"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Phone } from "lucide-react";
import { useRef } from "react";
import AnimatedBackground from "./AnimatedBackground";
import MagneticButton from "./MagneticButton";

export default function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const textY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.8], [1, 0.95]);
  const floatY1 = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const floatY2 = useTransform(scrollYProgress, [0, 1], [0, -120]);

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16"
    >
      <AnimatedBackground />

      {/* Floating UI elements with parallax */}
      <motion.div
        className="absolute top-32 right-[10%] hidden lg:block glass rounded-xl p-4 w-48"
        style={{ y: floatY1 }}
        animate={{ y: [0, -15, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        whileHover={{ scale: 1.05, rotate: 2 }}
      >
        <div className="flex items-center gap-2 mb-2">
          <div className="w-3 h-3 rounded-full bg-white/60 animate-pulse" />
          <span className="text-xs text-[#888]">Live Dashboard</span>
        </div>
        <div className="space-y-1.5">
          <div className="h-2 bg-white/10 rounded-full w-full" />
          <motion.div
            className="h-2 bg-white/20 rounded-full"
            animate={{ width: ["50%", "75%", "60%", "50%"] }}
            transition={{ duration: 3, repeat: Infinity }}
          />
          <div className="h-2 bg-white/10 rounded-full w-1/2" />
        </div>
      </motion.div>

      <motion.div
        className="absolute bottom-32 left-[8%] hidden lg:block glass rounded-xl p-4 w-52"
        style={{ y: floatY2 }}
        animate={{ y: [0, 12, 0] }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
        whileHover={{ scale: 1.05, rotate: -2 }}
      >
        <div className="flex items-center gap-2 mb-2">
          <motion.div
            className="w-2 h-2 rounded-full bg-white/60"
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <span className="text-xs text-[#888]">API Response</span>
        </div>
        <code className="text-[10px] text-white/60 block">
          {`{ "status": 200 }`}
        </code>
        <code className="text-[10px] text-[#888] block">
          {`{ "data": "success" }`}
        </code>
      </motion.div>

      {/* Floating decorative element top-left */}
      <motion.div
        className="absolute top-48 left-[15%] hidden xl:block glass rounded-xl p-3 w-36"
        style={{ y: floatY1 }}
        animate={{ y: [0, -10, 0], rotate: [0, -3, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        whileHover={{ scale: 1.08 }}
      >
        <div className="flex items-center gap-1.5 mb-1.5">
          <div className="w-2 h-2 rounded-full bg-white/50" />
          <span className="text-[10px] text-[#888]">Users Online</span>
        </div>
        <span className="text-lg font-bold text-[#F5F5F5] font-[family-name:var(--font-space-grotesk)]">
          2,847
        </span>
      </motion.div>

      {/* Main content with parallax */}
      <motion.div
        className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center"
        style={{ y: textY, opacity, scale }}
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.span
            className="inline-block px-4 py-1.5 rounded-full text-sm font-medium bg-white/[0.06] text-[#888] border border-white/10 mb-6 cursor-default"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            whileHover={{ scale: 1.05, borderColor: "rgba(255,255,255,0.25)" }}
          >
            AI-Powered Digital Agency
          </motion.span>
        </motion.div>

        <motion.h1
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold font-[family-name:var(--font-space-grotesk)] leading-[0.95] mb-8 tracking-tight"
          style={{ letterSpacing: "-0.04em" }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          <span className="text-[#F5F5F5]">Build Faster</span>
          <br />
          <span className="text-[#F5F5F5]">with{" "}</span>
          <motion.span
            className="text-white text-glow-white inline-block"
            animate={{ textShadow: [
              "0 0 20px rgba(255,255,255,0.2), 0 0 40px rgba(255,255,255,0.08)",
              "0 0 30px rgba(255,255,255,0.35), 0 0 60px rgba(255,255,255,0.12)",
              "0 0 20px rgba(255,255,255,0.2), 0 0 40px rgba(255,255,255,0.08)",
            ]}}
            transition={{ duration: 3, repeat: Infinity }}
          >
            AI
          </motion.span>
        </motion.h1>

        <motion.p
          className="text-lg sm:text-xl text-[#888] max-w-2xl mx-auto mb-12 leading-relaxed"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          From idea to launch — we design, develop, and scale your product with
          speed, precision, and personal support.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <MagneticButton
            href="https://wa.me/918590090380"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary px-8 py-3.5 rounded-full text-base font-semibold flex items-center gap-2 w-full sm:w-auto justify-center"
          >
            Start Your Project
            <ArrowRight size={18} />
          </MagneticButton>
          <MagneticButton
            href="tel:+918590090380"
            className="btn-secondary px-8 py-3.5 rounded-full text-base font-semibold flex items-center gap-2 w-full sm:w-auto justify-center"
          >
            <Phone size={18} />
            Book a Call
          </MagneticButton>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-6 h-10 rounded-full border-2 border-white/20 flex items-start justify-center p-1.5">
          <motion.div
            className="w-1.5 h-1.5 rounded-full bg-white/60"
            animate={{ y: [0, 16, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
      </motion.div>
    </section>
  );
}
