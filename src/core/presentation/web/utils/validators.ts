import { Goal } from '../../../domain/goals/Goal'; // import: src/core/domain/goals/Goal.ts
import { User } from '../../../domain/users/User'; // import: src/core/domain/users/User.ts
import { Result } from '../../../domain/common/Result'; // import: src/core/domain/common/Result.ts
import { Error } from '../../../domain/common/Error'; // import: src/core/domain/common/Error.ts
import { validateEmail } from 'src/shared/utils/validation/validateEmail'; // import: src/shared/utils/validation/validateEmail.ts
import { validatePassword } from 'src/shared/utils/validation/validatePassword'; // import: src/shared/utils/validation/validatePassword.ts

// Validator functions

const validateGoalType = (type: string): Result<string> => {
  if (type.trim() === '') {
    return Result.Err(new Error('Goal type cannot be empty'));
  }
  return Result.Ok(type);
};

const validateGoalTarget = (target: number): Result<number> => {
  if (target <= 0) {
    return Result.Err(new Error('Goal target must be a positive number'));
  }
  return Result.Ok(target);
};

const validateGoalDeadline = (deadline: Date): Result<Date> => {
  if (deadline.getTime() < new Date().getTime()) {
    return Result.Err(new Error('Goal deadline must be in the future'));
  }
  return Result.Ok(deadline);
};

// Validation helper functions

const validateUserEmail = (email: string): Result<string> => {
  if (!validateEmail(email).isOk) {
    return Result.Err(new Error('Invalid email format'));
  }
  return Result.Ok(email);
};

const validateUserPassword = (password: string): Result<string> => {
  if (!validatePassword(password).isOk) {
    return Result.Err(new Error('Password must meet the following requirements: [Password requirements]'));
  }
  return Result.Ok(password);
};

// Main Validation Functions

export const validateGoal = (goal: Goal, userId: string): Result<Goal> => {
  // Validate goal type
  const typeResult = validateGoalType(goal.type);
  if (!typeResult.isOk) {
    return Result.Err(typeResult.error);
  }

  // Validate goal target
  const targetResult = validateGoalTarget(goal.target);
  if (!targetResult.isOk) {
    return Result.Err(targetResult.error);
  }

  // Validate goal deadline
  const deadlineResult = validateGoalDeadline(goal.deadline);
  if (!deadlineResult.isOk) {
    return Result.Err(deadlineResult.error);
  }

  return Result.Ok(goal);
};

export const validateUser = (user: User): Result<User> => {
  // Validate user email
  const emailResult = validateUserEmail(user.email);
  if (!emailResult.isOk) {
    return Result.Err(emailResult.error);
  }

  // Validate user password
  const passwordResult = validateUserPassword(user.password!);
  if (!passwordResult.isOk) {
    return Result.Err(passwordResult.error);
  }

  return Result.Ok(user);
};