import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// ✅ إعدادات Firebase الخاصة بمشروعك
const firebaseConfig = {
  apiKey: "AIzaSyC3kqAYUVCuuK2K5ZKsyS8T6kRxZ0F4fVE",
  authDomain: "pollohalal-41eb4.firebaseapp.com",
  projectId: "pollohalal-41eb4",
  storageBucket: "pollohalal-41eb4.firebasestorage.app",
  messagingSenderId: "1060729559492",
  appId: "1:1060729559492:web:dd6c2af01c0d61d26a6c91",
  measurementId: "G-BJEDH6MC9F"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
