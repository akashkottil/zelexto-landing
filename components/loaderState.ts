"use client";

import { useSyncExternalStore } from "react";

// The loader flips <html data-loaded> as its curtain starts to lift, so entrance animations play in view.
const EVENT = "zelexto:loaded";

export function markLoaded() {
  document.documentElement.dataset.loaded = "true";
  window.dispatchEvent(new Event(EVENT));
}

const subscribe = (cb: () => void) => {
  window.addEventListener(EVENT, cb);
  return () => window.removeEventListener(EVENT, cb);
};

export function useLoaded() {
  return useSyncExternalStore(subscribe, () => document.documentElement.dataset.loaded === "true", () => false);
}
