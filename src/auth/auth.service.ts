import { hash, compare } from 'bcryptjs';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/entities/user.entity';
import { JwtPayload, jwtConstants, saltRounds } from './constants';
import { RegisterUserInput } from './dto/register-user.input';
import { UserRole } from 'src/users/entities/role.entity';
import { LoginResponse } from './entities/login-response.entity';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateLocal(username: string, password: string) {
    const user = await this.usersService.findOne(username);

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    const passwordHasMatch = await compare(password, user.passwordHash);

    if (passwordHasMatch) {
      return user;
    } else {
      throw new UnauthorizedException('Wrong password');
    }
  }

  async validateJwt(userId: string): Promise<User> {
    const user = await this.usersService.findOneById(userId);
    if (!user) {
      throw new UnauthorizedException('User not found');
    }
    return user;
  }

  async login(userId: string, user: User): Promise<LoginResponse> {
    const payload: JwtPayload = {
      userId: userId,
      username: user.username,
      roles: user.roles,
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + jwtConstants.expiresIn,
    };

    return {
      accessToken: this.jwtService.sign(payload),
    };
  }

  async register(userInput: RegisterUserInput): Promise<User> {
    const passwordHash = await hash(userInput.password, saltRounds);

    const newUser = await this.usersService.create({
      username: userInput.username,
      passwordHash,
      roles: [UserRole.User],
    });

    return newUser;
  }
}
