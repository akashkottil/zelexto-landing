"use client";

import { motion } from "framer-motion";
import { MessageCircle, Phone, ArrowUpRight } from "lucide-react";
import ContactForm from "./ContactForm";

export default function FinalCTA() {
  return (
    <section
      id="contact"
      className="relative py-28 lg:py-36 px-6 overflow-hidden"
    >
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div
          className="w-[900px] h-[900px] rounded-full opacity-[0.18] drift"
          style={{
            background:
              "radial-gradient(circle, rgba(108,92,231,0.55), transparent 60%)",
            filter: "blur(130px)",
          }}
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="micro-label inline-flex items-center gap-2 mb-6 text-violet-soft">
            <span className="spark-dot" />
            Let&apos;s talk
          </span>
          <h2
            className="font-display text-4xl md:text-5xl lg:text-7xl text-canvas leading-[1.02]"
            style={{ letterSpacing: "-0.03em" }}
          >
            A new era of <span className="italic-violet">digital.</span>
          </h2>
          <p className="mt-6 text-base lg:text-lg text-graphite-soft max-w-xl mx-auto leading-relaxed">
            Tell us about your product. We&apos;ll come back to you within 24
            hours.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="rounded-2xl border border-canvas/[0.06] bg-canvas/[0.02] p-8">
              <h3 className="font-display text-2xl text-canvas mb-1">
                Talk to a human
              </h3>
              <p className="text-graphite-soft text-sm mb-6">
                Hello@zelexto.com — or pick your channel.
              </p>

              <div className="space-y-3">
                <motion.a
                  href="https://wa.me/918590090380"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 rounded-xl border border-canvas/[0.06] bg-canvas/[0.02] hover:border-violet/30 hover:bg-violet/[0.04] transition-colors duration-300"
                  whileHover={{ x: 4 }}
                >
                  <div className="w-11 h-11 rounded-full bg-violet/15 border border-violet/30 flex items-center justify-center">
                    <MessageCircle className="text-violet-soft" size={20} />
                  </div>
                  <div className="flex-1">
                    <span className="text-canvas font-medium block text-sm">
                      WhatsApp
                    </span>
                    <span className="text-graphite-soft text-xs">
                      Replies in minutes
                    </span>
                  </div>
                  <ArrowUpRight size={16} className="text-graphite" />
                </motion.a>

                <motion.a
                  href="tel:+918590090380"
                  className="flex items-center gap-4 p-4 rounded-xl border border-canvas/[0.06] bg-canvas/[0.02] hover:border-violet/30 hover:bg-violet/[0.04] transition-colors duration-300"
                  whileHover={{ x: 4 }}
                >
                  <div className="w-11 h-11 rounded-full bg-violet/15 border border-violet/30 flex items-center justify-center">
                    <Phone className="text-violet-soft" size={20} />
                  </div>
                  <div className="flex-1">
                    <span className="text-canvas font-medium block text-sm">
                      Book a call
                    </span>
                    <span className="text-graphite-soft text-xs">
                      30-min, no pitch
                    </span>
                  </div>
                  <ArrowUpRight size={16} className="text-graphite" />
                </motion.a>
              </div>
            </div>

            {/* Coordinates */}
            <div className="rounded-2xl border border-canvas/[0.06] bg-canvas/[0.02] p-6">
              <span className="micro-label block mb-2">Studio</span>
              <p className="text-canvas">
                Kochi, Kerala —{" "}
                <span className="italic-violet">India.</span>
              </p>
              <p className="micro-label mt-2 text-graphite">
                09°56&apos;N · 76°15&apos;E
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <ContactForm />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
