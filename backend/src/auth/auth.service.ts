import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { signInUpByEmail, signInUpByPassword } from 'src/Dto/sign.in/sign.in';
import * as bcrypt from 'bcrypt';
import { Country } from 'types/country/country';
export interface authUser {
  FirstName: string;
  LastName: string;
  PhoneNumber: number;
  Country: Country;
}
@Injectable()
export class AuthService {
  constructor(private userService: UsersService) {}
  async signInByEmail(form: signInUpByEmail): Promise<authUser> {
    try {
      const user = await this.userService.getUserByEmailPassword(form.email);
      if (user) {
        const isMatch = await bcrypt.compare(form.password, user.Password);
        console.log(isMatch);
        if (!isMatch) {
          throw new UnauthorizedException();
        }
        const { FirstName, LastName, Country, PhoneNumber } = user;
        return { FirstName, LastName, Country, PhoneNumber };
      }
    } catch (error) {
      throw error;
    }
  }
  async signInByPhoneNumber(form: signInUpByPassword): Promise<authUser> {
    try {
      const user = await this.userService.getUserByPhoneNumberPassword(
        form.phoneNumber,
      );
      if (user) {
        const isMatch = await bcrypt.compare(form.password, user.Password);
        console.log(isMatch);
        if (!isMatch) {
          throw new UnauthorizedException();
        }
        const { FirstName, LastName, Country, PhoneNumber } = user;
        return { FirstName, LastName, Country, PhoneNumber };
      }
    } catch (error) {
      throw error;
    }
  }
}
