import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { UserRole } from './role.entity';

@Schema()
@ObjectType()
export class User {
  @Prop({ required: true, unique: true })
  @Field(() => ID)
  id: string;

  @Prop({ required: true, unique: true })
  @Field()
  username: string;

  @Prop({ required: true })
  @Field()
  passwordHash: string;

  @Prop({
    type: [String],
    enum: UserRole,
    default: [UserRole.User],
  })
  @Field(() => [UserRole])
  roles: UserRole[];

  @Prop()
  @Field()
  email: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
