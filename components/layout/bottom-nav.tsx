"use client";

// ============================================
// Volunteer Bottom Nav — Mobile-first navigation
// ============================================

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Newspaper, ClipboardCheck, UserCircle } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Feed", href: "/feed", icon: Newspaper },
  { label: "My Tasks", href: "/my-tasks", icon: ClipboardCheck },
  { label: "Profile", href: "/profile", icon: UserCircle },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 flex h-[72px] items-center justify-around border-t border-border-primary bg-bg-secondary/80 backdrop-blur-xl px-4 pb-safe">
      {navItems.map((item) => {
        const isActive = pathname === item.href;
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "relative flex flex-col items-center gap-1 px-4 py-2 rounded-xl transition-colors duration-200",
              isActive
                ? "text-accent-light"
                : "text-text-muted hover:text-text-secondary"
            )}
          >
            {isActive && (
              <motion.div
                layoutId="bottom-nav-active"
                className="absolute -top-px left-1/2 -translate-x-1/2 h-[2px] w-8 rounded-full bg-accent"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}
            <item.icon size={22} />
            <span className="text-[11px] font-medium">{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
