"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Interactive grid background that warps/distorts toward the cursor.
 * Grid lines bend and glow near the mouse, creating a fabric-like effect.
 */
export default function InteractiveGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let W = window.innerWidth;
    let H = window.innerHeight;

    const resize = () => {
      W = window.innerWidth;
      H = window.innerHeight;
      canvas.width = W * dpr;
      canvas.height = H * dpr;
      canvas.style.width = W + "px";
      canvas.style.height = H + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    const SPACING = 50;
    const INFLUENCE = 180;
    const STRENGTH = 28;
    const RETURN_SPEED = 0.08;

    // Grid points with displacement
    let cols = 0;
    let rows = 0;
    let gridPoints: { baseX: number; baseY: number; dx: number; dy: number }[] = [];

    const buildGrid = () => {
      cols = Math.ceil(W / SPACING) + 2;
      rows = Math.ceil(H / SPACING) + 2;
      gridPoints = [];
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          gridPoints.push({
            baseX: c * SPACING - SPACING,
            baseY: r * SPACING - SPACING,
            dx: 0,
            dy: 0,
          });
        }
      }
    };
    buildGrid();

    const getPoint = (col: number, row: number) => {
      if (col < 0 || col >= cols || row < 0 || row >= rows) return null;
      return gridPoints[row * cols + col];
    };

    let time = 0;

    const animate = () => {
      ctx.clearRect(0, 0, W, H);
      time += 0.005;

      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      // Update grid points — attract toward mouse
      for (const p of gridPoints) {
        const dx = mx - p.baseX;
        const dy = my - p.baseY;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < INFLUENCE && dist > 0) {
          const force = (1 - dist / INFLUENCE) * (1 - dist / INFLUENCE);
          const targetDx = (dx / dist) * STRENGTH * force;
          const targetDy = (dy / dist) * STRENGTH * force;
          p.dx += (targetDx - p.dx) * 0.12;
          p.dy += (targetDy - p.dy) * 0.12;
        } else {
          p.dx *= (1 - RETURN_SPEED);
          p.dy *= (1 - RETURN_SPEED);
        }
      }

      // Draw grid lines
      // Horizontal
      for (let r = 0; r < rows; r++) {
        ctx.beginPath();
        for (let c = 0; c < cols; c++) {
          const p = getPoint(c, r);
          if (!p) continue;
          const x = p.baseX + p.dx;
          const y = p.baseY + p.dy;
          if (c === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }

        // Proximity-based opacity for this row
        const rowY = r * SPACING;
        const rowDist = Math.abs(my - rowY);
        const rowProximity = rowDist < INFLUENCE ? (1 - rowDist / INFLUENCE) : 0;
        const baseAlpha = 0.04;
        const accentAlpha = rowProximity * 0.08;

        if (rowProximity > 0.1) {
          ctx.strokeStyle = `rgba(255,107,107,${baseAlpha + accentAlpha})`;
        } else {
          ctx.strokeStyle = `rgba(255,255,255,${baseAlpha})`;
        }
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }

      // Vertical
      for (let c = 0; c < cols; c++) {
        ctx.beginPath();
        for (let r = 0; r < rows; r++) {
          const p = getPoint(c, r);
          if (!p) continue;
          const x = p.baseX + p.dx;
          const y = p.baseY + p.dy;
          if (r === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }

        const colX = c * SPACING;
        const colDist = Math.abs(mx - colX);
        const colProximity = colDist < INFLUENCE ? (1 - colDist / INFLUENCE) : 0;
        const baseAlpha = 0.04;
        const accentAlpha = colProximity * 0.08;

        if (colProximity > 0.1) {
          ctx.strokeStyle = `rgba(255,107,107,${baseAlpha + accentAlpha})`;
        } else {
          ctx.strokeStyle = `rgba(255,255,255,${baseAlpha})`;
        }
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }

      // Draw intersection dots near cursor
      for (const p of gridPoints) {
        const px = p.baseX + p.dx;
        const py = p.baseY + p.dy;
        const dx = mx - px;
        const dy = my - py;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < INFLUENCE) {
          const proximity = 1 - dist / INFLUENCE;
          const dotSize = 1 + proximity * 2;
          const dotAlpha = proximity * 0.3;

          ctx.beginPath();
          ctx.arc(px, py, dotSize, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255,107,107,${dotAlpha})`;
          ctx.fill();
        }
      }

      // Cursor glow
      if (mx > 0 && my > 0) {
        const g = ctx.createRadialGradient(mx, my, 0, mx, my, INFLUENCE);
        g.addColorStop(0, "rgba(255,107,107,0.04)");
        g.addColorStop(0.6, "rgba(255,107,107,0.01)");
        g.addColorStop(1, "rgba(255,107,107,0)");
        ctx.fillStyle = g;
        ctx.fillRect(mx - INFLUENCE, my - INFLUENCE, INFLUENCE * 2, INFLUENCE * 2);
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseLeave = () => {
      mouseRef.current = { x: -9999, y: -9999 };
    };

    window.addEventListener("resize", () => { resize(); buildGrid(); });
    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [mounted]);

  if (!mounted) return null;

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-[2] pointer-events-none"
    />
  );
}
