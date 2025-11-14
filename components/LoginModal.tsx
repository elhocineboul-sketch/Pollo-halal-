import React, { useState } from 'react';
import Modal from './Modal';
import Button from './Button';
import { useTranslation } from '../i18n/LocaleContext';

export interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose, onLoginSuccess }) => {
  const [password, setPassword] = useState('');
  const t = useTranslation();

  const handleLogin = () => {
    if (password === 'admin123') {
      onLoginSuccess();
      setPassword('');
    } else {
      alert(t('incorrectPasswordAlert'));
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={t('adminLoginTitle')}>
      <input
        type="password"
        id="pass"
        className="w-full p-3 rounded-xl border-none bg-gray-100 mb-4 text-base text-end" // Changed text-right to text-end
        placeholder={t('passwordPlaceholder')}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        onKeyPress={(e) => {
          if (e.key === 'Enter') handleLogin();
        }}
      />
      <Button onClick={handleLogin} className="mb-2 w-full">{t('loginButton')}</Button>
      <Button variant="secondary" onClick={onClose} className="w-full">{t('cancelButton')}</Button>
      <p className="text-center text-gray-500 text-xs mt-3">{t('passwordPlaceholder')}: admin123</p>
    </Modal>
  );
};

export default LoginModal;