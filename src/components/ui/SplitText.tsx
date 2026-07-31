"use client";

import { motion, Variants } from "framer-motion";

interface SplitTextProps {
  text: string;
  className?: string;
}

export function SplitText({ text, className = "" }: SplitTextProps) {
  const words = text.split(" ");

  const container: Variants = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.04 * i },
    }),
  };

  const child: Variants = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring" as const,
        damping: 12,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      y: 40,
    },
  };

  return (
    <motion.div
      className={`flex flex-wrap justify-center ${className}`}
      variants={container}
      initial="hidden"
      animate="visible"
    >
      {words.map((word, index) => (
        <motion.span variants={child} key={index} className="mr-[1.5vw] lg:mr-4 inline-block">
          {word}
        </motion.span>
      ))}
    </motion.div>
  );
}
