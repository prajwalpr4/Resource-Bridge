"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Zap, Mail, Lock, User, Loader2, Shield, Heart, Check } from "lucide-react";
import { registerWithEmail, signInWithGoogle, getUserProfile } from "@/lib/auth";
import { updateUserProfile } from "@/lib/firestore";
import { SKILL_OPTIONS } from "@/lib/types";
import type { UserRole } from "@/lib/types";
import { cn } from "@/lib/utils";

export default function RegisterPage() {
  const router = useRouter();
  const [step, setStep] = useState<1 | 2>(1);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<UserRole>("volunteer");
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const toggleSkill = (skill: string) => {
    setSelectedSkills((prev) =>
      prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]
    );
  };

  const handleRegister = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (step === 1) { setStep(2); return; }
    setLoading(true);
    setError("");
    try {
      const user = await registerWithEmail(email, password, name, role);
      if (selectedSkills.length > 0) {
        await updateUserProfile(user.uid, { skills: selectedSkills });
      }
      router.push(role === "admin" ? "/dashboard" : "/feed");
    } catch (err: any) {
      console.error("Registration error:", err);
      setError(err?.message || "Registration failed. Please check your connection and try again.");
    } finally { setLoading(false); }
  };

  const handleGoogleRegister = async () => {
    setLoading(true);
    try {
      const user = await signInWithGoogle();
      const profile = await getUserProfile(user.uid);
      router.push(profile?.role === "admin" ? "/dashboard" : "/feed");
    } catch { setError("Google sign-in failed."); }
    finally { setLoading(false); }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-bg-primary px-4">
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 h-80 w-80 rounded-full bg-cyan/10 blur-[100px]" />
        <div className="absolute -bottom-40 -right-40 h-80 w-80 rounded-full bg-accent/10 blur-[100px]" />
      </div>
      <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="relative w-full max-w-md">
        <div className="mb-8 flex flex-col items-center text-center">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-accent text-white shadow-lg shadow-accent/20"><Zap size={24} /></div>
          <h1 className="text-2xl font-bold text-text-primary">Join ResourceBridge</h1>
          <p className="mt-1 text-sm text-text-secondary">{step === 1 ? "Create your account" : "Select your skills"}</p>
        </div>
        <div className="mb-6 flex gap-2">
          <div className="h-1 flex-1 rounded-full bg-accent" />
          <div className={cn("h-1 flex-1 rounded-full transition-colors duration-300", step === 2 ? "bg-accent" : "bg-border-primary")} />
        </div>
        <div className="rounded-2xl border border-border-primary bg-bg-secondary p-8 shadow-lg">
          <AnimatePresence mode="wait">
            {step === 1 ? (
              <motion.div key="step1" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}>
                <button onClick={handleGoogleRegister} disabled={loading} className="flex w-full items-center justify-center gap-3 rounded-xl border border-border-primary bg-bg-tertiary px-4 py-3 text-sm font-medium text-text-primary transition-all hover:bg-bg-hover disabled:opacity-50">
                  <svg className="h-5 w-5" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
                  Continue with Google
                </button>
                <div className="my-6 flex items-center gap-3"><div className="h-px flex-1 bg-border-primary" /><span className="text-xs text-text-muted">or</span><div className="h-px flex-1 bg-border-primary" /></div>
                <form onSubmit={handleRegister} className="space-y-4">
                  <div><label className="mb-1.5 block text-xs font-medium text-text-secondary">Name</label><div className="relative"><User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" /><input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" required className="w-full rounded-xl border border-border-primary bg-bg-tertiary py-3 pl-10 pr-4 text-sm text-text-primary placeholder:text-text-muted focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20" /></div></div>
                  <div><label className="mb-1.5 block text-xs font-medium text-text-secondary">Email</label><div className="relative"><Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" /><input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" required className="w-full rounded-xl border border-border-primary bg-bg-tertiary py-3 pl-10 pr-4 text-sm text-text-primary placeholder:text-text-muted focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20" /></div></div>
                  <div><label className="mb-1.5 block text-xs font-medium text-text-secondary">Password</label><div className="relative"><Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" /><input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Min 6 characters" required minLength={6} className="w-full rounded-xl border border-border-primary bg-bg-tertiary py-3 pl-10 pr-4 text-sm text-text-primary placeholder:text-text-muted focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20" /></div></div>
                  <div>
                    <label className="mb-2 block text-xs font-medium text-text-secondary">I am a...</label>
                    <div className="grid grid-cols-2 gap-3">
                      <button type="button" onClick={() => setRole("admin")} className={cn("flex flex-col items-center gap-2 rounded-xl border p-4 transition-all", role === "admin" ? "border-accent bg-accent-subtle text-accent-light" : "border-border-primary bg-bg-tertiary text-text-secondary hover:border-border-secondary")}><Shield size={20} /><span className="text-xs font-medium">NGO Admin</span></button>
                      <button type="button" onClick={() => setRole("volunteer")} className={cn("flex flex-col items-center gap-2 rounded-xl border p-4 transition-all", role === "volunteer" ? "border-accent bg-accent-subtle text-accent-light" : "border-border-primary bg-bg-tertiary text-text-secondary hover:border-border-secondary")}><Heart size={20} /><span className="text-xs font-medium">Volunteer</span></button>
                    </div>
                  </div>
                  {error && <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-sm text-critical">{error}</motion.p>}
                  <button type="submit" disabled={loading} className="flex w-full items-center justify-center rounded-xl bg-accent px-4 py-3 text-sm font-semibold text-white hover:bg-accent-hover disabled:opacity-50 shadow-lg shadow-accent/20">Continue</button>
                </form>
              </motion.div>
            ) : (
              <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                <h3 className="mb-1 text-base font-semibold text-text-primary">Select your skills</h3>
                <p className="mb-4 text-xs text-text-secondary">We&apos;ll match you with relevant needs</p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {SKILL_OPTIONS.map((skill) => {
                    const sel = selectedSkills.includes(skill);
                    return (
                      <motion.button key={skill} type="button" onClick={() => toggleSkill(skill)} whileTap={{ scale: 0.95 }} className={cn("flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium border transition-all", sel ? "border-accent bg-accent-subtle text-accent-light" : "border-border-primary bg-bg-tertiary text-text-secondary hover:border-border-secondary")}>
                        {sel && <Check size={12} />}{skill}
                      </motion.button>
                    );
                  })}
                </div>
                <div className="flex gap-3">
                  <button onClick={() => setStep(1)} className="flex-1 rounded-xl border border-border-primary bg-bg-tertiary px-4 py-3 text-sm font-medium text-text-secondary hover:bg-bg-hover">Back</button>
                  <button onClick={() => handleRegister()} disabled={loading} className="flex flex-1 items-center justify-center rounded-xl bg-accent px-4 py-3 text-sm font-semibold text-white hover:bg-accent-hover disabled:opacity-50 shadow-lg shadow-accent/20">
                    {loading ? <Loader2 size={18} className="animate-spin" /> : "Create Account"}
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <p className="mt-6 text-center text-sm text-text-secondary">Already have an account?{" "}<Link href="/login" className="font-medium text-accent-light hover:text-accent">Sign in</Link></p>
      </motion.div>
    </div>
  );
}
