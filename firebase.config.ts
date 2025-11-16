// src/firebase.config.ts
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC3kqAYUVCuuK2K5ZKsyS8T6kRxZ0F4fVE",
  authDomain: "chickenhalal-41eb4.firebaseapp.com",
  projectId: "chickenhalal-41eb4",
  storageBucket: "chickenhalal-41eb4.firebasestorage.app",
  messagingSenderId: "1060729559492",
  appId: "1:1060729559492:web:dd6c2af01c0d61d26a6c91",
  measurementId: "G-BJEDH6MC9F"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get a reference to the Firestore service
export const db = getFirestore(app);
