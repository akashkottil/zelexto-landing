"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const steps = [
  { title: "Discover", line: "We learn the problem, the audience and the one idea worth leading with." },
  { title: "Design", line: "Identity and interface, shaped in the open with you in the loop." },
  { title: "Build", line: "Senior-led engineering in short sprints. You see the work as it lands." },
  { title: "Launch", line: "Ship, measure, refine. We stay close long after go-live." },
];

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number];

export default function Process() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.8", "end 0.6"] });
  const line = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section id="process" className="relative px-6 lg:px-10 py-32 lg:py-44">
      <div className="max-w-[1400px] mx-auto">
        <p className="micro-label mb-6">How we work</p>
        <h2 className="font-display text-canvas text-5xl lg:text-7xl leading-[0.95] max-w-3xl" style={{ letterSpacing: "-0.03em" }}>
          From first call to <span className="italic-violet">launch.</span>
        </h2>

        <div ref={ref} className="relative mt-20 lg:mt-28">
          <span className="hidden lg:block absolute left-0 right-0 top-0 h-px bg-canvas/10" />
          <motion.span className="hidden lg:block absolute left-0 right-0 top-0 h-px bg-canvas origin-left" style={{ scaleX: line }} />

          <ol className="grid gap-12 lg:grid-cols-4 lg:gap-10">
            {steps.map((s, i) => (
              <motion.li
                key={s.title}
                className="relative pl-6 lg:pl-0 lg:pt-10 border-l border-canvas/10 lg:border-0"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-15% 0px" }}
                transition={{ duration: 0.9, delay: i * 0.12, ease }}
              >
                <span className="hidden lg:block absolute -top-[3px] left-0 w-[7px] h-[7px] rounded-full bg-canvas" />
                <span className="font-mono text-[10px] tracking-[0.2em] text-graphite">0{i + 1}</span>
                <h3 className="mt-3 font-display text-canvas text-3xl lg:text-4xl" style={{ letterSpacing: "-0.02em" }}>
                  {s.title}
                </h3>
                <p className="mt-3 text-graphite-soft leading-relaxed max-w-xs">{s.line}</p>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
