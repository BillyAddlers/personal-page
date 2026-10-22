"use client";

import { useEffect, useRef, useState } from "react";
import { animate, createTimeline, stagger } from "animejs";

const SPLASH_WORD = "こんにちは";

export default function Splash() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const letters = Array.from(
      root.querySelectorAll<HTMLElement>("[data-letter]"),
    );
    const bar = root.querySelector<SVGRectElement>("[data-bar]");

    const intro = createTimeline({ defaults: { ease: "outExpo" } }).add(
      letters,
      { opacity: [0, 1], y: [28, 0], duration: 600, delay: stagger(40) },
      0,
    );

    if (bar) {
      intro.add(
        bar,
        { strokeDashoffset: [100, 0], duration: 1100, ease: "inOutQuad" },
        250,
      );
    }

    intro.then(() => {
      animate(root, { opacity: [1, 0], duration: 400, ease: "inQuad" }).then(
        () => setDone(true),
      );
    });

    return () => {
      intro.pause();
    };
  }, []);

  if (done) return null;

  return (
    <div
      ref={rootRef}
      role="status"
      aria-label="Loading"
      className="fixed inset-0 z-100 flex select-none flex-col items-center justify-center gap-6 bg-background motion-reduce:hidden"
    >
      <div className="relative inline-flex px-6 py-4">
        <div className="flex text-4xl font-medium tracking-tight text-foreground">
          {Array.from(SPLASH_WORD).map((char, i) => (
            <span
              key={i}
              data-letter
              className="inline-block"
              style={{ opacity: 0 }}
            >
              {char === " " ? "\u00A0" : char}
            </span>
          ))}
        </div>
        <svg
          className="pointer-events-none absolute left-px top-px h-[calc(100%_-_2px)] w-[calc(100%_-_2px)] overflow-visible"
          aria-hidden="true"
        >
          <rect
            width="100%"
            height="100%"
            rx="14"
            pathLength="100"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            className="text-foreground/15"
          />
          <rect
            data-bar
            width="100%"
            height="100%"
            rx="14"
            pathLength="100"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="text-foreground"
            style={{ strokeDasharray: "100 100", strokeDashoffset: 100 }}
          />
        </svg>
      </div>
    </div>
  );
}
