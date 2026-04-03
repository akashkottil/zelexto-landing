"use client";

import { motion } from "framer-motion";
import { Lightbulb, Cloud, Store, TrendingUp } from "lucide-react";
import SectionHeading from "./SectionHeading";

const audiences = [
  {
    icon: Lightbulb,
    title: "Startup Founders",
    description: "Turn your idea into a funded, market-ready product.",
  },
  {
    icon: Cloud,
    title: "SaaS Builders",
    description: "Build scalable SaaS platforms with modern architecture.",
  },
  {
    icon: Store,
    title: "E-commerce Brands",
    description: "Launch and grow your online store with proven strategies.",
  },
  {
    icon: TrendingUp,
    title: "Entrepreneurs",
    description: "From side hustle to full business — we help you scale.",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.4 } },
};

export default function Audience() {
  return (
    <section className="relative py-32 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          tag="Who We Serve"
          title="Built for Builders"
          subtitle="Whether you're bootstrapping or scaling — we've got you covered."
        />

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {audiences.map((item) => (
            <motion.div
              key={item.title}
              variants={itemVariants}
              whileHover={{ y: -8, scale: 1.03 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="glass rounded-2xl p-6 text-center group hover:border-white/20 transition-all duration-300 cursor-default relative overflow-hidden"
              data-hover
            >
              {/* Hover glow — white */}
              <div className="absolute inset-0 bg-gradient-to-b from-white/[0.01] to-white/[0.03] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative z-10">
                <motion.div
                  className="w-12 h-12 rounded-full bg-white/[0.06] flex items-center justify-center mx-auto mb-4"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <item.icon className="text-[#F5F5F5]" size={22} />
                </motion.div>
                <h3 className="text-lg font-semibold font-[family-name:var(--font-space-grotesk)] text-[#F5F5F5] mb-1">
                  {item.title}
                </h3>
                <p className="text-[#888] text-sm">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
