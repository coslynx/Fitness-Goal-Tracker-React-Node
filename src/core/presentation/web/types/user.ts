import { User } from '../../../domain/users/User'; // import: src/core/domain/users/User.ts

export interface UserDto extends Pick<User, 'id' | 'email' | 'name'> {
  // Add any specific properties you need for the user DTO here, for example:
  // roles: string[];
  // isActive: boolean;
}