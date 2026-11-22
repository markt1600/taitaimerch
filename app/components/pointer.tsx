"use client";

import { useEffect, useRef, type ReactNode } from "react";

/** Tracks the pointer and exposes it to CSS as --mx / --my (in px). */
export function Spotlight() {
  useEffect(() => {
    if (!window.matchMedia("(hover: hover)").matches) return;
    const root = document.documentElement;
    let frame = 0;
    const onMove = (e: PointerEvent) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        root.style.setProperty("--mx", `${e.clientX}px`);
        root.style.setProperty("--my", `${e.clientY}px`);
      });
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(frame);
    };
  }, []);
  return null;
}

/** Sets --tx / --ty (-1..1) on its element from the pointer position. */
export function Tilt({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  function set(x: number, y: number) {
    ref.current?.style.setProperty("--tx", x.toFixed(3));
    ref.current?.style.setProperty("--ty", y.toFixed(3));
  }

  return (
    <div
      ref={ref}
      className={className}
      onPointerMove={(e) => {
        if (e.pointerType !== "mouse") return;
        const r = e.currentTarget.getBoundingClientRect();
        set(
          ((e.clientX - r.left) / r.width) * 2 - 1,
          ((e.clientY - r.top) / r.height) * 2 - 1,
        );
      }}
      onPointerLeave={() => set(0, 0)}
    >
      {children}
    </div>
  );
}
