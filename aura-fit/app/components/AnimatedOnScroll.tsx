"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface AnimatedOnScrollProps {
  children: ReactNode;
  className?: string;
}

export default function AnimatedOnScroll({ children, className }: AnimatedOnScrollProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.2 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
