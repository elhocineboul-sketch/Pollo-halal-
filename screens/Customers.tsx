
import React, { useState } from 'react';
import { Customer } from '../types';
import Button from '../components/Button';
import { useTranslation, useLocale } from '../i18n/LocaleContext';

export interface CustomersProps {
  customers: Customer[];
  onGoHome: () => void; // Function to navigate back to the admin panel or home
  onViewOrders: (customer: Customer) => void; // New prop to view a customer's orders
}

const Customers: React.FC<CustomersProps> = ({ customers, onGoHome, onViewOrders }) => {
  const t = useTranslation();
  const { locale } = useLocale();
  const isRTL = locale === 'ar';

  return (
    <div className="min-h-screen pb-4">
      <header className="bg-gradient-to-br from-blue-500 to-cyan-600 p-5 text-white">
        <div className="flex justify-between items-center text-end">
          {/* Back Button */}
          <button className="bg-white bg-opacity-20 border-none text-white text-2xl p-3 rounded-xl cursor-pointer" onClick={onGoHome} aria-label={t('backToHomeAria')}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d={isRTL ? "M14 5l7 7m0 0l-7 7m7-7H3" : "M10 19l-7-7m0 0l7-7m-7 7h18"} />
            </svg>
          </button>
          <div className="flex-grow text-center">
            <div className="text-3xl font-bold mb-1">{t('customersListTitle')}</div>
            <p className="text-base">{t('adminPanelSubtitle')}</p> {/* Re-using admin subtitle */}
          </div>
          {/* Removed Exit Button */}
        </div>
      </header>

      <div className="p-5 overflow-x-auto">
        {customers.length === 0 ? (
          <p className="text-center text-gray-500 dark:text-gray-400">{t('customerNotFoundMessage')}</p>
        ) : (
          <table className="w-full text-end border-collapse bg-white shadow-md rounded-xl overflow-hidden dark:bg-gray-800">
            <thead>
              <tr className="bg-blue-100 text-blue-800 text-sm font-semibold dark:bg-blue-900 dark:text-blue-100">
                <th className="py-3 px-4 whitespace-nowrap">{t('customerNameTableHeading')}</th>
                <th className="py-3 px-4 whitespace-nowrap">{t('customerEmailTableHeading')}</th>
                <th className="py-3 px-4 whitespace-nowrap">{t('customerPhoneTableHeading')}</th>
                <th className="py-3 px-4 whitespace-nowrap">{t('customerAddressTableHeading')}</th>
                <th className="py-3 px-4 whitespace-nowrap">{t('customerTotalPurchasesTableHeading')}</th>
                <th className="py-3 px-4 whitespace-nowrap">{t('customerStatusTableHeading')}</th> {/* New column */}
                <th className="py-3 px-4 whitespace-nowrap">{t('ordersTableHeading')}</th> {/* New column */}
              </tr>
            </thead>
            <tbody>
              {customers.map((customer, index) => {
                const rowClass = index % 2 === 0 ? 'bg-white dark:bg-gray-800' : 'bg-gray-50 dark:bg-gray-700';
                return (
                  <tr key={customer.id} className={`${rowClass} border-b border-gray-100 last:border-b-0 text-gray-700 text-sm dark:border-gray-700 dark:text-gray-300`}>
                    <td className="py-3 px-4 font-medium whitespace-nowrap">{customer.name}</td>
                    <td className="py-3 px-4 whitespace-nowrap">{customer.email}</td>
                    <td className="py-3 px-4 whitespace-nowrap">{customer.phone}</td>
                    <td className="py-3 px-4 whitespace-nowrap">{customer.address}</td>
                    <td className="py-3 px-4 whitespace-nowrap">${customer.totalPurchases.toFixed(2)}</td>
                    <td className="py-3 px-4 whitespace-nowrap">
                      {customer.status === 'new' ? t('newCustomerStatus') : t('returningCustomerStatus')}
                    </td> {/* Display customer status */}
                    <td className="py-3 px-4 whitespace-nowrap">
                      <Button variant="secondary" onClick={() => onViewOrders(customer)} className="py-1 px-3 text-xs w-full">
                        {t('viewOrdersButton')} ({customer.orders.length})
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>

      <div className="p-5">
        <Button onClick={onGoHome} className="w-full">{t('backToHomeAria')}</Button>
      </div>
    </div>
  );
};

export default Customers;
