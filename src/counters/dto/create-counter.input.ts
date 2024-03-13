import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateCounterInput {
  @Field()
  name: string;
}
