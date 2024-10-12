import React, { useState, useEffect, ChangeEvent, forwardRef, useRef, useImperativeHandle } from 'react';
import { useTheme } from 'next-themes';
import clsx from 'clsx';
import { InputProps } from 'src/shared/ui-components/Input';
import { Typography } from '../atoms/Typography';

type InputComponentProps = InputProps & {
  label?: string;
  errorMessage?: string;
  variant?: 'default' | 'filled';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
};

const Input = forwardRef<HTMLInputElement, InputComponentProps>(
  ({
    type = 'text',
    value = '',
    onChange,
    placeholder = '',
    disabled = false,
    label,
    errorMessage,
    variant = 'default',
    size = 'md',
    className,
    ...rest
  }, ref) => {
    const { theme } = useTheme();
    const [showErrorMessage, setShowErrorMessage] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
      if (errorMessage) {
        setShowErrorMessage(true);
      } else {
        setShowErrorMessage(false);
      }
    }, [errorMessage]);

    useImperativeHandle(ref, () => ({
      focus: () => {
        inputRef.current?.focus();
      },
    }));

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
      onChange && onChange(event);
    };

    const inputClasses = clsx(
      'w-full px-3 py-2 rounded-md border',
      theme === 'dark' ? 'text-gray-300 border-gray-600' : 'text-gray-900 border-gray-300',
      variant === 'filled' ? 'bg-gray-100' : 'bg-transparent',
      size === 'sm' ? 'text-sm' : size === 'md' ? 'text-base' : 'text-lg',
      disabled ? 'cursor-not-allowed bg-gray-200' : 'cursor-text',
      className
    );

    return (
      <div className="relative">
        {label && (
          <Typography variant="label" className="mb-1">
            {label}
          </Typography>
        )}
        <input
          ref={inputRef}
          type={type}
          value={value}
          onChange={handleInputChange}
          placeholder={placeholder}
          disabled={disabled}
          className={inputClasses}
          {...rest}
        />
        {showErrorMessage && (
          <span className="absolute bottom-2 left-0 text-red-500 text-xs">{errorMessage}</span>
        )}
      </div>
    );
  }
);

export default Input;