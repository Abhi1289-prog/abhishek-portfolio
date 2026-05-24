"use client";

import { motion } from "framer-motion";

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description?: string;
};

export function SectionHeading({ eyebrow, title, description }: SectionHeadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.55, ease: "easeOut" }}
      className="mx-auto mb-10 max-w-3xl text-center"
    >
      <p className="text-xs font-semibold tracking-[0.2em] text-cyan-500 uppercase">{eyebrow}</p>
      <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900 md:text-4xl dark:text-white">{title}</h2>
      {description ? <p className="mt-4 text-slate-600 dark:text-slate-300">{description}</p> : null}
    </motion.div>
  );
}
