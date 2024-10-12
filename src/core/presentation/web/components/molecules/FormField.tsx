import React from 'react'; // import: react 18.3.1
import { useTheme } from 'next-themes'; // import: next-themes 0.2.5
import clsx from 'clsx'; // import: clsx 1.2.1
import { Input } from '../atoms/Input'; // import: src/core/presentation/web/components/atoms/Input.tsx
import { Typography } from '../atoms/Typography'; // import: src/core/presentation/web/components/atoms/Typography.tsx

type FormFieldProps = {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  disabled?: boolean;
  errorMessage?: string;
  variant?: 'default' | 'filled';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export const FormField: React.FC<FormFieldProps> = ({
  label,
  name,
  type = 'text',
  placeholder,
  disabled = false,
  errorMessage,
  variant = 'default',
  size = 'md',
  className,
  onChange,
}) => {
  const { theme } = useTheme();
  const [showErrorMessage, setShowErrorMessage] = React.useState(false);

  React.useEffect(() => {
    if (errorMessage) {
      setShowErrorMessage(true);
    } else {
      setShowErrorMessage(false);
    }
  }, [errorMessage]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange && onChange(event);
  };

  const inputClasses = clsx(
    'w-full px-3 py-2 rounded-md border',
    theme === 'dark' ? 'text-gray-300 border-gray-600' : 'text-gray-900 border-gray-300',
    variant === 'filled' ? 'bg-gray-100' : 'bg-transparent',
    size === 'sm' ? 'text-sm' : size === 'md' ? 'text-base' : 'text-lg',
    disabled ? 'cursor-not-allowed bg-gray-200' : 'cursor-text',
    className,
  );

  return (
    <div className="relative">
      <Typography variant="label" className="mb-1">
        {label}
      </Typography>
      <Input
        type={type}
        name={name}
        placeholder={placeholder}
        disabled={disabled}
        className={inputClasses}
        onChange={handleInputChange}
      />
      {showErrorMessage && (
        <span className="absolute bottom-2 left-0 text-red-500 text-xs">{errorMessage}</span>
      )}
    </div>
  );
};