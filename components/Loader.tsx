"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const WORD = "zelexto";
const SUFFIX = ".studio";

const LETTER_DURATION = 0.05;
const LETTER_STAGGER = 0.09;
const TOTAL_LETTERS = WORD.length + SUFFIX.length;
const TYPING_TIME =
  (TOTAL_LETTERS - 1) * LETTER_STAGGER * 1000 + LETTER_DURATION * 1000;
const HOLD_AFTER_TYPING = 650;
const MIN_DISPLAY = TYPING_TIME + HOLD_AFTER_TYPING;

export default function Loader() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const start = Date.now();

    const hide = () => {
      const elapsed = Date.now() - start;
      const wait = Math.max(0, MIN_DISPLAY - elapsed);
      window.setTimeout(() => setVisible(false), wait);
    };

    if (document.readyState === "complete") {
      hide();
    } else {
      window.addEventListener("load", hide, { once: true });
      return () => window.removeEventListener("load", hide);
    }
  }, []);

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = visible ? "hidden" : prev || "";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [visible]);

  const letters = [
    ...WORD.split("").map((char) => ({ char, tone: "canvas" as const })),
    ...SUFFIX.split("").map((char) => ({ char, tone: "violet" as const })),
  ];

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="zelexto-loader"
          className="fixed inset-0 z-[200] flex items-center justify-center bg-ink"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          aria-hidden
        >
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse at center, rgba(108,92,231,0.14) 0%, transparent 60%)",
            }}
          />

          <div className="relative flex flex-col items-center px-6">
            <span
              className="font-display italic tracking-tight leading-none inline-flex items-baseline"
              style={{
                fontFamily: "var(--font-instrument-serif), Georgia, serif",
                fontSize: "clamp(2.5rem, 7vw, 4.75rem)",
                letterSpacing: "-0.025em",
              }}
            >
              {letters.map((l, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: LETTER_DURATION,
                    delay: i * LETTER_STAGGER,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  style={
                    l.tone === "violet"
                      ? {
                          background:
                            "linear-gradient(90deg, #6C5CE7 0%, #8B7BF0 100%)",
                          WebkitBackgroundClip: "text",
                          WebkitTextFillColor: "transparent",
                          backgroundClip: "text",
                          display: "inline-block",
                          whiteSpace: "pre",
                        }
                      : {
                          color: "var(--canvas)",
                          display: "inline-block",
                          whiteSpace: "pre",
                        }
                  }
                >
                  {l.char}
                </motion.span>
              ))}

              <motion.span
                aria-hidden
                className="ml-[3px] self-center"
                style={{
                  width: 2,
                  height: "0.9em",
                  background: "var(--violet-soft)",
                  display: "inline-block",
                  transform: "translateY(0.05em)",
                  boxShadow: "0 0 12px rgba(139,123,240,0.6)",
                }}
                initial={{ opacity: 1 }}
                animate={{ opacity: [1, 1, 0, 0, 1] }}
                transition={{
                  duration: 1.05,
                  repeat: Infinity,
                  ease: "linear",
                  times: [0, 0.45, 0.5, 0.95, 1],
                }}
              />
            </span>

            <div
              className="relative mt-7 overflow-hidden"
              style={{
                width: "clamp(140px, 18vw, 220px)",
                height: 1,
                background: "rgba(245,244,240,0.08)",
              }}
            >
              <motion.div
                className="absolute inset-y-0"
                initial={{ x: "-60%" }}
                animate={{ x: "160%" }}
                transition={{
                  delay: 0.4,
                  duration: 1.4,
                  repeat: Infinity,
                  ease: "linear",
                }}
                style={{
                  width: "60%",
                  background:
                    "linear-gradient(90deg, transparent, var(--violet) 50%, transparent)",
                }}
              />
            </div>

            <motion.span
              className="micro-label mt-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1, duration: 0.6 }}
            >
              Loading studio
            </motion.span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
