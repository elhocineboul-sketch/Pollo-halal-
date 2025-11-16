import React, { useState, useEffect, useRef, useCallback, Suspense, lazy } from 'react';
import { Product, Screen, CartItem, ToastMessage, Locale, Customer, Order, CustomerOrderDetails, OrderConfirmationDetails, Offer, OfferType } from './types';
import Home from './screens/Home';
import Toast from './components/Toast';
import { LocaleProvider, useTranslation, useLocale } from './i18n/LocaleContext';
import { useProducts } from './useProducts';
import { serverTimestamp } from 'firebase/firestore';

// Lazy-load components that are not needed on initial render
const Admin = lazy(() => import('./screens/Admin'));
const Customers = lazy(() => import('./screens/Customers'));
const ProductFormModal = lazy(() => import('./components/ProductFormModal'));
const PaymentActivationModal = lazy(() => import('./components/PaymentActivationModal'));
const CartModal = lazy(() => import('./components/CartModal'));
const SettingsModal = lazy(() => import('./components/SettingsModal'));
const CustomerOrdersModal = lazy(() => import('./components/CustomerOrdersModal'));
const OrderConfirmationModal = lazy(() => import('./components/OrderConfirmationModal'));
const OfferManagementModal = lazy(() => import('./components/OfferManagementModal'));
const OfferFormModal = lazy(() => import('./components/OfferFormModal'));

// Dummy customers for initial state - Changed to empty array
const initialCustomers: Customer[] = [];

// Define low stock threshold
const LOW_STOCK_THRESHOLD = 10;

const AppContent: React.FC = () => {
  const t = useTranslation(); // Use translation hook
  const { locale } = useLocale(); // Use locale hook to get current locale

  // Use the new useProducts hook for product management
  const { products, loading: productsLoading, error: productsError, addProduct, updateProduct, deleteProduct } = useProducts();

  // Initialize customers from localStorage or use initialCustomers
  const [customers, setCustomers] = useState<Customer[]>(() => {
    try {
      const storedCustomers = localStorage.getItem('customers');
      return storedCustomers ? JSON.parse(storedCustomers) : initialCustomers;
    } catch (error) {
      console.error("Error loading customers from localStorage:", error);
      return initialCustomers;
    }
  });

  // Initialize offers from localStorage or use an empty array
  const [offers, setOffers] = useState<Offer[]>(() => {
    try {
      const storedOffers = localStorage.getItem('offers');
      let loadedOffers: Offer[] = storedOffers ? JSON.parse(storedOffers) : [];
      loadedOffers = loadedOffers.map(offer => {
        if ((offer.type as string) === 'TwoForOne') { 
          console.warn(`Migrating TwoForOne offer (id: ${offer.id}) to BuyXGetYFree (Buy 2 Get 1 Free).`);
          return {
            ...offer,
            type: OfferType.BuyXGetYFree,
            buyQuantity: 2,
            getFreeQuantity: 1,
            value: undefined,
          };
        }
        return offer;
      });
      return loadedOffers;
    } catch (error) {
      console.error("Error loading offers from localStorage:", error);
      return [];
    }
  });
  
  // Save customers to localStorage whenever the customers state changes
  useEffect(() => {
    try {
      localStorage.setItem('customers', JSON.stringify(customers));
    }
    catch (error) {
      console.error("Error saving customers to localStorage:", error);
    }
  }, [customers]);

  // Save offers to localStorage whenever the offers state changes
  useEffect(() => {
    try {
      localStorage.setItem('offers', JSON.stringify(offers));
    } catch (error) {
      console.error("Error saving offers to localStorage:", error);
    }
  }, [offers]);


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
  const alertedLowStockProductIds = useRef<Set<string>>(new Set());
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

  const addToast = useCallback((messageKey: string, type: 'success' | 'error' | 'info' = 'success', args?: Record<string, string | number>) => {
    const id = Date.now().toString();
    setToasts((prevToasts) => [...prevToasts, { id, message: t(messageKey, args), type }]);
  }, [t]);
  
  useEffect(() => {
    if (productsError) {
      addToast('Error loading products: ' + productsError, 'error');
    }
  }, [productsError, addToast]);


  const toggleDarkMode = useCallback(() => {
    setIsDarkMode(prevMode => !prevMode);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
  }, []);

  useEffect(() => {
    const currentLowStockIds = new Set<string>();
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
  }, [products, locale, addToast]);

  const handleShowSettings = useCallback(() => setIsSettingsModalOpen(true), []);
  const handleCloseSettings = useCallback(() => setIsSettingsModalOpen(false), []);
  const handleAdminLoginSuccess = useCallback(() => {
    setIsAdminLoggedIn(true);
    setCurrentScreen(Screen.Admin);
    setIsSettingsModalOpen(false);
  }, []);
  const handleGoToAdminPanel = useCallback(() => {
    setCurrentScreen(Screen.Admin);
    setIsSettingsModalOpen(false);
  }, []);
  const handleAdminLoginError = useCallback(() => {
    addToast('incorrectPasswordAlert', 'error');
  }, [addToast]);
  const handleAdminLogout = useCallback(() => {
    setIsAdminLoggedIn(false);
    setCurrentScreen(Screen.Home);
    addToast('loggedOutSuccess', 'info');
  }, [addToast]);
  const handleGoHome = useCallback(() => setCurrentScreen(Screen.Home), []);
  const handleGoToAdmin = useCallback(() => setCurrentScreen(Screen.Admin), []);
  const handleAddProduct = useCallback(() => {
    setEditingProduct(null);
    setIsProductFormModalOpen(true);
  }, []);
  const handleEditProduct = useCallback((id: string) => {
    const productToEdit = products.find(p => p.id === id);
    if (productToEdit) {
      setEditingProduct(productToEdit);
      setIsProductFormModalOpen(true);
    }
  }, [products]);
  const handleDeleteProduct = useCallback(async (id: string) => {
    if (window.confirm(t('confirmDeleteProduct'))) {
      try {
        const success = await deleteProduct(id);
        if (success) {
          const associatedOffer = offers.find(offer => offer.targetProductId === id);
          if (associatedOffer) {
            setOffers(prevOffers => prevOffers.filter(offer => offer.id !== associatedOffer.id));
          }
          addToast('productDeletedSuccess', 'success');
        } else {
          addToast('Error deleting product', 'error');
        }
      } catch (e) {
        addToast('Error deleting product: ' + e, 'error');
      }
    }
  }, [t, deleteProduct, offers, addToast]);
  const handleSaveProduct = useCallback(async (product: Omit<Product, 'createdAt'> & { id?: string }) => {
    try {
      if (product.id) {
        await updateProduct(product.id, product);
        addToast('productUpdatedSuccess', 'success');
      } else {
        // For new products, Firestore generates an ID, so we must not include our `undefined` id field.
        // We also need to remove any other fields that are undefined, as Firestore doesn't allow them.
        const { id, ...newProductData } = product;

        Object.keys(newProductData).forEach(key => {
          if ((newProductData as any)[key] === undefined) {
            delete (newProductData as any)[key];
          }
        });

        await addProduct({ ...newProductData, createdAt: serverTimestamp() });
        addToast('productAddedSuccess', 'success');
      }
      setIsProductFormModalOpen(false);
    } catch (e) {
      console.error("Error saving product:", e);
      addToast('Error saving product: ' + e, 'error');
    }
  }, [updateProduct, addProduct, addToast]);
  const handleShowCart = useCallback(() => setIsCartModalOpen(true), []);
  const handleCloseCart = useCallback(() => setIsCartModalOpen(false), []);
  const handleAddToCart = useCallback((product: Product) => {
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
  }, [cart, addToast, locale]);
  const handleUpdateCartItemQuantity = useCallback((productId: string, newQuantity: number) => {
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
  }, [products, addToast]);
  const handleRemoveFromCart = useCallback((productId: string) => {
    setCart(prevCart => prevCart.filter(item => item.product.id !== productId));
    addToast('removedFromCartSuccess', 'success');
  }, [addToast]);
  const handlePurchase = useCallback(async (customerDetails: CustomerOrderDetails, paymentMethod: 'COD' | 'Online' | 'Nequi', sendWhatsApp: boolean, sendEmail: boolean) => {
    if (cart.length === 0) {
      addToast('cartEmptyError', 'error');
      return;
    }
    const total = cart.reduce((sum, item) => {
      const offer = item.product.activeOfferId ? offers.find(o => o.id === item.product.activeOfferId && o.isActive) : undefined;
      let effectivePrice = item.product.sale;
      let effectiveQuantity = item.quantity;
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
      for (const cartItem of cart) {
        const product = products.find(p => p.id === cartItem.product.id);
        if (product) {
          await updateProduct(product.id, { unitsSold: product.unitsSold + cartItem.quantity });
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
      setCustomers(prevCustomers => {
        let existingCustomer = prevCustomers.find(
          cust => cust.email === customerDetails.email || cust.phone === customerDetails.phone
        );
        if (existingCustomer) {
          return prevCustomers.map(cust =>
            cust.id === existingCustomer?.id
              ? {
                  ...cust,
                  totalPurchases: cust.totalPurchases + total,
                  orders: [...cust.orders, newOrder],
                  status: 'returning',
                }
              : cust
          );
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
          return [...prevCustomers, newCustomer];
        }
      });
      const orderTrackingLink = `https://your-store.com/track-order?id=${orderId}`;
      const qrCodeImageUrl = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(orderTrackingLink)}`;
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
      if (sendWhatsApp) addToast('invoiceSentWhatsApp', 'info');
      if (sendEmail) addToast('invoiceSentEmail', 'info');
      setCart([]);
      setIsCartModalOpen(false);
    } catch (error) {
      console.error("Error during purchase:", error);
      addToast('purchaseErrorMessage', 'error');
    }
  }, [cart, t, offers, products, updateProduct, addToast]);
  const handleCloseOrderConfirmationModal = useCallback(() => {
    setIsOrderConfirmationModalOpen(false);
    setLastOrderDetails(null);
  }, []);
  const handleShareOrder = useCallback(async (details: OrderConfirmationDetails) => {
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
        alert(`${shareSubject}\n\n${shareText}`);
      }
    } else {
      alert(`${shareSubject}\n\n${shareText}`);
    }
  }, [t]);
  const cartItemCount = cart.reduce((count, item) => count + item.quantity, 0);
  const handleShowPaymentActivation = useCallback(() => setIsPaymentActivationModalOpen(true), []);
  const handleClosePaymentActivation = useCallback(() => setIsPaymentActivationModalOpen(false), []);
  const handleSavePaymentSettings = useCallback((cod: boolean, online: boolean, nequi: boolean) => {
    setIsCODEnabled(cod);
    setIsOnlinePaymentEnabled(online);
    setIsNequiEnabled(nequi);
    addToast('paymentSettingsSaved', 'success');
    setIsPaymentActivationModalOpen(false);
  }, [addToast]);
  const handleShowCustomers = useCallback(() => setCurrentScreen(Screen.Customers), []);
  const handleViewCustomerOrders = useCallback((customer: Customer) => {
    setSelectedCustomerForOrders(customer);
    setIsCustomerOrdersModalOpen(true);
  }, []);
  const handleCloseCustomerOrdersModal = useCallback(() => {
    setIsCustomerOrdersModalOpen(false);
    setSelectedCustomerForOrders(null);
  }, []);
  const handleShowOfferManagement = useCallback(() => setIsOfferManagementModalOpen(true), []);
  const handleCloseOfferManagement = useCallback(() => setIsOfferManagementModalOpen(false), []);
  const handleAddOffer = useCallback(() => {
    setEditingOffer(null);
    setIsOfferFormModalOpen(true);
  }, []);
  const handleEditOffer = useCallback((offerId: string) => {
    const offerToEdit = offers.find(o => o.id === offerId);
    if (offerToEdit) {
      setEditingOffer(offerToEdit);
      setIsOfferFormModalOpen(true);
    }
  }, [offers]);
  const handleSaveOffer = useCallback((offer: Offer) => {
    const existingOfferForProduct = offers.find(
      o => o.targetProductId === offer.targetProductId && o.id !== offer.id && o.isActive
    );
    if (offer.isActive && existingOfferForProduct) {
      addToast('productAlreadyHasOffer', 'error', { productName: products.find(p => p.id === offer.targetProductId)?.name[locale] || '' });
      return;
    }
    setOffers(prevOffers => {
      let updatedOffers;
      if (editingOffer) {
        updatedOffers = prevOffers.map(o => (o.id === offer.id ? offer : o));
        addToast('offerUpdatedSuccess', 'success');
      } else {
        updatedOffers = [...prevOffers, offer];
        addToast('offerAddedSuccess', 'success');
      }
      products.forEach(p => {
        if (p.id === offer.targetProductId) {
          if (offer.isActive && p.activeOfferId !== offer.id) {
            updateProduct(p.id, { activeOfferId: offer.id });
          } else if (!offer.isActive && p.activeOfferId === offer.id) {
            updateProduct(p.id, { activeOfferId: undefined });
          }
        } else if (p.activeOfferId === offer.id && !offer.isActive) {
          updateProduct(p.id, { activeOfferId: undefined });
        }
      });
      return updatedOffers;
    });
    setIsOfferFormModalOpen(false);
  }, [editingOffer, addToast, offers, locale, products, updateProduct]);
  const handleDeleteOffer = useCallback((offerId: string) => {
    if (window.confirm(t('confirmDeleteOffer'))) {
      setOffers(prevOffers => prevOffers.filter(o => o.id !== offerId));
      products.forEach(p => {
        if (p.activeOfferId === offerId) {
          updateProduct(p.id, { activeOfferId: undefined });
        }
      });
      addToast('offerDeletedSuccess', 'success');
    }
  }, [t, products, updateProduct, addToast]);
  const handleToggleOfferActive = useCallback((offerId: string) => {
    setOffers(prevOffers =>
      prevOffers.map(o => {
        if (o.id === offerId) {
          const newActiveState = !o.isActive;
          if (newActiveState) {
            const productWithExistingOffer = products.find(
              p => p.id === o.targetProductId && p.activeOfferId && p.activeOfferId !== o.id
            );
            if (productWithExistingOffer) {
              addToast('productAlreadyHasOtherActiveOffer', 'error', {
                productName: productWithExistingOffer.name[locale] || '',
              });
              return o;
            }
          }
          products.forEach(p => {
            if (p.id === o.targetProductId) {
              updateProduct(p.id, { activeOfferId: newActiveState ? o.id : undefined });
            } else if (p.activeOfferId === o.id && !newActiveState) {
              updateProduct(p.id, { activeOfferId: undefined });
            }
          });
          return { ...o, isActive: newActiveState };
        }
        return o;
      })
    );
  }, [addToast, locale, products, updateProduct]);

  const loadingFallback = (
    <div className="flex items-center justify-center min-h-screen text-xl font-bold dark:bg-gray-900 dark:text-white">
      {t('loading')}...
    </div>
  );

  if (productsLoading) {
    return loadingFallback;
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
      <Suspense fallback={loadingFallback}>
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

        {isSettingsModalOpen && (
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
        )}

        {isProductFormModalOpen && (
          <ProductFormModal
            isOpen={isProductFormModalOpen}
            onClose={() => setIsProductFormModalOpen(false)}
            onSave={handleSaveProduct}
            editingProduct={editingProduct}
          />
        )}
        
        {isPaymentActivationModalOpen && (
          <PaymentActivationModal
            isOpen={isPaymentActivationModalOpen}
            onClose={handleClosePaymentActivation}
            currentCODState={isCODEnabled}
            currentOnlineState={isOnlinePaymentEnabled}
            currentNequiState={isNequiEnabled}
            onSavePaymentSettings={handleSavePaymentSettings}
          />
        )}

        {isCartModalOpen && (
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
        )}
        
        {selectedCustomerForOrders && isCustomerOrdersModalOpen && (
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
        
        {isOfferManagementModalOpen && (
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
        )}
        
        {isOfferFormModalOpen && (
          <OfferFormModal
            isOpen={isOfferFormModalOpen}
            onClose={() => setIsOfferFormModalOpen(false)}
            onSave={handleSaveOffer}
            editingOffer={editingOffer}
            products={products}
            offers={offers}
          />
        )}
      </Suspense>

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
