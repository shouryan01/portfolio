"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useSyncExternalStore,
} from "react";

export type PresentationMode = "minimal" | "kinetic";

export const PRESENTATION_MODE_STORAGE_KEY = "portfolio-presentation-mode";
export const PRESENTATION_MODE_CHANGE_EVENT = "portfolio-presentation-mode-change";

interface PresentationModeContextValue {
  mode: PresentationMode;
  setMode: (mode: PresentationMode) => void;
  toggleMode: () => void;
  isKinetic: boolean;
  isMinimal: boolean;
  isMounted: boolean;
}

const PresentationModeContext = createContext<PresentationModeContextValue | undefined>(undefined);

function subscribe(callback: () => void) {
  if (typeof window === "undefined") {
    return () => {};
  }
  window.addEventListener(PRESENTATION_MODE_CHANGE_EVENT, callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener(PRESENTATION_MODE_CHANGE_EVENT, callback);
    window.removeEventListener("storage", callback);
  };
}

function getSnapshot(): PresentationMode {
  if (typeof window === "undefined") {
    return "minimal";
  }
  try {
    const val = localStorage.getItem(PRESENTATION_MODE_STORAGE_KEY);
    if (val === "kinetic" || val === "minimal") {
      return val;
    }
    const attr = document.documentElement.dataset.presentationMode;
    if (attr === "kinetic" || attr === "minimal") {
      return attr;
    }
  } catch {
    // Storage access fallback
  }
  return "minimal";
}

function getServerSnapshot(): PresentationMode {
  return "minimal";
}

function useIsMounted() {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
}

export function PresentationModeProvider({
  children,
}: {
  children: React.ReactNode;
  defaultMode?: PresentationMode;
}) {
  const mode = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const isMounted = useIsMounted();

  // Sync root DOM attribute whenever mode changes
  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.dataset.presentationMode = mode;
    }
  }, [mode]);

  const applyMode = useCallback((newMode: PresentationMode) => {
    try {
      localStorage.setItem(PRESENTATION_MODE_STORAGE_KEY, newMode);
    } catch {
      // Storage restricted
    }
    if (typeof document !== "undefined") {
      document.documentElement.dataset.presentationMode = newMode;
    }
    if (typeof window !== "undefined") {
      window.dispatchEvent(new Event(PRESENTATION_MODE_CHANGE_EVENT));
    }
  }, []);

  const setMode = useCallback(
    (newMode: PresentationMode) => {
      if (newMode === mode) return;

      if (typeof document !== "undefined" && "startViewTransition" in document) {
        document.startViewTransition(() => {
          applyMode(newMode);
        });
      } else {
        applyMode(newMode);
      }
    },
    [applyMode, mode],
  );

  const toggleMode = useCallback(() => {
    const nextMode: PresentationMode = mode === "minimal" ? "kinetic" : "minimal";
    setMode(nextMode);
  }, [mode, setMode]);

  const value = useMemo<PresentationModeContextValue>(
    () => ({
      mode,
      setMode,
      toggleMode,
      isKinetic: mode === "kinetic",
      isMinimal: mode === "minimal",
      isMounted,
    }),
    [mode, setMode, toggleMode, isMounted],
  );

  return (
    <PresentationModeContext.Provider value={value}>{children}</PresentationModeContext.Provider>
  );
}

export function usePresentationMode(): PresentationModeContextValue {
  const context = useContext(PresentationModeContext);
  if (!context) {
    throw new Error("usePresentationMode must be used within a PresentationModeProvider");
  }
  return context;
}
