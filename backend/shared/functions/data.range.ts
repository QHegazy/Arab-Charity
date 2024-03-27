import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from 'class-validator';
export function IsDateInRange(
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
