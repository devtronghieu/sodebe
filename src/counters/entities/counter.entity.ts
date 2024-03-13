import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Counter {
  @Field(() => Int, { description: 'Count field (start from 0)' })
  count: number;

  @Field({ nullable: true })
  name?: string;
}
