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
      const user = await this.userService.getUserByEmailPassword(form.Email);
      if (!user) {
        throw new UnauthorizedException();
      }

      const isMatch = await bcrypt.compare(form.Password, user.Password);
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
        form.PhoneNumber,
      );
      if (!user) {
        throw new UnauthorizedException();
      }

      const isMatch = await bcrypt.compare(form.Password, user.Password);
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
      const org = await this.orgService.getOrgByEmailPassword(form.Email);
      if (!org) {
        throw new UnauthorizedException();
      }

      const isMatch = await bcrypt.compare(form.Password, org.Password);
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
        form.PhoneNumber,
      );
      if (!org) {
        throw new UnauthorizedException();
      }
      const isMatch = await bcrypt.compare(form.Password, org.Password);
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
  private PayloadUser(user: any): PayloadUser {
    const { FirstName, LastName, Role, Country, PhoneNumber, _id } = user;
    return { FirstName, LastName, Role, Country, PhoneNumber, _id };
  }
  private PayloadOrg(org: any): PayloadOrg {
    const { Name, Role, Country, PhoneNumber, Location, Website, _id, OrgRole } = org;
    return { Name, Role, OrgRole, Country, PhoneNumber, Location, Website, _id };
  }
}
