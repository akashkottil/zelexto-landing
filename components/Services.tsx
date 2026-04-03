"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import {
  Rocket,
  Brain,
  ShoppingCart,
  Globe,
  Server,
  Megaphone,
} from "lucide-react";
import GlassCard from "./GlassCard";
import SectionHeading from "./SectionHeading";

const services = [
  {
    icon: Rocket,
    title: "MVP & App Development",
    description:
      "Launch your product fast with scalable, production-ready MVPs built with modern tech stacks.",
  },
  {
    icon: Brain,
    title: "AI Integration",
    description:
      "Supercharge your product with AI — chatbots, automation, recommendations, and intelligent workflows.",
  },
  {
    icon: ShoppingCart,
    title: "Shopify E-commerce Setup",
    description:
      "Complete Shopify store setup with custom themes, payment integration, and conversion optimization.",
  },
  {
    icon: Globe,
    title: "Web & Landing Pages",
    description:
      "High-converting websites and landing pages that look premium and drive real business results.",
  },
  {
    icon: Server,
    title: "Backend & APIs",
    description:
      "Robust backend systems, REST/GraphQL APIs, database design, and cloud infrastructure.",
  },
  {
    icon: Megaphone,
    title: "Digital Marketing",
    description:
      "Growth strategies, SEO, social media marketing, and paid ads to scale your brand online.",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

export default function Services() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], [100, -100]);

  return (
    <section id="services" ref={sectionRef} className="relative py-32 px-4 sm:px-6 overflow-hidden">
      {/* Parallax background orb */}
      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full opacity-[0.03] pointer-events-none"
        style={{
          y: bgY,
          background: "radial-gradient(circle, #ffffff, transparent 70%)",
          filter: "blur(80px)",
          top: "20%",
          left: "-10%",
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        <SectionHeading
          tag="What We Do"
          title="Services That Drive Growth"
          subtitle="Everything you need to build, launch, and scale your startup — all under one roof."
        />

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {services.map((service) => (
            <motion.div key={service.title} variants={cardVariants}>
              <GlassCard className="h-full group">
                <motion.div
                  className="w-12 h-12 rounded-xl bg-white/[0.06] flex items-center justify-center mb-4"
                  whileHover={{ rotate: 10, scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <service.icon className="text-[#F5F5F5] group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.3)] transition-all duration-300" size={24} />
                </motion.div>
                <h3 className="text-xl font-semibold font-[family-name:var(--font-space-grotesk)] text-[#F5F5F5] mb-2 group-hover:text-white transition-colors duration-300">
                  {service.title}
                </h3>
                <p className="text-[#888] text-sm leading-relaxed">
                  {service.description}
                </p>
              </GlassCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
