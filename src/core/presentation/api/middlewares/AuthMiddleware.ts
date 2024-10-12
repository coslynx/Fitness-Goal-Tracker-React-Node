import { Request, Response, NextFunction } from 'express'; // import: express 4.18.2
import { AuthToken } from '../../../domain/auth/AuthToken'; // import: src/core/domain/auth/AuthToken.ts
import { User } from '../../../domain/users/User'; // import: src/core/domain/users/User.ts
import { Result } from '../../../domain/common/Result'; // import: src/core/domain/common/Result.ts
import { Error } from '../../../domain/common/Error'; // import: src/core/domain/common/Error.ts
import { AuthService } from '../../../domain/auth/AuthService'; // import: src/core/domain/auth/AuthService.ts
import { JWTAuthToken } from '../../../domain/auth/AuthToken'; // import: src/core/domain/auth/AuthToken.ts

export class AuthMiddleware {
  private authService: AuthService;

  constructor(authService: AuthService) {
    this.authService = authService;
  }

  async authenticate(req: Request, res: Response, next: NextFunction) {
    try {
      const token = req.headers.authorization?.split(' ')[1];
      if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
      }
      const verifyTokenResult = await this.authService.verifyToken(token);
      if (verifyTokenResult.isOk()) {
        req.user = verifyTokenResult.value;
        next();
      } else {
        return res.status(401).json({ message: 'Invalid token' });
      }
    } catch (error) {
      return res.status(500).json({ message: 'Internal server error', error });
    }
  }
}