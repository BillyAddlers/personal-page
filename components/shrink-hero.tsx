"use client";

import { motion, useMotionValue, useReducedMotion, useScroll } from "motion/react";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { useMounted } from "@/components/use-mounted";

// Scroll distance over which the extra viewport space collapses.
const SCROLL_RANGE = 320;
// Below this much extra space the shrink is invisible, so leave the hero at
// its natural height instead of forcing it to fill the viewport.
const MIN_COLLAPSE = 16;

export default function ShrinkHero({ children }: { children: ReactNode }) {
  const mounted = useMounted();
  const prefersReducedMotion = useReducedMotion();
  const reduced = mounted && Boolean(prefersReducedMotion);

  const frameRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const [viewportHeight, setViewportHeight] = useState(0);
  const [naturalHeight, setNaturalHeight] = useState(0);
  const [ready, setReady] = useState(false);

  const { scrollY } = useScroll();

  useEffect(() => {
    const measure = () => {
      const frame = frameRef.current;
      const content = contentRef.current;
      if (!frame || !content) return;

      const styles = getComputedStyle(frame);
      const padding =
        parseFloat(styles.paddingTop) + parseFloat(styles.paddingBottom);
      const nextNatural = Math.round(
        content.getBoundingClientRect().height + padding,
      );

      setViewportHeight(window.innerHeight);
      setNaturalHeight(nextNatural);
      setReady(true);
    };

    // Defer the first measurement so the section paints at min-height first.
    const frame = requestAnimationFrame(measure);
    const observer = new ResizeObserver(measure);
    if (contentRef.current) observer.observe(contentRef.current);
    window.addEventListener("resize", measure);
    window.addEventListener("load", measure);

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("resize", measure);
      window.removeEventListener("load", measure);
    };
  }, []);

  const collapse = Math.max(0, viewportHeight - naturalHeight);
  const shrinks = ready && !reduced && collapse > MIN_COLLAPSE;

  // Height is held in a MotionValue so an anchor jump can pin it; the pin and
  // the scroll-linked value can never disagree.
  const height = useMotionValue(0);

  useEffect(() => {
    if (!ready) return;

    const apply = (offset: number) => {
      // While the work link's anchor jump is in effect the hero is held fully
      // collapsed; any later scroll clears that state.
      if (sectionRef.current?.dataset.collapsed === "true") {
        delete sectionRef.current.dataset.collapsed;
        height.set(naturalHeight);
        return;
      }

      if (!shrinks) {
        height.set(naturalHeight);
        return;
      }

      const progress = Math.min(1, Math.max(0, offset / SCROLL_RANGE));
      height.set(viewportHeight + (naturalHeight - viewportHeight) * progress);
    };

    apply(scrollY.get());
    return scrollY.on("change", apply);
  }, [ready, shrinks, naturalHeight, viewportHeight, height, scrollY]);

  return (
    <motion.section
      ref={sectionRef}
      data-shrink-hero
      data-natural-height={ready ? naturalHeight : undefined}
      className={`flex items-center border-b border-foreground/10 ${
        ready ? "" : "min-h-svh motion-reduce:min-h-0"
      }`}
      style={ready ? { height } : undefined}
    >
      <div
        ref={frameRef}
        className="mx-auto w-full max-w-6xl px-6 py-16 sm:px-10 sm:py-24"
      >
        <div
          ref={contentRef}
          className="grid w-full items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]"
        >
          {children}
        </div>
      </div>
    </motion.section>
  );
}
