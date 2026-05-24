"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect } from "react";

export function CursorGlow() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const smoothX = useSpring(x, { stiffness: 200, damping: 30, mass: 0.5 });
  const smoothY = useSpring(y, { stiffness: 200, damping: 30, mass: 0.5 });

  useEffect(() => {
    const handleMove = (event: MouseEvent) => {
      x.set(event.clientX - 100);
      y.set(event.clientY - 100);
    };

    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, [x, y]);

  return (
    <motion.div
      aria-hidden
      style={{ x: smoothX, y: smoothY }}
      className="pointer-events-none fixed top-0 left-0 z-0 hidden h-52 w-52 rounded-full bg-cyan-400/20 blur-3xl md:block dark:bg-indigo-500/20"
    />
  );
}
