🐾, [15/11/2025 06:58 p. m.]
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

🐾, [15/11/2025 07:15 p. m.]
import { 
  collection, 
  getDocs, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc,
  onSnapshot,
  query,
  Timestamp
} from 'firebase/firestore';
import { db } from './firebase';
import { Product, Customer, Offer } from './types';

// ============= المنتجات (Products) =============
export const productsCollection = collection(db, 'products');

// جلب جميع المنتجات
export const fetchProducts = async (): Promise<Product[]> => {
  try {
    const snapshot = await getDocs(productsCollection);
    return snapshot.docs.map(doc => ({ 
      ...doc.data(), 
      id: doc.id 
    } as Product));
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
};

// الاستماع للتحديثات في الوقت الفعلي
export const subscribeToProducts = (callback: (products: Product[]) => void) => {
  return onSnapshot(productsCollection, (snapshot) => {
    const products = snapshot.docs.map(doc => ({
      ...doc.data(),
      id: doc.id
    } as Product));
    callback(products);
  });
};

// إضافة منتج جديد
export const addProduct = async (product: Product): Promise<string> => {
  try {
    const docRef = await addDoc(productsCollection, {
      ...product,
      createdAt: Timestamp.now()
    });
    return docRef.id;
  } catch (error) {
    console.error("Error adding product:", error);
    throw error;
  }
};

// تحديث منتج
export const updateProduct = async (productId: number | string, updates: Partial<Product>) => {
  try {
    const productRef = doc(db, 'products', String(productId));
    await updateDoc(productRef, {
      ...updates,
      updatedAt: Timestamp.now()
    });
  } catch (error) {
    console.error("Error updating product:", error);
    throw error;
  }
};

// حذف منتج
export const deleteProduct = async (productId: number | string) => {
  try {
    const productRef = doc(db, 'products', String(productId));
    await deleteDoc(productRef);
  } catch (error) {
    console.error("Error deleting product:", error);
    throw error;
  }
};

// ============= العملاء (Customers) =============
export const customersCollection = collection(db, 'customers');

// جلب جميع العملاء
export const fetchCustomers = async (): Promise<Customer[]> => {
  try {
    const snapshot = await getDocs(customersCollection);
    return snapshot.docs.map(doc => ({
      ...doc.data(),
      id: doc.id
    } as Customer));
  } catch (error) {
    console.error("Error fetching customers:", error);
    return [];
  }
};

// الاستماع للتحديثات في الوقت الفعلي
export const subscribeToCustomers = (callback: (customers: Customer[]) => void) => {
  return onSnapshot(customersCollection, (snapshot) => {
    const customers = snapshot.docs.map(doc => ({
      ...doc.data(),
      id: doc.id
    } as Customer));
    callback(customers);
  });
};

// إضافة أو تحديث عميل
export const saveCustomer = async (customer: Customer): Promise<string> => {
  try {
    if (customer.id) {
      // تحديث عميل موجود
      const customerRef = doc(db, 'customers', String(customer.id));
      await updateDoc(customerRef, {
        ...customer,
        updatedAt: Timestamp.now()
      });
      return String(customer.id);
    } else {
      // إضافة عميل جديد
      const docRef = await addDoc(customersCollection, {
        ...customer,
        createdAt: Timestamp.now()
      });
      return docRef.id;
    }
  } catch (error) {
    console.error("Error saving customer:", error);
    throw error;
  }
};

// ============= العروض (Offers) =============
export const offersCollection = collection(db, 'offers');

// جلب جميع العروض
export const fetchOffers = async (): Promise<Offer[]> => {
  try {
    const snapshot = await getDocs(offersCollection);
    return snapshot.docs.map(doc => ({
      ...doc.data(),
      id: doc.id
    } as Offer));
  } catch (error) {
    console.error("Error fetching offers:", error);
    return [];
  }
};

🐾, [15/11/2025 07:15 p. m.]
// الاستماع للتحديثات في الوقت الفعلي
export const subscribeToOffers = (callback: (offers: Offer[]) => void) => {
  return onSnapshot(offersCollection, (snapshot) => {
    const offers = snapshot.docs.map(doc => ({
      ...doc.data(),
      id: doc.id
    } as Offer));
    callback(offers);
  });
};

// إضافة عرض جديد
export const addOffer = async (offer: Offer): Promise<string> => {
  try {
    const docRef = await addDoc(offersCollection, {
      ...offer,
      createdAt: Timestamp.now()
    });
    return docRef.id;
  } catch (error) {
    console.error("Error adding offer:", error);
    throw error;
  }
};

// تحديث عرض
export const updateOffer = async (offerId: string, updates: Partial<Offer>) => {
  try {
    const offerRef = doc(db, 'offers', offerId);
    await updateDoc(offerRef, {
      ...updates,
      updatedAt: Timestamp.now()
    });
  } catch (error) {
    console.error("Error updating offer:", error);
    throw error;
  }
};

// حذف عرض
export const deleteOffer = async (offerId: string) => {
  try {
    const offerRef = doc(db, 'offers', offerId);
    await deleteDoc(offerRef);
  } catch (error) {
    console.error("Error deleting offer:", error);
    throw error;
  }
};
