🐾, [15/11/2025 07:23 p. m.]
import React, { useState, useEffect, useRef } from 'react';
import { Product, Screen, CartItem, ToastMessage, Locale, Customer, Order, CustomerOrderDetails, OrderConfirmationDetails, Offer, OfferType } from './types';
import Home from './screens/Home';
import Admin from './screens/Admin';
import ProductFormModal from './components/ProductFormModal';
import PaymentActivationModal from './components/PaymentActivationModal';
import CartModal from './components/CartModal';
import Toast from './components/Toast';
import SettingsModal from './components/SettingsModal';
import Customers from './screens/Customers';
import CustomerOrdersModal from './components/CustomerOrdersModal';
import OrderConfirmationModal from './components/OrderConfirmationModal';
import OfferManagementModal from './components/OfferManagementModal';
import OfferFormModal from './components/OfferFormModal';
import { LocaleProvider, useTranslation, useLocale } from './i18n/LocaleContext';

// ✨ استيراد خدمات Firebase
import {
  subscribeToProducts,
  addProduct as addProductToFirebase,
  updateProduct as updateProductInFirebase,
  deleteProduct as deleteProductFromFirebase,
  subscribeToCustomers,
  saveCustomer,
  subscribeToOffers,
  addOffer as addOfferToFirebase,
  updateOffer as updateOfferInFirebase,
  deleteOffer as deleteOfferFromFirebase,
} from './firebaseServices';

const LOW_STOCK_THRESHOLD = 10;

const AppContent: React.FC = () => {
  const t = useTranslation();
  const { locale } = useLocale();

  // ✨ استبدال localStorage بـ Firebase - المنتجات
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoadingProducts, setIsLoadingProducts] = useState(true);

  // ✨ استبدال localStorage بـ Firebase - العملاء
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [isLoadingCustomers, setIsLoadingCustomers] = useState(true);

  // ✨ استبدال localStorage بـ Firebase - العروض
  const [offers, setOffers] = useState<Offer[]>([]);
  const [isLoadingOffers, setIsLoadingOffers] = useState(true);

  // ✨ الاستماع للمنتجات في الوقت الفعلي
  useEffect(() => {
    const unsubscribe = subscribeToProducts((fetchedProducts) => {
      setProducts(fetchedProducts);
      setIsLoadingProducts(false);
    });

    return () => unsubscribe();
  }, []);

  // ✨ الاستماع للعملاء في الوقت الفعلي
  useEffect(() => {
    const unsubscribe = subscribeToCustomers((fetchedCustomers) => {
      setCustomers(fetchedCustomers);
      setIsLoadingCustomers(false);
    });

    return () => unsubscribe();
  }, []);

  // ✨ الاستماع للعروض في الوقت الفعلي
  useEffect(() => {
    const unsubscribe = subscribeToOffers((fetchedOffers) => {
      setOffers(fetchedOffers);
      setIsLoadingOffers(false);
    });

    return () => unsubscribe();
  }, []);

  const [currentScreen, setCurrentScreen] = useState<Screen>(Screen.Home);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  const [isProductFormModalOpen, setIsProductFormModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isPaymentActivationModalOpen, setIsPaymentActivationModalOpen] = useState(false);
  const [isCODEnabled, setIsCODEnabled] = useState(true);
  const [isOnlinePaymentEnabled, setIsOnlinePaymentEnabled] = useState(true);
  const [isNequiEnabled, setIsNequiEnabled] = useState(false);

  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartModalOpen, setIsCartModalOpen] = useState(false);

  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const [isCustomerOrdersModalOpen, setIsCustomerOrdersModalOpen] = useState(false);
  const [selectedCustomerForOrders, setSelectedCustomerForOrders] = useState<Customer | null>(null);

  const [isOrderConfirmationModalOpen, setIsOrderConfirmationModalOpen] = useState(false);
  const [lastOrderDetails, setLastOrderDetails] = useState<OrderConfirmationDetails | null>(null);

  const alertedLowStockProductIds = useRef<Set<number>>(new Set());

🐾, [15/11/2025 07:23 p. m.]
const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    try {
      const storedDarkMode = localStorage.getItem('isDarkMode');
      return storedDarkMode ? JSON.parse(storedDarkMode) : false;
    } catch (error) {
      console.error("Error loading dark mode preference from localStorage:", error);
      return false;
    }
  });

  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(() => {
    try {
      const storedAdminLogin = localStorage.getItem('isAdminLoggedIn');
      return storedAdminLogin ? JSON.parse(storedAdminLogin) : false;
    } catch (error) {
      console.error("Error loading admin login state from localStorage:", error);
      return false;
    }
  });

  const [isOfferManagementModalOpen, setIsOfferManagementModalOpen] = useState(false);
  const [isOfferFormModalOpen, setIsOfferFormModalOpen] = useState(false);
  const [editingOffer, setEditingOffer] = useState<Offer | null>(null);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    try {
      localStorage.setItem('isDarkMode', JSON.stringify(isDarkMode));
    } catch (error) {
      console.error("Error saving dark mode preference to localStorage:", error);
    }
  }, [isDarkMode]);

  useEffect(() => {
    try {
      localStorage.setItem('isAdminLoggedIn', JSON.stringify(isAdminLoggedIn));
    } catch (error) {
      console.error("Error saving admin login state to localStorage:", error);
    }
  }, [isAdminLoggedIn]);

  const toggleDarkMode = () => {
    setIsDarkMode(prevMode => !prevMode);
  };

  const addToast = (messageKey: string, type: 'success' | 'error' | 'info' = 'success', args?: Record<string, string | number>) => {
    const id = Date.now().toString();
    setToasts((prevToasts) => [...prevToasts, { id, message: t(messageKey, args), type }]);
  };

  const removeToast = (id: string) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
  };

  useEffect(() => {
    const currentLowStockIds = new Set<number>();

    products.forEach(product => {
      const unitsRemaining = product.initialUnitsStock - product.unitsSold;
      if (unitsRemaining <= LOW_STOCK_THRESHOLD) {
        currentLowStockIds.add(product.id);
        if (!alertedLowStockProductIds.current.has(product.id)) {
          addToast(
            'lowStockAlert',
            'info',
            {
              productName: product.name[locale] || product.name.es,
              unitsRemaining: unitsRemaining,
            }
          );
          alertedLowStockProductIds.current.add(product.id);
        }
      }
    });

    alertedLowStockProductIds.current.forEach(id => {
      if (!currentLowStockIds.has(id)) {
        alertedLowStockProductIds.current.delete(id);
      }
    });
  }, [products, locale, t]);

  const handleShowSettings = () => {
    setIsSettingsModalOpen(true);
  };

  const handleCloseSettings = () => {
    setIsSettingsModalOpen(false);
  };

  const handleAdminLoginSuccess = () => {
    setIsAdminLoggedIn(true);
    setCurrentScreen(Screen.Admin);
    setIsSettingsModalOpen(false);
  };

  const handleGoToAdminPanel = () => {
    setCurrentScreen(Screen.Admin);
    setIsSettingsModalOpen(false);
  };

  const handleAdminLoginError = () => {
    addToast('incorrectPasswordAlert', 'error');
  };

  const handleAdminLogout = () => {
    setIsAdminLoggedIn(false);
    setCurrentScreen(Screen.Home);
    addToast('loggedOutSuccess', 'info');
  };

  const handleGoHome = () => {
    setCurrentScreen(Screen.Home);
  };

  const handleGoToAdmin = () => {
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

🐾, [15/11/2025 07:23 p. m.]
// ✨ تعديل حذف المنتج لاستخدام Firebase
  const handleDeleteProduct = async (id: number) => {
    if (window.confirm(t('confirmDeleteProduct'))) {
      try {
        const associatedOffer = offers.find(offer => offer.targetProductId === id);
        if (associatedOffer) {
          await deleteOfferFromFirebase(associatedOffer.id);
        }
        await deleteProductFromFirebase(id);
        addToast('productDeletedSuccess', 'success');
      } catch (error) {
        console.error("Error deleting product:", error);
        addToast('errorDeletingProduct', 'error');
      }
    }
  };

  // ✨ تعديل حفظ المنتج لاستخدام Firebase
  const handleSaveProduct = async (product: Product) => {
    try {
      if (editingProduct) {
        await updateProductInFirebase(product.id, product);
        addToast('productUpdatedSuccess', 'success');
      } else {
        const newProductWithInventory = { ...product, unitsSold: 0, activeOfferId: undefined };
        await addProductToFirebase(newProductWithInventory);
        addToast('productAddedSuccess', 'success');
      }
      setIsProductFormModalOpen(false);
    } catch (error) {
      console.error("Error saving product:", error);
      addToast('errorSavingProduct', 'error');
    }
  };

  const handleShowCart = () => {
    setIsCartModalOpen(true);
  };

  const handleCloseCart = () => {
    setIsCartModalOpen(false);
  };

  const handleAddToCart = (product: Product) => {
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
      const productInStock = products.find(p => p.id === productId);
      const availableUnits = productInStock ? (productInStock.initialUnitsStock - productInStock.unitsSold) : 0;

      if (newQuantity > availableUnits) {
        addToast('notEnoughStockShort', 'error', { availableUnits });
        return prevCart;
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

  // ✨ تعديل عملية الشراء لاستخدام Firebase
  const handlePurchase = async (customerDetails: CustomerOrderDetails, paymentMethod: 'COD' | 'Online' | 'Nequi', sendWhatsApp: boolean, sendEmail: boolean) => {
    if (cart.length === 0) {
      addToast('cartEmptyError', 'error');
      return;
    }

    const total = cart.reduce((sum, item) => {
      const offer = item.product.activeOfferId ? offers.find(o => o.id === item.product.activeOfferId && o.isActive) : undefined;
      let effectivePrice = item.product.sale;
      let effectiveQuantity = item.quantity;

🐾, [15/11/2025 07:23 p. m.]
if (offer) {
        if (offer.type === OfferType.PercentageDiscount) {
          effectivePrice = item.product.sale * (1 - offer.value! / 100);
        } else if (offer.type === OfferType.FixedDiscount) {
          effectivePrice = Math.max(0, item.product.sale - offer.value!);
        } else if (offer.type === OfferType.BuyXGetYFree) {
          const buyX = offer.buyQuantity || 0;
          const getY = offer.getFreeQuantity || 0;

          if (buyX > 0 && getY >= 0) {
            effectiveQuantity = item.quantity - (Math.floor(item.quantity / (buyX + getY)) * getY);
          }
        }
      }
      return sum + effectivePrice * effectiveQuantity;
    }, 0);

    const expectedDelivery = t('deliveryTime');

    try {
      // ✨ تحديث المنتجات في Firebase
      for (const cartItem of cart) {
        const product = products.find(p => p.id === cartItem.product.id);
        if (product) {
          await updateProductInFirebase(product.id, {
            unitsSold: product.unitsSold + cartItem.quantity
          });
        }
      }

      const orderId = Date.now().toString();
      const newOrder: Order = {
        id: orderId,
        date: new Date().toISOString().split('T')[0],
        items: [...cart],
        totalAmount: total,
        paymentMethod: paymentMethod,
        expectedDelivery: expectedDelivery,
      };

      // ✨ حفظ العميل في Firebase
      let existingCustomer = customers.find(
        cust => cust.email === customerDetails.email || cust.phone === customerDetails.phone
      );

      if (existingCustomer) {
        const updatedCustomer = {
          ...existingCustomer,
          totalPurchases: existingCustomer.totalPurchases + total,
          orders: [...existingCustomer.orders, newOrder],
          status: 'returning' as const,
        };
        await saveCustomer(updatedCustomer);
      } else {
        const newCustomer: Customer = {
          id: Date.now(),
          name: customerDetails.name,
          email: customerDetails.email,
          phone: customerDetails.phone,
          address: customerDetails.address,
          totalPurchases: total,
          orders: [newOrder],
          status: 'new',
        };
        await saveCustomer(newCustomer);
      }

      const orderTrackingLink = https://your-store.com/track-order?id=${orderId};
      const qrCodeImageUrl = https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(orderTrackingLink)};

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
        orderItems: [...cart],
        totalAmount: total,
        paymentMethod: paymentMethodDisplay,
        expectedDelivery: expectedDelivery,
        orderTrackingLink: orderTrackingLink,
        qrCodeImageUrl: qrCodeImageUrl,
      };

      setLastOrderDetails(orderConfirmationDetails);
      setIsOrderConfirmationModalOpen(true);

      addToast('purchaseSuccessShort', 'success');

      if (sendWhatsApp) {
        addToast('invoiceSentWhatsApp', 'info');
      }
      if (sendEmail) {
        addToast('invoiceSentEmail', 'info');
      }

      setCart([]);
      setIsCartModalOpen(false);
    } catch (error) {
      console.error("Error during purchase:", error);
      addToast('purchaseErrorMessage', 'error');
    }
  };

  const handleCloseOrderConfirmationModal = () => {
    setIsOrderConfirmationModalOpen(false);
    setLastOrderDetails(null);
  };

🐾, [15/11/2025 07:23 p. m.]
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
          url: details.orderTrackingLink,
        });
      } catch (error) {
        console.error('Error sharing:', error);
        alert(${shareSubject}\n\n${shareText});
      }
    } else {
      alert(${shareSubject}\n\n${shareText});
    }
  };

  const cartItemCount = cart.reduce((count, item) => count + item.quantity, 0);

  const handleShowPaymentActivation = () => {
    setIsPaymentActivationModalOpen(true);
  };

  const handleClosePaymentActivation = () => {
    setIsPaymentActivationModalOpen(false);
  };

  const handleSavePaymentSettings = (cod: boolean, online: boolean, nequi: boolean) => {
    setIsCODEnabled(cod);
    setIsOnlinePaymentEnabled(online);
    setIsNequiEnabled(nequi);
    addToast('paymentSettingsSaved', 'success');
    setIsPaymentActivationModalOpen(false);
  };

  const handleShowCustomers = () => {
    setCurrentScreen(Screen.Customers);
  };

  const handleViewCustomerOrders = (customer: Customer) => {
    setSelectedCustomerForOrders(customer);
    setIsCustomerOrdersModalOpen(true);
  };

  const handleCloseCustomerOrdersModal = () => {
    setIsCustomerOrdersModalOpen(false);
    setSelectedCustomerForOrders(null);
  };

  const handleShowOfferManagement = () => {
    setIsOfferManagementModalOpen(true);
  };

  const handleCloseOfferManagement = () => {
    setIsOfferManagementModalOpen(false);
  };

  const handleAddOffer = () => {
    setEditingOffer(null);
    setIsOfferFormModalOpen(true);
  };

  const handleEditOffer = (offerId: string) => {
    const offerToEdit = offers.find(o => o.id === offerId);
    if (offerToEdit) {
      setEditingOffer(offerToEdit);
      setIsOfferFormModalOpen(true);
    }
  };

  // ✨ تعديل حفظ العرض لاستخدام Firebase
  const handleSaveOffer = async (offer: Offer) => {
    const existingOfferForProduct = offers.find(
      o => o.targetProductId === offer.targetProductId && o.id !== offer.id && o.isActive
    );

    if (offer.isActive && existingOfferForProduct) {
      addToast('productAlreadyHasOffer', 'error', { productName: products.find(p => p.id === offer.targetProductId)?.name[locale] || '' });
      return;
    }

    try {
      if (editingOffer) {
        await updateOfferInFirebase(offer.id, offer);
        addToast('offerUpdatedSuccess', 'success');
      } else {
        await addOfferToFirebase(offer);
        addToast('offerAddedSuccess', 'success');
      }

      const targetProduct = products.find(p => p.id === offer.targetProductId);
      if (targetProduct) {
        await updateProductInFirebase(targetProduct.id, {
          activeOfferId: offer.isActive ? offer.id : undefined
        });
      }

      setIsOfferFormModalOpen(false);
    } catch (error) {
      console.error("Error saving offer:", error);
      addToast('errorSavingOffer', 'error');
    }
  };

  // ✨ تعديل حذف العرض لاستخدام Firebase
  const handleDeleteOffer = async (offerId: string) => {
    if (window.confirm(t('confirmDeleteOffer'))) {
      try {
        await deleteOfferFromFirebase(offerId);
        
        const linkedProduct = products.find(p => p.activeOfferId === offerId);

🐾, [15/11/2025 07:23 p. m.]
if (linkedProduct) {
          await updateProductInFirebase(linkedProduct.id, { activeOfferId: undefined });
        }
        
        addToast('offerDeletedSuccess', 'success');
      } catch (error) {
        console.error("Error deleting offer:", error);
        addToast('errorDeletingOffer', 'error');
      }
    }
  };

  // ✨ تعديل تفعيل/إلغاء تفعيل العرض لاستخدام Firebase
  const handleToggleOfferActive = async (offerId: string) => {
    const offer = offers.find(o => o.id === offerId);
    if (!offer) return;

    const newActiveState = !offer.isActive;

    if (newActiveState) {
      const productWithExistingOffer = products.find(
        p => p.id === offer.targetProductId && p.activeOfferId && p.activeOfferId !== offer.id
      );
      if (productWithExistingOffer) {
        addToast('productAlreadyHasOtherActiveOffer', 'error', {
          productName: productWithExistingOffer.name[locale] || '',
        });
        return;
      }
    }

    try {
      await updateOfferInFirebase(offerId, { isActive: newActiveState });

      const targetProduct = products.find(p => p.id === offer.targetProductId);
      if (targetProduct) {
        await updateProductInFirebase(targetProduct.id, {
          activeOfferId: newActiveState ? offerId : undefined
        });
      }
    } catch (error) {
      console.error("Error toggling offer:", error);
      addToast('errorTogglingOffer', 'error');
    }
  };

  // عرض رسالة التحميل
  if (isLoadingProducts  isLoadingCustomers  isLoadingOffers) {
    return (
      <div className="container max-w-lg mx-auto bg-white min-h-screen shadow-lg dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-300">{t('loading') || 'Loading...'}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container max-w-lg mx-auto bg-white min-h-screen shadow-lg dark:bg-gray-900">
      {currentScreen === Screen.Home && (
        <Home
          products={products}
          onShowSettings={handleShowSettings}
          onShowCart={handleShowCart}
          onAddToCart={handleAddToCart}
          cartItemCount={cartItemCount}
          offers={offers}
        />
      )}
      {currentScreen === Screen.Admin && (
        <Admin
          products={products}
          onGoHome={handleGoHome}
          onAddProduct={handleAddProduct}
          onEditProduct={handleEditProduct}
          onDeleteProduct={handleDeleteProduct}
          onShowPaymentActivation={handleShowPaymentActivation}
          onShowCustomers={handleShowCustomers}
          onShowOfferManagement={handleShowOfferManagement}
          onAdminLogout={handleAdminLogout}
        />
      )}
      {currentScreen === Screen.Customers && (
        <Customers
          customers={customers}
          onGoHome={handleGoToAdmin}
          onViewOrders={handleViewCustomerOrders}
        />
      )}

      <SettingsModal
        isOpen={isSettingsModalOpen}
        onClose={handleCloseSettings}
        onAdminLoginSuccess={handleAdminLoginSuccess}
        onGoToAdminPanel={handleGoToAdminPanel}
        isAdminLoggedIn={isAdminLoggedIn}
        isDarkMode={isDarkMode}
        onToggleDarkMode={toggleDarkMode}
        onLoginError={handleAdminLoginError}
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
        currentNequiState={isNequiEnabled}
        onSavePaymentSettings={handleSavePaymentSettings}
      />

🐾, [15/11/2025 07:23 p. m.]
<CartModal
        isOpen={isCartModalOpen}
        onClose={handleCloseCart}
        cartItems={cart}
        onUpdateQuantity={handleUpdateCartItemQuantity}
        onRemoveItem={handleRemoveFromCart}
        onPurchase={handlePurchase}
        isCODEnabled={isCODEnabled}
        isOnlinePaymentEnabled={isOnlinePaymentEnabled}
        isNequiEnabled={isNequiEnabled}
        offers={offers}
      />

      {selectedCustomerForOrders && (
        <CustomerOrdersModal
          isOpen={isCustomerOrdersModalOpen}
          onClose={handleCloseCustomerOrdersModal}
          customer={selectedCustomerForOrders}
        />
      )}

      {isOrderConfirmationModalOpen && lastOrderDetails && (
        <OrderConfirmationModal
          isOpen={isOrderConfirmationModalOpen}
          onClose={handleCloseOrderConfirmationModal}
          orderDetails={lastOrderDetails}
          onShareOrder={handleShareOrder}
        />
      )}

      <OfferManagementModal
        isOpen={isOfferManagementModalOpen}
        onClose={handleCloseOfferManagement}
        offers={offers}
        products={products}
        onAddOffer={handleAddOffer}
        onEditOffer={handleEditOffer}
        onDeleteOffer={handleDeleteOffer}
        onToggleOfferActive={handleToggleOfferActive}
      />

      <OfferFormModal
        isOpen={isOfferFormModalOpen}
        onClose={() => setIsOfferFormModalOpen(false)}
        onSave={handleSaveOffer}
        editingOffer={editingOffer}
        products={products}
        offers={offers}
      />

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
