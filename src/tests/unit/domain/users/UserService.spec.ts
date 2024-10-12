import { User } from '../../../../src/core/domain/users/User'; // import: src/core/domain/users/User.ts
import { UserService } from '../../../../src/core/domain/users/UserService'; // import: src/core/domain/users/UserService.ts
import { UserRepository } from '../../../../src/core/domain/users/UserRepository'; // import: src/core/domain/users/UserRepository.ts
import { Result, Ok, Err } from '../../../../src/core/domain/common/Result'; // import: src/core/domain/common/Result.ts
import { MongoUserRepository } from '../../../../src/core/domain/users/UserRepository'; // import: src/core/domain/users/UserRepository.ts
import { Database } from '../../../../src/core/infrastructure/database/Database'; // import: src/core/infrastructure/database/Database.ts
import { UserModel } from '../../../../src/core/infrastructure/database/UserModel'; // import: src/core/infrastructure/database/UserModel.ts

describe('UserService', () => {
  let userService: UserService;
  let userRepository: UserRepository;
  let database: Database;
  let userModel: UserModel;

  beforeEach(() => {
    database = new Database({ url: process.env.DATABASE_URL }); // import: src/core/infrastructure/database/config.ts
    userModel = new UserModel(database);
    userRepository = new MongoUserRepository(database, userModel);
    userService = new UserService(userRepository);
  });

  afterEach(async () => {
    await database.disconnect();
  });

  it('should create a new user', async () => {
    const user: User = {
      id: 'user123',
      email: 'test@example.com',
      password: 'password123',
      name: 'Test User',
      goals: [],
      progress: [],
    };

    const createUserResult = await userService.createUser(user);

    expect(createUserResult.isOk).toBe(true);
    expect(createUserResult.value).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        email: 'test@example.com',
        name: 'Test User',
      })
    );
  });

  it('should retrieve a user by ID', async () => {
    const userId = 'user123';
    const user: User = {
      id: userId,
      email: 'test@example.com',
      password: 'password123',
      name: 'Test User',
      goals: [],
      progress: [],
    };

    await userService.createUser(user);

    const getUserResult = await userService.getUserById(userId);

    expect(getUserResult.isOk).toBe(true);
    expect(getUserResult.value).toEqual(
      expect.objectContaining({
        id: userId,
        email: 'test@example.com',
        name: 'Test User',
      })
    );
  });

  it('should retrieve all users', async () => {
    const user1: User = {
      id: 'user123',
      email: 'test1@example.com',
      password: 'password123',
      name: 'Test User 1',
      goals: [],
      progress: [],
    };

    const user2: User = {
      id: 'user456',
      email: 'test2@example.com',
      password: 'password456',
      name: 'Test User 2',
      goals: [],
      progress: [],
    };

    await userService.createUser(user1);
    await userService.createUser(user2);

    const getUsersResult = await userService.getUsers();

    expect(getUsersResult.isOk).toBe(true);
    expect(getUsersResult.value).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(String),
          email: 'test1@example.com',
          name: 'Test User 1',
        }),
        expect.objectContaining({
          id: expect.any(String),
          email: 'test2@example.com',
          name: 'Test User 2',
        }),
      ])
    );
  });

  it('should update a user', async () => {
    const userId = 'user123';
    const user: User = {
      id: userId,
      email: 'test@example.com',
      password: 'password123',
      name: 'Test User',
      goals: [],
      progress: [],
    };

    await userService.createUser(user);

    user.name = 'Updated Test User';

    const updateUserResult = await userService.updateUser(user);

    expect(updateUserResult.isOk).toBe(true);
    expect(updateUserResult.value).toEqual(
      expect.objectContaining({
        id: userId,
        email: 'test@example.com',
        name: 'Updated Test User',
      })
    );
  });

  it('should delete a user', async () => {
    const userId = 'user123';
    const user: User = {
      id: userId,
      email: 'test@example.com',
      password: 'password123',
      name: 'Test User',
      goals: [],
      progress: [],
    };

    await userService.createUser(user);

    const deleteUserResult = await userService.deleteUser(userId);

    expect(deleteUserResult.isOk).toBe(true);
  });

  it('should handle errors during user creation', async () => {
    const user: User = {
      id: 'user123',
      email: 'test@example.com',
      password: 'password123',
      name: 'Test User',
      goals: [],
      progress: [],
    };

    const createUserResult = await userService.createUser(user);

    expect(createUserResult.isOk).toBe(false);
    expect(createUserResult.error).toBeDefined();
  });

  it('should handle errors during user retrieval', async () => {
    const userId = 'user123';

    const getUserResult = await userService.getUserById(userId);

    expect(getUserResult.isOk).toBe(false);
    expect(getUserResult.error).toBeDefined();
  });

  it('should handle errors during user update', async () => {
    const userId = 'user123';
    const user: User = {
      id: userId,
      email: 'test@example.com',
      password: 'password123',
      name: 'Test User',
      goals: [],
      progress: [],
    };

    const updateUserResult = await userService.updateUser(user);

    expect(updateUserResult.isOk).toBe(false);
    expect(updateUserResult.error).toBeDefined();
  });

  it('should handle errors during user deletion', async () => {
    const userId = 'user123';

    const deleteUserResult = await userService.deleteUser(userId);

    expect(deleteUserResult.isOk).toBe(false);
    expect(deleteUserResult.error).toBeDefined();
  });
});