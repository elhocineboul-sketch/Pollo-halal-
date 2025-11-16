import React, { useState, useEffect } from 'react'; // Import useState and useEffect
import Modal from './Modal';
import Button from './Button';
import { CartItem, CustomerOrderDetails, Offer, OfferType } from '../types'; // Import CustomerOrderDetails, Offer, OfferType
import { useTranslation, useLocale } from '../i18n/LocaleContext';

export interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (productId: string, newQuantity: number) => void; // Changed productId to string
  onRemoveItem: (productId: string) => void; // Changed productId to string
  onPurchase: (customerDetails: CustomerOrderDetails, paymentMethod: 'COD' | 'Online' | 'Nequi', sendWhatsApp: boolean, sendEmail: boolean) => void; // Updated signature
  isCODEnabled: boolean; // New prop
  isOnlinePaymentEnabled: boolean; // New prop
  isNequiEnabled: boolean; // New prop for Nequi
  offers: Offer[]; // New prop for offers
}

const CartModal: React.FC<CartModalProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onPurchase,
  isCODEnabled, // Destructure new prop
  isOnlinePaymentEnabled, // Destructure new prop
  isNequiEnabled, // Destructure new prop
  offers, // Destructure new prop
}) => {
  const t = useTranslation();
  const { locale } = useLocale(); // Get current locale

  // Calculate total amount dynamically considering offers
  const totalAmount = cartItems.reduce((sum, item) => {
    const activeOffer = item.product.activeOfferId
      ? offers.find(o => o.id === item.product.activeOfferId && o.isActive)
      : undefined;

    let effectivePrice = item.product.sale;
    let effectiveQuantity = item.quantity;

    if (activeOffer) {
      if (activeOffer.type === OfferType.PercentageDiscount) {
        effectivePrice = item.product.sale * (1 - activeOffer.value! / 100);
      } else if (activeOffer.type === OfferType.FixedDiscount) {
        effectivePrice = Math.max(0, item.product.sale - activeOffer.value!);
      } else if (activeOffer.type === OfferType.BuyXGetYFree) {
        const buyX = activeOffer.buyQuantity || 0;
        const getY = activeOffer.getFreeQuantity || 0;
        if (buyX > 0 && getY >= 0) {
          // Calculate paid quantity: total quantity - (number of bundles * free items per bundle)
          effectiveQuantity = item.quantity - (Math.floor(item.quantity / (buyX + getY)) * getY);
        }
      }
    }
    return sum + effectivePrice * effectiveQuantity;
  }, 0);


  const [sendInvoiceWhatsApp, setSendInvoiceWhatsApp] = useState(false);
  const [sendInvoiceEmail, setSendInvoiceEmail] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<'COD' | 'Online' | 'Nequi' | null>(null); // Updated state for payment method

  // Multi-step form state
  const [currentStep, setCurrentStep] = useState<1 | 2>(1); // 1: Cart + Customer Info, 2: Confirmation

  // Customer details state
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');

  useEffect(() => {
    // Reset all states when modal closes or opens
    if (!isOpen) {
      setSendInvoiceWhatsApp(false);
      setSendInvoiceEmail(false);
      setCurrentStep(1); // Reset to first step
      setCustomerName('');
      setCustomerPhone('');
      setCustomerEmail('');
      setCustomerAddress('');
      setSelectedPaymentMethod(null); // Reset payment method
    } else {
      // Auto-select payment method if only one is enabled
      const enabledMethods = [
        isCODEnabled && 'COD',
        isOnlinePaymentEnabled && 'Online',
        isNequiEnabled && 'Nequi'
      ].filter(Boolean); // Filter out false/null values

      if (enabledMethods.length === 1) {
        setSelectedPaymentMethod(enabledMethods[0] as 'COD' | 'Online' | 'Nequi');
      } else {
        setSelectedPaymentMethod(null); // No auto-selection if multiple or none are enabled
      }
    }
  }, [isOpen, isCODEnabled, isOnlinePaymentEnabled, isNequiEnabled]);

  const handleProceedToOrder = () => {
    if (!customerName || !customerPhone || !customerEmail || !customerAddress) {
      alert(t('fillCustomerInfoError'));
      return;
    }
    if (!selectedPaymentMethod) {
      alert(t('paymentMethodRequiredError'));
      return;
    }
    setCurrentStep(2); // Move to confirmation step
  };

  const handleConfirmFinalOrder = () => {
    if (!selectedPaymentMethod) {
      // This should ideally be caught by handleProceedToOrder, but as a safeguard
      alert(t('paymentMethodRequiredError'));
      return;
    }
    const customerDetails: CustomerOrderDetails = {
      name: customerName,
      phone: customerPhone,
      email: customerEmail,
      address: customerAddress,
    };
    onPurchase(customerDetails, selectedPaymentMethod, sendInvoiceWhatsApp, sendInvoiceEmail);
  };

  const renderCartItems = () => (
    <div className="space-y-4 mb-5 max-h-60 overflow-y-auto pr-2"> {/* Added pr-2 for scrollbar spacing */}
      {cartItems.map((item) => {
        const activeOffer = item.product.activeOfferId
          ? offers.find(o => o.id === item.product.activeOfferId && o.isActive)
          : undefined;

        let itemPriceDisplay = item.product.sale.toFixed(2);
        let offerText = null;

        if (activeOffer) {
          if (activeOffer.type === OfferType.PercentageDiscount) {
            const discountedPrice = item.product.sale * (1 - activeOffer.value! / 100);
            itemPriceDisplay = `${discountedPrice.toFixed(2)}`;
            offerText = t('discountApplied', { value: activeOffer.value, unit: '%' });
          } else if (activeOffer.type === OfferType.FixedDiscount) {
            const discountedPrice = Math.max(0, item.product.sale - activeOffer.value!);
            itemPriceDisplay = `${discountedPrice.toFixed(2)}`;
            offerText = t('discountApplied', { value: activeOffer.value!.toFixed(2), unit: '$' });
          } else if (activeOffer.type === OfferType.BuyXGetYFree) {
            // Price is still per unit, but quantity for total calculation is different
            itemPriceDisplay = item.product.sale.toFixed(2); // Display original price per unit
            offerText = t('buyXGetYFreeApplied', { buyQuantity: activeOffer.buyQuantity, getFreeQuantity: activeOffer.getFreeQuantity });
          }
        }

        return (
          <div key={item.product.id} className="flex items-center gap-3 bg-gray-50 p-3 rounded-xl shadow-sm dark:bg-gray-700">
            <img src={item.product.img} alt={item.product.name[locale] || item.product.name.es} className="w-16 h-16 object-contain rounded-lg" />
            <div className="flex-1 text-end">
              <div className="font-bold text-sm dark:text-white">{item.product.name[locale] || item.product.name.es || item.product.name.en || 'N/A'}</div>
              <div className="text-gray-600 text-xs dark:text-gray-400">
                {activeOffer && activeOffer.type !== OfferType.BuyXGetYFree && (
                  <span className="line-through mr-1">${item.product.sale.toFixed(2)}</span>
                )}
                ${itemPriceDisplay} {t('perPieceUnit')}
                {offerText && <div className="text-emerald-600 text-xs font-medium dark:text-emerald-400">{offerText}</div>}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                className="bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-lg leading-none pb-0.5"
                aria-label={t('decreaseQuantityAria', { productName: item.product.name[locale] || item.product.name.es })}
              >
                -
              </button>
              <span className="font-bold text-base dark:text-white">{item.quantity}</span>
              <button
                onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                className="bg-emerald-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-lg leading-none pb-0.5"
                aria-label={t('increaseQuantityAria', { productName: item.product.name[locale] || item.product.name.es })}
              >
                +
              </button>
              <button
                onClick={() => onRemoveItem(item.product.id)}
                className="bg-gray-200 text-gray-700 rounded-full w-6 h-6 flex items-center justify-center text-lg leading-none pb-0.5 dark:bg-gray-600 dark:text-gray-200"
                aria-label={t('removeItemAria', { productName: item.product.name[locale] || item.product.name.es })}
              >
                🗑️
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );

  const renderTotalAmount = () => (
    <div className="flex justify-between items-center bg-amber-100 p-4 rounded-xl mb-5 shadow-inner dark:bg-amber-900 dark:text-white">
      <span className="text-lg font-bold">{t('totalAmountLabel')}</span>
      <span className="text-xl font-extrabold text-amber-700 dark:text-amber-200">${totalAmount.toFixed(2)}</span>
    </div>
  );

  const renderInvoiceOptions = () => (
    <>
      <p className="text-gray-700 text-base mb-3 text-center font-medium dark:text-gray-300">{t('invoiceOptionsLabel')}</p>
      <div className="flex items-center justify-between mb-2">
        <label htmlFor="whatsappInvoice" className="text-gray-800 text-base font-medium cursor-pointer dark:text-white">
          {t('sendInvoiceWhatsApp')}
        </label>
        <input
          type="checkbox"
          id="whatsappInvoice"
          className="sr-only peer"
          checked={sendInvoiceWhatsApp}
          onChange={(e) => setSendInvoiceWhatsApp(e.target.checked)}
          aria-checked={sendInvoiceWhatsApp}
          role="switch"
        />
        <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:right-[2px] after:bg-white after:border after:border-gray-300 after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500 cursor-pointer dark:bg-gray-600" aria-hidden="true"></div>
      </div>
      <div className="flex items-center justify-between mb-5 pb-4 border-b border-gray-200 dark:border-gray-700">
        <label htmlFor="emailInvoice" className="text-gray-800 text-base font-medium cursor-pointer dark:text-white">
          {t('sendInvoiceEmail')}
        </label>
        <input
          type="checkbox"
          id="emailInvoice"
          className="sr-only peer"
          checked={sendInvoiceEmail}
          onChange={(e) => setSendInvoiceEmail(e.target.checked)}
          aria-checked={sendInvoiceEmail}
          role="switch"
        />
        <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:right-[2px] after:bg-white after:border after:border-gray-300 after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500 cursor-pointer dark:bg-gray-600" aria-hidden="true"></div>
      </div>
    </>
  );

  const renderPaymentMethodSelection = () => (
    <>
      <h3 className="text-lg font-bold text-center mb-4 mt-6 dark:text-white">{t('selectPaymentMethodTitle')}</h3>
      <div className="space-y-3 mb-5">
        {isCODEnabled && (
          <label className="flex items-center p-3 bg-gray-100 rounded-xl cursor-pointer dark:bg-gray-700">
            <input
              type="radio"
              name="paymentMethod"
              value="COD"
              checked={selectedPaymentMethod === 'COD'}
              onChange={() => setSelectedPaymentMethod('COD')}
              className="form-radio text-amber-500 h-5 w-5"
              aria-label={t('codOptionLabel')}
            />
            <span className="ml-3 text-base font-medium text-gray-800 dark:text-white">{t('codOptionLabel')}</span>
          </label>
        )}
        {isOnlinePaymentEnabled && (
          <label className="flex items-center p-3 bg-gray-100 rounded-xl cursor-pointer dark:bg-gray-700">
            <input
              type="radio"
              name="paymentMethod"
              value="Online"
              checked={selectedPaymentMethod === 'Online'}
              onChange={() => setSelectedPaymentMethod('Online')}
              className="form-radio text-amber-500 h-5 w-5"
              aria-label={t('onlineOptionLabel')}
            />
            <span className="ml-3 text-base font-medium text-gray-800 dark:text-white">{t('onlineOptionLabel')}</span>
          </label>
        )}
        {isNequiEnabled && ( // New Nequi payment option
          <label className="flex items-center p-3 bg-gray-100 rounded-xl cursor-pointer dark:bg-gray-700">
            <input
              type="radio"
              name="paymentMethod"
              value="Nequi"
              checked={selectedPaymentMethod === 'Nequi'}
              onChange={() => setSelectedPaymentMethod('Nequi')}
              className="form-radio text-amber-500 h-5 w-5"
              aria-label={t('nequiPaymentLabel')}
            />
            <span className="ml-3 text-base font-medium text-gray-800 dark:text-white">{t('nequiPaymentLabel')}</span>
          </label>
        )}
      </div>

      {selectedPaymentMethod === 'Nequi' && ( // Display Nequi instructions if selected
        <div className="bg-gray-100 p-4 rounded-xl text-start mt-4 mb-5 shadow-inner dark:bg-gray-700 dark:text-gray-200">
          <h4 className="text-lg font-bold mb-3 text-center dark:text-white">{t('nequiInstructionsTitle')}</h4>
          <p className="text-gray-700 mb-2 dark:text-gray-300">{t('nequiStep1')}</p>
          <p className="text-gray-700 mb-2 dark:text-gray-300">{t('nequiStep2')}</p>
          <p className="text-gray-700 mb-2 dark:text-gray-300">{t('nequiStep3')}</p>
          <p className="text-gray-700 mb-4 dark:text-gray-300">{t('nequiStep4')}</p>
          <div className="flex justify-center">
            <img
              src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://www.nequi.com/" // Placeholder QR
              alt={t('nequiQrCodeAria')}
              className="w-36 h-36 p-2 bg-white rounded-lg shadow-md border border-gray-200 dark:bg-gray-600 dark:border-gray-500"
            />
          </div>
        </div>
      )}
    </>
  );

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={t('cartTitle')}>
      {cartItems.length === 0 ? (
        <p className="text-center text-gray-500 mb-5 dark:text-gray-400">{t('cartEmptyMessage')}</p>
      ) : (
        <>
          {currentStep === 1 && ( // Step 1: Cart Review + Customer Info Input
            <>
              {renderCartItems()}
              {renderTotalAmount()}
              {renderInvoiceOptions()}
              {renderPaymentMethodSelection()} {/* New payment method selection */}

              {/* Customer Information Input */}
              <h3 className="text-lg font-bold text-center mb-4 mt-6 dark:text-white">{t('customerInfoTitle')}</h3>
              <input
                type="text"
                className="w-full p-3 rounded-xl border-none bg-gray-100 mb-3 text-base text-end dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
                placeholder={t('customerNamePlaceholder')}
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
              />
              <input
                type="tel" // Use type="tel" for phone numbers
                className="w-full p-3 rounded-xl border-none bg-gray-100 mb-3 text-base text-end dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
                placeholder={t('customerPhonePlaceholder')}
                value={customerPhone}
                onChange={(e) => setCustomerPhone(e.target.value)}
              />
              <input
                type="email" // Use type="email" for email addresses
                className="w-full p-3 rounded-xl border-none bg-gray-100 mb-3 text-base text-end dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
                placeholder={t('customerEmailPlaceholder')}
                value={customerEmail}
                onChange={(e) => setCustomerEmail(e.target.value)}
              />
              <input
                type="text"
                className="w-full p-3 rounded-xl border-none bg-gray-100 mb-5 text-base text-end dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
                placeholder={t('customerAddressPlaceholder')}
                value={customerAddress}
                onChange={(e) => setCustomerAddress(e.target.value)}
              />

              <Button onClick={handleProceedToOrder} className="w-full bg-amber-500 text-black hover:bg-amber-600 transition-colors">
                {t('proceedToOrderButton')}
              </Button>
            </>
          )}

          {currentStep === 2 && ( // Step 2: Order Summary & Confirmation
            <>
              <h3 className="text-xl font-bold text-center mb-5 dark:text-white">{t('cartTitle')}</h3>
              {renderCartItems()}
              {renderTotalAmount()}

              {/* Customer Details Summary */}
              <h3 className="text-lg font-bold text-center mb-4 mt-6 dark:text-white">{t('customerDetailsSummaryTitle')}</h3>
              <div className="bg-gray-100 p-4 rounded-xl mb-6 text-end dark:bg-gray-700 dark:text-white">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-gray-600 text-sm dark:text-gray-300">{t('customerNamePlaceholder')}:</span>
                  <span className="font-bold text-base">{customerName}</span>
                </div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-gray-600 text-sm dark:text-gray-300">{t('customerPhonePlaceholder')}:</span>
                  <span className="font-bold text-base">{customerPhone}</span>
                </div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-gray-600 text-sm dark:text-gray-300">{t('customerEmailPlaceholder')}:</span>
                  <span className="font-bold text-base">{customerEmail}</span>
                </div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-gray-600 text-sm dark:text-gray-300">{t('customerAddressPlaceholder')}:</span>
                  <span className="font-bold text-base">{customerAddress}</span>
                </div>
                <div className="flex justify-between items-center mb-1 mt-3 pt-3 border-t border-gray-200 dark:border-gray-600">
                  <span className="text-gray-600 text-sm font-medium dark:text-gray-300">{t('paymentMethodLabel')}</span>
                  <span className="font-bold text-base">
                    {selectedPaymentMethod === 'COD' ? t('codOptionLabel') :
                     selectedPaymentMethod === 'Online' ? t('onlineOptionLabel') :
                     t('nequiPaymentLabel')}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 text-sm font-medium dark:text-gray-300">{t('expectedDeliveryLabel')}</span>
                  <span className="font-bold text-base">{t('deliveryTime')}</span>
                </div>
              </div>

              <Button onClick={handleConfirmFinalOrder} className="w-full bg-amber-500 text-black hover:bg-amber-600 transition-colors mb-3">
                {t('confirmOrderButton')}
              </Button>
              <Button variant="secondary" onClick={() => setCurrentStep(1)} className="w-full">
                {t('backButton')}
              </Button>
            </>
          )}
        </>
      )}
      <Button variant="secondary" onClick={onClose} className="mt-4 w-full">{t('closeCartButton')}</Button>
    </Modal>
  );
};

export default CartModal;