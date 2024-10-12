import { describe, expect, it, jest, vi } from 'vitest';
import { GoogleAuthProvider } from '../../../../src/core/infrastructure/auth/GoogleAuthProvider';
import { AuthToken } from '../../../../src/core/domain/auth/AuthToken';
import { User } from '../../../../src/core/domain/users/User';
import { Result } from '../../../../src/core/domain/common/Result';
import { NextAuthOptions } from 'next-auth';
import { Adapter } from 'next-auth/adapters';
import { GoogleProvider as NextAuthGoogleProvider } from 'next-auth/providers/google';
import { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } from '../../../../src/core/infrastructure/database/config';

describe('GoogleAuthProvider', () => {
  let googleAuthProvider: GoogleAuthProvider;

  beforeEach(() => {
    googleAuthProvider = new GoogleAuthProvider();
  });

  it('should be initialized with correct client ID and secret', () => {
    expect(googleAuthProvider.nextAuthGoogleProvider.options.clientId).toBe(GOOGLE_CLIENT_ID);
    expect(googleAuthProvider.nextAuthGoogleProvider.options.clientSecret).toBe(GOOGLE_CLIENT_SECRET);
  });

  it('should return an error for authenticate', async () => {
    const email = 'test@example.com';
    const password = 'password123';

    const result = await googleAuthProvider.authenticate(email, password);

    expect(result.isOk).toBe(false);
    expect(result.error).toBeDefined();
    expect(result.error?.message).toBe('Google authentication does not use email and password.');
  });

  it('should return an error for generateToken', async () => {
    const user: User = {
      id: 'user123',
      email: 'test@example.com',
      password: 'password123',
      name: 'Test User',
      goals: [],
      progress: [],
    };

    const result = await googleAuthProvider.generateToken(user);

    expect(result.isOk).toBe(false);
    expect(result.error).toBeDefined();
    expect(result.error?.message).toBe('Google authentication handles token generation internally.');
  });

  it('should return an error for verifyToken', async () => {
    const token = 'validtoken123';

    const result = await googleAuthProvider.verifyToken(token);

    expect(result.isOk).toBe(false);
    expect(result.error).toBeDefined();
    expect(result.error?.message).toBe('Google authentication handles token verification internally.');
  });

  it('should configure Google provider in NextAuth options', () => {
    const options: NextAuthOptions<Adapter> = {
      providers: [],
    };

    googleAuthProvider.configure(options);

    expect(options.providers).toContain(googleAuthProvider.nextAuthGoogleProvider);
  });
});