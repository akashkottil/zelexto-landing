"use client";

import { useRef, useState, useSyncExternalStore } from "react";
import {
  AnimatePresence,
  motion,
  MotionValue,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";

/**
 * Filterable concept gallery. Cards fill three columns that drift at different speeds as the page
 * scrolls (website shots outside, phone screens in the middle), and each card tilts toward the cursor.
 */

type Kind = "Websites" | "Apps" | "E-commerce" | "AI";
type Project = { name: string; what: string; kind: Kind; img: string; phone?: boolean };

const projects: Project[] = [
  { name: "Halcyon Stays", what: "Boutique hotels", kind: "Websites", img: "/work/halcyon.jpg" },
  { name: "Pulse", what: "Fitness wearable", kind: "Apps", img: "/work/pulse-mobile.jpg", phone: true },
  { name: "Nuvia", what: "AI agents for support", kind: "AI", img: "/work/nuvia.jpg" },
  { name: "Kinfolk Labs", what: "Wellness store", kind: "E-commerce", img: "/work/kinfolk.jpg" },
  { name: "Ledgerly", what: "Personal wealth", kind: "Apps", img: "/work/ledgerly-mobile.jpg", phone: true },
  { name: "Atelier Verde", what: "Interior architecture", kind: "Websites", img: "/work/verde.jpg" },
  { name: "Soundfield 2027", what: "Music festival", kind: "Websites", img: "/work/soundfield.jpg" },
  { name: "Fieldnotes", what: "Gear for makers", kind: "E-commerce", img: "/work/fieldnotes-mobile.jpg", phone: true },
  { name: "Velocity Garage", what: "Classic car restoration", kind: "Websites", img: "/work/velocity.jpg" },
  { name: "Hearthside Kitchen", what: "Restaurant & recipes", kind: "Websites", img: "/work/hearthside.jpg" },
];

const filters = ["All", "Websites", "Apps", "E-commerce", "AI"] as const;
type Filter = (typeof filters)[number];

// Column count follows the same breakpoints as Tailwind's sm / lg.
const subscribeWidth = (cb: () => void) => {
  window.addEventListener("resize", cb);
  return () => window.removeEventListener("resize", cb);
};
const readColumns = () => (window.innerWidth >= 1024 ? 3 : window.innerWidth >= 640 ? 2 : 1);

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number];

function Card({ p, n }: { p: Project; n: number }) {
  const reduce = useReducedMotion();
  const rx = useMotionValue(0), ry = useMotionValue(0);
  const rotateX = useSpring(rx, { stiffness: 150, damping: 18 });
  const rotateY = useSpring(ry, { stiffness: 150, damping: 18 });

  const tilt = (e: React.PointerEvent<HTMLDivElement>) => {
    if (reduce || e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    rx.set(((e.clientY - r.top) / r.height - 0.5) * -8);
    ry.set(((e.clientX - r.left) / r.width - 0.5) * 10);
  };
  const reset = () => {
    rx.set(0);
    ry.set(0);
  };

  return (
    <motion.figure
      layout
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.6, ease }}
      className="group"
    >
      <div style={{ perspective: 1000 }} onPointerMove={tilt} onPointerLeave={reset}>
        <motion.div
          style={{ rotateX, rotateY }}
          className={`relative overflow-hidden rounded-2xl ${
            p.phone ? "aspect-[4/5] bg-canvas/[0.05] flex items-end justify-center" : "aspect-[16/10] bg-canvas/[0.04]"
          }`}
        >
          {p.phone ? (
            <div className="relative w-[50%] translate-y-[14%] rounded-[1.6rem] p-[5px] bg-canvas/10 shadow-[0_30px_60px_rgba(0,0,0,0.25)] transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-[8%]">
              {/* eslint-disable-next-line @next/next/no-img-element -- static export, images are pre-sized */}
              <img src={p.img} alt={`${p.name} app concept`} loading="lazy" className="w-full rounded-[1.3rem] aspect-[9/19.5] object-cover object-top" />
            </div>
          ) : (
            // eslint-disable-next-line @next/next/no-img-element -- static export, images are pre-sized
            <img
              src={p.img}
              alt={`${p.name} website concept`}
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-[1.2s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.05]"
            />
          )}
        </motion.div>
      </div>
      <figcaption className="mt-4 flex items-baseline gap-3">
        <span className="font-mono text-[10px] tracking-[0.2em] text-graphite">{String(n).padStart(2, "0")}</span>
        <span>
          <span className="block font-display text-canvas text-2xl" style={{ letterSpacing: "-0.02em" }}>
            {p.name}
          </span>
          <span className="block micro-label mt-1">
            {p.what} · {p.kind}
          </span>
        </span>
      </figcaption>
    </motion.figure>
  );
}

function Column({ items, shift, progress, pad }: { items: { p: Project; n: number }[]; shift: [number, number]; progress: MotionValue<number>; pad: string }) {
  const reduce = useReducedMotion();
  const y = useTransform(progress, (v) => (reduce ? 0 : shift[0] + (shift[1] - shift[0]) * v));
  return (
    <motion.div style={{ y }} className={`flex flex-col gap-10 lg:gap-14 ${pad}`}>
      <AnimatePresence mode="popLayout">
        {items.map(({ p, n }) => (
          <Card key={p.name} p={p} n={n} />
        ))}
      </AnimatePresence>
    </motion.div>
  );
}

export default function Work() {
  const ref = useRef<HTMLDivElement>(null);
  const [filter, setFilter] = useState<Filter>("All");
  const cols = useSyncExternalStore(subscribeWidth, readColumns, () => 3);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });

  const shown = projects.map((p, i) => ({ p, n: i + 1 })).filter(({ p }) => filter === "All" || p.kind === filter);
  const columns = Array.from({ length: cols }, (_, c) => shown.filter((_, i) => i % cols === c));
  // Every column starts at 0 (so the server render matches with or without reduced motion) and rises at its
  // own rate; the middle (phones) starts lower and travels furthest, so the grid shears as it passes.
  const shifts: [number, number][] = cols === 3 ? [[0, -120], [0, -380], [0, -200]] : cols === 2 ? [[0, -80], [0, -200]] : [[0, 0]];
  const pads = cols === 3 ? ["", "lg:pt-40", "lg:pt-24"] : ["", "sm:pt-24"];

  return (
    <section id="work" className="relative px-6 lg:px-10 py-32 lg:py-44">
      <div className="max-w-[1400px] mx-auto">
        <div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <p className="micro-label mb-6">Selected work · {projects.length} concepts</p>
            <h2 className="font-display text-canvas text-5xl lg:text-7xl leading-[0.95] max-w-3xl" style={{ letterSpacing: "-0.03em" }}>
              Work that earns a <span className="italic-violet">second</span> look.
            </h2>
            <p className="mt-6 text-graphite-soft leading-relaxed max-w-md">
              Concept projects we design and build in-house to test ideas before they reach a client brief.
            </p>
          </div>

          <div className="flex flex-wrap gap-2" role="tablist" aria-label="Filter work">
            {filters.map((f) => {
              const count = f === "All" ? projects.length : projects.filter((p) => p.kind === f).length;
              const on = f === filter;
              return (
                <button
                  key={f}
                  type="button"
                  role="tab"
                  aria-selected={on}
                  onClick={() => setFilter(f)}
                  className={`relative px-4 py-2 rounded-full text-[13px] transition-colors duration-300 ${
                    on ? "text-ink" : "text-graphite-soft hover:text-canvas border border-canvas/10"
                  }`}
                >
                  {on && <motion.span layoutId="work-filter" className="absolute inset-0 rounded-full bg-canvas" transition={{ duration: 0.45, ease }} />}
                  <span className="relative">
                    {f} <span className="opacity-50 tabular-nums">{count}</span>
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div ref={ref} className="mt-20 lg:mt-28 grid gap-10 lg:gap-12 sm:grid-cols-2 lg:grid-cols-3 items-start">
          {columns.map((items, c) => (
            <Column key={`${cols}-${c}`} items={items} shift={shifts[c]} progress={scrollYProgress} pad={pads[c] ?? ""} />
          ))}
        </div>
      </div>
    </section>
  );
}
