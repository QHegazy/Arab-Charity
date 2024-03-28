import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Commodity } from 'types/package.interface';

export type PackageDocument = HydratedDocument<Package>;

@Schema()
export class Package {
  @Prop({ required: true, type: String, minlength: 3, maxlength: 50 })
  Commodity: Commodity;

  @Prop({ required: true, type: String })
  Mount: string;

  @Prop({ type: Date, default: Date.now })
  CreatedAt: Date;
}

export const PackageSchema = SchemaFactory.createForClass(Package);
