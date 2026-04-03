"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ExternalLink } from "lucide-react";
import SectionHeading from "./SectionHeading";

const projects = [
  {
    title: "AI Fitness App",
    category: "Mobile App",
    description:
      "AI-powered fitness tracking with personalized workout plans and nutrition guidance.",
    gradient: "from-gray-600/30 to-gray-400/20",
    tags: ["React Native", "AI/ML", "Node.js"],
  },
  {
    title: "Shopify Store Demo",
    category: "E-commerce",
    description:
      "Premium Shopify store with custom theme, optimized checkout, and 3x conversion boost.",
    gradient: "from-gray-500/25 to-gray-700/20",
    tags: ["Shopify", "Liquid", "Custom Theme"],
  },
  {
    title: "SaaS Dashboard UI",
    category: "Web Application",
    description:
      "Modern analytics dashboard with real-time data visualization and team collaboration.",
    gradient: "from-gray-700/30 to-gray-500/20",
    tags: ["Next.js", "TypeScript", "PostgreSQL"],
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function Portfolio() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], [60, -60]);

  return (
    <section id="portfolio" ref={sectionRef} className="relative py-32 px-4 sm:px-6 overflow-hidden">
      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full opacity-[0.03] pointer-events-none"
        style={{
          y: bgY,
          background: "radial-gradient(circle, #ffffff, transparent 70%)",
          filter: "blur(80px)",
          top: "30%",
          right: "-10%",
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        <SectionHeading
          tag="Our Work"
          title="Projects We've Built"
          subtitle="A glimpse into what we create for startups and brands."
        />

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {projects.map((project) => (
            <motion.div
              key={project.title}
              variants={cardVariants}
              whileHover={{ y: -10 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="glass rounded-2xl overflow-hidden group hover:border-white/20 transition-all duration-300 cursor-pointer"
              data-hover
            >
              {/* Gradient placeholder image */}
              <div
                className={`h-48 bg-gradient-to-br ${project.gradient} flex items-center justify-center relative overflow-hidden transition-all duration-500`}
              >
                <div className="absolute inset-0 bg-[#111111]/30 group-hover:bg-[#111111]/10 transition-all duration-500" />

                {/* Animated grid overlay */}
                <div
                  className="absolute inset-0 opacity-10"
                  style={{
                    backgroundImage: "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
                    backgroundSize: "20px 20px",
                  }}
                />

                <span className="relative text-white/60 text-sm font-medium group-hover:text-white/80 transition-colors duration-300">
                  {project.category}
                </span>

                {/* External link icon */}
                <motion.div
                  className="absolute top-3 right-3"
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileHover={{ scale: 1.2 }}
                >
                  <div className="w-8 h-8 rounded-full bg-white/10 backdrop-blur flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <ExternalLink size={14} className="text-white" />
                  </div>
                </motion.div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-semibold font-[family-name:var(--font-space-grotesk)] text-[#F5F5F5] mb-2 group-hover:text-white transition-colors duration-300">
                  {project.title}
                </h3>
                <p className="text-[#888] text-sm leading-relaxed mb-4">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 rounded-full text-xs bg-white/5 text-[#888] border border-white/10 group-hover:border-white/20 group-hover:text-[#F5F5F5] transition-all duration-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
