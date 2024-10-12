import { AuthToken } from '../../../domain/auth/AuthToken';
import { User } from '../../../domain/users/User';
import { Result } from '../../../domain/common/Result';
import { Error } from '../../../domain/common/Error';
import { AuthService } from '../../../domain/auth/AuthService';
import { AuthProvider } from '../../../domain/auth/AuthProvider';
import { GoogleAuthProvider } from '../../../infrastructure/auth/GoogleAuthProvider';
import { FacebookAuthProvider } from '../../../infrastructure/auth/FacebookAuthProvider';
import { UserRepository } from '../../../domain/users/UserRepository';
import { MongoUserRepository } from '../../../domain/users/UserRepository';
import { Database } from '../../../infrastructure/database/Database';
import { UserModel } from '../../../infrastructure/database/UserModel';
import { DatabaseConfig } from '../../../infrastructure/database/config';
import { apiService } from './api';

// import: next-auth 4.24.8
import { signIn, signOut, useSessionData } from 'next-auth/react';

interface AuthState {
  user: User | null;
  isLoading: boolean;
  errors: Error[];
}

const useAuth = (): AuthState => {
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

    const session = useSessionData(); // import: next-auth 4.24.8

    if (session && session.user) {
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
  }, []);

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

export { useAuth };