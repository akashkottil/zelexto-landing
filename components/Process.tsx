"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { MessageSquare, PenTool, Code2, Rocket } from "lucide-react";
import SectionHeading from "./SectionHeading";

const steps = [
  {
    icon: MessageSquare,
    title: "Discover",
    description:
      "We listen — to the problem, the audience, and what makes the brand unmistakable.",
    step: "01",
  },
  {
    icon: PenTool,
    title: "Design",
    description:
      "Wireframes, identity, interface — designed in the open, iterated with you in the loop.",
    step: "02",
  },
  {
    icon: Code2,
    title: "Build",
    description:
      "Senior-led engineering in tight, transparent sprints. You see the work as it lands.",
    step: "03",
  },
  {
    icon: Rocket,
    title: "Launch",
    description:
      "Ship, measure, iterate. We stay close long after the launch tweet is sent.",
    step: "04",
  },
];

export default function Process() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const lineHeight = useTransform(scrollYProgress, [0.2, 0.75], ["0%", "100%"]);

  return (
    <section id="process" ref={sectionRef} className="relative py-28 lg:py-36 px-6">
      <div className="max-w-3xl mx-auto">
        <SectionHeading
          tag="How we work"
          version="/ 03"
          title={
            <>
              Simple, transparent, <span className="italic-violet">deliberate.</span>
            </>
          }
          subtitle="One sprint at a time. No surprises."
        />

        <div className="relative">
          {steps.map((step, index) => {
            const isLast = index === steps.length - 1;

            return (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{
                  duration: 0.7,
                  delay: index * 0.1,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="relative flex gap-6 lg:gap-8"
              >
                <div className="flex flex-col items-center flex-shrink-0">
                  <div className="relative z-10 w-[64px] h-[64px] rounded-2xl bg-ink border border-violet/25 flex items-center justify-center transition-all duration-400 hover:border-violet/60 hover:bg-violet/[0.06]">
                    <step.icon className="text-violet-soft" size={22} />
                    <span className="absolute -top-1 -right-1 spark-dot" />
                  </div>

                  {!isLast && (
                    <div className="w-px flex-1 min-h-[40px] bg-canvas/[0.06] relative">
                      <motion.div
                        className="absolute top-0 left-0 w-full"
                        style={{
                          height: lineHeight,
                          background:
                            "linear-gradient(180deg, rgba(108,92,231,0.6), rgba(108,92,231,0.1))",
                        }}
                      />
                    </div>
                  )}
                </div>

                <div className={`flex-1 pt-1 ${isLast ? "pb-0" : "pb-14"}`}>
                  <span className="micro-label block mb-2">
                    Step / {step.step}
                  </span>
                  <h3 className="font-display text-2xl lg:text-3xl text-canvas mb-2">
                    {step.title}
                  </h3>
                  <p className="text-graphite-soft text-base leading-relaxed max-w-md">
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
