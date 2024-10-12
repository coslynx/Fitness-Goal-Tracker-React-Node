import { Request, Response } from 'express'; // import: express 4.18.2
import { User } from '../../../domain/users/User'; // import: src/core/domain/users/User.ts
import { Result } from '../../../domain/common/Result'; // import: src/core/domain/common/Result.ts
import { Error } from '../../../domain/common/Error'; // import: src/core/domain/common/Error.ts
import { AuthService } from '../../../domain/auth/AuthService'; // import: src/core/domain/auth/AuthService.ts
import { AuthToken } from '../../../domain/auth/AuthToken'; // import: src/core/domain/auth/AuthToken.ts
import { validateUser } from '../../../presentation/web/utils/validators'; // import: src/core/presentation/web/utils/validators.ts
import { UserDto } from '../../../presentation/web/types/user'; // import: src/core/presentation/web/types/user.ts

export class AuthController {
  private authService: AuthService;

  constructor(authService: AuthService) {
    this.authService = authService;
  }

  async registerUser(req: Request, res: Response) {
    try {
      const userData: UserDto = req.body;
      const validationResult = validateUser(userData as User); // Ensure type safety for User data

      if (validationResult.isOk()) {
        const registerUserResult = await this.authService.registerUser(validationResult.value);
        if (registerUserResult.isOk()) {
          res.status(201).json({ message: 'User registered successfully', data: registerUserResult.value });
        } else {
          res.status(400).json({ message: 'Failed to register user', error: registerUserResult.error });
        }
      } else {
        res.status(400).json({ message: 'Invalid user data', error: validationResult.error });
      }
    } catch (error) {
      res.status(500).json({ message: 'Internal server error', error: error });
    }
  }

  async loginUser(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      const loginUserResult = await this.authService.loginUser(email, password);
      if (loginUserResult.isOk()) {
        res.status(200).json({ message: 'User logged in successfully', data: loginUserResult.value });
      } else {
        res.status(401).json({ message: 'Invalid email or password', error: loginUserResult.error });
      }
    } catch (error) {
      res.status(500).json({ message: 'Internal server error', error: error });
    }
  }

  async logoutUser(req: Request, res: Response) {
    try {
      const token = req.headers.authorization?.split(' ')[1];
      if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
      }

      const logoutResult = await this.authService.logoutUser(token);
      if (logoutResult.isOk()) {
        res.status(204).send(); // No content, indicating successful logout
      } else {
        res.status(400).json({ message: 'Failed to logout user', error: logoutResult.error });
      }
    } catch (error) {
      res.status(500).json({ message: 'Internal server error', error: error });
    }
  }
}