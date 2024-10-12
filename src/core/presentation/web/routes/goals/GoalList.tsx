import { useState, useEffect } from 'react'; // import: react 18.3.1
import { useSession } from 'next-auth/react'; // import: next-auth 4.24.8
import { useRouter } from 'next/navigation'; // import: next 14.2.15
import { DashboardLayout } from '../../components/templates/DashboardLayout'; // import: src/core/presentation/web/components/templates/DashboardLayout.tsx
import { Typography } from '../../components/atoms/Typography'; // import: src/core/presentation/web/components/atoms/Typography.tsx
import { GoalService } from '../../../domain/goals/GoalService'; // import: src/core/domain/goals/GoalService.ts
import { GoalRepository } from '../../../domain/goals/GoalRepository'; // import: src/core/domain/goals/GoalRepository.ts
import { MongoGoalRepository } from '../../../domain/goals/GoalRepository'; // import: src/core/domain/goals/GoalRepository.ts
import { Database } from '../../../infrastructure/database/Database'; // import: src/core/infrastructure/database/Database.ts
import { GoalModel } from '../../../infrastructure/database/GoalModel'; // import: src/core/infrastructure/database/GoalModel.ts
import { Result } from '../../../domain/common/Result'; // import: src/core/domain/common/Result.ts
import { Error } from '../../../domain/common/Error'; // import: src/core/domain/common/Error.ts
import { useGoalStore } from '../../hooks/useGoalStore'; // import: src/core/presentation/web/hooks/useGoalStore.ts
import { Goal } from '../../../domain/goals/Goal'; // import: src/core/domain/goals/Goal.ts

export default function GoalList() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const { goals, fetchGoals, isLoading, errors } = useGoalStore();

  useEffect(() => {
    if (status === 'authenticated' && session?.user?.id) {
      fetchGoals(session.user.id);
    }
  }, [status, session]);

  const handleGoalClick = (goalId: string) => {
    router.push(`/dashboard/goals/${goalId}`);
  };

  return (
    <DashboardLayout title="Goals">
      <Typography variant="h2" className="text-center">
        Your Goals:
      </Typography>
      {isLoading && (
        <Typography variant="h2" className="text-center">
          Loading goals...
        </Typography>
      )}
      {!isLoading && goals.length > 0 && (
        <ul>
          {goals.map((goal) => (
            <li key={goal.id} onClick={() => handleGoalClick(goal.id)}>
              <Typography variant="body1">
                {goal.type}: {goal.target} (Deadline: {goal.deadline.toLocaleDateString()})
              </Typography>
            </li>
          ))}
        </ul>
      )}
      {!isLoading && goals.length === 0 && (
        <Typography variant="h3" className="text-center">
          You have no goals yet.
        </Typography>
      )}
      {errors.length > 0 && (
        <Typography variant="h3" className="text-center">
          An error occurred:
        </Typography>
      )}
    </DashboardLayout>
  );
}