"use client";

// Document Scanner — OCR + AI structuring
import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ScanLine, Upload, Loader2, FileImage, Send, X, Camera } from "lucide-react";
import PageTransition from "@/components/shared/page-transition";
import AnimatedCard from "@/components/shared/animated-card";
import { cn } from "@/lib/utils";
import type { ScanDocumentResponse, NeedCategory, UrgencyLevel } from "@/lib/types";
import { CATEGORY_META, URGENCY_META } from "@/lib/types";

export default function ScanPage() {
  const fileRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ScanDocumentResponse | null>(null);
  const [error, setError] = useState("");

  const handleFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target?.result as string;
      setPreview(dataUrl);
      setResult(null);
      setError("");
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) handleFile(file);
  };

  const handleScan = async () => {
    if (!preview) return;
    setLoading(true);
    setError("");
    try {
      const base64 = preview.split(",")[1];
      const res = await fetch("/api/scan-document", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ imageBase64: base64 }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Scan failed");
      }
      const data: ScanDocumentResponse = await res.json();
      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageTransition>
      <div className="space-y-8">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan/10">
            <ScanLine size={20} className="text-cyan" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-text-primary">Document Scanner</h1>
            <p className="text-sm text-text-secondary">Upload a photo of a handwritten survey — AI extracts &amp; structures it</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Upload Side */}
          <div className="space-y-4">
            <div
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleDrop}
              onClick={() => fileRef.current?.click()}
              className={cn(
                "relative flex flex-col items-center justify-center rounded-xl border-2 border-dashed p-8 transition-all cursor-pointer min-h-[300px]",
                preview ? "border-accent/30 bg-bg-secondary" : "border-border-secondary bg-bg-secondary hover:border-accent/40 hover:bg-bg-tertiary"
              )}
            >
              <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFile(f); }} />
              
              {preview ? (
                <div className="relative w-full">
                  <img src={preview} alt="Preview" className="w-full rounded-lg object-contain max-h-[350px]" />
                  <button onClick={(e) => { e.stopPropagation(); setPreview(null); setResult(null); }} className="absolute -top-2 -right-2 flex h-7 w-7 items-center justify-center rounded-full bg-bg-elevated border border-border-primary text-text-muted hover:text-text-primary">
                    <X size={14} />
                  </button>
                </div>
              ) : (
                <>
                  <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-bg-tertiary">
                    <Camera size={28} className="text-text-muted" />
                  </div>
                  <p className="text-sm font-medium text-text-primary">Drop an image or click to upload</p>
                  <p className="mt-1 text-xs text-text-muted">Supports JPG, PNG — handwritten surveys, forms, notes</p>
                </>
              )}
            </div>

            {preview && (
              <button onClick={handleScan} disabled={loading} className="flex w-full items-center justify-center gap-2 rounded-xl bg-cyan px-4 py-3 text-sm font-semibold text-white transition-all hover:bg-cyan-hover disabled:opacity-50 shadow-lg shadow-cyan/20">
                {loading ? <><Loader2 size={16} className="animate-spin" /> Scanning &amp; Analyzing...</> : <><ScanLine size={16} /> Scan with AI</>}
              </button>
            )}
          </div>

          {/* Result Side */}
          <AnimatePresence mode="wait">
            {loading && (
              <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="rounded-xl border border-border-primary bg-bg-secondary p-6 space-y-4">
                <div className="flex items-center gap-3"><Loader2 size={18} className="animate-spin text-cyan" /><span className="text-sm text-text-secondary">AI is reading your document...</span></div>
                <div className="space-y-3">{[1, 2, 3, 4, 5].map((i) => <div key={i} className="skeleton h-10 rounded-lg" style={{ animationDelay: `${i * 0.1}s` }} />)}</div>
              </motion.div>
            )}

            {result && !loading && (
              <motion.div key="result" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
                <AnimatedCard hover={false} className="space-y-5">
                  <h3 className="text-sm font-semibold text-text-primary">Extracted &amp; Structured</h3>
                  
                  {result.extractedText && result.extractedText !== "Extracted via AI Vision" && (
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-semibold uppercase tracking-wider text-text-muted">Raw OCR Text</label>
                      <div className="rounded-lg border border-border-primary bg-bg-tertiary p-3 text-xs text-text-secondary font-mono max-h-24 overflow-y-auto">{result.extractedText}</div>
                    </div>
                  )}

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-semibold uppercase tracking-wider text-text-muted">Title</label>
                    <input type="text" defaultValue={result.structuredData.title} className="w-full rounded-lg border border-border-primary bg-bg-tertiary px-3 py-2.5 text-sm text-text-primary focus:border-cyan focus:outline-none" />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-semibold uppercase tracking-wider text-text-muted">Description</label>
                    <textarea defaultValue={result.structuredData.description} rows={3} className="w-full rounded-lg border border-border-primary bg-bg-tertiary px-3 py-2.5 text-sm text-text-primary resize-none focus:border-cyan focus:outline-none" />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-semibold uppercase tracking-wider text-text-muted">Category</label>
                      <div className="flex items-center gap-2 rounded-lg border border-border-primary bg-bg-tertiary px-3 py-2.5">
                        <span>{CATEGORY_META[result.structuredData.category as NeedCategory]?.icon || "📦"}</span>
                        <span className="text-sm text-text-primary capitalize">{result.structuredData.category}</span>
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-semibold uppercase tracking-wider text-text-muted">Urgency</label>
                      <div className={cn("rounded-lg px-3 py-2.5 text-sm font-medium text-center")} style={{ background: URGENCY_META[result.structuredData.urgency as UrgencyLevel]?.bgColor, color: URGENCY_META[result.structuredData.urgency as UrgencyLevel]?.color }}>
                        {result.structuredData.urgency?.toUpperCase()}
                      </div>
                    </div>
                  </div>

                  <button className="flex w-full items-center justify-center gap-2 rounded-xl bg-cyan px-4 py-3 text-sm font-semibold text-white hover:bg-cyan-hover shadow-lg shadow-cyan/20 transition-all">
                    <Send size={14} /> Submit to Database
                  </button>
                </AnimatedCard>
              </motion.div>
            )}

            {!result && !loading && (
              <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border-secondary bg-bg-secondary/50 p-12 text-center">
                <FileImage size={40} className="text-text-muted mb-4" />
                <p className="text-sm font-medium text-text-secondary">Upload a document to scan</p>
                <p className="text-xs text-text-muted mt-1">AI will extract text and structure it</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </PageTransition>
  );
}
