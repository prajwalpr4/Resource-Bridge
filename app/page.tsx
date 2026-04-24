"use client";

// Landing Page — Premium marketing page with animations
import { motion } from "framer-motion";
import Link from "next/link";
import {
  Zap,
  Sparkles,
  ScanLine,
  MapPin,
  Award,
  ArrowRight,
  ChevronRight,
  Globe,
  Shield,
  Users,
  Brain,
} from "lucide-react";
import { ThemeProvider } from "@/context/theme-context";
import ThemeToggle from "@/components/layout/theme-toggle";

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  animate: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] }
  },
};

const stagger = {
  animate: { transition: { staggerChildren: 0.1 } },
};

const features = [
  { icon: Sparkles, title: "Smart-Paste Magic", desc: "Paste a messy WhatsApp message — AI structures it into an actionable need in seconds.", color: "#7C3AED" },
  { icon: ScanLine, title: "Document Scanner", desc: "Upload a photo of a handwritten survey. AI reads, extracts, and structures it.", color: "#06B6D4" },
  { icon: MapPin, title: "Priority Map", desc: "Real-time visualization with glowing markers for urgent, critical community needs.", color: "#EF4444" },
  { icon: Award, title: "Gamified Volunteering", desc: "Earn XP, unlock badges, climb leaderboards. Turn helping into an engaging experience.", color: "#F59E0B" },
  { icon: Brain, title: "AI-Powered Matching", desc: "The AI matches volunteers to needs based on skills, proximity, and urgency.", color: "#10B981" },
  { icon: Shield, title: "Secure & Scalable", desc: "Built on Firebase with role-based security rules. Ready for production scale.", color: "#3B82F6" },
];

const steps = [
  { num: "01", title: "Capture", desc: "Paste text, scan a document, or manually enter a community need." },
  { num: "02", title: "AI Structures", desc: "The AI parses and categorizes the need with urgency levels." },
  { num: "03", title: "Visualize", desc: "Needs appear on the priority map with color-coded urgency markers." },
  { num: "04", title: "Match & Resolve", desc: "Volunteers are matched and dispatched. Impact is tracked and rewarded." },
];

function LandingContent() {
  return (
    <div className="w-full min-h-screen bg-bg-primary overflow-x-hidden">
      {/* ---- Navbar ---- */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border-primary/50 bg-bg-primary/80 backdrop-blur-xl">
        <div className="w-full max-w-[1200px] mx-auto flex h-16 items-center justify-between px-6 md:px-10">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent text-white">
              <Zap size={16} />
            </div>
            <span className="text-sm font-bold text-text-primary tracking-tight">
              ResourceBridge
            </span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm text-text-secondary">
            <a href="#features" className="hover:text-text-primary transition-colors">Features</a>
            <a href="#how-it-works" className="hover:text-text-primary transition-colors">How It Works</a>
            <a href="#impact" className="hover:text-text-primary transition-colors">Impact</a>
          </div>
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <Link href="/login" className="text-sm font-medium text-text-secondary hover:text-text-primary transition-colors">
              Sign In
            </Link>
            <Link href="/register" className="rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-white hover:bg-accent-hover transition-all shadow-sm shadow-accent/20">
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* ---- Hero ---- */}
      <section className="relative w-full pt-[140px] md:pt-[180px] pb-[112px] px-6 md:px-10 overflow-hidden">
        {/* Background glows */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute top-20 left-1/4 h-[500px] w-[500px] rounded-full bg-accent/8 blur-[120px]" />
          <div className="absolute bottom-0 right-1/4 h-[400px] w-[400px] rounded-full bg-cyan/8 blur-[120px]" />
        </div>

        <motion.div
          initial="initial"
          animate="animate"
          variants={stagger}
          className="relative w-full max-w-[800px] mx-auto text-center"
        >
          <motion.div
            variants={fadeUp}
            className="mb-8 inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent-subtle px-5 py-2 text-xs font-medium text-accent-light"
          >
            <Sparkles size={12} /> Google Solution Challenge 2026
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="text-5xl sm:text-6xl lg:text-7xl font-black text-text-primary leading-[1.1] tracking-tight py-2"
          >
            Turn Chaos Into
            <br />
            <span className="gradient-text">Community Action</span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mt-8 text-base md:text-lg text-text-secondary max-w-[600px] mx-auto leading-relaxed"
          >
            ResourceBridge uses AI to transform scattered community data — WhatsApp
            messages, handwritten surveys, verbal notes — into a clear, actionable
            dashboard that matches urgent needs with available volunteers.
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link
              href="/register"
              className="flex items-center gap-2 rounded-xl bg-accent px-8 py-3.5 text-sm font-bold text-white hover:bg-accent-hover transition-all shadow-lg shadow-accent/25 hover:shadow-accent/40 hover:-translate-y-0.5"
            >
              Start Bridging Resources <ArrowRight size={16} />
            </Link>
            <Link
              href="/login"
              className="flex items-center gap-2 rounded-xl border border-border-primary bg-bg-secondary px-8 py-3.5 text-sm font-medium text-text-primary hover:bg-bg-tertiary transition-all"
            >
              View Dashboard <ChevronRight size={16} />
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* ---- Stats Bar ---- */}
      <section className="w-full border-y border-border-primary bg-bg-secondary/50">
        <div className="w-full max-w-[1000px] mx-auto grid grid-cols-2 md:grid-cols-4 divide-x divide-border-primary">
          {[
            { value: "312+", label: "Needs Resolved" },
            { value: "128+", label: "Active Volunteers" },
            { value: "95%", label: "AI Accuracy" },
            { value: "<2min", label: "Avg Response" },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="py-10 text-center"
            >
              <p className="text-2xl md:text-3xl font-black gradient-text">{stat.value}</p>
              <p className="text-xs text-text-muted mt-1.5">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ---- Features ---- */}
      <section id="features" className="w-full py-[112px] px-6 md:px-10">
        <div className="w-full max-w-[1100px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-black text-text-primary">
              Powered by AI. Built for Impact.
            </h2>
            <p className="mt-4 text-text-secondary max-w-[520px] mx-auto">
              Every feature is designed to reduce response time and maximize community coverage.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feat, i) => (
              <motion.div
                key={feat.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                whileHover={{ y: -4 }}
                className="group rounded-2xl border border-border-primary bg-bg-secondary p-7 transition-all duration-300 hover:border-border-secondary hover:shadow-lg"
              >
                <div
                  className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl"
                  style={{ background: feat.color + "18" }}
                >
                  <feat.icon size={22} style={{ color: feat.color }} />
                </div>
                <h3 className="text-base font-bold text-text-primary mb-2">{feat.title}</h3>
                <p className="text-sm text-text-secondary leading-relaxed">{feat.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ---- How It Works ---- */}
      <section id="how-it-works" className="w-full py-[112px] px-6 md:px-10 bg-bg-secondary/30">
        <div className="w-full max-w-[800px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-black text-text-primary">
              How ResourceBridge Works
            </h2>
            <p className="mt-4 text-text-secondary">From messy data to action in four steps</p>
          </motion.div>

          <div className="space-y-5">
            {steps.map((step, i) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex items-start gap-6 rounded-2xl border border-border-primary bg-bg-secondary p-7 hover:border-border-secondary transition-all"
              >
                <span className="text-3xl font-black gradient-text flex-shrink-0">{step.num}</span>
                <div>
                  <h3 className="text-lg font-bold text-text-primary">{step.title}</h3>
                  <p className="mt-1.5 text-sm text-text-secondary leading-relaxed">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ---- CTA ---- */}
      <section id="impact" className="w-full py-[112px] px-6 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="w-full max-w-[720px] mx-auto text-center"
        >
          <div className="rounded-3xl border border-accent/20 bg-gradient-to-br from-accent/5 to-cyan/5 p-12 md:p-16">
            <Globe size={48} className="mx-auto mb-6 text-accent-light" />
            <h2 className="text-3xl md:text-4xl font-black text-text-primary">
              Ready to Bridge the Gap?
            </h2>
            <p className="mt-4 text-text-secondary max-w-[480px] mx-auto">
              Join ResourceBridge and help transform how communities respond to urgent needs. Every second counts.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/register"
                className="flex items-center gap-2 rounded-xl bg-accent px-8 py-3.5 text-sm font-bold text-white hover:bg-accent-hover transition-all shadow-lg shadow-accent/25"
              >
                Join as Volunteer <ArrowRight size={16} />
              </Link>
              <Link
                href="/register"
                className="flex items-center gap-2 rounded-xl border border-border-primary px-8 py-3.5 text-sm font-medium text-text-primary hover:bg-bg-tertiary transition-all"
              >
                Register as NGO Admin
              </Link>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ---- Footer ---- */}
      <footer className="w-full border-t border-border-primary bg-bg-secondary/50 py-10 px-6 md:px-10">
        <div className="w-full max-w-[1100px] mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-md bg-accent text-white">
              <Zap size={12} />
            </div>
            <span className="text-xs font-bold text-text-primary">ResourceBridge</span>
          </div>
          <p className="text-xs text-text-muted">
            Built for Google Solution Challenge 2026 · Powered by AI
          </p>
          <div className="flex items-center gap-4 text-xs text-text-muted">
            <a href="#" className="hover:text-text-secondary transition-colors">Privacy</a>
            <a href="#" className="hover:text-text-secondary transition-colors">Terms</a>
            <a href="https://github.com" className="hover:text-text-secondary transition-colors">GitHub</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default function LandingPage() {
  return (
    <ThemeProvider>
      <LandingContent />
    </ThemeProvider>
  );
}
