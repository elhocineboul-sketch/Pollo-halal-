import React from 'react';

export interface ModalProps {
  isOpen: boolean;
  onClose?: () => void;
  children: React.ReactNode;
  title?: string;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children, title }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-5 bg-black bg-opacity-50 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-3xl p-8 max-w-sm w-full max-h-[90vh] overflow-y-auto shadow-xl dark:bg-gray-800"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal
      >
        {title && (
          <h2 className="text-2xl font-bold text-center mb-5 dark:text-white">{title}</h2>
        )}
        {children}
      </div>
    </div>
  );
};

export default React.memo(Modal);
