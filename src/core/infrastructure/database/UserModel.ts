import { Database } from '../../infrastructure/database/Database';
import { User } from '../../users/User';

export class UserModel {
  private database: Database;

  constructor(database: Database) {
    this.database = database;
  }

  async create(user: User): Promise<User> {
    try {
      const result = await this.database.collection('users').insertOne(user);
      return { ...user, id: result.insertedId.toString() };
    } catch (error) {
      throw new Error('Error creating user: ' + error);
    }
  }

  async findOne(filter: any): Promise<User | null> {
    try {
      const user = await this.database.collection('users').findOne(filter);
      return user ? user as User : null;
    } catch (error) {
      throw new Error('Error finding user: ' + error);
    }
  }

  async find(filter: any): Promise<User[]> {
    try {
      const users = await this.database.collection('users').find(filter).toArray();
      return users;
    } catch (error) {
      throw new Error('Error finding users: ' + error);
    }
  }

  async updateOne(filter: any, user: User): Promise<User> {
    try {
      const result = await this.database.collection('users').updateOne(filter, { $set: user });
      return result.modifiedCount > 0 ? user : null;
    } catch (error) {
      throw new Error('Error updating user: ' + error);
    }
  }

  async deleteOne(filter: any): Promise<void> {
    try {
      await this.database.collection('users').deleteOne(filter);
    } catch (error) {
      throw new Error('Error deleting user: ' + error);
    }
  }
}