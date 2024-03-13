import { CreateCounterInput } from './create-counter.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateCounterInput extends PartialType(CreateCounterInput) {
  @Field(() => Int)
  id: number;
}
