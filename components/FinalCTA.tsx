"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number];

export default function FinalCTA() {
  return (
    <section id="contact" className="relative px-6 lg:px-10 pt-24 pb-32 lg:pt-32 lg:pb-44">
      <div className="max-w-[1400px] mx-auto border-t border-canvas/10 pt-20 lg:pt-28">
        <motion.div
          className="flex items-center gap-2 micro-label mb-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <span className="spark-dot" />
          Now booking · new projects for 2027
        </motion.div>

        <h2
          className="font-display text-canvas leading-[0.9] text-[clamp(3.2rem,10vw,9.5rem)]"
          style={{ letterSpacing: "-0.04em" }}
        >
          <span className="block overflow-hidden pb-[0.06em]">
            <motion.span
              className="block"
              initial={{ y: "105%" }}
              whileInView={{ y: "0%" }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{ duration: 1.1, ease }}
            >
              Got an idea?
            </motion.span>
          </span>
          <span className="block overflow-hidden pb-[0.12em] -mt-[0.06em]">
            <motion.span
              className="block"
              initial={{ y: "105%" }}
              whileInView={{ y: "0%" }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{ duration: 1.1, delay: 0.12, ease }}
            >
              Let&apos;s make it <span className="italic-violet pr-[0.08em]">real.</span>
            </motion.span>
          </span>
        </h2>

        <div className="mt-12 lg:mt-16 grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
          <p className="text-lg text-graphite-soft max-w-lg leading-relaxed">
            Tell us the goal. We&apos;ll reply within a day with how we&apos;d approach it and what it would take.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href="https://wa.me/918590090380"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-canvas px-7 py-4 rounded-full text-base font-medium inline-flex items-center justify-center gap-3"
            >
              Start your project
              <ArrowUpRight size={18} />
            </a>
            <a
              href="mailto:hello@zelexto.com"
              className="btn-ghost px-7 py-4 rounded-full text-base font-medium inline-flex items-center justify-center"
            >
              hello@zelexto.com
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
