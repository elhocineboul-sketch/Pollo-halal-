import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// ⚠️ استبدل بإعداداتك من Firebase Console
const firebaseConfig = {
  apiKey: "YOUR-API-KEY",
  authDomain: "pollo-halal-47eb4.firebaseapp.com",
  projectId: "pollo-halal-47eb4",
  storageBucket: "pollo-halal-47eb4.appspot.com",
  messagingSenderId: "YOUR-SENDER-ID",
  appId: "YOUR-APP-ID"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
