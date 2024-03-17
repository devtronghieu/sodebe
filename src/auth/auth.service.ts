import { hash, compare } from 'bcryptjs';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/entities/user.entity';
import { JwtPayload, jwtConstants, saltRounds } from './constants';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateLocal(username: string, password: string): Promise<User> {
    const user = await this.usersService.findOne(username);

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    const passwordHash = await hash(password, saltRounds);
    const passwordHasMatch = await compare(passwordHash, user.passwordHash);

    if (passwordHasMatch) {
      return user;
    } else {
      throw new UnauthorizedException();
    }
  }

  async validateJwt(userId: string): Promise<User> {
    const user = await this.usersService.findOneById(userId);
    if (!user) {
      throw new UnauthorizedException('User not found');
    }
    return user;
  }

  async login(user: User): Promise<{ accessToken: string }> {
    const payload: JwtPayload = {
      userId: user.id,
      username: user.username,
      roles: user.roles,
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + jwtConstants.expiresIn,
    };

    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}
