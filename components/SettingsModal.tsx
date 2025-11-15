import React, { useState } from 'react';
import Modal from './Modal';
import Button from './Button';
import LoginModal from './LoginModal';
import LanguageSelectModal from './LanguageSelectModal';
import { useTranslation } from '../i18n/LocaleContext';

export interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdminLoginSuccess: () => void; // New prop for successful admin login
  onGoToAdminPanel: () => void; // New prop for direct access to admin panel when already logged in
  isAdminLoggedIn: boolean; // New prop to indicate if admin is currently logged in
  isDarkMode: boolean; // New prop for dark mode state
  onToggleDarkMode: () => void; // New prop for toggling dark mode
  onLoginError: () => void; // Prop to pass the error handler down to LoginModal
}

const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  onAdminLoginSuccess,
  onGoToAdminPanel,
  isAdminLoggedIn,
  isDarkMode,
  onToggleDarkMode,
  onLoginError,
}) => {
  const t = useTranslation();
  const [isLoginSubModalOpen, setIsLoginSubModalOpen] = useState(false);
  const [isLanguageSubModalOpen, setIsLanguageSubModalOpen] = useState(false);

  const handleOpenLogin = () => {
    setIsLoginSubModalOpen(true);
  };

  const handleCloseLogin = () => {
    setIsLoginSubModalOpen(false);
  };

  const handleLoginSuccess = () => {
    onAdminLoginSuccess(); // Notify parent of successful login and screen change
    setIsLoginSubModalOpen(false); // Close login modal
    // onClose() is now handled by the parent (App.tsx) after onAdminLoginSuccess
  };

  const handleOpenLanguageSelect = () => {
    setIsLanguageSubModalOpen(true);
  };

  const handleCloseLanguageSelect = () => {
    setIsLanguageSubModalOpen(false);
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} title={t('settingsTitle')}>
        <div className="space-y-3">
          <Button onClick={onToggleDarkMode} className="w-full bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600">
            {isDarkMode ? t('disableDarkMode') : t('enableDarkMode')}
          </Button>
          <Button onClick={handleOpenLanguageSelect} className="w-full bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600">
            {t('changeLanguageOption')}
          </Button>
          {isAdminLoggedIn ? (
            <Button onClick={onGoToAdminPanel} className="w-full bg-indigo-500 text-white hover:bg-indigo-600 transition-colors">
              {t('goToAdminPanelButton')}
            </Button>
          ) : (
            <Button onClick={handleOpenLogin} className="w-full bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600">
              {t('adminLoginOption')}
            </Button>
          )}
        </div>
        <Button variant="secondary" onClick={onClose} className="mt-4 w-full">
          {t('cancelButton')}
        </Button>
      </Modal>

      <LoginModal
        isOpen={isLoginSubModalOpen}
        onClose={handleCloseLogin}
        onLoginSuccess={handleLoginSuccess}
        onLoginError={onLoginError} // Pass the error handler
      />

      <LanguageSelectModal
        isOpen={isLanguageSubModalOpen}
        onClose={handleCloseLanguageSelect}
      />
    </>
  );
};

export default SettingsModal;