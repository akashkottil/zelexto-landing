"use client";

import { motion } from "framer-motion";
import SectionHeading from "./SectionHeading";

const audiences = [
  {
    title: "Startup Founders",
    description: "Turn your idea into a funded, market-ready product.",
    icon: "🚀",
    accent: true,
  },
  {
    title: "SaaS Builders",
    description: "Build scalable SaaS platforms with modern architecture.",
    icon: "☁️",
    accent: false,
  },
  {
    title: "E-commerce Brands",
    description: "Launch and grow your online store with proven strategies.",
    icon: "🛍️",
    accent: false,
  },
  {
    title: "Entrepreneurs",
    description: "From side hustle to full business — we help you scale.",
    icon: "📈",
    accent: true,
  },
];

export default function Audience() {
  return (
    <section className="relative py-32 lg:py-40 px-6">
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          tag="Who We Serve"
          title="Built for builders"
          subtitle="Whether you're bootstrapping or scaling — we've got you."
        />

        {/* Horizontal scroll on mobile, grid on desktop */}
        <div className="flex lg:grid lg:grid-cols-4 gap-5 overflow-x-auto hide-scrollbar pb-4 lg:pb-0 -mx-6 px-6 lg:mx-0 lg:px-0">
          {audiences.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className={`min-w-[260px] lg:min-w-0 group p-7 rounded-2xl border transition-all duration-500 cursor-default ${
                item.accent
                  ? "border-[#ff6b6b]/15 bg-[#ff6b6b]/[0.03] hover:border-[#ff6b6b]/30"
                  : "border-white/[0.06] bg-white/[0.02] hover:border-white/[0.12]"
              }`}
              data-hover
            >
              <span className="text-4xl mb-5 block">{item.icon}</span>
              <h3 className={`text-lg font-semibold font-[family-name:var(--font-space-grotesk)] mb-2 tracking-tight ${
                item.accent ? "text-[#ff6b6b]" : "text-[#F5F5F5]"
              }`}>
                {item.title}
              </h3>
              <p className="text-[#666] text-sm leading-relaxed">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
