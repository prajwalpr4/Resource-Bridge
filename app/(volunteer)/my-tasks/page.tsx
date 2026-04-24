"use client";

// My Tasks — Volunteer's assigned tasks
import { useState } from "react";
import { motion } from "framer-motion";
import { ClipboardCheck, CheckCircle, Clock, Loader2, MessageSquare } from "lucide-react";
import PageTransition from "@/components/shared/page-transition";
import { cn } from "@/lib/utils";
import { CATEGORY_META } from "@/lib/types";
import type { NeedCategory, TaskStatus } from "@/lib/types";

const mockTasks = [
  { id: "1", needTitle: "Food supplies for 30 families", category: "food" as NeedCategory, status: "in-progress" as TaskStatus, location: "Andheri, Mumbai", assignedAt: "Today, 10:30 AM", xp: 100 },
  { id: "2", needTitle: "Medical kits at shelter", category: "medical" as NeedCategory, status: "accepted" as TaskStatus, location: "MG Road, Pune", assignedAt: "Today, 9:15 AM", xp: 150 },
  { id: "3", needTitle: "Teaching volunteers needed", category: "education" as NeedCategory, status: "completed" as TaskStatus, location: "Bandra, Mumbai", assignedAt: "Yesterday", xp: 75 },
  { id: "4", needTitle: "Blankets for winter camp", category: "clothing" as NeedCategory, status: "completed" as TaskStatus, location: "Camp 3, Jaipur", assignedAt: "2 days ago", xp: 50 },
];

const statusConfig: Record<TaskStatus, { label: string; icon: React.ElementType; color: string; bg: string }> = {
  assigned: { label: "Assigned", icon: Clock, color: "text-warning", bg: "bg-warning-bg" },
  accepted: { label: "Accepted", icon: CheckCircle, color: "text-info", bg: "bg-info-bg" },
  "in-progress": { label: "In Progress", icon: Loader2, color: "text-accent-light", bg: "bg-accent-subtle" },
  completed: { label: "Completed", icon: CheckCircle, color: "text-success", bg: "bg-success-bg" },
  cancelled: { label: "Cancelled", icon: Clock, color: "text-text-muted", bg: "bg-bg-tertiary" },
};

export default function MyTasksPage() {
  const [tab, setTab] = useState<"active" | "completed">("active");
  const activeTasks = mockTasks.filter((t) => t.status !== "completed" && t.status !== "cancelled");
  const completedTasks = mockTasks.filter((t) => t.status === "completed");
  const currentTasks = tab === "active" ? activeTasks : completedTasks;

  return (
    <PageTransition>
      <div className="space-y-6">
        <div>
          <h1 className="text-xl font-bold text-text-primary flex items-center gap-2">
            <ClipboardCheck size={20} className="text-accent-light" /> My Tasks
          </h1>
          <p className="text-xs text-text-secondary mt-1">{activeTasks.length} active · {completedTasks.length} completed</p>
        </div>

        {/* Tab switcher */}
        <div className="flex gap-1 rounded-xl border border-border-primary bg-bg-secondary p-1">
          <button onClick={() => setTab("active")} className={cn("flex-1 rounded-lg py-2 text-xs font-medium transition-all", tab === "active" ? "bg-bg-tertiary text-text-primary shadow-sm" : "text-text-muted")}>Active ({activeTasks.length})</button>
          <button onClick={() => setTab("completed")} className={cn("flex-1 rounded-lg py-2 text-xs font-medium transition-all", tab === "completed" ? "bg-bg-tertiary text-text-primary shadow-sm" : "text-text-muted")}>Completed ({completedTasks.length})</button>
        </div>

        {/* Tasks list */}
        <div className="space-y-3">
          {currentTasks.map((task, i) => {
            const sc = statusConfig[task.status];
            return (
              <motion.div key={task.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="rounded-2xl border border-border-primary bg-bg-secondary p-4">
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl text-lg" style={{ background: CATEGORY_META[task.category]?.color + "20" }}>
                    {CATEGORY_META[task.category]?.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-semibold text-text-primary">{task.needTitle}</h3>
                    <p className="text-xs text-text-muted mt-0.5">{task.location} · {task.assignedAt}</p>
                  </div>
                  <span className={cn("flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-semibold", sc.bg, sc.color)}>
                    <sc.icon size={10} />{sc.label}
                  </span>
                </div>

                {task.status !== "completed" && (
                  <div className="flex gap-2 mt-4 pt-3 border-t border-border-primary">
                    <button className="flex-1 flex items-center justify-center gap-1.5 rounded-lg bg-accent px-3 py-2 text-xs font-semibold text-white hover:bg-accent-hover transition-all">
                      <CheckCircle size={12} /> Mark Complete
                    </button>
                    <button className="flex items-center justify-center gap-1.5 rounded-lg border border-border-primary bg-bg-tertiary px-3 py-2 text-xs font-medium text-text-secondary hover:bg-bg-hover transition-all">
                      <MessageSquare size={12} /> Feedback
                    </button>
                  </div>
                )}

                {task.status === "completed" && (
                  <div className="mt-3 pt-3 border-t border-border-primary flex items-center gap-2">
                    <span className="text-xs text-success font-medium">+{task.xp} XP earned</span>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </PageTransition>
  );
}
