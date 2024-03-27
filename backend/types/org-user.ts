import { Country } from './country';

export interface CommonDtoForSingup {
  PhoneNumber: number;
  Country: Country;
  Password: string;
  Role: string;
}
