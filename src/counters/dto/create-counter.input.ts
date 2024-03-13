import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateCounterInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
