"use client";

// Impact Profile — XP, badges, animated counters
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Award, Flame, Target, TrendingUp, Settings, ChevronRight } from "lucide-react";
import PageTransition from "@/components/shared/page-transition";
import AnimatedCard from "@/components/shared/animated-card";
import { BADGES } from "@/lib/types";
import type { BadgeId } from "@/lib/types";
import { cn } from "@/lib/utils";

const mockProfile = {
  name: "Priya Sharma",
  xp: 2450,
  level: 4,
  levelTitle: "Expert",
  nextLevelXp: 5000,
  tasksCompleted: 18,
  streak: 7,
  rank: 12,
  totalVolunteers: 128,
  badges: ["first-responder", "helping-hand", "food-warrior", "streak-7"] as BadgeId[],
  recentXp: [
    { label: "Food delivery — Andheri", xp: 100, time: "Today" },
    { label: "Medical kit distribution", xp: 150, time: "Yesterday" },
    { label: "Teaching session", xp: 75, time: "2 days ago" },
  ],
};

function AnimatedCounter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let start = 0;
    const step = Math.max(1, Math.ceil(value / 40));
    const timer = setInterval(() => {
      start += step;
      if (start >= value) { setCount(value); clearInterval(timer); }
      else setCount(start);
    }, 25);
    return () => clearInterval(timer);
  }, [value]);
  return <span>{count.toLocaleString()}{suffix}</span>;
}

export default function ProfilePage() {
  const progress = (mockProfile.xp / mockProfile.nextLevelXp) * 100;

  return (
    <PageTransition>
      <div className="space-y-6">
        {/* Profile Header */}
        <div className="text-center">
          <div className="mx-auto mb-3 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-accent to-cyan text-white text-2xl font-bold shadow-lg shadow-accent/20">
            PS
          </div>
          <h1 className="text-xl font-bold text-text-primary">{mockProfile.name}</h1>
          <p className="text-xs text-text-secondary mt-0.5">Level {mockProfile.level} · {mockProfile.levelTitle}</p>
        </div>

        {/* XP Progress */}
        <div className="rounded-2xl border border-border-primary bg-bg-secondary p-5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-text-muted uppercase tracking-wider">Impact XP</span>
            <span className="text-xs text-text-muted">{mockProfile.xp.toLocaleString()} / {mockProfile.nextLevelXp.toLocaleString()}</span>
          </div>
          <div className="h-3 rounded-full bg-bg-tertiary overflow-hidden mb-3">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="h-full rounded-full bg-gradient-to-r from-accent via-accent-light to-cyan"
            />
          </div>
          <div className="text-center">
            <span className="text-4xl font-black gradient-text">
              <AnimatedCounter value={mockProfile.xp} />
            </span>
            <p className="text-xs text-text-muted mt-1">{mockProfile.nextLevelXp - mockProfile.xp} XP to next level</p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: "Tasks", value: mockProfile.tasksCompleted, icon: Target, color: "text-accent-light" },
            { label: "Streak", value: mockProfile.streak, icon: Flame, color: "text-warning", suffix: "d" },
            { label: "Rank", value: mockProfile.rank, icon: TrendingUp, color: "text-cyan", prefix: "#" },
          ].map((stat, i) => (
            <AnimatedCard key={stat.label} index={i} hover={false} className="text-center py-4">
              <stat.icon size={18} className={cn("mx-auto mb-2", stat.color)} />
              <p className="text-2xl font-bold text-text-primary">
                {stat.prefix || ""}<AnimatedCounter value={stat.value} suffix={stat.suffix} />
              </p>
              <p className="text-[10px] text-text-muted uppercase tracking-wider mt-0.5">{stat.label}</p>
            </AnimatedCard>
          ))}
        </div>

        {/* Badges */}
        <div>
          <h2 className="text-sm font-semibold text-text-primary mb-3 flex items-center gap-2">
            <Award size={16} className="text-warning" /> Badges Earned
          </h2>
          <div className="grid grid-cols-2 gap-3">
            {mockProfile.badges.map((badgeId, i) => {
              const badge = BADGES[badgeId];
              return (
                <motion.div key={badgeId} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 + i * 0.1, type: "spring" }} className="flex items-center gap-3 rounded-xl border border-border-primary bg-bg-secondary p-3">
                  <span className="text-2xl">{badge.icon}</span>
                  <div>
                    <p className="text-xs font-semibold text-text-primary">{badge.name}</p>
                    <p className="text-[10px] text-text-muted">{badge.description}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Recent XP */}
        <div>
          <h2 className="text-sm font-semibold text-text-primary mb-3">Recent Activity</h2>
          <div className="space-y-2">
            {mockProfile.recentXp.map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 + i * 0.05 }} className="flex items-center gap-3 rounded-xl border border-border-primary bg-bg-secondary p-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-success-bg">
                  <TrendingUp size={14} className="text-success" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-text-primary truncate">{item.label}</p>
                  <p className="text-[10px] text-text-muted">{item.time}</p>
                </div>
                <span className="text-xs font-bold text-success">+{item.xp} XP</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
