import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Counter {
  @Field()
  name: string;

  @Field(() => Int, { description: 'Count (start from 0)' })
  count: number;
}
