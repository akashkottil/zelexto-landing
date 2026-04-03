"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Enhanced Rive-style animated background.
 * Multi-layer canvas with:
 * - Particle constellation network
 * - Flowing aurora curves
 * - Floating geometric shapes (rotating, scaling)
 * - Mouse-reactive glow region
 * - Pulsing grid nodes
 */
export default function RiveBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = window.innerWidth;
    let height = document.documentElement.scrollHeight;
    canvas.width = width;
    canvas.height = height;

    // --- Particles ---
    const particles: {
      x: number; y: number;
      vx: number; vy: number;
      size: number; baseOpacity: number;
      color: string; phase: number;
    }[] = [];

    const particleCount = Math.min(80, Math.floor(width / 20));
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        size: Math.random() * 1.8 + 0.4,
        baseOpacity: Math.random() * 0.12 + 0.02,
        color: Math.random() > 0.55 ? "accent" : "white",
        phase: Math.random() * Math.PI * 2,
      });
    }

    // --- Aurora curves ---
    const auroras: { yBase: number; amplitude: number; frequency: number; speed: number; color: string; width: number }[] = [];
    for (let i = 0; i < 4; i++) {
      auroras.push({
        yBase: height * (0.15 + i * 0.22),
        amplitude: 40 + Math.random() * 60,
        frequency: 0.001 + Math.random() * 0.002,
        speed: 0.3 + Math.random() * 0.4,
        color: i < 2 ? "rgba(255,107,107," : "rgba(255,255,255,",
        width: 1 + Math.random(),
      });
    }

    // --- Floating shapes ---
    const shapes: {
      x: number; y: number;
      size: number; rotation: number; rotSpeed: number;
      type: "square" | "triangle" | "circle" | "diamond";
      opacity: number; driftX: number; driftY: number;
    }[] = [];

    const shapeTypes: ("square" | "triangle" | "circle" | "diamond")[] = ["square", "triangle", "circle", "diamond"];
    for (let i = 0; i < 12; i++) {
      shapes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: 8 + Math.random() * 20,
        rotation: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.005,
        type: shapeTypes[Math.floor(Math.random() * shapeTypes.length)],
        opacity: 0.015 + Math.random() * 0.02,
        driftX: (Math.random() - 0.5) * 0.15,
        driftY: (Math.random() - 0.5) * 0.1,
      });
    }

    // --- Grid pulse nodes ---
    const gridNodes: { x: number; y: number; phase: number }[] = [];
    const gridSpacing = 120;
    for (let gx = gridSpacing; gx < width; gx += gridSpacing) {
      for (let gy = gridSpacing; gy < Math.min(height, 6000); gy += gridSpacing) {
        if (Math.random() > 0.7) {
          gridNodes.push({ x: gx, y: gy, phase: Math.random() * Math.PI * 2 });
        }
      }
    }

    let time = 0;

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY + window.scrollY };
    };

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      time += 0.008;

      const scrollY = window.scrollY;
      const viewTop = scrollY;
      const viewBottom = scrollY + window.innerHeight;

      // --- Draw grid pulse nodes ---
      gridNodes.forEach((node) => {
        if (node.y < viewTop - 100 || node.y > viewBottom + 100) return;
        const pulse = Math.sin(time * 2 + node.phase) * 0.5 + 0.5;
        const nodeSize = 1 + pulse * 1.5;
        const isAccent = Math.sin(node.phase) > 0.3;

        ctx.beginPath();
        ctx.arc(node.x, node.y, nodeSize, 0, Math.PI * 2);
        ctx.fillStyle = isAccent
          ? `rgba(255,107,107,${0.03 + pulse * 0.04})`
          : `rgba(255,255,255,${0.02 + pulse * 0.025})`;
        ctx.fill();
      });

      // --- Draw aurora curves ---
      auroras.forEach((aurora) => {
        ctx.beginPath();
        ctx.moveTo(0, aurora.yBase);
        for (let x = 0; x <= width; x += 3) {
          const y =
            aurora.yBase +
            Math.sin(x * aurora.frequency + time * aurora.speed) * aurora.amplitude +
            Math.sin(x * aurora.frequency * 2.5 + time * aurora.speed * 1.5) * aurora.amplitude * 0.3;
          ctx.lineTo(x, y);
        }
        ctx.strokeStyle = aurora.color + "0.012)";
        ctx.lineWidth = aurora.width;
        ctx.stroke();
      });

      // --- Draw floating shapes ---
      shapes.forEach((shape) => {
        shape.x += shape.driftX;
        shape.y += shape.driftY;
        shape.rotation += shape.rotSpeed;

        if (shape.x < -50) shape.x = width + 50;
        if (shape.x > width + 50) shape.x = -50;
        if (shape.y < -50) shape.y = height + 50;
        if (shape.y > height + 50) shape.y = -50;

        if (shape.y < viewTop - 200 || shape.y > viewBottom + 200) return;

        ctx.save();
        ctx.translate(shape.x, shape.y);
        ctx.rotate(shape.rotation);
        ctx.strokeStyle = `rgba(255,107,107,${shape.opacity})`;
        ctx.lineWidth = 0.5;

        if (shape.type === "square") {
          ctx.strokeRect(-shape.size / 2, -shape.size / 2, shape.size, shape.size);
        } else if (shape.type === "circle") {
          ctx.beginPath();
          ctx.arc(0, 0, shape.size / 2, 0, Math.PI * 2);
          ctx.stroke();
        } else if (shape.type === "triangle") {
          ctx.beginPath();
          ctx.moveTo(0, -shape.size / 2);
          ctx.lineTo(-shape.size / 2, shape.size / 2);
          ctx.lineTo(shape.size / 2, shape.size / 2);
          ctx.closePath();
          ctx.stroke();
        } else if (shape.type === "diamond") {
          ctx.beginPath();
          ctx.moveTo(0, -shape.size / 2);
          ctx.lineTo(shape.size / 2, 0);
          ctx.lineTo(0, shape.size / 2);
          ctx.lineTo(-shape.size / 2, 0);
          ctx.closePath();
          ctx.stroke();
        }
        ctx.restore();
      });

      // --- Draw particles ---
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        if (p.y < viewTop - 100 || p.y > viewBottom + 100) return;

        // Breathe effect
        const breathe = Math.sin(time * 1.5 + p.phase) * 0.3 + 0.7;
        const opacity = p.baseOpacity * breathe;

        // Mouse proximity boost
        const mx = mouseRef.current.x;
        const my = mouseRef.current.y;
        const distMouse = Math.sqrt((p.x - mx) ** 2 + (p.y - my) ** 2);
        const mouseBoost = distMouse < 200 ? (1 - distMouse / 200) * 0.15 : 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle =
          p.color === "accent"
            ? `rgba(255,107,107,${opacity + mouseBoost})`
            : `rgba(255,255,255,${opacity + mouseBoost})`;
        ctx.fill();
      });

      // --- Draw connections ---
      for (let i = 0; i < particles.length; i++) {
        if (particles[i].y < viewTop - 100 || particles[i].y > viewBottom + 100) continue;
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 160) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            const alpha = (1 - dist / 160) * 0.025;
            const isAccentLine = particles[i].color === "accent" || particles[j].color === "accent";
            ctx.strokeStyle = isAccentLine
              ? `rgba(255,107,107,${alpha})`
              : `rgba(255,255,255,${alpha * 0.7})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      // --- Mouse glow ---
      if (mouseRef.current.x > 0) {
        const gradient = ctx.createRadialGradient(
          mouseRef.current.x, mouseRef.current.y, 0,
          mouseRef.current.x, mouseRef.current.y, 200
        );
        gradient.addColorStop(0, "rgba(255,107,107,0.03)");
        gradient.addColorStop(1, "rgba(255,107,107,0)");
        ctx.fillStyle = gradient;
        ctx.fillRect(mouseRef.current.x - 200, mouseRef.current.y - 200, 400, 400);
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      width = window.innerWidth;
      height = document.documentElement.scrollHeight;
      canvas.width = width;
      canvas.height = height;
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);

    // Re-measure height periodically (content may load)
    const resizeInterval = setInterval(() => {
      const newHeight = document.documentElement.scrollHeight;
      if (Math.abs(newHeight - height) > 100) {
        height = newHeight;
        canvas.height = height;
      }
    }, 2000);

    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      clearInterval(resizeInterval);
    };
  }, [mounted]);

  if (!mounted) return null;

  return (
    <canvas
      ref={canvasRef}
      className="absolute top-0 left-0 z-[1] pointer-events-none"
      style={{ width: "100%", minHeight: "100%" }}
    />
  );
}
