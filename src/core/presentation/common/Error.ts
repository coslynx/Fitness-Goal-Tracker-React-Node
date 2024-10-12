import { Error as SharedError } from 'src/shared/types/Common';

export interface Error extends SharedError {
  // Add any specific error properties for your MVP here
  // e.g., 
  // errorCode: string;
  // additionalInfo: string;
}

export class CustomError extends Error {
  // Add any custom error methods if needed
}