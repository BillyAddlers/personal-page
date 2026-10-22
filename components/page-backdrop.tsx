"use client";

import { motion, useScroll, useTransform } from "motion/react";

export default function PageBackdrop() {
  const { scrollYProgress } = useScroll();

  const gridY = useTransform(scrollYProgress, [0, 1], [0, 200]);

  return (
    <div
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
      aria-hidden="true"
    >
      <div className="page-backdrop__gradient absolute inset-0" />
      {/* +224px top absorbs the 200px drift; bottom oversize guards overscroll. */}
      <motion.div
        className="page-backdrop__grid absolute inset-x-0 -top-56 -bottom-16"
        style={{ y: gridY }}
      />
    </div>
  );
}
