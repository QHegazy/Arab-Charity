import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { signInUpByEmail, signInUpByPassword } from 'src/Dto/sign.in/sign.in';
import * as bcrypt from 'bcrypt';
import { Country } from 'types/country/country';
import { JwtService } from '@nestjs/jwt';
export interface authUser {
  FirstName: string;
  LastName: string;
  PhoneNumber: number;
  Country: Country;
  Role: string;
}
@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}
  async signInByEmail(form: signInUpByEmail): Promise<string> {
    try {
      const user = await this.userService.getUserByEmailPassword(form.email);
      if (user) {
        const isMatch = await bcrypt.compare(form.password, user.Password);
        if (!isMatch) {
          throw new UnauthorizedException();
        }
        const { FirstName, LastName, Country, PhoneNumber, Role } = user;
        const payload: authUser = {
          FirstName,
          LastName,
          Country,
          PhoneNumber,
          Role,
        };
        const token = await this.jwtService.sign(payload);
        return token;
      }
    } catch (error) {
      throw error;
    }
  }
  async signInByPhoneNumber(form: signInUpByPassword): Promise<string> {
    try {
      const user = await this.userService.getUserByPhoneNumberPassword(
        form.phoneNumber,
      );
      if (user) {
        const isMatch = await bcrypt.compare(form.password, user.Password);
        if (!isMatch) {
          throw new UnauthorizedException();
        }
        const { FirstName, LastName, Country, PhoneNumber, Role } = user;
        const payload: authUser = {
          FirstName,
          LastName,
          Country,
          PhoneNumber,
          Role,
        };
        const token = await this.jwtService.sign(payload);
        return token;
      }
    } catch (error) {
      throw error;
    }
  }
}
