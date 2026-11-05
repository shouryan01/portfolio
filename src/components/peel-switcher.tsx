"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { usePresentationMode } from "@/context/presentation-mode-context";
import { usePrefersReducedMotion, useIsTouchDevice } from "@/hooks/use-media-query";
import { Sparkles, FileText } from "lucide-react";

export function PeelSwitcher() {
  const { toggleMode, isKinetic, isMounted } = usePresentationMode();
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const reducedMotion = usePrefersReducedMotion();
  const isTouchDevice = useIsTouchDevice();
  const [curlProgress, setCurlProgress] = useState(0); // 0 = resting, 1 = fully curled
  const containerRef = useRef<HTMLButtonElement>(null);
  const animFrameRef = useRef<number | null>(null);

  // Target and current animated curl progress for spring damping
  const targetProgressRef = useRef(0);
  const currentProgressRef = useRef(0);
  const velocityRef = useRef(0);
  const reducedMotionRef = useRef(reducedMotion);

  useEffect(() => {
    reducedMotionRef.current = reducedMotion;
  }, [reducedMotion]);

  // Spring animation loop for tactile curl physics
  const stepSpring = useCallback(function runSpring() {
    if (reducedMotionRef.current) {
      currentProgressRef.current = targetProgressRef.current;
      setCurlProgress(targetProgressRef.current);
      animFrameRef.current = null;
      return;
    }

    const stiffness = 0.18;
    const damping = 0.72;
    const target = targetProgressRef.current;
    const current = currentProgressRef.current;

    const force = (target - current) * stiffness;
    velocityRef.current = (velocityRef.current + force) * damping;
    currentProgressRef.current += velocityRef.current;

    setCurlProgress(currentProgressRef.current);

    if (
      Math.abs(velocityRef.current) > 0.0005 ||
      Math.abs(target - currentProgressRef.current) > 0.0005
    ) {
      animFrameRef.current = requestAnimationFrame(runSpring);
    } else {
      currentProgressRef.current = target;
      velocityRef.current = 0;
      setCurlProgress(target);
      animFrameRef.current = null;
    }
  }, []);

  const setTargetCurl = useCallback(
    (target: number) => {
      targetProgressRef.current = target;
      if (animFrameRef.current === null) {
        animFrameRef.current = requestAnimationFrame(stepSpring);
      }
    },
    [stepSpring],
  );

  const handlePointerEnter = () => {
    setIsHovered(true);
    setTargetCurl(1);
  };

  const handlePointerLeave = () => {
    setIsHovered(false);
    setIsPressed(false);
    setTargetCurl(0);
  };

  const handlePointerDown = () => {
    setIsPressed(true);
    setTargetCurl(1.08); // Slight tactile overshoot on press
  };

  const handlePointerUp = () => {
    setIsPressed(false);
    setTargetCurl(isHovered ? 1 : 0);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      toggleMode();
    }
  };

  useEffect(() => {
    return () => {
      if (animFrameRef.current !== null) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, []);

  if (!isMounted) {
    return null;
  }

  // Geometric curl coordinates
  const boxSize = 130;
  const baseRest = isTouchDevice ? 52 : 46;
  const maxCurl = 104;
  const currentCurl = baseRest + (maxCurl - baseRest) * Math.max(0, Math.min(1.15, curlProgress));

  const pCorner = boxSize; // 130
  const pCreaseX = boxSize - currentCurl; // fold starts on bottom edge
  const pCreaseY = boxSize - currentCurl; // fold ends on right edge
  const flapTipX = boxSize - currentCurl * 0.95;
  const flapTipY = boxSize - currentCurl * 0.95;

  const targetModeLabel = isKinetic ? "Minimal Mode" : "Kinetic Mode";
  const currentModeLabel = isKinetic ? "Kinetic" : "Minimal";

  return (
    <aside
      aria-label="Presentation Mode Switcher"
      className="fixed bottom-0 right-0 z-50 pointer-events-none select-none"
    >
      <button
        ref={containerRef}
        type="button"
        aria-pressed={isKinetic}
        aria-label={`Toggle presentation mode. Currently ${currentModeLabel}. Switch to ${targetModeLabel}.`}
        onClick={toggleMode}
        onKeyDown={handleKeyDown}
        onPointerEnter={handlePointerEnter}
        onPointerLeave={handlePointerLeave}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        className="pointer-events-auto relative w-28 h-28 sm:w-32 sm:h-32 flex items-end justify-end cursor-pointer group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-tl-xl transition-transform border-none bg-transparent p-0"
        style={{
          transform: isPressed ? "scale(0.97)" : "scale(1)",
        }}
      >
        {/* SVG Corner Curl */}
        <svg
          viewBox={`0 0 ${boxSize} ${boxSize}`}
          className="w-full h-full overflow-visible drop-shadow-[0_-2px_12px_rgba(0,0,0,0.06)] dark:drop-shadow-[0_-2px_16px_rgba(0,0,0,0.35)]"
          aria-hidden="true"
        >
          <defs>
            {/* Ambient drop shadow cast by the peel flap onto the underlying page */}
            <filter id="peel-shadow" x="-30%" y="-30%" width="160%" height="160%">
              <feDropShadow
                dx="-2.5"
                dy="-2.5"
                stdDeviation="3.5"
                floodColor="#000000"
                floodOpacity={isKinetic ? "0.35" : "0.18"}
              />
            </filter>

            {/* Backface sheen gradient */}
            <linearGradient id="peel-backface-light" x1="1" y1="1" x2="0" y2="0">
              <stop offset="0%" stopColor="#d6d3d1" />
              <stop offset="40%" stopColor="#e7e5e4" />
              <stop offset="85%" stopColor="#f5f5f4" />
              <stop offset="100%" stopColor="#ffffff" />
            </linearGradient>

            <linearGradient id="peel-backface-dark" x1="1" y1="1" x2="0" y2="0">
              <stop offset="0%" stopColor="#171513" />
              <stop offset="40%" stopColor="#292524" />
              <stop offset="85%" stopColor="#37322e" />
              <stop offset="100%" stopColor="#44403c" />
            </linearGradient>

            {/* Under-sheet void gradient */}
            <linearGradient id="under-sheet-gradient" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="var(--surface-muted)" />
              <stop offset="100%" stopColor="var(--surface-subtle)" />
            </linearGradient>
          </defs>

          {/* Under-sheet cutout (revealed behind the peeled corner) */}
          <polygon
            points={`${pCreaseX},${pCorner} ${pCorner},${pCreaseY} ${pCorner},${pCorner}`}
            fill="url(#under-sheet-gradient)"
            stroke="var(--border)"
            strokeWidth="0.75"
          />

          {/* Peeled Flap */}
          <path
            d={`
              M ${pCreaseX} ${pCorner}
              Q ${flapTipX} ${pCorner} ${flapTipX} ${flapTipY}
              Q ${pCorner} ${flapTipY} ${pCorner} ${pCreaseY}
              Z
            `}
            className="fill-[url(#peel-backface-light)] dark:fill-[url(#peel-backface-dark)]"
            filter="url(#peel-shadow)"
            stroke="var(--border-hover)"
            strokeWidth="0.8"
          />

          {/* Diagonal crease line accent */}
          <line
            x1={pCreaseX}
            y1={pCorner}
            x2={pCorner}
            y2={pCreaseY}
            stroke="var(--border)"
            strokeWidth="0.5"
            strokeDasharray="2,2"
            opacity="0.6"
          />
        </svg>

        {/* Content badge revealed on curl hover / rest */}
        <div
          className={`absolute bottom-2.5 right-2.5 flex items-center gap-1.5 px-2 py-1 rounded-md text-[11px] font-mono tracking-wide pointer-events-none transition-all duration-200 ${
            isHovered ? "opacity-100 scale-100 translate-x-0 translate-y-0" : "opacity-80 scale-95"
          } bg-surface-elevated/90 backdrop-blur-sm border border-border shadow-sm text-text-primary`}
          style={{
            transform: `translate(${Math.max(-10, -currentCurl * 0.12)}px, ${Math.max(-10, -currentCurl * 0.12)}px)`,
          }}
        >
          {isKinetic ? (
            <>
              <FileText className="w-3 h-3 text-text-secondary" aria-hidden="true" />
              <span className="font-medium">Minimal</span>
            </>
          ) : (
            <>
              <Sparkles className="w-3 h-3 text-amber-500 dark:text-amber-400" aria-hidden="true" />
              <span className="font-medium">Kinetic</span>
            </>
          )}
        </div>

        {/* Tooltip on wider screens */}
        <div
          className={`absolute bottom-full right-4 mb-2 hidden sm:block whitespace-nowrap px-2.5 py-1 rounded-md text-xs font-mono bg-accent text-accent-foreground shadow-md transition-all duration-150 pointer-events-none ${
            isHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-1 pointer-events-none"
          }`}
        >
          Switch to {targetModeLabel}
        </div>
      </button>
    </aside>
  );
}
