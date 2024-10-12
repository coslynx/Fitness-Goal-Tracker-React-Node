import { Database } from '../../infrastructure/database/Database';
import { Goal } from '../../domain/goals/Goal';

export class GoalModel {
  private database: Database;

  constructor(database: Database) {
    this.database = database;
  }

  async create(goal: Goal, userId: string): Promise<Goal> {
    try {
      const result = await this.database.collection('goals').insertOne({
        ...goal,
        userId,
      });
      return { ...goal, id: result.insertedId.toString() };
    } catch (error) {
      throw new Error('Error creating goal: ' + error);
    }
  }

  async findOne(filter: any): Promise<Goal | null> {
    try {
      const goal = await this.database.collection('goals').findOne(filter);
      return goal ? goal as Goal : null;
    } catch (error) {
      throw new Error('Error finding goal: ' + error);
    }
  }

  async find(filter: any): Promise<Goal[]> {
    try {
      const goals = await this.database.collection('goals').find(filter).toArray();
      return goals;
    } catch (error) {
      throw new Error('Error finding goals: ' + error);
    }
  }

  async update(goal: Goal, userId: string): Promise<Goal> {
    try {
      const result = await this.database
        .collection('goals')
        .updateOne({ _id: goal.id, userId }, { $set: goal });
      return result.modifiedCount > 0 ? goal : null;
    } catch (error) {
      throw new Error('Error updating goal: ' + error);
    }
  }

  async deleteOne(filter: any): Promise<void> {
    try {
      await this.database.collection('goals').deleteOne(filter);
    } catch (error) {
      throw new Error('Error deleting goal: ' + error);
    }
  }
}