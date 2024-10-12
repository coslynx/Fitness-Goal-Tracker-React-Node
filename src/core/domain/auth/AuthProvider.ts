import { AuthToken } from './AuthToken';
import { User } from '../../users/User';
import { Result } from '../../common/Result';
import { NextAuthOptions } from 'next-auth';
import { Adapter } from 'next-auth/adapters';

export interface AuthProvider {
  authenticate(email: string, password: string): Promise<Result<AuthToken>>;
  generateToken(user: User): Promise<Result<AuthToken>>;
  verifyToken(token: string): Promise<Result<User>>;
  configure(options: NextAuthOptions<Adapter>): void;
}