"use client";

import { useState } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { Menu, X } from "lucide-react";

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
    setScrolled(latest > 50);
  });

  return (
    <>
      {/* Desktop — Liquid floating center pill */}
      <motion.nav
        className="fixed top-5 left-1/2 -translate-x-1/2 z-50 hidden md:block"
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
      >
        <motion.div
          className={`flex items-center gap-1 rounded-full px-2 py-1.5 transition-all duration-700 ${
            scrolled
              ? "bg-white/[0.06] backdrop-blur-2xl border border-white/[0.08] shadow-2xl shadow-black/30"
              : "bg-white/[0.03] backdrop-blur-xl border border-white/[0.05]"
          }`}
          layout
        >
          {/* Logo */}
          <a
            href="#"
            className="flex items-center px-4 py-2"
            data-hover
          >
            <span className="text-[15px] font-bold font-[family-name:var(--font-space-grotesk)] text-[#F5F5F5] tracking-tight">
              zel<span className="text-[#ff6b6b]">exto</span>
            </span>
          </a>

          {/* Divider */}
          <div className="w-px h-4 bg-white/[0.08]" />

          {/* Links */}
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="relative px-4 py-2 text-[13px] text-[#888] hover:text-[#F5F5F5] transition-all duration-300 rounded-full hover:bg-white/[0.05] group"
              data-hover
            >
              {link.label}
              <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#ff6b6b] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </a>
          ))}

          {/* Divider */}
          <div className="w-px h-4 bg-white/[0.08]" />

          {/* CTA */}
          <motion.a
            href="https://wa.me/918590090380"
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2 rounded-full text-[13px] font-medium bg-[#ff6b6b] text-white hover:bg-[#ff8a8a] transition-colors duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            data-hover
          >
            Let&apos;s Talk
          </motion.a>
        </motion.div>
      </motion.nav>

      {/* Mobile navbar */}
      <motion.nav
        className="fixed top-0 left-0 right-0 z-50 md:hidden"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className={`transition-all duration-500 ${
          scrolled ? "bg-[#0a0a0a]/80 backdrop-blur-2xl border-b border-white/[0.05]" : "bg-transparent"
        }`}>
          <div className="flex items-center justify-between px-5 h-14">
            <a href="#" data-hover>
              <span className="text-lg font-bold font-[family-name:var(--font-space-grotesk)] text-[#F5F5F5] tracking-tight">
                zel<span className="text-[#ff6b6b]">exto</span>
              </span>
            </a>
            <motion.button
              onClick={() => setMobileOpen(!mobileOpen)}
              whileTap={{ scale: 0.9 }}
              className="text-white w-10 h-10 flex items-center justify-center rounded-full bg-white/[0.05]"
            >
              {mobileOpen ? <X size={18} /> : <Menu size={18} />}
            </motion.button>
          </div>
        </div>

        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              className="bg-[#0a0a0a]/95 backdrop-blur-2xl border-b border-white/[0.05]"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="px-5 py-5 space-y-1">
                {navLinks.map((link, i) => (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    className="block text-[#888] hover:text-[#F5F5F5] transition-colors py-3 text-lg border-b border-white/[0.03] last:border-0"
                    onClick={() => setMobileOpen(false)}
                    initial={{ opacity: 0, x: -15 }}
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
                  className="block btn-accent px-5 py-3 rounded-full text-sm font-medium text-center mt-4"
                >
                  Let&apos;s Talk
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  );
}
