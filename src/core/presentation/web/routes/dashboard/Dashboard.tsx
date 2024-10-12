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

export default function Dashboard() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [goals, setGoals] = useState<Result<any>[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Error[]>([]);

  useEffect(() => {
    if (status === 'authenticated' && session?.user?.id) {
      setIsLoading(true);
      const database = new Database({ url: process.env.DATABASE_URL }); // import: src/core/infrastructure/database/config.ts
      const goalModel = new GoalModel(database);
      const goalRepository = new MongoGoalRepository(database, goalModel);
      const goalService = new GoalService(goalRepository); 
      goalService.getGoalsByUserId(session.user.id)
        .then((goalsData) => {
          setGoals(goalsData);
          setIsLoading(false);
        })
        .catch((error) => {
          setErrors([error]);
          setIsLoading(false);
        });
    }
  }, [status, session]);

  if (status === 'loading') {
    return (
      <DashboardLayout title="Dashboard">
        <Typography variant="h2" className="text-center">
          Loading...
        </Typography>
      </DashboardLayout>
    );
  }

  if (status === 'unauthenticated') {
    return (
      <DashboardLayout title="Dashboard">
        <Typography variant="h2" className="text-center">
          Please sign in to view the dashboard.
        </Typography>
      </DashboardLayout>
    );
  }

  if (errors.length > 0) {
    return (
      <DashboardLayout title="Dashboard">
        <Typography variant="h2" className="text-center">
          An error occurred:
        </Typography>
        <ul className="text-red-500">
          {errors.map((error) => (
            <li key={error.message}>{error.message}</li>
          ))}
        </ul>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout title="Dashboard">
      <Typography variant="h2" className="text-center">
        Welcome, {session?.user?.name}!
      </Typography>
      {isLoading && (
        <Typography variant="h2" className="text-center">
          Loading goals...
        </Typography>
      )}
      {!isLoading && goals.length > 0 && (
        <div>
          <Typography variant="h3" className="text-center">
            Your Goals:
          </Typography>
          <ul>
            {goals.map((goal) => (
              <li key={goal.value.id}>
                <Typography variant="body1">
                  {goal.value.type}: {goal.value.target} (Deadline: {goal.value.deadline.toLocaleDateString()})
                </Typography>
              </li>
            ))}
          </ul>
        </div>
      )}
      {!isLoading && goals.length === 0 && (
        <Typography variant="h3" className="text-center">
          You have no goals yet.
        </Typography>
      )}
    </DashboardLayout>
  );
}