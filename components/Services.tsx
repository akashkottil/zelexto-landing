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
import SectionHeading from "./SectionHeading";

const services = [
  {
    icon: Rocket,
    title: "MVP & App Development",
    description:
      "Launch your product fast with scalable, production-ready MVPs built with modern tech stacks.",
    tag: "Most Popular",
  },
  {
    icon: Brain,
    title: "AI Integration",
    description:
      "Supercharge your product with AI — chatbots, automation, recommendations, and intelligent workflows.",
    tag: "Trending",
  },
  {
    icon: ShoppingCart,
    title: "Shopify E-commerce",
    description:
      "Complete Shopify store setup with custom themes, payment integration, and conversion optimization.",
    tag: null,
  },
  {
    icon: Globe,
    title: "Web & Landing Pages",
    description:
      "High-converting websites and landing pages that look premium and drive real business results.",
    tag: null,
  },
  {
    icon: Server,
    title: "Backend & APIs",
    description:
      "Robust backend systems, REST/GraphQL APIs, database design, and cloud infrastructure.",
    tag: null,
  },
  {
    icon: Megaphone,
    title: "Digital Marketing",
    description:
      "Growth strategies, SEO, social media marketing, and paid ads to scale your brand online.",
    tag: null,
  },
];

export default function Services() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], [100, -100]);

  return (
    <section id="services" ref={sectionRef} className="relative py-32 lg:py-40 px-6 overflow-hidden">
      <motion.div
        className="absolute w-[600px] h-[600px] rounded-full opacity-[0.04] pointer-events-none"
        style={{
          y: bgY,
          background: "radial-gradient(circle, #ff6b6b, transparent 70%)",
          filter: "blur(100px)",
          top: "10%",
          left: "-15%",
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        <SectionHeading
          tag="Services"
          title="What we build"
          subtitle="Everything you need to go from idea to scale — under one roof."
        />

        {/* Bento grid layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -6 }}
              className={`group relative rounded-2xl border border-white/[0.06] bg-white/[0.02] p-7 lg:p-8 transition-all duration-500 hover:border-[#ff6b6b]/20 hover:bg-white/[0.04] ${
                index < 2 ? "lg:row-span-1" : ""
              }`}
              data-hover
            >
              {/* Tag */}
              {service.tag && (
                <span className="absolute top-5 right-5 px-3 py-1 rounded-full text-[10px] uppercase tracking-[0.15em] font-medium bg-[#ff6b6b]/10 text-[#ff6b6b] border border-[#ff6b6b]/20">
                  {service.tag}
                </span>
              )}

              <motion.div
                className="w-11 h-11 rounded-xl bg-white/[0.05] flex items-center justify-center mb-5"
                whileHover={{ rotate: 8, scale: 1.1 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <service.icon className="text-[#ff6b6b]" size={20} />
              </motion.div>

              <h3 className="text-lg font-semibold font-[family-name:var(--font-space-grotesk)] text-[#F5F5F5] mb-2.5 group-hover:text-[#ff6b6b] transition-colors duration-300">
                {service.title}
              </h3>
              <p className="text-[#666] text-sm leading-relaxed">
                {service.description}
              </p>

              {/* Hover arrow */}
              <motion.div
                className="absolute bottom-7 right-7 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                whileHover={{ x: 3 }}
              >
                <span className="text-[#ff6b6b] text-lg">→</span>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
