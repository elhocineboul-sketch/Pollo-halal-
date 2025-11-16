// استيراد Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, deleteDoc, doc, updateDoc, onSnapshot } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// إعدادات Firebase الخاصة بك
const firebaseConfig = {
  apiKey: "AIzaSyC3kqAYUVCuuK2K5ZKsyS8T6kRxZ0F4fVE",
  authDomain: "chickenhalal-41eb4.firebaseapp.com",
  projectId: "chickenhalal-41eb4",
  storageBucket: "chickenhalal-41eb4.firebasestorage.app",
  messagingSenderId: "1060729559492",
  appId: "1:1060729559492:web:dd6c2af01c0d61d26a6c91",
  measurementId: "G-BJEDH6MC9F"
};

// تهيئة Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// تصدير الوظائف للاستخدام في ملفات أخرى
export { db, collection, addDoc, getDocs, deleteDoc, doc, updateDoc, onSnapshot };
