import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Package } from './package.schema';
import { User } from './user.schema';
export type OrderDocument = mongoose.HydratedDocument<Order>;

@Schema({
  autoIndex: true,
})
export class Order {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  Owner: User;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Package' })
  Package: Package;

  @Prop({ type: Number })
  Mount: number;

  @Prop({ type: Date, default: Date.now })
  CreatedAt: Date;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
