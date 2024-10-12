import { useState, useEffect } from 'react'; // import: react 18.3.1
import { useSession } from 'next-auth/react'; // import: next-auth 4.24.8
import { useTheme } from 'next-themes'; // import: next-themes 0.2.5
import clsx from 'clsx'; // import: clsx 1.2.1
import { Typography } from '../../components/atoms/Typography'; // import: src/core/presentation/web/components/atoms/Typography.tsx
import { Card } from '../../shared/ui-components/Card'; // import: src/shared/ui-components/Card.tsx
import { Button } from '../../components/atoms/Button'; // import: src/core/presentation/web/components/atoms/Button.tsx
import { useGoalStore } from '../../hooks/useGoalStore'; // import: src/core/presentation/web/hooks/useGoalStore.ts
import { useAuth } from '../../hooks/useAuth'; // import: src/core/presentation/web/hooks/useAuth.ts
import { Error } from '../../../domain/common/Error'; // import: src/core/domain/common/Error.ts
import { Result } from '../../../domain/common/Result'; // import: src/core/domain/common/Result.ts
import Link from 'next/link'; // import: next 14.2.15

interface AuthLayoutProps {
  title: string;
  children: React.ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ title, children }) => {
  const { data: session, status } = useSession();
  const { theme } = useTheme();
  const { goals, fetchGoals, isLoading, errors } = useGoalStore();
  const { user, logoutUser } = useAuth();

  useEffect(() => {
    if (status === 'authenticated' && session?.user?.id) {
      fetchGoals(session.user.id);
    }
  }, [status, session]);

  const handleLogout = async () => {
    if (user) {
      await logoutUser();
    }
  };

  return (
    <div className={clsx('flex min-h-screen flex-col items-center justify-between p-24', theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-gray-900')}>
      <header className="bg-white py-4 shadow-md mb-8">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <Link href="/" className="flex items-center">
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
                  <Link href="/auth/login">
                    <Button variant="primary">Login</Button>
                  </Link>
                </li>
                <li>
                  <Link href="/auth/register">
                    <Button variant="secondary">Register</Button>
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </header>
      <main className="flex flex-col items-center justify-center w-full">
        <Card className="w-full max-w-md mx-auto p-6 space-y-6">
          <Typography variant="h2" className="text-center mb-4">
            {title}
          </Typography>
          {children}
        </Card>
      </main>
      <footer className="bg-gray-100 py-4 text-gray-700 mt-8">
        <div className="container mx-auto px-4 text-center">
          <Typography variant="caption">
            &copy; {new Date().getFullYear()} Fitness Goal Tracker
          </Typography>
          {user && (
            <Typography variant="caption">
              Developed by {user.name}
            </Typography>
          )}
        </div>
      </footer>
    </div>
  );
};

export default AuthLayout;