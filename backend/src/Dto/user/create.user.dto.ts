import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MinLength,
  MaxLength,
  IsDateString,
} from 'class-validator';
import { IsDateInRange } from 'shared/functions/data.range';
import { Signup } from '../shared-Dto/org-user.dto';

export class CreateUserDto extends Signup {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(50)
  FirstName: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(50)
  LastName: string;

  @IsNotEmpty()
  @IsEmail()
  Email: string;

  @IsDateString()
  @IsNotEmpty()
  @IsDateInRange(1980, 2021, {
    message: 'The birthDate must be between 1980 and 2021.',
  })
  BirthDate: Date;
}
