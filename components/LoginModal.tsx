import React, { useState } from 'react';
import Modal from './Modal';
import Button from './Button';
import { useTranslation } from '../i18n/LocaleContext';

export interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: () => void;
  onLoginError: () => void; // New prop for handling login errors
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose, onLoginSuccess, onLoginError }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const t = useTranslation();

  const handleLogin = () => {
    // New admin credentials
    const ADMIN_USERNAME = 'elhocine';
    const ADMIN_EMAIL = 'elhocineboul@gmail.com';
    const ADMIN_PASSWORD = 'wizardgoo1020';

    const isUsernameCorrect = (username === ADMIN_USERNAME);
    const isEmailCorrect = (email === ADMIN_EMAIL);
    const isPasswordCorrect = (password === ADMIN_PASSWORD);

    // Allow login if either username or email is correct AND password is correct
    if ((isUsernameCorrect || isEmailCorrect) && isPasswordCorrect) {
      onLoginSuccess();
      setUsername('');
      setEmail('');
      setPassword('');
    } else {
      onLoginError(); // Call the error handler instead of alert
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={t('adminLoginTitle')}>
      <input
        type="text"
        id="username"
        className="w-full p-3 rounded-xl border-none bg-gray-100 mb-3 text-base text-end dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
        placeholder={t('usernamePlaceholder')}
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="email"
        id="email"
        className="w-full p-3 rounded-xl border-none bg-gray-100 mb-3 text-base text-end dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
        placeholder={t('emailPlaceholder')}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        id="pass"
        className="w-full p-3 rounded-xl border-none bg-gray-100 mb-4 text-base text-end dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
        placeholder={t('passwordPlaceholder')}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        onKeyPress={(e) => {
          if (e.key === 'Enter') handleLogin();
        }}
      />
      <Button onClick={handleLogin} className="mb-2 w-full">{t('loginButton')}</Button>
      <Button variant="secondary" onClick={onClose} className="w-full">{t('cancelButton')}</Button>
    </Modal>
  );
};

export default LoginModal;