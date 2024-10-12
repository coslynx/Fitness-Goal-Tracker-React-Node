import { Result } from '../../common/Result';
import { User } from '../../users/User';

export interface AuthToken {
  token: string;
  userId: string;
  expiryDate: Date;
  isValid(): boolean;
}

export class JWTAuthToken implements AuthToken {
  token: string;
  userId: string;
  expiryDate: Date;

  constructor(token: string, userId: string, expiryDate: Date) {
    this.token = token;
    this.userId = userId;
    this.expiryDate = expiryDate;
  }

  isValid(): boolean {
    return this.expiryDate.getTime() > new Date().getTime();
  }
}