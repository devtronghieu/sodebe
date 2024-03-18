import { Resolver, Query } from '@nestjs/graphql';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';
import { GqlAuthGuard, CurrentUser } from 'src/guards/gpl.guard';
import { UseGuards } from '@nestjs/common';

@Resolver()
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(() => User, { name: 'user', nullable: true })
  @UseGuards(GqlAuthGuard)
  async profile(@CurrentUser() user: User): Promise<User> {
    return user;
  }
}
