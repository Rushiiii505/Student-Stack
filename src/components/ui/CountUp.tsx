"use client";

import { useEffect, useRef } from "react";
import { motion, useInView, useSpring, useTransform } from "framer-motion";

interface CountUpProps {
  end: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
}

export function CountUp({ end, duration = 2, prefix = "", suffix = "", className = "" }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const hasAnimatedRef = useRef(false);

  const springValue = useSpring(0, {
    duration: duration * 1000,
    bounce: 0,
  });

  const rounded = useTransform(springValue, (latest) => {
    // Format with commas
    return Math.round(latest).toLocaleString();
  });

  useEffect(() => {
    if (inView && !hasAnimatedRef.current) {
      hasAnimatedRef.current = true;
      springValue.set(end);
    }
  }, [inView, end, springValue]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      <motion.span>{rounded}</motion.span>
      {suffix}
    </span>
  );
}
