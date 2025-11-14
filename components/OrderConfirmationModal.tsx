import React from 'react';
import Modal from './Modal';
import Button from './Button';
import { OrderConfirmationDetails } from '../types';
import { useTranslation, useLocale } from '../i18n/LocaleContext';

export interface OrderConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  orderDetails: OrderConfirmationDetails;
  onShareOrder: (details: OrderConfirmationDetails) => void;
}

const OrderConfirmationModal: React.FC<OrderConfirmationModalProps> = ({
  isOpen,
  onClose,
  orderDetails,
  onShareOrder,
}) => {
  const t = useTranslation();
  const { locale } = useLocale();
  const isRTL = locale === 'ar';

  if (!isOpen) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={t('orderConfirmationTitle')}>
      <div className="space-y-4 text-end max-h-[70vh] overflow-y-auto pr-2">
        <p className="text-gray-800 text-lg font-bold mb-4 text-center">✅ {t('purchaseSuccessShort')}</p>

        {/* Order ID */}
        <div className="flex justify-between items-center bg-gray-50 p-3 rounded-lg">
          <span className="text-gray-600 text-sm font-medium">📦 {t('orderIdTableHeading')}:</span>
          <span className="font-bold text-base">#{orderDetails.orderId}</span>
        </div>

        {/* Customer Details */}
        <div className="bg-gray-50 p-3 rounded-lg space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-gray-600 text-sm font-medium">👤 {t('customerNameTableHeading')}:</span>
            <span className="font-bold text-base">{orderDetails.customerName}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600 text-sm font-medium">📱 {t('customerPhonePlaceholder')}:</span>
            <span className="font-bold text-base">{orderDetails.customerPhone}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600 text-sm font-medium">📧 {t('customerEmailPlaceholder')}:</span>
            <span className="font-bold text-base">{orderDetails.customerEmail}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600 text-sm font-medium">📍 {t('customerAddressPlaceholder')}:</span>
            <span className="font-bold text-base">{orderDetails.customerAddress}</span>
          </div>
        </div>

        {/* Order Items Summary */}
        <div className="bg-gray-50 p-3 rounded-lg">
          <h4 className="text-base font-semibold mb-2 text-start">🛒 {t('orderItemsTableHeading')}:</h4>
          <div className="space-y-1">
            {orderDetails.orderItems.map((item) => (
              <div key={item.product.id} className="flex justify-between items-center text-sm">
                <span className="text-gray-700">{item.product.name[locale] || item.product.name.es}</span>
                <span className="font-medium">{item.quantity} × ${item.product.sale.toFixed(2)}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Payment and Delivery */}
        <div className="bg-gray-50 p-3 rounded-lg space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-gray-600 text-sm font-medium">💰 {t('totalAmountLabel')}:</span>
            <span className="text-lg font-extrabold text-amber-700">${orderDetails.totalAmount.toFixed(2)}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600 text-sm font-medium">💳 {t('paymentMethodLabel')}:</span>
            <span className="font-bold text-base">{orderDetails.paymentMethod}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600 text-sm font-medium">🚚 {t('expectedDeliveryLabel')}:</span>
            <span className="font-bold text-base">{orderDetails.expectedDelivery}</span>
          </div>
        </div>

        {/* Order Tracking Link & QR Code */}
        <div className="bg-amber-50 p-3 rounded-lg flex flex-col items-center justify-center text-center space-y-3 pt-4 pb-4">
          <h4 className="text-base font-semibold">🔗 {t('orderTrackingLinkTitle')}</h4>
          <a
            href={orderDetails.orderTrackingLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline text-sm break-all"
          >
            {orderDetails.orderTrackingLink}
          </a>
          {orderDetails.qrCodeImageUrl && (
            <img
              src={orderDetails.qrCodeImageUrl}
              alt="Order Tracking QR Code"
              className="w-36 h-36 p-2 bg-white rounded-lg shadow-md border border-gray-200"
            />
          )}
          <p className="text-gray-600 text-xs mt-1">{t('shareOrderText').split('\n')[0].replace('!', '')}!</p> {/* Short instructional text */}
        </div>
      </div>

      <div className="flex flex-col gap-3 mt-6">
        <Button onClick={() => onShareOrder(orderDetails)} className="w-full bg-blue-500 text-white hover:bg-blue-600 transition-colors">
          {t('shareOrderButton')}
        </Button>
        <Button variant="secondary" onClick={onClose} className="w-full">
          {t('closeModalButton')}
        </Button>
      </div>
    </Modal>
  );
};

export default OrderConfirmationModal;