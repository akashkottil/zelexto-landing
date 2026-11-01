"use client";

import { useSyncExternalStore } from "react";
import { Moon, Sun } from "lucide-react";

type Theme = "light" | "dark";

// The theme lives on <html data-theme>, set before paint by the script in layout.tsx.
const subscribe = (cb: () => void) => {
  const mo = new MutationObserver(cb);
  mo.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  return () => mo.disconnect();
};
const read = (): Theme => (document.documentElement.dataset.theme === "light" ? "light" : "dark");

export function useTheme() {
  return useSyncExternalStore(subscribe, read, () => "dark" as Theme);
}

export default function ThemeToggle({ className = "" }: { className?: string }) {
  const theme = useTheme();
  const next: Theme = theme === "dark" ? "light" : "dark";

  const toggle = () => {
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem("theme", next);
    } catch {}
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={`Switch to ${next} mode`}
      className={`w-9 h-9 rounded-full flex items-center justify-center text-graphite-soft hover:text-canvas hover:bg-canvas/[0.06] transition-colors ${className}`}
    >
      {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
    </button>
  );
}
