"use client";

// Smart-Paste Magic Box — AI-powered text parsing
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Loader2, Wand2, MapPin, AlertTriangle, Users, Tag, Send } from "lucide-react";
import PageTransition from "@/components/shared/page-transition";
import AnimatedCard from "@/components/shared/animated-card";
import { cn } from "@/lib/utils";
import type { ParseNeedResponse, NeedCategory, UrgencyLevel } from "@/lib/types";
import { CATEGORY_META, URGENCY_META } from "@/lib/types";

const SAMPLE_MESSAGES = [
  "Need 5 blankets and food for 20 people in slum area near Andheri station, they are starving since yesterday. Many children involved, situation is very bad.",
  "We need 3 volunteers who can teach English to kids at the community center in Bandra. Classes are on weekends from 10am.",
  "URGENT: Clean water supply disrupted in Block D, Varanasi. 50+ families affected. Need immediate water tankers and purification tablets.",
];

export default function SmartPastePage() {
  const [rawText, setRawText] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ParseNeedResponse | null>(null);
  const [error, setError] = useState("");

  const handleParse = async () => {
    if (!rawText.trim()) return;
    setLoading(true);
    setError("");
    setResult(null);
    try {
      const res = await fetch("/api/parse-need", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ rawText }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to parse");
      }
      const data: ParseNeedResponse = await res.json();
      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const useSample = (msg: string) => {
    setRawText(msg);
    setResult(null);
  };

  return (
    <PageTransition>
      <div className="space-y-8">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent-subtle">
              <Sparkles size={20} className="text-accent-light" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-text-primary">Smart Paste</h1>
              <p className="text-sm text-text-secondary">Paste a messy message — AI structures it instantly</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Input Side */}
          <div className="space-y-4">
            <div className="relative">
              <textarea
                value={rawText}
                onChange={(e) => setRawText(e.target.value)}
                placeholder="Paste a WhatsApp message, verbal note, or any unstructured text about a community need..."
                rows={8}
                className="w-full rounded-xl border border-border-primary bg-bg-secondary p-4 text-sm text-text-primary placeholder:text-text-muted resize-none focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20 transition-all"
              />
              {rawText && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute bottom-3 right-3">
                  <Wand2 size={16} className="text-accent-light animate-pulse" />
                </motion.div>
              )}
            </div>

            <button
              onClick={handleParse}
              disabled={loading || !rawText.trim()}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-accent px-4 py-3 text-sm font-semibold text-white transition-all hover:bg-accent-hover disabled:opacity-50 shadow-lg shadow-accent/20"
            >
              {loading ? <><Loader2 size={16} className="animate-spin" /> Analyzing with AI...</> : <><Sparkles size={16} /> Parse with AI</>}
            </button>

            {/* Sample messages */}
            <div>
              <p className="text-xs font-medium text-text-muted mb-2">Try a sample:</p>
              <div className="space-y-2">
                {SAMPLE_MESSAGES.map((msg, i) => (
                  <button key={i} onClick={() => useSample(msg)} className="w-full text-left rounded-lg border border-border-primary bg-bg-tertiary p-3 text-xs text-text-secondary hover:bg-bg-hover hover:text-text-primary transition-all line-clamp-2">
                    {msg}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Output Side */}
          <div>
            <AnimatePresence mode="wait">
              {error && (
                <motion.div key="error" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="rounded-xl border border-critical/20 bg-critical-bg p-4 text-sm text-critical">
                  {error}
                </motion.div>
              )}

              {loading && (
                <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-4">
                  <div className="rounded-xl border border-border-primary bg-bg-secondary p-6 space-y-4">
                    <div className="flex items-center gap-3"><Loader2 size={18} className="animate-spin text-accent-light" /><span className="text-sm text-text-secondary">AI is analyzing your text...</span></div>
                    {[1, 2, 3, 4].map((i) => (<div key={i} className="skeleton h-12 rounded-lg" style={{ animationDelay: `${i * 0.1}s` }} />))}
                  </div>
                </motion.div>
              )}

              {result && !loading && (
                <motion.div key="result" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
                  <AnimatedCard hover={false} className="space-y-5">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-semibold text-text-primary">Structured Result</h3>
                      <span className="text-[10px] font-mono text-text-muted">Confidence: {Math.round((result.confidence || 0.85) * 100)}%</span>
                    </div>

                    {/* Title */}
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-semibold uppercase tracking-wider text-text-muted">Title</label>
                      <input type="text" defaultValue={result.title} className="w-full rounded-lg border border-border-primary bg-bg-tertiary px-3 py-2.5 text-sm text-text-primary focus:border-accent focus:outline-none" />
                    </div>

                    {/* Description */}
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-semibold uppercase tracking-wider text-text-muted">Description</label>
                      <textarea defaultValue={result.description} rows={3} className="w-full rounded-lg border border-border-primary bg-bg-tertiary px-3 py-2.5 text-sm text-text-primary resize-none focus:border-accent focus:outline-none" />
                    </div>

                    {/* Category + Urgency */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-semibold uppercase tracking-wider text-text-muted flex items-center gap-1"><Tag size={10} /> Category</label>
                        <div className="flex items-center gap-2 rounded-lg border border-border-primary bg-bg-tertiary px-3 py-2.5">
                          <span>{CATEGORY_META[result.category as NeedCategory]?.icon || "📦"}</span>
                          <span className="text-sm text-text-primary capitalize">{result.category}</span>
                        </div>
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-semibold uppercase tracking-wider text-text-muted flex items-center gap-1"><AlertTriangle size={10} /> Urgency</label>
                        <div className={cn("rounded-lg px-3 py-2.5 text-sm font-medium text-center", URGENCY_META[result.urgency as UrgencyLevel]?.bgColor || "bg-bg-tertiary")} style={{ color: URGENCY_META[result.urgency as UrgencyLevel]?.color }}>
                          {result.urgency?.toUpperCase()}
                        </div>
                      </div>
                    </div>

                    {/* Location + Quantity */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-semibold uppercase tracking-wider text-text-muted flex items-center gap-1"><MapPin size={10} /> Location</label>
                        <input type="text" defaultValue={result.locationName} className="w-full rounded-lg border border-border-primary bg-bg-tertiary px-3 py-2.5 text-sm text-text-primary focus:border-accent focus:outline-none" />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-semibold uppercase tracking-wider text-text-muted flex items-center gap-1"><Users size={10} /> People Affected</label>
                        <input type="number" defaultValue={result.quantity} className="w-full rounded-lg border border-border-primary bg-bg-tertiary px-3 py-2.5 text-sm text-text-primary focus:border-accent focus:outline-none" />
                      </div>
                    </div>

                    <button className="flex w-full items-center justify-center gap-2 rounded-xl bg-accent px-4 py-3 text-sm font-semibold text-white hover:bg-accent-hover shadow-lg shadow-accent/20 transition-all">
                      <Send size={14} /> Submit to Database
                    </button>
                  </AnimatedCard>
                </motion.div>
              )}

              {!result && !loading && !error && (
                <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border-secondary bg-bg-secondary/50 p-12 text-center">
                  <Wand2 size={40} className="text-text-muted mb-4" />
                  <p className="text-sm font-medium text-text-secondary">Paste text and click &quot;Parse with AI&quot;</p>
                  <p className="text-xs text-text-muted mt-1">AI will structure it into an actionable need</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
