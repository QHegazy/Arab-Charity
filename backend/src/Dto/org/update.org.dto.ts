import { CreateOrgDto } from './create.org.dto';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateOrgDto extends PartialType(CreateOrgDto) {}
