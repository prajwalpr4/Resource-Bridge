"use client";

import PageTransition from "@/components/shared/page-transition";
import { Settings as SettingsIcon } from "lucide-react";
import ThemeToggle from "@/components/layout/theme-toggle";

export default function SettingsPage() {
  return (
    <PageTransition>
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-bg-tertiary">
            <SettingsIcon size={20} className="text-text-secondary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-text-primary">Settings</h1>
            <p className="text-sm text-text-secondary">Manage your preferences</p>
          </div>
        </div>

        <div className="max-w-lg space-y-6">
          <div className="rounded-xl border border-border-primary bg-bg-secondary p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-text-primary">Theme</p>
                <p className="text-xs text-text-muted mt-0.5">Toggle between dark and light mode</p>
              </div>
              <ThemeToggle />
            </div>
          </div>

          <div className="rounded-xl border border-border-primary bg-bg-secondary p-5 space-y-4">
            <p className="text-sm font-medium text-text-primary">Notifications</p>
            <label className="flex items-center justify-between cursor-pointer">
              <span className="text-xs text-text-secondary">Email notifications for new critical needs</span>
              <div className="relative">
                <input type="checkbox" defaultChecked className="sr-only peer" />
                <div className="w-9 h-5 rounded-full bg-bg-tertiary peer-checked:bg-accent transition-colors"></div>
                <div className="absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white transition-transform peer-checked:translate-x-4"></div>
              </div>
            </label>
            <label className="flex items-center justify-between cursor-pointer">
              <span className="text-xs text-text-secondary">Push notifications for task assignments</span>
              <div className="relative">
                <input type="checkbox" defaultChecked className="sr-only peer" />
                <div className="w-9 h-5 rounded-full bg-bg-tertiary peer-checked:bg-accent transition-colors"></div>
                <div className="absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white transition-transform peer-checked:translate-x-4"></div>
              </div>
            </label>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
