"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";
import { useMounted } from "@/components/use-mounted";

export default function Template({ children }: { children: ReactNode }) {
  const mounted = useMounted();
  const prefersReducedMotion = useReducedMotion();

  if (!mounted || prefersReducedMotion) {
    return <>{children}</>;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.28, ease: "easeOut" }}
      className="flex flex-1 flex-col"
    >
      {children}
    </motion.div>
  );
}
