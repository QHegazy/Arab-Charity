import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

export class signInEmail {
  @IsNotEmpty()
  @IsEmail()
  Email?: string;

  @IsNotEmpty()
  @IsString()
  Password: string;
}

export class signInPhone {
  @IsNotEmpty()
  @IsString()
  Password: string;

  @IsOptional()
  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  PhoneNumber: number;
}
