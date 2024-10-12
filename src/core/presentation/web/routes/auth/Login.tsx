import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from '../../hooks/useForm';
import { useAuth } from '../../hooks/useAuth';
import { Button } from '../../components/atoms/Button';
import { Input } from '../../components/atoms/Input';
import { Card } from '../../shared/ui-components/Card';
import { FormField } from '../../components/molecules/FormField';
import { Typography } from '../../components/atoms/Typography';
import { AuthLayout } from '../../components/templates/AuthLayout';
import { Error } from '../../domain/common/Error';

export default function Login() {
  const router = useRouter();
  const { loginUser, isLoading } = useAuth();
  const [errors, setErrors] = useState<Error[]>([]);
  const { values, handleChange, handleSubmit } = useForm({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: async (values) => {
      const result = await loginUser(values);
      if (result.isOk) {
        router.push('/dashboard');
      } else {
        setErrors([result.error]);
      }
    },
  });

  return (
    <AuthLayout title="Login">
      <Card className="w-full max-w-md mx-auto p-6 space-y-6">
        <Typography variant="h2" className="text-center">
          Login
        </Typography>
        {errors.length > 0 && (
          <ul className="text-red-500">
            {errors.map((error) => (
              <li key={error.message}>{error.message}</li>
            ))}
          </ul>
        )}
        <form onSubmit={handleSubmit}>
          <FormField label="Email" name="email">
            <Input
              type="email"
              value={values.email}
              onChange={handleChange}
              required
            />
          </FormField>
          <FormField label="Password" name="password">
            <Input
              type="password"
              value={values.password}
              onChange={handleChange}
              required
            />
          </FormField>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? 'Loading...' : 'Login'}
          </Button>
        </form>
      </Card>
    </AuthLayout>
  );
}