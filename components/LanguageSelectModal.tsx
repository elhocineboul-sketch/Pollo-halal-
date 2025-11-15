import React from 'react';
import Modal from './Modal';
import Button from './Button';
import { Locale } from '../types';
import { useLocale, useTranslation } from '../i18n/LocaleContext';

export interface LanguageSelectModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LanguageSelectModal: React.FC<LanguageSelectModalProps> = ({ isOpen, onClose }) => {
  const { setLocale, locale: currentLocale } = useLocale();
  const t = useTranslation();

  const languages: { code: Locale; name: string }[] = [
    { code: 'es', name: t('languageSpanish') },
    { code: 'en', name: t('languageEnglish') },
    { code: 'ar', name: t('languageArabic') },
  ];

  const handleSelectLanguage = (newLocale: Locale) => {
    setLocale(newLocale);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={t('selectLanguageTitle')}>
      <div className="space-y-3">
        {languages.map((lang) => (
          <Button
            key={lang.code}
            onClick={() => handleSelectLanguage(lang.code)}
            variant={lang.code === currentLocale ? 'primary' : 'secondary'}
            className={`w-full ${lang.code === currentLocale ? 'bg-amber-500 text-black dark:text-white' : 'bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600'}`}
          >
            {lang.name}
          </Button>
        ))}
      </div>
      <Button variant="secondary" onClick={onClose} className="mt-4 w-full">
        {t('cancelButton')}
      </Button>
    </Modal>
  );
};

export default LanguageSelectModal;