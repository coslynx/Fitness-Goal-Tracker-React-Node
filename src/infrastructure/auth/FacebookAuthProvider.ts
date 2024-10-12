import { AuthToken } from './AuthToken';
import { User } from '../../users/User';
import { Result } from '../../common/Result';
import { NextAuthOptions } from 'next-auth';
import { Adapter } from 'next-auth/adapters';
import { FacebookProvider as NextAuthFacebookProvider } from 'next-auth/providers/facebook';
import { FACEBOOK_CLIENT_ID, FACEBOOK_CLIENT_SECRET } from '../../infrastructure/database/config';

export class FacebookAuthProvider implements AuthProvider {
  private nextAuthFacebookProvider: NextAuthFacebookProvider;

  constructor() {
    this.nextAuthFacebookProvider = NextAuthFacebookProvider({
      clientId: FACEBOOK_CLIENT_ID,
      clientSecret: FACEBOOK_CLIENT_SECRET,
    });
  }

  async authenticate(email: string, password: string): Promise<Result<AuthToken>> {
    return Result.Err(new Error('Facebook authentication does not use email and password.'));
  }

  async generateToken(user: User): Promise<Result<AuthToken>> {
    return Result.Err(new Error('Facebook authentication handles token generation internally.'));
  }

  async verifyToken(token: string): Promise<Result<User>> {
    return Result.Err(new Error('Facebook authentication handles token verification internally.'));
  }

  configure(options: NextAuthOptions<Adapter>): void {
    options.providers.push(this.nextAuthFacebookProvider);
  }
}