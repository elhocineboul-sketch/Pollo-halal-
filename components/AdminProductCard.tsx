import React from 'react';
import { Product } from '../types';
import Button from './Button';
import { useTranslation, useLocale } from '../i18n/LocaleContext';

export interface AdminProductCardProps {
  product: Product;
  onEdit: (id: string) => void; // Changed id to string
  onDelete: (id: string) => void; // Changed id to string
}

const AdminProductCard: React.FC<AdminProductCardProps> = ({ product, onEdit, onDelete }) => {
  const t = useTranslation();
  const { locale } = useLocale(); // Get current locale
  const profit = product.sale - product.wholesale;
  const percent = product.wholesale > 0 ? ((profit / product.wholesale) * 100).toFixed(1) : '0.0';
  const profitColorClass = profit >= 0 ? 'text-emerald-500' : 'text-red-500';

  // Fallback for names/descriptions
  const productName = product.name[locale] || product.name.es || product.name.en || 'N/A';
  const productDesc = product.desc[locale] || product.desc.es || product.desc.en || 'N/A';

  return (
    <div className="bg-white rounded-2xl p-4 m-4 shadow-sm text-end dark:bg-gray-800 dark:text-white"> {/* Changed text-right to text-end */}
      <div className="flex gap-4 mb-4">
        <img src={product.img} alt={productName} className="w-20 h-20 object-contain rounded-xl bg-gray-100 dark:bg-gray-700" />
        <div className="flex-1">
          <div className="font-bold text-lg mb-1">{productName}</div>
          <div className="text-gray-600 text-sm dark:text-gray-400">{productDesc}</div>
          {product.category && <div className="text-gray-500 text-xs dark:text-gray-400">{product.category}</div>} {/* Display category */}
        </div>
      </div>
      <div className="bg-gray-100 p-4 rounded-xl mb-4 dark:bg-gray-700">
        <div className="flex justify-between mb-2 text-sm">
          <span className="text-gray-600 dark:text-gray-300">{t('wholesalePriceLabel')}</span>
          <span className="font-bold">${product.wholesale.toFixed(2)}</span>
        </div>
        <div className="flex justify-between mb-2 text-sm">
          <span className="text-gray-600 dark:text-gray-300">{t('salePriceLabel')}</span>
          <span className="font-bold">${product.sale.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600 dark:text-gray-300">{t('profitLabel')}</span>
          <span className={`font-bold ${profitColorClass}`}>
            ${profit.toFixed(2)} ({percent}%)
          </span>
        </div>
      </div>
      <div className="flex gap-2">
        <Button className="flex-1 py-3" onClick={() => onEdit(product.id)}>
          {t('editButton')}
        </Button>
        <Button variant="danger" className="flex-1 py-3" onClick={() => onDelete(product.id)}>
          {t('deleteButton')}
        </Button>
      </div>
    </div>
  );
};

export default AdminProductCard;