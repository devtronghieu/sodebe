import { ObjectType, Field } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
@ObjectType()
export class User {
  @Prop({ required: true })
  @Field()
  username: string;

  @Prop({ required: true })
  @Field()
  passwordHash: string;

  @Prop()
  @Field()
  email: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
