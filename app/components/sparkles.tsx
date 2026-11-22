"use client";

import { useEffect, useRef } from "react";

const COLORS = ["#e4c988", "#f3ebdd", "#c9a24b", "#fbf6ec", "#a6bbb0"];

/** A field of slowly twinkling glints — rhinestones catching the light. */
export default function Sparkles({ density = 1 }: { density?: number }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let w = 0;
    let h = 0;
    let frame = 0;
    let visible = true;
    let glints: {
      x: number;
      y: number;
      r: number;
      phase: number;
      speed: number;
      color: string;
    }[] = [];

    function seed() {
      const count = Math.round(((w * h) / 9000) * density);
      glints = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: 2 + Math.random() ** 2.5 * 13,
        phase: Math.random() * Math.PI * 2,
        speed: 0.4 + Math.random() * 1.1,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
      }));
    }

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas!.clientWidth;
      h = canvas!.clientHeight;
      canvas!.width = w * dpr;
      canvas!.height = h * dpr;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      seed();
      if (still) draw(0);
    }

    function draw(t: number) {
      ctx!.clearRect(0, 0, w, h);
      for (const g of glints) {
        const pulse = Math.sin(g.phase + (t / 1000) * g.speed);
        const a = Math.max(0, pulse) ** 2;
        if (a < 0.02) continue;
        const r = g.r * (0.6 + a * 0.4);
        const k = r * 0.16;
        ctx!.globalAlpha = a * 0.9;
        ctx!.fillStyle = g.color;
        ctx!.shadowColor = g.color;
        ctx!.shadowBlur = r * 1.5;
        ctx!.beginPath();
        ctx!.moveTo(g.x, g.y - r);
        ctx!.quadraticCurveTo(g.x + k, g.y - k, g.x + r, g.y);
        ctx!.quadraticCurveTo(g.x + k, g.y + k, g.x, g.y + r);
        ctx!.quadraticCurveTo(g.x - k, g.y + k, g.x - r, g.y);
        ctx!.quadraticCurveTo(g.x - k, g.y - k, g.x, g.y - r);
        ctx!.fill();
      }
    }

    function loop(t: number) {
      draw(t);
      if (visible) frame = requestAnimationFrame(loop);
    }

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    resize();

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      cancelAnimationFrame(frame);
      if (visible && !still) frame = requestAnimationFrame(loop);
    });
    io.observe(canvas);

    return () => {
      cancelAnimationFrame(frame);
      ro.disconnect();
      io.disconnect();
    };
  }, [density]);

  return <canvas ref={ref} className="sparkles" aria-hidden="true" />;
}
