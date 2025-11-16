import React, { useMemo } from 'react';
import Modal from './Modal';
import Button from './Button';
import { useTranslation } from '../i18n/LocaleContext';

export interface RecipeModalProps {
  isOpen: boolean;
  onClose: () => void;
  recipe: string;
  isLoading: boolean;
  error: string | null;
}

// A simple component to render markdown-like text to HTML
const MarkdownRenderer: React.FC<{ text: string }> = ({ text }) => {
  const formattedText = useMemo(() => {
    return text
      .split('\n')
      .map((line, index) => {
        line = line.trim();
        if (line.startsWith('##')) {
          return <h2 key={index} className="text-xl font-bold mt-4 mb-2 dark:text-amber-300">{line.replace('##', '').trim()}</h2>;
        }
        if (line.startsWith('*')) {
          return <li key={index} className="ml-5 list-disc">{line.replace('*', '').trim()}</li>;
        }
        if (line.match(/^\d+\./)) {
          return <li key={index} className="ml-5 list-decimal">{line.replace(/^\d+\./, '').trim()}</li>;
        }
        if(line === '') {
          return <br key={index} />;
        }
        return <p key={index} className="mb-2">{line}</p>;
      });
  }, [text]);

  return <div className="text-end text-gray-700 dark:text-gray-300">{formattedText}</div>;
};


const RecipeModal: React.FC<RecipeModalProps> = ({ isOpen, onClose, recipe, isLoading, error }) => {
  const t = useTranslation();

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex flex-col items-center justify-center min-h-[200px]">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-amber-500"></div>
          <p className="mt-4 text-lg font-semibold text-gray-700 dark:text-gray-300">{t('recipeLoading')}</p>
        </div>
      );
    }
    if (error) {
      return (
        <div className="text-center min-h-[200px] flex flex-col items-center justify-center">
          <p className="text-red-500 text-lg">❌</p>
          <p className="mt-2 text-gray-700 dark:text-gray-300">{error}</p>
        </div>
      );
    }
    if (recipe) {
      return <MarkdownRenderer text={recipe} />;
    }
    return null;
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={t('recipeModalTitle')}>
      <div className="max-h-[60vh] overflow-y-auto pr-2">
        {renderContent()}
      </div>
      <Button variant="secondary" onClick={onClose} className="mt-6 w-full">
        {t('closeModalButton')}
      </Button>
    </Modal>
  );
};

export default React.memo(RecipeModal);