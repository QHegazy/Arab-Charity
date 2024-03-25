import {
  IsDateString,
  IsEmail,
  IsNotEmpty,
  IsString,
  IsUrl,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Signup } from '../shared-Dto/org-user.dto';
import { IsDateInRange } from 'shared/functions/data.range';

export class CreateOrgDto extends Signup {
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(50)
  Name: string;

  @IsNotEmpty()
  @IsEmail()
  Email: string;

  @IsNotEmpty()
  @IsString()
  Location: string;

  @IsNotEmpty()
  @IsUrl()
  @IsString()
  Website: string;

  @IsDateString()
  @IsNotEmpty()
  @IsDateInRange(1980, 2021, {
    message: 'The Date must be between 1980 and 2021.',
  })
  DateOfEstablishmentOfInstitution: Date;
}
