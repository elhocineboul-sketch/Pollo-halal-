import React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger';
  children: React.ReactNode;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  children,
  className = '',
  ...props
}) => {
  // Removed w-full from baseStyles, it should be applied as needed by parent components for layout.
  // text-center is added to ensure text is centered within the button itself.
  let baseStyles = 'py-3 px-6 rounded-2xl font-bold transition-all duration-200 ease-in-out hover:opacity-90 text-center';
  let variantStyles = '';

  switch (variant) {
    case 'primary':
      variantStyles = 'bg-amber-500 text-black dark:text-white';
      break;
    case 'secondary':
      variantStyles = 'bg-gray-500 text-white dark:bg-gray-700'; // Adjusted for dark mode
      break;
    case 'danger':
      variantStyles = 'bg-red-500 text-white';
      break;
    default:
      variantStyles = 'bg-amber-500 text-black dark:text-white';
  }

  return (
    <button className={`${baseStyles} ${variantStyles} ${className}`} {...props}>
      {children}
    </button>
  );
};

export default Button;