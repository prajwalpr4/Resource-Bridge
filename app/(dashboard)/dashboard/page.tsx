"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Users, AlertTriangle, CheckCircle, Clock, TrendingUp, ArrowUpRight } from "lucide-react";
import PageTransition from "@/components/shared/page-transition";
import AnimatedCard from "@/components/shared/animated-card";
import { SkeletonStats } from "@/components/shared/skeleton-card";
import { cn } from "@/lib/utils";

interface StatItem {
  label: string;
  value: number;
  change: string;
  icon: React.ElementType;
  color: string;
  bgColor: string;
}

const mockStats: StatItem[] = [
  { label: "Active Needs", value: 47, change: "+12%", icon: AlertTriangle, color: "text-warning", bgColor: "bg-warning-bg" },
  { label: "Volunteers", value: 128, change: "+8%", icon: Users, color: "text-accent-light", bgColor: "bg-accent-subtle" },
  { label: "Resolved", value: 312, change: "+23%", icon: CheckCircle, color: "text-success", bgColor: "bg-success-bg" },
  { label: "Pending", value: 15, change: "-5%", icon: Clock, color: "text-cyan", bgColor: "bg-info-bg" },
];

const mockRecentNeeds = [
  { id: "1", title: "Food supplies for 30 families", urgency: "critical" as const, category: "food", location: "Sector 15, Noida", time: "2 min ago" },
  { id: "2", title: "Medical kits needed at shelter", urgency: "critical" as const, category: "medical", location: "MG Road, Pune", time: "15 min ago" },
  { id: "3", title: "Blankets for winter camp", urgency: "medium" as const, category: "clothing", location: "Camp 3, Jaipur", time: "1 hour ago" },
  { id: "4", title: "Teaching volunteers for children", urgency: "low" as const, category: "education", location: "Community Hall, Mumbai", time: "3 hours ago" },
  { id: "5", title: "Clean water supply disrupted", urgency: "critical" as const, category: "sanitation", location: "Block D, Varanasi", time: "4 hours ago" },
];

const urgencyStyles = {
  critical: "bg-critical-bg text-critical",
  medium: "bg-warning-bg text-warning",
  low: "bg-success-bg text-success",
};

function AnimatedCounter({ value }: { value: number }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let start = 0;
    const step = Math.ceil(value / 30);
    const timer = setInterval(() => {
      start += step;
      if (start >= value) { setCount(value); clearInterval(timer); }
      else setCount(start);
    }, 30);
    return () => clearInterval(timer);
  }, [value]);
  return <span>{count.toLocaleString()}</span>;
}

export default function DashboardPage() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(t);
  }, []);

  if (loading) {
    return (
      <PageTransition>
        <div className="space-y-6">
          <div><div className="skeleton h-8 w-48 mb-2" /><div className="skeleton h-4 w-64" /></div>
          <SkeletonStats />
        </div>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-text-primary">Dashboard</h1>
          <p className="mt-1 text-sm text-text-secondary">Overview of community resource allocation</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {mockStats.map((stat, i) => (
            <AnimatedCard key={stat.label} index={i} hover={false} className="relative overflow-hidden">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-medium text-text-secondary">{stat.label}</span>
                <div className={cn("flex h-9 w-9 items-center justify-center rounded-lg", stat.bgColor)}>
                  <stat.icon size={18} className={stat.color} />
                </div>
              </div>
              <div className="text-3xl font-bold text-text-primary">
                <AnimatedCounter value={stat.value} />
              </div>
              <div className="mt-1 flex items-center gap-1 text-xs">
                <TrendingUp size={12} className="text-success" />
                <span className="text-success">{stat.change}</span>
                <span className="text-text-muted">vs last week</span>
              </div>
            </AnimatedCard>
          ))}
        </div>

        {/* Recent Needs */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-text-primary">Recent Needs</h2>
            <a href="/needs" className="flex items-center gap-1 text-xs text-accent-light hover:text-accent transition-colors">View all <ArrowUpRight size={12} /></a>
          </div>
          <div className="space-y-2">
            {mockRecentNeeds.map((need, i) => (
              <motion.div
                key={need.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.05 }}
                className="flex items-center gap-4 rounded-xl border border-border-primary bg-bg-secondary p-4 transition-colors hover:bg-bg-tertiary"
              >
                <div className={cn("h-2 w-2 rounded-full", need.urgency === "critical" ? "bg-critical glow-critical" : need.urgency === "medium" ? "bg-warning" : "bg-success")} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-text-primary truncate">{need.title}</p>
                  <p className="text-xs text-text-muted">{need.location}</p>
                </div>
                <span className={cn("rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider", urgencyStyles[need.urgency])}>{need.urgency}</span>
                <span className="text-xs text-text-muted whitespace-nowrap">{need.time}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
