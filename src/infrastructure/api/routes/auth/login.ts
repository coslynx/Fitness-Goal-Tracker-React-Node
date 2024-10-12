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
}