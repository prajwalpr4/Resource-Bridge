"use client";

// Volunteer Feed — Nearby needs with swipeable cards
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Clock, ChevronRight, AlertTriangle, Filter, Zap } from "lucide-react";
import PageTransition from "@/components/shared/page-transition";
import { cn } from "@/lib/utils";
import { CATEGORY_META } from "@/lib/types";
import type { NeedCategory, UrgencyLevel } from "@/lib/types";

const mockFeed = [
  { id: "1", title: "Food supplies for 30 families", category: "food" as NeedCategory, urgency: "critical" as UrgencyLevel, location: "Andheri, Mumbai", distance: "1.2 km", time: "2 min ago", people: 30 },
  { id: "2", title: "Medical kits at shelter", category: "medical" as NeedCategory, urgency: "critical" as UrgencyLevel, location: "MG Road, Pune", distance: "3.5 km", time: "15 min ago", people: 50 },
  { id: "3", title: "Blankets for winter camp", category: "clothing" as NeedCategory, urgency: "medium" as UrgencyLevel, location: "Camp 3, Jaipur", distance: "5.1 km", time: "1 hour ago", people: 20 },
  { id: "4", title: "Teaching volunteers needed", category: "education" as NeedCategory, urgency: "low" as UrgencyLevel, location: "Bandra, Mumbai", distance: "2.0 km", time: "3 hours ago", people: 15 },
  { id: "5", title: "Clean water needed urgently", category: "sanitation" as NeedCategory, urgency: "critical" as UrgencyLevel, location: "Block D, Varanasi", distance: "8.2 km", time: "4 hours ago", people: 60 },
];

export default function FeedPage() {
  const [filter, setFilter] = useState<UrgencyLevel | "all">("all");
  const filtered = filter === "all" ? mockFeed : mockFeed.filter((n) => n.urgency === filter);

  return (
    <PageTransition>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Zap size={20} className="text-accent-light" />
            <h1 className="text-xl font-bold text-text-primary">Nearby Needs</h1>
          </div>
          <p className="text-xs text-text-secondary">Requests near your area that match your skills</p>
        </div>

        {/* Filter pills */}
        <div className="flex gap-2 overflow-x-auto pb-1">
          {(["all", "critical", "medium", "low"] as const).map((f) => (
            <button key={f} onClick={() => setFilter(f)} className={cn("rounded-full px-4 py-1.5 text-xs font-medium whitespace-nowrap border transition-all", filter === f ? "border-accent bg-accent-subtle text-accent-light" : "border-border-primary bg-bg-secondary text-text-muted hover:text-text-secondary")}>
              {f === "all" ? "All" : f === "critical" ? "🔴 Critical" : f === "medium" ? "🟡 Medium" : "🟢 Low"}
            </button>
          ))}
        </div>

        {/* Need Cards */}
        <div className="space-y-3">
          <AnimatePresence mode="popLayout">
            {filtered.map((need, i) => (
              <motion.div
                key={need.id}
                layout
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, x: -100, scale: 0.9 }}
                transition={{ delay: i * 0.05, type: "spring", stiffness: 300, damping: 25 }}
                className={cn(
                  "rounded-2xl border bg-bg-secondary p-4 transition-all",
                  need.urgency === "critical" ? "border-critical/20" : "border-border-primary"
                )}
              >
                {/* Urgency banner for critical */}
                {need.urgency === "critical" && (
                  <div className="flex items-center gap-1.5 mb-3 rounded-lg bg-critical-bg px-3 py-1.5 w-fit">
                    <AlertTriangle size={12} className="text-critical" />
                    <span className="text-[10px] font-bold text-critical uppercase tracking-wider">Urgent — Needs immediate help</span>
                  </div>
                )}

                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl text-lg" style={{ background: CATEGORY_META[need.category]?.color + "20" }}>
                    {CATEGORY_META[need.category]?.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-semibold text-text-primary">{need.title}</h3>
                    <div className="flex items-center gap-3 mt-1.5 text-xs text-text-muted">
                      <span className="flex items-center gap-1"><MapPin size={10} />{need.location}</span>
                      <span className="flex items-center gap-1"><Clock size={10} />{need.time}</span>
                    </div>
                  </div>
                  <ChevronRight size={18} className="text-text-muted mt-1 flex-shrink-0" />
                </div>

                <div className="flex items-center justify-between mt-4 pt-3 border-t border-border-primary">
                  <div className="flex items-center gap-3 text-xs text-text-muted">
                    <span>{need.distance} away</span>
                    <span>{need.people} people affected</span>
                  </div>
                  <button className="rounded-lg bg-accent px-4 py-1.5 text-xs font-semibold text-white hover:bg-accent-hover transition-all shadow-sm shadow-accent/20">
                    Volunteer
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </PageTransition>
  );
}
