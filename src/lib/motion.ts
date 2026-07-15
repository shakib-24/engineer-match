import type { Variants } from "motion/react";

interface StaggerOptions {
  staggerChildren?: number;
  delayChildren?: number;
}

interface FadeUpOptions {
  y?: number;
  duration?: number;
}

interface FadeOptions {
  duration?: number;
}

export function staggerContainer(
  prefersReducedMotion: boolean | null,
  { staggerChildren = 0.08, delayChildren = 0 }: StaggerOptions = {},
): Variants {
  return {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: prefersReducedMotion ? 0 : staggerChildren,
        delayChildren: prefersReducedMotion ? 0 : delayChildren,
      },
    },
  };
}

export function fadeUpItem(
  prefersReducedMotion: boolean | null,
  { y = 16, duration = 0.4 }: FadeUpOptions = {},
): Variants {
  return {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : y },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: prefersReducedMotion ? 0 : duration, ease: "easeOut" },
    },
  };
}

export function fadeOnly(
  prefersReducedMotion: boolean | null,
  { duration = 0.5 }: FadeOptions = {},
): Variants {
  return {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: prefersReducedMotion ? 0 : duration, ease: "easeOut" },
    },
  };
}
