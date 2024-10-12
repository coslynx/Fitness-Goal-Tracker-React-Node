import { useState, useEffect } from 'react'; // import: react 18.3.1
import { useTheme } from 'next-themes'; // import: next-themes 0.2.5
import clsx from 'clsx'; // import: clsx 1.2.1
import { Input } from '../atoms/Input'; // import: src/core/presentation/web/components/atoms/Input.tsx
import { Typography } from '../atoms/Typography'; // import: src/core/presentation/web/components/atoms/Typography.tsx

interface UseFormProps<T> {
  initialValues: T;
  onSubmit: (values: T) => Promise<void> | void;
}

interface UseFormReturn<T> {
  values: T;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (event: React.FormEvent) => void;
}

export const useForm = <T extends Record<string, any>>(props: UseFormProps<T>): UseFormReturn<T> => {
  const { initialValues, onSubmit } = props;
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    setValues(initialValues);
  }, [initialValues]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setErrors({});

    try {
      await onSubmit(values);
    } catch (error) {
      // Handle errors based on the response or error type
      console.error(error);
      if (error instanceof Error) {
        setErrors({ ...errors, general: error.message });
      }
    }
  };

  return { values, handleChange, handleSubmit };
};