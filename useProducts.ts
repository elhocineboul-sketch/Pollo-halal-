// src/useProducts.ts
import { useState, useEffect } from 'react';
import { db } from './firebase.config';
import {
  collection,
  onSnapshot,
  query,
  addDoc,
  deleteDoc,
  updateDoc,
  doc,
  Timestamp,
  serverTimestamp,
  QueryDocumentSnapshot,
  DocumentData,
} from 'firebase/firestore';
import { Product, Locale } from './types';

// Helper to convert Firestore DocumentData to Product interface
const productFromFirestore = (doc: QueryDocumentSnapshot<DocumentData>): Product => {
  const data = doc.data();
  // Ensure name and desc are objects or default to empty objects
  const name = data.name || { es: '', en: '', ar: '' };
  const desc = data.desc || { es: '', en: '', ar: '' };

  return {
    id: doc.id,
    name: name as Record<Locale, string>,
    desc: desc as Record<Locale, string>,
    wholesale: data.wholesale || 0,
    sale: data.sale || 0,
    img: data.img || '',
    unitWeightKg: data.unitWeightKg || 0,
    initialUnitsStock: data.initialUnitsStock || 0,
    unitsSold: data.unitsSold || 0,
    activeOfferId: data.activeOfferId || undefined,
    category: data.category || undefined, // New category field
    createdAt: data.createdAt instanceof Timestamp ? data.createdAt : Timestamp.now(), // Ensure Timestamp type
  };
};

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const q = query(collection(db, 'products'));
    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const productsData = snapshot.docs.map((doc) => productFromFirestore(doc));
        setProducts(productsData);
        setLoading(false);
      },
      (err) => {
        console.error('Failed to fetch products:', err);
        setError('Failed to load products.');
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  const addProduct = async (productData: Omit<Product, 'id' | 'createdAt'> & { createdAt?: Timestamp | ReturnType<typeof serverTimestamp> }) => {
    try {
      setLoading(true);
      // Ensure name and desc are valid objects
      const newProductData = {
        ...productData,
        name: productData.name || { es: '', en: '', ar: '' },
        desc: productData.desc || { es: '', en: '', ar: '' },
        createdAt: serverTimestamp(), // Use serverTimestamp for new documents
      };
      await addDoc(collection(db, 'products'), newProductData);
      setLoading(false);
      return true;
    } catch (e) {
      console.error('Error adding document: ', e);
      setError('Failed to add product.');
      setLoading(false);
      return false;
    }
  };

  const updateProduct = async (id: string, productData: Partial<Product>) => {
    try {
      setLoading(true);
      const productRef = doc(db, 'products', id);
      // Create a copy of the data and remove the 'id' property before updating,
      // as the document ID cannot be changed.
      const { id: _id, ...dataToUpdate } = productData;
      await updateDoc(productRef, dataToUpdate);
      setLoading(false);
      return true;
    } catch (e) {
      console.error('Error updating document: ', e);
      setError('Failed to update product.');
      setLoading(false);
      return false;
    }
  };

  const deleteProduct = async (id: string) => {
    try {
      setLoading(true);
      await deleteDoc(doc(db, 'products', id));
      setLoading(false);
      return true;
    } catch (e) {
      console.error('Error removing document: ', e);
      setError('Failed to delete product.');
      setLoading(false);
      return false;
    }
  };

  return { products, loading, error, addProduct, updateProduct, deleteProduct };
};