import { Request, Response } from 'express'; // import: express 4.18.2
import { User } from '../../../domain/users/User'; // import: src/core/domain/users/User.ts
import { Result } from '../../../domain/common/Result'; // import: src/core/domain/common/Result.ts
import { Error } from '../../../domain/common/Error'; // import: src/core/domain/common/Error.ts
import { UserService } from '../../../domain/users/UserService'; // import: src/core/domain/users/UserService.ts
import { UserDto } from '../../../presentation/web/types/user'; // import: src/core/presentation/web/types/user.ts

export class UserController {
  private userService: UserService;

  constructor(userService: UserService) {
    this.userService = userService;
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
}