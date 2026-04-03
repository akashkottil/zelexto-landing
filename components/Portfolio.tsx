"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import SectionHeading from "./SectionHeading";

const projects = [
  {
    title: "AI Fitness App",
    category: "Mobile App",
    description: "AI-powered fitness tracking with personalized workout plans and nutrition guidance.",
    tags: ["React Native", "AI/ML", "Node.js"],
    color: "#ff6b6b",
    size: "large",
  },
  {
    title: "Shopify Store",
    category: "E-commerce",
    description: "Premium store with custom theme, optimized checkout, and 3x conversion boost.",
    tags: ["Shopify", "Liquid", "Custom Theme"],
    color: "#888",
    size: "small",
  },
  {
    title: "SaaS Dashboard",
    category: "Web Application",
    description: "Modern analytics dashboard with real-time data and team collaboration.",
    tags: ["Next.js", "TypeScript", "PostgreSQL"],
    color: "#ff8a8a",
    size: "small",
  },
];

export default function Portfolio() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], [60, -60]);

  return (
    <section id="portfolio" ref={sectionRef} className="relative py-32 lg:py-40 px-6 overflow-hidden">
      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full opacity-[0.03] pointer-events-none"
        style={{
          y: bgY,
          background: "radial-gradient(circle, #ff6b6b, transparent 70%)",
          filter: "blur(100px)",
          top: "20%",
          right: "-10%",
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        <SectionHeading
          tag="Portfolio"
          title="Recent work"
          subtitle="A glimpse into what we build."
        />

        {/* Asymmetric grid — Shopify Editions style */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {/* Featured large card */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -8 }}
            className="lg:row-span-2 group rounded-3xl border border-white/[0.06] bg-white/[0.02] overflow-hidden hover:border-[#ff6b6b]/20 transition-all duration-500 cursor-pointer"
            data-hover
          >
            {/* Image area */}
            <div className="h-64 lg:h-[55%] relative overflow-hidden" style={{ background: `linear-gradient(135deg, ${projects[0].color}15, ${projects[0].color}05)` }}>
              <div
                className="absolute inset-0 opacity-[0.08]"
                style={{
                  backgroundImage: "linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)",
                  backgroundSize: "24px 24px",
                }}
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  className="w-20 h-20 rounded-2xl border border-white/10 bg-white/[0.05] backdrop-blur flex items-center justify-center"
                  animate={{ rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 6, repeat: Infinity }}
                >
                  <span className="text-3xl">🏋️</span>
                </motion.div>
              </div>
              <div className="absolute top-5 right-5 opacity-0 group-hover:opacity-100 transition-all duration-300">
                <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur flex items-center justify-center">
                  <ArrowUpRight size={18} className="text-white" />
                </div>
              </div>
            </div>

            <div className="p-7 lg:p-8">
              <span className="text-[11px] uppercase tracking-[0.2em] text-[#ff6b6b] mb-2 block">{projects[0].category}</span>
              <h3 className="text-2xl lg:text-3xl font-bold font-[family-name:var(--font-space-grotesk)] text-[#F5F5F5] mb-3 tracking-tight group-hover:text-[#ff6b6b] transition-colors duration-300">
                {projects[0].title}
              </h3>
              <p className="text-[#888] text-sm leading-relaxed mb-5">
                {projects[0].description}
              </p>
              <div className="flex flex-wrap gap-2">
                {projects[0].tags.map((tag) => (
                  <span key={tag} className="px-3 py-1 rounded-full text-[11px] bg-white/[0.04] text-[#888] border border-white/[0.06]">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Two smaller cards */}
          {projects.slice(1).map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, delay: (index + 1) * 0.1, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -6 }}
              className="group rounded-3xl border border-white/[0.06] bg-white/[0.02] overflow-hidden hover:border-[#ff6b6b]/20 transition-all duration-500 cursor-pointer"
              data-hover
            >
              <div className="h-40 relative overflow-hidden" style={{ background: `linear-gradient(135deg, ${project.color}12, ${project.color}04)` }}>
                <div
                  className="absolute inset-0 opacity-[0.06]"
                  style={{
                    backgroundImage: "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
                    backgroundSize: "20px 20px",
                  }}
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-2xl">{index === 0 ? "🛍️" : "📊"}</span>
                </div>
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <div className="w-8 h-8 rounded-full bg-white/10 backdrop-blur flex items-center justify-center">
                    <ArrowUpRight size={14} className="text-white" />
                  </div>
                </div>
              </div>

              <div className="p-6">
                <span className="text-[11px] uppercase tracking-[0.2em] text-[#666] mb-1.5 block">{project.category}</span>
                <h3 className="text-lg font-semibold font-[family-name:var(--font-space-grotesk)] text-[#F5F5F5] mb-2 tracking-tight group-hover:text-[#ff6b6b] transition-colors duration-300">
                  {project.title}
                </h3>
                <p className="text-[#666] text-sm leading-relaxed mb-4">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span key={tag} className="px-2.5 py-0.5 rounded-full text-[10px] bg-white/[0.04] text-[#888] border border-white/[0.06]">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
