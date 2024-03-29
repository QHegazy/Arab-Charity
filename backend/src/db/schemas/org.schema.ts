import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { SignupSchema } from './Common/signup';
import { Order, OrderSchema } from './order.schema';
export type OrgDocument = HydratedDocument<Org>;

@Schema()
export class Org extends SignupSchema {
  @Prop({
    required: true,
    type: String,
    minlength: 3,
    maxlength: 50,
  })
  Name: string;

  @Prop({ type: String, required: true, unique: true })
  Email: string;

  @Prop({ type: String, required: true })
  Location: string;

  @Prop({ type: String, required: true })
  Website: string;

  @Prop({ type: [OrderSchema] })
  Orders: Order[];
  // @Prop({ type: Date, required: true })
  // DateOfEstablishmentOfInstitution: Date;
}

export const OrgSchema = SchemaFactory.createForClass(Org);
