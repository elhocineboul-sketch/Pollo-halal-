import React from 'react';
import Modal from './Modal';
import Button from './Button';
import { Customer, CartItem } from '../types';
import { useTranslation, useLocale } from '../i18n/LocaleContext';

export interface CustomerOrdersModalProps {
  isOpen: boolean;
  onClose: () => void;
  customer: Customer;
}

const CustomerOrdersModal: React.FC<CustomerOrdersModalProps> = ({ isOpen, onClose, customer }) => {
  const t = useTranslation();
  const { locale } = useLocale();
  const isRTL = locale === 'ar';

  if (!isOpen) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={t('customerOrdersTitle', { customerName: customer.name })}>
      <div className="space-y-6 max-h-[70vh] overflow-y-auto pr-2"> {/* Added pr-2 for scrollbar spacing */}
        {customer.orders.length === 0 ? (
          <p className="text-center text-gray-500">{t('noOrdersFoundMessage')}</p>
        ) : (
          customer.orders.map((order) => (
            <div key={order.id} className="bg-gray-50 p-4 rounded-xl shadow-sm text-end"> {/* Changed text-right to text-end */}
              <div className="flex justify-between items-center mb-3 pb-2 border-b border-gray-200">
                <span className="text-gray-600 text-sm font-medium">{t('orderIdTableHeading')}:</span>
                <span className="font-bold text-sm">{order.id}</span>
              </div>
              <div className="flex justify-between items-center mb-3 pb-2 border-b border-gray-200">
                <span className="text-gray-600 text-sm font-medium">{t('orderDateTableHeading')}:</span>
                <span className="font-bold text-sm">{order.date}</span>
              </div>
              <div className="flex justify-between items-center mb-3 pb-2 border-b border-gray-200">
                <span className="text-gray-600 text-sm font-medium">{t('paymentMethodLabel')}:</span>
                <span className="font-bold text-sm">
                  {order.paymentMethod === 'COD' ? t('codOptionLabel') :
                   order.paymentMethod === 'Online' ? t('onlineOptionLabel') :
                   t('nequiPaymentLabel')}
                </span>
              </div>
              <div className="flex justify-between items-center mb-4">
                <span className="text-gray-600 text-sm font-medium">{t('expectedDeliveryLabel')}:</span>
                <span className="font-bold text-sm">{order.expectedDelivery}</span>
              </div>
              <div className="flex justify-between items-center mb-4">
                <span className="text-lg font-bold">{t('orderTotalTableHeading')}:</span>
                <span className="text-xl font-extrabold text-amber-700">${order.totalAmount.toFixed(2)}</span>
              </div>

              <h4 className="text-base font-semibold mb-2 text-start">{t('orderItemsTableHeading')}:</h4> {/* Changed text-right to text-start */}
              <div className="space-y-2">
                {order.items.map((item: CartItem) => (
                  <div key={item.product.id} className="flex items-center gap-3 bg-white p-2 rounded-lg shadow-xs">
                    <img src={item.product.img} alt={item.product.name[locale] || item.product.name.es} className="w-10 h-10 object-contain rounded-md" />
                    <div className="flex-1 text-end"> {/* Changed text-right to text-end */}
                      <div className="font-medium text-xs">{item.product.name[locale] || item.product.name.es || item.product.name.en || 'N/A'}</div>
                      <div className="text-gray-500 text-xs">{t('quantity')}: {item.quantity} x ${item.product.sale.toFixed(2)}</div>
                    </div>
                    <span className="font-bold text-sm">${(item.quantity * item.product.sale).toFixed(2)}</span>
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </div>

      <Button variant="secondary" onClick={onClose} className="mt-6 w-full">
        {t('closeCartButton')}
      </Button>
    </Modal>
  );
};

export default CustomerOrdersModal;