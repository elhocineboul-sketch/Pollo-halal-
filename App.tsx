import React, { useState, useEffect, useRef } from 'react';
import { Product, Screen, CartItem, ToastMessage, Locale, Customer, Order, CustomerOrderDetails, OrderConfirmationDetails, Offer, OfferType } from './types';
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
import OfferManagementModal from './components/OfferManagementModal'; // Import new OfferManagementModal
import OfferFormModal from './components/OfferFormModal'; // Import new OfferFormModal
import { LocaleProvider, useTranslation, useLocale } from './i18n/LocaleContext'; // Import LocaleProvider and hooks
import { useProducts } from './useProducts'; // Import the new useProducts hook
import { serverTimestamp } from 'firebase/firestore'; // Import serverTimestamp

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

      // Migration: Convert old TwoForOne offers to BuyXGetYFree
      // Replaced OfferType.TwoForOne with its string literal to resolve TypeScript error.
      // Casting offer.type to 'string' allows comparison with the literal 'TwoForOne' for migration.
      loadedOffers = loadedOffers.map(offer => {
        if ((offer.type as string) === 'TwoForOne') { 
          console.warn(`Migrating TwoForOne offer (id: ${offer.id}) to BuyXGetYFree (Buy 2 Get 1 Free).`);
          return {
            ...offer,
            type: OfferType.BuyXGetYFree,
            buyQuantity: 2,
            getFreeQuantity: 1,
            value: undefined, // Remove old 'value' property as it's not applicable
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

  // Ref to keep track of products for which a low stock alert has been shown
  const alertedLowStockProductIds = useRef<Set<string>>(new Set()); // Changed to string

  // Dark Mode state
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    try {
      const storedDarkMode = localStorage.getItem('isDarkMode');
      return storedDarkMode ? JSON.parse(storedDarkMode) : false; // Default to light mode
    } catch (error) {
      console.error("Error loading dark mode preference from localStorage:", error);
      return false;
    }
  });

  // Admin Login State: Keeps track if an admin is logged in
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(() => {
    try {
      const storedAdminLogin = localStorage.getItem('isAdminLoggedIn');
      return storedAdminLogin ? JSON.parse(storedAdminLogin) : false;
    } catch (error) {
      console.error("Error loading admin login state from localStorage:", error);
      return false;
    }
  });

  // Offer Management States
  const [isOfferManagementModalOpen, setIsOfferManagementModalOpen] = useState(false);
  const [isOfferFormModalOpen, setIsOfferFormModalOpen] = useState(false);
  const [editingOffer, setEditingOffer] = useState<Offer | null>(null);


  // Effect to apply/remove 'dark' class to html element and persist dark mode preference
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

  // Effect to persist admin login state
  useEffect(() => {
    try {
      localStorage.setItem('isAdminLoggedIn', JSON.stringify(isAdminLoggedIn));
    } catch (error) {
      console.error("Error saving admin login state to localStorage:", error);
    }
  }, [isAdminLoggedIn]);

  // Effect to handle products loading/error from Firebase
  useEffect(() => {
    if (productsError) {
      addToast('Error loading products: ' + productsError, 'error');
    }
  }, [productsError]);


  const toggleDarkMode = () => {
    setIsDarkMode(prevMode => !prevMode);
  };


  const addToast = (messageKey: string, type: 'success' | 'error' | 'info' = 'success', args?: Record<string, string | number>) => {
    const id = Date.now().toString(); // Simple unique ID
    setToasts((prevToasts) => [...prevToasts, { id, message: t(messageKey, args), type }]);
  };

  const removeToast = (id: string) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
  };

  // Effect to check for low stock products and display toasts
  useEffect(() => {
    const currentLowStockIds = new Set<string>(); // Changed to string

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

    // Remove product IDs from the alerted set if their stock has recovered
    alertedLowStockProductIds.current.forEach(id => {
      if (!currentLowStockIds.has(id)) {
        alertedLowStockProductIds.current.delete(id);
      }
    });
  }, [products, locale, t]); // Depend on products, locale, and t for re-evaluation


  const handleShowSettings = () => { // Renamed from handleShowLogin
    setIsSettingsModalOpen(true);
  };

  const handleCloseSettings = () => { // New handler for SettingsModal
    setIsSettingsModalOpen(false);
  };

  const handleAdminLoginSuccess = () => { // Renamed to clearly indicate success
    setIsAdminLoggedIn(true); // Set admin logged in state
    setCurrentScreen(Screen.Admin);
    setIsSettingsModalOpen(false); // Close main settings modal after successful login
  };

  const handleGoToAdminPanel = () => { // New handler for direct admin panel access when already logged in
    setCurrentScreen(Screen.Admin);
    setIsSettingsModalOpen(false); // Close settings modal
  };

  const handleAdminLoginError = () => {
    addToast('incorrectPasswordAlert', 'error');
  };

  const handleAdminLogout = () => {
    setIsAdminLoggedIn(false); // Clear admin logged in state
    setCurrentScreen(Screen.Home); // Redirects to home page, effectively logging out of admin
    addToast('loggedOutSuccess', 'info');
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

  const handleEditProduct = (id: string) => { // Changed id to string
    const productToEdit = products.find(p => p.id === id);
    if (productToEdit) {
      setEditingProduct(productToEdit);
      setIsProductFormModalOpen(true);
    }
  };

  const handleDeleteProduct = async (id: string) => { // Changed id to string
    if (window.confirm(t('confirmDeleteProduct'))) {
      try {
        const success = await deleteProduct(id);
        if (success) {
          // First, check if the product has an active offer. If so, delete the offer too.
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
  };

  const handleSaveProduct = async (product: Omit<Product, 'createdAt'> & { id?: string }) => { // product might not have an ID yet, omit createdAt here
    try {
      if (product.id) { // Editing existing product
        await updateProduct(product.id, product); // Assuming updateProduct handles Partial<Product> or full Product
        addToast('productUpdatedSuccess', 'success');
      } else { // Adding new product
        await addProduct({ ...product, createdAt: serverTimestamp() }); // Firebase will generate ID and set createdAt
        addToast('productAddedSuccess', 'success');
      }
      setIsProductFormModalOpen(false);
    } catch (e) {
      addToast('Error saving product: ' + e, 'error');
    }
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

  const handleUpdateCartItemQuantity = (productId: string, newQuantity: number) => { // Changed productId to string
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

  const handleRemoveFromCart = (productId: string) => { // Changed productId to string
    setCart(prevCart => prevCart.filter(item => item.product.id !== productId));
    addToast('removedFromCartSuccess', 'success');
  };

  const handlePurchase = async (customerDetails: CustomerOrderDetails, paymentMethod: 'COD' | 'Online' | 'Nequi', sendWhatsApp: boolean, sendEmail: boolean) => {
    if (cart.length === 0) {
      addToast('cartEmptyError', 'error');
      return;
    }

    // Calculate total with offers applied
    const total = cart.reduce((sum, item) => {
      const offer = item.product.activeOfferId ? offers.find(o => o.id === item.product.activeOfferId && o.isActive) : undefined;
      let effectivePrice = item.product.sale;
      let effectiveQuantity = item.quantity;

      if (offer) {
        if (offer.type === OfferType.PercentageDiscount) {
          effectivePrice = item.product.sale * (1 - offer.value! / 100);
        } else if (offer.type === OfferType.FixedDiscount) {
          effectivePrice = Math.max(0, item.product.sale - offer.value!); // Price won't go below 0
        } else if (offer.type === OfferType.BuyXGetYFree) {
          const buyX = offer.buyQuantity || 0; // Default to 0 to prevent division by zero
          const getY = offer.getFreeQuantity || 0;

          if (buyX > 0 && getY >= 0) {
            // Calculate paid quantity: total quantity - (number of bundles * free items per bundle)
            // Example: Buy 2 Get 1 Free (X=2, Y=1). Bundle size = X+Y = 3. Customer pays for X=2 items per bundle.
            // If item.quantity = 3, floor(3/3) = 1 bundle. 1*Y=1 free. Effective quantity = 3-1 = 2.
            // If item.quantity = 5, floor(5/3) = 1 bundle. 1*Y=1 free. Effective quantity = 5-1 = 4.
            // If item.quantity = 6, floor(6/3) = 2 bundles. 2*Y=2 free. Effective quantity = 6-2 = 4.
            effectiveQuantity = item.quantity - (Math.floor(item.quantity / (buyX + getY)) * getY);
          }
        }
      }
      return sum + effectivePrice * effectiveQuantity;
    }, 0);


    const expectedDelivery = t('deliveryTime'); // Static expected delivery for now

    try {
      // Update product stock (unitsSold) using updateProduct from the hook
      // Remove the direct setProducts call and rely on the useProducts hook's updateProduct
      // which will trigger the Firestore listener and update the products state.
      for (const cartItem of cart) {
        const product = products.find(p => p.id === cartItem.product.id);
        if (product) {
          await updateProduct(product.id, { unitsSold: product.unitsSold + cartItem.quantity }); // Update stock in Firestore
        }
      }

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

  // Offer Management Handlers
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

  const handleSaveOffer = (offer: Offer) => {
    // Check if the target product already has an active offer (unless it's the current offer being edited)
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

      // Update products to link/unlink the offer
      // This part now directly interacts with the products state managed by useProducts
      // We will create a temporary array for products to reflect the change visually
      // and then update the specific product in Firestore.
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
  };

  const handleDeleteOffer = (offerId: string) => {
    if (window.confirm(t('confirmDeleteOffer'))) {
      setOffers(prevOffers => prevOffers.filter(o => o.id !== offerId));
      // Unlink offer from product in Firestore
      products.forEach(p => {
        if (p.activeOfferId === offerId) {
          updateProduct(p.id, { activeOfferId: undefined });
        }
      });
      addToast('offerDeletedSuccess', 'success');
    }
  };

  const handleToggleOfferActive = (offerId: string) => {
    setOffers(prevOffers =>
      prevOffers.map(o => {
        if (o.id === offerId) {
          const newActiveState = !o.isActive;

          // If activating, check for conflicts
          if (newActiveState) {
            const productWithExistingOffer = products.find(
              p => p.id === o.targetProductId && p.activeOfferId && p.activeOfferId !== o.id
            );
            if (productWithExistingOffer) {
              addToast('productAlreadyHasOtherActiveOffer', 'error', {
                productName: productWithExistingOffer.name[locale] || '',
              });
              return o; // Do not activate this offer
            }
          }

          // Update product link in Firestore based on new offer state
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
  };

  if (productsLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen text-xl font-bold dark:bg-gray-900 dark:text-white">
        {t('loading')}...
      </div>
    );
  }

  return (
    <div className="container max-w-lg mx-auto bg-white min-h-screen shadow-lg dark:bg-gray-900">
      {currentScreen === Screen.Home && (
        <Home
          products={products}
          onShowSettings={handleShowSettings} // Pass new handler
          onShowCart={handleShowCart}
          onAddToCart={handleAddToCart}
          cartItemCount={cartItemCount}
          offers={offers} // Pass offers to Home
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
          onShowOfferManagement={handleShowOfferManagement} // New: pass handler for offer management
          onAdminLogout={handleAdminLogout} // Pass new logout handler
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
        onAdminLoginSuccess={handleAdminLoginSuccess} // Use new success handler
        onGoToAdminPanel={handleGoToAdminPanel} // Pass handler for direct admin panel access
        isAdminLoggedIn={isAdminLoggedIn} // Pass admin login state
        isDarkMode={isDarkMode} // Pass dark mode state
        onToggleDarkMode={toggleDarkMode} // Pass dark mode toggle function
        onLoginError={handleAdminLoginError} // Prop to pass the error handler
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
        offers={offers} // Pass offers to CartModal
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

      {/* Offer Management Modals */}
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
        offers={offers} // Pass offers to check for conflicts
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