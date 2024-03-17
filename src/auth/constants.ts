import { UserRole } from 'src/users/entities/role.entity';

export const saltRounds = 12;

export const jwtConstants = {
  secret: process.env.JWT_SECRET,
  expiresIn: 60 * 60, // 1 hour
};

export interface JwtPayload {
  userId: string;
  username: string;
  roles: UserRole[];
  iat: number;
  exp: number;
}
