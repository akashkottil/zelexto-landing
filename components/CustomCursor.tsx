"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [visible, setVisible] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 22, stiffness: 280 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!visible) setVisible(true);
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    const handleHoverStart = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.closest("a") ||
        target.closest("button") ||
        target.closest("[data-hover]")
      ) {
        setIsHovering(true);
      }
    };

    const handleHoverEnd = () => setIsHovering(false);

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("mouseover", handleHoverStart);
    window.addEventListener("mouseout", handleHoverEnd);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("mouseover", handleHoverStart);
      window.removeEventListener("mouseout", handleHoverEnd);
    };
  }, [cursorX, cursorY, visible]);

  if (!visible) return null;

  return (
    <>
      {/* Outer ring */}
      <motion.div
        className="fixed top-0 left-0 z-[9999] pointer-events-none mix-blend-difference hidden md:block"
        style={{ x: cursorXSpring, y: cursorYSpring }}
      >
        <motion.div
          className="rounded-full border border-white/80"
          animate={{
            width: isHovering ? 60 : isClicking ? 18 : 32,
            height: isHovering ? 60 : isClicking ? 18 : 32,
            x: isHovering ? -30 : isClicking ? -9 : -16,
            y: isHovering ? -30 : isClicking ? -9 : -16,
          }}
          transition={{ duration: 0.2 }}
        />
      </motion.div>

      {/* Inner dot */}
      <motion.div
        className="fixed top-0 left-0 z-[9999] pointer-events-none hidden md:block"
        style={{ x: cursorX, y: cursorY }}
      >
        <motion.div
          className="rounded-full bg-[#ff6b6b]"
          animate={{
            width: isHovering ? 8 : 5,
            height: isHovering ? 8 : 5,
            x: isHovering ? -4 : -2.5,
            y: isHovering ? -4 : -2.5,
            opacity: isClicking ? 0.4 : 1,
          }}
          transition={{ duration: 0.15 }}
        />
      </motion.div>
    </>
  );
}
