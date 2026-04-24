// ============================================
// ResourceBridge — TypeScript Type Definitions
// ============================================

import { Timestamp, GeoPoint } from "firebase/firestore";

// ---- User Roles ----
export type UserRole = "admin" | "volunteer";

// ---- Need Categories ----
export type NeedCategory =
  | "food"
  | "shelter"
  | "medical"
  | "clothing"
  | "education"
  | "sanitation"
  | "other";

// ---- Urgency Levels ----
export type UrgencyLevel = "low" | "medium" | "critical";

// ---- Need Status ----
export type NeedStatus = "pending" | "in-progress" | "resolved";

// ---- Task Status ----
export type TaskStatus =
  | "assigned"
  | "accepted"
  | "in-progress"
  | "completed"
  | "cancelled";

// ---- Badge Types ----
export type BadgeId =
  | "first-responder"
  | "helping-hand"
  | "community-hero"
  | "top-1-percent"
  | "streak-7"
  | "streak-30"
  | "food-warrior"
  | "shelter-builder"
  | "medic"
  | "educator";

// ---- Firestore Documents ----

export interface UserProfile {
  uid: string;
  name: string;
  email: string;
  role: UserRole;
  skills: string[];
  location: GeoPoint | null;
  locationName: string;
  xp: number;
  badges: BadgeId[];
  avatarUrl: string;
  createdAt: Timestamp;
}

export interface Need {
  id: string;
  title: string;
  description: string;
  rawInput: string;
  category: NeedCategory;
  urgency: UrgencyLevel;
  location: GeoPoint | null;
  locationName: string;
  quantity: number;
  assignedVolunteers: string[];
  status: NeedStatus;
  createdBy: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface Task {
  id: string;
  needId: string;
  volunteerId: string;
  volunteerName: string;
  status: TaskStatus;
  feedback: string;
  xpAwarded: number;
  assignedAt: Timestamp;
  completedAt: Timestamp | null;
}

// ---- API Request / Response Types ----

export interface ParseNeedRequest {
  rawText: string;
}

export interface ParseNeedResponse {
  title: string;
  description: string;
  category: NeedCategory;
  urgency: UrgencyLevel;
  locationName: string;
  quantity: number;
  confidence: number;
}

export interface ScanDocumentRequest {
  imageBase64: string;
}

export interface ScanDocumentResponse {
  extractedText: string;
  structuredData: ParseNeedResponse;
}

// ---- UI State Types ----

export interface NavItem {
  label: string;
  href: string;
  icon: string;
  badge?: number;
}

export interface StatCard {
  label: string;
  value: number;
  change: number;
  changeLabel: string;
  icon: string;
  color: string;
}

export interface BadgeInfo {
  id: BadgeId;
  name: string;
  description: string;
  icon: string;
  xpRequired: number;
}

// ---- Badge Definitions ----
export const BADGES: Record<BadgeId, BadgeInfo> = {
  "first-responder": {
    id: "first-responder",
    name: "First Responder",
    description: "Completed your first task",
    icon: "🚀",
    xpRequired: 0,
  },
  "helping-hand": {
    id: "helping-hand",
    name: "Helping Hand",
    description: "Completed 5 tasks",
    icon: "🤝",
    xpRequired: 250,
  },
  "community-hero": {
    id: "community-hero",
    name: "Community Hero",
    description: "Completed 25 tasks",
    icon: "🦸",
    xpRequired: 1250,
  },
  "top-1-percent": {
    id: "top-1-percent",
    name: "Top 1% Helper",
    description: "In the top 1% of volunteers",
    icon: "👑",
    xpRequired: 5000,
  },
  "streak-7": {
    id: "streak-7",
    name: "Week Warrior",
    description: "7-day activity streak",
    icon: "🔥",
    xpRequired: 350,
  },
  "streak-30": {
    id: "streak-30",
    name: "Monthly Champion",
    description: "30-day activity streak",
    icon: "💎",
    xpRequired: 1500,
  },
  "food-warrior": {
    id: "food-warrior",
    name: "Food Warrior",
    description: "Resolved 10 food-related needs",
    icon: "🍲",
    xpRequired: 500,
  },
  "shelter-builder": {
    id: "shelter-builder",
    name: "Shelter Builder",
    description: "Resolved 10 shelter needs",
    icon: "🏠",
    xpRequired: 500,
  },
  medic: {
    id: "medic",
    name: "Community Medic",
    description: "Resolved 10 medical needs",
    icon: "⚕️",
    xpRequired: 500,
  },
  educator: {
    id: "educator",
    name: "Knowledge Giver",
    description: "Resolved 10 education needs",
    icon: "📚",
    xpRequired: 500,
  },
};

// ---- Skill Options ----
export const SKILL_OPTIONS: string[] = [
  "First Aid",
  "Cooking",
  "Driving",
  "Teaching",
  "Counseling",
  "Construction",
  "Medical",
  "IT Support",
  "Translation",
  "Logistics",
  "Child Care",
  "Elder Care",
  "Legal Aid",
  "Fundraising",
  "Photography",
  "Social Media",
];

// ---- Category Metadata ----
export const CATEGORY_META: Record<
  NeedCategory,
  { label: string; icon: string; color: string }
> = {
  food: { label: "Food & Water", icon: "🍲", color: "#F59E0B" },
  shelter: { label: "Shelter", icon: "🏠", color: "#3B82F6" },
  medical: { label: "Medical", icon: "🏥", color: "#EF4444" },
  clothing: { label: "Clothing", icon: "👕", color: "#8B5CF6" },
  education: { label: "Education", icon: "📚", color: "#06B6D4" },
  sanitation: { label: "Sanitation", icon: "🚿", color: "#10B981" },
  other: { label: "Other", icon: "📦", color: "#6B7280" },
};

// ---- Urgency Metadata ----
export const URGENCY_META: Record<
  UrgencyLevel,
  { label: string; color: string; bgColor: string }
> = {
  low: { label: "Low", color: "#10B981", bgColor: "#10B98120" },
  medium: { label: "Medium", color: "#F59E0B", bgColor: "#F59E0B20" },
  critical: { label: "Critical", color: "#EF4444", bgColor: "#EF444420" },
};
