import { useState, useEffect } from 'react';

interface Product {
  id: number;
  name: string;
  price: number;
  description?: string;
  image?: string;
  created_at?: string;
}

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // جلب جميع المنتجات
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/products`);
      
      if (!response.ok) {
        throw new Error('فشل في جلب المنتجات');
      }
      
      const data = await response.json();
      setProducts(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'حدث خطأ');
      console.error('Error fetching products:', err);
    } finally {
      setLoading(false);
    }
  };

  // إضافة منتج جديد
  const addProduct = async (product: Omit<Product, 'id' | 'created_at'>) => {
    try {
      const response = await fetch(`${API_URL}/products`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(product),
      });

      if (!response.ok) {
        throw new Error('فشل في إضافة المنتج');
      }

      const newProduct = await response.json();
      setProducts(prev => [newProduct, ...prev]);
      return newProduct;
    } catch (err) {
      console.error('Error adding product:', err);
      throw err;
    }
  };

  // تحديث منتج
  const updateProduct = async (id: number, product: Partial<Product>) => {
    try {
      const response = await fetch(`${API_URL}/products/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(product),
      });

      if (!response.ok) {
        throw new Error('فشل في تحديث المنتج');
      }

      const updatedProduct = await response.json();
      setProducts(prev =>
        prev.map(p => (p.id === id ? updatedProduct : p))
      );
      return updatedProduct;
    } catch (err) {
      console.error('Error updating product:', err);
      throw err;
    }
  };

  // حذف منتج
  const deleteProduct = async (id: number) => {
    try {
      const response = await fetch(`${API_URL}/products/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('فشل في حذف المنتج');
      }

      setProducts(prev => prev.filter(p => p.id !== id));
    } catch (err) {
      console.error('Error deleting product:', err);
      throw err;
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return {
    products,
    loading,
    error,
    fetchProducts,
    addProduct,
    updateProduct,
    deleteProduct,
  };
};
