import { AuthToken } from './AuthToken';
import { User } from '../../users/User';
import { Result } from '../../common/Result';
import { NextAuthOptions } from 'next-auth';
import { Adapter } from 'next-auth/adapters';
import { GoogleProvider as NextAuthGoogleProvider } from 'next-auth/providers/google';
import { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } from '../../infrastructure/database/config';

export class GoogleAuthProvider implements AuthProvider {
  private nextAuthGoogleProvider: NextAuthGoogleProvider;

  constructor() {
    this.nextAuthGoogleProvider = NextAuthGoogleProvider({
      clientId: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
    });
  }

  async authenticate(email: string, password: string): Promise<Result<AuthToken>> {
    return Result.Err(new Error('Google authentication does not use email and password.'));
  }

  async generateToken(user: User): Promise<Result<AuthToken>> {
    return Result.Err(new Error('Google authentication handles token generation internally.'));
  }

  async verifyToken(token: string): Promise<Result<User>> {
    return Result.Err(new Error('Google authentication handles token verification internally.'));
  }

  configure(options: NextAuthOptions<Adapter>): void {
    options.providers.push(this.nextAuthGoogleProvider);
  }
}