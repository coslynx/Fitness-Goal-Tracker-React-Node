import { useState, useEffect } from 'react'; // import: react 18.3.1
import { useTheme } from 'next-themes'; // import: next-themes 0.2.5
import clsx from 'clsx'; // import: clsx 1.2.1

type TypographyProps = {
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'body1' | 'body2' | 'subtitle1' | 'subtitle2' | 'caption' | 'overline';
  children: React.ReactNode;
  className?: string;
};

const typographyVariants = {
  h1: 'text-4xl font-bold',
  h2: 'text-3xl font-bold',
  h3: 'text-2xl font-bold',
  h4: 'text-xl font-bold',
  h5: 'text-lg font-bold',
  h6: 'text-base font-bold',
  body1: 'text-base',
  body2: 'text-sm',
  subtitle1: 'text-lg font-medium',
  subtitle2: 'text-base font-medium',
  caption: 'text-sm text-gray-500',
  overline: 'text-xs font-medium uppercase',
};

export const Typography: React.FC<TypographyProps> = ({
  variant = 'body1',
  children,
  className,
}) => {
  const { theme } = useTheme();

  return (
    <span
      className={clsx(
        typographyVariants[variant],
        theme === 'dark' ? 'text-gray-300' : 'text-gray-900',
        className,
      )}
    >
      {children}
    </span>
  );
};