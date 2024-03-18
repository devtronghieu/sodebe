import { UserRole } from 'src/users/entities/role.entity';

export const saltRounds = 12;

export interface JwtPayload {
  userId: string;
  username: string;
  roles: UserRole[];
  iat: number;
  exp: number;
}
