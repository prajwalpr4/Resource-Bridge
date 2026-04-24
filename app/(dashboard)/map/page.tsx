"use client";

// Priority Map — Interactive map with glowing urgency markers
import dynamic from "next/dynamic";
import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Filter } from "lucide-react";
import PageTransition from "@/components/shared/page-transition";
import { cn } from "@/lib/utils";
import type { UrgencyLevel } from "@/lib/types";

// Dynamic import — Leaflet cannot be SSR'd
const MapComponent = dynamic(() => import("@/components/map/priority-map"), { ssr: false, loading: () => <div className="skeleton h-[500px] rounded-xl" /> });

const mockNeeds = [
  { id: "1", title: "Food supplies for 30 families", urgency: "critical" as const, lat: 19.076, lng: 72.8777, location: "Andheri, Mumbai", category: "food" },
  { id: "2", title: "Medical kits at shelter", urgency: "critical" as const, lat: 18.5204, lng: 73.8567, location: "MG Road, Pune", category: "medical" },
  { id: "3", title: "Blankets for winter camp", urgency: "medium" as const, lat: 26.9124, lng: 75.7873, location: "Camp 3, Jaipur", category: "clothing" },
  { id: "4", title: "Teaching volunteers", urgency: "low" as const, lat: 19.0596, lng: 72.8295, location: "Bandra, Mumbai", category: "education" },
  { id: "5", title: "Water supply disrupted", urgency: "critical" as const, lat: 25.3176, lng: 82.9739, location: "Block D, Varanasi", category: "sanitation" },
  { id: "6", title: "Clothing donation drive", urgency: "low" as const, lat: 28.6139, lng: 77.209, location: "Connaught Place, Delhi", category: "clothing" },
  { id: "7", title: "Emergency shelter needed", urgency: "critical" as const, lat: 12.9716, lng: 77.5946, location: "MG Road, Bangalore", category: "shelter" },
  { id: "8", title: "Sanitation kits needed", urgency: "medium" as const, lat: 22.5726, lng: 88.3639, location: "Park Street, Kolkata", category: "sanitation" },
];

export default function MapPage() {
  const [filter, setFilter] = useState<UrgencyLevel | "all">("all");
  const filtered = filter === "all" ? mockNeeds : mockNeeds.filter((n) => n.urgency === filter);

  const filters: { label: string; value: UrgencyLevel | "all"; color: string }[] = [
    { label: "All", value: "all", color: "text-text-primary" },
    { label: "Critical", value: "critical", color: "text-critical" },
    { label: "Medium", value: "medium", color: "text-warning" },
    { label: "Low", value: "low", color: "text-success" },
  ];

  return (
    <PageTransition>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-critical-bg">
              <MapPin size={20} className="text-critical" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-text-primary">Priority Map</h1>
              <p className="text-sm text-text-secondary">Real-time visualization of community needs</p>
            </div>
          </div>
          <div className="flex items-center gap-1 rounded-xl border border-border-primary bg-bg-secondary p-1">
            {filters.map((f) => (
              <button key={f.value} onClick={() => setFilter(f.value)} className={cn("rounded-lg px-3 py-1.5 text-xs font-medium transition-all", filter === f.value ? "bg-bg-tertiary text-text-primary shadow-sm" : "text-text-muted hover:text-text-secondary")}>
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Map */}
        <div className="rounded-xl border border-border-primary overflow-hidden">
          <MapComponent needs={filtered} />
        </div>

        {/* Legend */}
        <div className="flex items-center gap-6 text-xs text-text-secondary">
          <div className="flex items-center gap-2"><div className="h-3 w-3 rounded-full bg-critical glow-critical" /><span>Critical</span></div>
          <div className="flex items-center gap-2"><div className="h-3 w-3 rounded-full bg-warning" /><span>Medium</span></div>
          <div className="flex items-center gap-2"><div className="h-3 w-3 rounded-full bg-success" /><span>Low</span></div>
        </div>

        {/* Needs List below map */}
        <div className="space-y-2">
          {filtered.map((need, i) => (
            <motion.div key={need.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }} className="flex items-center gap-4 rounded-xl border border-border-primary bg-bg-secondary p-4 hover:bg-bg-tertiary transition-colors">
              <div className={cn("h-2.5 w-2.5 rounded-full flex-shrink-0", need.urgency === "critical" ? "bg-critical glow-critical" : need.urgency === "medium" ? "bg-warning" : "bg-success")} />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-text-primary truncate">{need.title}</p>
                <p className="text-xs text-text-muted">{need.location}</p>
              </div>
              <span className="text-xs text-text-muted capitalize">{need.category}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </PageTransition>
  );
}
