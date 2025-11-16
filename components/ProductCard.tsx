import React from 'react';
import { Product, Offer, OfferType } from '../types';
import Button from './Button'; // Import the Button component
import { useTranslation, useLocale } from '../i18n/LocaleContext';

export interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  offers: Offer[]; // Pass offers to ProductCard
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart, offers }) => {
  const t = useTranslation();
  const { locale } = useLocale(); // Get current locale
  const profit = product.sale - product.wholesale;
  const percent = product.wholesale > 0 ? ((profit / product.wholesale) * 100).toFixed(0) : '0';

  // Fallback for names/descriptions
  const productName = product.name[locale] || product.name.es || product.name.en || 'N/A';
  const productDesc = product.desc[locale] || product.desc.es || product.desc.en || 'N/A';

  // Find active offer for this product
  const activeOffer = product.activeOfferId ? offers.find(o => o.id === product.activeOfferId && o.isActive) : undefined;

  let displayPrice = product.sale;
  let originalPrice = product.sale;
  let offerBadge = null;

  if (activeOffer) {
    if (activeOffer.type === OfferType.PercentageDiscount) {
      displayPrice = product.sale * (1 - activeOffer.value! / 100);
      offerBadge = <span className="bg-emerald-500 text-white text-xs font-bold px-2 py-1 rounded-full dark:bg-emerald-700">{t('discountBadge')} -{activeOffer.value}%</span>;
    } else if (activeOffer.type === OfferType.FixedDiscount) {
      displayPrice = Math.max(0, product.sale - activeOffer.value!); // Price won't go below 0
      offerBadge = <span className="bg-emerald-500 text-white text-xs font-bold px-2 py-1 rounded-full dark:bg-emerald-700">{t('discountBadge')} -${activeOffer.value!.toFixed(2)}</span>;
    } else if (activeOffer.type === OfferType.BuyXGetYFree) {
      // For Buy X Get Y Free, the price is still per unit, but the badge shows the offer
      offerBadge = <span className="bg-purple-500 text-white text-xs font-bold px-2 py-1 rounded-full dark:bg-purple-700">{t('buyXGetYFreeBadge', { buyQuantity: activeOffer.buyQuantity, getFreeQuantity: activeOffer.getFreeQuantity })}</span>;
    }
  }

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-md active:scale-95 transition-transform duration-150 dark:bg-gray-800">
      <div className="bg-amber-500 p-5 h-40 flex items-center justify-center relative">
        <img src={product.img} alt={productName} className="w-32 h-32 object-contain drop-shadow-md" loading="lazy" decoding="async" />
        {offerBadge && <div className={`absolute ${locale === 'ar' ? 'left-2' : 'right-2'} top-2`}>{offerBadge}</div>}
      </div>
      <div className="p-4 text-end"> {/* Changed text-right to text-end */}
        <div className="font-bold text-sm mb-1 dark:text-white">{productName}</div>
        <div className="text-xs text-gray-600 mb-3 dark:text-gray-400">{productDesc}</div>
        <div className="flex justify-between items-center mb-3">
          <span role="img" aria-label="fire">🔥</span>
          <div>
            {activeOffer && activeOffer.type !== OfferType.BuyXGetYFree && (
              <div className="text-gray-500 text-xs line-through dark:text-gray-400">${originalPrice.toFixed(2)}</div>
            )}
            <div className="font-bold text-base dark:text-white">
              {activeOffer && activeOffer.type === OfferType.BuyXGetYFree ? '' : `$${displayPrice.toFixed(2)}`}
            </div>
          </div>
        </div>
        <Button onClick={() => onAddToCart(product)} className="py-2 text-sm w-full">
          {t('addToCartButton')}
        </Button>
      </div>
    </div>
  );
};

export default React.memo(ProductCard);
