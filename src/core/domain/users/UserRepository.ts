import { User } from '../../users/User';
import { Result } from '../../common/Result';
import { Database } from '../../infrastructure/database/Database';
import { UserModel } from '../../infrastructure/database/UserModel';

export abstract class UserRepository {
  protected database: Database;
  protected userModel: UserModel;

  constructor(database: Database, userModel: UserModel) {
    this.database = database;
    this.userModel = userModel;
  }

  abstract createUser(user: User): Promise<Result<User>>;
  abstract getUserById(userId: string): Promise<Result<User | null>>;
  abstract getUsers(): Promise<Result<User[]>>;
  abstract updateUser(user: User): Promise<Result<User>>;
  abstract deleteUser(userId: string): Promise<Result<void>>;
}

export class MongoUserRepository extends UserRepository {
  async createUser(user: User): Promise<Result<User>> {
    try {
      const createdUser = await this.userModel.create(user);
      return Result.Ok(createdUser);
    } catch (error) {
      return Result.Err(error);
    }
  }

  async getUserById(userId: string): Promise<Result<User | null>> {
    try {
      const user = await this.userModel.findOne({ _id: userId });
      return Result.Ok(user);
    } catch (error) {
      return Result.Err(error);
    }
  }

  async getUsers(): Promise<Result<User[]>> {
    try {
      const users = await this.userModel.find({});
      return Result.Ok(users);
    } catch (error) {
      return Result.Err(error);
    }
  }

  async updateUser(user: User): Promise<Result<User>> {
    try {
      const updatedUser = await this.userModel.updateOne({ _id: user.id }, user);
      return Result.Ok(updatedUser);
    } catch (error) {
      return Result.Err(error);
    }
  }

  async deleteUser(userId: string): Promise<Result<void>> {
    try {
      await this.userModel.deleteOne({ _id: userId });
      return Result.Ok(undefined);
    } catch (error) {
      return Result.Err(error);
    }
  }
}