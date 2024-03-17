import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class LoginUserInput {
  @Field({ nullable: false })
  username: string;

  @Field({ nullable: false })
  password: string;
}
