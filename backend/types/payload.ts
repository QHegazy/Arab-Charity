import { Country } from './country';

interface Payload {
  Role: string;
  Country: Country;
  PhoneNumber: number;
  _id: string;
}

export interface PayloadUser extends Payload {
  FirstName: string;
  LastName: string;
}
export interface PayloadOrg extends Payload {
  Name: string;
  Website: string;
  Location: string;
}
