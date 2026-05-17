"use client";

import { motion } from "framer-motion";
import SectionHeading from "./SectionHeading";

const stats = [
  { number: "48h", label: "Avg. response time", spark: true },
  { number: "50+", label: "Projects shipped", spark: false },
  { number: "98%", label: "Client retention", spark: true },
  { number: "24/7", label: "Personal support", spark: false },
];

const highlights = [
  {
    title: "Speed without compromise",
    description:
      "We move fast — but the work never feels rushed. Every detail gets the time it needs, nothing more.",
  },
  {
    title: "Your direct team",
    description:
      "Talk to the people building your product. No account managers, no relay tower of project leads.",
  },
  {
    title: "Editorial at heart",
    description:
      "We design like editors — restraint, hierarchy, and one bold move per page. Less but better.",
  },
  {
    title: "Built to last",
    description:
      "Modern stacks, clean code, sane architecture. The kind of work you can hand off without apology.",
  },
];

export default function WhyZelexto() {
  return (
    <section
      id="why-zelexto"
      className="relative py-28 lg:py-36 px-6 overflow-hidden"
    >
      <div
        className="absolute w-[500px] h-[500px] rounded-full opacity-[0.15] pointer-events-none drift-slow"
        style={{
          background:
            "radial-gradient(circle, rgba(74,61,201,0.55), transparent 70%)",
          filter: "blur(120px)",
          top: "20%",
          right: "-10%",
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        <SectionHeading
          tag="Why zelexto"
          version="/ 02"
          title={
            <>
              Not an agency — a <span className="italic-violet">studio.</span>
            </>
          }
          subtitle="Small team. Senior craft. The technical co-founder energy your product deserves."
        />

        {/* Stats row */}
        <motion.div
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-20"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="text-center p-6 rounded-2xl border border-canvas/[0.06] bg-canvas/[0.02]"
            >
              <span
                className="font-display block text-4xl lg:text-5xl text-canvas"
                style={{ letterSpacing: "-0.025em" }}
              >
                {stat.number}
                {stat.spark && (
                  <span
                    className="inline-block w-1.5 h-1.5 rounded-full ml-1.5 align-middle"
                    style={{
                      background: "var(--lime)",
                      boxShadow: "0 0 8px rgba(212,255,79,0.6)",
                    }}
                  />
                )}
              </span>
              <p className="text-graphite-soft text-xs mt-2 micro-label">
                {stat.label}
              </p>
            </div>
          ))}
        </motion.div>

        {/* Highlights */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {highlights.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{
                duration: 0.7,
                delay: index * 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
              whileHover={{ y: -4 }}
              className="group p-8 lg:p-10 rounded-2xl border border-canvas/[0.06] bg-canvas/[0.02] hover:border-violet/30 hover:bg-violet/[0.04] transition-colors duration-400"
            >
              <span className="micro-label block mb-4">/ 0{index + 1}</span>
              <h3 className="font-display text-2xl lg:text-[28px] text-canvas mb-3 leading-tight">
                {item.title}
              </h3>
              <p className="text-graphite-soft text-base leading-relaxed">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
