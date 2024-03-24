import { Country } from 'types/country';
import { CommonDtoForSingup } from 'types/org-user';
import { IsNotEmpty, IsString, IsNumber, IsPositive } from 'class-validator';
export class Signup implements CommonDtoForSingup {
  @IsNotEmpty()
  @IsNumber()
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
