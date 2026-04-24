"use client";

// ============================================
// Dashboard Layout — Admin sidebar + content area
// ============================================

import { ThemeProvider } from "@/context/theme-context";
import { AuthProvider } from "@/context/auth-context";
import Sidebar from "@/components/layout/sidebar";
import type { ReactNode } from "react";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <AuthProvider>
        <div className="flex min-h-screen bg-bg-primary">
          <Sidebar />
          <main className="flex-1 min-w-0 overflow-x-hidden">
            <div className="max-w-7xl mx-auto px-6 lg:px-10 py-8">{children}</div>
          </main>
        </div>
      </AuthProvider>
    </ThemeProvider>
  );
}

