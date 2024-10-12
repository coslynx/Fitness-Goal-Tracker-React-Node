import React from 'react'; // import: react 18.3.1
import { useTheme } from 'next-themes'; // import: next-themes 0.2.5
import clsx from 'clsx'; // import: clsx 1.2.1
import { Typography } from '../../components/atoms/Typography'; // import: src/core/presentation/web/components/atoms/Typography.tsx
import { NavItem } from '../../components/molecules/NavItem'; // import: src/core/presentation/web/components/molecules/NavItem.tsx
import { useAuth } from '../../hooks/useAuth'; // import: src/core/presentation/web/hooks/useAuth.ts

type FooterProps = {
  className?: string;
};

export const Footer: React.FC<FooterProps> = ({ className }) => {
  const { theme } = useTheme();
  const { user } = useAuth();

  const footerClasses = clsx(
    'bg-gray-100 py-4 text-gray-700',
    theme === 'dark' ? 'bg-gray-800 text-gray-300' : 'bg-gray-100 text-gray-700',
    className
  );

  return (
    <footer className={footerClasses}>
      <div className="container mx-auto px-4 text-center">
        <Typography variant="caption">
          &copy; {new Date().getFullYear()} Fitness Goal Tracker
        </Typography>
        {user && (
          <Typography variant="caption">
            Developed by {user.name}
          </Typography>
        )}
        <ul className="flex justify-center mt-2 space-x-4">
          <NavItem href="#" label="Privacy Policy" />
          <NavItem href="#" label="Terms of Service" />
        </ul>
      </div>
    </footer>
  );
};