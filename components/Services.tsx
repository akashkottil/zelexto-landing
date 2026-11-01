"use client";

import { useRef, useState } from "react";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { ArrowRight } from "lucide-react";

/**
 * Pinned, type-only services list. Scrolling steps through the six crafts; the active index is
 * published on the section's data-active so the fixed ribbon (HeroRibbon) can strike a matching pose.
 */

const services = [
  {
    name: "Websites",
    line: "Marketing sites and storefronts that load fast, read clearly and turn visits into enquiries.",
    tags: ["Next.js", "Shopify", "Webflow"],
  },
  {
    name: "Apps",
    line: "iOS, Android and web apps with one design system from the first screen to the store launch.",
    tags: ["React Native", "Swift", "Product design"],
  },
  {
    name: "AI agents",
    line: "Assistants that answer, book and follow up, wired into the tools your team already uses.",
    tags: ["LLM agents", "Automation", "Integrations"],
  },
  {
    name: "Brand identity",
    line: "Names, marks and visual systems that stay recognisable at every size.",
    tags: ["Identity", "Type", "Guidelines"],
  },
  {
    name: "Digital marketing",
    line: "Search, social and paid campaigns, measured against the numbers that matter to you.",
    tags: ["SEO", "Paid social", "Analytics"],
  },
  {
    name: "Development",
    line: "Senior engineering for platforms, APIs and integrations, shipped in short, visible sprints.",
    tags: ["APIs", "Cloud", "QA"],
  },
];

export default function Services() {
  const ref = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  useMotionValueEvent(scrollYProgress, "change", (p) => {
    const i = Math.min(services.length - 1, Math.floor(p * services.length));
    if (i !== active) setActive(i);
  });

  // Clicking a name scrolls to the middle of its step, so the list stays driven by scroll.
  const jump = (i: number) => {
    const el = ref.current;
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY;
    const travel = el.offsetHeight - window.innerHeight;
    window.scrollTo({ top: top + ((i + 0.5) / services.length) * travel, behavior: "smooth" });
  };

  return (
    <section
      id="services"
      ref={ref}
      data-active={active}
      className="relative"
      style={{ height: `${services.length * 65 + 100}vh` }}
    >
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        <div className="max-w-[1400px] h-full mx-auto px-6 lg:px-10 grid lg:grid-cols-2 items-end lg:items-center pb-10 lg:pb-0">
          {/* left half is the ribbon's stage */}
          <div className="hidden lg:block" />

          <div className="relative">
            <div className="flex items-center justify-between micro-label mb-6 lg:mb-8">
              <span>What we build</span>
              <span className="tabular-nums">
                0{active + 1} <span className="text-graphite">/ 0{services.length}</span>
              </span>
            </div>

            <h2
              className="hidden lg:block font-display text-canvas text-5xl xl:text-6xl leading-[0.95] mb-10"
              style={{ letterSpacing: "-0.03em" }}
            >
              Six crafts. One <span className="italic-violet">studio.</span>
            </h2>

            <div className="relative pl-5 lg:pl-6">
              {/* progress rail */}
              <span className="absolute left-0 top-1 bottom-1 w-px bg-canvas/10" />
              <motion.span
                className="absolute left-0 top-1 bottom-1 w-px bg-canvas origin-top"
                style={{ scaleY: scrollYProgress }}
              />

              <ul>
                {services.map((s, i) => {
                  const on = i === active;
                  return (
                    <li key={s.name}>
                      <button
                        type="button"
                        onClick={() => jump(i)}
                        aria-current={on}
                        className={`group w-full flex items-baseline gap-4 text-left py-1 lg:py-1.5 transition-colors duration-500 ${
                          on ? "text-canvas" : "text-graphite hover:text-graphite-soft"
                        }`}
                      >
                        <span className="font-mono text-[10px] tracking-[0.2em] w-6 shrink-0">0{i + 1}</span>
                        <span
                          className="font-display leading-[1.05] text-[1.7rem] sm:text-4xl xl:text-[3.1rem]"
                          style={{ letterSpacing: "-0.025em" }}
                        >
                          {s.name}
                        </span>
                        <ArrowRight
                          size={20}
                          className={`ml-auto self-center transition-all duration-500 ${
                            on ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-3"
                          }`}
                        />
                      </button>

                      {/* grid-rows 0fr→1fr instead of a height:auto animation: framer measures auto heights by
                          calling scrollTo, which cancels any smooth scroll (the navbar's anchor links) passing through */}
                      <div
                        className={`grid transition-[grid-template-rows,opacity] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                          on ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                        }`}
                        aria-hidden={!on}
                      >
                        <div className="overflow-hidden">
                          <div className="pl-10 pt-2 pb-4 lg:pb-5">
                            <p className="text-graphite-soft text-[15px] lg:text-base leading-relaxed max-w-md">{s.line}</p>
                            <p className="mt-3 micro-label">{s.tags.join("  ·  ")}</p>
                          </div>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
