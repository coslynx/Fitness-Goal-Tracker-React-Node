import { User } from '../../users/User';
import { UserRepository } from './UserRepository';
import { Result } from '../../common/Result';

export class UserService {
  private userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  async createUser(user: User): Promise<Result<User>> {
    try {
      const createdUser = await this.userRepository.createUser(user);
      return Result.Ok(createdUser);
    } catch (error) {
      return Result.Err(error);
    }
  }

  async getUserById(userId: string): Promise<Result<User>> {
    try {
      const user = await this.userRepository.getUserById(userId);
      if (user) {
        return Result.Ok(user);
      }
      return Result.Err(new Error('User not found'));
    } catch (error) {
      return Result.Err(error);
    }
  }

  async getUsers(): Promise<Result<User[]>> {
    try {
      const users = await this.userRepository.getUsers();
      return Result.Ok(users);
    } catch (error) {
      return Result.Err(error);
    }
  }

  async updateUser(user: User): Promise<Result<User>> {
    try {
      const updatedUser = await this.userRepository.updateUser(user);
      return Result.Ok(updatedUser);
    } catch (error) {
      return Result.Err(error);
    }
  }

  async deleteUser(userId: string): Promise<Result<void>> {
    try {
      await this.userRepository.deleteUser(userId);
      return Result.Ok(undefined);
    } catch (error) {
      return Result.Err(error);
    }
  }
}