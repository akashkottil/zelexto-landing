"use client";

import { motion } from "framer-motion";
import { MessageCircle, Phone, ArrowRight } from "lucide-react";
import ContactForm from "./ContactForm";
import MagneticButton from "./MagneticButton";

export default function FinalCTA() {
  return (
    <section id="contact" className="relative py-32 lg:py-40 px-6 overflow-hidden">
      {/* Big gradient */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div
          className="w-[800px] h-[800px] rounded-full opacity-[0.06]"
          style={{
            background: "radial-gradient(circle, #ff6b6b, transparent 65%)",
            filter: "blur(120px)",
          }}
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2
            className="text-4xl md:text-5xl lg:text-7xl font-bold font-[family-name:var(--font-space-grotesk)] text-[#F5F5F5] mb-5 tracking-tight"
            style={{ letterSpacing: "-0.03em" }}
          >
            Let&apos;s build something{" "}
            <motion.span
              className="text-[#ff6b6b] text-glow-accent inline-block"
              animate={{
                textShadow: [
                  "0 0 20px rgba(255,107,107,0.3), 0 0 60px rgba(255,107,107,0.1)",
                  "0 0 40px rgba(255,107,107,0.5), 0 0 80px rgba(255,107,107,0.15)",
                  "0 0 20px rgba(255,107,107,0.3), 0 0 60px rgba(255,107,107,0.1)",
                ],
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              powerful
            </motion.span>
          </h2>
          <p className="text-lg text-[#888] max-w-xl mx-auto leading-relaxed">
            Ready to bring your idea to life? Let&apos;s start building.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Left */}
          <motion.div
            className="space-y-5"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-8">
              <h3 className="text-2xl font-semibold font-[family-name:var(--font-space-grotesk)] text-[#F5F5F5] mb-6 tracking-tight">
                Get in touch
              </h3>

              <div className="space-y-4">
                <motion.a
                  href="https://wa.me/918590090380"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 rounded-xl border border-white/[0.06] bg-white/[0.02] hover:border-[#25D366]/30 hover:bg-[#25D366]/[0.04] transition-all duration-300"
                  whileHover={{ x: 4 }}
                  data-hover
                >
                  <div className="w-12 h-12 rounded-full bg-[#25D366]/15 flex items-center justify-center">
                    <MessageCircle className="text-[#25D366]" size={22} />
                  </div>
                  <div className="flex-1">
                    <span className="text-[#F5F5F5] font-medium block text-sm">Chat on WhatsApp</span>
                    <span className="text-[#666] text-xs">Usually responds in minutes</span>
                  </div>
                  <ArrowRight size={16} className="text-[#666]" />
                </motion.a>

                <motion.a
                  href="tel:+918590090380"
                  className="flex items-center gap-4 p-4 rounded-xl border border-white/[0.06] bg-white/[0.02] hover:border-[#ff6b6b]/20 hover:bg-[#ff6b6b]/[0.03] transition-all duration-300"
                  whileHover={{ x: 4 }}
                  data-hover
                >
                  <div className="w-12 h-12 rounded-full bg-[#ff6b6b]/10 flex items-center justify-center">
                    <Phone className="text-[#ff6b6b]" size={22} />
                  </div>
                  <div className="flex-1">
                    <span className="text-[#F5F5F5] font-medium block text-sm">Book a call</span>
                    <span className="text-[#666] text-xs">Let&apos;s discuss your project</span>
                  </div>
                  <ArrowRight size={16} className="text-[#666]" />
                </motion.a>
              </div>
            </div>

            {/* Quick CTA */}
            <div className="text-center lg:text-left">
              <MagneticButton
                href="https://wa.me/918590090380"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-accent px-8 py-4 rounded-full text-base font-semibold inline-flex items-center gap-2"
              >
                Start Your Project
                <ArrowRight size={18} />
              </MagneticButton>
            </div>
          </motion.div>

          {/* Right: form */}
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
