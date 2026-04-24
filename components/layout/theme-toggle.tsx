"use client";

// ============================================
// Theme Toggle — Dark/Light mode switch
// ============================================

import { motion } from "framer-motion";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "@/context/theme-context";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="relative flex h-9 w-9 items-center justify-center rounded-lg border border-border-primary bg-bg-secondary text-text-secondary transition-all duration-200 hover:border-border-secondary hover:bg-bg-tertiary hover:text-text-primary"
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
    >
      <motion.div
        key={theme}
        initial={{ scale: 0, rotate: -90 }}
        animate={{ scale: 1, rotate: 0 }}
        exit={{ scale: 0, rotate: 90 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
      >
        {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
      </motion.div>
    </button>
  );
}
