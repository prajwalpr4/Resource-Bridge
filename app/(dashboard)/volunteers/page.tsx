"use client";

// Volunteers Management — Cards with XP and skills
import { useState } from "react";
import { motion } from "framer-motion";
import { Users, Search, Star, MapPin, Award } from "lucide-react";
import PageTransition from "@/components/shared/page-transition";
import AnimatedCard from "@/components/shared/animated-card";
import { cn } from "@/lib/utils";
import { BADGES } from "@/lib/types";
import type { BadgeId } from "@/lib/types";

const mockVolunteers = [
  { uid: "1", name: "Priya Sharma", email: "priya@mail.com", xp: 2450, skills: ["First Aid", "Cooking", "Driving"], badges: ["first-responder", "helping-hand", "food-warrior"] as BadgeId[], location: "Mumbai", tasks: 18, avatar: "" },
  { uid: "2", name: "Rahul Verma", email: "rahul@mail.com", xp: 1820, skills: ["Teaching", "IT Support", "Translation"], badges: ["first-responder", "helping-hand", "educator"] as BadgeId[], location: "Delhi", tasks: 14, avatar: "" },
  { uid: "3", name: "Anita Desai", email: "anita@mail.com", xp: 3200, skills: ["Medical", "Counseling", "Elder Care"], badges: ["first-responder", "community-hero", "medic"] as BadgeId[], location: "Pune", tasks: 25, avatar: "" },
  { uid: "4", name: "Vikram Singh", email: "vikram@mail.com", xp: 950, skills: ["Construction", "Logistics", "Driving"], badges: ["first-responder", "shelter-builder"] as BadgeId[], location: "Jaipur", tasks: 8, avatar: "" },
  { uid: "5", name: "Meera Patel", email: "meera@mail.com", xp: 5100, skills: ["Fundraising", "Social Media", "Photography"], badges: ["first-responder", "community-hero", "top-1-percent"] as BadgeId[], location: "Bangalore", tasks: 42, avatar: "" },
  { uid: "6", name: "Arjun Nair", email: "arjun@mail.com", xp: 680, skills: ["Cooking", "Child Care"], badges: ["first-responder"] as BadgeId[], location: "Chennai", tasks: 5, avatar: "" },
];

function getLevel(xp: number): { level: number; title: string; progress: number } {
  if (xp >= 5000) return { level: 5, title: "Legend", progress: 100 };
  if (xp >= 2500) return { level: 4, title: "Expert", progress: ((xp - 2500) / 2500) * 100 };
  if (xp >= 1000) return { level: 3, title: "Pro", progress: ((xp - 1000) / 1500) * 100 };
  if (xp >= 250) return { level: 2, title: "Active", progress: ((xp - 250) / 750) * 100 };
  return { level: 1, title: "Starter", progress: (xp / 250) * 100 };
}

export default function VolunteersPage() {
  const [search, setSearch] = useState("");
  const filtered = mockVolunteers.filter((v) =>
    v.name.toLowerCase().includes(search.toLowerCase()) || v.skills.some((s) => s.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <PageTransition>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent-subtle"><Users size={20} className="text-accent-light" /></div>
            <div>
              <h1 className="text-2xl font-bold text-text-primary">Volunteers</h1>
              <p className="text-sm text-text-secondary">{mockVolunteers.length} registered volunteers</p>
            </div>
          </div>
        </div>

        <div className="relative max-w-sm">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
          <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search by name or skill..." className="w-full rounded-xl border border-border-primary bg-bg-secondary py-2.5 pl-10 pr-4 text-sm text-text-primary placeholder:text-text-muted focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filtered.map((vol, i) => {
            const lvl = getLevel(vol.xp);
            return (
              <AnimatedCard key={vol.uid} index={i} className="space-y-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-accent to-cyan text-white text-sm font-bold">
                      {vol.name.split(" ").map((n) => n[0]).join("")}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-text-primary">{vol.name}</p>
                      <p className="text-xs text-text-muted flex items-center gap-1"><MapPin size={10} />{vol.location}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold gradient-text">{vol.xp.toLocaleString()}</p>
                    <p className="text-[10px] text-text-muted uppercase tracking-wider">XP</p>
                  </div>
                </div>

                {/* Level bar */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-text-muted">Level {lvl.level} · {lvl.title}</span>
                    <span className="text-[10px] text-text-muted">{vol.tasks} tasks</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-bg-tertiary overflow-hidden">
                    <motion.div initial={{ width: 0 }} animate={{ width: `${lvl.progress}%` }} transition={{ duration: 0.8, delay: i * 0.1 }} className="h-full rounded-full bg-gradient-to-r from-accent to-cyan" />
                  </div>
                </div>

                {/* Skills */}
                <div className="flex flex-wrap gap-1.5">
                  {vol.skills.map((skill) => (
                    <span key={skill} className="rounded-full border border-border-primary bg-bg-tertiary px-2.5 py-0.5 text-[10px] font-medium text-text-secondary">{skill}</span>
                  ))}
                </div>

                {/* Badges */}
                <div className="flex items-center gap-1.5 pt-1 border-t border-border-primary">
                  <Award size={12} className="text-text-muted" />
                  {vol.badges.slice(0, 4).map((badge) => (
                    <span key={badge} className="text-sm" title={BADGES[badge]?.name}>{BADGES[badge]?.icon}</span>
                  ))}
                  {vol.badges.length > 4 && <span className="text-[10px] text-text-muted">+{vol.badges.length - 4}</span>}
                </div>
              </AnimatedCard>
            );
          })}
        </div>
      </div>
    </PageTransition>
  );
}
