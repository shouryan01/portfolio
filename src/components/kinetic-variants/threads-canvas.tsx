"use client";

import React, { useEffect, useRef, useState } from "react";
import { usePrefersReducedMotion, useIsTouchDevice } from "@/hooks/use-media-query";

interface Point {
  x: number;
  y: number;
  vx: number;
  vy: number;
  originX: number;
  originY: number;
}

export function ThreadsCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();
  const isTouchDevice = useIsTouchDevice();
  const [isIntersecting, setIsIntersecting] = useState(true);

  const mouseRef = useRef({ x: -1000, y: -1000 });
  const springMouseRef = useRef({ x: -1000, y: -1000 });
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

    // Generate horizontal threads with dynamic spline vertices
    const threadCount = 18;
    const segmentsPerThread = 28;
    const threads: Point[][] = [];

    for (let i = 0; i < threadCount; i++) {
      const thread: Point[] = [];
      const baseY = (height / (threadCount + 1)) * (i + 1);
      for (let j = 0; j <= segmentsPerThread; j++) {
        const x = (width / segmentsPerThread) * j;
        thread.push({
          x,
          y: baseY,
          vx: 0,
          vy: 0,
          originX: x,
          originY: baseY,
        });
      }
      threads.push(thread);
    }

    let time = 0;

    const render = () => {
      time += 0.02;
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

      ctx.lineWidth = 1.2;

      for (let i = 0; i < threads.length; i++) {
        const thread = threads[i];
        ctx.beginPath();

        for (let j = 0; j < thread.length; j++) {
          const pt = thread[j];

          // Natural harmonic ambient sway
          const ambientWave = Math.sin(time * 1.5 + j * 0.35 + i * 0.5) * 12;

          // Mouse magnetic interaction
          const dx = pt.x - springMouseRef.current.x;
          const dy = pt.y - springMouseRef.current.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const maxDist = 220;

          if (dist < maxDist && dist > 0) {
            const force = (1 - dist / maxDist) * 45;
            pt.vx += (dx / dist) * force * 0.1;
            pt.vy += (dy / dist) * force * 0.1;
          }

          // Spring return to baseline origin
          const springX = (pt.originX - pt.x) * 0.08;
          const springY = (pt.originY + ambientWave - pt.y) * 0.08;
          pt.vx = (pt.vx + springX) * 0.85;
          pt.vy = (pt.vy + springY) * 0.85;

          pt.x += pt.vx;
          pt.y += pt.vy;

          if (j === 0) {
            ctx.moveTo(pt.x, pt.y);
          } else {
            const prev = thread[j - 1];
            const cx = (prev.x + pt.x) / 2;
            const cy = (prev.y + pt.y) / 2;
            ctx.quadraticCurveTo(prev.x, prev.y, cx, cy);
          }
        }

        // Distinct vibrant thread stroke colors
        const alpha = isDark ? 0.35 + (i % 3) * 0.15 : 0.25 + (i % 3) * 0.1;
        if (isDark) {
          ctx.strokeStyle =
            i % 2 === 0 ? `rgba(96, 165, 250, ${alpha})` : `rgba(244, 114, 182, ${alpha})`;
        } else {
          ctx.strokeStyle =
            i % 2 === 0 ? `rgba(37, 99, 235, ${alpha})` : `rgba(217, 70, 239, ${alpha})`;
        }
        ctx.stroke();
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
