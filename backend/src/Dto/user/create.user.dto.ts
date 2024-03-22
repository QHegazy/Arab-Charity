import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MinLength,
  MaxLength,
  IsDateString,
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from 'class-validator';
import { Country } from 'types/country/country';
function IsDateInRange(
  minYear: number,
  maxYear: number,
  validationOptions?: ValidationOptions,
) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'isDateInRange',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        validate(value: any, args: ValidationArguments) {
          const date = new Date(value);
          const year = date.getFullYear();
          return year >= minYear && year <= maxYear;
        },
        defaultMessage(args: ValidationArguments) {
          return `The ${args.property} must be a valid date between ${minYear} and ${maxYear}.`;
        },
      },
    });
  };
}
export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(50)
  readonly firstName: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(50)
  readonly lastName: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(50)
  readonly phoneNumber: number;

  @IsString()
  @IsNotEmpty()
  readonly country: Country;

  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  readonly role: string;

  @IsString()
  @IsNotEmpty()
  readonly password: string;

  @IsDateString()
  @IsNotEmpty()
  @IsDateInRange(1980, 2021, {
    message: 'The birthDate must be between 1980 and 2021.',
  })
  readonly birthDate: Date;
}
