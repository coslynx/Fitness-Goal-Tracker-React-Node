import { Goal } from '../../../domain/goals/Goal'; // import: src/core/domain/goals/Goal.ts
import { User } from '../../../domain/users/User'; // import: src/core/domain/users/User.ts
import { Result } from '../../../domain/common/Result'; // import: src/core/domain/common/Result.ts
import { Error } from '../../../domain/common/Error'; // import: src/core/domain/common/Error.ts
import { formatDate } from 'src/shared/utils/date/formatDate'; // import: src/shared/utils/date/formatDate.ts

// Function to format a goal's progress percentage.
export const formatGoalProgress = (goal: Goal): string => {
  const progressPercentage = (goal.progress / goal.target) * 100;
  return `${progressPercentage.toFixed(0)}%`;
};

// Function to format a user's goal completion status.
export const formatGoalCompletionStatus = (goal: Goal): string => {
  if (goal.isCompleted()) {
    return 'Completed';
  }
  return 'In Progress';
};

// Function to format a user's goal deadline.
export const formatGoalDeadline = (goal: Goal): string => {
  return formatDate(goal.deadline, 'MMMM dd, yyyy');
};

// Function to format a user's name.
export const formatUserName = (user: User): string => {
  return `${user.name}`;
};

// Function to format a user's email address.
export const formatUserEmail = (user: User): string => {
  return `${user.email}`;
};

// Function to format a date for display.
export const formatDateForDisplay = (date: Date): string => {
  return formatDate(date, 'MMMM dd, yyyy');
};

// Function to format a number for display.
export const formatNumberForDisplay = (number: number): string => {
  return number.toLocaleString();
};