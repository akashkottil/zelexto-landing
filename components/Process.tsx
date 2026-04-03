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

  const lineHeight = useTransform(scrollYProgress, [0.2, 0.7], ["0%", "100%"]);

  return (
    <section id="process" ref={sectionRef} className="relative py-32 lg:py-40 px-6">
      <div className="max-w-3xl mx-auto">
        <SectionHeading
          tag="Process"
          title="How we work"
          subtitle="Simple, transparent, and built for speed."
        />

        {/* Vertical timeline */}
        <div className="relative">
          {steps.map((step, index) => {
            const isLast = index === steps.length - 1;

            return (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.12,
                  ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
                }}
                className="relative flex gap-6 lg:gap-8"
              >
                {/* Left column: icon + connector line */}
                <div className="flex flex-col items-center flex-shrink-0">
                  {/* Icon card — z-10 so it sits above the line */}
                  <motion.div
                    className="relative z-10 w-[64px] h-[64px] rounded-2xl bg-[#0a0a0a] border border-white/[0.08] flex items-center justify-center group-hover:border-[#ff6b6b]/30 transition-all duration-500"
                    whileHover={{
                      scale: 1.1,
                      borderColor: "rgba(255,107,107,0.3)",
                      backgroundColor: "rgba(255,107,107,0.05)",
                    }}
                    data-hover
                  >
                    <step.icon className="text-[#ff6b6b]" size={22} />
                    {/* Pulse dot */}
                    <motion.div
                      className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-[#ff6b6b]/60"
                      animate={{ scale: [1, 1.5, 1], opacity: [0.6, 0.15, 0.6] }}
                      transition={{ duration: 2.5, repeat: Infinity, delay: index * 0.4 }}
                    />
                  </motion.div>

                  {/* Vertical connector line — starts BELOW the icon, not behind it */}
                  {!isLast && (
                    <div className="w-px flex-1 min-h-[40px] bg-white/[0.04] relative mt-0">
                      <motion.div
                        className="absolute top-0 left-0 w-full bg-gradient-to-b from-[#ff6b6b]/40 to-[#ff6b6b]/5"
                        style={{ height: lineHeight }}
                      />
                    </div>
                  )}
                </div>

                {/* Right column: content */}
                <div className={`pb-12 ${isLast ? "pb-0" : ""} flex-1 pt-1`}>
                  <span className="text-[11px] uppercase tracking-[0.2em] text-[#ff6b6b] font-medium mb-1.5 block">
                    Step {step.step}
                  </span>
                  <h3 className="text-xl lg:text-2xl font-semibold font-[family-name:var(--font-space-grotesk)] text-[#F5F5F5] mb-2 tracking-tight">
                    {step.title}
                  </h3>
                  <p className="text-[#666] text-sm leading-relaxed max-w-md">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
