"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import SectionHeading from "./SectionHeading";

const projects = [
  {
    title: "AI Fitness App",
    category: "Mobile · iOS / Android",
    description:
      "AI-powered training and nutrition app — personalised, editorial, and quietly powerful.",
    tags: ["React Native", "AI/ML", "Node.js"],
  },
  {
    title: "Shopify Editorial",
    category: "E-commerce",
    description:
      "A premium Shopify store with custom theme and a 3× lift in conversion.",
    tags: ["Shopify", "Liquid", "Theme Dev"],
  },
  {
    title: "SaaS Dashboard",
    category: "Web · Product",
    description:
      "Analytics dashboard with real-time data, dark mode, and a design system from day one.",
    tags: ["Next.js", "TypeScript", "PostgreSQL"],
  },
];

function ProjectVisual({
  large = false,
  index = 0,
}: {
  large?: boolean;
  index?: number;
}) {
  return (
    <div
      className={`relative overflow-hidden ${
        large ? "h-72 lg:h-[420px]" : "h-44"
      }`}
      style={{
        background:
          "linear-gradient(135deg, rgba(108,92,231,0.18), rgba(11,16,32,0.6))",
      }}
    >
      {/* fine grid */}
      <div
        className="absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(245,244,240,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(245,244,240,0.4) 1px, transparent 1px)",
          backgroundSize: large ? "32px 32px" : "22px 22px",
        }}
      />

      {/* abstract mockup card */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div
          className="rounded-2xl border border-canvas/20 backdrop-blur-sm overflow-hidden"
          style={{
            width: large ? "62%" : "70%",
            height: large ? "68%" : "70%",
            background: "rgba(11,16,32,0.6)",
            transform: `rotate(${index % 2 === 0 ? "-3deg" : "4deg"})`,
            boxShadow: "0 18px 40px rgba(108,92,231,0.28)",
          }}
        >
          <div className="h-6 border-b border-canvas/10 flex items-center px-3 gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-canvas/30" />
            <span className="w-1.5 h-1.5 rounded-full bg-canvas/30" />
            <span className="w-1.5 h-1.5 rounded-full bg-violet/60" />
          </div>
          <div className="p-4 space-y-2">
            <div className="h-2 rounded bg-canvas/15 w-3/4" />
            <div className="h-2 rounded bg-violet/40 w-1/2" />
            <div className="mt-4 h-12 rounded-lg bg-canvas/[0.04] border border-canvas/10" />
            <div className="grid grid-cols-3 gap-1.5">
              <div className="h-6 rounded bg-canvas/[0.04] border border-canvas/10" />
              <div className="h-6 rounded bg-violet/20 border border-violet/30" />
              <div className="h-6 rounded bg-canvas/[0.04] border border-canvas/10" />
            </div>
          </div>
        </div>
      </div>

      {/* lime spark corner */}
      <span
        className="absolute top-4 left-4 spark-dot"
        style={{ animationDelay: `${index * 0.3}s` }}
      />

      {/* hover arrow */}
      <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="w-9 h-9 rounded-full bg-violet text-canvas flex items-center justify-center">
          <ArrowUpRight size={16} />
        </div>
      </div>
    </div>
  );
}

export default function Portfolio() {
  return (
    <section
      id="portfolio"
      className="relative py-28 lg:py-36 px-6 overflow-hidden"
    >
      <div
        className="absolute w-[500px] h-[500px] rounded-full opacity-[0.13] pointer-events-none drift"
        style={{
          background:
            "radial-gradient(circle, rgba(108,92,231,0.55), transparent 70%)",
          filter: "blur(120px)",
          top: "30%",
          right: "-10%",
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        <SectionHeading
          tag="Selected work"
          version="/ 05"
          title={
            <>
              Recent <span className="italic-violet">things.</span>
            </>
          }
          subtitle="A glimpse into what we build — more on request."
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Featured */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ y: -4 }}
            className="lg:row-span-2 group rounded-3xl border border-canvas/[0.06] bg-canvas/[0.02] overflow-hidden hover:border-violet/30 transition-colors duration-400 cursor-pointer"
          >
            <ProjectVisual large index={0} />
            <div className="p-7 lg:p-8">
              <span className="micro-label block mb-2 text-violet-soft">
                {projects[0].category}
              </span>
              <h3 className="font-display text-3xl lg:text-4xl text-canvas mb-3">
                {projects[0].title}
              </h3>
              <p className="text-graphite-soft text-base leading-relaxed mb-5 max-w-lg">
                {projects[0].description}
              </p>
              <div className="flex flex-wrap gap-2">
                {projects[0].tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 rounded-full text-[11px] bg-canvas/[0.04] text-graphite-soft border border-canvas/[0.08]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Smaller */}
          {projects.slice(1).map((project, idx) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{
                duration: 0.7,
                delay: (idx + 1) * 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
              whileHover={{ y: -4 }}
              className="group rounded-3xl border border-canvas/[0.06] bg-canvas/[0.02] overflow-hidden hover:border-violet/30 transition-colors duration-400 cursor-pointer"
            >
              <ProjectVisual index={idx + 1} />
              <div className="p-6">
                <span className="micro-label block mb-2 text-violet-soft">
                  {project.category}
                </span>
                <h3 className="font-display text-2xl text-canvas mb-2">
                  {project.title}
                </h3>
                <p className="text-graphite-soft text-sm leading-relaxed mb-4">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-0.5 rounded-full text-[10px] bg-canvas/[0.04] text-graphite-soft border border-canvas/[0.08]"
                    >
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
