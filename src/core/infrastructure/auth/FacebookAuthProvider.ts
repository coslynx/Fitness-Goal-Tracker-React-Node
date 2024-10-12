import { AuthToken } from './AuthToken';
import { User } from '../../users/User';
import { Result } from '../../common/Result';
import { NextAuthOptions } from 'next-auth';
import { Adapter } from 'next-auth/adapters';
import { FacebookProvider as NextAuthFacebookProvider } from 'next-auth/providers/facebook';
import { FACEBOOK_CLIENT_ID, FACEBOOK_CLIENT_SECRET } from '../../infrastructure/database/config';
import {  FacebookAuthProvider } from 'next-auth/providers/facebook'; 

export class FacebookAuthProvider implements AuthProvider {
  private nextAuthFacebookProvider: NextAuthFacebookProvider;

  constructor() {
    this.nextAuthFacebookProvider = FacebookAuthProvider({
      clientId: FACEBOOK_CLIENT_ID,
      clientSecret: FACEBOOK_CLIENT_SECRET,
    });
  }

  async authenticate(email: string, password: string): Promise<Result<AuthToken>> {
    // Facebook authentication does not use email and password.
    // This method should be implemented for email/password login scenarios.
    // For Facebook, use the `signIn` method to redirect users to Facebook for authentication.
    return Result.Err(new Error('Facebook authentication does not use email and password.'));
  }

  async generateToken(user: User): Promise<Result<AuthToken>> {
    // Facebook authentication handles token generation internally.
    // This method should be implemented for generating tokens in other scenarios.
    return Result.Err(new Error('Facebook authentication handles token generation internally.'));
  }

  async verifyToken(token: string): Promise<Result<User>> {
    // Facebook authentication handles token verification internally. 
    // This method should be implemented for verifying tokens in other scenarios.
    return Result.Err(new Error('Facebook authentication handles token verification internally.'));
  }

  configure(options: NextAuthOptions<Adapter>): void {
    // Integrate Facebook authentication provider into NextAuth.js
    options.providers.push(this.nextAuthFacebookProvider);
  }
}