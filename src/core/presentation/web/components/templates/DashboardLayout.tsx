import { useState, useEffect } from 'react'; // import: react 18.3.1
import { useSession } from 'next-auth/react'; // import: next-auth 4.24.8
import { useTheme } from 'next-themes'; // import: next-themes 0.2.5
import { Header } from '../../components/organisms/Header'; // import: src/core/presentation/web/components/organisms/Header.tsx
import { Sidebar } from '../../components/organisms/Sidebar'; // import: src/core/presentation/web/components/organisms/Sidebar.tsx
import { Footer } from '../../components/organisms/Footer'; // import: src/core/presentation/web/components/organisms/Footer.tsx
import clsx from 'clsx'; // import: clsx 1.2.1
import { useGoalStore } from '../../hooks/useGoalStore'; // import: src/core/presentation/web/hooks/useGoalStore.ts
import { useAuth } from '../../hooks/useAuth'; // import: src/core/presentation/web/hooks/useAuth.ts
import { Typography } from '../../components/atoms/Typography'; // import: src/core/presentation/web/components/atoms/Typography.tsx
import { Error } from '../../../domain/common/Error'; // import: src/core/domain/common/Error.ts
import { Result } from '../../../domain/common/Result'; // import: src/core/domain/common/Result.ts

interface DashboardLayoutProps {
  children: React.ReactNode;
  title: string;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children, title }) => {
  const { data: session, status } = useSession(); // import: next-auth/react 4.24.8
  const { theme } = useTheme(); // import: next-themes 0.2.5
  const { goals, fetchGoals, isLoading, errors } = useGoalStore(); // import: src/core/presentation/web/hooks/useGoalStore.ts
  const { user, logoutUser } = useAuth(); // import: src/core/presentation/web/hooks/useAuth.ts
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    if (status === 'authenticated' && session?.user?.id) {
      fetchGoals(session.user.id);
    }
  }, [status, session]);

  const handleSidebarToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleLogout = async () => {
    if (user) {
      await logoutUser();
    }
  };

  return (
    <div className={clsx('flex min-h-screen flex-col', theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-gray-900')}>
      <Header className="z-10" onSidebarToggle={handleSidebarToggle} />
      <Sidebar isOpen={isSidebarOpen} onClose={handleSidebarToggle} />
      <main className="flex flex-1 flex-col overflow-y-auto">
        <div className="p-4 flex flex-col items-center justify-between">
          <Typography variant="h2" className="text-center mb-4">
            {title}
          </Typography>
          {children}
        </div>
      </main>
      <Footer className="z-10" />
    </div>
  );
};

export default DashboardLayout;