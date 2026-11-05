"use client";

import * as React from "react";
import { useTheme } from "next-themes";

const emptySubscribe = () => () => {};

function useMounted() {
  return React.useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );
}

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = useMounted();

  if (!mounted) {
    return (
      <div
        className="inline-flex items-center rounded-full border border-border bg-surface-muted p-0.5 text-[11px] font-mono text-text-tertiary"
        aria-hidden="true"
      >
        <span className="px-2.5 py-0.5 rounded-full">Light</span>
        <span className="px-2.5 py-0.5 rounded-full">Dark</span>
      </div>
    );
  }

  const isDark = resolvedTheme === "dark";

  return (
    <div
      aria-label="Color scheme selector"
      className="inline-flex items-center rounded-full border border-border bg-surface-muted p-0.5 text-[11px] font-mono text-text-secondary select-none"
    >
      <button
        type="button"
        aria-pressed={!isDark}
        aria-label="Switch to light theme"
        onClick={() => setTheme("light")}
        className={`px-2.5 py-0.5 rounded-full transition-all duration-150 cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-focus-ring ${
          !isDark
            ? "bg-surface-elevated text-text-primary shadow-xs font-medium"
            : "text-text-tertiary hover:text-text-primary"
        }`}
      >
        Light
      </button>

      <button
        type="button"
        aria-pressed={isDark}
        aria-label="Switch to dark theme"
        onClick={() => setTheme("dark")}
        className={`px-2.5 py-0.5 rounded-full transition-all duration-150 cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-focus-ring ${
          isDark
            ? "bg-surface-elevated text-text-primary shadow-xs font-medium"
            : "text-text-tertiary hover:text-text-primary"
        }`}
      >
        Dark
      </button>
    </div>
  );
}
