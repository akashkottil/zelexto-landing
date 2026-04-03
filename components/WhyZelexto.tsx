"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import SectionHeading from "./SectionHeading";

const stats = [
  { number: "48h", label: "Average response time", highlight: true },
  { number: "50+", label: "Projects delivered", highlight: false },
  { number: "98%", label: "Client satisfaction", highlight: true },
  { number: "24/7", label: "Personal support", highlight: false },
];

const highlights = [
  {
    title: "Speed that matters",
    description: "We ship MVPs in weeks, not months. Your startup doesn't have time to wait — and neither do we.",
    accent: true,
  },
  {
    title: "Your personal tech team",
    description: "Direct Slack/WhatsApp access to your developers. No ticket queues, no account managers in between.",
    accent: false,
  },
  {
    title: "Everything, one roof",
    description: "Design, development, AI, marketing — you don't need five agencies. You need one great one.",
    accent: false,
  },
  {
    title: "AI-native approach",
    description: "Every product we build leverages AI from day one. Not as a feature — as a foundation.",
    accent: true,
  },
];

export default function WhyZelexto() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], [80, -80]);

  return (
    <section id="why-zelexto" ref={sectionRef} className="relative py-32 lg:py-40 px-6 overflow-hidden">
      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full opacity-[0.04] pointer-events-none"
        style={{
          y: bgY,
          background: "radial-gradient(circle, #ff6b6b, transparent 70%)",
          filter: "blur(100px)",
          top: "20%",
          right: "-10%",
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        <SectionHeading
          tag="Why Zelexto"
          title="Not just another agency"
          subtitle="We're the technical co-founder your startup needs."
        />

        {/* Stats bar */}
        <motion.div
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="text-center p-6 rounded-2xl border border-white/[0.05] bg-white/[0.02]"
            >
              <span className={`text-4xl lg:text-5xl font-bold font-[family-name:var(--font-space-grotesk)] tracking-tight ${
                stat.highlight ? "text-[#ff6b6b]" : "text-[#F5F5F5]"
              }`}>
                {stat.number}
              </span>
              <p className="text-[#666] text-sm mt-2">{stat.label}</p>
            </div>
          ))}
        </motion.div>

        {/* Feature grid — alternating layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {highlights.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -4 }}
              className={`group p-8 lg:p-10 rounded-2xl border transition-all duration-500 ${
                item.accent
                  ? "border-[#ff6b6b]/15 bg-[#ff6b6b]/[0.03] hover:border-[#ff6b6b]/30 hover:bg-[#ff6b6b]/[0.05]"
                  : "border-white/[0.06] bg-white/[0.02] hover:border-white/[0.12] hover:bg-white/[0.04]"
              }`}
              data-hover
            >
              <span className="text-[11px] uppercase tracking-[0.2em] text-[#666] mb-4 block">
                0{index + 1}
              </span>
              <h3 className={`text-2xl lg:text-3xl font-bold font-[family-name:var(--font-space-grotesk)] tracking-tight mb-3 ${
                item.accent ? "text-[#ff6b6b]" : "text-[#F5F5F5]"
              }`}>
                {item.title}
              </h3>
              <p className="text-[#888] text-base leading-relaxed">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
