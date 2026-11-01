"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { useLoaded } from "./loaderState";

// WebGL sculpture loads after first paint and never on the server.
const HeroRibbon = dynamic(() => import("./HeroRibbon"), { ssr: false });

/** Fixed layer behind <main>: the ribbon travels from the hero into the services section. */
export default function RibbonStage() {
  const ready = useLoaded();
  return (
    <motion.div
      className="fixed inset-0 z-0 pointer-events-none"
      initial={{ opacity: 0, scale: 0.94 }}
      animate={ready ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.94 }}
      transition={{ duration: 1.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
    >
      <HeroRibbon className="w-full h-full" />
    </motion.div>
  );
}
