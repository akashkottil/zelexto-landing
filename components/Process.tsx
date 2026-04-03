"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { MessageSquare, PenTool, Code2, Rocket } from "lucide-react";
import SectionHeading from "./SectionHeading";

const steps = [
  {
    icon: MessageSquare,
    title: "Idea Discussion",
    description:
      "We listen to your vision, understand your goals, and map out the possibilities together.",
    step: "01",
  },
  {
    icon: PenTool,
    title: "Planning & Design",
    description:
      "Wireframes, UI/UX design, and technical architecture — all tailored to your needs.",
    step: "02",
  },
  {
    icon: Code2,
    title: "Development",
    description:
      "Agile development with regular updates. You see progress every step of the way.",
    step: "03",
  },
  {
    icon: Rocket,
    title: "Launch & Support",
    description:
      "We deploy, monitor, and support your product post-launch to ensure smooth scaling.",
    step: "04",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -30 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
};

export default function Process() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const lineHeight = useTransform(scrollYProgress, [0.1, 0.8], ["0%", "100%"]);

  return (
    <section id="process" ref={sectionRef} className="relative py-32 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">
        <SectionHeading
          tag="How We Work"
          title="Our Process"
          subtitle="Simple, transparent, and built for speed."
        />

        <motion.div
          className="relative"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Animated timeline line */}
          <div className="absolute left-8 top-0 bottom-0 w-px bg-white/5 hidden md:block">
            <motion.div
              className="w-full bg-gradient-to-b from-white/40 to-white/5"
              style={{ height: lineHeight }}
            />
          </div>

          <div className="space-y-8">
            {steps.map((step, index) => (
              <motion.div
                key={step.step}
                variants={itemVariants}
                className="flex gap-6 items-start group"
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
                data-hover
              >
                {/* Step number + icon */}
                <div className="relative flex-shrink-0">
                  <motion.div
                    className="w-16 h-16 rounded-2xl bg-white/[0.06] border border-white/10 flex items-center justify-center glow-white-sm"
                    whileHover={{
                      scale: 1.15,
                      boxShadow: "0 0 30px rgba(255,255,255,0.15)",
                    }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <step.icon className="text-[#F5F5F5]" size={24} />
                  </motion.div>
                  {/* Pulse dot — white */}
                  <motion.div
                    className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-white/60"
                    animate={{ scale: [1, 1.3, 1], opacity: [1, 0.4, 1] }}
                    transition={{ duration: 2, repeat: Infinity, delay: index * 0.5 }}
                  />
                </div>

                {/* Content */}
                <div className="glass rounded-2xl p-6 flex-1 hover:border-white/20 transition-all duration-300 group-hover:bg-white/[0.04]">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-[#888] font-bold text-sm font-[family-name:var(--font-space-grotesk)]">
                      STEP {step.step}
                    </span>
                    <motion.div
                      className="h-px bg-white/15 flex-1"
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: index * 0.2 }}
                      style={{ originX: 0 }}
                    />
                  </div>
                  <h3 className="text-xl font-semibold font-[family-name:var(--font-space-grotesk)] text-[#F5F5F5] mb-2 group-hover:text-white transition-colors duration-300">
                    {step.title}
                  </h3>
                  <p className="text-[#888] text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
