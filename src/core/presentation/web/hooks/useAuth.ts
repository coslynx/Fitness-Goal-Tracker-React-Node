import { useState, useEffect } from 'react'; // import: react 18.3.1
import { useSession } from 'next-auth/react'; // import: next-auth 4.24.8
import { signIn, signOut, useSessionData } from 'next-auth/react'; // import: next-auth 4.24.8
import { useRouter } from 'next/navigation'; // import: next 14.2.15
import { AuthToken } from '../../../domain/auth/AuthToken'; // import: src/core/domain/auth/AuthToken.ts
import { User } from '../../../domain/users/User'; // import: src/core/domain/users/User.ts
import { Result } from '../../../domain/common/Result'; // import: src/core/domain/common/Result.ts
import { Error } from '../../../domain/common/Error'; // import: src/core/domain/common/Error.ts
import { AuthService } from '../../../domain/auth/AuthService'; // import: src/core/domain/auth/AuthService.ts
import { AuthProvider } from '../../../domain/auth/AuthProvider'; // import: src/core/domain/auth/AuthProvider.ts
import { GoogleAuthProvider } from '../../../infrastructure/auth/GoogleAuthProvider'; // import: src/core/infrastructure/auth/GoogleAuthProvider.ts
import { FacebookAuthProvider } from '../../../infrastructure/auth/FacebookAuthProvider'; // import: src/core/infrastructure/auth/FacebookAuthProvider.ts
import { UserRepository } from '../../../domain/users/UserRepository'; // import: src/core/domain/users/UserRepository.ts
import { MongoUserRepository } from '../../../domain/users/UserRepository'; // import: src/core/domain/users/UserRepository.ts
import { Database } from '../../../infrastructure/database/Database'; // import: src/core/infrastructure/database/Database.ts
import { UserModel } from '../../../infrastructure/database/UserModel'; // import: src/core/infrastructure/database/UserModel.ts
import { DatabaseConfig } from '../../../infrastructure/database/config'; // import: src/core/infrastructure/database/config.ts

interface useAuthReturn {
  user: User | null;
  isLoading: boolean;
  errors: Error[];
  loginUser: (credentials: { email: string; password: string }) => Promise<Result<AuthToken>>;
  registerUser: (userData: User) => Promise<Result<User>>;
  logoutUser: () => Promise<void>;
  updateUser: (userData: Partial<User>) => Promise<Result<User>>;
}

export const useAuth = (): useAuthReturn => {
  const router = useRouter();
  const { data: session, status } = useSession(); // import: next-auth/react 4.24.8
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Error[]>([]);

  useEffect(() => {
    const database = new Database({ url: process.env.DATABASE_URL }); // import: src/core/infrastructure/database/config.ts
    const userModel = new UserModel(database);
    const userRepository = new MongoUserRepository(database, userModel);
    const googleAuthProvider = new GoogleAuthProvider();
    const facebookAuthProvider = new FacebookAuthProvider();
    const authProvider: AuthProvider = googleAuthProvider; // or facebookAuthProvider
    const authService = new AuthService(authProvider, userRepository);

    if (status === 'authenticated' && session?.user?.id) {
      setIsLoading(true);
      authService
        .getUserByToken(session.user.id)
        .then((userResult) => {
          if (userResult.isOk) {
            setUser(userResult.value);
          } else {
            setErrors([userResult.error]);
          }
          setIsLoading(false);
        })
        .catch((error) => {
          setErrors([error]);
          setIsLoading(false);
        });
    }
  }, [status, session]);

  const loginUser = async (credentials: { email: string; password: string }): Promise<Result<AuthToken>> => {
    setIsLoading(true);
    const result = await signIn('credentials', credentials);
    if (result.error) {
      setErrors([new Error(result.error)]);
    }
    setIsLoading(false);
    return result;
  };

  const registerUser = async (userData: User): Promise<Result<User>> => {
    setIsLoading(true);
    const database = new Database({ url: process.env.DATABASE_URL }); // import: src/core/infrastructure/database/config.ts
    const userModel = new UserModel(database);
    const userRepository = new MongoUserRepository(database, userModel);
    const googleAuthProvider = new GoogleAuthProvider();
    const facebookAuthProvider = new FacebookAuthProvider();
    const authProvider: AuthProvider = googleAuthProvider; // or facebookAuthProvider
    const authService = new AuthService(authProvider, userRepository);

    const result = await authService.registerUser(userData);
    if (result.isOk) {
      setUser(result.value);
    } else {
      setErrors([result.error]);
    }
    setIsLoading(false);
    return result;
  };

  const logoutUser = async (): Promise<void> => {
    setIsLoading(true);
    await signOut();
    setUser(null);
    setIsLoading(false);
  };

  const updateUser = async (userData: Partial<User>): Promise<Result<User>> => {
    setIsLoading(true);
    const database = new Database({ url: process.env.DATABASE_URL }); // import: src/core/infrastructure/database/config.ts
    const userModel = new UserModel(database);
    const userRepository = new MongoUserRepository(database, userModel);
    const googleAuthProvider = new GoogleAuthProvider();
    const facebookAuthProvider = new FacebookAuthProvider();
    const authProvider: AuthProvider = googleAuthProvider; // or facebookAuthProvider
    const authService = new AuthService(authProvider, userRepository);

    const result = await authService.updateUser(userData);
    if (result.isOk) {
      setUser(result.value);
    } else {
      setErrors([result.error]);
    }
    setIsLoading(false);
    return result;
  };

  return { user, isLoading, errors, loginUser, registerUser, logoutUser, updateUser };
};