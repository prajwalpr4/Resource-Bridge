"use client";

// ============================================
// Auth Layout — Clean, no sidebar
// ============================================

import { ThemeProvider } from "@/context/theme-context";
import type { ReactNode } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return <ThemeProvider>{children}</ThemeProvider>;
}
