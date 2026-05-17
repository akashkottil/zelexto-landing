"use client";

import { useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import { Menu, X } from "lucide-react";
import Logo from "./Logo";

const navLinks = [
  { label: "Services", href: "#services" },
  { label: "Process", href: "#process" },
  { label: "Work", href: "#portfolio" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 40);
  });

  return (
    <>
      {/* Desktop — floating center pill */}
      <motion.nav
        className="fixed top-5 left-1/2 -translate-x-1/2 z-50 hidden md:block"
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
      >
        <div
          className={`flex items-center gap-1 rounded-full px-2 py-1.5 transition-all duration-500 ${
            scrolled
              ? "bg-ink/70 backdrop-blur-xl border border-violet/20 shadow-[0_8px_30px_rgba(11,16,32,0.35)]"
              : "bg-ink/40 backdrop-blur-md border border-canvas/[0.06]"
          }`}
        >
          {/* Logo */}
          <a href="#" className="flex items-center pl-3 pr-4 py-1.5">
            <Logo variant="wordmark" size="sm" />
          </a>

          <span className="w-px h-4 bg-canvas/10" />

          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="relative px-4 py-2 text-[13px] text-graphite-soft hover:text-canvas transition-colors duration-300 rounded-full hover:bg-canvas/[0.04] group"
              style={{ fontFamily: "var(--font-geist), sans-serif" }}
            >
              {link.label}
              <span className="absolute left-1/2 -translate-x-1/2 bottom-1.5 w-1 h-1 rounded-full bg-lime opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </a>
          ))}

          <span className="w-px h-4 bg-canvas/10" />

          <motion.a
            href="https://wa.me/918590090380"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-violet px-5 py-2 rounded-full text-[13px] font-medium ml-1"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            Start a project
          </motion.a>
        </div>
      </motion.nav>

      {/* Mobile navbar */}
      <motion.nav
        className="fixed top-0 left-0 right-0 z-50 md:hidden"
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div
          className={`transition-all duration-400 ${
            scrolled
              ? "bg-ink/85 backdrop-blur-xl border-b border-violet/15"
              : "bg-transparent"
          }`}
        >
          <div className="flex items-center justify-between px-5 h-14">
            <a href="#">
              <Logo variant="wordmark" size="sm" />
            </a>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="text-canvas w-10 h-10 flex items-center justify-center rounded-full bg-canvas/[0.05] border border-canvas/10"
              aria-label="Menu"
            >
              {mobileOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              className="bg-ink/95 backdrop-blur-xl border-b border-violet/15"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="px-5 py-5 space-y-1">
                {navLinks.map((link, i) => (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    className="block text-graphite-soft hover:text-canvas transition-colors py-3 text-lg border-b border-canvas/[0.04] last:border-0"
                    onClick={() => setMobileOpen(false)}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    {link.label}
                  </motion.a>
                ))}
                <a
                  href="https://wa.me/918590090380"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block btn-violet px-5 py-3 rounded-full text-sm font-medium text-center mt-4"
                >
                  Start a project
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  );
}
