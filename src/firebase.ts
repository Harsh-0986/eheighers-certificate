import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  senderId: import.meta.env.VITE_FIREBASE_SENDER_ID,
  measurementId: import.meta.env.VITE_FIREEBASE_MEASUREMENT_ID,
};

const firebase = initializeApp(firebaseConfig);
const db = getFirestore(firebase);

export { firebase, db };
