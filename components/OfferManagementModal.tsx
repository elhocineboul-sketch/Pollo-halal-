import React, { useState } from 'react';
import Modal from './Modal';
import Button from './Button';
import { Offer, Product, OfferType } from '../types';
import { useTranslation, useLocale } from '../i18n/LocaleContext';
import OfferFormModal from './OfferFormModal'; // Import OfferFormModal

export interface OfferManagementModalProps {
  isOpen: boolean;
  onClose: () => void;
  offers: Offer[];
  products: Product[]; // Needed to display product names
  onAddOffer: () => void;
  onEditOffer: (offerId: string) => void;
  onDeleteOffer: (offerId: string) => void;
  onToggleOfferActive: (offerId: string) => void;
}

const OfferManagementModal: React.FC<OfferManagementModalProps> = ({
  isOpen,
  onClose,
  offers,
  products,
  onAddOffer,
  onEditOffer,
  onDeleteOffer,
  onToggleOfferActive,
}) => {
  const t = useTranslation();
  const { locale } = useLocale();

  const getProductName = (productId: number) => {
    const product = products.find(p => p.id === productId);
    return product ? (product.name[locale] || product.name.es || product.name.en || 'N/A') : 'N/A';
  };

  const getOfferTypeDisplay = (offer: Offer) => {
    switch (offer.type) {
      case OfferType.PercentageDiscount:
        return t('percentageDiscount') + ` (${offer.value}%)`;
      case OfferType.FixedDiscount:
        return t('fixedDiscount') + ` ($${offer.value!.toFixed(2)})`;
      case OfferType.BuyXGetYFree:
        return t('buyXGetYFree', { buyQuantity: offer.buyQuantity, getFreeQuantity: offer.getFreeQuantity });
      default:
        return offer.type;
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={t('offerManagementTitle')}>
      <Button onClick={onAddOffer} className="w-full mb-4">
        {t('addOfferButton')}
      </Button>

      {offers.length === 0 ? (
        <p className="text-center text-gray-500 dark:text-gray-400">{t('noOffersFound')}</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full text-end border-collapse bg-white shadow-md rounded-xl overflow-hidden dark:bg-gray-800">
            <thead>
              <tr className="bg-amber-100 text-amber-800 text-sm font-semibold dark:bg-amber-900 dark:text-amber-100">
                <th className="py-3 px-4">{t('offerNameTableHeading')}</th>
                <th className="py-3 px-4">{t('offerTypeTableHeading')}</th>
                <th className="py-3 px-4">{t('offerTargetProductTableHeading')}</th>
                <th className="py-3 px-4">{t('offerStatusTableHeading')}</th>
                <th className="py-3 px-4">{t('actions')}</th>
              </tr>
            </thead>
            <tbody>
              {offers.map((offer, index) => {
                const rowClass = index % 2 === 0 ? 'bg-white dark:bg-gray-800' : 'bg-gray-50 dark:bg-gray-700';
                return (
                  <tr key={offer.id} className={`${rowClass} border-b border-gray-100 last:border-b-0 text-gray-700 text-sm dark:border-gray-700 dark:text-gray-300`}>
                    <td className="py-3 px-4 font-medium">{offer.name[locale] || offer.name.es || 'N/A'}</td>
                    <td className="py-3 px-4">{getOfferTypeDisplay(offer)}</td>
                    <td className="py-3 px-4">{getProductName(offer.targetProductId)}</td>
                    <td className="py-3 px-4">
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          value=""
                          className="sr-only peer"
                          checked={offer.isActive}
                          onChange={() => onToggleOfferActive(offer.id)}
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-amber-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:right-[2px] after:bg-white after:border after:border-gray-300 after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-500 dark:bg-gray-600 dark:border-gray-500"></div>
                        <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                          {offer.isActive ? t('offerActive') : t('offerInactive')}
                        </span>
                      </label>
                    </td>
                    <td className="py-3 px-4 flex justify-end gap-2"> {/* Changed justify-end from justify-start */}
                      <Button variant="secondary" onClick={() => onEditOffer(offer.id)} className="py-1 px-2 text-xs">
                        {t('editButton')}
                      </Button>
                      <Button variant="danger" onClick={() => onDeleteOffer(offer.id)} className="py-1 px-2 text-xs">
                        {t('deleteButton')}
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      <Button variant="secondary" onClick={onClose} className="mt-6 w-full">
        {t('closeButton')}
      </Button>
    </Modal>
  );
};

export default OfferManagementModal;