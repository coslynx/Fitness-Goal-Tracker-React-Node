import { useState, useEffect } from 'react'; // import: react 18.3.1
import { useForm } from '../../hooks/useForm'; // import: src/core/presentation/web/hooks/useForm.ts
import { useAuth } from '../../hooks/useAuth'; // import: src/core/presentation/web/hooks/useAuth.ts
import { Button } from '../../components/atoms/Button'; // import: src/core/presentation/web/components/atoms/Button.tsx
import { Input } from '../../components/atoms/Input'; // import: src/core/presentation/web/components/atoms/Input.tsx
import { Card } from '../../shared/ui-components/Card'; // import: src/shared/ui-components/Card.tsx
import { FormField } from '../../components/molecules/FormField'; // import: src/core/presentation/web/components/molecules/FormField.tsx
import { Typography } from '../../components/atoms/Typography'; // import: src/core/presentation/web/components/atoms/Typography.tsx
import { DashboardLayout } from '../../components/templates/DashboardLayout'; // import: src/core/presentation/web/components/templates/DashboardLayout.tsx
import { Error } from '../../domain/common/Error'; // import: src/core/domain/common/Error.ts
import { GoalService } from '../../../domain/goals/GoalService'; // import: src/core/domain/goals/GoalService.ts
import { Goal } from '../../../domain/goals/Goal'; // import: src/core/domain/goals/Goal.ts
import { Result } from '../../../domain/common/Result'; // import: src/core/domain/common/Result.ts
import { useGoalStore } from '../../hooks/useGoalStore'; // import: src/core/presentation/web/hooks/useGoalStore.ts

type GoalFormProps = {
  goalId?: string;
};

export default function GoalForm({ goalId }: GoalFormProps) {
  const { user } = useAuth();
  const { createGoal, updateGoal, getGoalById } = useGoalStore();
  const [errors, setErrors] = useState<Error[]>([]);
  const { values, handleChange, handleSubmit } = useForm({
    initialValues: {
      type: '',
      target: '',
      deadline: '',
    },
    onSubmit: async (values) => {
      const goal: Goal = {
        id: goalId || '',
        type: values.type,
        target: Number(values.target),
        deadline: new Date(values.deadline),
        progress: 0,
        userId: user?.id || '',
        isCompleted: () => {
          return false;
        },
      };
      if (goalId) {
        const result = await updateGoal(goal);
        if (result.isOk) {
          // Handle successful update
        } else {
          setErrors([result.error]);
        }
      } else {
        const result = await createGoal(goal);
        if (result.isOk) {
          // Handle successful creation
        } else {
          setErrors([result.error]);
        }
      }
    },
  });

  useEffect(() => {
    if (goalId) {
      getGoalById(goalId)
        .then((result) => {
          if (result.isOk) {
            values.type = result.value.type;
            values.target = result.value.target.toString();
            values.deadline = result.value.deadline.toISOString().slice(0, 10);
          } else {
            setErrors([result.error]);
          }
        })
        .catch((error) => {
          setErrors([error]);
        });
    }
  }, [goalId]);

  return (
    <DashboardLayout title={goalId ? 'Edit Goal' : 'Create Goal'}>
      <Card className="w-full max-w-md mx-auto p-6 space-y-6">
        <Typography variant="h2" className="text-center">
          {goalId ? 'Edit Goal' : 'Create Goal'}
        </Typography>
        {errors.length > 0 && (
          <ul className="text-red-500">
            {errors.map((error) => (
              <li key={error.message}>{error.message}</li>
            ))}
          </ul>
        )}
        <form onSubmit={handleSubmit}>
          <FormField label="Type" name="type">
            <Input
              type="text"
              value={values.type}
              onChange={handleChange}
              required
            />
          </FormField>
          <FormField label="Target" name="target">
            <Input
              type="number"
              value={values.target}
              onChange={handleChange}
              required
            />
          </FormField>
          <FormField label="Deadline" name="deadline">
            <Input
              type="date"
              value={values.deadline}
              onChange={handleChange}
              required
            />
          </FormField>
          <Button type="submit" disabled={false}>
            {goalId ? 'Save Changes' : 'Create Goal'}
          </Button>
        </form>
      </Card>
    </DashboardLayout>
  );
}