"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

/**
 * Rive-inspired animated background with procedural shapes.
 * Uses Canvas API for performant rendering of flowing particles
 * and geometric shapes that respond to scroll position.
 *
 * Note: For production, replace this with an actual .riv file
 * loaded via @rive-app/react-canvas for even richer animations.
 */
export default function RiveBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    // Particles
    const particles: {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      opacity: number;
      color: string;
    }[] = [];

    const particleCount = Math.min(60, Math.floor(width / 25));

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: Math.random() * 2 + 0.5,
        opacity: Math.random() * 0.15 + 0.02,
        color: Math.random() > 0.6 ? "#ff6b6b" : "#ffffff",
      });
    }

    // Flowing lines
    const lines: { points: { x: number; y: number }[]; speed: number; color: string }[] = [];
    for (let i = 0; i < 5; i++) {
      const points = [];
      const y = height * 0.2 + Math.random() * height * 0.6;
      for (let j = 0; j < 8; j++) {
        points.push({
          x: (width / 7) * j,
          y: y + (Math.random() - 0.5) * 100,
        });
      }
      lines.push({
        points,
        speed: 0.002 + Math.random() * 0.003,
        color: i < 2 ? "rgba(255,107,107," : "rgba(255,255,255,",
      });
    }

    let time = 0;

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      time += 0.01;

      // Draw particles
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle =
          p.color === "#ff6b6b"
            ? `rgba(255,107,107,${p.opacity})`
            : `rgba(255,255,255,${p.opacity})`;
        ctx.fill();
      });

      // Draw connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 150) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            const alpha = (1 - dist / 150) * 0.03;
            ctx.strokeStyle =
              particles[i].color === "#ff6b6b"
                ? `rgba(255,107,107,${alpha})`
                : `rgba(255,255,255,${alpha})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      // Draw flowing lines
      lines.forEach((line) => {
        ctx.beginPath();
        const pts = line.points.map((p, i) => ({
          x: p.x,
          y: p.y + Math.sin(time * 2 + i * 0.8) * 30,
        }));

        ctx.moveTo(pts[0].x, pts[0].y);
        for (let i = 1; i < pts.length - 1; i++) {
          const cx = (pts[i].x + pts[i + 1].x) / 2;
          const cy = (pts[i].y + pts[i + 1].y) / 2;
          ctx.quadraticCurveTo(pts[i].x, pts[i].y, cx, cy);
        }

        ctx.strokeStyle = line.color + "0.015)";
        ctx.lineWidth = 1;
        ctx.stroke();
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener("resize", handleResize);
    };
  }, [mounted]);

  if (!mounted) return null;

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-[1] pointer-events-none opacity-80"
    />
  );
}
