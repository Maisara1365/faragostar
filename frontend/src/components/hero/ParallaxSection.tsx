"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

interface ParallaxSectionProps {
  speed?: number;
}

export function ParallaxSection({ speed = 0.5 }: ParallaxSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 100 * speed]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <motion.div
      ref={ref}
      style={{ y, opacity }}
      className="absolute inset-0 -z-10"
    >
      <div className="absolute top-1/4 left-1/4 h-64 w-64 rounded-full bg-[#46A6D9]/5 blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 h-96 w-96 rounded-full bg-[#183B73]/5 blur-3xl" />
    </motion.div>
  );
}