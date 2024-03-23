import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

export class signInUpByEmail {
  @IsNotEmpty()
  @IsEmail()
  email?: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}

export class signInUpByPassword {
  @IsNotEmpty()
  @IsString()
  password: string;

  @IsOptional()
  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  phoneNumber: number;
}
