import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { User } from 'src/users/entities/user.entity';
import { AuthService } from './auth.service';
import { RegisterUserInput } from './dto/register-user.input';
import { LoginUserInput } from './dto/login-user.input';
import { LoginResponse } from './entities/login-response.entity';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => LoginResponse)
  async login(
    @Args('loginUserInput') loginUserInput: LoginUserInput,
  ): Promise<LoginResponse> {
    const user = await this.authService.validateLocal(
      loginUserInput.username,
      loginUserInput.password,
    );

    const accessToken = await this.authService.generateAccessToken(
      user._id.toString(),
      user,
    );

    return {
      accessToken,
      profile: user,
    };
  }

  @Mutation(() => User)
  async register(
    @Args('registerUserInput') registerUserInput: RegisterUserInput,
  ) {
    return this.authService.register(registerUserInput);
  }
}
