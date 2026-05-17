"use client";

import { motion } from "framer-motion";
import {
  Globe,
  Smartphone,
  Sparkles,
  Layers,
  Server,
  PenTool,
} from "lucide-react";
import SectionHeading from "./SectionHeading";

const services = [
  {
    icon: Globe,
    title: "Websites",
    description:
      "Editorial websites and landing pages with modern typography, depth, and motion.",
    spark: true,
  },
  {
    icon: Smartphone,
    title: "Mobile Apps",
    description:
      "Native-feel iOS, Android and cross-platform apps built for real product teams.",
    spark: false,
  },
  {
    icon: PenTool,
    title: "Brand Systems",
    description:
      "Identity, typography, and design systems that scale across product and marketing.",
    spark: true,
  },
  {
    icon: Layers,
    title: "Design Systems",
    description:
      "Token-driven component libraries that bridge design and code from day one.",
    spark: false,
  },
  {
    icon: Sparkles,
    title: "AI Integration",
    description:
      "Practical AI baked into product flows — assistants, automation, and intelligent UX.",
    spark: false,
  },
  {
    icon: Server,
    title: "Engineering",
    description:
      "Backends, APIs and infrastructure that match the polish of the product on top.",
    spark: false,
  },
];

export default function Services() {
  return (
    <section
      id="services"
      className="relative py-28 lg:py-36 px-6 overflow-hidden"
    >
      {/* soft violet wash */}
      <div
        className="absolute w-[500px] h-[500px] rounded-full opacity-[0.15] pointer-events-none drift"
        style={{
          background:
            "radial-gradient(circle, rgba(108,92,231,0.5), transparent 70%)",
          filter: "blur(120px)",
          top: "10%",
          left: "-10%",
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        <SectionHeading
          tag="What we build"
          version="/ 01"
          title={
            <>
              Crafted with <span className="italic-violet">intention.</span>
            </>
          }
          subtitle="Every project gets the same care — whether it's a landing page or a long-form product."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{
                duration: 0.7,
                delay: index * 0.06,
                ease: [0.22, 1, 0.36, 1],
              }}
              whileHover={{ y: -4 }}
              className="group relative rounded-2xl border border-canvas/[0.06] bg-canvas/[0.02] p-7 lg:p-8 transition-colors duration-400 hover:border-violet/30 hover:bg-violet/[0.04]"
            >
              {/* index */}
              <span className="absolute top-5 right-6 micro-label text-graphite">
                / 0{index + 1}
              </span>

              {/* icon */}
              <div className="w-11 h-11 rounded-xl bg-violet/10 border border-violet/20 flex items-center justify-center mb-6">
                <service.icon className="text-violet-soft" size={20} />
              </div>

              <div className="flex items-center gap-2 mb-2">
                <h3 className="font-display text-2xl text-canvas">
                  {service.title}
                </h3>
                {service.spark && <span className="spark-dot" />}
              </div>

              <p className="text-graphite-soft text-sm leading-relaxed">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
