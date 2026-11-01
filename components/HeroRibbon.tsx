"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * The site's one sculpture: a glossy violet ribbon tied in a slow (2,3) knot, on a fixed layer behind the page.
 * It sits beside the hero copy, glides across to the left as #services pins, takes a new pose for each
 * service (read from that section's data-active), then fades away as the section scrolls off.
 * The pointer tilts it. Reduced motion keeps the scroll choreography but drops the idle spin and easing.
 */

// One pose per service, in the order Services.tsx lists them: [rotX, rotY, rotZ].
const POSES: [number, number, number][] = [
  [0.5, -0.35, 0],
  [1.25, 0.2, 0.6],
  [0.15, 0.9, -0.4],
  [-0.6, -0.8, 1.1],
  [0.95, 1.5, 0.2],
  [-0.2, 0.25, -1.2],
];

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
const smooth = (v: number) => v * v * (3 - 2 * v);

class KnotCurve extends THREE.Curve<THREE.Vector3> {
  constructor() {
    super();
  }
  getPoint(t: number, target = new THREE.Vector3()) {
    const a = t * Math.PI * 2;
    const p = 2, q = 3, r = 1.15 + 0.42 * Math.cos(q * a);
    return target.set(r * Math.cos(p * a), r * Math.sin(p * a), 0.55 * Math.sin(q * a));
  }
}

// Reflections come from this little world instead of a white studio. Dark: ink all round with violet softboxes.
// Light: a pale lavender room with white softboxes, so the ribbon reads as bright violet glass on a white page.
function brandEnvironment(light: boolean) {
  const env = new THREE.Scene();
  env.add(new THREE.Mesh(new THREE.SphereGeometry(20, 32, 16), new THREE.MeshBasicMaterial({ color: light ? "#7d6ff0" : "#2a2270", side: THREE.BackSide })));
  const box = (color: string, w: number, h: number, x: number, y: number, z: number, power = 1) => {
    const c = new THREE.Color(color).multiplyScalar(power); // >1 = brighter than white, like a real softbox
    const m = new THREE.Mesh(new THREE.PlaneGeometry(w, h), new THREE.MeshBasicMaterial({ color: c, side: THREE.DoubleSide }));
    m.position.set(x, y, z);
    m.lookAt(0, 0, 0);
    env.add(m);
  };
  if (light) {
    box("#FFFFFF", 16, 9, 0, 8, 6, 1.25); // broad white key above
    box("#6C5CE7", 9, 14, -9, 0, 3, 1.1); // violet wall left keeps the colour in the reflections
    box("#4A3DC9", 10, 10, 8, -2, -6, 1); // deeper violet behind for shading
    box("#FFFFFF", 1.6, 9, 9, 3, 4, 2); // crisp highlight strip
    box("#D4FF4F", 0.4, 5, -6, -6, 6, 1.2); // lime sliver
  } else {
    box("#8B7BF0", 16, 9, 0, 8, 6, 2.2); // soft violet key above
    box("#6C5CE7", 9, 14, -9, 0, 3, 1.6); // violet wall left
    box("#4A3DC9", 10, 10, 8, -2, -6, 1.4); // deep violet behind
    box("#F5F4F0", 1.6, 9, 9, 3, 4, 1.2); // thin canvas strip for a crisp highlight
    box("#D4FF4F", 0.4, 5, -6, -6, 6, 1.4); // lime sliver
  }
  return env;
}

// A flat ribbon (not a tube) swept along a torus-knot curve, twisting as it goes.
function ribbonGeometry(segments: number) {
  const curve = new KnotCurve();
  const frames = curve.computeFrenetFrames(segments, true);
  const width = 0.34;
  const pos: number[] = [], nor: number[] = [], uv: number[] = [], idx: number[] = [];
  const p = new THREE.Vector3(), side = new THREE.Vector3(), n = new THREE.Vector3();

  for (let i = 0; i <= segments; i++) {
    const t = i / segments;
    curve.getPoint(t, p);
    const twist = t * Math.PI * 4;
    const N = frames.normals[i % segments], B = frames.binormals[i % segments];
    side.copy(N).multiplyScalar(Math.cos(twist)).addScaledVector(B, Math.sin(twist));
    n.copy(N).multiplyScalar(-Math.sin(twist)).addScaledVector(B, Math.cos(twist));
    for (const s of [-1, 1]) {
      pos.push(p.x + side.x * width * s, p.y + side.y * width * s, p.z + side.z * width * s);
      nor.push(n.x, n.y, n.z);
      uv.push(t, (s + 1) / 2);
    }
    if (i < segments) {
      const k = i * 2;
      idx.push(k, k + 1, k + 2, k + 1, k + 3, k + 2);
    }
  }

  const g = new THREE.BufferGeometry();
  g.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
  g.setAttribute("normal", new THREE.Float32BufferAttribute(nor, 3));
  g.setAttribute("uv", new THREE.Float32BufferAttribute(uv, 2));
  g.setIndex(idx);
  return g;
}

export default function HeroRibbon({ className = "" }: { className?: string }) {
  const mount = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = mount.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const small = window.innerWidth < 768;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
    } catch {
      return; // no WebGL: the CSS glow behind the canvas carries the hero
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, small ? 1.5 : 2));
    renderer.toneMapping = THREE.NeutralToneMapping;
    renderer.toneMappingExposure = 0.95;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    el.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const pmrem = new THREE.PMREMGenerator(renderer);

    const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 100);
    camera.position.set(0, 0, 7.4);

    const material = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color("#6C5CE7"),
      clearcoat: 1,
      clearcoatRoughness: 0.08,
      side: THREE.DoubleSide,
    });
    const geometry = ribbonGeometry(small ? 420 : 900);
    const ribbon = new THREE.Mesh(geometry, material);
    const rig = new THREE.Group();
    rig.add(ribbon);
    scene.add(rig);

    const key = new THREE.PointLight("#8B7BF0", 8, 20);
    key.position.set(3, 3, 4);
    const rim = new THREE.PointLight("#D4FF4F", 6, 12); // a whisper of lime on the edges only
    rim.position.set(-4, -2, -2);
    const fill = new THREE.DirectionalLight("#8B7BF0", 0.9);
    fill.position.set(-2, 4, 3);
    const ambient = new THREE.AmbientLight("#4A3DC9", 0.5);
    scene.add(key, rim, fill, ambient);

    // Follows <html data-theme>; the environment map is rebuilt so reflections match the page.
    let envTexture: THREE.Texture | null = null;
    const applyTheme = () => {
      const light = document.documentElement.dataset.theme === "light";
      envTexture?.dispose();
      envTexture = pmrem.fromScene(brandEnvironment(light), 0.03).texture;
      scene.environment = envTexture;
      material.color.set("#6C5CE7");
      material.roughness = light ? 0.22 : 0.26;
      material.metalness = light ? 0.3 : 0.35;
      material.envMapIntensity = 1.1;
      renderer.toneMappingExposure = light ? 1 : 0.95;
      key.color.set(light ? "#FFFFFF" : "#8B7BF0");
      key.intensity = light ? 5 : 8;
      fill.color.set(light ? "#FFFFFF" : "#8B7BF0");
      ambient.color.set(light ? "#8B7BF0" : "#4A3DC9");
      ambient.intensity = light ? 0.6 : 0.5;
    };
    applyTheme();
    const themeObserver = new MutationObserver(applyTheme);
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });

    const resize = () => {
      const w = el.clientWidth, h = el.clientHeight;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.position.z = w / h < 1 ? 11.5 : 8.6; // portrait screens: pull back so the knot fits
      camera.updateProjectionMatrix();
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(el);

    const pointer = { x: 0, y: 0, tx: 0, ty: 0 };
    const onMove = (e: PointerEvent) => {
      if (reduce) return;
      pointer.tx = (e.clientX / window.innerWidth - 0.5) * 2;
      pointer.ty = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("pointermove", onMove, { passive: true });

    let visible = true;
    const io = new IntersectionObserver(([entry]) => (visible = entry.isIntersecting));
    io.observe(el);

    const clock = new THREE.Clock();
    const services = () => document.getElementById("services");
    const rot = new THREE.Euler(...POSES[0]);
    let raf = 0;
    const frame = () => {
      const t = clock.getElapsedTime();
      const vh = window.innerHeight;
      const mobile = window.innerWidth < 1024;
      const sec = services();
      const r = sec?.getBoundingClientRect();

      // 0 = hero, 1 = services pinned; then fade and lift as services leaves.
      const into = r ? smooth(clamp01(1.3 * (1 - r.top / vh))) : 0; // arrives a little before the list pins
      const out = r ? clamp01((vh - r.bottom) / (vh * 0.7)) : 0;
      const visibleAmount = 1 - out;
      renderer.domElement.style.opacity = String(visibleAmount);
      if (visibleAmount <= 0.001) return;

      const active = Math.min(POSES.length - 1, Number(sec?.dataset.active ?? 0));
      const target = into > 0.5 ? POSES[active] : POSES[0];
      const k = reduce ? 1 : 0.045;
      rot.x += (target[0] - rot.x) * k;
      rot.y += (target[1] - rot.y) * k;
      rot.z += (target[2] - rot.z) * k;

      pointer.x += (pointer.tx - pointer.x) * 0.05;
      pointer.y += (pointer.ty - pointer.y) * 0.05;

      const heroX = mobile ? 0 : 1.25, servX = mobile ? 0 : -1.7;
      const heroY = mobile ? 2.05 : 0.05, servY = mobile ? 1.9 : 0;
      const heroS = mobile ? 0.6 : 1, servS = mobile ? 0.62 : 0.92;
      rig.position.x = heroX + (servX - heroX) * into;
      rig.position.y = heroY + (servY - heroY) * into + out * 2.2;
      rig.scale.setScalar(heroS + (servS - heroS) * into);
      rig.rotation.set(rot.x + pointer.y * 0.18, rot.y + pointer.x * 0.25, rot.z);
      ribbon.rotation.z = reduce ? 0 : t * 0.12;
      renderer.render(scene, camera);
    };

    const loop = () => {
      raf = requestAnimationFrame(loop);
      if (visible) frame();
    };
    loop();
    el.dataset.ready = "true";

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      ro.disconnect();
      io.disconnect();
      themeObserver.disconnect();
      envTexture?.dispose();
      geometry.dispose();
      material.dispose();
      pmrem.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);

  return (
    <div
      ref={mount}
      className={`[&>canvas]:block [&>canvas]:w-full [&>canvas]:h-full ${className}`}
      aria-hidden="true"
    />
  );
}
