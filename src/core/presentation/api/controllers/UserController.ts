import { Request, Response } from 'express'; // import: express 4.18.2
import { User } from '../../../domain/users/User'; // import: src/core/domain/users/User.ts
import { Result } from '../../../domain/common/Result'; // import: src/core/domain/common/Result.ts
import { Error } from '../../../domain/common/Error'; // import: src/core/domain/common/Error.ts
import { UserService } from '../../../domain/users/UserService'; // import: src/core/domain/users/UserService.ts
import { validateUser } from '../../../presentation/web/utils/validators'; // import: src/core/presentation/web/utils/validators.ts
import { UserDto } from '../../../presentation/web/types/user'; // import: src/core/presentation/web/types/user.ts

export class UserController {
  private userService: UserService;

  constructor(userService: UserService) {
    this.userService = userService;
  }

  async createUser(req: Request, res: Response) {
    try {
      const userData: UserDto = req.body;
      const validationResult = validateUser(userData as User); // Ensure type safety for User data

      if (validationResult.isOk()) {
        const createUserResult = await this.userService.createUser(validationResult.value);
        if (createUserResult.isOk()) {
          res.status(201).json({ message: 'User created successfully', data: createUserResult.value });
        } else {
          res.status(400).json({ message: 'Failed to create user', error: createUserResult.error });
        }
      } else {
        res.status(400).json({ message: 'Invalid user data', error: validationResult.error });
      }
    } catch (error) {
      res.status(500).json({ message: 'Internal server error', error: error });
    }
  }

  async getUserById(req: Request, res: Response) {
    try {
      const userId = req.params.id;

      const getUserResult = await this.userService.getUserById(userId);
      if (getUserResult.isOk()) {
        res.status(200).json({ message: 'User retrieved successfully', data: getUserResult.value });
      } else {
        res.status(404).json({ message: 'User not found', error: getUserResult.error });
      }
    } catch (error) {
      res.status(500).json({ message: 'Internal server error', error: error });
    }
  }

  async getUsers(req: Request, res: Response) {
    try {
      const getUsersResult = await this.userService.getUsers();
      if (getUsersResult.isOk()) {
        res.status(200).json({ message: 'Users retrieved successfully', data: getUsersResult.value });
      } else {
        res.status(500).json({ message: 'Failed to retrieve users', error: getUsersResult.error });
      }
    } catch (error) {
      res.status(500).json({ message: 'Internal server error', error: error });
    }
  }

  async updateUser(req: Request, res: Response) {
    try {
      const userId = req.params.id;
      const userData: UserDto = req.body;
      const validationResult = validateUser(userData as User); // Ensure type safety for User data

      if (validationResult.isOk()) {
        const updateUserResult = await this.userService.updateUser(validationResult.value);
        if (updateUserResult.isOk()) {
          res.status(200).json({ message: 'User updated successfully', data: updateUserResult.value });
        } else {
          res.status(400).json({ message: 'Failed to update user', error: updateUserResult.error });
        }
      } else {
        res.status(400).json({ message: 'Invalid user data', error: validationResult.error });
      }
    } catch (error) {
      res.status(500).json({ message: 'Internal server error', error: error });
    }
  }

  async deleteUser(req: Request, res: Response) {
    try {
      const userId = req.params.id;

      const deleteUserResult = await this.userService.deleteUser(userId);
      if (deleteUserResult.isOk()) {
        res.status(204).send(); // No content, indicating successful deletion
      } else {
        res.status(400).json({ message: 'Failed to delete user', error: deleteUserResult.error });
      }
    } catch (error) {
      res.status(500).json({ message: 'Internal server error', error: error });
    }
  }
}