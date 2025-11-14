import React from 'react';
import { Product } from '../types';
import Button from './Button'; // Import the Button component
import { useTranslation, useLocale } from '../i18n/LocaleContext';

export interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  const t = useTranslation();
  const { locale } = useLocale(); // Get current locale
  const profit = product.sale - product.wholesale;
  const percent = product.wholesale > 0 ? ((profit / product.wholesale) * 100).toFixed(0) : '0';

  // Fallback for names/descriptions
  const productName = product.name[locale] || product.name.es || product.name.en || 'N/A';
  const productDesc = product.desc[locale] || product.desc.es || product.desc.en || 'N/A';

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-md active:scale-95 transition-transform duration-150">
      <div className="bg-amber-500 p-5 h-40 flex items-center justify-center">
        <img src={product.img} alt={productName} className="w-32 h-32 object-contain drop-shadow-md" />
      </div>
      <div className="p-4 text-end"> {/* Changed text-right to text-end */}
        <div className="font-bold text-sm mb-1">{productName}</div>
        <div className="text-xs text-gray-600 mb-3">{productDesc}</div>
        <div className="flex justify-between items-center mb-3">
          <span role="img" aria-label="fire">🔥</span>
          <div>
            <div className="font-bold text-base">${product.sale.toFixed(2)}</div>
            
          </div>
        </div>
        <Button onClick={() => onAddToCart(product)} className="py-2 text-sm w-full">
          {t('addToCartButton')}
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;