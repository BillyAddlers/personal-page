"use client";

import type { ReactNode } from "react";

export default function WorkLink({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <a
      href="#work"
      className={className}
      onClick={(event) => {
        if (
          event.defaultPrevented ||
          event.metaKey ||
          event.ctrlKey ||
          event.shiftKey ||
          event.altKey
        ) {
          return;
        }

        const target = document.getElementById("work");
        if (!target) return;

        event.preventDefault();

        const hero = document.querySelector<HTMLElement>("[data-shrink-hero]");
        const natural = Number(hero?.dataset.naturalHeight ?? 0);

        // Collapse the hero completely before measuring.
        if (hero && natural > 0) {
          hero.dataset.collapsed = "true";
          hero.style.height = `${natural}px`;
        }

        // Read the target after the hero has its final height.
        void target.getBoundingClientRect();

        const targetTop = target.getBoundingClientRect().top + window.scrollY;
        const targetMargin =
          Number.parseFloat(getComputedStyle(target).scrollMarginTop) || 0;

        window.scrollTo({ top: Math.max(0, targetTop - targetMargin) });
        // Leave the URL hash alone: on reload it is applied before the hero has
        // measured, landing past the heading.
      }}
    >
      {children}
    </a>
  );
}
