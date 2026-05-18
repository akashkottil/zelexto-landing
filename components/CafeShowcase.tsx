"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import SectionHeading from "./SectionHeading";

type Cafe = {
  slug: string;
  brand: string;
  tagline: string;
  style: string;
  description: string;
  url: string;
  /** Tailwind-arbitrary gradient used behind the iframe while it loads, and as a fallback if framed embedding is blocked. */
  bg: string;
  accent: string;
};

const cafes: Cafe[] = [
  {
    slug: "cafe-noir",
    brand: "Zelexto Cafe",
    tagline: "Crafted coffee. Timeless experience.",
    style: "Dark Editorial Luxury",
    description:
      "Espresso black, soft gold accents and cinematic photography — built for premium hospitality brands.",
    url: "https://zelexto.github.io/cafe-noir/",
    bg: "linear-gradient(135deg, #1a120a 0%, #0b0805 100%)",
    accent: "#C8A24B",
  },
  {
    slug: "cafe-linen",
    brand: "Zelexto Nordic Cafe",
    tagline: "Slow mornings. Crafted coffee.",
    style: "Scandinavian Minimal",
    description:
      "Warm whites, cream and sand surfaces, editorial serif headings and generous whitespace.",
    url: "https://zelexto.github.io/cafe-linen/",
    bg: "linear-gradient(135deg, #efe7d8 0%, #d8c9ad 100%)",
    accent: "#8b6f47",
  },
  {
    slug: "cafe-smash",
    brand: "Zelexto Smash Burgers",
    tagline: "Burgers worth every bite.",
    style: "Bold Street Food",
    description:
      "Smash burgers crafted with juicy precision — unapologetic street-food energy.",
    url: "https://zelexto.github.io/cafe-smash/",
    bg: "linear-gradient(135deg, #2a0f0a 0%, #0c0402 100%)",
    accent: "#ff5a2c",
  },
  {
    slug: "cafe-bloom",
    brand: "Zelexto Bloom Bakery",
    tagline: "Freshly baked comfort, every morning.",
    style: "Boutique Bakery",
    description:
      "Handcrafted pastries and slow mornings — soft pinks, cream tones and editorial warmth.",
    url: "https://zelexto.github.io/cafe-bloom/",
    bg: "linear-gradient(135deg, #f7e0d6 0%, #e8b8a0 100%)",
    accent: "#c97a5a",
  },
  {
    slug: "cafe-analog",
    brand: "Zelexto Roastery House",
    tagline: "Roasted slow, served bold.",
    style: "Artisan Vintage",
    description:
      "Bold artisan coffee roastery with vinyl-night personality. Small batch, served hot.",
    url: "https://zelexto.github.io/cafe-analog/",
    bg: "linear-gradient(135deg, #3b1f10 0%, #160a04 100%)",
    accent: "#d4843a",
  },
  {
    slug: "cafe-garden",
    brand: "Zelexto Garden Cafe",
    tagline: "Coffee in harmony with nature.",
    style: "Botanical Luxury",
    description:
      "Sunlight, greenery and slow living. Single-origin coffee meets botanical elegance.",
    url: "https://zelexto.github.io/cafe-garden/",
    bg: "linear-gradient(135deg, #243a2a 0%, #0d1a13 100%)",
    accent: "#a8c79a",
  },
  {
    slug: "cafe-hearth",
    brand: "Zelexto Hearth Cafe",
    tagline: "Coffee crafted for slow mornings.",
    style: "Editorial Slow-Living",
    description:
      "A peaceful, conversation-first cafe space — warm amber tones and tactile materials.",
    url: "https://zelexto.github.io/cafe-hearth/",
    bg: "linear-gradient(135deg, #2c1d12 0%, #120a05 100%)",
    accent: "#e3a86b",
  },
  {
    slug: "cafe-solene",
    brand: "Zelexto Solene Cafe",
    tagline: "Slow brunches, sunlit conversations.",
    style: "Mediterranean Brunch",
    description:
      "Olive tones, sunlit interiors and artisan coffee — Mediterranean mornings that don't end.",
    url: "https://zelexto.github.io/cafe-solene/",
    bg: "linear-gradient(135deg, #e7dcc4 0%, #b8a574 100%)",
    accent: "#6b7a3d",
  },
  {
    slug: "cafe-neon",
    brand: "Zelexto Pulse Cafe",
    tagline: "Coffee meets future culture.",
    style: "Futuristic Cyberpunk",
    description:
      "Matte black with neon-amber glow, glassmorphism panels and asymmetric overlapping layouts.",
    url: "https://zelexto.github.io/cafe-neon/",
    bg: "linear-gradient(135deg, #1a0f02 0%, #050200 100%)",
    accent: "#ff9a1f",
  },
];

function CafeCard({ cafe, index }: { cafe: Cafe; index: number }) {
  return (
    <motion.a
      href={cafe.url}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        duration: 0.7,
        delay: (index % 3) * 0.08,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{ y: -4 }}
      className="group block rounded-3xl border border-canvas/[0.06] bg-canvas/[0.02] overflow-hidden hover:border-violet/30 transition-colors duration-400"
    >
      {/* Preview frame */}
      <div
        className="relative h-64 lg:h-72 overflow-hidden border-b border-canvas/[0.06]"
        style={{ background: cafe.bg }}
      >
        {/* Lazy live iframe — scaled to look like a desktop preview */}
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            transform: "scale(0.32)",
            transformOrigin: "top left",
            width: "312.5%",
            height: "312.5%",
          }}
        >
          <iframe
            src={cafe.url}
            title={`${cafe.brand} live preview`}
            loading="lazy"
            referrerPolicy="no-referrer"
            sandbox="allow-scripts allow-same-origin"
            className="w-full h-full border-0 bg-transparent"
          />
        </div>

        {/* Soft top-down gradient so text/labels read cleanly */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(180deg, rgba(11,16,32,0) 60%, rgba(11,16,32,0.55) 100%)",
          }}
        />

        {/* Style chip */}
        <span
          className="absolute top-4 left-4 micro-label px-2.5 py-1 rounded-full bg-ink/70 backdrop-blur-sm border border-canvas/[0.12]"
          style={{ color: cafe.accent }}
        >
          {cafe.style}
        </span>

        {/* Hover arrow */}
        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="w-9 h-9 rounded-full bg-violet text-canvas flex items-center justify-center">
            <ArrowUpRight size={16} />
          </div>
        </div>
      </div>

      {/* Meta */}
      <div className="p-6 lg:p-7">
        <span className="micro-label block mb-2 text-violet-soft">
          {cafe.slug}
        </span>
        <h3 className="font-display text-2xl lg:text-3xl text-canvas mb-2 leading-tight">
          {cafe.brand}
        </h3>
        <p className="text-graphite-soft text-sm lg:text-[15px] leading-relaxed mb-5">
          {cafe.description}
        </p>
        <div className="flex items-center justify-between">
          <span className="text-[12px] text-graphite font-mono truncate max-w-[70%]">
            {cafe.url.replace("https://", "")}
          </span>
          <span className="inline-flex items-center gap-1.5 text-[12px] text-violet-soft group-hover:text-canvas transition-colors duration-300">
            View live
            <ArrowUpRight
              size={12}
              className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </span>
        </div>
      </div>
    </motion.a>
  );
}

export default function CafeShowcase() {
  return (
    <section className="relative pt-32 pb-28 lg:pt-40 lg:pb-36 px-6 overflow-hidden">
      <div
        className="absolute w-[500px] h-[500px] rounded-full opacity-[0.13] pointer-events-none drift"
        style={{
          background:
            "radial-gradient(circle, rgba(108,92,231,0.55), transparent 70%)",
          filter: "blur(120px)",
          top: "20%",
          right: "-10%",
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        <SectionHeading
          tag="Cafe collection"
          version={`/ ${cafes.length.toString().padStart(2, "0")}`}
          title={
            <>
              Cafe <span className="italic-violet">themes.</span>
            </>
          }
          subtitle="Nine production-ready hospitality websites — each one a distinct visual language. Click any card to open the live demo."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
          {cafes.map((cafe, idx) => (
            <CafeCard key={cafe.slug} cafe={cafe} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}
