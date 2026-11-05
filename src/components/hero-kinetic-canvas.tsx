"use client";

import React, { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { usePresentationMode } from "@/context/presentation-mode-context";
import { usePrefersReducedMotion, useIsTouchDevice } from "@/hooks/use-media-query";

// Vertex shader: Full-screen quad
const VERTEX_SHADER_SRC = `
  attribute vec2 a_position;
  varying vec2 v_uv;
  void main() {
    v_uv = (a_position + 1.0) * 0.5;
    gl_Position = vec4(a_position, 0.0, 1.0);
  }
`;

// Fragment shader: Subtle, architectural kinetic wavefield reacting to spring-damped pointer
const FRAGMENT_SHADER_SRC = `
  precision highp float;
  varying vec2 v_uv;

  uniform vec2 u_resolution;
  uniform vec2 u_mouse;
  uniform vec2 u_mouse_vel;
  uniform float u_time;
  uniform float u_dark;

  // Simple procedural hash for organic field fluctuation
  float hash(vec2 p) {
    p = fract(p * vec2(123.34, 456.21));
    p += dot(p, p + 45.32);
    return fract(p.x * p.y);
  }

  // Smooth 2D value noise
  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    float a = hash(i);
    float b = hash(i + vec2(1.0, 0.0));
    float c = hash(i + vec2(0.0, 1.0));
    float d = hash(i + vec2(1.0, 1.0));
    return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
  }

  void main() {
    vec2 st = gl_FragCoord.xy / u_resolution.xy;
    st.x *= u_resolution.x / u_resolution.y;

    vec2 mouseNorm = u_mouse / u_resolution.xy;
    mouseNorm.x *= u_resolution.x / u_resolution.y;

    // Displacement vector from cursor with spring physics
    vec2 diff = st - mouseNorm;
    float dist = length(diff);

    // Interactive pointer wake with falloff
    float radius = 0.55;
    float wake = smoothstep(radius, 0.0, dist);
    vec2 distortion = diff * wake * 0.18;

    vec2 p = st * 3.5 - distortion;
    float t = u_time * 0.35;

    // Layered harmonic flow lines
    float f = noise(p + vec2(t * 0.2, t * 0.15));
    f += 0.5 * noise(p * 2.1 - vec2(t * 0.25, -t * 0.1));

    // Contour / isoline waves
    float lines = sin((p.x * 2.0 + p.y * 3.0 + f * 4.0) * 3.14159);
    lines = smoothstep(0.85, 0.98, lines) * 0.7 + smoothstep(0.45, 0.52, lines) * 0.25;

    // Mouse proximity luminance highlight (quiet & elegant, non-blinding)
    float proximityGlow = exp(-dist * 4.2) * 0.35;

    // Palette integration based on dark / light mode
    // Light mode: warm stone / graphite ink
    // Dark mode: obsidian graphite / subtle warm luminescence
    vec3 baseColor = u_dark > 0.5 ? vec3(0.047, 0.039, 0.035) : vec3(0.98, 0.98, 0.976);
    vec3 inkColor  = u_dark > 0.5 ? vec3(0.85, 0.82, 0.78) : vec3(0.12, 0.11, 0.10);

    float alpha = (lines * 0.08 + proximityGlow * 0.12);
    // Extra subtle velocity reaction
    float speed = length(u_mouse_vel) * 0.02;
    alpha += speed * wake * 0.08;

    // Clamp alpha to ensure readability of foreground content
    alpha = clamp(alpha, 0.0, 0.22);

    vec3 finalColor = mix(baseColor, inkColor, alpha);
    gl_FragColor = vec4(finalColor, alpha);
  }
`;

function subscribeDocumentVisibility(callback: () => void) {
  if (typeof document === "undefined") return () => {};
  document.addEventListener("visibilitychange", callback);
  return () => {
    document.removeEventListener("visibilitychange", callback);
  };
}

function getVisibilitySnapshot() {
  if (typeof document === "undefined") return true;
  return document.visibilityState === "visible";
}

export function HeroKineticCanvas() {
  const { isKinetic, isMounted } = usePresentationMode();
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const prefersReducedMotion = usePrefersReducedMotion();
  const isTouchDevice = useIsTouchDevice();
  const isTabVisible = useSyncExternalStore(
    subscribeDocumentVisibility,
    getVisibilitySnapshot,
    () => true,
  );

  const [isIntersecting, setIsIntersecting] = useState(true);

  // Animation and physics state
  const mousePosRef = useRef({ x: 300, y: 200 }); // Target mouse
  const currentPosRef = useRef({ x: 300, y: 200 }); // Damped mouse
  const velocityRef = useRef({ x: 0, y: 0 }); // Current spring velocity
  const rafIdRef = useRef<number | null>(null);
  const startTimeRef = useRef<number>(0);
  const isDarkRef = useRef(false);

  // IntersectionObserver to auto-pause when scrolled out of viewport
  useEffect(() => {
    const el = containerRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          setIsIntersecting(entry.isIntersecting);
        }
      },
      { threshold: 0.05 },
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
    };
  }, []);

  // Sync dark mode state for shader
  useEffect(() => {
    if (typeof document === "undefined") return;
    isDarkRef.current = document.documentElement.classList.contains("dark");
    const observer = new MutationObserver(() => {
      isDarkRef.current = document.documentElement.classList.contains("dark");
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  // Mouse move listener across window with spring physics target
  useEffect(() => {
    if (!isKinetic || prefersReducedMotion || isTouchDevice) return;

    const handlePointerMove = (e: MouseEvent) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      mousePosRef.current = {
        x: e.clientX - rect.left,
        y: rect.height - (e.clientY - rect.top), // invert Y for WebGL coordinates
      };
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
    };
  }, [isKinetic, prefersReducedMotion, isTouchDevice]);

  // WebGL Render Loop with auto-pause & spring damping
  useEffect(() => {
    const shouldAnimate =
      isMounted &&
      isKinetic &&
      !prefersReducedMotion &&
      !isTouchDevice &&
      isIntersecting &&
      isTabVisible;

    if (!shouldAnimate) {
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
        rafIdRef.current = null;
      }
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;

    if (startTimeRef.current === 0) {
      startTimeRef.current = Date.now();
    }

    // WebGL initialization
    const gl =
      canvas.getContext("webgl", { alpha: true, antialias: false, powerPreference: "low-power" }) ||
      (canvas.getContext("experimental-webgl") as WebGLRenderingContext | null);

    if (!gl) {
      return;
    }

    function createShader(type: number, src: string): WebGLShader | null {
      if (!gl) return null;
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, src);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    }

    const vertShader = createShader(gl.VERTEX_SHADER, VERTEX_SHADER_SRC);
    const fragShader = createShader(gl.FRAGMENT_SHADER, FRAGMENT_SHADER_SRC);

    if (!vertShader || !fragShader) return;

    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vertShader);
    gl.attachShader(program, fragShader);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      return;
    }

    gl.useProgram(program);

    // Quad geometry buffer
    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    const positions = new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]);
    gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);

    const posAttr = gl.getAttribLocation(program, "a_position");
    gl.enableVertexAttribArray(posAttr);
    gl.vertexAttribPointer(posAttr, 2, gl.FLOAT, false, 0, 0);

    // Uniform locations
    const uResLoc = gl.getUniformLocation(program, "u_resolution");
    const uMouseLoc = gl.getUniformLocation(program, "u_mouse");
    const uMouseVelLoc = gl.getUniformLocation(program, "u_mouse_vel");
    const uTimeLoc = gl.getUniformLocation(program, "u_time");
    const uDarkLoc = gl.getUniformLocation(program, "u_dark");

    // Resize handler
    const updateSize = () => {
      if (!canvas) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = Math.floor(canvas.clientWidth * dpr);
      const height = Math.floor(canvas.clientHeight * dpr);
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
        gl.viewport(0, 0, width, height);
      }
    };
    updateSize();

    // Spring damping parameters
    const stiffness = 0.08;
    const damping = 0.78;

    // Render loop
    const render = () => {
      updateSize();

      // Spring damping calculation for smooth pointer following
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const targetX = mousePosRef.current.x * dpr;
      const targetY = mousePosRef.current.y * dpr;

      const currX = currentPosRef.current.x;
      const currY = currentPosRef.current.y;

      const forceX = (targetX - currX) * stiffness;
      const forceY = (targetY - currY) * stiffness;

      velocityRef.current.x = (velocityRef.current.x + forceX) * damping;
      velocityRef.current.y = (velocityRef.current.y + forceY) * damping;

      currentPosRef.current.x += velocityRef.current.x;
      currentPosRef.current.y += velocityRef.current.y;

      const elapsedTime = (Date.now() - startTimeRef.current) / 1000;

      gl.useProgram(program);
      gl.uniform2f(uResLoc, canvas.width, canvas.height);
      gl.uniform2f(uMouseLoc, currentPosRef.current.x, currentPosRef.current.y);
      gl.uniform2f(uMouseVelLoc, velocityRef.current.x, velocityRef.current.y);
      gl.uniform1f(uTimeLoc, elapsedTime);
      gl.uniform1f(uDarkLoc, isDarkRef.current ? 1.0 : 0.0);

      gl.drawArrays(gl.TRIANGLES, 0, 6);

      rafIdRef.current = requestAnimationFrame(render);
    };

    rafIdRef.current = requestAnimationFrame(render);

    return () => {
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
        rafIdRef.current = null;
      }
      gl.deleteBuffer(positionBuffer);
      gl.deleteProgram(program);
      gl.deleteShader(vertShader);
      gl.deleteShader(fragShader);
    };
  }, [isMounted, isKinetic, prefersReducedMotion, isTouchDevice, isIntersecting, isTabVisible]);

  // In Minimal Mode, return zero canvas overhead
  if (!isKinetic) {
    return null;
  }

  // Fallback for prefers-reduced-motion or touch devices
  if (prefersReducedMotion || isTouchDevice) {
    return (
      <div
        ref={containerRef}
        aria-hidden="true"
        className="absolute inset-0 -z-10 pointer-events-none overflow-hidden rounded-2xl transition-opacity duration-500"
      >
        {/* Subtle, static ambient radial accent (strictly anti-slop, using design tokens) */}
        <div
          className="absolute inset-0 opacity-60 dark:opacity-40"
          style={{
            backgroundImage:
              "radial-gradient(circle at 80% 20%, var(--surface-subtle) 0%, transparent 65%), radial-gradient(circle at 20% 80%, var(--surface-muted) 0%, transparent 60%)",
          }}
        />
        <div className="absolute inset-0 border border-border/40 rounded-2xl" />
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="absolute inset-0 -z-10 pointer-events-none overflow-hidden rounded-2xl transition-opacity duration-700 opacity-90 dark:opacity-80"
    >
      <canvas ref={canvasRef} className="w-full h-full block" />
      {/* Subtle hairline frame blending the canvas into the background */}
      <div className="absolute inset-0 border border-border/30 rounded-2xl pointer-events-none" />
    </div>
  );
}
