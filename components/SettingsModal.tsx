import React, { useState } from 'react';
import Modal from './Modal';
import Button from './Button';
import LoginModal from './LoginModal';
import LanguageSelectModal from './LanguageSelectModal';
import { useTranslation } from '../i18n/LocaleContext';

export interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdminLogin: () => void;
}

const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose, onAdminLogin }) => {
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
    onAdminLogin();
    setIsLoginSubModalOpen(false);
    onClose(); // Close main settings modal after successful login
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
          <Button onClick={handleOpenLanguageSelect} className="w-full bg-gray-100 text-gray-800 hover:bg-gray-200">
            {t('changeLanguageOption')}
          </Button>
          <Button onClick={handleOpenLogin} className="w-full bg-gray-100 text-gray-800 hover:bg-gray-200">
            {t('adminLoginOption')}
          </Button>
        </div>
        <Button variant="secondary" onClick={onClose} className="mt-4 w-full">
          {t('cancelButton')}
        </Button>
      </Modal>

      <LoginModal
        isOpen={isLoginSubModalOpen}
        onClose={handleCloseLogin}
        onLoginSuccess={handleLoginSuccess}
      />

      <LanguageSelectModal
        isOpen={isLanguageSubModalOpen}
        onClose={handleCloseLanguageSelect}
      />
    </>
  );
};

export default SettingsModal;