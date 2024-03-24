import { Country } from 'types/country';
import { CommonDtoForSingup } from 'types/org-user';
import {
  IsNotEmpty,
  IsString,
  MinLength,
  MaxLength,
  IsNumber,
  Min,
  IsPositive,
} from 'class-validator';
export class Signup implements CommonDtoForSingup {
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  @MinLength(3)
  @MaxLength(18)
  @IsPositive()
  PhoneNumber: number;

  @IsNotEmpty()
  Country: Country;

  @IsNotEmpty()
  @IsString()
  Password: string;

  @IsNotEmpty()
  @IsString()
  Role: string;
}
