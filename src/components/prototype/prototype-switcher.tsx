"use client";

import React, { useEffect, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ChevronLeft, ChevronRight, Eye } from "lucide-react";

export interface PrototypeVariant {
  id: string;
  name: string;
  tagline: string;
}

export const KINETIC_VARIANTS: PrototypeVariant[] = [
  { id: "tunnel", name: "Light Tunnel", tagline: "3D Perspective Warp & Ring Horizon" },
  { id: "threads", name: "Web Threads", tagline: "Magnetic Fluid Strands & Particle Splines" },
  { id: "ether", name: "Liquid Ether", tagline: "Viscous Fluid Smoke & Chromatic Swirls" },
  { id: "gridscan", name: "Grid Scan", tagline: "3D Cyber Horizon & Laser Terrain" },
  { id: "ascii", name: "Gradient ASCII", tagline: "Dynamic Glyphs & Fluid Matrix Distort" },
];

export function PrototypeSwitcher({
  currentVariantId,
  isKinetic,
}: {
  currentVariantId: string;
  isKinetic: boolean;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentIndex = Math.max(
    0,
    KINETIC_VARIANTS.findIndex((v) => v.id === currentVariantId),
  );
  const current = KINETIC_VARIANTS[currentIndex] || KINETIC_VARIANTS[0];

  const setVariant = useCallback(
    (index: number) => {
      const nextIndex = (index + KINETIC_VARIANTS.length) % KINETIC_VARIANTS.length;
      const target = KINETIC_VARIANTS[nextIndex];
      const params = new URLSearchParams(searchParams ? searchParams.toString() : "");
      params.set("variant", target.id);
      router.replace(`?${params.toString()}`, { scroll: false });
    },
    [router, searchParams],
  );

  const prev = useCallback(() => setVariant(currentIndex - 1), [currentIndex, setVariant]);
  const next = useCallback(() => setVariant(currentIndex + 1), [currentIndex, setVariant]);

  // Keyboard navigation: Left / Right arrows
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const activeTag = document.activeElement?.tagName.toLowerCase();
      if (
        activeTag === "input" ||
        activeTag === "textarea" ||
        (document.activeElement as HTMLElement)?.isContentEditable
      ) {
        return;
      }
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        prev();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        next();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [prev, next]);

  // Only show the prototype bar in Kinetic mode so users can explore kinetic options
  if (!isKinetic) return null;

  return (
    <aside
      aria-label="Kinetic Prototype Variant Switcher"
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 select-none animate-in fade-in slide-in-from-bottom-3 duration-200"
    >
      <div className="flex items-center gap-1.5 p-1.5 rounded-full border border-border/80 bg-surface-elevated/95 backdrop-blur-xl shadow-2xl text-xs font-mono">
        <button
          type="button"
          onClick={prev}
          aria-label="Previous variant"
          className="p-1.5 rounded-full hover:bg-surface-subtle text-text-secondary hover:text-text-primary transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-focus-ring"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-surface-muted/80 border border-border/50">
          <Eye className="w-3.5 h-3.5 text-amber-500 animate-pulse" />
          <div className="flex items-baseline gap-1.5">
            <span className="font-semibold text-text-primary">{current.name}</span>
            <span className="text-[10px] text-text-tertiary">
              ({currentIndex + 1}/{KINETIC_VARIANTS.length})
            </span>
          </div>
          <span className="hidden md:inline text-[10px] text-text-secondary border-l border-border/60 pl-2">
            {current.tagline}
          </span>
        </div>

        <button
          type="button"
          onClick={next}
          aria-label="Next variant"
          className="p-1.5 rounded-full hover:bg-surface-subtle text-text-secondary hover:text-text-primary transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-focus-ring"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </aside>
  );
}
