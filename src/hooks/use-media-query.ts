"use client";

import { useSyncExternalStore } from "react";

function subscribe(query: string, callback: () => void) {
  const mql = window.matchMedia(query);
  mql.addEventListener("change", callback);
  return () => {
    mql.removeEventListener("change", callback);
  };
}

export function useMediaQuery(query: string, fallback = false): boolean {
  return useSyncExternalStore(
    (callback) => {
      if (typeof window === "undefined") {
        return () => {};
      }
      return subscribe(query, callback);
    },
    () => {
      if (typeof window === "undefined") {
        return fallback;
      }
      return window.matchMedia(query).matches;
    },
    () => fallback,
  );
}

export function usePrefersReducedMotion(): boolean {
  return useMediaQuery("(prefers-reduced-motion: reduce)", false);
}

export function useIsTouchDevice(): boolean {
  return useMediaQuery("(pointer: coarse)", false);
}
