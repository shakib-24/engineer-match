"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";
import { fadeUpItem } from "@/lib/motion";

interface FadeInProps {
  children: ReactNode;
  className?: string;
}

export function FadeIn({ children, className }: FadeInProps) {
  const prefersReducedMotion = useReducedMotion();
  const variants = fadeUpItem(prefersReducedMotion, { duration: 0.5 });

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-10% 0px" }}
      variants={variants}
      className={className}
    >
      {children}
    </motion.div>
  );
}
