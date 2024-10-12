import { useState, useEffect } from 'react'; // import: react 18.3.1
import { useSession } from 'next-auth/react'; // import: next-auth 4.24.8
import { useRouter } from 'next/navigation'; // import: next 14.2.15
import { NavItem } from '../../components/molecules/NavItem'; // import: src/core/presentation/web/components/molecules/NavItem.tsx
import { Typography } from '../../components/atoms/Typography'; // import: src/core/presentation/web/components/atoms/Typography.tsx
import { useGoalStore } from '../../hooks/useGoalStore'; // import: src/core/presentation/web/hooks/useGoalStore.ts
import { useAuth } from '../../hooks/useAuth'; // import: src/core/presentation/web/hooks/useAuth.ts
import { useTheme } from 'next-themes'; // import: next-themes 0.2.5
import clsx from 'clsx'; // import: clsx 1.2.1

type SidebarProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const { data: session, status } = useSession();
  const { goals, fetchGoals, isLoading } = useGoalStore();
  const { user } = useAuth();
  const { theme } = useTheme();
  const router = useRouter();

  useEffect(() => {
    if (status === 'authenticated' && session?.user?.id) {
      fetchGoals(session.user.id);
    }
  }, [status, session]);

  const handleGoalClick = (goalId: string) => {
    onClose();
    router.push(`/dashboard/goals/${goalId}`);
  };

  const sidebarClasses = clsx(
    'fixed top-0 left-0 h-full w-64 bg-white shadow-md overflow-y-auto',
    theme === 'dark' ? 'bg-gray-800 text-gray-300' : 'bg-white text-gray-900',
    isOpen ? 'translate-x-0' : '-translate-x-full',
    'transition-transform duration-300 ease-in-out'
  );

  return (
    <div className={sidebarClasses}>
      <div className="p-4">
        <Typography variant="h2" className="mb-4">
          Fitness Goal Tracker
        </Typography>
        {user && (
          <Typography variant="body1" className="mb-2">
            Welcome, {user.name}!
          </Typography>
        )}
        <ul className="space-y-2">
          <NavItem href="/dashboard" label="Dashboard" icon="dashboard" onClick={onClose} />
          <NavItem href="/dashboard/goals" label="Goals" icon="goal" onClick={onClose} />
          <NavItem href="/dashboard/progress" label="Progress" icon="chart" onClick={onClose} />
          {isLoading ? (
            <Typography variant="body2" className="text-gray-500">
              Loading goals...
            </Typography>
          ) : (
            goals.length > 0 && (
              <>
                <Typography variant="h4" className="mt-4 mb-2">
                  Your Goals
                </Typography>
                <ul className="space-y-1">
                  {goals.map((goal) => (
                    <li
                      key={goal.id}
                      onClick={() => handleGoalClick(goal.id)}
                      className="cursor-pointer hover:bg-gray-200 px-4 py-2 rounded-md"
                    >
                      <Typography variant="body1">
                        {goal.type}: {goal.target} (Deadline: {goal.deadline.toLocaleDateString()})
                      </Typography>
                    </li>
                  ))}
                </ul>
              </>
            )
          )}
        </ul>
      </div>
    </div>
  );
}