
import React from 'react';
import { Product, Offer } from '../types';
import Slider from '../components/Slider';
import ProductCard from '../components/ProductCard';
import { useTranslation, useLocale } from '../i18n/LocaleContext'; // Import useTranslation and useLocale

export interface HomeProps {
  products: Product[];
  onShowSettings: () => void; // Changed from onShowLogin to onShowSettings
  onShowCart: () => void;
  onAddToCart: (product: Product) => void;
  cartItemCount: number;
  offers: Offer[]; // New prop: pass offers to Home
}

const sliderImages = [
  'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=800',
  'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800',
  'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800',
];

const Home: React.FC<HomeProps> = ({ products, onShowSettings, onShowCart, onAddToCart, cartItemCount, offers }) => {
  const t = useTranslation();
  const { locale } = useLocale(); // To get current locale for dir adjustments

  const isRTL = locale === 'ar';

  return (
    <div className="min-h-screen pb-4">
      <header className="bg-white rounded-b-3xl p-5 shadow-lg dark:bg-gray-800">
        <div className="flex items-center mb-5"> {/* Removed justify-between to allow for custom flex-grow on sides */}
          {/* Settings / Admin Login button */}
          <div className="flex-grow flex justify-start">
            <button className="text-3xl bg-none border-none cursor-pointer p-1 rounded-full hover:bg-gray-100 transition-colors" onClick={onShowSettings} aria-label={t('adminPanelAria')}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-gray-700 dark:text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924-1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066 2.573c-.94-1.543.826-3.31 2.37-2.37.568.307 1.25.508 1.968.508z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </button>
          </div>
          <div className="flex-shrink-0 bg-blue-200 border-2 border-blue-500 rounded-lg p-1"> {/* Added for debugging */}
            <img 
              src="https://res.cloudinary.com/dvf40x111/image/upload/v1721200192/Pollo_Halal_Logo_1_p40d9k.png" 
              alt={t('appName')} 
              className="max-h-20 h-full w-auto mx-auto block object-contain" // Ensured h-full and object-contain
            />
          </div>
          {/* Cart button */}
          <div className="flex-grow flex justify-end">
            <button className="text-3xl bg-none border-none cursor-pointer relative p-1 rounded-full hover:bg-gray-100 transition-colors" onClick={onShowCart} aria-label={t('cartAria')}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-gray-700 dark:text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              {cartItemCount > 0 && (
                <span className={`absolute -top-1 ${isRTL ? '-left-1' : '-right-1'} bg-amber-500 text-black rounded-full w-5 h-5 text-xs flex items-center justify-center font-bold`}>
                  {cartItemCount}
                </span>
              )}
            </button>
          </div>
        </div>
        <input
          type="text"
          className="bg-amber-500 placeholder-black placeholder-opacity-70 rounded-full py-3 px-5 border-none w-full text-lg text-end focus:outline-none focus:ring-2 focus:ring-amber-400 dark:bg-amber-700 dark:placeholder-amber-200 dark:text-white" // Changed text-right to text-end
          placeholder={t('searchPlaceholder')}
          aria-label={t('searchPlaceholder')}
        />
      </header>

      <Slider images={sliderImages} />

      <h2 className="px-5 pt-5 text-2xl font-bold text-end dark:text-white">{t('chickenProductsTitle')}</h2> {/* Changed text-right to text-end */}
      <div className="grid grid-cols-2 gap-4 px-5 pb-5 mt-3">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} onAddToCart={onAddToCart} offers={offers} />
        ))}
      </div>
    </div>
  );
};

export default React.memo(Home);
