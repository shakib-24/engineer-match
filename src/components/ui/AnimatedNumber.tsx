"use client";

import { useEffect, useRef, useState } from "react";
import { animate, useInView, useReducedMotion } from "motion/react";

interface AnimatedNumberProps {
  value: number;
  suffix?: string;
}

export function AnimatedNumber({ value, suffix = "" }: AnimatedNumberProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10% 0px" });
  const prefersReducedMotion = useReducedMotion();
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!isInView || prefersReducedMotion) return;

    const controls = animate(0, value, {
      duration: 1.2,
      ease: "easeOut",
      onUpdate: (latest) => setDisplay(Math.round(latest)),
    });

    return () => controls.stop();
  }, [isInView, prefersReducedMotion, value]);

  const shown = prefersReducedMotion ? value : display;

  return (
    <span ref={ref}>
      {shown.toLocaleString("ja-JP")}
      {suffix}
    </span>
  );
}
