"use client";

import { motion } from "framer-motion";
import SectionHeading from "./SectionHeading";

const audiences = [
  {
    title: "Founders",
    description: "Turning a sharp idea into a credible, fundable product.",
    label: "Stage / 0–1",
  },
  {
    title: "SaaS Teams",
    description: "Modern interfaces for modern products. Scale-ready.",
    label: "Stage / 1–N",
  },
  {
    title: "E-commerce",
    description: "Editorial storefronts that sell without shouting.",
    label: "DTC · Retail",
  },
  {
    title: "Studios & Agencies",
    description: "Co-build partner for overflow work and specialist engagements.",
    label: "Partner",
  },
];

export default function Audience() {
  return (
    <section className="relative py-28 lg:py-36 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          tag="Who we serve"
          version="/ 04"
          title={
            <>
              Built for the <span className="italic-violet">curious.</span>
            </>
          }
          subtitle="From first MVP to mature design system — we move with you."
        />

        <div className="overflow-visible">
          <div className="flex lg:grid lg:grid-cols-4 gap-4 overflow-x-auto lg:overflow-visible hide-scrollbar py-2 -mx-6 px-6 lg:mx-0 lg:px-0">
            {audiences.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.08,
                  ease: [0.22, 1, 0.36, 1],
                }}
                whileHover={{ y: -4 }}
                className="min-w-[260px] lg:min-w-0 group p-7 rounded-2xl border border-canvas/[0.06] bg-canvas/[0.02] hover:border-violet/30 hover:bg-violet/[0.04] transition-colors duration-400 cursor-default"
              >
                <span className="micro-label block mb-5">{item.label}</span>
                <h3 className="font-display text-2xl text-canvas mb-3">
                  {item.title}
                </h3>
                <p className="text-graphite-soft text-sm leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
