import React, { useState, useEffect } from 'react';
import Modal from './Modal';
import Button from './Button';
import { Offer, OfferType, Product, Locale } from '../types';
import { useTranslation, useLocale } from '../i18n/LocaleContext';

export interface OfferFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (offer: Offer) => void;
  editingOffer?: Offer | null;
  products: Product[]; // All products to choose from
  offers: Offer[]; // All offers to check for conflicts
}

const OfferFormModal: React.FC<OfferFormModalProps> = ({
  isOpen,
  onClose,
  onSave,
  editingOffer,
  products,
  offers,
}) => {
  const t = useTranslation();
  const { locale } = useLocale();

  const [offerName, setOfferName] = useState<string>('');
  const [offerType, setOfferType] = useState<OfferType>(OfferType.PercentageDiscount);
  const [offerValue, setOfferValue] = useState<number | null>(null); // For PercentageDiscount and FixedDiscount
  const [buyQuantity, setBuyQuantity] = useState<number | null>(null); // For BuyXGetYFree
  const [getFreeQuantity, setGetFreeQuantity] = useState<number | null>(null); // For BuyXGetYFree
  const [targetProductId, setTargetProductId] = useState<number | null>(null);
  const [isActive, setIsActive] = useState<boolean>(true);

  useEffect(() => {
    if (editingOffer) {
      setOfferName(editingOffer.name[locale] || '');
      setOfferType(editingOffer.type);
      setOfferValue(editingOffer.value ?? null); // Use ?? null for optional value
      setBuyQuantity(editingOffer.buyQuantity ?? null);
      setGetFreeQuantity(editingOffer.getFreeQuantity ?? null);
      setTargetProductId(editingOffer.targetProductId);
      setIsActive(editingOffer.isActive);
    } else {
      setOfferName('');
      setOfferType(OfferType.PercentageDiscount);
      setOfferValue(null);
      setBuyQuantity(null);
      setGetFreeQuantity(null);
      setTargetProductId(null);
      setIsActive(true);
    }
  }, [editingOffer, isOpen, locale]);

  // Effect to clear/reset fields when offerType changes
  useEffect(() => {
    if (!isOpen) return; // Only run when modal is open

    if (offerType === OfferType.PercentageDiscount || offerType === OfferType.FixedDiscount) {
      setBuyQuantity(null);
      setGetFreeQuantity(null);
    } else if (offerType === OfferType.BuyXGetYFree) {
      setOfferValue(null);
    }
  }, [offerType, isOpen]);

  const handleSave = () => {
    if (!offerName.trim()) {
      alert(t('offerNameRequired'));
      return;
    }
    if (targetProductId === null) {
      alert(t('offerTargetProductRequired'));
      return;
    }

    if (offerType === OfferType.PercentageDiscount || offerType === OfferType.FixedDiscount) {
      if (offerValue === null || offerValue <= 0) {
        alert(t('offerValueRequired'));
        return;
      }
    } else if (offerType === OfferType.BuyXGetYFree) {
      if (buyQuantity === null || buyQuantity <= 0) {
        alert(t('buyQuantityRequired'));
        return;
      }
      if (getFreeQuantity === null || getFreeQuantity < 0) { // getFreeQuantity can be 0 (e.g., Buy X Get 0 Free)
        alert(t('getFreeQuantityRequired'));
        return;
      }
    }


    // Ensure the target product does not already have an active offer (unless it's THIS offer being edited)
    const productWithExistingOffer = offers.find(
      o => o.targetProductId === targetProductId && o.isActive && o.id !== editingOffer?.id
    );

    if (isActive && productWithExistingOffer) {
      alert(t('productAlreadyHasOffer', { productName: products.find(p => p.id === targetProductId)?.name[locale] || '' }));
      return;
    }

    let nameTranslations: Record<Locale, string>;
    if (editingOffer) {
        nameTranslations = { ...editingOffer.name, [locale]: offerName };
    } else {
        nameTranslations = { es: offerName, en: offerName, ar: offerName };
    }

    const newOffer: Offer = {
      id: editingOffer ? editingOffer.id : `offer-${Date.now()}`,
      name: nameTranslations,
      type: offerType,
      targetProductId: targetProductId,
      isActive: isActive,
      // Conditionally set value, buyQuantity, getFreeQuantity based on type
      ...(offerType === OfferType.PercentageDiscount || offerType === OfferType.FixedDiscount
        ? { value: offerValue! }
        : { value: undefined, buyQuantity: buyQuantity!, getFreeQuantity: getFreeQuantity! }
      ),
    };
    onSave(newOffer);
    onClose();
  };

  // Filter out products that already have an active offer, unless it's the product targeted by the current offer being edited
  const availableProducts = products.filter(p =>
    !offers.some(o =>
      o.targetProductId === p.id &&
      o.isActive &&
      o.id !== editingOffer?.id // Allow selecting the same product if editing its own offer
    ) || p.id === editingOffer?.targetProductId // Always include the product currently targeted by the offer being edited
  );

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={editingOffer ? t('editOfferTitle') : t('createOfferTitle')}>
      <input
        type="text"
        className="w-full p-3 rounded-xl border-none bg-gray-100 mb-3 text-base text-end dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
        placeholder={t('offerNamePlaceholder')}
        value={offerName}
        onChange={(e) => setOfferName(e.target.value)}
      />

      <select
        className="w-full p-3 rounded-xl border-none bg-gray-100 mb-3 text-base text-end dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
        value={offerType}
        onChange={(e) => setOfferType(e.target.value as OfferType)}
      >
        <option value={OfferType.PercentageDiscount}>{t('percentageDiscount')}</option>
        <option value={OfferType.FixedDiscount}>{t('fixedDiscount')}</option>
        <option value={OfferType.BuyXGetYFree}>{t('buyXGetYFree')}</option>
      </select>

      {(offerType === OfferType.PercentageDiscount || offerType === OfferType.FixedDiscount) && (
        <input
          type="number"
          className="w-full p-3 rounded-xl border-none bg-gray-100 mb-3 text-base text-end dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
          placeholder={t('offerValuePlaceholder')}
          step="0.01"
          value={offerValue ?? ''}
          onChange={(e) => {
            const value = e.target.value;
            setOfferValue(value === '' ? null : parseFloat(value));
          }}
        />
      )}

      {offerType === OfferType.BuyXGetYFree && (
        <>
          <input
            type="number"
            className="w-full p-3 rounded-xl border-none bg-gray-100 mb-3 text-base text-end dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
            placeholder={t('buyXPlaceholder')}
            step="1"
            value={buyQuantity ?? ''}
            onChange={(e) => {
              const value = e.target.value;
              setBuyQuantity(value === '' ? null : parseInt(value));
            }}
          />
          <input
            type="number"
            className="w-full p-3 rounded-xl border-none bg-gray-100 mb-3 text-base text-end dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
            placeholder={t('getYFreePlaceholder')}
            step="1"
            value={getFreeQuantity ?? ''}
            onChange={(e) => {
              const value = e.target.value;
              setGetFreeQuantity(value === '' ? null : parseInt(value));
            }}
          />
        </>
      )}

      <select
        className="w-full p-3 rounded-xl border-none bg-gray-100 mb-4 text-base text-end dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
        value={targetProductId ?? ''}
        onChange={(e) => setTargetProductId(e.target.value === '' ? null : parseInt(e.target.value))}
      >
        <option value="">{t('selectTargetProduct')}</option>
        {availableProducts.map(product => (
          <option key={product.id} value={product.id}>
            {product.name[locale] || product.name.es || 'N/A'}
          </option>
        ))}
      </select>

      <div className="flex items-center justify-between mb-6">
        <label htmlFor="offerActiveToggle" className="text-gray-800 text-lg font-medium cursor-pointer dark:text-white">
          {t('offerActiveLabel')}
        </label>
        <input
          type="checkbox"
          id="offerActiveToggle"
          className="sr-only peer"
          checked={isActive}
          onChange={(e) => setIsActive(e.target.checked)}
          aria-checked={isActive}
          role="switch"
        />
        <div className="relative w-14 h-8 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-amber-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[4px] after:right-[4px] after:bg-white after:border after:border-gray-300 after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-amber-500 cursor-pointer dark:bg-gray-700"></div>
      </div>

      <Button onClick={handleSave} className="mb-2 w-full">{t('saveOfferButton')}</Button>
      <Button variant="secondary" onClick={onClose} className="w-full">{t('cancelButton')}</Button>
    </Modal>
  );
};

export default OfferFormModal;