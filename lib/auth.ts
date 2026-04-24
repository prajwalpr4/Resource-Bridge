// ============================================
// Auth Helpers — Firebase Auth operations
// ============================================

import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut as firebaseSignOut,
  updateProfile,
  type User,
} from "firebase/auth";
import { doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "./firebase";
import type { UserRole, UserProfile } from "./types";

const googleProvider = new GoogleAuthProvider();

/** Sign in with email and password */
export async function signInWithEmail(
  email: string,
  password: string
): Promise<User> {
  const result = await signInWithEmailAndPassword(auth, email, password);
  return result.user;
}

/** Register a new user with email, password, and role */
export async function registerWithEmail(
  email: string,
  password: string,
  name: string,
  role: UserRole
): Promise<User> {
  const result = await createUserWithEmailAndPassword(auth, email, password);
  const user = result.user;

  // Set display name
  await updateProfile(user, { displayName: name });

  // Create user profile document in Firestore
  await createUserProfile(user, name, role);

  return user;
}

/** Sign in with Google */
export async function signInWithGoogle(): Promise<User> {
  const result = await signInWithPopup(auth, googleProvider);
  const user = result.user;

  // Check if profile already exists
  const profileRef = doc(db, "users", user.uid);
  const profileSnap = await getDoc(profileRef);

  if (!profileSnap.exists()) {
    // First-time Google sign-in — create profile with default "volunteer" role
    await createUserProfile(user, user.displayName || "User", "volunteer");
  }

  return user;
}

/** Sign out */
export async function signOut(): Promise<void> {
  await firebaseSignOut(auth);
}

/** Create user profile in Firestore */
async function createUserProfile(
  user: User,
  name: string,
  role: UserRole
): Promise<void> {
  const profileData: Omit<UserProfile, "createdAt"> & {
    createdAt: ReturnType<typeof serverTimestamp>;
  } = {
    uid: user.uid,
    name,
    email: user.email || "",
    role,
    skills: [],
    location: null,
    locationName: "",
    xp: 0,
    badges: [],
    avatarUrl: user.photoURL || "",
    createdAt: serverTimestamp(),
  };

  await setDoc(doc(db, "users", user.uid), profileData);
}

/** Get user profile from Firestore */
export async function getUserProfile(
  uid: string
): Promise<UserProfile | null> {
  const profileRef = doc(db, "users", uid);
  const profileSnap = await getDoc(profileRef);

  if (!profileSnap.exists()) return null;
  return profileSnap.data() as UserProfile;
}
