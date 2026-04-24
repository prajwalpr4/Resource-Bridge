"use client";

// ============================================
// Volunteer Layout — Bottom nav + content area
// ============================================

import { ThemeProvider } from "@/context/theme-context";
import { AuthProvider } from "@/context/auth-context";
import BottomNav from "@/components/layout/bottom-nav";
import ThemeToggle from "@/components/layout/theme-toggle";
import { Zap } from "lucide-react";
import type { ReactNode } from "react";

export default function VolunteerLayout({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <AuthProvider>
        <div className="min-h-screen bg-bg-primary pb-[80px]">
          {/* Top header bar */}
          <header className="sticky top-0 z-40 flex h-14 items-center justify-between border-b border-border-primary bg-bg-primary/80 backdrop-blur-xl px-4">
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-md bg-accent text-white">
                <Zap size={12} />
              </div>
              <span className="text-sm font-bold text-text-primary tracking-tight">ResourceBridge</span>
            </div>
            <ThemeToggle />
          </header>
          <main className="max-w-lg mx-auto px-4 py-6">{children}</main>
          <BottomNav />
        </div>
      </AuthProvider>
    </ThemeProvider>
  );
}

