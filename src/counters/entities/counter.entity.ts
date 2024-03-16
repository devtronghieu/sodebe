import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
@ObjectType()
export class Counter {
  @Prop({ required: true })
  @Field()
  name: string;

  @Prop({ required: true })
  @Field(() => Int, { description: 'Count (start from 0)' })
  count: number;
}

export const CounterSchema = SchemaFactory.createForClass(Counter);
