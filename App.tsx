import React, { useState } from 'react';
import { Product, Screen, CartItem, ToastMessage, Locale, Customer, Order, CustomerOrderDetails, OrderConfirmationDetails } from './types';
import Home from './screens/Home';
import Admin from './screens/Admin';
import ProductFormModal from './components/ProductFormModal';
import PaymentActivationModal from './components/PaymentActivationModal';
import CartModal from './components/CartModal';
import Toast from './components/Toast';
import SettingsModal from './components/SettingsModal'; // Import new SettingsModal
import Customers from './screens/Customers'; // Import new Customers screen
import CustomerOrdersModal from './components/CustomerOrdersModal'; // Import new CustomerOrdersModal
import OrderConfirmationModal from './components/OrderConfirmationModal'; // Import new OrderConfirmationModal
import { LocaleProvider, useTranslation, useLocale } from './i18n/LocaleContext'; // Import LocaleProvider and hooks

// Dummy products for initial state
const initialProducts: Product[] = [
  { id: 1, name: { es: 'Pechuga de pollo fresca', en: 'Fresh Chicken Breast', ar: 'صدر دجاج طازج' }, desc: { es: 'Pechuga de pollo sin piel ni hueso', en: 'Skinless boneless chicken breast', ar: 'صدر دجاج بدون جلد' }, wholesale: 6, sale: 8.95, img: 'https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=400', unitWeightKg: 0.5, initialUnitsStock: 100, unitsSold: 5 },
  { id: 2, name: { es: 'Pollo entero', en: 'Whole Chicken', ar: 'دجاج كامل' }, desc: { es: 'Pollo Halal fresco', en: 'Fresh Halal chicken', ar: 'دجاج حلال طازج' }, wholesale: 9, sale: 12.95, img: 'https://images.unsplash.com/photo-1587593810167-a84920ea0781?w=400', unitWeightKg: 1.2, initialUnitsStock: 50, unitsSold: 2 },
  { id: 3, name: { es: 'Muslo de pollo', en: 'Chicken Thigh', ar: 'فخذ الدجاج' }, desc: { es: 'Muslo de pollo marinado', en: 'Marinated chicken thigh', ar: 'فخذ دجاج متبل' }, wholesale: 5, sale: 7.50, img: 'https://images.unsplash.com/photo-1598515213692-02222292012d?w=400', unitWeightKg: 0.8, initialUnitsStock: 75, unitsSold: 10 },
  { id: 4, name: { es: 'Alas de pollo', en: 'Chicken Wings', ar: 'أجنحة الدجاج' }, desc: { es: 'Alas crujientes', en: 'Crispy wings', ar: 'أجنحة مقرمشة' }, wholesale: 7, sale: 9.95, img: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=400', unitWeightKg: 0.6, initialUnitsStock: 90, unitsSold: 7 }
];

// Dummy customers for initial state
const initialCustomers: Customer[] = [
  { id: 1, name: 'Juan Perez', email: 'juan.perez@example.com', phone: '555-1234', address: '123 Main St, Anytown', totalPurchases: 150.75, orders: [], status: 'returning' },
  { id: 2, name: 'Maria Garcia', email: 'maria.g@example.com', phone: '555-5678', address: '456 Oak Ave, Somewhere', totalPurchases: 320.00, orders: [], status: 'returning' },
  { id: 3, name: 'Ahmed Khan', email: 'ahmed.k@example.com', phone: '555-9012', address: '789 Pine Ln, Nowhere', totalPurchases: 85.50, orders: [], status: 'returning' },
  { id: 4, name: 'Fatima Al-Fassi', email: 'fatima.a@example.com', phone: '555-3456', address: '101 Cedar Rd, Hiddentown', totalPurchases: 210.25, orders: [], status: 'returning' },
];


const AppContent: React.FC = () => {
  const t = useTranslation(); // Use translation hook
  const { locale } = useLocale(); // Use locale hook to get current locale

  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [customers, setCustomers] = useState<Customer[]>(initialCustomers); // New state for customers
  const [currentScreen, setCurrentScreen] = useState<Screen>(Screen.Home);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false); // New state for SettingsModal
  const [isProductFormModalOpen, setIsProductFormModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isPaymentActivationModalOpen, setIsPaymentActivationModalOpen] = useState(false);
  // isCODEnabled and isOnlinePaymentEnabled are kept for admin panel, but not passed to CartModal anymore
  const [isCODEnabled, setIsCODEnabled] = useState(true);
  const [isOnlinePaymentEnabled, setIsOnlinePaymentEnabled] = useState(true);
  const [isNequiEnabled, setIsNequiEnabled] = useState(false); // New state for Nequi payment

  // Cart state
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartModalOpen, setIsCartModalOpen] = useState(false);

  // Toast state
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Customer Orders Modal state
  const [isCustomerOrdersModalOpen, setIsCustomerOrdersModalOpen] = useState(false);
  const [selectedCustomerForOrders, setSelectedCustomerForOrders] = useState<Customer | null>(null);

  // Order Confirmation Modal state
  const [isOrderConfirmationModalOpen, setIsOrderConfirmationModalOpen] = useState(false);
  const [lastOrderDetails, setLastOrderDetails] = useState<OrderConfirmationDetails | null>(null);


  const addToast = (messageKey: string, type: 'success' | 'error' | 'info' = 'success', args?: Record<string, string | number>) => {
    const id = Date.now().toString(); // Simple unique ID
    setToasts((prevToasts) => [...prevToasts, { id, message: t(messageKey, args), type }]);
  };

  const removeToast = (id: string) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
  };


  const handleShowSettings = () => { // Renamed from handleShowLogin
    setIsSettingsModalOpen(true);
  };

  const handleCloseSettings = () => { // New handler for SettingsModal
    setIsSettingsModalOpen(false);
  };

  const handleAdminLogin = () => { // New handler for admin login from SettingsModal
    setCurrentScreen(Screen.Admin);
  };

  const handleGoHome = () => {
    setCurrentScreen(Screen.Home);
  };

  const handleGoToAdmin = () => { // New handler to go to admin from Customers or other admin sub-screens
    setCurrentScreen(Screen.Admin);
  };

  const handleAddProduct = () => {
    setEditingProduct(null);
    setIsProductFormModalOpen(true);
  };

  const handleEditProduct = (id: number) => {
    const productToEdit = products.find(p => p.id === id);
    if (productToEdit) {
      setEditingProduct(productToEdit);
      setIsProductFormModalOpen(true);
    }
  };

  const handleDeleteProduct = (id: number) => {
    if (window.confirm(t('confirmDeleteProduct'))) {
      setProducts(prevProducts => prevProducts.filter(p => p.id !== id));
      addToast('productDeletedSuccess', 'success');
    }
  };

  const handleSaveProduct = (product: Product) => {
    if (editingProduct) {
      setProducts(prevProducts => prevProducts.map(p => (p.id === product.id ? product : p)));
      addToast('productUpdatedSuccess', 'success');
    } else {
      // For new products, initialize unitsSold
      const newProductWithInventory = { ...product, unitsSold: 0 };
      setProducts(prevProducts => [...prevProducts, newProductWithInventory]);
      addToast('productAddedSuccess', 'success');
    }
    setIsProductFormModalOpen(false);
  };

  const handleShowCart = () => {
    setIsCartModalOpen(true);
  };

  const handleCloseCart = () => {
    setIsCartModalOpen(false);
  };

  const handleAddToCart = (product: Product) => {
    // Check if there's enough stock
    const availableUnits = product.initialUnitsStock - product.unitsSold;
    const itemInCart = cart.find(item => item.product.id === product.id);
    const currentCartQuantity = itemInCart ? itemInCart.quantity : 0;

    if (currentCartQuantity >= availableUnits) {
      addToast('notEnoughStock', 'error', { productName: product.name[locale] || product.name.es, availableUnits });
      return;
    }

    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.product.id === product.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevCart, { product, quantity: 1 }];
      }
    });
    addToast('addedToCartSuccess', 'success', { productName: product.name[locale] || product.name.es });
  };

  const handleUpdateCartItemQuantity = (productId: number, newQuantity: number) => {
    setCart(prevCart => {
      // Check stock before updating quantity
      const productInStock = products.find(p => p.id === productId);
      const availableUnits = productInStock ? (productInStock.initialUnitsStock - productInStock.unitsSold) : 0;

      if (newQuantity > availableUnits) {
        addToast('notEnoughStockShort', 'error', { availableUnits });
        return prevCart; // Prevent updating if not enough stock
      }

      if (newQuantity <= 0) {
        return prevCart.filter(item => item.product.id !== productId);
      }
      return prevCart.map(item =>
        item.product.id === productId
          ? { ...item, quantity: newQuantity }
          : item
      );
    });
  };

  const handleRemoveFromCart = (productId: number) => {
    setCart(prevCart => prevCart.filter(item => item.product.id !== productId));
    addToast('removedFromCartSuccess', 'success');
  };

  const handlePurchase = (customerDetails: CustomerOrderDetails, paymentMethod: 'COD' | 'Online' | 'Nequi', sendWhatsApp: boolean, sendEmail: boolean) => {
    if (cart.length === 0) {
      addToast('cartEmptyError', 'error');
      return;
    }

    const total = cart.reduce((sum, item) => sum + item.product.sale * item.quantity, 0);
    const expectedDelivery = t('deliveryTime'); // Static expected delivery for now

    try {
      // Update product stock (unitsSold)
      setProducts(prevProducts =>
        prevProducts.map(product => {
          const cartItem = cart.find(item => item.product.id === product.id);
          if (cartItem) {
            return { ...product, unitsSold: product.unitsSold + cartItem.quantity };
          }
          return product;
        })
      );

      // Create new order
      const orderId = Date.now().toString(); // Generate unique ID for order
      const newOrder: Order = {
        id: orderId,
        date: new Date().toISOString().split('T')[0], // YYYY-MM-DD
        items: [...cart],
        totalAmount: total,
        paymentMethod: paymentMethod,
        expectedDelivery: expectedDelivery,
      };

      // Find existing customer or create new one
      setCustomers(prevCustomers => {
        let existingCustomer = prevCustomers.find(
          cust => cust.email === customerDetails.email || cust.phone === customerDetails.phone
        );

        if (existingCustomer) {
          // Update existing customer
          return prevCustomers.map(cust =>
            cust.id === existingCustomer?.id
              ? {
                  ...cust,
                  totalPurchases: cust.totalPurchases + total,
                  orders: [...cust.orders, newOrder],
                  status: 'returning', // Set status to returning
                }
              : cust
          );
        } else {
          // Create new customer
          const newCustomer: Customer = {
            id: Date.now(), // Simple unique ID for customer
            name: customerDetails.name,
            email: customerDetails.email,
            phone: customerDetails.phone,
            address: customerDetails.address,
            totalPurchases: total,
            orders: [newOrder],
            status: 'new', // Set status to new
          };
          return [...prevCustomers, newCustomer];
        }
      });

      // Generate tracking link and QR code image URL for the OrderConfirmationModal
      const orderTrackingLink = `https://your-store.com/track-order?id=${orderId}`; // Placeholder tracking URL
      const qrCodeImageUrl = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(orderTrackingLink)}`;

      // Prepare details for the OrderConfirmationModal
      const paymentMethodDisplay =
        paymentMethod === 'COD' ? t('codOptionLabel') :
        paymentMethod === 'Online' ? t('onlineOptionLabel') :
        t('nequiPaymentLabel');

      const orderConfirmationDetails: OrderConfirmationDetails = {
        orderId: orderId,
        customerName: customerDetails.name,
        customerPhone: customerDetails.phone,
        customerEmail: customerDetails.email,
        customerAddress: customerDetails.address,
        orderItems: [...cart], // Pass full cart items
        totalAmount: total,
        paymentMethod: paymentMethodDisplay,
        expectedDelivery: expectedDelivery,
        orderTrackingLink: orderTrackingLink,
        qrCodeImageUrl: qrCodeImageUrl,
      };

      setLastOrderDetails(orderConfirmationDetails);
      setIsOrderConfirmationModalOpen(true); // Open the new confirmation modal

      addToast('purchaseSuccessShort', 'success'); // Show a short toast for immediate feedback

      if (sendWhatsApp) {
        addToast('invoiceSentWhatsApp', 'info');
        // Here you would typically integrate with a WhatsApp API or generate a link
      }
      if (sendEmail) {
        addToast('invoiceSentEmail', 'info');
        // Here you would typically integrate with an email service
      }

      setCart([]); // Clear the cart
      setIsCartModalOpen(false); // Close the cart modal
    } catch (error) {
      console.error("Error during purchase:", error);
      addToast('purchaseErrorMessage', 'error');
    }
  };

  const handleCloseOrderConfirmationModal = () => {
    setIsOrderConfirmationModalOpen(false);
    setLastOrderDetails(null);
  };

  const handleShareOrder = async (details: OrderConfirmationDetails) => {
    const shareText = t('shareOrderText', {
      orderId: details.orderId,
      customerName: details.customerName,
      customerPhone: details.customerPhone,
      customerEmail: details.customerEmail,
      customerAddress: details.customerAddress,
      totalAmount: details.totalAmount.toFixed(2),
      paymentMethod: details.paymentMethod,
      expectedDelivery: details.expectedDelivery,
      orderTrackingLink: details.orderTrackingLink,
    });
    const shareSubject = t('shareOrderSubject');

    if (navigator.share) {
      try {
        await navigator.share({
          title: shareSubject,
          text: shareText,
          url: details.orderTrackingLink, // Can also share the tracking link
        });
      } catch (error) {
        console.error('Error sharing:', error);
        // Fallback for desktop or if user cancels share
        alert(`${shareSubject}\n\n${shareText}`);
      }
    } else {
      // Fallback for browsers that do not support Web Share API
      alert(`${shareSubject}\n\n${shareText}`);
    }
  };


  const cartItemCount = cart.reduce((count, item) => count + item.quantity, 0);

  // Functions for payment activation
  const handleShowPaymentActivation = () => {
    setIsPaymentActivationModalOpen(true);
  };

  const handleClosePaymentActivation = () => {
    setIsPaymentActivationModalOpen(false);
  };

  const handleSavePaymentSettings = (cod: boolean, online: boolean, nequi: boolean) => {
    setIsCODEnabled(cod);
    setIsOnlinePaymentEnabled(online);
    setIsNequiEnabled(nequi); // Save Nequi state
    addToast('paymentSettingsSaved', 'success');
    setIsPaymentActivationModalOpen(false);
  };

  // Functions for Customers List
  const handleShowCustomers = () => {
    setCurrentScreen(Screen.Customers);
  };

  // Functions for Customer Orders Modal
  const handleViewCustomerOrders = (customer: Customer) => {
    setSelectedCustomerForOrders(customer);
    setIsCustomerOrdersModalOpen(true);
  };

  const handleCloseCustomerOrdersModal = () => {
    setIsCustomerOrdersModalOpen(false);
    setSelectedCustomerForOrders(null);
  };


  return (
    <div className="container max-w-lg mx-auto bg-white min-h-screen shadow-lg">
      {currentScreen === Screen.Home && (
        <Home
          products={products}
          onShowSettings={handleShowSettings} // Pass new handler
          onShowCart={handleShowCart}
          onAddToCart={handleAddToCart}
          cartItemCount={cartItemCount}
        />
      )}
      {currentScreen === Screen.Admin && (
        <Admin
          products={products}
          onGoHome={handleGoHome} // Still goes home, but from admin
          onAddProduct={handleAddProduct}
          onEditProduct={handleEditProduct}
          onDeleteProduct={handleDeleteProduct}
          onShowPaymentActivation={handleShowPaymentActivation}
          onShowCustomers={handleShowCustomers} // Pass new handler
        />
      )}
      {currentScreen === Screen.Customers && ( // New Customers screen
        <Customers
          customers={customers}
          onGoHome={handleGoToAdmin} // Back button from customers goes to admin
          onViewOrders={handleViewCustomerOrders} // Pass new handler
        />
      )}

      {/* Settings Modal */}
      <SettingsModal
        isOpen={isSettingsModalOpen}
        onClose={handleCloseSettings}
        onAdminLogin={handleAdminLogin}
      />

      <ProductFormModal
        isOpen={isProductFormModalOpen}
        onClose={() => setIsProductFormModalOpen(false)}
        onSave={handleSaveProduct}
        editingProduct={editingProduct}
      />

      <PaymentActivationModal
        isOpen={isPaymentActivationModalOpen}
        onClose={handleClosePaymentActivation}
        currentCODState={isCODEnabled}
        currentOnlineState={isOnlinePaymentEnabled}
        currentNequiState={isNequiEnabled} // Pass Nequi state
        onSavePaymentSettings={handleSavePaymentSettings}
      />

      <CartModal
        isOpen={isCartModalOpen}
        onClose={handleCloseCart}
        cartItems={cart}
        onUpdateQuantity={handleUpdateCartItemQuantity}
        onRemoveItem={handleRemoveFromCart}
        onPurchase={handlePurchase}
        isCODEnabled={isCODEnabled} // Pass payment enablement state
        isOnlinePaymentEnabled={isOnlinePaymentEnabled} // Pass payment enablement state
        isNequiEnabled={isNequiEnabled} // Pass Nequi enablement state
      />

      {/* Customer Orders Modal */}
      {selectedCustomerForOrders && (
        <CustomerOrdersModal
          isOpen={isCustomerOrdersModalOpen}
          onClose={handleCloseCustomerOrdersModal}
          customer={selectedCustomerForOrders}
        />
      )}

      {/* Order Confirmation Modal (New) */}
      {isOrderConfirmationModalOpen && lastOrderDetails && (
        <OrderConfirmationModal
          isOpen={isOrderConfirmationModalOpen}
          onClose={handleCloseOrderConfirmationModal}
          orderDetails={lastOrderDetails}
          onShareOrder={handleShareOrder}
        />
      )}

      <Toast messages={toasts} onRemoveToast={removeToast} />
    </div>
  );
};

const App: React.FC = () => (
  <LocaleProvider>
    <AppContent />
  </LocaleProvider>
);

export default App;