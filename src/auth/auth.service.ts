import { hash, compare } from 'bcryptjs';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { User, UserDocument } from 'src/users/entities/user.entity';
import { JwtPayload, saltRounds } from './constants';
import { RegisterUserInput } from './dto/register-user.input';
import { UserRole } from 'src/users/entities/role.entity';
import { InjectModel } from '@nestjs/mongoose';
import { RefreshToken } from './entities/refresh-token.entity';
import { Model } from 'mongoose';
import { LoginResponse } from './entities/login-response.entity';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    @InjectModel(RefreshToken.name)
    private refreshTokenModel: Model<RefreshToken>,
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

  async generateAccessToken(user: UserDocument) {
    const iat = Math.floor(Date.now() / 1000);
    const exp = iat + parseInt(process.env.JWT_ACCESS_EXP_IN_S);

    const payload: JwtPayload = {
      userId: user._id,
      username: user.username,
      roles: user.roles,
      iat,
      exp,
    };

    return this.jwtService.sign(payload);
  }

  async generateAndStoreRefreshToken(user: UserDocument) {
    const iat = Math.floor(Date.now() / 1000);
    const exp = iat + parseInt(process.env.JWT_REFRESH_EXP_IN_S);

    const payload: JwtPayload = {
      userId: user._id,
      username: user.username,
      roles: user.roles,
      iat,
      exp,
    };

    const refreshToken = this.jwtService.sign(payload);

    const refreshTokenDoc = new this.refreshTokenModel({
      token: refreshToken,
      user,
      expiryDate: new Date(exp * 1000),
    });

    await refreshTokenDoc.save();

    return refreshToken;
  }

  async refresh(refreshToken: string): Promise<LoginResponse> {
    const refreshTokenDoc = await this.refreshTokenModel
      .findOne({ token: refreshToken })
      .populate('user');

    if (!refreshTokenDoc) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    const now = new Date();
    if (now > refreshTokenDoc.expiryDate) {
      throw new UnauthorizedException('Refresh token expired');
    }

    const payload: JwtPayload = {
      userId: refreshTokenDoc.user._id,
      username: refreshTokenDoc.user.username,
      roles: refreshTokenDoc.user.roles,
      iat: Math.floor(Date.now() / 1000),
      exp:
        Math.floor(Date.now() / 1000) +
        parseInt(process.env.JWT_ACCESS_EXP_IN_S),
    };

    const accessToken = this.jwtService.sign(payload);

    return {
      accessToken,
      profile: refreshTokenDoc.user,
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
