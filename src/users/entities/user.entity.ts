import { ObjectType, Field } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { UserRole } from './role.entity';

@Schema()
@ObjectType()
export class User {
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
}

export const UserSchema = SchemaFactory.createForClass(User);
UserSchema.index({ username: 1 }, { unique: true });
