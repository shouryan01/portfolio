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

  // Fluid turbulence noise
  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }

  float snoise(vec2 v) {
    const vec4 C = vec4(0.211324865405187, 0.366025403784439,
                       -0.577350269189626, 0.024390243902439);
    vec2 i  = floor(v + dot(v, C.yy));
    vec2 x0 = v -   i + dot(i, C.xx);
    vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod289(i);
    vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
    vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
    m = m*m;
    m = m*m;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);
    vec3 g;
    g.x  = a0.x  * x0.x  + h.x  * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
  }

  void main() {
    vec2 st = gl_FragCoord.xy / u_res.xy;
    st.x *= u_res.x / u_res.y;

    vec2 mouseNorm = u_mouse / u_res.xy;
    mouseNorm.x *= u_res.x / u_res.y;

    vec2 diff = st - mouseNorm;
    float dist = length(diff);

    // Mouse velocity fluid vortex
    float speed = length(u_mouse_vel) * 0.015;
    float vortex = exp(-dist * 5.0) * (speed + 0.6);

    vec2 uv = st * 2.4;
    float t = u_time * 0.25;

    // Multi-octave fluid ether swirls
    vec2 q = vec2(
      snoise(uv + vec2(t * 0.3, t * 0.2)),
      snoise(uv + vec2(t * 0.2, -t * 0.3))
    );

    vec2 r = vec2(
      snoise(uv + 2.0 * q + vec2(1.7, 9.2) + 0.15 * t),
      snoise(uv + 2.0 * q + vec2(8.3, 2.8) - 0.126 * t)
    );

    // Distort space around mouse fluid wake
    r += normalize(diff + 0.001) * vortex * 0.35;

    float f = snoise(uv + r * 1.5);

    // Dynamic chromatic liquid ether colors
    vec3 colorA = u_dark > 0.5 ? vec3(0.05, 0.1, 0.25) : vec3(0.9, 0.94, 0.98);
    vec3 colorB = u_dark > 0.5 ? vec3(0.7, 0.2, 0.6) : vec3(0.2, 0.45, 0.85);
    vec3 colorC = u_dark > 0.5 ? vec3(0.1, 0.85, 0.75) : vec3(0.95, 0.5, 0.2);

    vec3 col = mix(colorA, colorB, clamp(f * f * 3.5, 0.0, 1.0));
    col = mix(col, colorC, clamp(length(q), 0.0, 1.0) * 0.6);
    col += vortex * vec3(0.3, 0.5, 0.9) * 0.5;

    float alpha = clamp(length(col) * (u_dark > 0.5 ? 0.55 : 0.4), 0.0, 0.85);

    gl_FragColor = vec4(col, alpha);
  }
`;

export function EtherCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();
  const isTouchDevice = useIsTouchDevice();
  const [isIntersecting, setIsIntersecting] = useState(true);

  const mouseRef = useRef({ x: 300, y: 300 });
  const springMouseRef = useRef({ x: 300, y: 300 });
  const velRef = useRef({ x: 0, y: 0 });
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

      const tx = mouseRef.current.x * dpr;
      const ty = mouseRef.current.y * dpr;
      const fx = (tx - springMouseRef.current.x) * 0.08;
      const fy = (ty - springMouseRef.current.y) * 0.08;
      velRef.current.x = (velRef.current.x + fx) * 0.78;
      velRef.current.y = (velRef.current.y + fy) * 0.78;
      springMouseRef.current.x += velRef.current.x;
      springMouseRef.current.y += velRef.current.y;

      const isDark = document.documentElement.classList.contains("dark");
      const elapsed = (Date.now() - startTimeRef.current) / 1000;

      gl.useProgram(prog);
      gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.uniform2f(uMouse, springMouseRef.current.x, springMouseRef.current.y);
      gl.uniform2f(uMouseVel, velRef.current.x, velRef.current.y);
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
