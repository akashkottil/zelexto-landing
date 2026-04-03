"use client";

import { motion } from "framer-motion";

export default function AnimatedBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden z-0">
      <motion.div
        className="absolute w-[600px] h-[600px] rounded-full opacity-[0.05]"
        style={{
          background: "radial-gradient(circle, #ff6b6b, transparent 70%)",
          filter: "blur(120px)",
          top: "-200px",
          right: "-100px",
        }}
        animate={{
          x: [0, 40, -25, 0],
          y: [0, -30, 15, 0],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full opacity-[0.03]"
        style={{
          background: "radial-gradient(circle, #ffffff, transparent 70%)",
          filter: "blur(100px)",
          bottom: "-150px",
          left: "-100px",
        }}
        animate={{
          x: [0, -30, 20, 0],
          y: [0, 20, -15, 0],
        }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}
