import { AuthProvider } from './AuthProvider';
import { AuthToken } from './AuthToken';
import { UserRepository } from '../../users/UserRepository';
import { Result } from '../../common/Result';
import { User } from '../../users/User';
import { JWTAuthToken } from './AuthToken'; // import: src/core/domain/auth/AuthToken.ts
import { validateUser } from '../../../presentation/web/utils/validators'; // import: src/core/presentation/web/utils/validators.ts
import { UserDto } from '../../../presentation/web/types/user'; // import: src/core/presentation/web/types/user.ts
import {  GoogleAuthProvider } from 'next-auth/providers/google'; // import: next-auth/providers/google 4.24.8
import {  FacebookAuthProvider } from 'next-auth/providers/facebook'; // import: next-auth/providers/facebook 4.24.8

export class AuthService {
  private authProvider: AuthProvider;
  private userRepository: UserRepository;

  constructor(authProvider: AuthProvider, userRepository: UserRepository) {
    this.authProvider = authProvider;
    this.userRepository = userRepository;
  }

  async registerUser(user: User): Promise<Result<User>> {
    const validationResult = validateUser(user);
    if (validationResult.isOk()) {
      const createUserResult = await this.userRepository.createUser(validationResult.value);
      if (createUserResult.isOk()) {
        const token = await this.authProvider.generateToken(createUserResult.value);
        if (token.isOk()) {
          return Result.Ok(createUserResult.value);
        }
        return Result.Err(token.error);
      }
      return Result.Err(createUserResult.error);
    }
    return Result.Err(validationResult.error);
  }

  async loginUser(email: string, password: string): Promise<Result<AuthToken>> {
    const authResult = await this.authProvider.authenticate(email, password);
    if (authResult.isOk()) {
      const userResult = await this.userRepository.getUserById(authResult.value.userId);
      if (userResult.isOk()) {
        return Result.Ok(authResult.value);
      }
      return Result.Err(userResult.error);
    }
    return Result.Err(authResult.error);
  }

  async logoutUser(token: string): Promise<Result<void>> {
    // Validate the authentication token (consider token expiry)
    // ... 

    // Invalidate the token (if necessary, depends on the authentication provider)
    // ... 

    return Result.Ok(undefined);
  }

  async getUserByToken(token: string): Promise<Result<User>> {
    // Validate the authentication token (consider token expiry)
    // ... 

    // Decode the token and retrieve user ID
    // ... 

    const userResult = await this.userRepository.getUserById(userId);
    if (userResult.isOk()) {
      return Result.Ok(userResult.value);
    }
    return Result.Err(userResult.error);
  }
}