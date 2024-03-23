import { SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
export type OrganisationDocument = HydratedDocument<Organisation>;

export class Organisation {
  /*add schema */
}
export const OrganisationSchema = SchemaFactory.createForClass(Organisation);
