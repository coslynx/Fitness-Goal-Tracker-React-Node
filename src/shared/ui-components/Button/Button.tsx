import React, { ButtonHTMLAttributes, ReactNode } from 'react';
import { useTheme } from 'next-themes';
import clsx from 'clsx';
import { getColor } from '../../theme';
import { ButtonProps } from '../Button';

type ButtonComponentProps = ButtonProps & {
  variant?: 'primary' | 'secondary' | 'danger' | 'success' | 'warning' | 'info' | 'light' | 'dark';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
};

export const Button: React.FC<ButtonComponentProps & ButtonHTMLAttributes<HTMLButtonElement>> = ({
  variant = 'primary',
  children,
  onClick,
  disabled = false,
  size = 'md',
  className,
  ...rest
}) => {
  const { theme } = useTheme();

  const buttonClasses = clsx(
    'inline-flex items-center px-4 py-2 border rounded-md font-medium text-center',
    theme === 'dark' ? 'text-gray-300 border-gray-600 hover:border-gray-500' : 'text-gray-900 border-gray-300 hover:border-gray-400',
    disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer hover:opacity-90',
    variant === 'primary' ? 'bg-primary text-white hover:bg-blue-700' :
    variant === 'secondary' ? 'bg-secondary text-white hover:bg-gray-700' :
    variant === 'danger' ? 'bg-danger text-white hover:bg-red-700' :
    variant === 'success' ? 'bg-success text-white hover:bg-green-700' :
    variant === 'warning' ? 'bg-warning text-white hover:bg-yellow-700' :
    variant === 'info' ? 'bg-info text-white hover:bg-blue-600' :
    variant === 'light' ? 'bg-light text-gray-900 hover:bg-gray-200' :
    variant === 'dark' ? 'bg-dark text-gray-300 hover:bg-gray-800' : '',
    size === 'sm' ? 'text-sm' : size === 'md' ? 'text-base' : 'text-lg',
    className
  );

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={buttonClasses}
      {...rest}
    >
      {children}
    </button>
  );
};