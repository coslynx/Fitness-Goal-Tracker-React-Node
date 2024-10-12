import { AuthService } from '../../../../src/core/domain/auth/AuthService'; // import: src/core/domain/auth/AuthService.ts
import { AuthProvider } from '../../../../src/core/domain/auth/AuthProvider'; // import: src/core/domain/auth/AuthProvider.ts
import { AuthToken } from '../../../../src/core/domain/auth/AuthToken'; // import: src/core/domain/auth/AuthToken.ts
import { UserRepository } from '../../../../src/core/domain/users/UserRepository'; // import: src/core/domain/users/UserRepository.ts
import { Result, Ok, Err } from '../../../../src/core/domain/common/Result'; // import: src/core/domain/common/Result.ts
import { User } from '../../../../src/core/domain/users/User'; // import: src/core/domain/users/User.ts
import { MongoUserRepository } from '../../../../src/core/domain/users/UserRepository'; // import: src/core/domain/users/UserRepository.ts
import { Database } from '../../../../src/core/infrastructure/database/Database'; // import: src/core/infrastructure/database/Database.ts
import { UserModel } from '../../../../src/core/infrastructure/database/UserModel'; // import: src/core/infrastructure/database/UserModel.ts
import { GoogleAuthProvider } from '../../../../src/core/infrastructure/auth/GoogleAuthProvider'; // import: src/core/infrastructure/auth/GoogleAuthProvider.ts
import { FacebookAuthProvider } from '../../../../src/core/infrastructure/auth/FacebookAuthProvider'; // import: src/core/infrastructure/auth/FacebookAuthProvider.ts
import {  GoogleAuthProvider } from 'next-auth/providers/google'; // import: next-auth/providers/google 4.24.8
import {  FacebookAuthProvider } from 'next-auth/providers/facebook'; // import: next-auth/providers/facebook 4.24.8

describe('AuthService', () => {
  let authService: AuthService;
  let authProvider: AuthProvider;
  let userRepository: UserRepository;
  let database: Database;
  let userModel: UserModel;

  beforeEach(() => {
    database = new Database({ url: process.env.DATABASE_URL }); // import: src/core/infrastructure/database/config.ts
    userModel = new UserModel(database);
    userRepository = new MongoUserRepository(database, userModel);
    authProvider = new GoogleAuthProvider(); // or facebookAuthProvider
    authService = new AuthService(authProvider, userRepository);
  });

  afterEach(async () => {
    await database.disconnect();
  });

  it('should register a new user', async () => {
    const user: User = {
      id: 'user123',
      email: 'test@example.com',
      password: 'password123',
      name: 'Test User',
      goals: [],
      progress: [],
    };

    const registerUserResult = await authService.registerUser(user);

    expect(registerUserResult.isOk).toBe(true);
    expect(registerUserResult.value).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        email: 'test@example.com',
        name: 'Test User',
      })
    );
  });

  it('should login a user with valid credentials', async () => {
    const email = 'test@example.com';
    const password = 'password123';

    const loginUserResult = await authService.loginUser(email, password);

    expect(loginUserResult.isOk).toBe(true);
    expect(loginUserResult.value).toEqual(
      expect.objectContaining({
        token: expect.any(String),
        userId: expect.any(String),
      })
    );
  });

  it('should handle invalid login credentials', async () => {
    const email = 'test@example.com';
    const password = 'incorrectpassword';

    const loginUserResult = await authService.loginUser(email, password);

    expect(loginUserResult.isOk).toBe(false);
    expect(loginUserResult.error).toBeDefined();
  });

  it('should logout a user', async () => {
    const token = 'validtoken123';

    const logoutUserResult = await authService.logoutUser(token);

    expect(logoutUserResult.isOk).toBe(true);
  });

  it('should retrieve a user by token', async () => {
    const token = 'validtoken123';

    const getUserByTokenResult = await authService.getUserByToken(token);

    expect(getUserByTokenResult.isOk).toBe(true);
    expect(getUserByTokenResult.value).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        email: expect.any(String),
        name: expect.any(String),
      })
    );
  });

  it('should handle invalid authentication token', async () => {
    const token = 'invalidtoken';

    const getUserByTokenResult = await authService.getUserByToken(token);

    expect(getUserByTokenResult.isOk).toBe(false);
    expect(getUserByTokenResult.error).toBeDefined();
  });
});