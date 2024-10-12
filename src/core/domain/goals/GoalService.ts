import { Goal } from './Goal';
import { GoalRepository } from './GoalRepository';
import { Result } from '../../common/Result';
import { User } from '../../users/User';

export class GoalService {
  private goalRepository: GoalRepository;

  constructor(goalRepository: GoalRepository) {
    this.goalRepository = goalRepository;
  }

  async createGoal(goal: Goal, userId: string): Promise<Result<Goal>> {
    // Validate goal data (e.g., deadline, target values)
    // ...

    // Create goal in the database
    const createdGoal = await this.goalRepository.createGoal(goal, userId);
    if (createdGoal.isOk()) {
      return Result.Ok(createdGoal.value);
    }
    return Result.Err(createdGoal.error);
  }

  async getGoalsByUserId(userId: string): Promise<Result<Goal[]>> {
    // Retrieve goals from the database for the specified user
    const goals = await this.goalRepository.getGoalsByUserId(userId);
    if (goals.isOk()) {
      return Result.Ok(goals.value);
    }
    return Result.Err(goals.error);
  }

  async updateGoal(goal: Goal, userId: string): Promise<Result<Goal>> {
    // Validate goal data (e.g., deadline, target values)
    // ...

    // Update the goal in the database
    const updatedGoal = await this.goalRepository.updateGoal(goal, userId);
    if (updatedGoal.isOk()) {
      return Result.Ok(updatedGoal.value);
    }
    return Result.Err(updatedGoal.error);
  }

  async deleteGoal(goalId: string, userId: string): Promise<Result<void>> {
    // Delete goal from the database
    const result = await this.goalRepository.deleteGoal(goalId, userId);
    if (result.isOk()) {
      return Result.Ok(undefined);
    }
    return Result.Err(result.error);
  }

  async getGoalProgress(goalId: string, userId: string): Promise<Result<number>> {
    // Retrieve goal progress from the database
    const progress = await this.goalRepository.getGoalProgress(goalId, userId);
    if (progress.isOk()) {
      return Result.Ok(progress.value);
    }
    return Result.Err(progress.error);
  }

  async updateGoalProgress(goalId: string, userId: string, progress: number): Promise<Result<void>> {
    // Update goal progress in the database
    const result = await this.goalRepository.updateGoalProgress(goalId, userId, progress);
    if (result.isOk()) {
      return Result.Ok(undefined);
    }
    return Result.Err(result.error);
  }

  async isGoalCompleted(goalId: string, userId: string): Promise<Result<boolean>> {
    // Check if the goal is completed based on progress
    const goal = await this.goalRepository.getGoalById(goalId, userId);
    if (goal.isOk()) {
      return Result.Ok(goal.value.isCompleted());
    }
    return Result.Err(goal.error);
  }

  async getGoalById(goalId: string, userId: string): Promise<Result<Goal>> {
    // Retrieve the goal by ID from the database
    const goal = await this.goalRepository.getGoalById(goalId, userId);
    if (goal.isOk()) {
      return Result.Ok(goal.value);
    }
    return Result.Err(goal.error);
  }
}