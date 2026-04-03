"use client";

import { motion } from "framer-motion";
import { MessageCircle, Phone } from "lucide-react";
import ContactForm from "./ContactForm";
import AnimatedBackground from "./AnimatedBackground";

export default function FinalCTA() {
  return (
    <section id="contact" className="relative py-32 px-4 sm:px-6 overflow-hidden">
      <AnimatedBackground />

      <div className="relative z-10 max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <h2
            className="text-4xl md:text-5xl lg:text-6xl font-bold font-[family-name:var(--font-space-grotesk)] text-[#F5F5F5] mb-4 tracking-tight"
            style={{ letterSpacing: "-0.03em" }}
          >
            Let&apos;s Build Something{" "}
            <motion.span
              className="text-white text-glow-white inline-block"
              animate={{
                textShadow: [
                  "0 0 20px rgba(255,255,255,0.2), 0 0 40px rgba(255,255,255,0.08)",
                  "0 0 30px rgba(255,255,255,0.35), 0 0 60px rgba(255,255,255,0.12)",
                  "0 0 20px rgba(255,255,255,0.2), 0 0 40px rgba(255,255,255,0.08)",
                ],
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              Powerful
            </motion.span>{" "}
            Together
          </h2>
          <p className="text-lg text-[#888] max-w-2xl mx-auto leading-relaxed">
            Ready to bring your idea to life? Reach out and let&apos;s start building.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Left: CTA buttons */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <div className="glass rounded-2xl p-8">
              <h3 className="text-2xl font-semibold font-[family-name:var(--font-space-grotesk)] text-[#F5F5F5] mb-6">
                Get in Touch
              </h3>

              <div className="space-y-4">
                <motion.a
                  href="https://wa.me/918590090380"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 rounded-xl bg-white/[0.04] border border-white/10 hover:bg-white/[0.08] hover:border-white/20 transition-all duration-300 group"
                  whileHover={{ x: 5, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  data-hover
                >
                  <motion.div
                    className="w-12 h-12 rounded-full bg-[#25D366]/20 flex items-center justify-center"
                    whileHover={{ rotate: 15 }}
                  >
                    <MessageCircle className="text-[#25D366]" size={24} />
                  </motion.div>
                  <div>
                    <span className="text-[#F5F5F5] font-medium block">
                      Chat on WhatsApp
                    </span>
                    <span className="text-[#888] text-sm">
                      Quick response, usually within minutes
                    </span>
                  </div>
                </motion.a>

                <motion.a
                  href="tel:+918590090380"
                  className="flex items-center gap-4 p-4 rounded-xl bg-white/[0.04] border border-white/10 hover:bg-white/[0.08] hover:border-white/20 transition-all duration-300 group"
                  whileHover={{ x: 5, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  data-hover
                >
                  <motion.div
                    className="w-12 h-12 rounded-full bg-white/[0.08] flex items-center justify-center"
                    whileHover={{ rotate: 15 }}
                  >
                    <Phone className="text-[#F5F5F5]" size={24} />
                  </motion.div>
                  <div>
                    <span className="text-[#F5F5F5] font-medium block">
                      Book a Call
                    </span>
                    <span className="text-[#888] text-sm">
                      Let&apos;s discuss your project in detail
                    </span>
                  </div>
                </motion.a>
              </div>
            </div>
          </motion.div>

          {/* Right: Contact form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <ContactForm />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
