import React from 'react'; // import: react 18.3.1
import { useTheme } from 'next-themes'; // import: next-themes 0.2.5
import { useAuth } from '../../hooks/useAuth'; // import: src/core/presentation/web/hooks/useAuth.ts
import { Button } from '../../components/atoms/Button'; // import: src/core/presentation/web/components/atoms/Button.tsx
import { NavItem } from '../../components/molecules/NavItem'; // import: src/core/presentation/web/components/molecules/NavItem.tsx
import { Typography } from '../../components/atoms/Typography'; // import: src/core/presentation/web/components/atoms/Typography.tsx
import clsx from 'clsx'; // import: clsx 1.2.1
import Link from 'next/link'; // import: next 14.2.15

interface HeaderProps {
  className?: string;
}

export const Header: React.FC<HeaderProps> = ({ className }) => {
  const { theme } = useTheme();
  const { user, logoutUser } = useAuth();

  const handleLogout = async () => {
    if (user) {
      await logoutUser();
    }
  };

  const headerClasses = clsx(
    'bg-white py-4 shadow-md',
    theme === 'dark' ? 'bg-gray-800 text-gray-300' : 'bg-white text-gray-900',
    className
  );

  return (
    <header className={headerClasses}>
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link href="/dashboard" className="flex items-center">
          <Typography variant="h3" className="font-bold">
            Fitness Goal Tracker
          </Typography>
        </Link>
        <ul className="flex items-center space-x-4">
          {user ? (
            <>
              <li>
                <Typography variant="body1">
                  Welcome, {user.name}!
                </Typography>
              </li>
              <li>
                <Button variant="primary" onClick={handleLogout}>
                  Logout
                </Button>
              </li>
            </>
          ) : (
            <>
              <li>
                <NavItem href="/auth/login" label="Login" />
              </li>
              <li>
                <NavItem href="/auth/register" label="Register" />
              </li>
            </>
          )}
        </ul>
      </div>
    </header>
  );
};