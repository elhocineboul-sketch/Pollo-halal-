import React, { useEffect } from 'react';
import { ToastMessage } from '../types';

export interface ToastProps {
  messages: ToastMessage[];
  onRemoveToast: (id: string) => void;
}

const Toast: React.FC<ToastProps> = ({ messages, onRemoveToast }) => {
  useEffect(() => {
    messages.forEach((toast) => {
      const timer = setTimeout(() => {
        onRemoveToast(toast.id);
      }, 3000); // Shorter toast duration for general messages
      return () => clearTimeout(timer);
    });
  }, [messages, onRemoveToast]);

  return (
    <div className="fixed top-5 left-1/2 -translate-x-1/2 z-[1001] flex flex-col items-center space-y-2">
      {messages.map((toast) => {
        let bgColor = '';
        switch (toast.type) {
          case 'success':
            bgColor = 'bg-emerald-500';
            break;
          case 'error':
            bgColor = 'bg-red-500';
            break;
          case 'info':
            bgColor = 'bg-blue-500';
            break;
        }

        return (
          <div
            key={toast.id}
            className={`flex flex-col items-center gap-2 px-5 py-3 rounded-xl text-white shadow-lg transition-all duration-300 ease-out transform translate-y-0 opacity-100 ${bgColor}`}
            role="alert"
            aria-live="assertive"
          >
            <p className="text-base font-medium whitespace-pre-line text-center">{toast.message}</p>
          </div>
        );
      })}
    </div>
  );
};

export default Toast;