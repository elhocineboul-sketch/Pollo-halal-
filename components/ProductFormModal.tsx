import React, { useState, useEffect } from 'react';
import Modal from './Modal';
import Button from './Button';
import { Product, Locale } from '../types';
import { useTranslation, useLocale } from '../i18n/LocaleContext';

export interface ProductFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (product: Omit<Product, 'createdAt'> & { id?: string }) => void; // Allow id to be optional for new products
  editingProduct?: Product | null;
}

const ProductFormModal: React.FC<ProductFormModalProps> = ({
  isOpen,
  onClose,
  onSave,
  editingProduct,
}) => {
  const t = useTranslation();
  const { locale } = useLocale(); // Get current locale

  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');
  const [wholesale, setWholesale] = useState<number | null>(null);
  const [sale, setSale] = useState<number | null>(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);
  const [unitWeightKg, setUnitWeightKg] = useState<number | null>(null);
  const [initialUnitsStock, setInitialUnitsStock] = useState<number | null>(null);
  const [category, setCategory] = useState<string>(''); // New state for category

  const [profit, setProfit] = useState<number>(0);
  const [profitPercent, setProfitPercent] = useState<string>('0%');

  useEffect(() => {
    if (editingProduct) {
      // Load the product's name and description for the current locale
      setName(editingProduct.name[locale] || '');
      setDesc(editingProduct.desc[locale] || '');
      setWholesale(editingProduct.wholesale);
      setSale(editingProduct.sale);
      setImagePreviewUrl(editingProduct.img);
      setUnitWeightKg(editingProduct.unitWeightKg);
      setInitialUnitsStock(editingProduct.initialUnitsStock);
      setCategory(editingProduct.category || ''); // Load category
    } else {
      setName('');
      setDesc('');
      setWholesale(null);
      setSale(null);
      setImagePreviewUrl(null);
      setUnitWeightKg(null);
      setInitialUnitsStock(null);
      setCategory(''); // Clear category for new product
    }
  }, [editingProduct, isOpen, locale]); // Re-run effect when locale changes

  useEffect(() => {
    // Treat null as 0 for calculation
    const w = wholesale ?? 0;
    const s = sale ?? 0;

    if (w > 0 && s > 0) {
      const calculatedProfit = s - w;
      const calculatedPercent = ((calculatedProfit / w) * 100).toFixed(1);
      setProfit(calculatedProfit);
      setProfitPercent(`${calculatedPercent}%`);
    } else {
      setProfit(0);
      setProfitPercent('0%');
    }
  }, [wholesale, sale]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreviewUrl(null);
    }
  };

  const handleSave = () => {
    const defaultImg = 'https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=400';

    // Ensure final values are numbers, defaulting null to 0 for validation purposes
    const finalWholesale = wholesale ?? 0;
    const finalSale = sale ?? 0;
    const finalUnitWeightKg = unitWeightKg ?? 0;
    const finalInitialUnitsStock = initialUnitsStock ?? 0;

    if (!name.trim() || !desc.trim() || finalWholesale <= 0 || finalSale <= 0 || finalUnitWeightKg <= 0 || finalInitialUnitsStock <= 0) {
      alert(t('fillAllFieldsError'));
      return;
    }

    if (finalSale < finalWholesale) {
      if (!window.confirm(t('salePriceWarning'))) return;
    }

    let nameTranslations: Record<Locale, string>;
    let descTranslations: Record<Locale, string>;

    if (editingProduct) {
      // Update only the current locale's translation for existing product
      nameTranslations = { ...editingProduct.name, [locale]: name };
      descTranslations = { ...editingProduct.desc, [locale]: desc };
    } else {
      // For new product, initialize all locales with the current input as default
      nameTranslations = { es: name, en: name, ar: name }; // Cast 'name' to Locale,string
      descTranslations = { es: desc, en: desc, ar: desc }; // Cast 'desc' to Locale,string
    }

    const productToSave: Omit<Product, 'createdAt'> & { id?: string } = {
      id: editingProduct ? editingProduct.id : undefined, // Firebase will assign ID for new products
      name: nameTranslations,
      desc: descTranslations,
      wholesale: finalWholesale,
      sale: finalSale,
      img: imagePreviewUrl || defaultImg,
      unitWeightKg: finalUnitWeightKg,
      initialUnitsStock: finalInitialUnitsStock,
      unitsSold: editingProduct ? editingProduct.unitsSold : 0,
      activeOfferId: editingProduct ? editingProduct.activeOfferId : undefined,
      category: category.trim() === '' ? undefined : category.trim(), // Save category, or undefined if empty
    };
    onSave(productToSave);
    onClose();
  };

  const profitColorClass = profit >= 0 ? 'text-emerald-500' : 'text-red-500';

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={editingProduct ? t('editProductTitle') : t('addProductTitle')}
    >
      <input
        type="file"
        id="imgFile"
        accept="image/*"
        onChange={handleImageChange}
        className="hidden"
      />
      <label htmlFor="imgFile" className="block bg-gray-100 p-3 rounded-xl text-center cursor-pointer text-base mb-3 hover:bg-gray-200 transition-colors dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600">
        {t('chooseImageLabel')}
      </label>
      {imagePreviewUrl && (
        <img
          src={imagePreviewUrl}
          alt="Product preview"
          className="w-full h-52 object-contain rounded-xl my-3 bg-gray-100 dark:bg-gray-700"
        />
      )}

      <input
        type="text"
        id="pName"
        className="w-full p-3 rounded-xl border-none bg-gray-100 mb-3 text-base text-end dark:bg-gray-700 dark:text-white dark:placeholder-gray-400" // Dark mode styles
        placeholder={t('productNamePlaceholder')}
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        id="pDesc"
        className="w-full p-3 rounded-xl border-none bg-gray-100 mb-3 text-base text-end dark:bg-gray-700 dark:text-white dark:placeholder-gray-400" // Dark mode styles
        placeholder={t('productDescriptionPlaceholder')}
        value={desc}
        onChange={(e) => setDesc(e.target.value)}
      />
      <input
        type="text"
        id="pCategory"
        className="w-full p-3 rounded-xl border-none bg-gray-100 mb-3 text-base text-end dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
        placeholder={t('productCategoryPlaceholder')} // New translation key
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />
      <input
        type="number"
        id="pWholesale"
        className="w-full p-3 rounded-xl border-none bg-gray-100 mb-3 text-base text-end dark:bg-gray-700 dark:text-white dark:placeholder-gray-400" // Dark mode styles
        placeholder={t('wholesalePricePlaceholder')}
        step="0.01"
        value={wholesale ?? ''} // Display empty string for null
        onChange={(e) => {
          const value = e.target.value;
          if (value === '') {
            setWholesale(null);
          } else {
            const numValue = parseFloat(value);
            setWholesale(isNaN(numValue) ? null : numValue);
          }
        }}
      />
      <input
        type="number"
        id="pSale"
        className="w-full p-3 rounded-xl border-none bg-gray-100 mb-4 text-base text-end dark:bg-gray-700 dark:text-white dark:placeholder-gray-400" // Dark mode styles
        placeholder={t('salePricePlaceholder')}
        step="0.01"
        value={sale ?? ''} // Display empty string for null
        onChange={(e) => {
          const value = e.target.value;
          if (value === '') {
            setSale(null);
          } else {
            const numValue = parseFloat(value);
            setSale(isNaN(numValue) ? null : numValue);
          }
        }}
      />

      <input
        type="number"
        id="pUnitWeightKg"
        className="w-full p-3 rounded-xl border-none bg-gray-100 mb-3 text-base text-end dark:bg-gray-700 dark:text-white dark:placeholder-gray-400" // Dark mode styles
        placeholder={t('unitWeightKgPlaceholder')}
        step="0.01"
        value={unitWeightKg ?? ''}
        onChange={(e) => {
          const value = e.target.value;
          if (value === '') {
            setUnitWeightKg(null);
          } else {
            const numValue = parseFloat(value);
            setUnitWeightKg(isNaN(numValue) ? null : numValue);
          }
        }}
      />
      <input
        type="number"
        id="pInitialUnitsStock"
        className="w-full p-3 rounded-xl border-none bg-gray-100 mb-4 text-base text-end dark:bg-gray-700 dark:text-white dark:placeholder-gray-400" // Dark mode styles
        placeholder={t('initialUnitsStockPlaceholder')}
        step="1"
        value={initialUnitsStock ?? ''}
        onChange={(e) => {
          const value = e.target.value;
          if (value === '') {
            setInitialUnitsStock(null);
          } else {
            const numValue = parseInt(value);
            setInitialUnitsStock(isNaN(numValue) ? null : numValue);
          }
        }}
      />


      {(wholesale !== null && sale !== null) && (wholesale > 0 && sale > 0) && ( // Only show profit box if both are valid numbers
        <div className="bg-gray-100 p-4 rounded-xl mb-4 text-end dark:bg-gray-700"> {/* Changed text-right to text-end */}
          <div className="flex justify-between mb-2 text-sm">
            <span className="text-gray-600 dark:text-gray-300">{t('expectedProfitLabel')}</span>
            <span className={`font-bold ${profitColorClass}`}>${profit.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600 dark:text-gray-300">{t('profitPercentageLabel')}</span>
            <span className="font-bold">{profitPercent}</span>
          </div>
        </div>
      )}

      <Button onClick={handleSave} className="mb-2 w-full">{t('saveProductButton')}</Button>
      <Button variant="secondary" onClick={onClose} className="w-full">{t('cancelButton')}</Button>
    </Modal>
  );
};

export default ProductFormModal;