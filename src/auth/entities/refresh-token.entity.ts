import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Schema as BaseSchema } from 'mongoose';
import { UserDocument } from 'src/users/entities/user.entity';

@Schema()
export class RefreshToken {
  @Prop({ required: true, unique: true })
  token: string;

  @Prop({ type: Date, required: true })
  expiryDate: Date;

  @Prop({ type: BaseSchema.Types.ObjectId, ref: 'User', required: true })
  user: UserDocument;
}

export type RefreshTokenDocument = RefreshToken & Document;

export const RefreshTokenSchema = SchemaFactory.createForClass(RefreshToken);
