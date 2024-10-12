import React, { ReactNode, useState, useEffect } from 'react'; // import: react 18.3.1
import { useTheme } from 'next-themes'; // import: next-themes 0.2.5
import clsx from 'clsx'; // import: clsx 1.2.1
import { CardProps } from 'src/shared/ui-components/Card'; // import: src/shared/ui-components/Card

interface CardComponentProps extends CardProps {
  className?: string;
}

export const Card: React.FC<CardComponentProps> = ({ 
  children,
  variant = 'default',
  className
}) => {
  const { theme } = useTheme();

  const cardClasses = clsx(
    'bg-white shadow-md rounded-md p-4',
    variant === 'primary' ? 'bg-primary text-white' : 
    variant === 'secondary' ? 'bg-secondary text-white' : 
    variant === 'danger' ? 'bg-danger text-white' : 
    variant === 'success' ? 'bg-success text-white' : 
    variant === 'warning' ? 'bg-warning text-white' : 
    variant === 'info' ? 'bg-info text-white' : 
    variant === 'light' ? 'bg-light text-gray-900' : 
    variant === 'dark' ? 'bg-dark text-gray-300' : '',
    className
  );

  return (
    <div className={cardClasses}>
      {children}
    </div>
  );
};