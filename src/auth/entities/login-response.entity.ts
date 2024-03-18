import { Field, ObjectType } from '@nestjs/graphql';
import { User } from 'src/users/entities/user.entity';

@ObjectType()
export class LoginResponse {
  @Field({ nullable: false })
  accessToken: string;

  @Field(() => User, { nullable: false })
  profile: User;
}
