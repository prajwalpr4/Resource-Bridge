// ============================================
// Firebase Initialization — Modular SDK v9+
// ============================================

import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Prevent re-initialization in dev mode (hot reload)
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

const initFirebase = () => {
  try {
    return {
      auth: getAuth(app),
      db: getFirestore(app),
      storage: getStorage(app)
    };
  } catch (error) {
    console.error("Firebase services failed to initialize (likely missing/invalid env vars during build):", error);
    return {
      auth: null as unknown as ReturnType<typeof getAuth>,
      db: null as unknown as ReturnType<typeof getFirestore>,
      storage: null as unknown as ReturnType<typeof getStorage>
    };
  }
};

export const { auth, db, storage } = initFirebase();
export default app;
