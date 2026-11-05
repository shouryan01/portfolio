"use client";

import React, { useEffect, useRef, useState } from "react";
import { usePrefersReducedMotion, useIsTouchDevice } from "@/hooks/use-media-query";

const VERTEX_SHADER = `
  attribute vec2 a_pos;
  void main() {
    gl_Position = vec4(a_pos, 0.0, 1.0);
  }
`;

const FRAGMENT_SHADER = `
  precision highp float;
  uniform vec2 u_res;
  uniform vec2 u_mouse;
  uniform vec2 u_mouse_vel;
  uniform float u_time;
  uniform float u_dark;

  void main() {
    vec2 st = (gl_FragCoord.xy - 0.5 * u_res) / min(u_res.x, u_res.y);

    // Camera tilt / perspective tracking spring mouse
    vec2 m = (u_mouse - 0.5 * u_res) / min(u_res.x, u_res.y);
    st -= m * 0.45;

    float r = length(st);
    float angle = atan(st.y, st.x);

    // Deep 3D Hyper-Tunnel UV coordinates
    float speed = 1.2 + length(u_mouse_vel) * 0.05;
    float depth = 1.0 / (r + 0.08);
    float z = depth * 0.8 + u_time * speed;

    // Rings and radial spokes
    float rings = sin(z * 6.28318);
    float spokes = sin(angle * 12.0 + z * 0.5);

    // Ring edge glow
    float ringGlow = smoothstep(0.4, 0.95, rings) * smoothstep(0.0, 0.5, r);
    float spokeGlow = smoothstep(0.6, 0.98, spokes) * 0.5;

    // Focal warp
    float tunnelPattern = ringGlow + spokeGlow * ringGlow;

    // Depth falloff: darkest in center, fading gracefully outward
    float centerMask = smoothstep(0.12, 0.6, r);
    tunnelPattern *= centerMask;

    // Dynamic color tuning
    // Dark mode: Electric cyan/indigo-amber neon highlights into deep void
    // Light mode: High contrast graphite / warm stone perspective streaks
    vec3 colDark = mix(vec3(0.08, 0.12, 0.22), vec3(0.2, 0.85, 0.95), ringGlow * 0.7);
    colDark += vec3(0.95, 0.6, 0.15) * spokeGlow * 0.6;

    vec3 colLight = mix(vec3(0.85, 0.85, 0.84), vec3(0.15, 0.18, 0.24), tunnelPattern);

    vec3 finalCol = u_dark > 0.5 ? colDark : colLight;
    float alpha = clamp(tunnelPattern * (u_dark > 0.5 ? 0.65 : 0.45), 0.0, 0.8);

    gl_FragColor = vec4(finalCol, alpha);
  }
`;

export function TunnelCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();
  const isTouchDevice = useIsTouchDevice();
  const [isIntersecting, setIsIntersecting] = useState(true);

  const mouseRef = useRef({ x: 400, y: 300 });
  const springMouseRef = useRef({ x: 400, y: 300 });
  const velocityRef = useRef({ x: 0, y: 0 });
  const startTimeRef = useRef(0);
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
        y: rect.height - (e.clientY - rect.top),
      };
    };
    window.addEventListener("pointermove", handleMove, { passive: true });
    return () => window.removeEventListener("pointermove", handleMove);
  }, []);

  useEffect(() => {
    if (prefersReducedMotion || !isIntersecting) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    if (startTimeRef.current === 0) startTimeRef.current = Date.now();

    const gl =
      canvas.getContext("webgl", { alpha: true, antialias: false, powerPreference: "low-power" }) ||
      (canvas.getContext("experimental-webgl") as WebGLRenderingContext | null);
    if (!gl) return;

    function compile(type: number, src: string) {
      if (!gl) return null;
      const s = gl.createShader(type);
      if (!s) return null;
      gl.shaderSource(s, src);
      gl.compileShader(s);
      return gl.getShaderParameter(s, gl.COMPILE_STATUS) ? s : null;
    }

    const vs = compile(gl.VERTEX_SHADER, VERTEX_SHADER);
    const fs = compile(gl.FRAGMENT_SHADER, FRAGMENT_SHADER);
    if (!vs || !fs) return;

    const prog = gl.createProgram();
    if (!prog) return;
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return;

    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      gl.STATIC_DRAW,
    );

    const aPos = gl.getAttribLocation(prog, "a_pos");
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

    const uRes = gl.getUniformLocation(prog, "u_res");
    const uMouse = gl.getUniformLocation(prog, "u_mouse");
    const uMouseVel = gl.getUniformLocation(prog, "u_mouse_vel");
    const uTime = gl.getUniformLocation(prog, "u_time");
    const uDark = gl.getUniformLocation(prog, "u_dark");

    const render = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      const w = Math.floor(canvas.clientWidth * dpr);
      const h = Math.floor(canvas.clientHeight * dpr);
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
        gl.viewport(0, 0, w, h);
      }

      // Spring damping
      const tx = mouseRef.current.x * dpr;
      const ty = mouseRef.current.y * dpr;
      const fx = (tx - springMouseRef.current.x) * 0.08;
      const fy = (ty - springMouseRef.current.y) * 0.08;
      velocityRef.current.x = (velocityRef.current.x + fx) * 0.78;
      velocityRef.current.y = (velocityRef.current.y + fy) * 0.78;
      springMouseRef.current.x += velocityRef.current.x;
      springMouseRef.current.y += velocityRef.current.y;

      const isDark = document.documentElement.classList.contains("dark");
      const elapsed = (Date.now() - startTimeRef.current) / 1000;

      gl.useProgram(prog);
      gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.uniform2f(uMouse, springMouseRef.current.x, springMouseRef.current.y);
      gl.uniform2f(uMouseVel, velocityRef.current.x, velocityRef.current.y);
      gl.uniform1f(uTime, elapsed);
      gl.uniform1f(uDark, isDark ? 1.0 : 0.0);

      gl.drawArrays(gl.TRIANGLES, 0, 6);
      rafRef.current = requestAnimationFrame(render);
    };

    rafRef.current = requestAnimationFrame(render);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      gl.deleteBuffer(buf);
      gl.deleteProgram(prog);
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
