"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Rive-style organic mesh background.
 * Creates a living, breathing mesh of morphing blob shapes,
 * orbital rings, energy pulses along connections, and
 * a reactive light that follows the cursor.
 */
export default function RiveBackground() {
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

    let W = window.innerWidth;
    let H = window.innerHeight;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = W * dpr;
    canvas.height = H * dpr;
    canvas.style.width = W + "px";
    canvas.style.height = H + "px";
    ctx.scale(dpr, dpr);

    let time = 0;

    // ─── Morphing blobs ───
    const blobs: {
      cx: number; cy: number;
      radius: number; points: number;
      speed: number; phase: number;
      color: string; opacity: number;
    }[] = [];

    for (let i = 0; i < 6; i++) {
      blobs.push({
        cx: Math.random() * W,
        cy: Math.random() * H,
        radius: 80 + Math.random() * 120,
        points: 6 + Math.floor(Math.random() * 4),
        speed: 0.003 + Math.random() * 0.005,
        phase: Math.random() * Math.PI * 2,
        color: i < 3 ? "255,107,107" : "255,255,255",
        opacity: 0.012 + Math.random() * 0.012,
      });
    }

    // ─── Orbital rings ───
    const orbitals: {
      cx: number; cy: number;
      radiusX: number; radiusY: number;
      rotation: number; rotSpeed: number;
      color: string; opacity: number;
    }[] = [];

    for (let i = 0; i < 5; i++) {
      orbitals.push({
        cx: W * (0.1 + Math.random() * 0.8),
        cy: H * Math.random(),
        radiusX: 100 + Math.random() * 200,
        radiusY: 60 + Math.random() * 100,
        rotation: Math.random() * Math.PI,
        rotSpeed: 0.001 + Math.random() * 0.003,
        color: i < 2 ? "255,107,107" : "255,255,255",
        opacity: 0.015 + Math.random() * 0.01,
      });
    }

    // ─── Network nodes ───
    const nodes: {
      x: number; y: number;
      vx: number; vy: number;
      radius: number; phase: number;
      isAccent: boolean;
    }[] = [];

    const nodeCount = Math.min(50, Math.floor(W / 30));
    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * W,
        y: Math.random() * H,
        vx: (Math.random() - 0.5) * 0.2,
        vy: (Math.random() - 0.5) * 0.2,
        radius: 1 + Math.random() * 1.5,
        phase: Math.random() * Math.PI * 2,
        isAccent: Math.random() > 0.5,
      });
    }

    // ─── Energy pulses ───
    const pulses: {
      fromIdx: number; toIdx: number;
      progress: number; speed: number;
      active: boolean;
    }[] = [];

    const spawnPulse = () => {
      if (pulses.filter(p => p.active).length > 6) return;
      const from = Math.floor(Math.random() * nodes.length);
      let to = Math.floor(Math.random() * nodes.length);
      if (to === from) to = (to + 1) % nodes.length;
      const dx = nodes[from].x - nodes[to].x;
      const dy = nodes[from].y - nodes[to].y;
      if (Math.sqrt(dx * dx + dy * dy) < 250) {
        pulses.push({ fromIdx: from, toIdx: to, progress: 0, speed: 0.008 + Math.random() * 0.012, active: true });
      }
    };

    // ─── Draw helpers ───
    const drawBlob = (blob: typeof blobs[0]) => {
      ctx.beginPath();
      for (let i = 0; i <= blob.points; i++) {
        const angle = (i / blob.points) * Math.PI * 2;
        const wobble = Math.sin(time * blob.speed * 50 + angle * 3 + blob.phase) * 0.25;
        const r = blob.radius * (1 + wobble);
        const x = blob.cx + Math.cos(angle) * r;
        const y = blob.cy + Math.sin(angle) * r;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.closePath();
      ctx.fillStyle = `rgba(${blob.color},${blob.opacity})`;
      ctx.filter = "blur(40px)";
      ctx.fill();
      ctx.filter = "none";
    };

    const drawOrbital = (orb: typeof orbitals[0]) => {
      ctx.save();
      ctx.translate(orb.cx, orb.cy);
      ctx.rotate(orb.rotation);
      ctx.beginPath();
      ctx.ellipse(0, 0, orb.radiusX, orb.radiusY, 0, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(${orb.color},${orb.opacity})`;
      ctx.lineWidth = 0.6;
      ctx.setLineDash([4, 8]);
      ctx.stroke();
      ctx.setLineDash([]);

      // Orbiting dot
      const dotAngle = time * 0.5 + orb.rotation;
      const dotX = Math.cos(dotAngle) * orb.radiusX;
      const dotY = Math.sin(dotAngle) * orb.radiusY;
      ctx.beginPath();
      ctx.arc(dotX, dotY, 2, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${orb.color},${orb.opacity * 3})`;
      ctx.fill();

      ctx.restore();
    };

    // ─── Main loop ───
    const animate = () => {
      ctx.clearRect(0, 0, W, H);
      time += 0.01;

      const viewTop = -300;
      const viewBottom = H + 300;

      // Blobs
      blobs.forEach((blob) => {
        blob.cx += Math.sin(time * blob.speed * 30) * 0.3;
        blob.cy += Math.cos(time * blob.speed * 20) * 0.2;
        if (blob.cy > viewTop && blob.cy < viewBottom) {
          drawBlob(blob);
        }
      });

      // Orbitals
      orbitals.forEach((orb) => {
        orb.rotation += orb.rotSpeed;
        if (orb.cy > viewTop - orb.radiusY && orb.cy < viewBottom + orb.radiusY) {
          drawOrbital(orb);
        }
      });

      // Nodes + connections
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        n.x += n.vx;
        n.y += n.vy;

        if (n.x < 0 || n.x > W) n.vx *= -1;
        if (n.y < 0 || n.y > H) n.vy *= -1;

        if (n.y < viewTop || n.y > viewBottom) continue;

        // Mouse repulsion
        const mx = mouseRef.current.x;
        const my = mouseRef.current.y;
        const dmx = n.x - mx;
        const dmy = n.y - my;
        const distM = Math.sqrt(dmx * dmx + dmy * dmy);
        if (distM < 180 && distM > 0) {
          const force = (1 - distM / 180) * 0.3;
          n.x += (dmx / distM) * force;
          n.y += (dmy / distM) * force;
        }

        // Breathe
        const breathe = Math.sin(time * 2 + n.phase) * 0.35 + 0.65;
        const nodeOpacity = (n.isAccent ? 0.15 : 0.08) * breathe;

        // Draw node
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.radius, 0, Math.PI * 2);
        ctx.fillStyle = n.isAccent
          ? `rgba(255,107,107,${nodeOpacity})`
          : `rgba(255,255,255,${nodeOpacity})`;
        ctx.fill();

        // Connections
        for (let j = i + 1; j < nodes.length; j++) {
          const n2 = nodes[j];
          const dx = n.x - n2.x;
          const dy = n.y - n2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 180) {
            const alpha = (1 - dist / 180) * 0.02;
            ctx.beginPath();
            ctx.moveTo(n.x, n.y);
            ctx.lineTo(n2.x, n2.y);
            ctx.strokeStyle = (n.isAccent || n2.isAccent)
              ? `rgba(255,107,107,${alpha})`
              : `rgba(255,255,255,${alpha * 0.6})`;
            ctx.lineWidth = 0.4;
            ctx.stroke();
          }
        }
      }

      // Energy pulses
      if (Math.random() < 0.02) spawnPulse();

      pulses.forEach((pulse) => {
        if (!pulse.active) return;
        pulse.progress += pulse.speed;
        if (pulse.progress >= 1) { pulse.active = false; return; }

        const from = nodes[pulse.fromIdx];
        const to = nodes[pulse.toIdx];
        const px = from.x + (to.x - from.x) * pulse.progress;
        const py = from.y + (to.y - from.y) * pulse.progress;

        if (py < viewTop || py > viewBottom) return;

        const gradient = ctx.createRadialGradient(px, py, 0, px, py, 8);
        gradient.addColorStop(0, "rgba(255,107,107,0.2)");
        gradient.addColorStop(1, "rgba(255,107,107,0)");
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(px, py, 8, 0, Math.PI * 2);
        ctx.fill();
      });

      // Clean up dead pulses
      for (let i = pulses.length - 1; i >= 0; i--) {
        if (!pulses[i].active) pulses.splice(i, 1);
      }

      // Mouse glow
      if (mouseRef.current.x > 0) {
        const g = ctx.createRadialGradient(
          mouseRef.current.x, mouseRef.current.y, 0,
          mouseRef.current.x, mouseRef.current.y, 250
        );
        g.addColorStop(0, "rgba(255,107,107,0.035)");
        g.addColorStop(0.5, "rgba(255,107,107,0.01)");
        g.addColorStop(1, "rgba(255,107,107,0)");
        ctx.fillStyle = g;
        ctx.fillRect(mouseRef.current.x - 250, mouseRef.current.y - 250, 500, 500);
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      W = window.innerWidth;
      H = window.innerHeight;
      canvas.width = W * dpr;
      canvas.height = H * dpr;
      canvas.style.width = W + "px";
      canvas.style.height = H + "px";
      ctx.scale(dpr, dpr);
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [mounted]);

  if (!mounted) return null;

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-[1] pointer-events-none"
    />
  );
}
