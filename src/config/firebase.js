import { getApp, getApps, initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY?.trim(),
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN?.trim(),
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID?.trim(),
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET?.trim(),
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID?.trim(),
  appId: import.meta.env.VITE_FIREBASE_APP_ID?.trim(),
};

const requiredConfig = ['apiKey', 'authDomain', 'projectId', 'appId'];
const missingConfig = requiredConfig.filter((key) => !firebaseConfig[key]);

if (missingConfig.length > 0) {
  throw new Error(
    `Firebase is not configured. Missing: ${missingConfig.join(', ')}. ` +
      'Add the VITE_FIREBASE_* values to your environment and restart the app.',
  );
}

// Reuse the default app during development hot reloads.
export const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
