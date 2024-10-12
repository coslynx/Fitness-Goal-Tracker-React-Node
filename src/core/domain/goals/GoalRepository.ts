import { Goal } from './Goal';
import { Database } from '../../infrastructure/database/Database';
import { GoalModel } from '../../infrastructure/database/GoalModel';
import { Result } from '../../common/Result';
import { User } from '../../users/User';

export abstract class GoalRepository {
  protected database: Database;
  protected goalModel: GoalModel;

  constructor(database: Database, goalModel: GoalModel) {
    this.database = database;
    this.goalModel = goalModel;
  }

  abstract createGoal(goal: Goal, userId: string): Promise<Result<Goal>>;
  abstract getGoalsByUserId(userId: string): Promise<Result<Goal[]>>;
  abstract updateGoal(goal: Goal, userId: string): Promise<Result<Goal>>;
  abstract deleteGoal(goalId: string, userId: string): Promise<Result<void>>;
  abstract getGoalProgress(goalId: string, userId: string): Promise<Result<number>>;
  abstract updateGoalProgress(goalId: string, userId: string, progress: number): Promise<Result<void>>;
  abstract getGoalById(goalId: string, userId: string): Promise<Result<Goal>>;
}

export class MongoGoalRepository extends GoalRepository {
  async createGoal(goal: Goal, userId: string): Promise<Result<Goal>> {
    try {
      const goalData = await this.goalModel.create(goal, userId);
      return Result.Ok(goalData);
    } catch (error) {
      return Result.Err(error);
    }
  }

  async getGoalsByUserId(userId: string): Promise<Result<Goal[]>> {
    try {
      const goals = await this.goalModel.find({ userId });
      return Result.Ok(goals);
    } catch (error) {
      return Result.Err(error);
    }
  }

  async updateGoal(goal: Goal, userId: string): Promise<Result<Goal>> {
    try {
      const updatedGoal = await this.goalModel.update(goal, userId);
      return Result.Ok(updatedGoal);
    } catch (error) {
      return Result.Err(error);
    }
  }

  async deleteGoal(goalId: string, userId: string): Promise<Result<void>> {
    try {
      await this.goalModel.deleteOne({ _id: goalId, userId });
      return Result.Ok(undefined);
    } catch (error) {
      return Result.Err(error);
    }
  }

  async getGoalProgress(goalId: string, userId: string): Promise<Result<number>> {
    try {
      const goal = await this.goalModel.findOne({ _id: goalId, userId });
      if (goal) {
        return Result.Ok(goal.progress);
      }
      return Result.Err(new Error('Goal not found'));
    } catch (error) {
      return Result.Err(error);
    }
  }

  async updateGoalProgress(goalId: string, userId: string, progress: number): Promise<Result<void>> {
    try {
      await this.goalModel.updateOne({ _id: goalId, userId }, { progress });
      return Result.Ok(undefined);
    } catch (error) {
      return Result.Err(error);
    }
  }

  async getGoalById(goalId: string, userId: string): Promise<Result<Goal>> {
    try {
      const goal = await this.goalModel.findOne({ _id: goalId, userId });
      if (goal) {
        return Result.Ok(goal);
      }
      return Result.Err(new Error('Goal not found'));
    } catch (error) {
      return Result.Err(error);
    }
  }
}