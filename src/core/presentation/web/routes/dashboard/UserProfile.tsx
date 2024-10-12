import { useState } from 'react'; // import: react 18.3.1
import { useForm } from '../../hooks/useForm'; // import: src/core/presentation/web/hooks/useForm.ts
import { useAuth } from '../../hooks/useAuth'; // import: src/core/presentation/web/hooks/useAuth.ts
import { Button } from '../../components/atoms/Button'; // import: src/core/presentation/web/components/atoms/Button.tsx
import { Input } from '../../components/atoms/Input'; // import: src/core/presentation/web/components/atoms/Input.tsx
import { Card } from '../../shared/ui-components/Card'; // import: src/shared/ui-components/Card.tsx
import { FormField } from '../../components/molecules/FormField'; // import: src/core/presentation/web/components/molecules/FormField.tsx
import { Typography } from '../../components/atoms/Typography'; // import: src/core/presentation/web/components/atoms/Typography.tsx
import { DashboardLayout } from '../../components/templates/DashboardLayout'; // import: src/core/presentation/web/components/templates/DashboardLayout.tsx
import { Error } from '../../domain/common/Error'; // import: src/core/domain/common/Error.ts

export default function UserProfile() {
  const { user, updateUser, isLoading } = useAuth(); // import: src/core/presentation/web/hooks/useAuth.ts
  const [errors, setErrors] = useState<Error[]>([]);
  const { values, handleChange, handleSubmit } = useForm({
    initialValues: {
      name: user?.name || '',
      email: user?.email || '',
    },
    onSubmit: async (values) => {
      const result = await updateUser(values);
      if (result.isOk) {
        // Update user state after successful update
      } else {
        setErrors([result.error]);
      }
    },
  });

  return (
    <DashboardLayout title="User Profile">
      <Card className="w-full max-w-md mx-auto p-6 space-y-6">
        <Typography variant="h2" className="text-center">
          User Profile
        </Typography>
        {errors.length > 0 && (
          <ul className="text-red-500">
            {errors.map((error) => (
              <li key={error.message}>{error.message}</li>
            ))}
          </ul>
        )}
        <form onSubmit={handleSubmit}>
          <FormField label="Name" name="name">
            <Input
              type="text"
              value={values.name}
              onChange={handleChange}
              required
            />
          </FormField>
          <FormField label="Email" name="email" disabled>
            <Input
              type="email"
              value={values.email}
              onChange={handleChange}
              required
            />
          </FormField>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? 'Loading...' : 'Save Changes'}
          </Button>
        </form>
      </Card>
    </DashboardLayout>
  );
}