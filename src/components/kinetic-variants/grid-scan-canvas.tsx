"use client";

import React, { useEffect, useRef, useState } from "react";
import { usePrefersReducedMotion, useIsTouchDevice } from "@/hooks/use-media-query";

export function GridScanCanvas() {
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

    let scanY = 0;
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

      // Perspective horizon setup
      const horizonY = height * 0.35;
      const vanishingX = width * 0.5 + (springMouseRef.current.x - width * 0.5) * 0.25;

      // Draw perspective longitudinal lines
      const longCount = 36;
      ctx.lineWidth = 1;

      for (let i = 0; i <= longCount; i++) {
        const bottomX = (width / longCount) * i;
        ctx.beginPath();
        ctx.moveTo(vanishingX, horizonY);
        ctx.lineTo(bottomX, height);
        ctx.strokeStyle = isDark ? "rgba(56, 189, 248, 0.12)" : "rgba(14, 165, 233, 0.15)";
        ctx.stroke();
      }

      // Draw exponential perspective horizontal lines with wave ripple
      const latCount = 28;
      for (let i = 1; i <= latCount; i++) {
        const norm = i / latCount;
        const y = horizonY + Math.pow(norm, 2.2) * (height - horizonY);

        ctx.beginPath();
        const steps = 40;
        for (let j = 0; j <= steps; j++) {
          const x = (width / steps) * j;
          // Mouse elevation ripple
          const dx = x - springMouseRef.current.x;
          const dy = y - springMouseRef.current.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const ripple = Math.exp(-dist * 0.015) * Math.sin(dist * 0.08 - time * 4.0) * 18;

          const displacedY = y + ripple;
          if (j === 0) ctx.moveTo(x, displacedY);
          else ctx.lineTo(x, displacedY);
        }

        const alpha = isDark ? 0.08 + norm * 0.28 : 0.06 + norm * 0.22;
        ctx.strokeStyle = isDark ? `rgba(168, 85, 247, ${alpha})` : `rgba(79, 70, 229, ${alpha})`;
        ctx.stroke();
      }

      // Traveling laser scan beam
      scanY = (scanY + 2.5) % height;
      const beamGrad = ctx.createLinearGradient(0, scanY - 20, 0, scanY + 20);
      beamGrad.addColorStop(0, "rgba(56, 189, 248, 0)");
      beamGrad.addColorStop(0.5, isDark ? "rgba(56, 189, 248, 0.35)" : "rgba(14, 165, 233, 0.25)");
      beamGrad.addColorStop(1, "rgba(56, 189, 248, 0)");

      ctx.fillStyle = beamGrad;
      ctx.fillRect(0, scanY - 20, width, 40);

      // Mouse radar cursor ring
      ctx.beginPath();
      ctx.arc(springMouseRef.current.x, springMouseRef.current.y, 48, 0, Math.PI * 2);
      ctx.strokeStyle = isDark ? "rgba(56, 189, 248, 0.45)" : "rgba(14, 165, 233, 0.4)";
      ctx.lineWidth = 1.5;
      ctx.stroke();

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
