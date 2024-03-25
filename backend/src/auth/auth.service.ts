import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { signInEmail, signInPhone } from 'src/Dto/sign.in/sign.in';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/db/schemas/user.schema';
import { PayloadOrg, PayloadUser } from 'types/payload';
import { Org } from 'src/db/schemas/org.schema';
import { OrganizationsService } from 'src/organizations/organizations.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
    private orgService: OrganizationsService,
  ) {}
  async signInByEmailForUser(form: signInEmail): Promise<string> {
    try {
      const user = await this.userService.getUserByEmailPassword(form.email);
      if (!user) {
        throw new UnauthorizedException();
      }

      const isMatch = await bcrypt.compare(form.password, user.Password);
      if (!isMatch) {
        throw new UnauthorizedException();
      }
      const payload: PayloadUser = this.PayloadUser(user);
      const token = await this.jwtService.sign(payload);
      return token;
    } catch (error) {
      throw error;
    }
  }
  async signInByPhoneNumberForUser(form: signInPhone): Promise<string> {
    try {
      const user = await this.userService.getUserByPhoneNumberPassword(
        form.phoneNumber,
      );
      if (!user) {
        throw new UnauthorizedException();
      }

      const isMatch = await bcrypt.compare(form.password, user.Password);
      if (!isMatch) {
        throw new UnauthorizedException();
      }
      const payload: PayloadUser = this.PayloadUser(user);
      const token = await this.jwtService.sign(payload);
      return token;
    } catch (error) {
      throw error;
    }
  }
  async signInByEmailForOrg(form: signInEmail): Promise<string> {
    try {
      const org = await this.orgService.getOrgByEmailPassword(form.email);
      if (!org) {
        throw new UnauthorizedException();
      }

      const isMatch = await bcrypt.compare(form.password, org.Password);
      if (!isMatch) {
        throw new UnauthorizedException();
      }
      const payload: PayloadOrg = this.PayloadOrg(org);
      const token = await this.jwtService.sign(payload);

      return token;
    } catch (error) {
      throw error;
    }
  }
  async signInByPhoneNumberForOrg(form: signInPhone): Promise<string> {
    try {
      const org = await this.orgService.getOrgByPhoneNumberPassword(
        form.phoneNumber,
      );
      if (!org) {
        throw new UnauthorizedException();
      }
      const isMatch = await bcrypt.compare(form.password, org.Password);
      if (!isMatch) {
        throw new UnauthorizedException();
      }
      const payload: PayloadOrg = this.PayloadOrg(org);
      const token = await this.jwtService.sign(payload);
      return token;
    } catch (error) {
      throw error;
    }
  }
  private PayloadUser(user: User): PayloadUser {
    const { FirstName, LastName, Role, Country, PhoneNumber } = user;
    return { FirstName, LastName, Role, Country, PhoneNumber };
  }
  private PayloadOrg(org: Org): PayloadOrg {
    const { Name, Role, Country, PhoneNumber, Location, Website } = org;
    return { Name, Role, Country, PhoneNumber, Location, Website };
  }
}
