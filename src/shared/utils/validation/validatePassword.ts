import { Result, Err, Ok } from 'src/shared/types/Common';
import { Error } from 'src/core/domain/common/Error';

/**
 * Validates a password against a set of predefined rules.
 *
 * @param password - The password to validate.
 * @returns A Result object indicating success or failure with an error message.
 */
export const validatePassword = (password: string): Result<string> => {
  // Validate password length
  if (password.length < 8) {
    return Err(new Error('Password must be at least 8 characters long'));
  }

  // Validate password complexity
  if (!/[A-Z]/.test(password)) {
    return Err(new Error('Password must contain at least one uppercase letter'));
  }

  if (!/[a-z]/.test(password)) {
    return Err(new Error('Password must contain at least one lowercase letter'));
  }

  if (!/[0-9]/.test(password)) {
    return Err(new Error('Password must contain at least one number'));
  }

  // Validate password special characters
  if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
    return Err(new Error('Password must contain at least one special character'));
  }

  return Ok(password);
};