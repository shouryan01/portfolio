"use client";

import React, { useEffect, useRef, useState } from "react";
import { usePrefersReducedMotion, useIsTouchDevice } from "@/hooks/use-media-query";

const GLYPHS = ["@", "%", "#", "*", "+", "=", "-", ":", "."];

export function AsciiCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();
  const isTouchDevice = useIsTouchDevice();
  const [isIntersecting, setIsIntersecting] = useState(true);

  const mouseRef = useRef({ x: 300, y: 300 });
  const springMouseRef = useRef({ x: 300, y: 300 });
  const velRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(
      ([entry]) => setIsIntersecting(entry.isIntersecting),
      {
        threshold: 0.05,
      },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };
    window.addEventListener("pointermove", handleMove, { passive: true });
    return () => window.removeEventListener("pointermove", handleMove);
  }, []);

  useEffect(() => {
    if (prefersReducedMotion || !isIntersecting) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = canvas.clientWidth);
    let height = (canvas.height = canvas.clientHeight);

    let time = 0;
    const charSize = 18;

    const render = () => {
      time += 0.03;
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      if (canvas.width !== w || canvas.height !== h) {
        width = canvas.width = w;
        height = canvas.height = h;
      }

      ctx.clearRect(0, 0, width, height);

      // Spring mouse interpolation
      const fx = (mouseRef.current.x - springMouseRef.current.x) * 0.12;
      const fy = (mouseRef.current.y - springMouseRef.current.y) * 0.12;
      velRef.current.x = (velRef.current.x + fx) * 0.75;
      velRef.current.y = (velRef.current.y + fy) * 0.75;
      springMouseRef.current.x += velRef.current.x;
      springMouseRef.current.y += velRef.current.y;

      const isDark = document.documentElement.classList.contains("dark");
      ctx.font = '12px "JetBrains Mono", monospace';
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      const cols = Math.floor(width / charSize);
      const rows = Math.floor(height / charSize);

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const x = c * charSize + charSize / 2;
          const y = r * charSize + charSize / 2;

          const dx = x - springMouseRef.current.x;
          const dy = y - springMouseRef.current.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          // Dynamic wave + mouse ripple
          const wave = Math.sin(c * 0.15 + r * 0.15 + time * 1.5) * 0.5 + 0.5;
          const mouseInfluence = Math.exp(-dist * 0.012) * 1.8;
          const totalVal = Math.min(1, wave * 0.4 + mouseInfluence);

          const glyphIndex = Math.floor((1 - totalVal) * (GLYPHS.length - 1));
          const glyph = GLYPHS[Math.max(0, Math.min(GLYPHS.length - 1, glyphIndex))];

          if (mouseInfluence > 0.15) {
            // Bright highlight near mouse
            ctx.fillStyle = isDark
              ? `rgba(52, 211, 153, ${0.4 + mouseInfluence * 0.5})`
              : `rgba(5, 150, 105, ${0.35 + mouseInfluence * 0.5})`;
          } else {
            // Ambient subtle matrix glow
            const alpha = isDark ? 0.08 + wave * 0.12 : 0.06 + wave * 0.1;
            ctx.fillStyle = isDark
              ? `rgba(148, 163, 184, ${alpha})`
              : `rgba(71, 85, 105, ${alpha})`;
          }

          ctx.fillText(glyph, x, y);
        }
      }

      rafRef.current = requestAnimationFrame(render);
    };

    rafRef.current = requestAnimationFrame(render);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [prefersReducedMotion, isTouchDevice, isIntersecting]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 w-screen h-screen -z-10 overflow-hidden pointer-events-none"
    >
      <canvas ref={canvasRef} className="w-full h-full block" />
    </div>
  );
}
