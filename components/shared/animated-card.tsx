"use client";

// ============================================
// Animated Card — Staggered fade-in/slide-up
// ============================================

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface AnimatedCardProps {
  children: ReactNode;
  index?: number;
  className?: string;
  onClick?: () => void;
  hover?: boolean;
}

export default function AnimatedCard({
  children,
  index = 0,
  className = "",
  onClick,
  hover = true,
}: AnimatedCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.4,
        delay: index * 0.05,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      whileHover={hover ? { y: -2, transition: { duration: 0.2 } } : undefined}
      onClick={onClick}
      className={cn(
        "rounded-xl border border-border-primary bg-bg-secondary p-5",
        "transition-colors duration-200",
        hover && "cursor-pointer hover:border-border-secondary hover:bg-bg-tertiary",
        className
      )}
    >
      {children}
    </motion.div>
  );
}
