import {
  // IsDateString,
  IsEmail,
  IsNotEmpty,
  IsString,
  IsUrl,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Signup } from '../shared-Dto/org-user.dto';
// import { IsDateInRange } from 'shared/functions/data.range';
const customEmailRegex = new RegExp(
  '^[a-zA-Z0-9._%+-]+@(?!gmail.com)(?!yahoo.com)(?!hotmail.com)(?!yahoo.co.in)(?!aol.com)(?!live.com)(?!outlook.com)[a-zA-Z0-9_-]+.[a-zA-Z0-9-.]{2,61}$',
);
export class CreateOrgDto extends Signup {
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(50)
  Name: string;

  @IsNotEmpty()
  @IsEmail({}, { message: 'Invalid email format' })
  @Matches(customEmailRegex, {
    message: 'Email domain is not allowed',
  })
  Email: string;

  @IsNotEmpty()
  @IsString()
  Location: string;

  @IsNotEmpty()
  @IsUrl()
  @IsString()
  Website: string;

  // @IsDateString()
  // @IsNotEmpty()
  // @IsDateInRange(1960, 2024, {
  //   message: 'The Date must be between 1980 and 2021.',
  // })
  // DateOfEstablishmentOfInstitution: Date;
}
