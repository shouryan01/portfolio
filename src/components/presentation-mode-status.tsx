"use client";

import React from "react";
import { usePresentationMode } from "@/context/presentation-mode-context";
import { Sparkles, FileText } from "lucide-react";

export function PresentationModeStatus() {
  const { mode, toggleMode, isMounted } = usePresentationMode();

  if (!isMounted) {
    return (
      <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full border border-border bg-surface-muted text-xs font-mono text-text-secondary">
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
        <span>Minimal Mode • Default</span>
      </div>
    );
  }

  const isKinetic = mode === "kinetic";

  return (
    <button
      type="button"
      onClick={toggleMode}
      title="Click or use the bottom-right peel to switch modes"
      className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full border border-border bg-surface-muted text-xs font-mono text-text-secondary hover:border-border-hover hover:text-text-primary transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring"
    >
      <span
        className={`h-1.5 w-1.5 rounded-full ${
          isKinetic
            ? "bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.6)]"
            : "bg-emerald-500 animate-pulse"
        }`}
      />
      <span className="flex items-center gap-1.5">
        {isKinetic ? (
          <>
            <Sparkles className="w-3 h-3 text-amber-500" aria-hidden="true" />
            <span>Kinetic Mode Active</span>
          </>
        ) : (
          <>
            <FileText className="w-3 h-3 text-text-tertiary" aria-hidden="true" />
            <span>Minimal Mode Active</span>
          </>
        )}
      </span>
      <span className="text-text-tertiary text-[10px] uppercase tracking-wider pl-1 border-l border-border/80">
        Toggle ↗
      </span>
    </button>
  );
}
