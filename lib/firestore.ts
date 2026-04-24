// ============================================
// Firestore CRUD Helpers
// ============================================

import {
  collection,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  getDoc,
  getDocs,
  query,
  where,
  orderBy,
  limit,
  onSnapshot,
  serverTimestamp,
  increment,
  arrayUnion,
  type Unsubscribe,
  type QueryConstraint,
} from "firebase/firestore";
import { db } from "./firebase";
import type {
  Need,
  Task,
  UserProfile,
  NeedStatus,
  TaskStatus,
  UrgencyLevel,
  BadgeId,
} from "./types";

// ============================================
// NEEDS
// ============================================

/** Create a new need */
export async function createNeed(
  data: Omit<Need, "id" | "createdAt" | "updatedAt">
): Promise<string> {
  const docRef = await addDoc(collection(db, "needs"), {
    ...data,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
  return docRef.id;
}

/** Get all needs with optional filters */
export async function getNeeds(filters?: {
  status?: NeedStatus;
  urgency?: UrgencyLevel;
  limitCount?: number;
}): Promise<Need[]> {
  const constraints: QueryConstraint[] = [];

  if (filters?.status) {
    constraints.push(where("status", "==", filters.status));
  }
  if (filters?.urgency) {
    constraints.push(where("urgency", "==", filters.urgency));
  }
  constraints.push(orderBy("createdAt", "desc"));
  if (filters?.limitCount) {
    constraints.push(limit(filters.limitCount));
  }

  const q = query(collection(db, "needs"), ...constraints);
  const snapshot = await getDocs(q);
  return snapshot.docs.map(
    (d) => ({ id: d.id, ...d.data() }) as Need
  );
}

/** Subscribe to real-time needs updates */
export function subscribeToNeeds(
  callback: (needs: Need[]) => void,
  filters?: { status?: NeedStatus }
): Unsubscribe {
  const constraints: QueryConstraint[] = [];
  if (filters?.status) {
    constraints.push(where("status", "==", filters.status));
  }
  constraints.push(orderBy("createdAt", "desc"));

  const q = query(collection(db, "needs"), ...constraints);
  return onSnapshot(q, (snapshot) => {
    const needs = snapshot.docs.map(
      (d) => ({ id: d.id, ...d.data() }) as Need
    );
    callback(needs);
  });
}

/** Update need status */
export async function updateNeedStatus(
  needId: string,
  status: NeedStatus
): Promise<void> {
  await updateDoc(doc(db, "needs", needId), {
    status,
    updatedAt: serverTimestamp(),
  });
}

/** Assign a volunteer to a need */
export async function assignVolunteerToNeed(
  needId: string,
  volunteerId: string
): Promise<void> {
  await updateDoc(doc(db, "needs", needId), {
    assignedVolunteers: arrayUnion(volunteerId),
    status: "in-progress",
    updatedAt: serverTimestamp(),
  });
}

/** Delete a need */
export async function deleteNeed(needId: string): Promise<void> {
  await deleteDoc(doc(db, "needs", needId));
}

// ============================================
// TASKS
// ============================================

/** Create a task when assigning a volunteer */
export async function createTask(
  data: Omit<Task, "id" | "assignedAt" | "completedAt">
): Promise<string> {
  const docRef = await addDoc(collection(db, "tasks"), {
    ...data,
    assignedAt: serverTimestamp(),
    completedAt: null,
  });
  return docRef.id;
}

/** Get tasks for a specific volunteer */
export async function getVolunteerTasks(
  volunteerId: string
): Promise<Task[]> {
  const q = query(
    collection(db, "tasks"),
    where("volunteerId", "==", volunteerId),
    orderBy("assignedAt", "desc")
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map(
    (d) => ({ id: d.id, ...d.data() }) as Task
  );
}

/** Update task status */
export async function updateTaskStatus(
  taskId: string,
  status: TaskStatus,
  feedback?: string
): Promise<void> {
  const updateData: Record<string, unknown> = {
    status,
  };
  if (status === "completed") {
    updateData.completedAt = serverTimestamp();
  }
  if (feedback) {
    updateData.feedback = feedback;
  }
  await updateDoc(doc(db, "tasks", taskId), updateData);
}

// ============================================
// USERS
// ============================================

/** Get user profile */
export async function getUser(uid: string): Promise<UserProfile | null> {
  const snap = await getDoc(doc(db, "users", uid));
  if (!snap.exists()) return null;
  return snap.data() as UserProfile;
}

/** Update user profile */
export async function updateUserProfile(
  uid: string,
  data: Partial<UserProfile>
): Promise<void> {
  await updateDoc(doc(db, "users", uid), data);
}

/** Add XP to a volunteer */
export async function addXP(uid: string, xp: number): Promise<void> {
  await updateDoc(doc(db, "users", uid), {
    xp: increment(xp),
  });
}

/** Award a badge to a volunteer */
export async function awardBadge(
  uid: string,
  badge: BadgeId
): Promise<void> {
  await updateDoc(doc(db, "users", uid), {
    badges: arrayUnion(badge),
  });
}

/** Get all volunteers */
export async function getVolunteers(): Promise<UserProfile[]> {
  const q = query(
    collection(db, "users"),
    where("role", "==", "volunteer"),
    orderBy("xp", "desc")
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map((d) => d.data() as UserProfile);
}

/** Subscribe to volunteers list (real-time) */
export function subscribeToVolunteers(
  callback: (volunteers: UserProfile[]) => void
): Unsubscribe {
  const q = query(
    collection(db, "users"),
    where("role", "==", "volunteer"),
    orderBy("xp", "desc")
  );
  return onSnapshot(q, (snapshot) => {
    const volunteers = snapshot.docs.map((d) => d.data() as UserProfile);
    callback(volunteers);
  });
}
