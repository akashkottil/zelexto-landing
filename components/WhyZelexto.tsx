"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Zap, HeartHandshake, Layers, Sparkles } from "lucide-react";
import SectionHeading from "./SectionHeading";

const highlights = [
  {
    icon: Zap,
    title: "Fast Delivery",
    description: "We move fast without breaking things. Your MVP in weeks, not months.",
  },
  {
    icon: HeartHandshake,
    title: "Personal Support",
    description: "Direct access to your dev team. No ticket queues, no waiting.",
  },
  {
    icon: Layers,
    title: "All-in-One Service",
    description: "Design, development, marketing — everything handled under one roof.",
  },
  {
    icon: Sparkles,
    title: "AI-Powered Solutions",
    description: "We integrate cutting-edge AI into every product we build.",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function WhyZelexto() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], [80, -80]);

  return (
    <section id="why-zelexto" ref={sectionRef} className="relative py-32 px-4 sm:px-6 overflow-hidden">
      <motion.div
        className="absolute w-[400px] h-[400px] rounded-full opacity-[0.03] pointer-events-none"
        style={{
          y: bgY,
          background: "radial-gradient(circle, #ffffff, transparent 70%)",
          filter: "blur(80px)",
          top: "10%",
          right: "-5%",
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        <SectionHeading
          tag="Why Choose Us"
          title="Why Startups Love Zelexto"
          subtitle="We're not just another agency — we're your technical co-founder."
        />

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {highlights.map((item) => (
            <motion.div
              key={item.title}
              variants={itemVariants}
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="glass rounded-2xl p-6 text-center group hover:border-white/20 transition-all duration-300 relative overflow-hidden cursor-default"
              data-hover
            >
              {/* Background glow on hover — white/gray only */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] to-white/[0.01] opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />

              <div className="relative z-10">
                <motion.div
                  className="w-14 h-14 rounded-2xl bg-white/[0.06] flex items-center justify-center mx-auto mb-4 group-hover:bg-white/[0.1] transition-colors duration-300"
                  whileHover={{ rotate: [0, -10, 10, 0] }}
                  transition={{ duration: 0.5 }}
                >
                  <item.icon className="text-[#F5F5F5]" size={28} />
                </motion.div>
                <h3 className="text-lg font-semibold font-[family-name:var(--font-space-grotesk)] text-[#F5F5F5] mb-2">
                  {item.title}
                </h3>
                <p className="text-[#888] text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
