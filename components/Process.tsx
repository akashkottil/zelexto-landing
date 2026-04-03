"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { MessageSquare, PenTool, Code2, Rocket } from "lucide-react";
import SectionHeading from "./SectionHeading";

const steps = [
  {
    icon: MessageSquare,
    title: "Idea Discussion",
    description: "We listen to your vision, understand your goals, and map out the possibilities.",
    step: "01",
  },
  {
    icon: PenTool,
    title: "Planning & Design",
    description: "Wireframes, UI/UX design, and technical architecture — tailored to you.",
    step: "02",
  },
  {
    icon: Code2,
    title: "Development",
    description: "Agile sprints with regular updates. You see progress every step of the way.",
    step: "03",
  },
  {
    icon: Rocket,
    title: "Launch & Support",
    description: "We deploy, monitor, and support your product for smooth scaling.",
    step: "04",
  },
];

export default function Process() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const lineHeight = useTransform(scrollYProgress, [0.15, 0.75], ["0%", "100%"]);

  return (
    <section id="process" ref={sectionRef} className="relative py-32 lg:py-40 px-6">
      <div className="max-w-5xl mx-auto">
        <SectionHeading
          tag="Process"
          title="How we work"
          subtitle="Simple, transparent, and built for speed."
        />

        {/* Horizontal cards on desktop, vertical on mobile */}
        <div className="relative">
          {/* Connection line — desktop */}
          <div className="hidden lg:block absolute top-[60px] left-0 right-0 h-px bg-white/[0.04]">
            <motion.div
              className="h-full bg-gradient-to-r from-[#ff6b6b] to-[#ff6b6b]/20"
              style={{ width: lineHeight }}
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-5">
            {steps.map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -6 }}
                className="relative group"
                data-hover
              >
                {/* Step circle */}
                <div className="relative z-10 mb-6">
                  <motion.div
                    className="w-[72px] h-[72px] rounded-2xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center group-hover:border-[#ff6b6b]/30 group-hover:bg-[#ff6b6b]/[0.05] transition-all duration-500"
                    whileHover={{ scale: 1.08 }}
                  >
                    <step.icon className="text-[#ff6b6b]" size={24} />
                  </motion.div>
                  {/* Pulse */}
                  <motion.div
                    className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-[#ff6b6b]/60"
                    animate={{ scale: [1, 1.4, 1], opacity: [0.6, 0.2, 0.6] }}
                    transition={{ duration: 2.5, repeat: Infinity, delay: index * 0.4 }}
                  />
                </div>

                {/* Content */}
                <span className="text-[11px] uppercase tracking-[0.2em] text-[#ff6b6b] font-medium mb-2 block">
                  Step {step.step}
                </span>
                <h3 className="text-xl font-semibold font-[family-name:var(--font-space-grotesk)] text-[#F5F5F5] mb-2 tracking-tight group-hover:text-[#ff6b6b] transition-colors duration-300">
                  {step.title}
                </h3>
                <p className="text-[#666] text-sm leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
