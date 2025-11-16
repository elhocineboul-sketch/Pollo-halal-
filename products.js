import { listenToProducts } from './admin.js';

// ==================== عرض المنتجات للمستخدمين ====================
function displayProducts(products) {
  const container = document.getElementById('products-container');
  
  if (!container) {
    console.error('لم يتم العثور على عنصر products-container');
    return;
  }
  
  container.innerHTML = '';
  
  if (products.length === 0) {
    container.innerHTML = '<p class="no-products">لا توجد منتجات حالياً</p>';
    return;
  }
  
  products.forEach(product => {
    const productCard = `
      <div class="product-card">
        <div class="product-image">
          <img src="${product.image}" alt="${product.name}" onerror="this.src='placeholder.jpg'">
        </div>
        <div class="product-info">
          <h3 class="product-name">${product.name}</h3>
          <p class="product-description">${product.description || ''}</p>
          <p class="product-price">${product.price} دج</p>
          <button class="buy-button" onclick="buyProduct('${product.id}', '${product.name}')">
            اشتري الآن
          </button>
        </div>
      </div>
    `;
    container.innerHTML += productCard;
  });
}

// ==================== الاستماع للتحديثات الفورية ====================
// هذا سيحدث المنتجات تلقائياً بدون تحديث الصفحة!
listenToProducts((products) => {
  console.log('تم تحديث المنتجات:', products.length);
  displayProducts(products);
});

// ==================== وظيفة الشراء (مثال) ====================
window.buyProduct = function(productId, productName) {
  // هنا يمكنك إضافة منطق الشراء الخاص بك
  alert(تم إضافة "${productName}" إلى السلة!);
  // مثال: إضافة إلى السلة، فتح نافذة دفع، إلخ
};

// تحميل المنتجات عند فتح الصفحة
console.log('تم تحميل صفحة المنتجات');
