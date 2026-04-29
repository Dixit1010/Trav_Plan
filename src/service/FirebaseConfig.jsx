import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const apiKey = import.meta.env.VITE_FIREBASE_API_KEY;

if (!apiKey) {
  console.error(
    '[TravPlan] Missing Firebase credentials.\n' +
    'Create a .env.local file in the project root with your Firebase keys.\n' +
    'See .env.example for the required variable names.'
  );
}

const firebaseConfig = {
  apiKey,
  authDomain:        import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId:         import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket:     import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId:             import.meta.env.VITE_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
export const db   = getFirestore(app);
export const auth = apiKey ? getAuth(app) : null;
export { app };
