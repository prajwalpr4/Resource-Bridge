"use client";

// ============================================
// Admin Sidebar — Linear-inspired navigation
// ============================================

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  Sparkles,
  ScanLine,
  MapPin,
  ClipboardList,
  Users,
  Settings,
  LogOut,
  ChevronLeft,
  Zap,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/context/auth-context";
import { signOut } from "@/lib/auth";
import ThemeToggle from "./theme-toggle";

const navItems = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Smart Paste", href: "/smart-paste", icon: Sparkles },
  { label: "Scan Document", href: "/scan", icon: ScanLine },
  { label: "Priority Map", href: "/map", icon: MapPin },
  { label: "Manage Needs", href: "/needs", icon: ClipboardList },
  { label: "Volunteers", href: "/volunteers", icon: Users },
];

const bottomItems = [
  { label: "Settings", href: "/settings", icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { profile } = useAuth();
  const [collapsed, setCollapsed] = useState(false);

  const handleSignOut = async () => {
    await signOut();
    window.location.href = "/login";
  };

  return (
    <motion.aside
      initial={false}
      animate={{ width: collapsed ? 72 : 260 }}
      transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] }}
      className="sticky top-0 z-40 flex h-screen flex-shrink-0 flex-col border-r border-border-primary bg-bg-secondary"
    >
      {/* Logo + Collapse */}
      <div className="flex h-16 items-center justify-between px-4 border-b border-border-primary">
        <AnimatePresence mode="wait">
          {!collapsed && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-2"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent text-white">
                <Zap size={16} />
              </div>
              <span className="text-sm font-bold text-text-primary tracking-tight">
                ResourceBridge
              </span>
            </motion.div>
          )}
        </AnimatePresence>
        {collapsed && (
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent text-white mx-auto">
            <Zap size={16} />
          </div>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className={cn(
            "flex h-7 w-7 items-center justify-center rounded-md text-text-muted transition-all hover:bg-bg-tertiary hover:text-text-primary",
            collapsed && "mx-auto mt-2"
          )}
        >
          <motion.div
            animate={{ rotate: collapsed ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <ChevronLeft size={14} />
          </motion.div>
        </button>
      </div>

      {/* Main Nav */}
      <nav className="flex-1 overflow-y-auto py-3 px-2 space-y-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "group relative flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200",
                isActive
                  ? "bg-accent-subtle text-accent-light"
                  : "text-text-secondary hover:bg-bg-tertiary hover:text-text-primary"
              )}
            >
              {isActive && (
                <motion.div
                  layoutId="sidebar-active"
                  className="absolute left-0 top-1/2 -translate-y-1/2 h-6 w-[3px] rounded-full bg-accent"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              <item.icon size={18} className={cn("flex-shrink-0", isActive && "text-accent-light")} />
              <AnimatePresence mode="wait">
                {!collapsed && (
                  <motion.span
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: "auto" }}
                    exit={{ opacity: 0, width: 0 }}
                    className="whitespace-nowrap overflow-hidden"
                  >
                    {item.label}
                  </motion.span>
                )}
              </AnimatePresence>
            </Link>
          );
        })}
      </nav>

      {/* Bottom Section */}
      <div className="border-t border-border-primary p-2 space-y-1">
        {bottomItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200",
                isActive
                  ? "bg-accent-subtle text-accent-light"
                  : "text-text-secondary hover:bg-bg-tertiary hover:text-text-primary"
              )}
            >
              <item.icon size={18} className="flex-shrink-0" />
              {!collapsed && <span>{item.label}</span>}
            </Link>
          );
        })}

        <button
          onClick={handleSignOut}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-text-secondary transition-all duration-200 hover:bg-critical-bg hover:text-critical"
        >
          <LogOut size={18} className="flex-shrink-0" />
          {!collapsed && <span>Sign Out</span>}
        </button>

        {/* User + Theme */}
        <div className={cn("flex items-center gap-2 px-2 pt-2", collapsed && "flex-col")}>
          <ThemeToggle />
          {!collapsed && profile && (
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium text-text-primary truncate">
                {profile.name}
              </p>
              <p className="text-[10px] text-text-muted truncate">
                {profile.role === "admin" ? "Administrator" : "Volunteer"}
              </p>
            </div>
          )}
        </div>
      </div>
    </motion.aside>
  );
}
