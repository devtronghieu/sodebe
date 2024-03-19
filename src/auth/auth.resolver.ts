import { Resolver, Mutation, Args, Context } from '@nestjs/graphql';
import { User } from 'src/users/entities/user.entity';
import { AuthService } from './auth.service';
import { RegisterUserInput } from './dto/register-user.input';
import { LoginUserInput } from './dto/login-user.input';
import { LoginResponse } from './entities/login-response.entity';
import { HttpContext } from 'src/types';
import { UnauthorizedException } from '@nestjs/common';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => LoginResponse)
  async login(
    @Args('loginUserInput') loginUserInput: LoginUserInput,
    @Context() context: HttpContext,
  ): Promise<LoginResponse> {
    const user = await this.authService.validateLocal(
      loginUserInput.username,
      loginUserInput.password,
    );

    const accessToken = await this.authService.generateAccessToken(user);

    const refreshToken =
      await this.authService.generateAndStoreRefreshToken(user);

    context.res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: true,
      maxAge: parseInt(process.env.JWT_REFRESH_EXP_IN_S) * 1000,
    });

    return {
      accessToken,
      profile: user,
    };
  }

  @Mutation(() => LoginResponse)
  async refresh(@Context() context: HttpContext) {
    const refreshToken = context.req.cookies['refreshToken'];

    if (!refreshToken) {
      throw new UnauthorizedException('No refresh token');
    }

    return this.authService.refresh(refreshToken);
  }

  @Mutation(() => User)
  async register(
    @Args('registerUserInput') registerUserInput: RegisterUserInput,
  ) {
    return this.authService.register(registerUserInput);
  }
}
