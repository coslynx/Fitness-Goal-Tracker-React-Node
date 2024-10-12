import { useState, useEffect } from 'react'; // import: react 18.3.1
import { useSession } from 'next-auth/react'; // import: next-auth 4.24.8
import { Line } from 'react-chartjs-2'; // import: chart.js 4.4.4
import { useGoalStore } from '../../hooks/useGoalStore'; // import: src/core/presentation/web/hooks/useGoalStore.ts
import { Result } from '../../../../domain/common/Result'; // import: src/core/domain/common/Result.ts
import { Error } from '../../../../domain/common/Error'; // import: src/core/domain/common/Error.ts
import { Goal } from '../../../../domain/goals/Goal'; // import: src/core/domain/goals/Goal.ts
import { DashboardLayout } from '../../components/templates/DashboardLayout'; // import: src/core/presentation/web/components/templates/DashboardLayout.tsx
import { Typography } from '../../components/atoms/Typography'; // import: src/core/presentation/web/components/atoms/Typography.tsx

type ProgressChartProps = {
  goalId: string;
};

export default function ProgressChart({ goalId }: ProgressChartProps) {
  const { data: session, status } = useSession();
  const { goals, fetchGoalById, isLoading, errors } = useGoalStore();
  const [goal, setGoal] = useState<Goal | null>(null);
  const [chartData, setChartData] = useState<{
    labels: string[];
    datasets: {
      label: string;
      data: number[];
      borderColor: string;
      borderWidth: number;
    }[];
  } | null>(null);

  useEffect(() => {
    if (status === 'authenticated' && session?.user?.id) {
      fetchGoalById(goalId)
        .then((result: Result<Goal>) => {
          if (result.isOk) {
            setGoal(result.value);
          } else {
            // Handle error (e.g., display error message)
            console.error('Error fetching goal:', result.error);
          }
        })
        .catch((error: Error) => {
          // Handle error (e.g., display error message)
          console.error('Error fetching goal:', error);
        });
    }
  }, [status, session, goalId]);

  useEffect(() => {
    if (goal) {
      const chartLabels: string[] = [];
      const chartData: number[] = [];

      // Assuming goal.progress is an array of objects with 'date' and 'progress' properties
      goal.progress.forEach((progressData) => {
        chartLabels.push(new Date(progressData.date).toLocaleDateString());
        chartData.push(progressData.progress);
      });

      setChartData({
        labels: chartLabels,
        datasets: [
          {
            label: goal.type,
            data: chartData,
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1,
          },
        ],
      });
    }
  }, [goal]);

  if (status === 'loading') {
    return (
      <DashboardLayout title={`Goal Progress: ${goalId}`}>
        <Typography variant="h2" className="text-center">
          Loading...
        </Typography>
      </DashboardLayout>
    );
  }

  if (status === 'unauthenticated') {
    return (
      <DashboardLayout title={`Goal Progress: ${goalId}`}>
        <Typography variant="h2" className="text-center">
          Please sign in to view your goal progress.
        </Typography>
      </DashboardLayout>
    );
  }

  if (errors.length > 0) {
    return (
      <DashboardLayout title={`Goal Progress: ${goalId}`}>
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
    <DashboardLayout title={`Goal Progress: ${goalId}`}>
      {goal && chartData && (
        <div className="p-4">
          <Typography variant="h2" className="text-center mb-4">
            {goal.type} Progress
          </Typography>
          <Line data={chartData} options={{
            responsive: true, 
            maintainAspectRatio: false, // Disable aspect ratio
            plugins: {
              legend: {
                position: 'top',
              },
            },
          }} />
        </div>
      )}
    </DashboardLayout>
  );
}