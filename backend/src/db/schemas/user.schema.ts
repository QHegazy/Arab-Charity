import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { SignupSchema } from './Common/signup';
export type UserDocument = HydratedDocument<User>;

@Schema({
  autoIndex: true,
})
export class User extends SignupSchema {
  @Prop({ required: true, type: String, minlength: 3, maxlength: 50 })
  FirstName: string;

  @Prop({ required: true, type: String, minlength: 3, maxlength: 50 })
  LastName: string;

  @Prop({
    type: String,
    unique: true,
    required: true,
  })
  Email: string;

  @Prop({ type: Date, required: true })
  BirthDate: Date;

  @Prop({ type: Date, default: Date.now })
  CreatedAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
