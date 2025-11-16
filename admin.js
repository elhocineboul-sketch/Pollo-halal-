import { db, collection, addDoc, getDocs, deleteDoc, doc, updateDoc, onSnapshot } from './firebase-config.js';

// مرجع مجموعة المنتجات
const productsCollection = collection(db, 'products');

// ==================== إضافة منتج ====================
export async function addProduct(productData) {
  try {
    const docRef = await addDoc(productsCollection, {
      name: productData.name,
      price: productData.price,
      description: productData.description,
      image: productData.image,
      category: productData.category || '',
      createdAt: new Date().toISOString()
    });
    
    console.log('تم إضافة المنتج بنجاح! ID:', docRef.id);
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error('خطأ في إضافة المنتج:', error);
    return { success: false, error: error.message };
  }
}

// ==================== جلب جميع المنتجات ====================
export async function getAllProducts() {
  try {
    const querySnapshot = await getDocs(productsCollection);
    const products = [];
    
    querySnapshot.forEach((doc) => {
      products.push({
        id: doc.id,
        ...doc.data()
      });
    });
    
    return products;
  } catch (error) {
    console.error('خطأ في جلب المنتجات:', error);
    return [];
  }
}

// ==================== حذف منتج ====================
export async function deleteProduct(productId) {
  try {
    await deleteDoc(doc(db, 'products', productId));
    console.log('تم حذف المنتج بنجاح!');
    return { success: true };
  } catch (error) {
    console.error('خطأ في حذف المنتج:', error);
    return { success: false, error: error.message };
  }
}

// ==================== تعديل منتج ====================
export async function updateProduct(productId, updatedData) {
  try {
    const productRef = doc(db, 'products', productId);
    await updateDoc(productRef, updatedData);
    console.log('تم تحديث المنتج بنجاح!');
    return { success: true };
  } catch (error) {
    console.error('خطأ في تحديث المنتج:', error);
    return { success: false, error: error.message };
  }
}

// ==================== الاستماع للتحديثات الفورية ====================
export function listenToProducts(callback) {
  return onSnapshot(productsCollection, (snapshot) => {
    const products = [];
    snapshot.forEach((doc) => {
      products.push({
        id: doc.id,
        ...doc.data()
      });
    });
    callback(products);
  });
}

// ==================== مثال على الاستخدام في لوحة التحكم ====================
// استخدم هذا في صفحة لوحة التحكم الخاصة بك

// عند إرسال نموذج إضافة منتج:
/*
document.getElementById('add-product-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const productData = {
    name: document.getElementById('product-name').value,
    price: parseFloat(document.getElementById('product-price').value),
    description: document.getElementById('product-description').value,
    image: document.getElementById('product-image').value,
    category: document.getElementById('product-category').value
  };
  
  const result = await addProduct(productData);
  
  if (result.success) {
    alert('تم إضافة المنتج بنجاح!');
    // إعادة تعيين النموذج
    e.target.reset();
    // تحديث قائمة المنتجات
    loadProductsForAdmin();
  } else {
    alert('خطأ: ' + result.error);
  }
});
*/

// تحميل المنتجات في لوحة التحكم:
/*
async function loadProductsForAdmin() {
  const products = await getAllProducts();
  const container = document.getElementById('admin-products-list');
  container.innerHTML = '';
  
  products.forEach(product => {
    const productCard = `
      <div class="product-item" data-id="${product.id}">
        <img src="${product.image}" alt="${product.name}">
        <h3>${product.name}</h3>
        <p>${product.price} دج</p>
        <button onclick="editProduct('${product.id}')">تعديل</button>
        <button onclick="removeProduct('${product.id}')">حذف</button>
      </div>
    `;
    container.innerHTML += productCard;
  });
}

// حذف منتج
async function removeProduct(productId) {
  if (confirm('هل أنت متأكد من حذف هذا المنتج؟')) {
    const result = await deleteProduct(productId);
    if (result.success) {
      alert('تم الحذف بنجاح!');
      loadProductsForAdmin();
    }
  }
}
*/
