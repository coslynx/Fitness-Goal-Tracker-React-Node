import { Result } from 'src/shared/types/Common';
import { Error } from 'src/core/domain/common/Error';

/**
 * Capitalizes the first letter of a string.
 *
 * @param str - The string to capitalize.
 * @returns A new string with the first letter capitalized, or an error if the input is invalid.
 */
export const capitalize = (str: string): Result<string> => {
  if (typeof str !== 'string') {
    return Result.Err(new Error('Input must be a string'));
  }

  if (str.trim() === '') {
    return Result.Err(new Error('Input string cannot be empty'));
  }

  return Result.Ok(str.charAt(0).toUpperCase() + str.slice(1));
};