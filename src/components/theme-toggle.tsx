"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";

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
        className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-border bg-surface-muted/50"
        aria-hidden="true"
      >
        <div className="h-4 w-4" />
      </div>
    );
  }

  const isDark = resolvedTheme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-border bg-surface-elevated text-text-secondary hover:text-text-primary hover:border-border-hover transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent cursor-pointer"
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      title={isDark ? "Switch to light theme" : "Switch to dark theme"}
    >
      {isDark ? (
        <Sun className="h-4 w-4" strokeWidth={1.8} />
      ) : (
        <Moon className="h-4 w-4" strokeWidth={1.8} />
      )}
    </button>
  );
}
