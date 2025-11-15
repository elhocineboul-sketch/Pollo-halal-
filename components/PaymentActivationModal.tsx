import React, { useState, useEffect } from 'react';
import Modal from './Modal';
import Button from './Button';
import { useTranslation } from '../i18n/LocaleContext';

export interface PaymentActivationModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentCODState: boolean;
  currentOnlineState: boolean;
  currentNequiState: boolean; // New prop for Nequi state
  onSavePaymentSettings: (cod: boolean, online: boolean, nequi: boolean) => void; // Updated signature
}

const PaymentActivationModal: React.FC<PaymentActivationModalProps> = ({
  isOpen,
  onClose,
  currentCODState,
  currentOnlineState,
  currentNequiState, // Destructure new prop
  onSavePaymentSettings,
}) => {
  const t = useTranslation();
  const [codEnabled, setCodEnabled] = useState(currentCODState);
  const [onlinePaymentEnabled, setOnlinePaymentEnabled] = useState(currentOnlineState);
  const [nequiEnabled, setNequiEnabled] = useState(currentNequiState); // New state for Nequi

  useEffect(() => {
    // Reset internal state when modal opens or parent states change
    setCodEnabled(currentCODState);
    setOnlinePaymentEnabled(currentOnlineState);
    setNequiEnabled(currentNequiState); // Reset Nequi state
  }, [currentCODState, currentOnlineState, currentNequiState, isOpen]);

  const handleSave = () => {
    onSavePaymentSettings(codEnabled, onlinePaymentEnabled, nequiEnabled); // Pass Nequi state
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={t('activatePaymentTitle')}>
      <p className="text-gray-700 text-base mb-5 text-center dark:text-gray-300">
        {t('activatePaymentDescription')}
      </p>

      {/* Cash on Delivery Toggle */}
      <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-200 dark:border-gray-700">
        <label htmlFor="codToggle" className="text-gray-800 text-lg font-medium cursor-pointer dark:text-white">
          {t('codLabel')}
        </label>
        <input
          type="checkbox"
          id="codToggle"
          className="sr-only peer" // Hide checkbox visually
          checked={codEnabled}
          onChange={(e) => setCodEnabled(e.target.checked)}
          aria-checked={codEnabled}
          role="switch"
        />
        <div className="relative w-14 h-8 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-amber-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[4px] after:right-[4px] after:bg-white after:border after:border-gray-300 after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-amber-500 cursor-pointer dark:bg-gray-700" aria-hidden="true"></div>
      </div>

      {/* Online Payment Toggle */}
      <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-200 dark:border-gray-700">
        <label htmlFor="onlinePaymentToggle" className="text-gray-800 text-lg font-medium cursor-pointer dark:text-white">
          {t('onlinePaymentLabel')}
        </label>
        <input
          type="checkbox"
          id="onlinePaymentToggle"
          className="sr-only peer" // Hide checkbox visually
          checked={onlinePaymentEnabled}
          onChange={(e) => setOnlinePaymentEnabled(e.target.checked)}
          aria-checked={onlinePaymentEnabled}
          role="switch"
        />
        <div className="relative w-14 h-8 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-amber-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[4px] after:right-[4px] after:bg-white after:border after:border-gray-300 after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-amber-500 cursor-pointer dark:bg-gray-700" aria-hidden="true"></div>
      </div>

      {/* Nequi Payment Toggle */}
      <div className="flex items-center justify-between mb-6">
        <label htmlFor="nequiPaymentToggle" className="text-gray-800 text-lg font-medium cursor-pointer dark:text-white">
          {t('nequiPaymentLabel')}
        </label>
        <input
          type="checkbox"
          id="nequiPaymentToggle"
          className="sr-only peer"
          checked={nequiEnabled}
          onChange={(e) => setNequiEnabled(e.target.checked)}
          aria-checked={nequiEnabled}
          role="switch"
        />
        <div className="relative w-14 h-8 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-amber-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[4px] after:right-[4px] after:bg-white after:border after:border-gray-300 after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-amber-500 cursor-pointer dark:bg-gray-700" aria-hidden="true"></div>
      </div>

      <Button onClick={handleSave} className="mb-2 w-full">{t('saveSettingsButton')}</Button>
      <Button variant="secondary" onClick={onClose} className="w-full">{t('cancelButton')}</Button>
    </Modal>
  );
};

export default PaymentActivationModal;