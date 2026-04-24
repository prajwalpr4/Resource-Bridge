"use client";

// Needs Management — Table view with filters
import { useState } from "react";
import { motion } from "framer-motion";
import { ClipboardList, Search, Plus, ChevronDown, Eye, Trash2, UserPlus } from "lucide-react";
import PageTransition from "@/components/shared/page-transition";
import { cn } from "@/lib/utils";
import type { NeedCategory, UrgencyLevel, NeedStatus } from "@/lib/types";
import { CATEGORY_META, URGENCY_META } from "@/lib/types";

const mockNeeds = [
  { id: "1", title: "Food supplies for 30 families", category: "food" as NeedCategory, urgency: "critical" as UrgencyLevel, status: "pending" as NeedStatus, location: "Andheri, Mumbai", volunteers: 0, createdAt: "2 min ago" },
  { id: "2", title: "Medical kits at shelter", category: "medical" as NeedCategory, urgency: "critical" as UrgencyLevel, status: "in-progress" as NeedStatus, location: "MG Road, Pune", volunteers: 2, createdAt: "15 min ago" },
  { id: "3", title: "Blankets for winter camp", category: "clothing" as NeedCategory, urgency: "medium" as UrgencyLevel, status: "pending" as NeedStatus, location: "Camp 3, Jaipur", volunteers: 0, createdAt: "1 hour ago" },
  { id: "4", title: "Teaching volunteers needed", category: "education" as NeedCategory, urgency: "low" as UrgencyLevel, status: "in-progress" as NeedStatus, location: "Bandra, Mumbai", volunteers: 3, createdAt: "3 hours ago" },
  { id: "5", title: "Water supply restoration", category: "sanitation" as NeedCategory, urgency: "critical" as UrgencyLevel, status: "pending" as NeedStatus, location: "Block D, Varanasi", volunteers: 0, createdAt: "4 hours ago" },
  { id: "6", title: "Shelter repair after storm", category: "shelter" as NeedCategory, urgency: "medium" as UrgencyLevel, status: "resolved" as NeedStatus, location: "Coastal area, Chennai", volunteers: 5, createdAt: "1 day ago" },
];

const statusStyles: Record<NeedStatus, string> = {
  pending: "bg-warning-bg text-warning",
  "in-progress": "bg-info-bg text-info",
  resolved: "bg-success-bg text-success",
};

export default function NeedsPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<NeedStatus | "all">("all");

  const filtered = mockNeeds.filter((n) => {
    const matchSearch = n.title.toLowerCase().includes(search.toLowerCase()) || n.location.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "all" || n.status === statusFilter;
    return matchSearch && matchStatus;
  });

  return (
    <PageTransition>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent-subtle"><ClipboardList size={20} className="text-accent-light" /></div>
            <div>
              <h1 className="text-2xl font-bold text-text-primary">Manage Needs</h1>
              <p className="text-sm text-text-secondary">{mockNeeds.length} total needs</p>
            </div>
          </div>
          <a href="/smart-paste" className="flex items-center gap-2 rounded-xl bg-accent px-4 py-2.5 text-sm font-semibold text-white hover:bg-accent-hover transition-all shadow-lg shadow-accent/20">
            <Plus size={16} /> Add Need
          </a>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-3">
          <div className="relative flex-1 max-w-sm">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
            <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search needs..." className="w-full rounded-xl border border-border-primary bg-bg-secondary py-2.5 pl-10 pr-4 text-sm text-text-primary placeholder:text-text-muted focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20" />
          </div>
          <div className="flex gap-1 rounded-xl border border-border-primary bg-bg-secondary p-1">
            {(["all", "pending", "in-progress", "resolved"] as const).map((s) => (
              <button key={s} onClick={() => setStatusFilter(s)} className={cn("rounded-lg px-3 py-1.5 text-xs font-medium transition-all capitalize", statusFilter === s ? "bg-bg-tertiary text-text-primary shadow-sm" : "text-text-muted hover:text-text-secondary")}>
                {s === "all" ? "All" : s}
              </button>
            ))}
          </div>
        </div>

        {/* Table */}
        <div className="rounded-xl border border-border-primary overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border-primary bg-bg-secondary">
                <th className="px-4 py-3 text-left text-[10px] font-semibold uppercase tracking-wider text-text-muted">Need</th>
                <th className="px-4 py-3 text-left text-[10px] font-semibold uppercase tracking-wider text-text-muted">Category</th>
                <th className="px-4 py-3 text-left text-[10px] font-semibold uppercase tracking-wider text-text-muted">Urgency</th>
                <th className="px-4 py-3 text-left text-[10px] font-semibold uppercase tracking-wider text-text-muted">Status</th>
                <th className="px-4 py-3 text-left text-[10px] font-semibold uppercase tracking-wider text-text-muted">Volunteers</th>
                <th className="px-4 py-3 text-right text-[10px] font-semibold uppercase tracking-wider text-text-muted">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((need, i) => (
                <motion.tr key={need.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.03 }} className="border-b border-border-primary last:border-0 hover:bg-bg-tertiary/50 transition-colors">
                  <td className="px-4 py-3.5">
                    <p className="text-sm font-medium text-text-primary">{need.title}</p>
                    <p className="text-xs text-text-muted">{need.location} · {need.createdAt}</p>
                  </td>
                  <td className="px-4 py-3.5">
                    <span className="flex items-center gap-1.5 text-xs text-text-secondary">
                      <span>{CATEGORY_META[need.category]?.icon}</span>{CATEGORY_META[need.category]?.label}
                    </span>
                  </td>
                  <td className="px-4 py-3.5">
                    <span className={cn("rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase", need.urgency === "critical" ? "bg-critical-bg text-critical" : need.urgency === "medium" ? "bg-warning-bg text-warning" : "bg-success-bg text-success")}>{need.urgency}</span>
                  </td>
                  <td className="px-4 py-3.5">
                    <span className={cn("rounded-full px-2.5 py-1 text-[10px] font-semibold capitalize", statusStyles[need.status])}>{need.status}</span>
                  </td>
                  <td className="px-4 py-3.5 text-sm text-text-secondary">{need.volunteers}</td>
                  <td className="px-4 py-3.5">
                    <div className="flex items-center justify-end gap-1">
                      <button className="flex h-8 w-8 items-center justify-center rounded-lg text-text-muted hover:bg-bg-tertiary hover:text-text-primary transition-all"><Eye size={14} /></button>
                      <button className="flex h-8 w-8 items-center justify-center rounded-lg text-text-muted hover:bg-accent-subtle hover:text-accent-light transition-all"><UserPlus size={14} /></button>
                      <button className="flex h-8 w-8 items-center justify-center rounded-lg text-text-muted hover:bg-critical-bg hover:text-critical transition-all"><Trash2 size={14} /></button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </PageTransition>
  );
}
