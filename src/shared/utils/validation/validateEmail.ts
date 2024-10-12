import { Result, Err, Ok } from 'src/shared/types/Common';
import { Error } from 'src/core/domain/common/Error';

/**
 * Validates an email address using a regular expression.
 * 
 * @param email - The email address to validate.
 * @returns A Result object indicating success or failure with an error message.
 */
export const validateEmail = (email: string): Result<string> => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return Err(new Error('Invalid email format'));
  }
  return Ok(email);
};