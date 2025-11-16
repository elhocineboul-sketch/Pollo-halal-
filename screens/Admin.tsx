import React from 'react';
import { Product, Screen } from '../types';
import AdminProductCard from '../components/AdminProductCard';
import Button from '../components/Button';
import { useTranslation, useLocale } from '../i18n/LocaleContext';

export interface AdminProps {
  products: Product[];
  onGoHome: () => void;
  onAddProduct: () => void;
  onEditProduct: (id: string) => void; // Changed id to string
  onDeleteProduct: (id: string) => void; // Changed id to string
  onShowPaymentActivation: () => void;
  onShowCustomers: () => void; // New prop for showing customers list
  onShowOfferManagement: () => void; // New prop for showing offer management
  onAdminLogout: () => void; // New prop for admin logout
}

const Admin: React.FC<AdminProps> = ({
  products,
  onGoHome,
  onAddProduct,
  onEditProduct,
  onDeleteProduct,
  onShowPaymentActivation,
  onShowCustomers, // Destructure new prop
  onShowOfferManagement, // Destructure new prop
  onAdminLogout, // Destructure new logout prop
}) => {
  const t = useTranslation();
  const { locale } = useLocale();
  const isRTL = locale === 'ar';

  return (
    <div className="min-h-screen pb-4">
      <header className="bg-gradient-to-br from-amber-500 to-orange-600 p-5 text-white">
        <div className="flex justify-between items-center text-end"> {/* Changed text-right to text-end */}
          {/* Back Button */}
          <button className="bg-white bg-opacity-20 border-none text-white text-2xl p-3 rounded-xl cursor-pointer" onClick={onGoHome} aria-label={t('backToHomeAria')}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d={isRTL ? "M14 5l7 7m0 0l-7 7m7-7H3" : "M10 19l-7-7m0 0l7-7m-7 7h18"} />
            </svg>
          </button>
          <div className="flex-grow text-center"> {/* Centered title, removed mr-4 */}
            <div className="text-3xl font-bold mb-1">{t('adminPanelTitle')}</div>
            <p className="text-base">{t('adminPanelSubtitle')}</p>
          </div>
          <div className="flex gap-2"> {/* Group exit and logout buttons */}
            {/* Logout Button */}
            <button className="bg-red-500 border-none text-white text-base py-2.5 px-4 rounded-xl cursor-pointer hover:bg-red-600 transition-colors flex items-center justify-center" onClick={onAdminLogout} aria-label={t('logoutButton')}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              {t('logoutButton')}
            </button>
          </div>
        </div>
      </header>
      <div className="p-5">
        <Button onClick={onAddProduct} className="py-4 text-lg mb-3 w-full">{t('addProductButton')}</Button>
        <Button onClick={onShowOfferManagement} className="py-4 text-lg bg-indigo-500 text-white w-full mb-3">{t('manageOffersButton')}</Button> {/* New button */}
        <Button onClick={onShowPaymentActivation} className="py-4 text-lg bg-orange-500 text-white w-full mb-3">{t('activatePaymentButton')}</Button>
        <Button onClick={onShowCustomers} className="py-4 text-lg bg-blue-500 text-white w-full">{t('viewCustomersButton')}</Button> {/* New button */}
      </div>
      <div>
        {products.map((p) => (
          <AdminProductCard
            key={p.id}
            product={p}
            onEdit={onEditProduct}
            onDelete={onDeleteProduct}
          />
        ))}
      </div>

      <h2 className="px-5 pt-5 text-2xl font-bold text-end dark:text-white">{t('inventoryManagementTitle')}</h2> {/* Changed text-right to text-end */}
      <div className="p-5 overflow-x-auto">
        <table className="w-full text-end border-collapse bg-white shadow-md rounded-xl overflow-hidden dark:bg-gray-800"> {/* Changed text-right to text-end */}
          <thead>
            <tr className="bg-amber-100 text-amber-800 text-sm font-semibold dark:bg-amber-900 dark:text-amber-100">
              <th className="py-3 px-4 whitespace-nowrap">{t('productTableHeading')}</th>
              <th className="py-3 px-4 whitespace-nowrap">{t('categoryTableHeading')}</th> {/* New category heading */}
              <th className="py-3 px-4 whitespace-nowrap">{t('wholesaleUnitTableHeading')}</th>
              <th className="py-3 px-4 whitespace-nowrap">{t('sale500gTableHeading')}</th>
              <th className="py-3 px-4 whitespace-nowrap">{t('kgPurchasedTableHeading')}</th>
              <th className="py-3 px-4 whitespace-nowrap">{t('kgSoldTableHeading')}</th>
              <th className="py-3 px-4 whitespace-nowrap">{t('kgRemainingTableHeading')}</th>
              <th className="py-3 px-4 whitespace-nowrap">{t('unitsRemainingTableHeading')}</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p, index) => {
              const unitsRemaining = p.initialUnitsStock - p.unitsSold;
              const kgPurchased = p.initialUnitsStock * p.unitWeightKg;
              const kgSold = p.unitsSold * p.unitWeightKg;
              const kgRemaining = unitsRemaining * p.unitWeightKg;
              const salePricePer500g = p.unitWeightKg > 0 ? (p.sale / p.unitWeightKg) * 0.5 : 0;
              const rowClass = index % 2 === 0 ? 'bg-white dark:bg-gray-800' : 'bg-gray-50 dark:bg-gray-700';

              return (
                <tr key={p.id} className={`${rowClass} border-b border-gray-100 last:border-b-0 text-gray-700 text-sm dark:border-gray-700 dark:text-gray-300`}>
                  <td className="py-3 px-4 font-medium whitespace-nowrap">{p.name[locale] || p.name.es || p.name.en || 'N/A'}</td>
                  <td className="py-3 px-4 whitespace-nowrap">{p.category || t('noCategory')}</td> {/* Display category */}
                  <td className="py-3 px-4 whitespace-nowrap">${p.wholesale.toFixed(2)}</td>
                  <td className="py-3 px-4 whitespace-nowrap">${salePricePer500g.toFixed(2)}</td>
                  <td className="py-3 px-4 whitespace-nowrap">{kgPurchased.toFixed(2)} {t('kgUnit')}</td>
                  <td className="py-3 px-4 whitespace-nowrap">{kgSold.toFixed(2)} {t('kgUnit')}</td>
                  <td className={`py-3 px-4 whitespace-nowrap ${kgRemaining <= 0 ? 'text-red-500 font-bold' : ''}`}>{kgRemaining.toFixed(2)} {t('kgUnit')}</td>
                  <td className={`py-3 px-4 whitespace-nowrap ${unitsRemaining <= 0 ? 'text-red-500 font-bold' : ''}`}>{unitsRemaining}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Admin;