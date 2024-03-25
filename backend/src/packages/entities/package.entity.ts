import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Commodity } from './package.interface';
export type PackageDocument = HydratedDocument<Package>;

@Schema()
export class Package {
  @Prop({ required: true, type: String, minlength: 3, maxlength: 50 })
  Commodity: string;

  @Prop({ type: Date, default: Date.now })
  CreatedAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(Package);
